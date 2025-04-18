import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(@Body() createUrlDto: CreateUrlDto) {
    const url = this.urlService.shortenUrl(createUrlDto.orignalUrl);
    return {
      message: 'Short URL created successfully',
      data: {
        orignalUrl: (await url).orignalUrl,
        shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/url/${(await url).shortUrl}`,
      },
    };
  }

  @Get(':shortUrl')
  async getOrignalUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ) {
    const url = await this.urlService.getOrignalUrl(shortUrl);
    if (!url) {
      throw new NotFoundException('short URL not found');
    }
    return res.redirect(url.orignalUrl);
  }

  @Delete(':id')
  async deleteUrl(@Param('id') id: number): Promise<string> {
    await this.urlService.deleteUrl(id);
    return 'URL successfully deleted';
  }
}
