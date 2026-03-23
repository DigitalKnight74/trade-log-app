import type { PrecheckPayload } from "@/types/precheck";
import { 
  SESSION_VALUES,
  RISK_TIER_VALUES,
  MACRO_BIAS_VALUES,
  MACRO_CURRENT_PHASE_VALUES,
  LIQUIDITY_TARGET_DIRECTION_VALUES,
  MID_STRUCTURE_SEQUENCE_VALUES,
  RECENT_STRUCTURAL_EVENT_VALUES,
  MID_STRUCTURE_REGIME_VALUES,
  MID_STRUCTURE_RSI_STATE_VALUES,
  MID_STRUCTURE_EMA_STATE_VALUES,
  MID1M_ADXSTATE_STRENGTH_VALUES,
  MID1M_ADXSTATE_MOMENTUM_VALUES,
  MID5M_ADXSTATE_STRENGTH_VALUES,
  MID5M_ADXSTATE_MOMENTUM_VALUES,
  PRIMARY_STRATEGY_VALUES,
  ENTRY_TYPE_VALUES,
  TRADE_DIRECTION_VALUES,
  PRIMARY_STOP_BASIS_VALUES,
  SECONDARY_EXIT_LOGIC_VALUES,
  TRADE_MANAGEMENT_PLAN_VALUES,
} from "@/constants/enums";
import type { 
  Session,
  RiskTier,
  MacroBias,
  MacroCurrentPhase,
  LiquidityTargetDirection,
  MidStructureSequence,
  RecentStructuralEvent,
  MidStructureRegime,
  MidStructureRsiState,
  MidStructureEmaState,
  Mid1mAdxstateStrength,
  Mid1mAdxstateMomentum,
  Mid5mAdxstateStrength,
  Mid5mAdxstateMomentum,
  PrimaryStrategy,
  EntryType,
  TradeDirection,
  PrimaryStopBasis,
  SecondaryExitLogic,
  TradeManagementPlan,
} from "@/constants/enums";

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
  const normalized = normalizeRequiredString(value).trim().toUpperCase();

  if (
    normalized === "NORMAL" ||
    normalized === "REDUCED" ||
    normalized === "PRESERVATION"
  ) {
    return normalized as RiskTier;
  }

  throw new Error(`Unsupported risk tier during normalization: ${value}`);
}

function normalizeBoolean(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()

    if (['true', 'yes', 'on', '1'].includes(normalized)) return true
    if (['false', 'no', 'off', '0'].includes(normalized)) return false
  }

  if (typeof value === 'number') {
    if (value === 1) return true
    if (value === 0) return false
  }

  return null
}

function normalizeRequiredBoolean(value: unknown): boolean {
  const normalized = normalizeBoolean(value);
  if(normalized === null) {
    throw new Error('Expectedrequired boolean value during normalization.');
  }
  return normalized
}

function normalizeEnumValue<T extends string>(
  value: unknown,
  allowedValues: readonly T[],
  fieldName: string
): T {
  //Step 1: normalize the string
  const normalized = normalizeRequiredString(value)
    .trim()
    .toUpperCase();

  //Step 2: validate against allowed values
  const match = allowedValues.find(
    (allowed) => allowed.toUpperCase() === normalized
  );

  //Step 3: fail fast if invalid
  if (!match) {
    throw new Error(`Unsupported ${fieldName} during normalization: ${value}`);
  }

  // step 4: return canonical value
  return match;  
}

function normalizeSession(value:unknown): Session {
  return normalizeEnumValue(value, SESSION_VALUES, 'session');
}

function normalizeMacroBias(value:unknown): MacroBias {
  return normalizeEnumValue(value, MACRO_BIAS_VALUES, 'macroBias');
}

function normalizeMacroCurrentPhase(value: unknown): MacroCurrentPhase {
  return normalizeEnumValue(value, MACRO_CURRENT_PHASE_VALUES, 'macroCurrentPhase');
}

function normalizeLiquidityTargetDirection(value: unknown): LiquidityTargetDirection {
  return normalizeEnumValue(value, LIQUIDITY_TARGET_DIRECTION_VALUES, 'liquidityTargetDirection');
}

function normalizeMidStructureSequence(value: unknown): MidStructureSequence {
  return normalizeEnumValue(value, MID_STRUCTURE_SEQUENCE_VALUES, 'midStructureSequence');
}

function normalizeRecentStructuralEvent(value: unknown): RecentStructuralEvent {
  return normalizeEnumValue(value, RECENT_STRUCTURAL_EVENT_VALUES, 'recentStructuralEvent');
}

function normalizeMidStructureRegime(value: unknown): MidStructureRegime {
  return normalizeEnumValue(value, MID_STRUCTURE_REGIME_VALUES, 'midStructureRegime');
}

function normalizeMidStructureRsiState(value: unknown): MidStructureRsiState {
  return normalizeEnumValue(value, MID_STRUCTURE_RSI_STATE_VALUES, 'midStructureRsiState');
}

function normalizeMidStructureEmaState(value: unknown): MidStructureEmaState {
  return normalizeEnumValue(value, MID_STRUCTURE_EMA_STATE_VALUES, 'midStructureEmaState');
}

function normalizeMid1mAdxstateStrength(value: unknown): Mid1mAdxstateStrength {
  return normalizeEnumValue(value, MID1M_ADXSTATE_STRENGTH_VALUES, 'mid1mADXStateStrength');
}

function normalizeMid1mAdxstateMomentum(value: unknown): Mid1mAdxstateMomentum {
  return normalizeEnumValue(value, MID1M_ADXSTATE_MOMENTUM_VALUES, 'mid1mADXStateMomentum');
}

function normalizeMid5mAdxstateStrength(value: unknown): Mid5mAdxstateStrength {
  return normalizeEnumValue(value, MID5M_ADXSTATE_STRENGTH_VALUES, 'mid5mADXStateStrength');
}

function normalizeMid5mAdxstateMomentum(value: unknown): Mid5mAdxstateMomentum {
  return normalizeEnumValue(value, MID5M_ADXSTATE_MOMENTUM_VALUES, 'mid5mADXStateMomentum');
}

function normalizePrimaryStrategy(value: unknown): PrimaryStrategy {
  return normalizeEnumValue(value, PRIMARY_STRATEGY_VALUES, 'primaryStrategy');
}

function normalizeEntryType(value: unknown): EntryType {
  return normalizeEnumValue(value, ENTRY_TYPE_VALUES, 'entryType');
}

function normalizeTradeDirection(value: unknown): TradeDirection {
  return normalizeEnumValue(value, TRADE_DIRECTION_VALUES, 'tradeDirection');
}

function normalizePrimaryStopBasis(value: unknown): PrimaryStopBasis {
  return normalizeEnumValue(value, PRIMARY_STOP_BASIS_VALUES, 'primaryStopBasis');
}

function normalizeSecondaryExitLogic(value: unknown): SecondaryExitLogic {
  return normalizeEnumValue(value, SECONDARY_EXIT_LOGIC_VALUES, 'secondaryExitLogic');
}

function normalizeTradeManagementPlan(value: unknown): TradeManagementPlan {
  return normalizeEnumValue(value, TRADE_MANAGEMENT_PLAN_VALUES, 'tradeManagementPlan');
}

type RawPrecheckPayload = Record<string, unknown>;

export function normalizePrecheckPayload(
  payload: RawPrecheckPayload
): PrecheckPayload {
    return {
        // Section 1 - Trade Management Data
        session: normalizeSession(payload.session),
        asset: normalizeRequiredString(payload.asset),
        riskTier: normalizeRiskTier(payload.riskTier),
        acctBalance: normalizeRequiredNumber(payload.acctBalance),
        plannedRisk: normalizeRequiredNumber(payload.plannedRisk),
        
        // Section 2 - Macro Context
        macroBias: normalizeMacroBias(payload.macroBias),
        macroCurrentPhase: normalizeMacroCurrentPhase(payload.macroCurrentPhase),
        keyHTFResistanceFrom: normalizeRequiredNumber(payload.keyHTFResistanceFrom),
        keyHTFResistanceTo: normalizeRequiredNumber(payload.keyHTFResistanceTo),
        keyHTFSupportFrom: normalizeRequiredNumber(payload.keyHTFSupportFrom),
        keyHTFSupportTo: normalizeRequiredNumber(payload.keyHTFSupportTo),
        macroLiquidityDraw: normalizeRequiredNumber(payload.macroLiquidityDraw),
        liquidityTargetDirection: normalizeLiquidityTargetDirection(payload.liquidityTargetDirection),
        bullishMacroBiasInvalidationLevel: normalizeRequiredNumber(payload.bullishMacroBiasInvalidationLevel),
        bearishMacroBiasInvalidationLevel: normalizeRequiredNumber(payload.bearishMacroBiasInvalidationLevel),
        macroClarityScore: normalizeRequiredNumber(payload.macroClarityScore),
        
        // Section 3 - Mid-Structure Context
        midStructureSequence: normalizeMidStructureSequence(payload.midStructureSequence),
        microMacroAlignment: normalizeRequiredBoolean(payload.microMacroAlignment),
        recentStructuralEvent: normalizeRecentStructuralEvent(payload.recentStructuralEvent),
        liquiditySweepObserved: normalizeRequiredBoolean(payload.liquiditySweepObserved),
        midStructureRegime: normalizeMidStructureRegime(payload.midStructureRegime),
        midStructureRsiState: normalizeMidStructureRsiState(payload.midStructureRsiState),
        midStructureEmaState: normalizeMidStructureEmaState(payload.midStructureEmaState),
        mid1mADXStateStrength: normalizeMid1mAdxstateStrength(payload.mid1mADXStateStrength),
        mid1mADXStateMomentum: normalizeMid1mAdxstateMomentum(payload.mid1mADXStateMomentum),
        mid5mADXStateStrength: normalizeMid5mAdxstateStrength(payload.mid5mADXStateStrength),
        mid5mADXStateMomentum: normalizeMid5mAdxstateMomentum(payload.mid5mADXStateMomentum),
        midStructureScore: normalizeRequiredNumber(payload.midStructureScore),
        
        // Section 4 - Strategy Fit
        primaryStrategy: normalizePrimaryStrategy(payload.primaryStrategy),
        oneSentenceThesis: normalizeRequiredString(payload.oneSentenceThesis),
        strategyFitScore: normalizeRequiredNumber(payload.strategyFitScore),
        
        // Section 5 - Execution Quality
        entryType: normalizeEntryType(payload.entryType),
        tradeDirection: normalizeTradeDirection(payload.tradeDirection),
        entryPrice: normalizeRequiredNumber(payload.entryPrice),
        stopPrice: normalizeRequiredNumber(payload.stopPrice),
        targetPrice: normalizeRequiredNumber(payload.targetPrice),
        plannedRR: normalizeRequiredNumber(payload.plannedRR),
        positionSize: normalizeRequiredNumber(payload.positionSize),
        primaryStopBasis: normalizePrimaryStopBasis(payload.primaryStopBasis),
        secondaryExitLogic: normalizeSecondaryExitLogic(payload.secondaryExitLogic),
        tradeManagementPlan: normalizeTradeManagementPlan(payload.tradeManagementPlan),
        partialAtR: normalizeRequiredNumber(payload.partialAtR),
        moveStopToBreakEvenAtR: normalizeRequiredNumber(payload.moveStopToBreakEvenAtR),
        executionQualityScore: normalizeRequiredNumber(payload.executionQualityScore),
    }

}