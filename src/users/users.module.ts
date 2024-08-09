import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UniqueEmailValidator } from './validacoes/unique-email.validator';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UniqueEmailValidator],
})
export class UsersModule {}
