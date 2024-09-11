export const dataTableProductsMock = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: 100 + i * 10,
  description: `Description ${i + 1}`,
  image: `https://via.placeholder.com/150?text=${i + 1}`,
  material: `Material ${(i % 5) + 1}`,
  type: `Type ${(i % 3) + 1}`,
  link: `https://via.placeholder.com/150?text=${i + 1}`,
  viewCount: 100 + i * 2,
}));
