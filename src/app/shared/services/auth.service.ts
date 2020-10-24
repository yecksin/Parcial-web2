import { first } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { UserI } from '../interfaces/UserI';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from 'firebase/app';
import * as bulmaToast from "bulma-toast";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:User

  logueado = false;

  constructor(
    public _afAuth:AngularFireAuth,
    private router: Router
  
  ) { }
 tostada(menError){
  let mensaje;

  switch(menError) { 
    case "auth/user-not-found": { 
      mensaje="Usuario no registrado"; 
       break; 
    } 
    case "auth/wrong-password": { 
      mensaje="Contraseña incorrecta"; 
       break; 
    } 
    case "auth/invalid-email": { 
      mensaje="Email invalido"; 
      break; 
   }
   case "auth/weak-password": { 
    mensaje="La contraseña debe tener mas de 6 caracteres"; 
    break; 
   } 
    default: { 
      mensaje="Error"
       break; 
    } 
 }
  console.log(mensaje);
  console.log(menError);

  bulmaToast.toast({ message: mensaje,
  position: "top-center",
  type: "is-success"
});
  
 }
  async login(email:string,password:string){
    
    try {
      const result = await this._afAuth.signInWithEmailAndPassword(email,password);
      //this.router.navigate(['/']);
      return result
    } catch (error) {
      console.log(error);
      //return this.menError=error.code;
      this.tostada(error.code);
      
      //"auth/user-not-found" 
      //"auth/wrong-password"
      //"auth/invalid-email"
    }
  }

  async register(email:string,password:string){
    try {
      const result = await this._afAuth.createUserWithEmailAndPassword(email,password);
    } catch (error) {
      console.log(error);
      //"auth/weak-password"
      this.tostada(error.code);
    }
   
  }

  async logout(){
    try {
      await this._afAuth.signOut();
      console.log("sesion cerrada");
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUSer(){
    const user = await  this._afAuth.authState.pipe(first()).toPromise();
    if (user){
      this.logueado = true;
      console.log(user);
    }else{
      this.logueado = false;
    }
    // return 
  }
  // login(user: UserI) {
  //   const passKey = "suanfanzon";
  //   if (user.password === passKey) {
  //     this.user = user;
  //     window.localStorage.setItem('user', JSON.stringify(this.user));
  //   }
  // }

  // isLogged() {
  //   const user = window.localStorage.getItem('user') || undefined;
  //   const isLogged = user ? true : false;
  //   if (isLogged) this.user = JSON.parse(user);
  //   return isLogged;
  // }

  // logout() {
  //   window.localStorage.clear();
  //   window.location.href = '';
  // }




}
