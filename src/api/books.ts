import type { BookSearchRes } from '@/types/book';
import { api } from './axios';

export type BookSearchOptions = {
  query: string;
  sort?: 'accuracy' | 'latest';
  page?: number;
  size?: number;
  target?: 'title' | 'isbn' | 'publisher' | 'person';
};

export async function fetchBooks(params: BookSearchOptions): Promise<BookSearchRes> {
  const { query, sort = 'accuracy', page = 1, size = 10, target } = params;

  const res = await api.get('/search/book', {
    params: { query, sort, page, size, ...(target ? { target } : {}) },
  });

  return res.data;
}
