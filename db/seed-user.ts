import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

const prisma = new PrismaClient();

async function seedUser() {
  try {
    console.log('Deleting all User related tables');
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.createMany({ data: sampleData.users });

    console.log('User Database seeded successfully');
  } catch (err) {
    console.error('Error occured during seeding users', err);
  }
}

seedUser();
