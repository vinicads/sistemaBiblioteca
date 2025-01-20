import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ChatComponent implements OnInit, OnDestroy {
  socket: any;
  messageInput: string = '';
  messages: any[] = [];
  userId: string | null = null;
  username: string = '';
  usernameInput: string = '';

  constructor() { }

  ngOnInit(): void {
    this.socket = io('ws://localhost:3000'); 

    this.socket.on('connected', (id: string) => {
      this.userId = id;
    });



    this.socket.on('message', (message: any) => {
      this.messages.push(message);
      this.scrollToBottom();
    });

    this.socket.on('user-joined', (message: string) => {
      this.messages.push({ sender: 'Sistema', content: message });
      this.scrollToBottom();
    });

    this.socket.on('user-left', (message: string) => {
      this.messages.push({ sender: 'Sistema', content: message });
      this.scrollToBottom();
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  trackById(index: number, item: any): any {
    return item.id; 
  }
  
  confirmUsername(): void {
    if (this.usernameInput) {
      this.username = this.usernameInput;
    } else {
      this.username = 'Anonimo';
    }
    this.socket.emit('register-name', this.username);
  }

  sendMessage(): void {
    if (!this.messageInput) return;

    this.socket.emit('send-message', {
      senderId: this.userId,
      content: this.messageInput,
    });

    this.messages.push({
      sender: this.username,
      content: this.messageInput,
      senderId: this.userId,
    });

    this.messageInput = '';
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  }
}
