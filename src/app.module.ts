import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, TicketsModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
