'use client'

import type React from 'react'

// Badge component for consistency
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-start gap-[8px] overflow-hidden rounded-[90px] border border-[rgba(2,6,23,0.08)] bg-white px-[14px] py-[6px] shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] shadow-xs">
      <div className="relative flex h-[14px] w-[14px] items-center justify-center overflow-hidden">
        {icon}
      </div>
      <div className="flex flex-col justify-center text-center font-sans text-xs leading-3 font-medium text-[#37322F]">
        {text}
      </div>
    </div>
  )
}

export default function SecuritySection() {
  return (
    <div className="flex w-full flex-col items-center justify-center border-b border-[rgba(55,50,47,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-center gap-6 self-stretch border-b border-[rgba(55,50,47,0.12)] px-6 py-12 md:px-24 md:py-16">
        <div className="flex w-full max-w-[586px] flex-col items-center justify-start gap-4 overflow-hidden rounded-lg px-6 py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] shadow-none">
          <Badge
            icon={
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1L3 5v6c0 5 4 9 9 9s9-4 9-9V5l-9-4z"
                  stroke="#37322F"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            }
            text="Security & Trust"
          />
          <div className="flex flex-col justify-center self-stretch text-center font-sans text-3xl leading-tight font-semibold tracking-tight text-[#49423D] md:text-5xl md:leading-[60px]">
            Security-first by design
          </div>
          <div className="self-stretch text-center font-sans text-base leading-7 font-normal text-[#605A57]">
            Append-only ledgers, encryption, role-based controls and auditable proofs for finance
            and compliance teams.
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-start self-stretch overflow-hidden px-4 md:px-9">
        <div className="grid flex-1 grid-cols-1 gap-6 py-8 md:grid-cols-3 md:py-11">
          <div className="rounded-lg bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] md:col-span-2">
            <h4 className="mb-2 text-lg font-semibold text-[#37322F]">Auditable ledger + proofs</h4>
            <p className="text-sm leading-relaxed text-[#605A57]">
              Keep settlement proofs and append-only ledgers off the auction path while allowing
              verifiable on-chain proofs for audits and reconciliations.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h5 className="font-medium text-[#37322F]">Encryption</h5>
                <div className="text-sm text-[#605A57]">
                  TLS everywhere, and encryption at rest for sensitive datasets.
                </div>
              </div>
              <div>
                <h5 className="font-medium text-[#37322F]">RBAC & Audit</h5>
                <div className="text-sm text-[#605A57]">
                  Role-based access controls, audit trails, and least-privilege defaults.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-lg bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)]">
            <h5 className="font-semibold text-[#37322F]">Compliance-ready</h5>
            <div className="mt-2 text-sm text-[#605A57]">
              SOC-ready controls, exportable audit logs, and configurable retention policies to meet
              finance and regulatory needs.
            </div>
            <div className="mt-4 flex gap-2">
              <div className="rounded-full bg-[#F7F5F3] px-3 py-1 text-sm text-[#37322F]">SOC</div>
              <div className="rounded-full bg-[#F7F5F3] px-3 py-1 text-sm text-[#37322F]">PCI</div>
              <div className="rounded-full bg-[#F7F5F3] px-3 py-1 text-sm text-[#37322F]">
                Audit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
