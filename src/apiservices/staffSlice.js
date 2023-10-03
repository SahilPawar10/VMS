import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectToken } from "../reducers/auth.reducer";
import { BaseUrl } from "../config/constant";

export const staffApi = createApi({
  reducerPath: "staff",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: async (headers, getState) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
    },
  }),

  endpoints: (builder) => ({
    viewStaff: builder.query({
      query: () => {
        return {
          url: "/staff",
          method: "GET",
        };
      },
    }),
    addStaff: builder.mutation({
      query: (data) => {
        return {
          url: "/staff",
          method: "POST",
          body: data,
        };
      },
    }),
    deleteStaff: builder.mutation({
      query: (id) => {
        return {
          url: `/staff/delete/${id}`,
          method: "PATCH",
        };
      },
    }),
    importStaff: builder.mutation({
      query: (data) => {
        return {
          url: `/staff/upload`,
          method: "POST",
          body: data,
        };
      },
    }),
    profileStaff: builder.mutation({
      query: (data) => {
        return {
          url: `/staff/profile`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useViewStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useImportStaffMutation,
  useProfileStaffMutation,
} = staffApi;
