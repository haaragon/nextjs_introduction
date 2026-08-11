import { render, screen, within } from "@testing-library/react";
import HomePage from "@/page.jsx";

describe("HomePage", () => {
  it("renders headers and a list of names and includes the LikeButton", () => {
    render(<HomePage />);
    // TODO: Add a test to check if the LikeButton is rendered
  });
});
