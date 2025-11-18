import { useNuxtApp } from "#imports";
import { onBeforeUnmount, onMounted, ref } from "vue";

const getCurrentUrl = () => {
  if (!process.client) {
    return "";
  }

  return window.location.href;
};

export function useWatchClipboard() {
  const copySuccess = ref(false);
  const nuxtApp = useNuxtApp();
  let unsubscribe: (() => void) | null = null;

  const copyToClipboard = async () => {
    const url = getCurrentUrl();
    if (!url || !navigator?.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      copySuccess.value = true;
      setTimeout(() => {
        copySuccess.value = false;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const registerShortcut = () => {
    if (!process.client || !nuxtApp.$watchShortcuts) {
      return;
    }

    unsubscribe = nuxtApp.$watchShortcuts.onCopyShortcut(copyToClipboard);
  };

  onMounted(registerShortcut);

  onBeforeUnmount(() => {
    unsubscribe?.();
    unsubscribe = null;
  });

  return {
    copySuccess,
    copyToClipboard,
  };
}
