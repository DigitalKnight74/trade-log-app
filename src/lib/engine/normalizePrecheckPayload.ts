import type { RiskTier } from '@/lib/engine/resolveThreshold'
import type { PrecheckPayload } from '@/lib/engine/validatePrecheckPayload'

export type NormalizedPrecheckPayload = {
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
    const normalized = normalizedString(value)

    if (normalized === null) {
        throw new Error('Expected required string value during normalization.')
    }

    return normalized
}

function normalizedNumber