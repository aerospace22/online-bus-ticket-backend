import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function populateDatabase() {
  const password = await argon2.hash('password');
  await prisma.user.create({
    data: {
      accountType: 'customer',
      accountNo: 'USR-00001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@domain.com',
      password,
    },
  });
}

// async function clearDatabase() {
//   //
// }

async function seed() {
  await populateDatabase();
  // clearDatabase();
}

seed()
  .then(() => console.log('Prisma seeder ran succesfully'))
  .finally(() => prisma.$disconnect());
