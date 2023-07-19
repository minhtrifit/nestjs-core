import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  messages: Chat[] = [
    { name: 'Minh Trí', text: 'Hello', room: '1' },
    { name: 'Maria', text: 'Love you', room: '1' },
    { name: 'Tommy', text: 'Ahihi', room: '2' },
  ];

  clientToUser = {};

  create(createChatDto: CreateChatDto, clientId: string) {
    console.log(createChatDto, this.clientToUser, clientId);

    const message = {
      name: this.clientToUser[clientId],
      text: createChatDto.text,
      room: createChatDto.room,
    };

    this.messages.push(message);

    return message;
  }

  findAll(room: string) {
    const roomMessages = this.messages.filter((msg) => {
      return msg.room === room;
    });

    return roomMessages;
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
