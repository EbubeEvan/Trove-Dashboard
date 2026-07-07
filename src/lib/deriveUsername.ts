export function deriveUsername(email: string | null | undefined, fallback = 'there') {
  const username = email ? email.split('@')[0] : fallback;
  return username.charAt(0).toUpperCase() + username.slice(1);
}
