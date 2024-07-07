import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationService } from './organisation.service';
import { Repository } from 'typeorm';
import { Organisation } from './entities/organisation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OrganisationService', () => {
  let service: OrganisationService;
  let repositoryMock: Partial<Repository<Organisation>>;

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
        OrganisationService,
        {
          provide: getRepositoryToken(Organisation),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<OrganisationService>(OrganisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
