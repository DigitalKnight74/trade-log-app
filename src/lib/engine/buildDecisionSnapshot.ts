import type { WeightedScoreResult } from '@/lib/engine/calculateWeightedScores'
import type { DetermineDecisionResult } from '@/lib/engine/determineDecision'
import type { EvaluateHardStopResult } from '@/lib/engine/evaluateHardStops'
import type { DecisionReasonSummary } from '@/lib/engine/buildDecisionReasonSummary'

export type BuildDecisionSnapshotInputs = {
  normalizedPayload: Record<string, unknown>
  weightedScores: WeightedScoreResult
  hardStopEvaluation: EvaluateHardStopResult
  thresholdUsed: number
  decision: DetermineDecisionResult
  decisionReasonSummary: DecisionReasonSummary
}

export type DecisionSnapshot = Record<string, unknown> & {
  macroScoreWeighted: number
  midScoreWeighted: number
  strategyScoreWeighted: number
  executionScoreWeighted: number
  finalScore: number
  thresholdUsed: number
  anyHardStop: boolean
  finalDecision: 'GO' | 'NO_GO'
  decisionBasis: 'hard_stop_override' | 'score_pass' | 'score_fail'
  decisionReason: DecisionReasonSummary
}

export function buildDecisionSnapshot(
  inputs: BuildDecisionSnapshotInputs
): DecisionSnapshot {
  return {
    ...inputs.normalizedPayload,

    ...inputs.hardStopEvaluation.hardStopResults,

    macroScoreWeighted: inputs.weightedScores.macroWeightedScore,
    midScoreWeighted: inputs.weightedScores.midWeightedScore,
    strategyScoreWeighted: inputs.weightedScores.strategyWeightedScore,
    executionScoreWeighted: inputs.weightedScores.executionWeightedScore,
    finalScore: inputs.weightedScores.finalCompositeScore,

    thresholdUsed: inputs.thresholdUsed,
    anyHardStop: inputs.hardStopEvaluation.anyHardStopTriggered,
    finalDecision: inputs.decision.finalDecision,
    decisionBasis: inputs.decision.decisionBasis,
    decisionReason: inputs.decisionReasonSummary,
  }
}