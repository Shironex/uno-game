import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LobbyGateway } from './lobby/lobby.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { GameGateway } from './game/game.gateway';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, LobbyGateway, ChatGateway, GameGateway],
})
export class AppModule {}
