import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organisation } from './entities/organisation.entity';
import {
  AddUserToOrganisationDto,
  CreateOrganisationDto,
  GetOrganisationResponse,
  GetOrganisationsResponse,
} from './dto/create-organisation.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserOrganisationService } from 'src/shared/shared.service';
import { GenericResponse } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(Organisation)
    private organisationRepository: Repository<Organisation>,
    private readonly usersService: UserService,
    private readonly userOrganisationService: UserOrganisationService,
  ) {}

  async create(createOrganisationDto: CreateOrganisationDto) {
    const organisation = this.organisationRepository.create(
      createOrganisationDto,
    );
    await this.organisationRepository.save(organisation);
    return organisation;
  }

  async userCreate(
    createOrganisationDto: CreateOrganisationDto,
    user: User,
  ): Promise<GetOrganisationResponse> {
    try {
      const organisation = await this.create(createOrganisationDto);

      await this.userOrganisationService.create({
        user: user,
        organisation,
        isOwner: true,
      });

      return {
        status: 'success',
        message: 'Organisation created successfully',
        data: organisation,
      };
    } catch (error) {
      console.log({ error });
      throw new BadRequestException({
        status: 'Bad Request',
        message: 'Client error',
        statusCode: 400,
      });
    }
  }
  async addUserToOrg(
    orgId: string,
    addUserToOrganisationDto: AddUserToOrganisationDto,
  ): Promise<GenericResponse> {
    try {
      const organisation = await this.getById(orgId);

      await this.userOrganisationService.create({
        userId: addUserToOrganisationDto.userId,
        organisation,
        isOwner: true,
      });

      return {
        status: 'success',
        message: 'User added to organisation successfully',
      };
    } catch (error) {
      console.log({ error });
      throw new BadRequestException({
        status: 'Bad Request',
        message: 'Client error',
        statusCode: 400,
      });
    }
  }

  async findAll(): Promise<Organisation[]> {
    return this.organisationRepository.find();
  }

  async findAllUserOrganisations(
    user: User,
  ): Promise<GetOrganisationsResponse> {
    const organisations =
      await this.userOrganisationService.findOrganisationsByUserId(user.userId);
    return {
      status: 'success',
      message: 'User Organisations',
      data: { organisations },
    };
    // return this.usersService.getUserOrganisations(user.userId);
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
        message: 'Organisation found',
        data: organisation,
      };
    } catch (error) {
      throw new BadRequestException({
        status: 'failed',
        message: 'Failed to fetch organisation',
        statusCode: 400,
      });
    }
  }

  async remove(orgId: string): Promise<void> {
    await this.organisationRepository.delete(orgId);
  }
}
