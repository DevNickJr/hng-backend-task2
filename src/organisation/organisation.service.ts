import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organisation } from './entities/organisation.entity';
import {
  CreateOrganisationDto,
  GetOrganisationResponse,
} from './dto/create-organisation.dto';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(Organisation)
    private organisationRepository: Repository<Organisation>,
  ) {}

  async create(createOrganisationDto: CreateOrganisationDto) {
    const organisation = this.organisationRepository.create(
      createOrganisationDto,
    );
    await this.organisationRepository.save(organisation);
    return organisation;
  }

  async findAll(): Promise<Organisation[]> {
    return this.organisationRepository.find();
  }

  async findAllUserOrganisations(): Promise<Organisation[]> {
    return this.organisationRepository.find();
  }

  async getById(orgId: string): Promise<Organisation> {
    return await this.organisationRepository.findOneBy({ orgId });
  }

  async getByName(name: string): Promise<Organisation> {
    return await this.organisationRepository.findOneBy({ name });
  }

  async findOne(orgId: string): Promise<GetOrganisationResponse> {
    try {
      const organisation = await this.organisationRepository.findOneBy({
        orgId,
      });

      if (!organisation) {
        throw new BadRequestException('organisation does not exist');
      }

      return {
        status: 'success',
        message: 'Login successful',
        data: organisation,
      };
    } catch (error) {
      throw new BadRequestException({
        status: 'failed',
        message: 'Failed to fetch',
      });
    }
  }

  async remove(orgId: string): Promise<void> {
    await this.organisationRepository.delete(orgId);
  }
}
