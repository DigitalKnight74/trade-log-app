import { validatePrecheckPayload, type PrecheckPayload } from '@/lib/engine/validatePrecheckPayload'
import { normalizePrecheckPayload } from '@/lib/engine/normalizePrecheckPayload'
import { loadStrategyRule } from '@/lib/engine/loadStrategyRule'
import { evaluateHardStops } from '@/lib/engine/evaluateHardStops'
import { calculateWeightedScores } from '@/lib/engine/calculateWeightedScores'
import { resolveThreshold } from '@/lib/engine/resolveThreshold'
import { determineDecision } from '@/lib/engine/determineDecision'
import { buildDecisionReasonSummary } from '@/lib/engine/buildDecisionReasonSummary'
import { buildDecisionSnapshot } from '@/lib/engine/buildDecisionSnapshot'
import { persistTradePrecheckRun } from '@/lib/engine/persistTradePrecheckRun'

export type SubmitPrecheckRunResult = 
  | {
      status: 'validation_error'
      validationPassed: false
      errors: { field: string; message: string }[]
  }
  | {
      status: 'success'
      validationPassed: true
      submissionId: string
      createdAt: string
      finalDecision: 'GO' | 'NO_GO'
      decisionBasis: 'hard_stop_override' | 'score_pass' | 'score_fail'
      finalCompositeScore: number
      thresholdUsed: number
      anyHardStopTriggered: boolean
      blockingReasons: string[]
      warnings: string[]
      decisionReasonSummary: {
        decisionPath: string[]
        blockingReasons: string[]
        warnings: string[]
      }
  }
  | {
      status: 'system_error'
      validationPassed: true
      error: string
  }

export async function submitPrecheckRun(
  payload: PrecheckPayload & Record<string, unknown>
): Promise<SubmitPrecheckRunResult> {
  const validation = validatePrecheckPayload(payload)

  if (!validation.isValid) {
    return {
      status: 'validation_error',
      validationPassed: false,
      errors: validation.errors,
    }
  }
  
  try {
    const normalized = normalizePrecheckPayload(payload)
    const strategyRule = await loadStrategyRule(normalized.primaryStrategy)

    const hardStopEvaluation = evaluateHardStops({
      section1: {
        hsDailyLossHit: Boolean(payload.hsDailyLossHit),
        hsWeeklyLossHit: Boolean(payload.hsWeeklyLossHit),
        hsRiskViolation: Boolean(payload.hsRiskViolation),
        hsEmotionalTrade: Boolean(payload.hsEmotionalTrade),
      },
      section2: {
        hsMacroClarityLt7: normalized.macroScore < 7,
        hsNoLiquidityDrawIdentified: Boolean(payload.hsNoLiquidityDraw),
      },
      section3: {
        hsMicroNotAlignedMacro: Boolean(payload.hsMicroNotAlignedMacro),
        hsNoStructuralConfirmation: Boolean(payload.hsNoStructuralConfirmation),
      },
      section4: {
        hsStrategyNotClear: Boolean(payload.hsStrategyNotClear),
        hsThesisNotWrittenClearly: Boolean(payload.hsThesisNotWrittenClearly),
        hsRequiredStrategyRegimeNotPresent: Boolean(payload.hsRequiredRegimeStrategyNotPresent),
        hsChopContinuationStrategy: Boolean(payload.hsChopContinuationStrategy)
      },
      section5: {
        hsStopNotStructurallyBased: Boolean(payload.hsStopNotStructurallyBased),
        hsRRBelowStrategyMinimum: Boolean(payload.hsRRBelowStrategyMinimum),
        hsEntryChasingPrice: Boolean(payload.hsEntryChasingPrice),
        hsPositionSizeViolatesRiskTierAllowance: Boolean(payload.hsPositionSizeViolatesRiskTierAllowance),
      },
    })    

    const weightedScores = calculateWeightedScores({
      macroScore: normalized.macroScore,
      midStructureScore: normalized.midStructureScore,
      strategyFitScore: normalized.strategyFitScore,
      executionQualityScore: normalized.executionQualityScore,
    })

    const thresholdUsed = resolveThreshold(normalized.riskTier)

    const decision = determineDecision({
      anyHardStopsTriggered: hardStopEvaluation.anyHardStopTriggered,
      finalCompositeScore: weightedScores.finalCompositeScore,
      thresholdUsed,
    })

    const decisionReasonSummary = buildDecisionReasonSummary({
      finalDecision: decision.finalDecision,
      decisionBasis: decision.decisionBasis,
      finalCompositeScore: weightedScores.finalCompositeScore,
      thresholdUsed,
      anyHardStopTriggered: hardStopEvaluation.anyHardStopTriggered,
      blockingReasons: hardStopEvaluation.blockingReasons,
     warnings: hardStopEvaluation.warnings,
    })

    const snapshot = buildDecisionSnapshot({
      normalizedPayload: normalized,
      weightedScores,
      hardStopEvaluation,
      thresholdUsed,
      decision,
      decisionReasonSummary,
    })

    const persisted = await persistTradePrecheckRun(snapshot)

    if (!persisted.success || !persisted.id || !persisted.createdAt) {
      return {
        status: 'system_error',
        validationPassed: true,
        error: persisted.error ?? 'Failed to persist trade precheck run.',
      }
    }

    return {
      status: 'success',
      validationPassed: true,
      submissionId: persisted.id,
      createdAt: persisted.createdAt,
      finalDecision: decision.finalDecision,
      decisionBasis: decision.decisionBasis,
      finalCompositeScore: weightedScores.finalCompositeScore,
      thresholdUsed,
      anyHardStopTriggered: hardStopEvaluation.anyHardStopTriggered,
      blockingReasons: hardStopEvaluation.blockingReasons,
      warnings: hardStopEvaluation.warnings,
      decisionReasonSummary,
    }
  } catch (error) {
    return {
    status: 'system_error',
    validationPassed: true,
    error: error instanceof Error ? error.message : 'Unknown system error.',
    }
  }
}