import { first } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { UserI } from '../interfaces/UserI';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from 'firebase/app';
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

  async login(email:string,password:string){
    
    try {
      const result = await this._afAuth.signInWithEmailAndPassword(email,password);
      this.router.navigate(['/']);
      return result
    } catch (error) {
      console.log(error);
    }
  }

  async register(email:string,password:string){
    try {
      const result = await this._afAuth.createUserWithEmailAndPassword(email,password);
    } catch (error) {
      console.log(error);
    }
   
  }

  async logout(){
    try {
      await this._afAuth.signOut();
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
