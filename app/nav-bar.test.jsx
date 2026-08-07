import { render, screen } from "@testing-library/react";
import NavBar from "@/nav-bar.jsx";

describe("NavBar", () => {
  it("renders links to Home, Products and About", () => {
    render(<NavBar />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products"
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about"
    );
  });
});
