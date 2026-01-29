import type { HNItem } from "../types/hn";
import { BASE_URL } from "../constants/constants";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export function getTopStoryIds(): Promise<number[]> {
  return fetchJson<number[]>(`${BASE_URL}/topstories.json`);
}

export function getNewStoryIds(): Promise<number[]> {
  return fetchJson<number[]>(`${BASE_URL}/newstories.json`);
}

export function getItem(id: number): Promise<HNItem> {
  return fetchJson<HNItem>(`${BASE_URL}/item/${id}.json`);
}
