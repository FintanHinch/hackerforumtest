export function getHostname(rawUrl?: string): string | null {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function getHnItemUrl(id: number): string {
  return `https://news.ycombinator.com/item?id=${id}`;
}