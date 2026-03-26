export type InventoryItem = {
  id: string;
  productId: string;
  email?: string;
  password?: string;
  code?: string;
  isSold: boolean;
};

export const inventory: InventoryItem[] = [
  {
    id: "fore-1",
    productId: "akun-fore-coffee",
    email: "fore1@example.com",
    password: "pass123",
    isSold: false,
  },
  {
    id: "fore-2",
    productId: "akun-fore-coffee",
    email: "fore2@example.com",
    password: "pass456",
    isSold: false,
  },
  {
    id: "fore-3",
    productId: "akun-fore-coffee",
    email: "fore3@example.com",
    password: "pass789",
    isSold: false,
  },
];


export function takeInventory(productId: string, quantity: number) {
  const available = inventory.filter(
    (item) => item.productId === productId && !item.isSold
  );

  if (available.length < quantity) {
    return null;
  }

  const selected = available.slice(0, quantity);

  for (const item of selected) {
    item.isSold = true;
  }

  return selected;
}

export function releaseInventory(ids: string[]) {
  for (const item of inventory) {
    if (ids.includes(item.id)) {
      item.isSold = false;
    }
  }
}