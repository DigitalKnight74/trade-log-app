import {
  evaluateSection1HardStops,
  type Section1HardStopInputs,
} from '@/lib/engine/evaluateSection1HardStops'
import {
  evaluateSection2HardStops,
  type Section2HardStopInputs,
} from '@/lib/engine/evaluateSection2HardStops'
import {
  evaluateSection3HardStops,
  type Section3HardStopInputs,
} from '@/lib/engine/evaluateSection3HardStops'
import {
  evaluateSection4HardStops,
  type Section4HardStopInputs,
} from '@/lib/engine/evaluateSection4HardStops'
import {
  evaluateSection5HardStops,
  type Section5HardStopInputs,
} from '@/lib/engine/evaluateSection5HardStops'

export type EvaluateHardStopsInputs = {
    section1: Section1HardStopInputs
    section2: Section2HardStopInputs
    section3: Section3HardStopInputs
    section4: Section4HardStopInputs
    section5: Section5HardStopInputs
}

export type EvaluateHardStopResult = {
    hardStopResults: Record<string, boolean>
    anyHardStopTriggered: boolean
    blockingReasons: string[]
    warnings: string[]
}

export function evaluateHardStops(
    inputs: EvaluateHardStopsInputs
): EvaluateHardStopResult {
  const section1Result = evaluateSection1HardStops(inputs.section1)
  const section2Result = evaluateSection2HardStops(inputs.section2)
  const section3Result = evaluateSection3HardStops(inputs.section3)
  const section4Result = evaluateSection4HardStops(inputs.section4)
  const section5Result = evaluateSection5HardStops(inputs.section5)

  const hardStopResults = {
    ...section1Result.hardStopResults,
    ...section2Result.hardStopResults,
    ...section3Result.hardStopResults,
    ...section4Result.hardStopResults,
    ...section5Result.hardStopResults,
  }

  const blockingReasons = [
    ...section1Result.blockingReasons,
    ...section2Result.blockingReasons,
    ...section3Result.blockingReasons,
    ...section4Result.blockingReasons,
    ...section5Result.blockingReasons,
  ]

  const warnings: string[] = []

  const anyHardStopTriggered = Object.values(hardStopResults).some(Boolean)

  return {
    hardStopResults,
    anyHardStopTriggered,
    blockingReasons,
    warnings,
  }
}