import { evaluateHardStops } from '@/lib/engine/evaluateHardStops'

export default function Home() {
  const result = evaluateHardStops({
    section1: {
      hsDailyLossHit: false,
      hsWeeklyLossHit: false,
      hsRiskViolation: true,
      hsEmotionalTrade: false,
    },
    section2: {
      macroClarityScore: 8.5,
      hsNoLiquidityDraw: false,
    },
    section3: {
      hsNoStructureConfirmation: true,
    },
    section4: {
      hsStrategyNotDefined: false,
      hsThesisMissing: false,
      hsInvalidRegime: false,
    },
    section5: {
      hsInvalidStop: false,
      plannedRR: 1.4,
      minimumRR: 1.6,
      hsChasingEntry: false,
      hsPositionSizeInvalid: false,
    },
  })

  return (
    <main style={{ padding: '24px' }}>
      <h1>evaluateHardStops Test</h1>

      <h2>Any Hard Stop Triggered</h2>
      <pre>{JSON.stringify(result.anyHardStopTriggered, null, 2)}</pre>

      <h2>Hard Stop Results</h2>
      <pre>{JSON.stringify(result.hardStopResults, null, 2)}</pre>

      <h2>Blocking Reasons</h2>
      <pre>{JSON.stringify(result.blockingReasons, null, 2)}</pre>

      <h2>Warnings</h2>
      <pre>{JSON.stringify(result.warnings, null, 2)}</pre>
    </main>
  )
}