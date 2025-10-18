import { render, screen, within } from "@testing-library/react";
import HomePage from "@/page.jsx";

describe("HomePage", () => {
  it("renders headers and a list of names and includes the LikeButton", () => {
    const { container } = render(<HomePage />);

    // Headers
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("A new title")).toBeInTheDocument();

    // Names list
    const list = container.querySelector("ul");
    expect(list).toBeTruthy();
    if (!list) throw new Error("List not found");
    const items = within(list).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual([
      "Ada Lovelace",
      "Grace Hopper",
      "Margaret Hamilton",
    ]);

    // Like button exists
    expect(
      screen.getByRole("button", { name: /likes \(0\)/i })
    ).toBeInTheDocument();
  });
});
