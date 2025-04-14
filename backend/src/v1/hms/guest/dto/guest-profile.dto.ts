export class UserProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  nationality: string;
  dateOfBirth: string;
  idType: string;
  identificationNumber: string;
  image: string;
  }
  
  export class UserProfileResponseDto {
    success: boolean;
    data: UserProfileDto;
  }