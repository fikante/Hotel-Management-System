import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import {  CreateAdminDto } from './dtos/createAdminDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { create } from 'domain';

@Controller('admin')
export class AdminController {

    constructor(
        private readonly adminService: AdminService,
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('profilePic', {dest: './uploads'}))
    async createManager(
        @UploadedFile() file: Express.Multer.File,
        @Body() createAdminDto: CreateAdminDto
    ) {
        createAdminDto.profilePic = file.path;
        return await this.adminService.createAdmin(createAdminDto);
    }

    @Get()
    async getAllManagers() {
        return await this.adminService.getAllAdmins();
    }

    @Delete(':id')
    async deleteManager(@Param('id') id: string) {
        return await this.adminService.deleteAdmin(id);
    }
}
