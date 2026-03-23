'use client'

import { useState } from 'react'

export default function Home() {
  const [result, setResult] = useState<unknown>(null)

  async function testApiRoute() {
    const response = await fetch('/api/precheck/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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

        tradeDirection: 'long',
        strategyThesis: 'Trend continuation into liquidity',
        tradeManagementPlan: 'partial',
        partialAtR: 1,
        moveStopToBreakEvenAtR: null,

        hsDailyLossHit: false,
        hsWeeklyLossHit: false,
        hsRiskViolation: false,
        hsEmotionalTrade: false,

        hsNoLiquidityDraw: false,
        hsMicroNotAlignedMacro: false,
        hsNoStructuralConfirmation: false,
        hsStrategyNotDefined: false,
        hsThesisMissing: false,
        hsRequiredStrategyRegimeNotPresent: false,
        hsInvalidStop: false,
        hsChasingEntry: false,
        hsPositionSizeInvalid: false,
      }),
    })

    const text = await response.text()
    let data: unknown = null

    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }

    const finalResult = {
      status: response.status,
      body: data,
    }

    console.log('API RESULT:', finalResult)
    setResult(finalResult)
  }

  return (
    <main style={{ padding: '24px' }}>
      <h1>API Route Test</h1>
      <button
        onClick={testApiRoute}
        style={{
          padding: '12px 16px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Test /api/precheck/submit
      </button>

      <pre style={{ marginTop: '24px', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </main>
  )
}