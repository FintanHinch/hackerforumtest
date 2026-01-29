import type { FeedType } from "../../hooks/useStories";
import "./FeedToggle.scss";

type Props = {
  value: FeedType;
  onChange: (feed: FeedType) => void;
};

export default function FeedToggle({ value, onChange }: Props) {
  const isTop = value === "top";
  const isNew = value === "new";

  return (
    <div className="feed-toggle">
      <button className={`btn ${isTop ? "active" : ""}`} onClick={() => onChange("top")}>
        Top
      </button>

      <button className={`btn ${isNew ? "active" : ""}`} onClick={() => onChange("new")}>
        New
      </button>
    </div>
  );
}
