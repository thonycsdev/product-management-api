import { faker } from '@faker-js/faker/.';
import { AccountRequestDto } from 'src/user/dto/account.request.dto';
function buildAccountRequestDTO() {
  return {
    cpf: '99999999999',
    nome: faker.person.fullName(),
    cargo: faker.person.jobTitle(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
  } as AccountRequestDto;
}

export default { buildAccountRequestDTO };
