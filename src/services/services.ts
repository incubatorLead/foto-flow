import { MeResponse, Signin } from "@/services/services.types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const service = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://inctagram.work/api",
    prepareHeaders: headers => {
      const token = localStorage.getItem("token")

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: builder => ({
    me: builder.query<MeResponse, void>({
      //providesTags: ["Me"],
      query: () => ({
        method: "GET",
        url: "v1/auth/me"
      })
    }),
    signin: builder.mutation<{ accessToken: "string" }, Signin>({
      //invalidatesTags: ["Me"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          //const test = localStorage.getItem("token")
          //localStorage.removeItem("token")
          //console.log(test, "success")
        } catch (error) {
          console.log(error, "error")

          return
        }
      },
      query: body => {
        return {
          body,
          method: "POST",
          url: "v1/auth/login"
        }
      }
    }),
    signout: builder.mutation<void, void>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled
        const test = localStorage.getItem("token")

        localStorage.removeItem("token")
      },
      query: () => {
        return {
          method: "POST",
          url: "v1/auth/logout"
        }
      }
    })
  })
})

export const { useLazyMeQuery, useMeQuery, useSigninMutation, useSignoutMutation } = service
/*
logout: builder.mutation<void, void>({
  async onQueryStarted(_, { dispatch, queryFulfilled }) {
    await queryFulfilled;
    localStorage.removeItem('accessToken');
    dispatch(authApi.util.resetApiState());
  },
  query: (body) => ({
    body,
    method: 'POST',
    url: 'v1/auth/logout'
  })
}),*/
