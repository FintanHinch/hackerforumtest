export type HNItemType =
  | "story"
  | "comment"
  | "job"
  | "poll"
  | "pollopt";

export interface HNItem {
  id: number;
  type: HNItemType;
  by?: string;
  time?: number;
  title?: string;
  text?: string;
  url?: string;
  score?: number;
  descendants?: number;
  kids?: number[];
  deleted?: boolean;
  dead?: boolean;
}