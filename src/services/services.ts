import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const service = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://inctagram.work/api" }),
  endpoints: builder => ({
    signin: builder.mutation({
      query: body => {
        return {
          body,
          method: "POST",
          url: "/v1/auth/login"
        }
      }
    })
  })
})

export const { useSigninMutation } = service
