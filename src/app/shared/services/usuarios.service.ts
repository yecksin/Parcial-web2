import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  userAdduidACtual={
    key:'',
    name:''

  };
  userAddCurrentData='';
  usuarios= [];
  chats=[];
  chatUid='';
  chatsCrudosAux=[];
  constructor(
    public _afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) { }
    getUserData(chatUid,currentUser){
      console.log("Get user data");

      // console.log(currentUser);
      for (let k  in currentUser.uidChats) {
        // console.log(currentUser.uidChats[k]);
        console.log(currentUser.uidChats[k].chatUid+'   '+ chatUid);
        if (currentUser.uidChats[k].chatUid==chatUid) {
          console.log("Se encuentra el chat");
          this.userAddCurrentData=currentUser.uidChats[k].customName;
          this.userAdduidACtual.key=currentUser.uidChats[k].person;
          // this.userAdduidACtual.name=this.getoneUsername(currentUser.uidChats[k].person);
          // this.userAdduidACtual.name=currentUser.uidChats[k].customName;
          this.getoneUsername(currentUser.uidChats[k].person);
          console.log("uid actual");
          console.log(this.userAdduidACtual.key);
        }


        }
      
    }

  getoneUsername(uid){
    console.log("Traer un suariooooooo");
    let nombre:string ;
    let itemRef1 = this.db.object('users/'+uid+'/name');
    let subscription = itemRef1.snapshotChanges().subscribe((action: any) => {
         console.log("nameeeeeeeee");
         console.log(action.payload.val());
         this.userAdduidACtual.name = action.payload.val()
        //  subscription.unsubscribe();
          // return nombre;
         
         
    });
    // return nombre;
  }

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

  setCustomNAme(userAdd,currentUser){
    console.log(userAdd);
console.log(currentUser.uidChats);
for (let k  in currentUser.uidChats) {
console.log(currentUser.uidChats[k]);
if (currentUser.uidChats[k].person ==userAdd.key) {
  console.log("Tienes el chat sin nombre");
  this.db.database
  .ref("users/" + currentUser.uid+'/uidChats/'+k)
  .update({
    customName: userAdd.name
  })
  .then(() => {});
}
  }

  }

  agregarUsuario(userAdd,currentUser){
    let yaCreado=false;
    // console.log(this.chats);
    this.chats.forEach(resp=>{
      //console.log(resp.person+' ' +userAdd.key);
      if (resp.person == userAdd.key) {
        console.log("hay uno igual");
        yaCreado=true;
      }
    // console.log(resp.person);
    })
    if (yaCreado) {
      this.setCustomNAme(userAdd,currentUser);
      console.log("no se crea el chat");
      
    }else{
          // console.log("mi uid ",currentUser.uid);
    console.log(userAdd);
    this.db.database.ref('chats').push({
      titulo: {
        msg:'Chat Creado'
      },
     
    }).then(resp => {
      
      console.log(resp['path']['pieces_'][1]);
      
      this.pushChatUid2(currentUser,userAdd,resp['path']['pieces_'][1]);
    }).catch(e => {
      console.log("Hubo un error");
      console.log(e);
    });

    }

    
  }


  crearChat(userAdd,currentUser) {
    let yaCreado=false;
    // console.log(this.chats);
    this.chats.forEach(resp=>{
      //console.log(resp.person+' ' +userAdd.key);
      if (resp.person == userAdd.key) {
        console.log("hay uno igual");
        yaCreado=true;
      }
    // console.log(resp.person);
    })
    if (yaCreado) {
      console.log("no se crea el chat");
      
    }else{
          // console.log("mi uid ",currentUser.uid);
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


  pushChatUid2(currentUser,userAdd,uidChat){
    console.log("numeros");
    console.log(currentUser);
    console.log(userAdd);
    this.db.database.ref('users/' + currentUser.uid+'/uidChats').push({
      chatUid:uidChat,
      person:userAdd.key,
      customName:userAdd.name

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
    console.log("**********getChatsList()**********");
    
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
    console.log("chats unidos");
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
          // console.log("** chat crudos **");
          // console.log(chatsCrudos);
          subscription.unsubscribe();
    });
    this.chatsCrudosAux=chatsCrudos;
    console.log("Todos los chats");
    console.log(this.chatsCrudosAux);
    return chatsCrudos;
  }

}