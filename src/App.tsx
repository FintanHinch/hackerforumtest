import { useMemo, useState } from "react";
import { useStories, type FeedType } from "./hooks/useStories";
import { PAGE_SIZE } from "./constants/constants";
import FeedToggle from "./components/FeedToggle/FeedToggle";
import StoryList from "./components/StoryList/StoryList";

export default function App() {
  const [feed, setFeed] = useState<FeedType>("top");
  const [pageCount, setPageCount] = useState(1);

  const { stories, isLoading, isError, errorMessage, hasMore, refetchAll } = useStories({
    feed,
    pageSize: PAGE_SIZE,
    pageCount,
  });

  const isLoadingMore = isLoading && stories.length > 0;

  const title = useMemo(() => (feed === "top" ? "Top stories" : "New stories"), [feed]);

  function handleChangeFeed(next: FeedType) {
    setFeed(next);
    setPageCount(1);
  }

  function handleLoadMore() {
    setPageCount((c) => c + 1);
  }

  return (
    <div className="container">
      <header className="row mb-24">
        <h1 className="m-0">Hacker News</h1>
        <FeedToggle value={feed} onChange={handleChangeFeed} />
      </header>

      <div className="row mb-12">
        <p className="muted m-0">
          {title} • showing {stories.length} items
        </p>

        {isLoadingMore && <p className="muted m-0">Loading more…</p>}
      </div>

      <StoryList
        stories={stories}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        onRetry={refetchAll}
      />

      <div className="mt-16">
        <button className="btn" onClick={handleLoadMore} disabled={!hasMore || isLoading}>
          {hasMore ? (isLoadingMore ? "Loading…" : "Load more") : "No more stories"}
        </button>
      </div>
    </div>
  );
}
