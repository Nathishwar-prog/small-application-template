import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing tables
  await prisma.refreshToken.deleteMany({});
  await prisma.user.deleteMany({});

  // Hashes passwords
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('AdminPassword123!', salt);
  const userPasswordHash = await bcrypt.hash('UserPassword123!', salt);

  // Create Super Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@enterprise.com',
      password: adminPasswordHash,
      firstName: 'System',
      lastName: 'Administrator',
      role: Role.SUPER_ADMIN,
      isActive: true,
      permissions: ['*'], // Root level access
    },
  });

  // Create standard user
  const user = await prisma.user.create({
    data: {
      email: 'user@enterprise.com',
      password: userPasswordHash,
      firstName: 'Jane',
      lastName: 'Doe',
      role: Role.USER,
      isActive: true,
      permissions: ['users:read'],
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log(`- Created Super Admin: ${admin.email}`);
  console.log(`- Created Standard User: ${user.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
