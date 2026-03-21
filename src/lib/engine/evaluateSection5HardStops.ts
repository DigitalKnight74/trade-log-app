export type Section5HardStopInputs = {
    hsStopNotStructurallyBased: boolean
    hsRRBelowStrategyMinimum: boolean
    hsEntryChasingPrice: boolean
    hsPositionSizeViolateRiskTierAllowance: boolean
}

export type Section5HardStopResult = {
    hardStopResults: {
      hsStopNotStructurallyBased: boolean
      hsRRBelowStrategyMinimum: boolean
      hsEntryChasingPrice: boolean
      hsPositionSizeViolateRiskTierAllowance: boolean
    }
    anySection5HardStopTriggered: boolean
    blockingReasons: string[]
}

export function evaluateSection5HardStops(
  inputs: Section5HardStopInputs
): Section5HardStopResult {
  const hardStopResults = {
    hsStopNotStructurallyBased: inputs.hsStopNotStructurallyBased,
    hsRRBelowStrategyMinimum: inputs.hsRRBelowStrategyMinimum,
    hsEntryChasingPrice: inputs.hsEntryChasingPrice,
    hsPositionSizeViolateRiskTierAllowance: inputs.hsPositionSizeViolateRiskTierAllowance,
  }

  const blockingReasons: string[] = []

  if (hardStopResults.hsStopNotStructurallyBased) {
    blockingReasons.push('Stop NOT structurally based.')
  }

  if (hardStopResults.hsRRBelowStrategyMinimum) {
    blockingReasons.push('R:R below strategy minimum.')
  }

  if (hardStopResults.hsEntryChasingPrice) {
    blockingReasons.push('The Entry IS chasing the Price.')
  }

  if (hardStopResults.hsPositionSizeViolateRiskTierAllowance) {
    blockingReasons.push('Position Size VIOLATES the Risk Tier Allowance.')
  }

  const anySection5HardStopTriggered = 
    hardStopResults.hsStopNotStructurallyBased ||
    hardStopResults.hsRRBelowStrategyMinimum ||
    hardStopResults.hsEntryChasingPrice ||
    hardStopResults.hsPositionSizeViolateRiskTierAllowance
  
  return {
    hardStopResults,
    anySection5HardStopTriggered,
    blockingReasons
  }
}