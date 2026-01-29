import type { HNItem } from "../../types/hn";
import StoryCard from "../StoryCard/StoryCard";
import "./StoryList.scss";

type Props = {
  stories: HNItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  onRetry: () => void;
};

export default function StoryList({ stories, isLoading, isError, errorMessage, onRetry }: Props) {
  if (isLoading && stories.length === 0) {
    return (
      <div className="story-list">
        <div className="card story-skeleton" />
        <div className="card story-skeleton" />
        <div className="card story-skeleton" />
        <div className="card story-skeleton" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card story-error">
        <p style={{ marginTop: 0 }}>
          Something went wrong{errorMessage ? `: ${errorMessage}` : "."}
        </p>
        <button className="btn" onClick={onRetry}>
          Retry
        </button>
      </div>
    );
  }

  if (!isLoading && stories.length === 0) {
    return <p className="muted">No stories found.</p>;
  }

  return (
    <div className="story-list">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
