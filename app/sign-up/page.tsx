'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SignUpSchema, type SignUpInput } from '@/lib/validators/auth'
import { signUpWithEmail } from '@/services/auth.service'

export default function SignUpPage(): JSX.Element {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit = async (data: SignUpInput): Promise<void> => {
    setSubmitError('')
    const result = await signUpWithEmail(data)
    if (!result.ok) {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.')
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F5F3] font-sans">
      <div className="pointer-events-none absolute top-0 left-4 h-full w-px bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] sm:left-8 lg:left-[calc(50%-530px)]" />
      <div className="pointer-events-none absolute top-0 right-4 h-full w-px bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] sm:right-8 lg:right-[calc(50%-530px)]" />

      <div className="relative z-10 mx-5 w-full max-w-[420px]">
        <div className="mb-0 h-px w-full bg-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]" />

        <div className="border-x border-b border-[rgba(55,50,47,0.12)] bg-white px-8 py-10 shadow-[0_8px_32px_rgba(55,50,47,0.07)]">
          <div className="mb-8">
            <span className="font-sans text-xl leading-5 font-medium tracking-tight text-[#2F3037]">
              Varaads
            </span>
          </div>

          <div className="mb-7">
            <h1 className="mb-1.5 font-sans text-2xl font-semibold tracking-tight text-[#37322F]">
              Create your account
            </h1>
            <p className="font-sans text-sm leading-relaxed text-[rgba(55,50,47,0.55)]">
              Start managing your ad campaigns today
            </p>
          </div>

          {submitError && (
            <div className="mb-5 rounded-lg border border-[rgba(239,68,68,0.18)] bg-[rgba(239,68,68,0.07)] px-4 py-3 text-sm text-red-600">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[11px] font-medium tracking-[0.07em] text-[rgba(55,50,47,0.5)] uppercase">
                Full name
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full rounded-[6px] border border-[#E0DEDB] bg-white px-3.5 py-2.5 font-sans text-sm text-[#37322F] transition-all outline-none placeholder:text-[rgba(55,50,47,0.28)] focus:border-[rgba(55,50,47,0.38)] focus:shadow-[0_0_0_3px_rgba(55,50,47,0.05)]"
                placeholder="John Smith"
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className="mt-0.5 text-xs text-red-600">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[11px] font-medium tracking-[0.07em] text-[rgba(55,50,47,0.5)] uppercase">
                Email address
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-[6px] border border-[#E0DEDB] bg-white px-3.5 py-2.5 font-sans text-sm text-[#37322F] transition-all outline-none placeholder:text-[rgba(55,50,47,0.28)] focus:border-[rgba(55,50,47,0.38)] focus:shadow-[0_0_0_3px_rgba(55,50,47,0.05)]"
                placeholder="you@company.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className="mt-0.5 text-xs text-red-600">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[11px] font-medium tracking-[0.07em] text-[rgba(55,50,47,0.5)] uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full rounded-[6px] border border-[#E0DEDB] bg-white py-2.5 pr-10 pl-3.5 font-sans text-sm text-[#37322F] transition-all outline-none placeholder:text-[rgba(55,50,47,0.28)] focus:border-[rgba(55,50,47,0.38)] focus:shadow-[0_0_0_3px_rgba(55,50,47,0.05)]"
                  placeholder="Min. 8 characters"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[rgba(55,50,47,0.32)] transition-colors hover:text-[rgba(55,50,47,0.65)]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <span className="mt-0.5 text-xs text-red-600">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#37322F] px-6 font-sans text-sm font-medium text-white shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] transition-all hover:-translate-y-px hover:bg-[#2A2520] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Get started
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center font-sans text-sm text-[rgba(55,50,47,0.48)]">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-[#37322F] transition-colors hover:text-[#2A2520]"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="h-px w-full bg-[rgba(55,50,47,0.12)] shadow-[0px_-1px_0px_white]" />
      </div>
    </div>
  )
}
