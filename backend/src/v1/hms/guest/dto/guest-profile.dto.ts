export class UserProfileDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    identificationNumber: string;
    gender: string;
    nationality: string;
    identificationType: string;
    image: string;
  }
  
  export class UserProfileResponseDto {
    success: boolean;
    data: UserProfileDto;
  }