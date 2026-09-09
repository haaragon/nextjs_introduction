import ProductsTable from "@/products/products-table";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <ProductsTable />
    </main>
  );
}
