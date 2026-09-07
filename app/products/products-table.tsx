"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  productId: string;
  name: string;
  description: string | null;
  unit: string;
  numberOfItems: number;
  price: string;
};

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as Product[];

        if (active) {
          setProducts(data);
          setError(null);
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load products",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-600">Loading products...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="text-sm text-red-700">
        {error}
      </p>
    );
  }

  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-slate-300">
          <th className="px-4 py-2 font-semibold">Product ID</th>
          <th className="px-4 py-2 font-semibold">Name</th>
          <th className="px-4 py-2 font-semibold">Description</th>
          <th className="px-4 py-2 font-semibold">Unit</th>
          <th className="px-4 py-2 font-semibold">Number of Items</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b border-slate-200">
            <td className="px-4 py-2">{product.productId}</td>
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">{product.description}</td>
            <td className="px-4 py-2">{product.unit}</td>
            <td className="px-4 py-2">{product.numberOfItems}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}