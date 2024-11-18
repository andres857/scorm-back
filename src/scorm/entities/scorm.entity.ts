// scorm.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('scorm_attempts')
export class ScormAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  
  @Column()
  courseId: number;

  // Información del estudiante
  @Column({ nullable: true })
  cmiCoreStudentId: string;

  @Column({ nullable: true })
  cmiCoreStudentName: string;

  // Estado de la lección
  @Column({
    type: 'enum',
    enum: ['not attempted', 'incomplete', 'completed', 'passed', 'failed'],
    default: 'not attempted'
  })
  cmiCoreLessonStatus: string;

  // Puntuación
  @Column({ type: 'float', nullable: true })
  cmiCoreScoreRaw: number;

  @Column({ type: 'float', nullable: true })
  cmiCoreScoreMin: number;

  @Column({ type: 'float', nullable: true })
  cmiCoreScoreMax: number;

  // Tiempo
  @Column({ default: '0000:00:00' })
  cmiCoreSessionTime: string;

  @Column({ default: '0000:00:00' })
  cmiCoreTotalTime: string;

  // Progreso y navegación
  @Column({ nullable: true })
  cmiCoreLessonLocation: string;

  @Column({ nullable: true })
  cmiCoreEntry: string;

  @Column({ nullable: true })
  cmiCoreExit: string;

  // Datos suspendidos (para guardar estado)
  @Column({ type: 'text', nullable: true })
  cmiSuspendData: string;

  // Interacciones del estudiante
  @Column({ type: 'json', nullable: true })
  cmiInteractions: any;

  // Objetivos
  @Column({ type: 'json', nullable: true })
  cmiObjectives: any;

  // Campos de seguimiento
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  // Mapeo de nombres SCORM a nombres de columnas
  static scormMapping = {
    'cmi.core.student_id': 'cmiCoreStudentId',
    'cmi.core.student_name': 'cmiCoreStudentName',
    'cmi.core.lesson_status': 'cmiCoreLessonStatus',
    'cmi.core.score.raw': 'cmiCoreScoreRaw',
    'cmi.core.score.min': 'cmiCoreScoreMin',
    'cmi.core.score.max': 'cmiCoreScoreMax',
    'cmi.core.session_time': 'cmiCoreSessionTime',
    'cmi.core.total_time': 'cmiCoreTotalTime',
    'cmi.core.lesson_location': 'cmiCoreLessonLocation',
    'cmi.core.entry': 'cmiCoreEntry',
    'cmi.core.exit': 'cmiCoreExit',
    'cmi.suspend_data': 'cmiSuspendData'
  };

  // Método helper para convertir datos de SCORM a formato de entidad
  static fromScormData(scormData: Record<string, any>): Partial<ScormAttempt> {
    const entityData: Partial<ScormAttempt> = {};
    
    Object.entries(this.scormMapping).forEach(([scormKey, entityKey]) => {
      if (scormData[scormKey] !== undefined) {
        entityData[entityKey] = scormData[scormKey];
      }
    });
    
    return entityData;
  }

  // Método helper para convertir datos de entidad a formato SCORM
  toScormData(): Record<string, any> {
    const scormData = {};
    
    Object.entries(ScormAttempt.scormMapping).forEach(([scormKey, entityKey]) => {
      if (this[entityKey] !== undefined) {
        scormData[scormKey] = this[entityKey];
      }
    });
    
    return scormData;
  }
}





