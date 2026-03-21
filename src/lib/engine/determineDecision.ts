export type DetermineDecisionInputs = {
    anyHardStopsTriggered: boolean
    finalCompositeScore: number
    thresholdUsed: number
}

export type DecisionBasis = 'hard_stop_override' | 'score_pass' | 'score_fail'

export type FinalDecision = 'GO' | 'NO_GO'

export type DetermineDecisionResult = {
    finalDecision: FinalDecision
    decisionBasis: DecisionBasis
}

export function determineDecision(
    inputs: DetermineDecisionInputs
): DetermineDecisionResult {
  if (inputs.anyHardStopsTriggered) {
    return {
        finalDecision: 'NO_GO',
        decisionBasis: 'hard_stop_override'
    }
  }

  if (inputs.finalCompositeScore >= inputs.thresholdUsed) {
    return {
      finalDecision: 'GO',
      decisionBasis: 'score_pass'
    }
  }

  return {
    finalDecision: 'NO_GO',
    decisionBasis: 'score_fail'
  }
}