'use client'

import { useState } from 'react'

type ApiResult = {
  status: number
  body: unknown
} | null

export default function NewPrecheckPage() {
  const [formData, setFormData] = useState({
    asset: 'BTCUSD',
    session: 'London',
    riskTier: 'normal',
    primaryStrategy: 'TC1',

    macroScore: '9',
    midStructureScore: '8.7',
    strategyFitScore: '9.1',
    executionQualityScore: '8.8',

    entryPrice: '101.25',
    stopPrice: '99.8',
    targetPrice: '106.5',
    plannedRR: '2.4',
    positionSize: '500',

    tradeDirection: 'long',
    strategyThesis: 'Trend continuation into liquidity',
    tradeManagementPlan: 'partial',
    partialAtR: '1',
    moveStopToBreakEvenAtR: '',

    hsDailyLossHit: false,
    hsWeeklyLossHit: false,
    hsRiskViolation: false,
    hsEmotionalTrade: false,

    hsNoLiquidityDrawIdentified: false,
    hsMicroNotAlignedMacro: false,
    hsNoStructuralConfirmation: false,
    hsStrategyNotClear: false,
    hsThesisNotWrittenClearly: false,
    hsRequiredStrategyRegimeNotPresent: false,
    hsStopNotStructurallyBased: false,
    hsEntryChasingPrice: false,
    hsPositionSizeViolatesRiskTierAllowance: false,
  })

  const [result, setResult] = useState<ApiResult>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const target = event.target
    const { name, value } = target

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }))
      return
    }

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    try {
      const payload = {
      ...formData,

      macroScore: Number(formData.macroScore),
      midStructureScore: Number(formData.midStructureScore),
      strategyFitScore: Number(formData.strategyFitScore),
      executionQualityScore: Number(formData.executionQualityScore),

      entryPrice: Number(formData.entryPrice),
      stopPrice: Number(formData.stopPrice),
      targetPrice: Number(formData.targetPrice),
      plannedRR: Number(formData.plannedRR),
      positionSize: Number(formData.positionSize),

      partialAtR:
        formData.partialAtR === '' ? null : Number(formData.partialAtR),

      moveStopToBreakEvenAtR:
        formData.moveStopToBreakEvenAtR === ''
          ? null
          : Number(formData.moveStopToBreakEvenAtR),
    }
      
      const response = await fetch('/api/precheck/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...formData,
            moveStopToBreakEvenAtR:
              formData.moveStopToBreakEvenAtR === ''
                ? null
                : formData.moveStopToBreakEvenAtR,
        })
      })

      const text = await response.text()
      let data: unknown = null

      try {
        data = text ? JSON.parse(text) : null
      } catch {
        data = text
      }

      setResult({
        status: response.status,
        body: data,
      })
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <main style={{padding: '24px', maxWidth: '900px'}}>
      <h1>New Precheck</h1>

      <form onSubmit={handleSubmit} style={{display: 'grid', gap: '16px', marginTop: '24px' }}>
        <section>
          <h2>Core Setup</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <label>
              Asset
              <input name="asset" value={formData.asset} onChange={handleChange} />
            </label>

            <label>
              Session
              <input name="session" value={formData.session} onChange={handleChange} />
            </label>

            <label>
              Risk Tier
              <select name="riskTier" value={formData.riskTier} onChange={handleChange}>
                <option value="normal">normal</option>
                <option value="reduced">reduced</option>
                <option value="preservation">preservation</option>
              </select>
            </label>

            <label>
              Primary Strategy
              <select
                name="primaryStrategy"
                value={formData.primaryStrategy}
                onChange={handleChange}
              >
                <option value="TC1">TC1</option>
                <option value="TC2">TC2</option>
                <option value="TCL">TCL</option>
                <option value="SMOG">SMOG</option>
                <option value="G2">G2</option>
                <option value="35A">35A</option>
                <option value="CH1">CH1</option>
              </select>
            </label>

            <label>
              Trade Direction
              <input
                name="tradeDirection"
                value={formData.tradeDirection}
                onChange={handleChange}
              />
            </label>

            <label>
              Strategy Thesis
              <textarea
                name="strategyThesis"
                value={formData.strategyThesis}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <section>
          <h2>Scores</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <label>
              Macro Score
              <input name="macroScore" value={formData.macroScore} onChange={handleChange} />
            </label>

            <label>
              Mid-Structure Score
              <input
                name="midStructureScore"
                value={formData.midStructureScore}
                onChange={handleChange}
              />
            </label>

            <label>
              Strategy Fit Score
              <input
                name="strategyFitScore"
                value={formData.strategyFitScore}
                onChange={handleChange}
              />
            </label>

            <label>
              Execution Score
              <input
                name="executionQualityScore"
                value={formData.executionQualityScore}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <section>
          <h2>Execution Plan</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <label>
              Entry Price
              <input name="entryPrice" value={formData.entryPrice} onChange={handleChange} />
            </label>

            <label>
              Stop Price
              <input name="stopPrice" value={formData.stopPrice} onChange={handleChange} />
            </label>

            <label>
              Target Price
              <input name="targetPrice" value={formData.targetPrice} onChange={handleChange} />
            </label>

            <label>
              Planned R:R
              <input name="plannedRR" value={formData.plannedRR} onChange={handleChange} />
            </label>

            <label>
              Position Size
              <input name="positionSize" value={formData.positionSize} onChange={handleChange} />
            </label>

            <label>
              Trade Management Plan
              <select
                name="tradeManagementPlan"
                value={formData.tradeManagementPlan}
                onChange={handleChange}
              >
                <option value="partial">partial</option>
                <option value="move_to_break_even">move_to_break_even</option>
                <option value="static">static</option>
              </select>
            </label>

            <label>
              Partial at R
              <input name="partialAtR" value={formData.partialAtR} onChange={handleChange} />
            </label>

            <label>
              Move Stop to Break-Even at R
              <input
                name="moveStopToBreakEvenAtR"
                value={formData.moveStopToBreakEvenAtR}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <section>
          <h2>Hard Stops</h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {[
              ['hsDailyLossHit', 'Have you hit your Daily Loss limit?'],
              ['hsWeeklyLossHit', 'have you hit your Weekly Loss limit?'],
              ['hsRiskViolation', 'Does Risk Amount Violate Risk Tier Limit?'],
              ['hsEmotionalTrade', 'Is this an Emotional Trade?'],
              ['hsNoLiquidityDrawIdentified', 'No Liquidity Draw Identified'],
              ['hsMicroNotAlignedMacro', 'Micro Not Aligned Macro'],
              ['hsNoStructuralConfirmation', 'No Structural Confirmation'],
              ['hsStrategyNotClear', 'Strategy Not Clearly Stated'],
              ['hsThesisNotWrittenClearly', 'Thesis Not Written Clearly'],
              ['hsRequiredStrategyRegimeNotPresent', 'Required Strategy Regime Not Present'],
              ['hsStopNotStructurallyBased', 'Stop Not Structurally Based'],
              ['hsEntryChasingPrice', 'Entry Chasing Price'],
              ['hspositionSizeViolatesRiskTierAllowance', 'Position Size Violates Risk Tier Allowance'],
            ].map(([name, label]) => (
              <label key={name} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  name={name}
                  checked={formData[name as keyof typeof formData] as boolean}
                  onChange={handleChange}
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '12px 16px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Precheck'}
        </button>
      </form>

      <pre style={{ marginTop: '24px', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </main>
  )
}