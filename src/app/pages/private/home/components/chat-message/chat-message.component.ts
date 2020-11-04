import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() content: string
  @Input() time: string
  @Input() isMe: boolean
  @Input() isRead: boolean
  @Input() enviadoPor: string

  constructor(
    public _auth:AuthService,
  ) { }

  ngOnInit(): void {
  }

}
