export function FeatureCards() {
  const features = [
    {
      title: '7-layer architecture',
      description:
        'Experience, gateway, core services,\nRTB, intelligence, settlement, observability.',
      highlighted: true,
    },
    {
      title: 'Sub-100ms RTB path',
      description: 'Go-based auction path, Redis hot cache,\nand asynchronous event writes.',
      highlighted: false,
    },
    {
      title: 'Crypto trust rails',
      description: 'USDC batch settlement, append-only ledger,\nand wallet-native attribution.',
      highlighted: false,
    },
  ]

  return (
    <section className="border-t border-b border-[#e0dedb]">
      <div className="mx-auto max-w-[1060px] px-4">
        <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 p-6 ${
                // Updated feature card borders to 1px
                feature.highlighted
                  ? 'border border-[#e0dedb] bg-white shadow-sm'
                  : 'border border-[#e0dedb]/80'
              }`}
            >
              {feature.highlighted && (
                <div className="mb-2 space-y-1">
                  <div className="h-0.5 w-full bg-[#322d2b]/8"></div>
                  <div className="h-0.5 w-32 bg-[#322d2b]"></div>
                </div>
              )}
              <h3 className="text-sm leading-6 font-semibold text-[#49423d]">{feature.title}</h3>
              <p className="text-sm leading-[22px] whitespace-pre-line text-[#605a57]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
