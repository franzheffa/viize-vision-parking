import { SpotType } from "@prisma/client";

export function computeHourlyRateCents(params: {
  baseRateCents: number;
  occupancyPct: number;
  targetOccupancyPct: number;
  surgeMaxPct: number;
  spotType: SpotType | "STANDARD" | "EV";
  evPremiumPct: number;
}): number {
  const { baseRateCents, occupancyPct, targetOccupancyPct, surgeMaxPct, spotType, evPremiumPct } = params;

  const over = Math.max(0, occupancyPct - targetOccupancyPct);
  const overRange = Math.max(1, 100 - targetOccupancyPct);
  const surgePct = Math.min(surgeMaxPct, Math.round((over / overRange) * surgeMaxPct));

  const evPct = spotType === "EV" ? evPremiumPct : 0;
  const multiplier = 1 + (surgePct + evPct) / 100;

  return Math.max(100, Math.round(baseRateCents * multiplier));
}

export function computeTotalCents(hourlyRateCents: number, startAt: Date, endAt: Date): number {
  const ms = endAt.getTime() - startAt.getTime();
  const hours = Math.max(1, Math.ceil(ms / (60 * 60 * 1000)));
  return hourlyRateCents * hours;
}
