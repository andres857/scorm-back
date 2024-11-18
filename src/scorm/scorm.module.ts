import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ScormController} from './scorm.controller';
import { ScormService } from './scorm.service';
import { ScormAttempt } from './entities/scorm.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ScormAttempt])
      ],
    controllers: [
        ScormController
    ],
    providers: [
        ScormService
    ],
})
export class ScormModule {}
