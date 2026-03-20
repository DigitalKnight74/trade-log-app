export type Section1HardStopInputs = {
    hsDailyLossHit: boolean
    hsWeeklyLossHit: boolean
    hsRiskViolation: boolean
    hsEmotionalTrade: boolean
}

export type Section1HardStopResult = {
  hardStopResults: {
    hsDailyLossHit: boolean
    hsWeeklyLossHit: boolean
    hsRiskViolation: boolean
    hsEmotionalTrade: boolean
  }
  anySection1HardStopTriggered: boolean
  blockingReasons: string[]
}

export function evaluateSection1HardStops(
    inputs: Section1HardStopInputs
): Section1HardStopResult {
    const hardStopResults = {
      hsDailyLossHit: inputs.hsDailyLossHit,
      hsWeeklyLossHit: inputs.hsWeeklyLossHit,
      hsRiskViolation: inputs.hsRiskViolation,
      hsEmotionalTrade: inputs.hsEmotionalTrade,
    }

    const blockingReasons: string[] = []

    if (hardStopResults.hsDailyLossHit) {
        blockingReasons.push('Daily loss limit has been hit.')
    }

    if (hardStopResults.hsWeeklyLossHit) {
        blockingReasons.push('Weekly loss limit has been hit.')
    }

    if (hardStopResults.hsRiskViolation) {
        blockingReasons.push('Risk Violates the allowed risk tier.')
    }

    if (hardStopResults.hsEmotionalTrade) {
        blockingReasons.push('Trade is being taken in an emotional state.')
    }

    const anySection1HardStopTriggered =
      hardStopResults.hsDailyLossHit ||
      hardStopResults.hsWeeklyLossHit ||
      hardStopResults.hsRiskViolation ||
      hardStopResults.hsEmotionalTrade

      return {
        hardStopResults,
        anySection1HardStopTriggered,
        blockingReasons,
      }
}