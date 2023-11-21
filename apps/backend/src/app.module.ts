import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LobbyGateway } from './lobby/lobby.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { GameGateway } from './game/game.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LobbyGateway, ChatGateway, GameGateway],
})
export class AppModule {}
