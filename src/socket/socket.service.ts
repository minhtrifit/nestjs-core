import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';

@Injectable()
export class SocketService {
  startListeners(server: Server, client: Socket) {
    const uid = v4();

    // Send event to client
    server
      .to(client.id)
      .emit('user_connected', { clientId: client.id, uid: uid });

    console.log('Message received from ' + client.id);
    return true;
  }
}
