import React, { useState } from "react"

import { Container } from "@/components/container/container"
import { useMeQuery, useSignoutMutation } from "@/services/services"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconBellFill,
  IconBellOutline,
  IconRussiaFlag,
  IconUnitedKingdomFlag,
  Modal,
  Select,
  Typography
} from "@teamlead.incubator/ui-kit"
import clsx from "clsx"
import Link from "next/link"

import s from "./header.module.scss"

const languages = [
  { icon: <IconUnitedKingdomFlag />, text: "English", value: "uk" },
  { icon: <IconRussiaFlag />, text: "Russian", value: "ru" }
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data } = useMeQuery()

  const [signout] = useSignoutMutation()
  const [isLogout, setIsLogout] = useState(false)

  return (
    <header className={s.header}>
      <Container className={s.headerWrapper}>
        <Link className={s.logo} href={"/"}>
          FotoFlow
        </Link>
        {/* TODO move inline styles to header.module.scss */}
        <div className={s.controls}>
          <DropdownMenu
            onOpenChange={open => {
              setIsOpen(open)
            }}
          >
            <DropdownMenuTrigger>
              <Button className={clsx(s.notification, isOpen && s.notificationOpened)}>
                {isOpen ? <IconBellFill /> : <IconBellOutline />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ maxWidth: "331px" }}>
              <DropdownMenuLabel>
                <Typography as={"h3"} variant={"bold_text_14"}>
                  Уведомления
                </Typography>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Typography as={"h4"} variant={"bold_text_14"}>
                    Новое уведомление!{" "}
                    <Typography as={"span"} style={{ color: "#397DF6" }} variant={"small_text"}>
                      Новое
                    </Typography>
                  </Typography>
                  <div>
                    <Typography variant={"regular_text_14"}>
                      Следующий платеж у вас спишется через 1 день
                    </Typography>
                    <Typography as={"span"} style={{ color: "#8D9094" }} variant={"small_text"}>
                      1 час назад
                    </Typography>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Typography as={"h4"} variant={"bold_text_14"}>
                    Новое уведомление!{" "}
                    <Typography as={"span"} style={{ color: "#397DF6" }} variant={"small_text"}>
                      Новое
                    </Typography>
                  </Typography>
                  <div>
                    <Typography variant={"regular_text_14"}>
                      Ваша подписка истекает через 7 дней
                    </Typography>
                    <Typography as={"span"} style={{ color: "#8D9094" }} variant={"small_text"}>
                      1 день назад
                    </Typography>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Typography as={"h4"} variant={"bold_text_14"}>
                    Новое уведомление!{" "}
                    <Typography as={"span"} style={{ color: "#397DF6" }} variant={"small_text"}>
                      Новое
                    </Typography>
                  </Typography>
                  <div>
                    <Typography variant={"regular_text_14"}>
                      Ваша подписка истекает через 7 дней
                    </Typography>
                    <Typography as={"span"} style={{ color: "#8D9094" }} variant={"small_text"}>
                      1 день назад
                    </Typography>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select className={s.language} defaultValue={languages[0].value} options={languages} />
          {!data && (
            <>
              <Button as={Link} className={s.signin} href={"/auth/sign-in"} variant={"text"}>
                Sign in
              </Button>
              <Button as={Link} className={s.signup} href={"/auth/sign-up"} variant={"primary"}>
                Sign up
              </Button>
            </>
          )}
          {data && (
            <Modal
              onOpenChange={setIsLogout}
              open={isLogout}
              title={"Logout"}
              trigger={<Button variant={"primary"}>Logout</Button>}
            >
              <Typography
                style={{
                  padding: "30px 24px"
                }}
                variant={"regular_text_16"}
              >
                Are you really want to log out of your account _email name_?
                <div style={{ marginTop: "18px", textAlign: "right" }}>
                  <Button
                    onClick={() => {
                      signout()
                      setIsLogout(false)
                    }}
                    style={{ marginRight: "10px" }}
                    variant={"secondary"}
                  >
                    YES
                  </Button>
                  <Button onClick={() => setIsLogout(false)} variant={"primary"}>
                    NO
                  </Button>
                </div>
              </Typography>
            </Modal>
          )}
        </div>
      </Container>
    </header>
  )
}
