create extension if not exists pgcrypto;

create table if no exists strategy_rules (
    id uuid primary key default gen_random_uuid(),
    strategy_name text not null unique,
    min_rr numeric not null,
    allowed_regime text[],
    requires_liquidity_sweep boolean not null default false,
    requires_structure_confirmation boolean not null default false,
    notes text,
    created_at timestamptz not null default now()
);

create table if not exists trade_precheck_runs (
    id uuid primary key default gen_random_uuid(),
    created at timestamptz not null default now(),
    user_id uuid,
    status text not null default 'submitted',

    trade_direction text,
  risk_tier text,
  account_balance numeric,
  planned_risk_percent numeric,
  risk_amount numeric,
  max_trades_allowed integer,
  session text,
  asset text,

  hs_daily_loss_hit boolean,
  hs_weekly_loss_hit boolean,
  hs_risk_violation boolean,
  hs_emotional_trade boolean,

  macro_bias text,
  market_phase text,
  macro_liquidity_draw text,
  liquidity_direction text,
  macro_clarity_score numeric,

  hs_macro_clarity_fail boolean,
  hs_no_liquidity_draw boolean,

  structure_sequence text,
  micro_macro_aligned boolean,
  structural_event text,
  liquidity_sweep boolean,
  regime text,
  rsi_state text,
  ema_state text,
  adx_5m_strength text,
  adx_5m_momentum text,
  adx_1m_strength text,
  adx_1m_momentum text,
  mid_structure_score numeric,

  hs_no_structure_confirmation boolean,

  strategy_name text,
  strategy_thesis text,
  continuation_in_chop boolean,
  strategy_fit_score numeric,

  hs_strategy_not_defined boolean,
  hs_thesis_missing boolean,
  hs_invalid_regime boolean,

  entry_type text,
  entry_price numeric,
  stop_price numeric,
  target_price numeric,
  planned_rr numeric,
  position_size numeric,
  stop_basis text,
  execution_score numeric,

  hs_invalid_stop boolean,
  hs_rr_below_min boolean,
  hs_chasing_entry boolean,
  hs_position_size_invalid boolean,

  macro_score_weighted numeric,
  mid_score_weighted numeric,
  strategy_score_weighted numeric,
  execution_score_weighted numeric,
  final_score numeric,
  threshold_used numeric,
  any_hard_stop boolean,
  final_decision text,
  decision_reason jsonb
);

create table if not exists trade_outcomes (
  id uuid primary key default gen_random_uuid(),
  trade_id uuid not null references trade_precheck_runs(id) on delete cascade,
  created_at timestamptz not null default now(),
  result text,
  r_result numeric,
  pnl numeric,
  execution_rating numeric,
  notes text
);