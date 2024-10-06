import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
  const amount = 100;
  await seedUsers(amount);
  await seedProducts(amount);
}

async function seedUsers(amount: number) {
  for (let i = 0; i < amount; i++) {
    console.log(`Inserindo usuario: ${i}`);
    const user = {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      cpf: faker.location.zipCode(),
      email: faker.internet.email(),
    };

    await prisma.user.create({
      data: {
        password: user.password,
        email: user.email,
        cpf: user.cpf,
        role: 'USER',
        name: user.name,
        username: user.username,
      },
    });
  }
}
async function seedProducts(amount: number) {
  for (let i = 0; i < amount; i++) {
    console.log(`Inserindo producto: ${i}`);
    await prisma.product.create({
      data: {
        name: faker.commerce.product(),
        amount: faker.number.int({ min: 1, max: 1000 }),
        price: faker.number.float({ min: 1, max: 100000 }),
      },
    });
  }
}

seedDatabase()
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
  .finally(() => {
    console.log('Seed finalizada.');
  });
