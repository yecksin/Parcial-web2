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
  chatUid='';
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


  crearChat(userAdd,currentUser) {
    console.log("mi uid ",currentUser.uid);
console.log(userAdd);
    this.db.database.ref('chats').push({
      titulo: "chat con "+userAdd.name,
     
    }).then(resp => {
      
      console.log(resp['path']['pieces_'][1]);
      
      this.pushChatUid(currentUser,userAdd,resp['path']['pieces_'][1]);
    }).catch(e => {
      console.log("Hubo un error");
      console.log(e);
    });

  }

  pushChatUid(currentUser,userAdd,uidChat){
    console.log("numeros");
    console.log(currentUser);
    console.log(userAdd);
    this.db.database.ref('users/' + currentUser.uid+'/uidChats').push({
      chatUid:uidChat,
      person:userAdd.key,
      customName:userAdd.phoneCode+' '+ userAdd.phone

    }).then(() => {

    });

    this.db.database.ref('users/' + userAdd.key+'/uidChats').push({
      chatUid:uidChat,
      person:currentUser.uid,
      customName: currentUser.phoneCode+' '+ currentUser.phone

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
