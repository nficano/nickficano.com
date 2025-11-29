export interface TotpIssuerConfig {
  key: string;
  label: string;
  issuer: string;
  auth: string;
  icon: string;
  accent?: string;
  period?: number;
}

export const totpDirectory = {
  plex: {
    key: "plex",
    label: "Plex",
    issuer: "Plex",
    auth: "otpauth://totp/Plex:Plex_nficano?secret=635JZ3NFLLD4HUPOIZJA32IGMXZMC6PB&issuer=Plex",
    icon: "/icon/plex.tv.png",
    accent: "#e5a00d",
    period: 60,
  },
} as const satisfies Record<string, TotpIssuerConfig>;

export type TotpIssuerKey = keyof typeof totpDirectory;

export const normalizeIssuer = (issuer?: string | string[] | null) => {
  if (!issuer) {
    return null;
  }

  const value = Array.isArray(issuer) ? issuer[0] : issuer;
  return value?.trim().toLowerCase() || null;
};

export const findTotpIssuer = (issuer?: string | string[] | null) => {
  const normalized = normalizeIssuer(issuer);

  if (!normalized) {
    return null;
  }

  return (
    totpDirectory[normalized as TotpIssuerKey] ?? null
  );
};
