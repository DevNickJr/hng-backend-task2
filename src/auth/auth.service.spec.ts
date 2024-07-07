import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { OrganisationService } from '../organisation/organisation.service';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserOrganisationService } from 'src/shared/shared.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let organisationService: OrganisationService;
  let userOrganisationService: UserOrganisationService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: OrganisationService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: UserOrganisationService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    organisationService = module.get<OrganisationService>(OrganisationService);
    userOrganisationService = module.get<UserOrganisationService>(
      UserOrganisationService,
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should register user successfully with correct JWT expiration', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password',
        phone: '1234567890',
      };

      const hashedPassword = 'hashedPassword';
      const newUser = {
        ...createUserDto,
        userId: '1',
        password: hashedPassword,
        userOrganisations: [],
      };
      const organisation = {
        orgId: '1',
        name: "John's Organisation",
        userOrganisations: [],
      };
      const userOrganisation = {
        userOrganisationId: 1,
        orgId: '1',
        userId: '1',
        name: "John's Organisation",
        user: newUser,
        organisation,
      };
      const token = 'jwtToken';

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(userService, 'create').mockResolvedValue(newUser);
      jest.spyOn(organisationService, 'create').mockResolvedValue(organisation);
      jest
        .spyOn(userOrganisationService, 'create')
        .mockResolvedValue(userOrganisation);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.register(createUserDto);

      const signCall = jwtService.sign as jest.Mock;
      const signArgs = signCall.mock.calls[0];
      const options = signArgs[1];

      expect(bcrypt.hash).toHaveBeenCalledWith(
        createUserDto.password,
        expect.any(Number),
      );
      expect(userService.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(organisationService.create).toHaveBeenCalledWith({
        name: "John's Organisation",
      });
      expect(userOrganisationService.create).toHaveBeenCalledWith({
        user: newUser,
        organisation,
        isOwner: true,
      });
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          userId: newUser.userId,
          email: newUser.email,
        },
        expect.any(Object),
      );

      expect(options.expiresIn).toBe('36000s');

      expect(result).toEqual({
        status: 'success',
        message: 'Registration successful',
        data: {
          accessToken: token,
          user: newUser,
        },
      });
    });

    // it('should throw error if user already exists', async () => {
    //   const createUserDto: CreateUserDto = {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'john@example.com',
    //     password: 'password',
    //     phone: '1234567890',
    //   };
    //   const hashedPassword = 'hashedPassword';
    //   const newUser = {
    //     ...createUserDto,
    //     userId: '1',
    //     password: hashedPassword,
    //     userOrganisations: [],
    //   };
    //   const organisation = {
    //     orgId: '1',
    //     name: "John's Organisation",
    //     userOrganisations: [],
    //   };

    //   jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
    //   jest.spyOn(userService, 'create').mockResolvedValue(newUser);
    //   jest.spyOn(organisationService, 'create').mockResolvedValue(organisation);
    //   jest
    //     .spyOn(userService, 'create')
    //     .mockRejectedValue(new BadRequestException('Email Already in use'));

    //   await expect(authService.register(createUserDto)).rejects.toThrow(
    //     BadRequestException,
    //   );

    //   expect(userService.create).toHaveBeenCalledWith({
    //     ...createUserDto,
    //     password: hashedPassword,
    //   });
    // });
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AuthService],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
