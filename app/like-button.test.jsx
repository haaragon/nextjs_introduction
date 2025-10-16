import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LikeButton from "./like-button.jsx";

// Minimal contract
// - Renders "Likes (0)" initially
// - Increments to "Likes (1)" after one click
// - Increments cumulatively on subsequent clicks

describe("LikeButton", () => {
  it("shows 0 likes initially and increments on click", async () => {
    const user = userEvent.setup();
    render(<LikeButton />);

    // initial state
    const button = screen.getByRole("button", { name: /likes \(0\)/i });
    expect(button).toBeInTheDocument();

    // first click
    await user.click(button);
    expect(
      screen.getByRole("button", { name: /likes \(1\)/i })
    ).toBeInTheDocument();

    // two more clicks -> 3 total
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));
    expect(
      screen.getByRole("button", { name: /likes \(3\)/i })
    ).toBeInTheDocument();
  });

  it("increments by 2 on double click", async () => {
    const user = userEvent.setup();
    render(<LikeButton />);

    const button = screen.getByRole("button", { name: /likes \(0\)/i });
    await user.dblClick(button);

    expect(
      screen.getByRole("button", { name: /likes \(2\)/i })
    ).toBeInTheDocument();
  });
});
