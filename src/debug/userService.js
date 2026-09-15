import { parseUserPayload } from "./userValidator.js";

export function loadUserFromRequest() {
  const request = {
    name: "Demo User",
    email: undefined
  };
  return parseUserPayload(request);
}
