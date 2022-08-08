import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Bookmark } from 'src/dto';
import { BookmarkService } from './bookmark.service';
@Controller('bookmark')
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Post()
  createBookMark(@GetUser() user: User, @Body() bookmark: Bookmark) {
    bookmark.userId = user.id;
    return this.bookmarkService.createBookMark(bookmark);
  }

  @Get()
  allBookMark(@GetUser() user: User) {
    console.log(user);
    return this.bookmarkService.allBookMark(user.id);
  }

  @Delete(':id')
  DeleteBookmark(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @GetUser() user: User
  ) {
    return this.bookmarkService.DeleteBookmark(bookmarkId, user.id);
  }

  @Patch(':id')
  editBookMark(
    @Body() bookmark: Partial<Bookmark>,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @GetUser() user: User
  ) {
    return this.bookmarkService.editBookMark(bookmark, bookmarkId, user.id);
  }

  @Get(':id')
  findBookMarkById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.findBookMarkById(bookmarkId, user.id);
  }
}
