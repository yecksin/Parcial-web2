import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageI } from 'src/app/pages/private/home/interfaces/MessageI';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;

  constructor(
    public _afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  connect() {
    return new Observable(observer => {
      this.socket = io('localhost:3000');
      this.socket.on('connect', () => {
        observer.next();
      })
    })
  }

  getNewMsgs() {
    return new Observable(observer => {
      this.socket.on("newMsg", msg => {
        observer.next(msg);
      });
    });
  }

  sendMsg(msg: MessageI,chatUid) {
    this.socket.emit('newMsg', msg);
    this.saveMsg(msg,chatUid)
  }

  saveMsg(msg,chatUid){
    this.db.database.ref('chats/'+chatUid).push({
      msg,
     
    }).then(resp => {
      

    }).catch(e => {
      console.log("Hubo un error");
      console.log(e);
    });
  }

  disconnect() {
    this.socket.disconnect();
  }


  getChat(uidChat){
    let itemRef1 = this.db.object('chats'+uidChat);
    let subscription = itemRef1.snapshotChanges().subscribe((action: any) => {
          console.log("Datos " + action.payload.val());
          subscription.unsubscribe();
    });
  }








}
