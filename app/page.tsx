import { evaluateSection1HardStops } from '@/lib/engine/evaluateSection1HardStops'

export default function Home() {
  const result = evaluateSection1HardStops({
    hsDailyLossHit: false,
    hsWeeklyLossHit: false,
    hsRiskViolation: true,
    hsEmotionalTrade: true,
  })

  return (
    <main style={{ padding: '24px' }}>
      <h1>evaluateSection1HardStops Test</h1>

      <h2>Hard Stop Results</h2>
      <pre>{JSON.stringify(result.hardStopResults, null, 2)}</pre>

      <h2>Any Section 1 Hard Stop Triggered</h2>
      <pre>{JSON.stringify(result.anySection1HardStopTriggered, null, 2)}</pre>

      <h2>Blocking Reasons</h2>
      <pre>{JSON.stringify(result.blockingReasons, null, 2)}</pre>
    </main>
  )
}