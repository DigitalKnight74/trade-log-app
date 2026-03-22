import { supabase } from '@/lib/supabase/client'

export type StrategyRule = {
  id: string
  strategy_name: string
  min_rr: number
  allowed_regime: string[] | null
  requires_structure_confirmation: boolean
  requires_liquidity_sweep: boolean
  notes: string | null
  created_at: string
}

export async function loadStrategyRule(
  strategyName: string
): Promise<StrategyRule> {
  const { data, error } = await supabase
     .from('strategy_rules')
     .select('*')
     .eq('strategy_name', strategyName)
     .single()

  if (error) {
    throw new Error(`Failed to load strategy rule: ${error.message}`)
  }

  if (!data) {
    throw new Error(`Strategy rule not found for: ${strategyName}`)
  }

  return data
}