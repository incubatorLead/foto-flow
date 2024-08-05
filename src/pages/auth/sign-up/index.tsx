import { useForm } from 'react-hook-form'

import { SignupFields, signupSchema } from '@/pages/auth/sign-up/sign-up.schema'
import { useSignupMutation } from '@/services/service'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  FormCheckbox,
  FormInput,
  IconGithub,
  IconGoogle,
  Modal,
  Typography,
} from '@teamlead.incubator/ui-kit'
import { useRouter } from 'next/router'

export default function SignUp() {
  const [signup, { isSuccess }] = useSignupMutation()
  const router = useRouter()

  console.log(router)
  const {
    control,
    formState: { errors },
    getFieldState,
    handleSubmit,
  } = useForm<SignupFields>({
    mode: 'onTouched',
    resolver: zodResolver(signupSchema),
  })

  const isSignUpButtonDisabled = getFieldState('username')

  console.log(isSignUpButtonDisabled)

  const onSubmit = handleSubmit(data => {
    signup({
      email: data.email,
      password: data.password,
      userName: data.username,
    })
      .unwrap()
      .then()
  })

  if (isSuccess) {
    return (
      <>
        <Modal title={'Email sent'} trigger={<></>}>
          <div style={{ padding: '30px 24px 36px' }}>
            We have sent a link to confirm your email to epam@epam.com
            <Button style={{ marginTop: '18px' }}>OK</Button>
          </div>
        </Modal>
      </>
    )
  }

  return (
    <Card style={{ maxWidth: '378px', padding: '24px' }}>
      <Typography style={{ marginBottom: '13px', textAlign: 'center' }} variant={'h1'}>
        Sign Up
      </Typography>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '60px',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <Button variant={'text'}>
          <IconGoogle height={36} width={36} />
        </Button>
        <Button style={{ color: 'white' }} variant={'text'}>
          <IconGithub height={36} width={36} />
        </Button>
      </div>
      <form
        onSubmit={onSubmit}
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        <FormInput
          control={control}
          labelText={'Username'}
          name={'username'}
          style={{ width: '100%' }}
        />
        <FormInput
          control={control}
          error={errors.email?.message}
          labelText={'Email'}
          name={'email'}
        />
        <FormInput
          control={control}
          error={errors.password?.message}
          labelText={'Password'}
          name={'password'}
          type={'password'}
        />
        <FormInput
          control={control}
          error={errors.confirmPassword?.message}
          labelText={'Confirm password'}
          name={'confirmPassword'}
          type={'password'}
        />
        <FormCheckbox
          control={control}
          labelText={
            <Typography variant={'small_text'}>
              I agree to the{' '}
              <Typography as={'span'} variant={'small_link'}>
                Terms of Service
              </Typography>{' '}
              and{' '}
              <Typography as={'span'} variant={'small_link'}>
                Privacy Policy
              </Typography>
            </Typography>
          }
          name={'policy'}
        />
        <Button fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Typography style={{ textAlign: 'center' }}>Do you have an account?</Typography>
        <Button fullWidth variant={'text'}>
          Sign In
        </Button>
      </div>
    </Card>
  )
}
