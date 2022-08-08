import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class AccountDto extends AuthDto {
  @IsNotEmpty()
  @Length(3, 20)
  firstName: string;
  @IsNotEmpty()
  @Length(3, 20)
  lastName: string;
}
