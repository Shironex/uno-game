import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: 'http://localhost:3000' })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.server.emit('message', 'A new player has joined!');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): string {
    console.log(`Client ${client.id} sent: ${payload}`);
    return 'Hello world!';
  }
}
