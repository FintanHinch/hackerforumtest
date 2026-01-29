import { timeAgo } from "../../utils/time";
import { getHostname, getHnItemUrl } from "../../utils/url";
import type { HNItem } from "../../types/hn";
import "./StoryCard.scss";

type Props = {
  story: HNItem;
};

export default function StoryCard({ story }: Props) {
  const title = story.title ?? "Untitled";
  const url = story.url ?? getHnItemUrl(story.id);
  const hostname = getHostname(story.url);

  return (
    <article className="story-card card">
      <div className="story-main">
        <a className="story-title" href={url} target="_blank" rel="noreferrer">
          {title}
        </a>

        {hostname && <div className="story-host muted">{hostname}</div>}
      </div>

      <div className="story-meta muted">
        <span>{story.score ?? 0} points</span>
        <span>by {story.by ?? "unknown"}</span>
        <span>{timeAgo(story.time)}</span>
        <span>{story.descendants ?? 0} comments</span>
      </div>
    </article>
  );
}
