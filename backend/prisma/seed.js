const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Seeding ---');

  // 1. Create Offers
  const offers = [
    {
      name: 'Essentiel',
      speed: 25,
      quota: 100,
      price: 49.99,
      description: 'Idéal pour le surf et les emails.',
      isPopular: false
    },
    {
      name: 'Populaire',
      speed: 50,
      quota: null, // Unlimited
      price: 79.99,
      description: 'Le meilleur rapport qualité/prix.',
      isPopular: true
    },
    {
      name: 'Famille',
      speed: 100,
      quota: null,
      price: 129.99,
      description: 'Pour toute la famille sans compromis.',
      isPopular: false
    }
  ];

  for (const offer of offers) {
    await prisma.offer.upsert({
      where: { id: offer.name }, // This is a bit hacky for seeding, better use names if unique
      update: {},
      create: offer
    });
  }
  console.log('✅ Offers created');

  // 2. Clear existing users for seeding (Optional/Selective)
  const adminEmail = 'admin@novaplus.com';
  const testClientEmail = 'test@client.com';

  const hashedAdminPassword = await bcrypt.hash('Admin123!', 10);
  const hashedUserPassword = await bcrypt.hash('Test123!', 10);

  // 3. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedAdminPassword },
    create: {
      email: adminEmail,
      password: hashedAdminPassword,
      name: 'NOVA+ Admin',
      role: 'ADMIN'
    }
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // 4. Create Test Client
  const client = await prisma.user.upsert({
    where: { email: testClientEmail },
    update: { password: hashedUserPassword },
    create: {
      email: testClientEmail,
      password: hashedUserPassword,
      name: 'Patient Client',
      phone: '+243000000000',
      role: 'USER'
    }
  });
  console.log(`✅ Test Client created: ${client.email}`);

  // 5. Link a subscription to test client (Optional)
  const defaultOffer = await prisma.offer.findFirst({ where: { name: 'Populaire' } });
  if (defaultOffer) {
    await prisma.subscription.create({
      data: {
        userId: client.id,
        offerId: defaultOffer.id,
        status: 'ACTIVE',
        installStatus: 'INSTALLED',
        startDate: new Date()
      }
    });
    console.log('✅ Subscription linked to test client');
  }

  console.log('--- Seeding Completed ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
