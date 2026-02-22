/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const managerEmail = "manager@buttertech.io";
  const userEmail = "user@buttertech.io";
  const password = await bcrypt.hash("Password123!", 10);

  const manager = await prisma.user.upsert({
    where: { email: managerEmail },
    update: {},
    create: { email: managerEmail, password, role: "MANAGER", name: "Parking Manager" }
  });

  await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: { email: userEmail, password, role: "USER", name: "Driver User" }
  });

  const lot = await prisma.parkingLot.upsert({
    where: { id: "demo-lot-1" },
    update: {},
    create: {
      id: "demo-lot-1",
      name: "Viize Demo Lot — Edea",
      city: "Edea",
      country: "Cameroon",
      currency: "CAD",
      baseRateCents: 400,
      evPremiumPct: 20,
      surgeMaxPct: 150,
      targetOccupancyPct: 80,
      managerShareBps: 9000,
      driverCashbackBps: 500,
      platformFeeBps: 500,
      managers: { connect: { id: manager.id } },
      spots: {
        create: [
          { label: "A1", type: "STANDARD", externalRef: "roi-a1" },
          { label: "A2", type: "STANDARD", externalRef: "roi-a2" },
          { label: "A3", type: "STANDARD", externalRef: "roi-a3" },
          { label: "EV1", type: "EV", externalRef: "roi-ev1" },
          { label: "EV2", type: "EV", externalRef: "roi-ev2" }
        ]
      }
    }
  });

  console.log("Seed complete. Demo lot:", lot.id);
  console.log("Login creds:");
  console.log("Manager:", managerEmail, "Password123!");
  console.log("User:   ", userEmail, "Password123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
