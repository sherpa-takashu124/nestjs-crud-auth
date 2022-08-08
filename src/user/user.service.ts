import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async updateUser(userDetail: Partial<AccountDto>, userID: number) {
    const updateRecord = await this.prisma.user.update({
      where: {
        id: userID,
      },
      data: userDetail,
    });
    if (updateRecord) {
      delete updateRecord.hash;
      return updateRecord;
    } else {
      throw new HttpException('No user Found', HttpStatus.NOT_FOUND);
    }
  }
}
