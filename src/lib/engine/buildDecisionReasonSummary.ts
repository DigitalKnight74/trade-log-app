import type { DecisionBasis, FinalDecision } from '@/lib/engine/determineDecision'

export type BuildDecisionReasonSummaryInputs = {
    finalDecision: FinalDecision
    decisionBasis: DecisionBasis
    finalCompositeScore: number
    thresholdUsed: number
    anyHardStopTriggered: boolean
    blockingReasons: string[]
    warnings: string[]
}

export type DecisionReasonSummary = {
    decisionPath: string[]
    blockingReasons: string[]
    warnings: string[]
}

function formatScore(value: number): string {
    return value.toFixed(3).replace(/\.?0+$/,'')
}

export function buildDecisionReasonSummary(
    inputs: BuildDecisionReasonSummaryInputs
): DecisionReasonSummary {
    const decisionPath: string[] = ['Validation passed']

    if (inputs.decisionBasis === 'hard_stop_override') {
        decisionPath.push('Hard Stop Triggered')
        decisionPath.push('Final Composite Score calculated by overridden')
        decisionPath.push(`Decision = ${inputs.finalDecision}`)

        return {
            decisionPath,
            blockingReasons: inputs.blockingReasons,
            warnings: inputs.warnings ?? [],
        }
    }

    if (inputs.decisionBasis === 'score_pass') {
        decisionPath.push('No hard stops triggered')
        decisionPath.push(
          `Final composite score ${formatScore(inputs.finalCompositeScore)} met threshold ${formatScore(inputs.thresholdUsed)}`
        )
        decisionPath.push(`Decision = ${inputs.finalDecision}`)

        return {
            decisionPath,
            blockingReasons: inputs.blockingReasons,
            warnings: inputs.warnings ?? [],
        }
    }

    decisionPath.push('No hard stops triggered')
    decisionPath.push(
        `Final composite score ${formatScore(inputs.finalCompositeScore)} did not met threshold ${formatScore(inputs.thresholdUsed)}`
    )
    decisionPath.push(`Decision = ${inputs.finalDecision}`)

    return {
        decisionPath,
        blockingReasons: inputs.blockingReasons,
        warnings: inputs.warnings ?? [],
    }
}

