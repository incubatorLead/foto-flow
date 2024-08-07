import { useForm } from "react-hook-form"

import { useSigninMutation } from "@/services/services"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Card,
  FormInput,
  IconGithub,
  IconGoogle,
  Typography
} from "@teamlead.incubator/ui-kit"
import clsx from "clsx"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { z } from "zod"

import s from "./login.module.scss"

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "The email must match the format example@example.com" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Minimum number of characters 6" })
    .max(30, { message: "Maximum number of characters 30" })
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/,
      {
        message:
          "Password must contain a-z, A-Z,  ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~"
      }
    )
})

type LoginFields = z.infer<typeof loginSchema>

export default function SignIn() {
  const [signin] = useSigninMutation()
  const router = useRouter()
  const token = ""

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onTouched",
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = handleSubmit(data => {
    signin(data)
      .unwrap()
      .then(async ({ accessToken }) => {
        localStorage.setItem("token", accessToken)
        router.push("/")
        // TODO make redirect to user account page
      })
      .catch(err => {
        setError("password", { message: err?.data?.messages ?? "An unexpected error occurred." })
      })
  })

  return (
    <>
      <Head>
        <title>Home | Instagram Client</title>
      </Head>
      <Card className={s.login}>
        <Typography className={s.title} variant={"large"}>
          Sign In
        </Typography>
        <div className={s.btnActions}>
          {/* TODO change href={"sads"} */}
          <Button as={Link} href={"sads"} title={"login via google"}>
            <IconGoogle height={36} width={36} />
          </Button>
          <Button as={Link} href={"sads"} title={"login via github"}>
            <IconGithub height={36} width={36} />
          </Button>
        </div>
        <form className={s.loginForm} onSubmit={onSubmit}>
          <FormInput
            control={control}
            error={errors?.email?.message}
            labelText={"Email"}
            name={"email"}
          />
          <FormInput
            control={control}
            error={errors?.password?.message}
            labelText={"Password"}
            name={"password"}
            type={"password"}
          />
          <Typography
            as={Link}
            className={clsx("regular_text_16", s.forgotPassword)}
            href={"sads"}
            title={"forgot password"}
          >
            Forgot Password
          </Typography>
          <Button fullWidth type={"submit"} variant={"primary"}>
            Sign In
          </Button>
        </form>
        <Typography className={s.noAccount} variant={"regular_text_16"}>
          Don’t have an account?
        </Typography>
        <Button className={s.switchForm} fullWidth variant={"text"}>
          Sign Up
        </Button>
      </Card>
    </>
  )
}
