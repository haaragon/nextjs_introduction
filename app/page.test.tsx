import { render } from "@testing-library/react";
import HomePage from "@/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("HomePage", () => {
  it("renders home page", () => {
    render(<HomePage />);
  });
});
