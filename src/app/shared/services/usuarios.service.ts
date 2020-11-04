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

  getListUsers(currentUser){
    this.usuarios= [];
    let itemRef1 = this.db.object('users');
    let subscription = itemRef1.snapshotChanges().subscribe((action: any) => {
         console.log("Get list users");
          
          for (let k  in action.payload.val()) {
          let user = action.payload.val()[k];
          user.key=k;
          console.log(k);
          if (k!=currentUser) {
            this.usuarios.push(user);
          }
          
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
      titulo: {
        msg:'Chat Creado'
      },
     
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
    // console.log("*****************************getChatsList()*******************************");
    
    let itemRef1 = this.db.object('users/'+currentUid+'/uidChats');
    let subscription = itemRef1.snapshotChanges().subscribe((action: any) => {
         
      this.chats= [];
          for (let k  in action.payload.val()) {
          let chat = action.payload.val()[k];
          chat.key=k;
          this.chats.push(chat);
          }
          console.log(this.chats);
          // subscription.unsubscribe();
    });
  }

  getChatsListEstrucutured(){
    let chatsCrudos= [];
    let itemRef1 = this.db.object('chats');
    let subscription = itemRef1.snapshotChanges().subscribe((action: any) => {
         
          
          for (let k  in action.payload.val()) {
            let chat = action.payload.val()[k];
            for (let j  in chat) {
              let chat1 = chat[j];
          //   // chatsCrudos.push(chat);
          // }
          // chat.key=k;
          // console.log("llave: "+j);
          if(j != "titulo"){
            chatsCrudos.push(chat1.msg);
          }
              
            }
          }
          // console.log("****** chat crudos ******");
          // console.log(chatsCrudos);
          subscription.unsubscribe();
    });
    return chatsCrudos;
  }

}
