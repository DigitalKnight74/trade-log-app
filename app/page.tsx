import { buildDecisionSnapshot } from '@/lib/engine/buildDecisionSnapshot'

export default function Home() {
  const snapshot = buildDecisionSnapshot({
    normalizedPayload: {
      tradeDirection: 'long',
      riskTier: 'normal',
      asset: 'BTCUSD',
      macroClarityScore: 9,
      midStructureScore: 8.7,
      strategyFitScore: 9.1,
      executionScore: 8.8,
    },
    weightedScores: {
      macroWeightedScore: 2.7,
      midWeightedScore: 2.61,
      strategyWeightedScore: 2.275,
      executionWeightedScore: 1.32,
      finalCompositeScore: 8.905,
    },
    hardStopEvaluation: {
      hardStopResults: {
        hsDailyLossHit: false,
        hsWeeklyLossHit: false,
        hsRiskViolation: false,
        hsEmotionalTrade: false,
      },
      anyHardStopTriggered: false,
      blockingReasons: [],
      warnings: [],
    },
    thresholdUsed: 8.75,
    decision: {
      finalDecision: 'GO',
      decisionBasis: 'score_pass',
    },
    decisionReasonSummary: {
      decisionPath: [
        'Validation passed',
        'No hard stops triggered',
        'Final composite score 8.905 met threshold 8.75',
        'Decision = GO',
      ],
      blockingReasons: [],
      warnings: [],
    },
  })

  return (
    <main style={{ padding: '24px' }}>
      <h1>buildDecisionSnapshot Test</h1>
      <pre>{JSON.stringify(snapshot, null, 2)}</pre>
    </main>
  )
}