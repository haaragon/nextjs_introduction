import { render, screen } from "@testing-library/react";
import NavBar from "@/nav-bar.jsx";
import { login } from "@/auth.js";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("NavBar", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renders links to Home, Products, About and a Logout button when logged in", () => {
    login();
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
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("renders nothing when the user is not logged in", () => {
    const { container } = render(<NavBar />);

    expect(container).toBeEmptyDOMElement();
  });
});
