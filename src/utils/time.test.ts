import { describe, it, expect } from "vitest";
import { timeAgo } from "./time";

describe("timeAgo", () => {
  it("returns seconds ago", () => {
    const now = 1_000_000;
    const tenSecondsAgo = (now - 10_000) / 1000;

    expect(timeAgo(tenSecondsAgo, now)).toBe("10s ago");
  });

  it("returns minutes ago", () => {
    const now = 1_000_000;
    const fiveMinutesAgo = (now - 5 * 60_000) / 1000;

    expect(timeAgo(fiveMinutesAgo, now)).toBe("5m ago");
  });

  it("handles missing time", () => {
    expect(timeAgo(undefined)).toBe("unknown");
  });
});
