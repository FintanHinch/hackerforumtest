import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FeedToggle from "./FeedToggle";

describe("FeedToggle", () => {
  it("calls onChange with 'new' when New is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<FeedToggle value="top" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /new/i }));

    expect(onChange).toHaveBeenCalledWith("new");
  });

  it("shows active class on the selected option", () => {
    const onChange = vi.fn();

    render(<FeedToggle value="top" onChange={onChange} />);

    const topBtn = screen.getByRole("button", { name: /top/i });
    const newBtn = screen.getByRole("button", { name: /new/i });

    expect(topBtn.className).toMatch(/active/);
    expect(newBtn.className).not.toMatch(/active/);
  });
});
