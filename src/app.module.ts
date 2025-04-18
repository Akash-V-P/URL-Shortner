import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entity/url.entity';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'AkashVP@sql99',
      database: 'urlshortner',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UrlModule,
  ],
})
export class AppModule {}
