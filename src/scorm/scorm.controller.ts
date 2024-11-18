// scorm.controller.ts
import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { ScormService } from './scorm.service';

@Controller('scorm2004')
export class ScormController {
  constructor(private readonly scormService: ScormService) {}

  @Post('')
  dataReceiver(@Body() scormData: any, @Req() request: Request) {
    console.log('body', scormData);
    console.log('------------------------------------------');
    return {
      success: true
    }
  }

  @Get(':courseId/state')
  getState(@Param('courseId') courseId: number) {
    // Aquí normalmente obtendrías el userId del token/sesión
    const userId = 1; // Para pruebas
    return this.scormService.getState(userId, courseId);
  }

  @Post(':courseId/data')
  updateData(
    @Param('courseId') courseId: number,
    @Body() body: { name: string; value: any }
  ) {
    const userId = 1; // Para pruebas
    return this.scormService.updateData(
      userId, 
      courseId, 
      body.name, 
      body.value
    );
  }
}
