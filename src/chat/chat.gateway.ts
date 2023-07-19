import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.create(createChatDto, client.id);

    // Send event to client
    this.server.to(createChatDto.room).emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllChat')
  findAll(@MessageBody() { room }) {
    return this.chatService.findAll(room);
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);

    return this.chatService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.chatService.getClientName(client.id);

    // Send event to client
    if (room) {
      this.server.to(room).emit('typing', { name, isTyping });
    } else {
      this.server.emit('typing', { name, isTyping });
    }
  }
}
