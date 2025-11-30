import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegisterRequest, RegisterResponse } from './interface';


export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/auth',
  }),

  tagTypes: ['Auth'],

  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
