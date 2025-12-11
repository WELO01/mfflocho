"use client";

import { OrdersApi } from "@/app/cartOrders/CartOrders.api";
import { MugOrderApi } from "@/app/home/mugs/mugsModelApi";
import { PhotoPrintingApi } from "@/app/home/photoPrinting/photPrintingApi";
import { ServiceApi } from "@/app/home/services/serviceApi";
import { TumblerOrderApi } from "@/app/home/tumbler/thumblersModelApi";

import { LoginApi } from "@/app/login/LoginApi";
import { authSlice } from "@/app/login/slice";
import { authApi } from "@/app/register/registerApi";
import { ShippingAddressApi } from "@/app/shippingAddress/shippingAddress.Api";
import { UserApi } from "@/app/userSetting/userSetings.api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [ServiceApi.reducerPath]: ServiceApi.reducer,
     [PhotoPrintingApi.reducerPath]: PhotoPrintingApi.reducer,
      [OrdersApi.reducerPath]: OrdersApi.reducer,
      [ShippingAddressApi.reducerPath]: ShippingAddressApi.reducer,
      [UserApi.reducerPath]: UserApi.reducer,
      [MugOrderApi.reducerPath]: MugOrderApi.reducer,
      [TumblerOrderApi.reducerPath]: TumblerOrderApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      LoginApi.middleware,
      ServiceApi.middleware,
      PhotoPrintingApi.middleware,
      OrdersApi.middleware,
      ShippingAddressApi.middleware,
      UserApi.middleware,
      MugOrderApi.middleware,
      TumblerOrderApi.middleware,


      
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
