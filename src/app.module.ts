import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ScormController } from './scorm/scorm.controller';
// import { ScormService } from './scorm/scorm.service';
import { ScormModule } from './scorm/scorm.module';
import { ScormAttempt } from './scorm/entities/scorm.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace disponibles las variables en toda la app
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [ScormAttempt],
      synchronize: true, // sincroniza automaticamente el esquema de la base de datos con las entidades definidas en el codigo, usar solo en el desarrollo inicial
      // en produccion usar migraciones
    }),
    ScormModule,
  ],

  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
