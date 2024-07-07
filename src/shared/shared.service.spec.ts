import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserOrganisationService } from './shared.service';
import { UserOrganisation } from './entities/shared.entity';

describe('UserOrganisationService', () => {
  let service: UserOrganisationService;
  let repositoryMock: Partial<Repository<UserOrganisation>>;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      // Add more repository methods as needed for your tests
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserOrganisationService,
        {
          provide: getRepositoryToken(UserOrganisation),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserOrganisationService>(UserOrganisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
