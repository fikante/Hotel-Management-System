import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  
  @IsNotEmpty()
  firstName: string;

  @IsAlpha()
  lastName: string;

  // makes sure the field IS a valid email address
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsNotEmpty()
  nationality: string;

  @IsNotEmpty()
  gender: string;
}
