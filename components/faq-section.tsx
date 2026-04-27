'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'What is Varaads Exchange and who is it for?',
    answer:
      'Varaads Exchange is a centralized crypto-native DSP/SSP platform for advertisers, publishers, and ad operations teams that need low-latency serving with transparent settlement and attribution.',
  },
  {
    question: 'Why keep bidding centralized instead of on-chain?',
    answer:
      'Real-time bidding demands speed. We keep auctions centralized and cache-first for sub-100ms paths, then apply crypto where it adds value: settlement, proofs, and attribution trust.',
  },
  {
    question: 'What is included in the MVP build?',
    answer:
      'The MVP includes monorepo foundation, auth and multitenancy, campaign and publisher modules, JS SDK, auction engine, event pipeline, reporting, and internal ledger support.',
  },
  {
    question: 'How do you handle fraud and traffic quality?',
    answer:
      'Fraud controls combine precomputed risk signals and post-event review. We score IP, agent anomalies, timing patterns, domain mismatch, repeated wallet patterns, and placement behavior.',
  },
  {
    question: 'How are payouts and settlements designed?',
    answer:
      'Settlement uses append-only ledgers first, with USDC batch payouts on Polygon or Base as the starting rail. On-chain contracts stay outside the auction path to protect latency.',
  },
  {
    question: 'What should we build first to launch quickly?',
    answer:
      'Start with Prompt 1 to Prompt 6 in sequence: monorepo, auth, campaign manager, publisher onboarding, JS SDK, and auction engine. That yields a working serving skeleton fastest.',
  },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]))
  }

  return (
    <div className="flex w-full items-start justify-center">
      <div className="flex flex-1 flex-col items-start justify-start gap-6 px-4 py-16 md:px-12 md:py-20 lg:flex-row lg:gap-12">
        {/* Left Column - Header */}
        <div className="flex w-full flex-col items-start justify-center gap-4 lg:flex-1 lg:py-5">
          <div className="flex w-full flex-col justify-center font-sans text-4xl leading-tight font-semibold tracking-tight text-[#49423D] md:leading-[44px]">
            Frequently Asked Questions
          </div>
          <div className="w-full font-sans text-base leading-7 font-normal text-[#605A57]">
            Understand the architecture, delivery path,
            <br className="hidden md:block" />
            and settlement model before implementation.
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="flex w-full flex-col items-center justify-center lg:flex-1">
          <div className="flex w-full flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div
                  key={index}
                  className="w-full overflow-hidden border-b border-[rgba(73,66,61,0.16)]"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-[18px] text-left transition-colors duration-200 hover:bg-[rgba(73,66,61,0.02)]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 font-sans text-base leading-6 font-medium text-[#49423D]">
                      {item.question}
                    </div>
                    <div className="flex items-center justify-center">
                      <ChevronDownIcon
                        className={`h-6 w-6 text-[rgba(73,66,61,0.60)] transition-transform duration-300 ease-in-out ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-[18px] font-sans text-sm leading-6 font-normal text-[#605A57]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
