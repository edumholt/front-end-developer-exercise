import { Component, OnInit } from '@angular/core';

import { MessageService } from '../services/message.service';
import { Message } from '../message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  public messages: Message[];
  public unreadMessages = 0;

  private selectedMessage: Message;

  private readButton: HTMLButtonElement;
  private unreadButton: HTMLButtonElement;

  constructor(private messageService: MessageService) {
    this.messages = messageService.getMessages();
   }

  ngOnInit() {
    this.updateUnreadMessages();
    const buttonDiv: HTMLElement = document.getElementById('message-actions');
    this.createReadButton();
    buttonDiv.appendChild(this.readButton);

    this.createUnreadButton();
    buttonDiv.appendChild(this.unreadButton);
    this.readButton.disabled = true;
    this.unreadButton.disabled = true;
  }

  handleDivClick(message: Message): void {
    if (this.selectedMessage) {
      this.selectedMessage.selected = false;
    }
    message.selected = true;
    this.selectedMessage = message;

    if (this.selectedMessage.unread) {
      this.unreadButton.disabled = true;
      this.readButton.disabled = false;
    } else {
      this.unreadButton.disabled = false;
      this.readButton.disabled = true;
    }
  }

  private updateUnreadMessages(): void {
    this.unreadMessages = 0;
    for (const message of this.messages) {
      if (message.unread) {
        this.unreadMessages += 1;
      }
    }
  }

  private createReadButton(): void {
    this.readButton = document.createElement('button');
    this.readButton.innerHTML = 'Mark Read';
    this.readButton.style.margin = '0 5px';
    this.readButton.addEventListener('click', () => {
      this.selectedMessage.unread = false;
      this.readButton.disabled = true;
      this.unreadButton.disabled = false;
      this.updateUnreadMessages();
    });
  }

  private createUnreadButton(): void {
    this.unreadButton = document.createElement('button');
    this.unreadButton.innerHTML = 'Mark Unread';
    this.unreadButton.style.margin = '0 5px';
    this.unreadButton.addEventListener('click', () => {
      this.selectedMessage.unread = true;
      this.unreadButton.disabled = true;
      this.readButton.disabled = false;
      this.updateUnreadMessages();
    });
  }

}
