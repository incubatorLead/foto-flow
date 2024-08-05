import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const service = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api' }),
  endpoints: builder => ({
    registrationConfirmation: builder.mutation({
      query: body => {
        return {
          body,
          method: 'POST',
          url: 'v1/auth/registration-confirmation',
        }
      },
    }),
    signup: builder.mutation({
      query: body => {
        return {
          body,
          method: 'POST',
          url: 'v1/auth/registration',
        }
      },
    }),
  }),
})

export const { useRegistrationConfirmationMutation, useSignupMutation } = service
