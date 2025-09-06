import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, BoardItem } from '../types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<{ products: Product[], total: number }, { 
      page?: number;
      pageSize?: number;
      sortField?: string;
      sortOrder?: 'asc' | 'desc';
      search?: string;
    }>({
      query: ({ page = 1, pageSize = 20, sortField, sortOrder, search }) => {
        let url = `products`;
        const params: Record<string, string> = {
          limit: pageSize.toString(),
          skip: ((page - 1) * pageSize).toString(),
        };
        
        if (sortField && sortOrder) {
          params.sortBy = sortField;
          params.order = sortOrder;
        }

        if (search) {
          url = 'products/search';
          params.q = search;
        }

        return {
          url,
          params,
        };
      },
      providesTags: ['Products']
    }),

    deleteProduct: builder.mutation<{ id: number; isDeleted: boolean; message: string }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            productApi.util.updateQueryData('getProducts', { page: 1, pageSize: 20 }, (draft) => {
              if (draft?.products) {
                draft.products = draft.products.filter(product => product.id !== id);
                if (draft.total > 0) {
                  draft.total -= 1;
                }
              }
            })
          );
        } catch {
        }
      },
      invalidatesTags: ['Products']
    }),

    getBoardItems: builder.query<{ todos: BoardItem[] }, void>({
      query: () => 'todos',
      transformResponse: (response: { todos: BoardItem[] }) => ({
        todos: response.todos.map(todo => ({
          ...todo,
          completed: todo.completed || false,
          inProgress: false
        }))
      })
    }),

    updateBoardItem: builder.mutation<BoardItem, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: {
          completed: status === 'completed',
          inProgress: status === 'inProgress'
        }
      }),
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const updates = {
          completed: status === 'completed',
          inProgress: status === 'inProgress'
        };
        
        const patchResult = dispatch(
          productApi.util.updateQueryData('getBoardItems', undefined, (draft) => {
            const todo = draft.todos.find(t => t.id === id);
            if (todo) {
              todo.completed = status === 'completed';
              todo.inProgress = status === 'inProgress';
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    })
  }),
});

export const { 
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetBoardItemsQuery,
  useUpdateBoardItemMutation
} = productApi;
