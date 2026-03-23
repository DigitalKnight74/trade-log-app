export type Section2HardStopInputs = {
    hsNoLiquidityDrawIdentified: boolean
    hsMacroClarityLt7: boolean
}

export type Section2HardStopResult = {
    hardStopResults: {
        hsNoLiquidityDrawIdentified: boolean
        hsMacroClarityLt7: boolean
    }
    anySection2HardStopsTriggered: boolean
    blockingReasons: string[]
}

export function evaluateSection2HardStops(
    inputs: Section2HardStopInputs
): Section2HardStopResult {
  const hardStopResults = {
    hsNoLiquidityDrawIdentified:inputs.hsNoLiquidityDrawIdentified,
    hsMacroClarityLt7: inputs.hsMacroClarityLt7,
  }

  const blockingReasons: string[] = []

  if (hardStopResults.hsNoLiquidityDrawIdentified) {
    blockingReasons.push('NO Clear Liquidity Draw Identified')
  }

  if (hardStopResults.hsMacroClarityLt7) {
    blockingReasons.push('Macro Clarity Score is < 7')
  }

  const anySection2HardStopsTriggered =
    hardStopResults.hsNoLiquidityDrawIdentified ||
    hardStopResults.hsMacroClarityLt7

  return {
    hardStopResults,
    anySection2HardStopsTriggered,
    blockingReasons,
  }
}

