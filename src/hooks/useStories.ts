import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getItem, getNewStoryIds, getTopStoryIds } from "../api/hn";
import type { HNItem } from "../types/hn";

export type FeedType = "top" | "new";

type UseStoriesArgs = {
  feed: FeedType;
  pageSize: number;
  pageCount: number;
};

type UseStoriesResult = {
  storyIds: number[];
  stories: HNItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  hasMore: boolean;
  refetchAll: () => void;
};

export function useStories({ feed, pageSize, pageCount }: UseStoriesArgs): UseStoriesResult {
  const idsQuery = useQuery({
    queryKey: ["stories", feed, "ids"],
    queryFn: feed === "top" ? getTopStoryIds : getNewStoryIds,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });

  const visibleIds = useMemo(() => {
    const ids = idsQuery.data ?? [];
    const take = Math.max(0, pageSize) * Math.max(0, pageCount);
    return ids.slice(0, take);
  }, [idsQuery.data, pageSize, pageCount]);

  const itemQueries = useQueries({
    queries: visibleIds.map((id) => ({
      queryKey: ["item", id],
      queryFn: () => getItem(id),
      enabled: idsQuery.isSuccess,
      staleTime: 60_000,
      gcTime: 10 * 60_000,
    })),
  });

  const stories = useMemo(() => {
    if (visibleIds.length === 0) return [];

    const byId = new Map<number, HNItem>();
    for (const q of itemQueries) {
      if (q.data) byId.set(q.data.id, q.data);
    }

    return visibleIds
      .map((id) => byId.get(id))
      .filter((item): item is HNItem => Boolean(item))
      .filter((item) => item.type === "story")
      .filter((item) => !item.deleted && !item.dead);
  }, [itemQueries, visibleIds]);

  const isLoading =
    idsQuery.isLoading || (idsQuery.isSuccess && itemQueries.some((q) => q.isLoading));

  const firstItemError = itemQueries.find((q) => q.isError)?.error as Error | undefined;
  const error = (idsQuery.error as Error | null) ?? firstItemError ?? null;

  const hasMore = (idsQuery.data?.length ?? 0) > visibleIds.length;

  function refetchAll() {
    idsQuery.refetch();
    for (const q of itemQueries) q.refetch();
  }

  return {
    storyIds: idsQuery.data ?? [],
    stories,
    isLoading,
    isError: Boolean(error),
    errorMessage: error?.message ?? null,
    hasMore,
    refetchAll,
  };
}
