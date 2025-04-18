import { InjectRepository } from '@nestjs/typeorm';
import { Url } from 'src/entity/url.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  private readonly logger = new Logger(UrlService.name);

  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}

  async shortenUrl(orignalUrl: string): Promise<Url> {
    //check if orignal URL is already present
    const existingUrl = await this.urlRepository.findOne({
      where: { orignalUrl },
    });
    //if ulr exists then return
    if (existingUrl) {
      return existingUrl;
    }

    //if not, generate new one and save
    const shortUrl: string = nanoid(8);
    const newUrl = this.urlRepository.create({ orignalUrl, shortUrl });
    const savedUrl = await this.urlRepository.save(newUrl);

    this.logger.log(`shortened URL for "${orignalUrl}" --> "${shortUrl}"`);
    return savedUrl;
  }

  async getOrignalUrl(shortUrl: string): Promise<Url | null> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });

    if (url) {
      this.logger.log(
        `Redericting short URL "${shortUrl}"  to  "${url.orignalUrl}"`,
      );
    } else {
      this.logger.warn(`short URL "${shortUrl}"`);
    }

    return url;
  }

  async deleteUrl(id: number): Promise<void> {
    await this.urlRepository.delete(id);
    this.logger.log(`Deleted URL with ID: ${id}`);
  }
}
