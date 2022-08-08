import { ForbiddenException, Injectable } from '@nestjs/common';
import { AccountDto, AuthDto } from '../dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(authDto: AuthDto) {
    console.log(authDto);
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    console.log(authDto.password);
    console.log(user.hash);
    if (!user) throw new ForbiddenException('no email or password');
    const pwMatches = await argon.verify(user.hash, authDto.password);
    console.log(pwMatches);
    if (pwMatches) {
      return this.signToken(user.id, user.email);
    } else {
      throw new ForbiddenException('wrong email or password');
    }
  }

  async signup(authDto: AccountDto) {
    try {
      const hash = await argon.hash(authDto.password);
      const user = await this.prismaService.user.create({
        data: {
          email: authDto.email,
          hash: hash,
          firstname: authDto.firstName,
          lastname: authDto.lastName,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credential taken');
        } else {
          throw error;
        }
      }
    }
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secretKey = this.config.get('SECRET_KEY');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secretKey,
    });
    return { access_token: token };
  }
}
