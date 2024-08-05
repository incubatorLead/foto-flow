import { useEffect } from 'react'

import { useRegistrationConfirmationMutation } from '@/services/service'
import { Button, Typography } from '@teamlead.incubator/ui-kit'
import { useRouter } from 'next/router'

export default function RegistrationConfirmation() {
  const router = useRouter()
  const [registrationConfirmation, { isLoading }] = useRegistrationConfirmationMutation()

  useEffect(() => {
    registrationConfirmation({ confirmationCode: router.query.code })
  }, [registrationConfirmation, router.query.code])

  if (isLoading) {
    return <Typography variant={'large'}>LOADING...</Typography>
  }

  return (
    <>
      <div>
        <Typography variant={'h1'}>Congratulations!</Typography>
        <Typography variant={'h1'}>Your email has been confirmed</Typography>
      </div>
      <Button as={'a'} href={'/auth/log-in'}>
        Sign In
      </Button>
    </>
  )
}
