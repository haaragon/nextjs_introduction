import { render, screen } from "@testing-library/react";
import ProductsPage from "@/products/page";

describe("ProductsPage", () => {
  afterEach(() => {
    Reflect.deleteProperty(global, "fetch");
    jest.restoreAllMocks();
  });

  it("loads products from the API and renders them", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          productId: "P-001",
          name: "Fried Chicken Piece",
          description: "Single crispy fried chicken piece",
          unit: "piece",
          numberOfItems: 250,
          price: "3.99",
        },
      ],
    } as Response);
    global.fetch = fetchMock as typeof fetch;

    render(<ProductsPage />);

    expect(await screen.findByText("Fried Chicken Piece")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/products", {
      cache: "no-store",
    });
  });
});