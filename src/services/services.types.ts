export type Signin = {
  email: string
  password: string
}

export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
