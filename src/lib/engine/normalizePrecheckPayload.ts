import type { RiskTier } from '@/lib/engine/resolveThreshold'
import type { PrecheckPayload } from '@/lib/engine/validatePrecheckPayload'

export type NormalizePrecheckPayload = {
    asset: string
    session: string
    riskTier: RiskTier
    primaryStrategy: string

    macroScore: number
    midStructureScore: number
    strategyFitScore: number
    executionQualityScore: number

    entryPrice: number
    stopPrice: number
    targetPrice: number
    plannedRR: number
    positionSize: number

    tradeDirection: string | null
    strategyThesis: string | null
    tradeManagementPlan: string | null
    partialAtR: number | null
    moveStopToBreakEvenAtR: number | null
}

function normalizeString(value: unknown): string | null {
    if (typeof value !== 'string') return null

    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
}

function normalizeRequiredString(value: unknown): string {
    const normalized = normalizeString(value)

    if (normalized === null) {
        throw new Error('Expected required string value during normalization.')
    }

    return normalized
}

function normalizeNumber(value: unknown): number | null {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return value
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()

    if (trimmed.length === 0) {
      return null
    }

    const parsed = Number(trimmed)

    if (!Number.isNaN(parsed)) {
      return parsed
    }
  }

  return null
}

function normalizeRequiredNumber(value: unknown): number {
  const normalized = normalizeNumber(value)

  if (normalized === null) {
    throw new Error('Expected required numeric value during normalization.')
  }

  return normalized
}

function normalizeRiskTier(value: unknown): RiskTier {
  const normalized = normalizeRequiredString(value).toLowerCase()

  if (
    normalized === 'normal' ||
    normalized === 'reduced' ||
    normalized === 'preservation'
  ) {
    return normalized
  }

  throw new Error(`Unsupported risk tier during normalization: ${normalized}`)
}

function normalizeBoolean(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()

    if (['true', 'yes', 'no'].includes(normalized)) return true
    if (['false', 'no', 'off'].includes(normalized)) return false
  }

  if (typeof value === 'number') {
    if (value === 1) return true
    if (value === 0) return false
  }

  return null
}

export function normalizePrecheckPayload(
  payload: PrecheckPayload
): NormalizePrecheckPayload {
    return {
        asset: normalizeRequiredString(payload.asset),
        session: normalizeRequiredString(payload.session),
        riskTier: normalizeRiskTier(payload.riskTier),
        primaryStrategy: normalizeRequiredString(payload.primaryStrategy),

        macroScore: normalizeRequiredNumber(payload.macroScore),
        midStructureScore: normalizeRequiredNumber(payload.midStructureScore),
        strategyFitScore: normalizeRequiredNumber(payload.strategyFitScore),
        executionQualityScore: normalizeRequiredNumber(payload.executionQualityScore),

        entryPrice: normalizeRequiredNumber(payload.entryPrice),
        stopPrice: normalizeRequiredNumber(payload.stopPrice),
        targetPrice: normalizeRequiredNumber(payload.targetPrice),
        plannedRR: normalizeRequiredNumber(payload.plannedRR),
        positionSize: normalizeRequiredNumber(payload.positionSize),

        tradeDirection: normalizeString(payload.tradeDirection),
        strategyThesis: normalizeString(payload.strategyThesis),
        tradeManagementPlan: normalizeString(payload.tradeManagementPlan),
        partialAtR: normalizeNumber(payload.partialAtR),
        moveStopToBreakEvenAtR: normalizeNumber(payload.moveStopToBreakEvenAtR),
    }
}