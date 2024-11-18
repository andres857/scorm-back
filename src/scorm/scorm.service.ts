import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScormAttempt } from './entities/scorm.entity';

@Injectable()
export class ScormService {
  constructor(
    @InjectRepository(ScormAttempt)
    private scormAttemptRepository: Repository<ScormAttempt>
  ) {}

  async getState(userId: number, courseId: number): Promise<any> {
    let attempt = await this.scormAttemptRepository.findOne({
      where: { userId, courseId },
      order: { createdAt: 'DESC' }
    });

    if (!attempt) {
      attempt = this.scormAttemptRepository.create({
        userId,
        courseId,
        cmiCoreLessonStatus: 'not attempted',
        cmiCoreScoreRaw: null,
        cmiCoreTotalTime: '0000:00:00'
      });
    }

    return {
      success: true,
      data: attempt.toScormData()
    };
  }

  async updateData(
    userId: number, 
    courseId: number, 
    name: string, 
    value: any
  ): Promise<any> {
    let attempt = await this.scormAttemptRepository.findOne({
      where: { userId, courseId },
      order: { createdAt: 'DESC' }
    });

    if (!attempt) {
      attempt = this.scormAttemptRepository.create({ userId, courseId });
    }

    const scormData = { [name]: value };
    const entityData = ScormAttempt.fromScormData(scormData);
    
    Object.assign(attempt, entityData);

    // Lógica adicional para casos especiales
    if (name === 'cmi.core.lesson_status' && 
        ['completed', 'passed'].includes(value)) {
      attempt.completedAt = new Date();
    }

    await this.scormAttemptRepository.save(attempt);
    return { success: true };
  }
}