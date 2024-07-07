import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrganisation } from './entities/shared.entity';
import {
  CreateUserOrganisationDto,
  GetUserOrganisationResponse,
} from './dto/create-shared.dto';

@Injectable()
export class UserOrganisationService {
  constructor(
    @InjectRepository(UserOrganisation)
    private userOrganisationRepository: Repository<UserOrganisation>,
  ) {}

  async create(createUserDto: CreateUserOrganisationDto) {
    const userOrganisation =
      this.userOrganisationRepository.create(createUserDto);
    await this.userOrganisationRepository.save(userOrganisation);
    return userOrganisation;
  }

  async findAll(): Promise<UserOrganisation[]> {
    return this.userOrganisationRepository.find();
  }

  async findAllUserOrganisations(): Promise<UserOrganisation[]> {
    return this.userOrganisationRepository.find();
  }

  async getByOrgId(orgId: string): Promise<UserOrganisation> {
    return await this.userOrganisationRepository.findOneBy({ orgId });
  }

  async getByUserId(userId: string): Promise<UserOrganisation> {
    return await this.userOrganisationRepository.findOneBy({ userId });
  }

  async findById(id: number): Promise<GetUserOrganisationResponse> {
    try {
      const organisation = await this.userOrganisationRepository.findOneBy({
        userOrganisationId: id,
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

  async remove(userId: string): Promise<void> {
    await this.userOrganisationRepository.delete(userId);
  }
}
