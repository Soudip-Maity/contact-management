import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiEndpoints = createApi({
  reducerPath: "apiEndpoints",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({


    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),

    getcontacts: builder.query({
      query: () => "contact",
      providesTags: ["contact"],
    }),

    createcontacts: builder.mutation({
      query: (data) => ({
        url: "contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),

    deletecontacts: builder.mutation({
      query: (id) => ({
        url: `contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),

    editcontacts: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `contact/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetcontactsQuery,
  useCreatecontactsMutation,
  useDeletecontactsMutation,
  useEditcontactsMutation,
  useRegisterMutation,
  useLoginMutation,
} = apiEndpoints;
