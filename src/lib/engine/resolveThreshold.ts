export type RiskTier = 'normal' | 'reduced' | 'preservation'

export function resolveThreshold(riskTier: RiskTier): number{
    switch (riskTier) {
        case 'normal':
            return 8.75
        case 'reduced':
            return 9.00
        case 'preservation':
            return 9.25
        default: {
            const exhaustiveCheck: never = riskTier
            throw new Error(`Unsupported risk tier: ${exhaustiveCheck}`)
        }
    }
}