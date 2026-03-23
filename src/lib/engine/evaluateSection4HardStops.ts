export type Section4HardStopInputs = {
    hsStrategyNotClear: boolean
    hsThesisNotWrittenClearly: boolean
    hsRequiredStrategyRegimeNotPresent: boolean
    hsChopContinuationStrategy: boolean
}

export type Section4HardStopResult = {
  hardStopResults: {
    hsStrategyNotClear: boolean
    hsThesisNotWrittenClearly: boolean
    hsRequiredRegimeStrategyNotPresent: boolean
    hsChopContinuationStrategy: boolean
  }
  anySection4HardStopsTriggered: boolean
  blockingReasons: string[]
}

export function evaluateSection4HardStops(
  inputs: Section4HardStopInputs
): Section4HardStopResult {
  const hardStopResults = {
    hsStrategyNotClear: inputs.hsStrategyNotClear,
    hsThesisNotWrittenClearly: inputs.hsThesisNotWrittenClearly,
    hsRequiredRegimeStrategyNotPresent: inputs.hsRequiredStrategyRegimeNotPresent,
    hsChopContinuationStrategy: inputs.hsChopContinuationStrategy,
  }

  const blockingReasons: string[] = []

  if (hardStopResults.hsStrategyNotClear) {
    blockingReasons.push('The strategy is NOT clearly defined.')
  }

  if (hardStopResults.hsThesisNotWrittenClearly) {
    blockingReasons.push('The trade thesis is NOT written clearly.')
  }

  if (hardStopResults.hsRequiredRegimeStrategyNotPresent) {
    blockingReasons.push('The required regime for the chosen strategy NOT present.')
  }

  if (hardStopResults.hsChopContinuationStrategy) {
    blockingReasons.push('A continuation strategy selected WITH the regime in CHOP.')
  }

  const anySection4HardStopsTriggered = 
    hardStopResults.hsStrategyNotClear ||
    hardStopResults.hsThesisNotWrittenClearly ||
    hardStopResults.hsRequiredRegimeStrategyNotPresent ||
    hardStopResults.hsChopContinuationStrategy

  return {
    hardStopResults,
    anySection4HardStopsTriggered,
    blockingReasons,
  }
}
