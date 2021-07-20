/*
 * @Author: Fanpingfan
 * @Date: 2021-07-08 10:42:15
 * @LastEditors: Fanpingfan
 * @LastEditTime: 2021-07-19 11:11:11
 */
import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
