import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepository } from 'typeorm';
import { User } from '../src/user/entities/user.entity';
import { Organisation } from '../src/organisation/entities/organisation.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  afterAll(async () => {
    await getRepository(User).query(`DELETE FROM users;`);
    await getRepository(Organisation).query(`DELETE FROM organisations;`);
    await app.close();
  });

  it('should register user successfully with default organisation', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'ajohnny.doe@example.com',
        password: 'password123',
        phone: '1234567890',
      })
      .expect(201);

    expect(response.body.status).toBe('success');
    expect(response.body.data.user.firstName).toBe('John');
    expect(response.body.data.user.email).toBe('ajohnny.doe@example.com');
    expect(response.body.data.accessToken).toBeDefined();

    const organisations = await getRepository(Organisation).find();
    expect(organisations).toHaveLength(1);
    expect(organisations[0].name).toBe("John's Organisation");
  });

  it('should log the user in successfully', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ajohnny.doe@example.com',
        password: 'password123',
      })
      .expect(200);

    expect(loginResponse.body.status).toBe('success');
    expect(loginResponse.body.data.user.email).toBe('ajohnny.doe@example.com');
    expect(loginResponse.body.data.accessToken).toBeDefined();
  });

  it('should fail if required fields are missing', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: '',
        lastName: '',
        email: 'invalid-email',
        password: '',
        phone: '',
      })
      .expect(422);

    expect(response.body.errors).toContainEqual(
      expect.objectContaining({
        field: 'firstName',
        message: expect.any(String),
      }),
    );
    expect(response.body.errors).toContainEqual(
      expect.objectContaining({
        field: 'lastName',
        message: expect.any(String),
      }),
    );
    expect(response.body.errors).toContainEqual(
      expect.objectContaining({ field: 'email', message: expect.any(String) }),
    );
    expect(response.body.errors).toContainEqual(
      expect.objectContaining({
        field: 'password',
        message: expect.any(String),
      }),
    );
  });

  it('should fail if there’s duplicate email or userId', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'ajohnny.doe@example.com',
        password: 'password123',
        phone: '0987654321',
      })
      .expect(400);

    expect(response.body.status).toBe('Bad request');
    expect(response.body.message).toBe('Registration unsuccessful');
  });
});
