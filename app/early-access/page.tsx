'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Enter a valid email'),
  company: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function EarlyAccessPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    const res = await fetch('/api/early-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company?.trim() || undefined,
        message: values.message?.trim() || undefined,
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) {
      setServerError(data.error ?? 'Something went wrong. Try again.')
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F7F5F3] px-4 py-10 sm:py-16">
      <div className="flex w-full max-w-[520px] flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-sans text-sm font-medium text-[#37322F] transition-opacity hover:opacity-80"
          >
            ← Back
          </Link>
          <div className="font-sans text-base font-medium text-[#2F3037]">Varaads</div>
        </div>

        <div className="rounded-[9px] border border-[rgba(55,50,47,0.12)] bg-white p-6 shadow-[0px_0px_0px_0.9px_rgba(0,0,0,0.06)] sm:p-8">
          {submitted ? (
            <div className="flex flex-col gap-4 text-center">
              <h1 className="font-sans text-2xl font-semibold tracking-tight text-[#49423D] sm:text-3xl">
                You&apos;re on the list
              </h1>
              <p className="font-sans text-sm leading-relaxed text-[#605A57] sm:text-base">
                Thanks for your interest. We&apos;ll reach out when early access opens.
              </p>
              <Button
                asChild
                className="mt-2 rounded-full bg-[#37322F] text-white hover:bg-[#2A2520]"
              >
                <Link href="/">Return home</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-2">
                <h1 className="font-sans text-2xl font-semibold tracking-tight text-[#49423D] sm:text-3xl">
                  Request early access
                </h1>
                <p className="font-sans text-sm leading-relaxed text-[#605A57] sm:text-base">
                  Share your details and we&apos;ll notify you when spots open.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#37322F]">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jane Doe"
                            autoComplete="name"
                            className="border-[rgba(55,50,47,0.15)] bg-[#F7F5F3]/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#37322F]">Work email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@company.com"
                            autoComplete="email"
                            className="border-[rgba(55,50,47,0.15)] bg-[#F7F5F3]/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#37322F]">Company (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Acme"
                            autoComplete="organization"
                            className="border-[rgba(55,50,47,0.15)] bg-[#F7F5F3]/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#37322F]">
                          Anything we should know? (optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Use case, volume, timeline…"
                            rows={4}
                            className="min-h-[100px] resize-y border-[rgba(55,50,47,0.15)] bg-[#F7F5F3]/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {serverError ? (
                    <p className="text-destructive text-sm" role="alert">
                      {serverError}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="h-11 w-full rounded-full bg-[#37322F] px-10 text-white shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] hover:bg-[#2A2520] sm:w-auto"
                  >
                    {form.formState.isSubmitting ? 'Submitting…' : 'Join waitlist'}
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
