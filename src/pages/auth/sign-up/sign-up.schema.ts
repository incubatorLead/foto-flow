import { z } from 'zod'

export const signupSchema = z
  .object({
    confirmPassword: z.string(),
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'The email must match the format example@example.com' }),
    password: z
      .string({ message: 'Password is required' })
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]+$/,
        {
          message:
            'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
        }
      ),
    policy: z.boolean(),
    username: z
      .string({ message: 'Username is required' })
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      .regex(/^[a-zA-Z0-9_-]*$/, {
        message: 'Username may contain 0-9; A-Z; a-z; _; -',
      }),
  })
  .refine(
    values => {
      return values.password === values.confirmPassword
    },
    {
      message: 'The passwords must match!',
      path: ['confirmPassword'],
    }
  )

export type SignupFields = z.infer<typeof signupSchema>
