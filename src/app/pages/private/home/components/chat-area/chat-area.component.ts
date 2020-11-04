import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { MessageI } from '../../interfaces/MessageI';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  @Input() title: string = ""
  @Input() chatUid: string = ""
  @Input() icon: string = ""
  @Input() msgs: Array<MessageI> = []

  msg: string;
  date = new Date();
  constructor(
    public chatService: ChatService,
    public _auth:AuthService,
    public _users:UsuariosService
    ) { }

  ngOnInit(): void {
  }

  sendMsg() {
    const msg: MessageI = {
      content: this.msg,
      isMe: true,
      time: this.date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      isRead: false,
      owner: this.title,
      chatUid : this._users.chatUid
    }
    this.chatService.sendMsg(msg,this._users.chatUid);
    this.msg = "";
  }
}
