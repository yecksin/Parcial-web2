import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { ChatI } from './interfaces/ChatI';
import { MessageI } from './interfaces/MessageI';
import {MatDialog} from '@angular/material/dialog';
import { AgregarContactoComponent } from '../modales/agregar-contacto/agregar-contacto.component';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { EditarPerfilComponent } from '../modales/editar-perfil/editar-perfil.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  textoBuscar='';
  subscriptionList: {
    connection: Subscription,
    msgs: Subscription
  } = {
      connection: undefined,
      msgs: undefined
  };

  

  currentChat = {
    title: "",
    icon: "",
    msgs: []
  };

  constructor(
    public authService: AuthService,
     public chatService: ChatService,
     public dialog: MatDialog,
     public _users:UsuariosService
     ) {}

  ngOnInit(): void {
    this.initChat();
    this._users.getChatsList(this.authService.currentUid);
  }

  ngOnDestroy(): void {
    this.destroySubscriptionList();
    this.chatService.disconnect();
  }

  initChat() {

    console.log("init chat");
    this.currentChat.msgs = this._users.getChatsListEstrucutured();
    // this.currentChat.msgs = this._users.getChatsListEstrucutured();
    console.log(this._users.getChatsListEstrucutured());
    this.subscriptionList.connection = this.chatService.connect().subscribe(_ => {
      // console.log("Nos conectamos");
      this.subscriptionList.msgs = this.chatService.getNewMsgs().subscribe((msg: MessageI) => {
        msg.isMe = this.currentChat.title === msg.owner ? true : false;
        // console.log("Mensaje a array");
        this.currentChat.msgs.push(msg);
        console.log("Mensajes actuales");
         console.log( this.currentChat.msgs);
      });
    });
  }

  onSelectInbox(chatUid,usuarioActual) {
    console.log(usuarioActual);
    console.log(chatUid);
    this._users.chatUid = chatUid;
    console.log(this._users.chats);
    this._users.getUserData(chatUid,usuarioActual);
    // this.currentChat.title = this.chats[index].title;
    //   this.currentChat.icon = this.chats[index].icon;
    //   this.currentChat.msgs = this.chats[index].msgs;
  }

  doLogout() {
    this.authService.logout();
  }

  destroySubscriptionList(exceptList: string[] = []): void {
    for (const key of Object.keys(this.subscriptionList)) {
      if (this.subscriptionList[key] && exceptList.indexOf(key) === -1) {
        this.subscriptionList[key].unsubscribe();
      }
    }
  }

  dropdown_inventado(){
    console.log("El bichoo")    
  }

  openModal(modalId){
    document.getElementById(modalId).classList.toggle("is-active");
  }

  openDropDown(DropDownId){
    document.getElementById(DropDownId).classList.toggle("is-active");
    // document.getElementById(DropDownId).classList.toggle("animate__zoomIn");
  }

  openDialog() {
    this.dialog.open(AgregarContactoComponent);
  }

  openDialogPerfil() {
    this.dialog.open(EditarPerfilComponent);
  }

}
