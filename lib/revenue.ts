export function splitRevenue(totalCents: number, bps: { manager: number; driver: number; platform: number }) {
  const sum = bps.manager + bps.driver + bps.platform;
  if (sum !== 10000) {
    throw new Error(`Revenue split bps must equal 10000. Got ${sum}`);
  }
  const managerAmount = Math.floor((totalCents * bps.manager) / 10000);
  const driverCashback = Math.floor((totalCents * bps.driver) / 10000);
  const platformFee = totalCents - managerAmount - driverCashback;
  return { managerAmount, driverCashback, platformFee };
}
