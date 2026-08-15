import products from "@/products/data.json";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
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
            <tr key={product.productId} className="border-b border-slate-200">
              <td className="px-4 py-2">{product.productId}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">{product.unit}</td>
              <td className="px-4 py-2">{product.numberOfItems}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
