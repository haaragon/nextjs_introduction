const { PrismaClient } = require("../app/generated/prisma");
const products = require("../app/products/data.json");

const prisma = new PrismaClient();

const seededProducts = products.slice(0, 5).map((product, index) => ({
  productId: product.productId,
  name: product.name,
  description: product.description,
  unit: product.unit,
  numberOfItems: product.numberOfItems,
  price: ["3.99", "8.49", "10.99", "24.99", "2.99"][index],
}));

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: seededProducts,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Failed to seed products", error);
    await prisma.$disconnect();
    process.exit(1);
  });