import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegisterRequest, RegisterResponse } from './interface';


export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_FLOCHO_API ,
  }),

  tagTypes: ['Auth'],

  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
