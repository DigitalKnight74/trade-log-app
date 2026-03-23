import { supabase } from '@/lib/supabase/client'
import type { DecisionSnapshot } from '@/lib/engine/buildDecisionSnapshot'

export type PersistTradePrecheckRunResult = {
  success: boolean
  id?: string
  createdAt?: string
  error?: string
}

function mapSnapshotToTradePrecheckRunRow(snapshot: DecisionSnapshot) {
  return {
    trade_direction: snapshot.tradeDirection ?? null,
    risk_tier: snapshot.riskTier ?? null,
    asset: snapshot.asset ?? null,
    session: snapshot.session ?? null,

    strategy_name: snapshot.primaryStrategy ?? null,
    strategy_thesis: snapshot.strategyThesis ?? null,

    macro_clarity_score: snapshot.macroScore ?? null,
    mid_structure_score: snapshot.midStructureScore ?? null,
    strategy_fit_score: snapshot.strategyFitScore ?? null,
    execution_score: snapshot.executionScore ?? null,

    entry_price: snapshot.entryPrice ?? null,
    stop_price: snapshot.stopPrice ?? null,
    target_price: snapshot.targetPrice ?? null,
    planned_rr: snapshot.plannedRR ?? null,
    position_size: snapshot.positionSize ?? null,

    hs_daily_loss_hit: snapshot.hsDailyLossHit ?? false,
    hs_weekly_loss_hit: snapshot.hsWeeklyLossHit ?? false,
    hs_risk_violation: snapshot.hsRiskViolation ?? false,
    hs_emotional_trade: snapshot.hsEmotionalTrade ?? false,

    macro_score_weighted: snapshot.macroScoreWeighted ?? null,
    mid_score_weighted: snapshot.midScoreWeighted ?? null,
    strategy_score_weighted: snapshot.strategyScoreWeighted ?? null,
    execution_score_weighted: snapshot.executionScoreWeighted ?? null,
    final_score: snapshot.finalScore ?? null,

    threshold_used: snapshot.thresholdUsed ?? null,
    any_hard_stop: snapshot.anyHardStop ?? false,
    final_decision: snapshot.finalDecision ?? null,
    decision_reason: snapshot.decisionReason ?? null,
  }
}

export async function persistTradePrecheckRun(
  snapshot: DecisionSnapshot
): Promise<PersistTradePrecheckRunResult> {
  const row = mapSnapshotToTradePrecheckRunRow(snapshot)

  const { data, error } = await supabase
    .from('trade_precheck_runs')
    .insert([row])
    .select('id, created_at')
    .single()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  if (!data) {
    return {
      success: false,
      error: 'No data returned after insert.',
    }
  }

  return {
    success: true,
    id: data.id,
    createdAt: data.created_at,
  }
}