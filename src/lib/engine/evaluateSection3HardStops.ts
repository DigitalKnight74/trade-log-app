export type Section3HardStopInputs = {
    hsMicroNotAlignedMacro: boolean
    hsNoStructuralConfirmation: boolean
}

export type Section3HardStopResults = {
    hardStopResults: {
        hsMicroNotAlignedMacro: boolean
        hsNoStructuralConfirmation: boolean
    }
    anySection3HardStopTriggered: boolean
    blockingReasons: string[]
}

export function evaluateSection3HardStops(
    inputs: Section3HardStopInputs
): Section3HardStopResults {
    const hardStopResults = {
      hsMicroNotAlignedMacro: inputs.hsMicroNotAlignedMacro,
      hsNoStructuralConfirmation: inputs.hsNoStructuralConfirmation,
    }

    const blockingReasons: string[] = []

    if (hardStopResults.hsMicroNotAlignedMacro) {
        blockingReasons.push('Micro DOES NOT align with Macro.')
    }

    if (hardStopResults.hsNoStructuralConfirmation) {
        blockingReasons.push('There is NO Structural Confirmation.')
    }

    const anySection3HardStopTriggered = 
      hardStopResults.hsMicroNotAlignedMacro ||
      hardStopResults.hsNoStructuralConfirmation
    
    return {
      hardStopResults,
      anySection3HardStopTriggered,
      blockingReasons,
    }
}