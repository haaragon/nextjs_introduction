/** @jest-environment node */

import { GET } from "@/api/products/route";
import { prisma } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
    },
  },
}));

const mockedFindMany = prisma.product.findMany as jest.Mock;

const mockProducts = [
  {
    id: 1,
    productId: "P-001",
    name: "Fried Chicken Piece",
    description: "Single crispy fried chicken piece (leg, thigh, wing, or breast)",
    unit: "piece",
    numberOfItems: 250,
    price: "3.99",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  },
  {
    id: 5,
    productId: "P-005",
    name: "French Fries",
    description: "Crispy golden french fries, regular size",
    unit: "serving",
    numberOfItems: 150,
    price: "2.99",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
  },
];

describe("GET /api/products", () => {
  afterEach(() => {
    mockedFindMany.mockReset();
  });

  it("returns the products from prisma as JSON", async () => {
    mockedFindMany.mockResolvedValue(mockProducts);

    const response = await GET();
    const products = await response.json();

    expect(response.status).toBe(200);
    expect(mockedFindMany).toHaveBeenCalledTimes(1);
    expect(Array.isArray(products)).toBe(true);
    expect(products).toHaveLength(2);
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: "P-001",
          name: "Fried Chicken Piece",
        }),
        expect.objectContaining({
          productId: "P-005",
          name: "French Fries",
        }),
      ]),
    );
  });

  it("returns an empty array when there are no products", async () => {
    mockedFindMany.mockResolvedValue([]);

    const response = await GET();
    const products = await response.json();

    expect(response.status).toBe(200);
    expect(products).toEqual([]);
  });
});
