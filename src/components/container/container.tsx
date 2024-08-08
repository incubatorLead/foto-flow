import { ReactNode } from "react"

import clsx from "clsx"

import s from "./container.module.scss"

type Props = {
  children?: ReactNode
  className?: string
}

export const Container = ({ children, className }: Props) => {
  return <div className={clsx(s.container, className)}>{children}</div>
}
