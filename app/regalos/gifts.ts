import giftCategoriesData from './gifts-data.json';

export type Gift = {
  id: string;
  name: string;
  stores: string[];
  note?: string;
  category?: string;
  categoryOrder?: number;
  order?: number;
};

export type GiftCategory = {
  title: string;
  gifts: Gift[];
};

export const giftCategories = giftCategoriesData as GiftCategory[];

export function groupGifts(gifts: Gift[]) {
  const categories = new Map<
    string,
    { title: string; categoryOrder: number; gifts: Gift[] }
  >();

  gifts.forEach((gift) => {
    const title = gift.category || 'Regalos';
    const categoryOrder = gift.categoryOrder ?? 999;
    const current = categories.get(title);

    if (current) {
      current.gifts.push(gift);
    } else {
      categories.set(title, {
        title,
        categoryOrder,
        gifts: [gift],
      });
    }
  });

  return Array.from(categories.values())
    .sort((a, b) => a.categoryOrder - b.categoryOrder)
    .map((category) => ({
      title: category.title,
      gifts: category.gifts.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    }));
}
