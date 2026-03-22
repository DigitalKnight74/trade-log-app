import { validatePrecheckPayload } from '@/lib/engine/validatePrecheckPayload'

export default function Home() {
  const validResult = validatePrecheckPayload({
    asset: 'BTCUSD',
    session: 'London',
    riskTier: 'normal',
    primaryStrategy: 'TC1',
    macroScore: 9,
    midStructureScore: 8.7,
    strategyFitScore: 9.1,
    executionQualityScore: 8.8,
    entryPrice: 101.25,
    stopPrice: 99.8,
    targetPrice: 106.5,
    plannedRR: 2.4,
    positionSize: 500,
  })

  const invalidResult = validatePrecheckPayload({
    asset: '',
    session: '',
    riskTier: 'reckless',
    primaryStrategy: 'dragon_mode',
    macroScore: 12,
    midStructureScore: 'bad',
    strategyFitScore: null,
    executionQualityScore: -2,
    entryPrice: 'abc',
    stopPrice: null,
    targetPrice: undefined,
    plannedRR: 0,
    positionSize: -50,
  })

  return (
    <main style={{ padding: '24px' }}>
      <h1>validatePrecheckPayload Test</h1>

      <h2>Valid Result</h2>
      <pre>{JSON.stringify(validResult, null, 2)}</pre>

      <h2>Invalid Result</h2>
      <pre>{JSON.stringify(invalidResult, null, 2)}</pre>
    </main>
  )
}