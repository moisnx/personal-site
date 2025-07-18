export function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0].replace(/-/g, ".");
}
