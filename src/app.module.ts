import { Module } from '@nestjs/common';
import { ProdutoModule } from './produtos/produto.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuarioModule,
    ProdutoModule,
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
})
export class AppModule {}
