import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '@/types/book';

export type WishItem = Book & { savedAt: number };

function getWishId(book: Book) {
  return book.url || book.isbn;
}

type WishListState = {
  items: WishItem[];
  isWished: (book: Book) => boolean;
  toggle: (book: Book) => void;
  remove: (book: Book) => void;
  clear: () => void;
};

export const useWishListStore = create<WishListState>()(
  persist(
    (set, get) => ({
      items: [],

      isWished: book => {
        // console.log('isWished', book);
        const id = getWishId(book);
        return get().items.some(it => getWishId(it) === id);
      },

      toggle: book => {
        const id = getWishId(book);
        set(state => {
          const exists = state.items.some(it => getWishId(it) === id);
          if (exists) {
            return { items: state.items.filter(it => getWishId(it) !== id) };
          }
          const next: WishItem = { ...book, savedAt: Date.now() };
          return { items: [next, ...state.items] };
        });
      },

      remove: book => {
        const id = getWishId(book);
        set(state => ({ items: state.items.filter(it => getWishId(it) !== id) }));
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: 'wish_list',
      version: 1,
    },
  ),
);
