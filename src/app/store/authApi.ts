import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Profile, User } from '../types';

export const authApi = createApi({
  reducerPath: 'authApi',
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
  endpoints: (builder) => ({
    login: builder.mutation<User, { username: string; password: string }>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query<Profile, {}>({
      query: () => ({
        url: 'auth/me',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;