import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty({ message: 'Original URL must not be empty' })
  @IsUrl({}, { message: 'Please enter a valid URL' })
  orignalUrl: string;
}
