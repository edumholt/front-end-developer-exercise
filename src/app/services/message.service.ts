import { Injectable } from '@angular/core';

import { Message } from '../message';
import { MESSAGES } from '../../starter files/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getMessages(): Message[] {
  return MESSAGES;
  }
}
