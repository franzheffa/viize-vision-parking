export type SpotType = 'STANDARD' | 'EV'

export function computeHourlyRateCents(params: {
  baseRateCents: number
  spotType: SpotType
  occupancy: number // 0..1
  targetOccupancy?: number // 0..1 (default 0.8)
  surgeMaxPercent?: number // ex 150 = +150% max (default 150)
  evPremiumPercent?: number // ex 20 = +20% (default 20)
}): number {
  const target = params.targetOccupancy ?? 0.8
  const surgeMax = params.surgeMaxPercent ?? 150
  const evPremium = params.evPremiumPercent ?? 20

  const base = Math.max(0, Math.round(params.baseRateCents))

  // simple surge curve: starts above target, ramps to max at 100% occupancy
  let surgePct = 0
  if (params.occupancy > target) {
    const denom = Math.max(1e-6, 1 - target)
    const t = Math.min(1, (params.occupancy - target) / denom)
    surgePct = Math.round(t * surgeMax)
  }

  let rate = base * (1 + surgePct / 100)

  if (params.spotType === 'EV') {
    rate = rate * (1 + evPremium / 100)
  }

  return Math.max(0, Math.round(rate))
}

export function computeTotalCents(params: {
  hourlyRateCents: number
  durationHours: number
}): number {
  const hours = Math.max(0, Math.ceil(params.durationHours))
  return Math.max(0, Math.round(params.hourlyRateCents) * hours)
}

export function splitRevenueCents(params: {
  totalCents: number
  managerPercent?: number // default 90
  driverPercent?: number // default 5
  platformPercent?: number // default 5
}): { managerCents: number; driverCents: number; platformCents: number } {
  const managerPct = params.managerPercent ?? 90
  const driverPct = params.driverPercent ?? 5
  const platformPct = params.platformPercent ?? 5

  const total = Math.max(0, Math.round(params.totalCents))

  const managerCents = Math.floor((total * managerPct) / 100)
  const driverCents = Math.floor((total * driverPct) / 100)
  const platformCents = Math.max(0, total - managerCents - driverCents)

  return { managerCents, driverCents, platformCents }
}
