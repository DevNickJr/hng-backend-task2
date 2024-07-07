import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrganisation } from './entities/shared.entity';
import {
  CreateUserOrganisationDto,
  GetUserOrganisationResponse,
} from './dto/create-shared.dto';
import { ReturnOrganisationDto } from 'src/organisation/dto/create-organisation.dto';

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

  async findOrganisationsByUserId(
    userId: string,
  ): Promise<ReturnOrganisationDto[]> {
    const value = await this.userOrganisationRepository
      .createQueryBuilder('userOrganisation')
      .innerJoinAndSelect('userOrganisation.organisation', 'organisation')
      .where('userOrganisation.userId = :userId', { userId })
      // .select('userOrganisation.organisations')
      .getMany()
      .then((userOrganisations) =>
        userOrganisations.map((uo) => uo.organisation),
      );
    console.log({ value });

    return value;
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
