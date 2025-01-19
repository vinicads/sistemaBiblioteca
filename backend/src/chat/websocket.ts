import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({ cors: { origin: 'http://localhost:8080', credentials: true } })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  connectedClients = new Map<string, { client: Socket, name: string }>();

  handleConnection(client: Socket) {
    const clientId = uuidv4(); 
    client.data.clientId = clientId;
    client.emit('connected', clientId); 
  }

  handleDisconnect(client: Socket) {
    const clientId = client.data.clientId;
    const userInfo = this.connectedClients.get(clientId);

    if (userInfo) {
      this.server.emit('user-left', `${userInfo.name} saiu do chat.`);
      this.connectedClients.delete(clientId);
    }

  }

  @SubscribeMessage('register-name')
  handleRegisterName(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
    const clientId = client.data.clientId;
    this.connectedClients.set(clientId, { client, name });

    this.server.emit('user-joined', `${name} entrou no chat.`);
  }

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message: { senderId: string, content: string }, @ConnectedSocket() client: Socket) {
      const senderInfo = this.connectedClients.get(message.senderId);
  
      if (senderInfo) {
          client.broadcast.emit('message', { sender: senderInfo.name, content: message.content });
      }
  }
  
}
