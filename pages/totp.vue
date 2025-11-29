<template>
  <div
    :class="[
      'min-h-screen',
      'w-full',
      'bg-zinc-950',
      'text-zinc-100',
      'px-4',
      'py-8',
      'sm:px-6',
      'md:px-8',
      'flex',
      'items-center',
      'justify-center',
    ]"
  >
    <div
      :class="[
        'w-full',
        'max-w-lg',
        'space-y-6',
      ]"
    >
      <div
        :class="[
          'rounded-3xl',
          'border',
          'border-zinc-800',
          'bg-gradient-to-b',
          'from-zinc-900/70',
          'to-zinc-950/80',
          'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75)]',
          'backdrop-blur-2xl',
        ]"
      >
        <div
          :class="[
            'flex',
            'items-center',
            'gap-4',
            'border-b',
            'border-zinc-800/60',
            'px-6',
            'py-5',
          ]"
        >
          <div
            :class="[
              'flex',
              'h-12',
              'w-12',
              'items-center',
              'justify-center',
              'rounded-2xl',
              'border',
            ]"
            :style="{ backgroundColor: accentSurface, borderColor: accentBorder }"
          >
            <img
              :src="totpDetails.icon"
              :alt="`${issuerDisplay} icon`"
              :class="['h-7', 'w-7', 'object-contain']"
              loading="lazy"
            />
          </div>
          <div class="flex flex-col">
            <span :class="['text-xs', 'uppercase', 'tracking-wide', 'text-zinc-500']">Issuer</span>
            <span :class="['text-lg', 'font-semibold', 'text-white']">{{ issuerDisplay }}</span>
          </div>
        </div>

        <div :class="['space-y-6', 'px-6', 'py-8']">
          <div :class="['space-y-4', 'text-center']">
            <div
              :class="[
                'flex',
                'items-center',
                'justify-center',
                'gap-3',
                'font-mono',
                'text-4xl',
                'sm:text-5xl',
                'tracking-[0.4em]',
              ]"
            >
              <span
                v-for="(group, index) in codeGroups"
                :key="`${group}-${index}`"
                :class="[
                  'rounded-2xl',
                  'border',
                  'border-zinc-800',
                  'bg-zinc-900/70',
                  'px-4',
                  'py-3',
                  'text-white',
                  'shadow-inner',
                ]"
              >
                {{ group }}
              </span>
            </div>
            <p :class="['text-sm', 'text-zinc-400']">
              Refreshes in <span :class="['font-semibold', 'text-white']">{{ secondsRemaining }}s</span>
            </p>
          </div>

          <div :class="['space-y-2']">
            <div :class="['h-2.5', 'w-full', 'rounded-full', 'bg-zinc-900', 'overflow-hidden']">
              <div
                :class="['h-full', 'rounded-full', 'transition-all', 'duration-300']"
                :style="{ width: `${progressPercent}%`, backgroundColor: accentColor }"
              />
            </div>
            <div :class="['flex', 'justify-between', 'text-xs', 'text-zinc-500']">
              <span>0s</span>
              <span>{{ period }}s</span>
            </div>
          </div>

          <div :class="['flex', 'flex-col', 'gap-3', 'sm:flex-row']">
            <button
              type="button"
              @click="copyCode"
              :disabled="!otpCode"
              :class="[
                'flex-1',
                'rounded-2xl',
                'border',
                'px-4',
                'py-3',
                'text-sm',
                'font-semibold',
                'uppercase',
                'tracking-wide',
                'transition',
                copyState === 'copied'
                  ? 'border-transparent bg-white text-zinc-900'
                  : 'border-zinc-800 bg-zinc-900/70 text-white hover:border-white/40',
                !otpCode ? 'opacity-60 cursor-not-allowed' : '',
              ]"
            >
              <span v-if="copyState === 'copied'">Copied</span>
              <span v-else-if="copyState === 'error'">Try Again</span>
              <span v-else>Copy Code</span>
            </button>
            <a
              :href="totpUri"
              :class="[
                'flex-1',
                'rounded-2xl',
                'border',
                'border-transparent',
                'bg-white',
                'px-4',
                'py-3',
                'text-center',
                'text-sm',
                'font-semibold',
                'uppercase',
                'tracking-wide',
                'text-zinc-900',
                'transition',
                'hover:bg-zinc-100',
              ]"
            >
              Add to Authenticator
            </a>
          </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { TOTP, URI } from "otpauth";

interface TotpPayload {
  key: string;
  label: string;
  issuer: string;
  auth: string;
  icon: string;
  accent?: string;
  period?: number;
}

const route = useRoute();

const rawIssuer = route.query.issuer;
const issuerParam = Array.isArray(rawIssuer) ? rawIssuer[0] : rawIssuer;
const issuerKey = issuerParam?.toString().trim().toLowerCase();

if (!issuerKey) {
  throw createError({
    statusCode: 404,
    statusMessage: "Missing issuer query parameter.",
  });
}

const {
  data: totpResponse,
  error: totpError,
} = await useFetch<TotpPayload>("/api/totp", {
  query: { issuer: issuerKey },
});

if (totpError.value || !totpResponse.value) {
  throw createError({
    statusCode: totpError.value?.statusCode ?? 404,
    statusMessage: totpError.value?.statusMessage ?? "TOTP issuer not found.",
  });
}

const totpDetails = computed(() => totpResponse.value as TotpPayload);

useHead(() => ({
  title: `${totpDetails.value.label} • Secure TOTP`,
  meta: [
    {
      name: "description",
      content: `One-time passcode for ${totpDetails.value.label}.`,
    },
    {
      name: "robots",
      content: "noindex",
    },
  ],
}));

const otpCode = ref("");
const secondsRemaining = ref(0);
const period = ref(totpDetails.value.period ?? 60);
const copyState = ref<"idle" | "copied" | "error">("idle");
const totpInstance = shallowRef<TOTP | null>(null);
let ticker: ReturnType<typeof setInterval> | undefined;

hydrateTotp();

if (import.meta.server) {
  updateToken();
}

onMounted(() => {
  startTicker();
});

onBeforeUnmount(() => {
  stopTicker();
});

const accentColor = computed(() => totpDetails.value.accent ?? "#6366f1");
const accentSurface = computed(() => hexToRgba(accentColor.value, 0.15));
const accentBorder = computed(() => hexToRgba(accentColor.value, 0.35));
const issuerDisplay = computed(() => totpDetails.value.label || totpDetails.value.issuer);
const totpUri = computed(() => totpDetails.value.auth);
const periodLabel = computed(() => `${period.value}s window`);

const codeGroups = computed(() => {
  const digits = totpInstance.value?.digits ?? 6;
  if (!otpCode.value) {
    return Array.from({ length: Math.ceil(digits / 3) }, () => "•••");
  }

  const padded = otpCode.value.padStart(digits, "0");
  const groups: string[] = [];

  for (let i = 0; i < padded.length; i += 3) {
    groups.push(padded.slice(i, i + 3));
  }

  return groups;
});

const progressPercent = computed(() => {
  const windowSeconds = period.value || 60;
  return Math.min(
    100,
    Math.max(0, ((windowSeconds - secondsRemaining.value) / windowSeconds) * 100)
  );
});

async function copyCode() {
  if (!otpCode.value || typeof navigator === "undefined") {
    return;
  }

  try {
    await navigator.clipboard.writeText(otpCode.value);
    copyState.value = "copied";
  } catch {
    copyState.value = "error";
  } finally {
    setTimeout(() => {
      copyState.value = "idle";
    }, 1800);
  }
}

function hydrateTotp() {
  const entry = totpDetails.value;
  const parsed = URI.parse(entry.auth);

  if (!(parsed instanceof TOTP)) {
    throw createError({
      statusCode: 500,
      statusMessage: "Invalid TOTP configuration.",
    });
  }

  if (entry.period) {
    parsed.period = entry.period;
  }

  totpInstance.value = parsed;
  period.value = parsed.period ?? entry.period ?? 60;
}

function updateToken() {
  if (!totpInstance.value) {
    return;
  }

  otpCode.value = totpInstance.value.generate();
  const windowSeconds = totpInstance.value.period ?? period.value ?? 60;
  const nowSeconds = Math.floor(Date.now() / 1000);
  const elapsed = nowSeconds % windowSeconds;
  secondsRemaining.value = windowSeconds - elapsed;
}

function startTicker() {
  stopTicker();
  updateToken();
  ticker = setInterval(() => {
    updateToken();
  }, 1000);
}

function stopTicker() {
  if (ticker) {
    clearInterval(ticker);
    ticker = undefined;
  }
}

function hexToRgba(hex: string, alpha = 1) {
  let normalized = hex.replace("#", "");

  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const bigint = Number.parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
</script>
