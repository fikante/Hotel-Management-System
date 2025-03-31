// src/hms/staff/dto/assign-task.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty()
  @IsUUID()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  task: string;
}