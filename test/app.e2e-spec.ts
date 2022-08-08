import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  describe('Auth', () => {
    it('sign in', () => {
      const dto: AuthDto = {
        email: 'test2@test.com',
        password: 'test123'
      };
      return pactum
        .spec()
        .post('http://localhost:3333/auth/signup')
        .withBody(dto)
        .expectStatus(201).inspect();
    });
    describe('sign up', () => {
      it.todo('toto')
    });
  });
  describe('User', () => { 
    it.todo('todo');
  });
  describe('BookMark', () => {
    it.todo('todo');
  });
});
