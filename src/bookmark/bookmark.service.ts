import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bookmark } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookMark(bookmark: Bookmark) {
    const record = await this.prisma.bookMark.create({
      data: {
        title: bookmark.title,
        description: bookmark.description,
        link: bookmark.link,
        userId: bookmark.userId
      },
    });
    return record;
  }
  async allBookMark(userID: number) {
    const allRecord = await this.prisma.bookMark.findMany({
      where: {
        userId: userID,
      },
    });
    return allRecord;
  }
  async DeleteBookmark(bookmarkId: number, userID: number) {
    const deleteRecord = await this.prisma.bookMark.deleteMany({
      where: {
        id: {
          equals: bookmarkId,
        },
        userId: {
          equals: userID,
        },
      },
    });
    if (deleteRecord.count > 0) {
      console.log(deleteRecord);
      return { message: 'successful' };
    } else {
      console.log('no record');
      throw new HttpException('No such record', HttpStatus.NOT_FOUND);
    }
  }
  async editBookMark(
    bookmark: Partial<Bookmark>,
    bookmarkId: number,
    userID: number,
  ) {
    const editRecord = await this.prisma.bookMark.updateMany({
      where: {
        id: {
          equals: bookmarkId,
        },
        userId: {
          equals: userID,
        },
      },
      data: bookmark,
    });

    if (editRecord.count > 0) {
      return { message: 'successful' };
    } else {
      throw new HttpException('No such record', HttpStatus.NOT_FOUND);
    }
  }

  async findBookMarkById(bookmarkId: number, userID: number) {
    const bookmark: Bookmark[] = await this.prisma.bookMark.findMany({
      where: {
        id: {
          equals: bookmarkId,
        },
        userId: {
          equals: userID,
        },
      },
    });
    if (bookmark[0]) {
      return bookmark[0];
    } else {
      throw new HttpException('No such record', HttpStatus.NOT_FOUND);
    }
  }
}
