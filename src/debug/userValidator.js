export function parseUserPayload(payload) {
  if (!payload || typeof payload.email !== "string") {
    throw new TypeError("User payload is missing a valid email address");
  }

  return {
    email: payload.email.trim().toLowerCase(),
    name: payload.name?.trim() ?? "Anonymous"
  };
}
