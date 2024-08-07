import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const service = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://inctagram.work",
    prepareHeaders: headers => {
      const token = localStorage.getItem("token")

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: builder => ({
    logoutService: builder.mutation<void, void>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          localStorage.removeItem("token")
        } catch {
          return
        }
      },
      query: () => {
        return {
          method: "POST",
          url: "/api/v1/auth/logout"
        }
      }
    })
  }),
  reducerPath: "logoutService"
})

export const { useLogoutServiceMutation } = service
