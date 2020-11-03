import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios= [];
  chats=[];
  constructor(
    public _afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  getListUsers(){
    this.usuarios= [];
    let itemRef1 = this.db.object('users');
    let subscription = itemRef1.snapshotChanges().subscribe((action: any) => {
         
          
          for (let k  in action.payload.val()) {
          let user = action.payload.val()[k];
          user.key=k;
          this.usuarios.push(user);
          }
          console.log(this.usuarios);
          subscription.unsubscribe();
    });
  }

  agregarUsuario(){
    console.log("agregar usuario");
  }


  crearChat(user,currentUid) {
    console.log("mi uid ",currentUid);
console.log(user);
    this.db.database.ref('chats').push({
      titulo: "chat con "+user.name,
     
    }).then(resp => {
      
      console.log(resp['path']['pieces_'][1]);
      
      this.pushChatUid(currentUid,user.key,resp['path']['pieces_'][1]);
    }).catch(e => {
      console.log("Hubo un error");
      console.log(e);
    });

  }

  pushChatUid(uidCurrent,uidNewUser,uidChat){

    this.db.database.ref('users/' + uidCurrent+'/uidChats').push({
      chatUid:uidChat,
      person:uidNewUser

    }).then(() => {

    });

    this.db.database.ref('users/' + uidNewUser+'/uidChats').push({
      chatUid:uidChat,
      person:uidCurrent

    }).then(() => {

    });


  }

  getChatsList(currentUid){
    console.log("getChatsList()");
    this.chats= [];
    let itemRef1 = this.db.object('users/'+currentUid+'/uidChats');
    let subscription = itemRef1.snapshotChanges().subscribe((action: any) => {
         
          
          for (let k  in action.payload.val()) {
          let chat = action.payload.val()[k];
          chat.key=k;
          this.chats.push(chat);
          }
          console.log(this.chats);
          subscription.unsubscribe();
    });
  }

}
