import { createError, defineEventHandler, getQuery } from "h3";
import { findTotpIssuer } from "../config/totp";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const rawIssuer = query.issuer;
  const issuerValue = Array.isArray(rawIssuer) ? rawIssuer[0] : rawIssuer;
  const issuer = typeof issuerValue === "number" ? issuerValue.toString() : issuerValue;

  const entry = findTotpIssuer(issuer);

  if (!entry) {
    throw createError({
      statusCode: 404,
      statusMessage: "Requested TOTP issuer was not found.",
    });
  }

  return {
    key: entry.key,
    label: entry.label,
    issuer: entry.issuer,
    icon: entry.icon,
    auth: entry.auth,
    accent: entry.accent,
    period: entry.period,
  };
});
