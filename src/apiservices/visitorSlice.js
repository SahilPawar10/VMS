import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../config/constant";

export const visitorApi = createApi({
  reducerPath: "visitor",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
    },
  }),
  endpoints: (builder) => ({
    getVisitor: builder.query({
      query: () => {
        return {
          url: "/visitor",
          method: "GET",
        };
      },
    }),
    deleteVisitor: builder.mutation({
      query: (data) => {
        return {
          url: "/visitor",
          method: "PATCH",
          body: data,
        };
      },
    }),
    viewTodays: builder.query({
      query: () => {
        return {
          url: "/visitor/todays",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useViewTodaysQuery } = visitorApi;
