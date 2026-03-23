import type { RiskTier } from '@/lib/engine/resolveThreshold'

export type PrecheckPayload = {
    asset: unknown
    session: unknown
    riskTier: unknown
    primaryStrategy: unknown

    macroScore: unknown
    midStructureScore: unknown
    strategyFitScore: unknown
    executionQualityScore: unknown

    entryPrice: unknown
    stopPrice: unknown
    targetPrice: unknown
    plannedRR: unknown
    positionSize: unknown

    tradeDirection?: unknown
    strategyThesis?: unknown
    tradeManagementPlan?: unknown
    partialAtR?: unknown
    moveStopToBreakEvenAtR?: unknown
}

export type ValidationError = {
    field: string
    message: string
}

export type ValidationResult = {
    isValid: boolean
    errors: ValidationError[]
}

const allowedRiskTier: RiskTier[] = ['normal', 'reduced', 'preservation']

const allowedStrategies = ['TC1', 'TC2', 'TCL', 'SMOG', 'G2', '35A', 'CH1']

function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0
}

function isValidNumber(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value)
}

function isScoreInRange(value: unknown): value is number {
    return isValidNumber(value) && value >= 0 && value <= 10
}

export function validatePrecheckPayload(
  payload: PrecheckPayload
): ValidationResult {
  const errors: ValidationError[] = []

  // Required text-like fields
  if (!isNonEmptyString(payload.asset)) {
    errors.push({
      field: 'assets',
      message: 'Asset is required'
    })
  }

  if (!isNonEmptyString(payload.session)) {
    errors.push({
      field: 'session',
      message: 'Session is required.',
    })
  }

  if (!isNonEmptyString(payload.primaryStrategy)) {
    errors.push({
      field: 'primaryStrategy',
      message: 'Primary Strategy is required.',
    })
  } else if (!allowedStrategies.includes(payload.primaryStrategy as (typeof allowedStrategies)[number])) {
    errors.push({
      field: 'primaryStrategy',
      message: 'Primary Strategey is invalid.',
    })
  }

  if (!isNonEmptyString(payload.riskTier)) {
    errors.push({
        field: 'riskTier',
        message: 'Risk Tier is required.',
    })
  } else if (!allowedRiskTier.includes(payload.riskTier as RiskTier)) {
    errors.push({
        field: 'riskTier',
        message: 'Risk Tier is invlaid.',
    })
  }

  // Required numeric score fields
  if (!isScoreInRange(payload.macroScore)) {
    errors.push({
      field: 'macroScore',
      message: 'Macro Score must be a number between 0 and 10.',
    })
  }

  if (!isScoreInRange(payload.midStructureScore)) {
    errors.push({
        field: 'midStructureScore',
        message: 'Mid-Structure Score must be a number between 0 and 10.',
    })
  }

  if (!isScoreInRange(payload.strategyFitScore)) {
    errors.push({
      field: 'strategyFitScore',
      message: ' Strategy Fit Score must be a number between 0 and 10.'
    })
  }

  if (!isScoreInRange(payload.executionQualityScore)) {
    errors.push({
      field: 'executionQualityScore',
      message: 'Execuation Quality Score must be a numnber between 0 and 10.'
    })
  }

  // Required Execution numeric fields
  if (!isValidNumber(payload.entryPrice)) {
    errors.push({
        field: 'entryPrice',
        message: 'Entry Price must be a valid number.'
    })
  }

  if (!isValidNumber(payload.stopPrice)) {
    errors.push({
        field: 'stopPrice',
        message: 'Stop Price must be a valid number.'
    })
  }

  if (!isValidNumber(payload.targetPrice)) {
    errors.push({
        field: 'targetPrice',
        message: 'Target Price must be a valid number.'
    })
  }

  if (!isValidNumber(payload.plannedRR)) {
    errors.push({
        field: 'plannedRR',
        message: 'Planned R:R must be a valid number.',
    })
  } else if (payload.plannedRR <= 0) {
    errors.push({
        field: 'plannedRR',
        message: 'Planned R:R must be greater than 0.',
    })
  }

  if (!isValidNumber(payload.positionSize)) {
    errors.push({
        field: 'positionSize',
        message: 'Position size must be a valid number.',
    })
  } else if (payload.positionSize <= 0) {
    errors.push({
        field: 'positionSize',
        message: 'Position Size must be greater than 0.',
    })
  }

  // Conditional validation
  if (payload.tradeManagementPlan === 'partial' && !isValidNumber(payload.partialAtR)) {
    errors.push({
      field: 'partialAtR',
      message: 'Partial at R is required when trade management plan is partial.',
    })
  }

  if (
    payload.tradeManagementPlan === 'move_to_break_even' && 
    !isValidNumber(payload.moveStopToBreakEvenAtR)
  ) {
    errors.push({
      field: 'moveStopToBreakEvenAtR',
      message: 'Move Stop to Break-Even at R is required for this trade management plan',  
      })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}