import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const quoteSchema = z.object({
  lotId: z.string().min(1),
  spotType: z.enum(["STANDARD", "EV"]),
  startAt: z.string().min(1),
  endAt: z.string().min(1)
});

export const reserveSchema = quoteSchema;

export const edgeEventSchema = z.object({
  lotId: z.string().min(1),
  externalSpotRef: z.string().min(1),
  occupied: z.boolean(),
  ts: z.string().optional(),
  secret: z.string().min(1)
});

export const updateLotSchema = z.object({
  baseRateCents: z.number().int().min(0).optional(),
  evPremiumPct: z.number().int().min(0).max(300).optional(),
  surgeMaxPct: z.number().int().min(0).max(500).optional(),
  targetOccupancyPct: z.number().int().min(0).max(100).optional(),
  managerShareBps: z.number().int().min(0).max(10000).optional(),
  driverCashbackBps: z.number().int().min(0).max(10000).optional(),
  platformFeeBps: z.number().int().min(0).max(10000).optional()
}).refine((v) => {
  const anySplit = v.managerShareBps !== undefined || v.driverCashbackBps !== undefined || v.platformFeeBps !== undefined;
  if (!anySplit) return true;
  const m = v.managerShareBps ?? 0;
  const d = v.driverCashbackBps ?? 0;
  const p = v.platformFeeBps ?? 0;
  // only validate if all present
  const all = v.managerShareBps !== undefined && v.driverCashbackBps !== undefined && v.platformFeeBps !== undefined;
  return !all || (m + d + p === 10000);
}, { message: "If you update revenue split, provide all three bps and ensure they sum to 10000." });
