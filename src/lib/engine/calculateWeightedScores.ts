export type SectionScores = {
    macroScore: number
    midStructureScore: number
    strategyFitScore: number
    executionQualityScore: number
}

export type WeightedScoreResult = {
    macroWeightedScore: number
    midWeightedScore: number
    strategyWeightedScore: number
    executionWeightedScore: number
    finalCompositeScore: number
}

function roundToThree(value: number): number {
    return Number(value.toFixed(3))
}

export function calculateWeightedScores(
    scores: SectionScores
): WeightedScoreResult {
    const macroWeightedScore = roundToThree(scores.macroScore * 0.3)
    const midWeightedScore = roundToThree(scores.midStructureScore * 0.3)
    const strategyWeightedScore = roundToThree(scores.strategyFitScore * 0.25)
    const executionWeightedScore = roundToThree(scores.executionQualityScore * 0.15)

    const finalCompositeScore = roundToThree(
        macroWeightedScore +
        midWeightedScore + 
        strategyWeightedScore +
        executionWeightedScore
    )

    return {
        macroWeightedScore,
        midWeightedScore,
        strategyWeightedScore,
        executionWeightedScore,
        finalCompositeScore,
    }
}