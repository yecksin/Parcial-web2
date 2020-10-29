import { first, switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { UserI } from '../interfaces/UserI';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from 'firebase/app';
import * as bulmaToast from "bulma-toast";
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User
  logueado = false;
  public user$: Observable<User>;
  constructor(
    public _afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {
   
  }

  tostada(menError) {
    let mensaje;

    switch (menError) {
      case "auth/user-not-found": {
        mensaje = "Usuario no registrado";
        break;
      }
      case "auth/wrong-password": {
        mensaje = "Contraseña incorrecta";
        break;
      }
      case "auth/invalid-email": {
        mensaje = "Email invalido";
        break;
      }
      case "auth/weak-password": {
        mensaje = "La contraseña debe tener mas de 6 caracteres";
        break;
      }

      case "auth/email-already-in-use": {
        mensaje = "Email ya registrado";
        break;
      }
      default: {
        mensaje = "Error"
        break;
      }
    }
    console.log(mensaje);
    console.log(menError);

    bulmaToast.toast({
      message: mensaje,
      position: "top-center",
      type: "is-success",
      duration: 5000
    });

  }
  async login(email: string, password: string) {

    if (isNaN(Number(email))) {
      console.log(email + ": Login con email");

      try {
        console.log("ingresando login y pass");
        const result = await this._afAuth.signInWithEmailAndPassword(email, password);
        if (result.user) {
          this.router.navigate(['/']);
        }
        // return result
      } catch (error) {
        console.log(error);
        this.tostada(error.code);

      }

    } else {
      console.log("Login con numero de telefono");
      this.getEmailToLogin(Number(email), password);

    }

  }

  async register(userForm) {
    const {
      email,
      password
    } = userForm.value;
    // console.log(userForm.value);
    try {
      const result = await this._afAuth.createUserWithEmailAndPassword(email, password);
      if (result) {
        console.log("usuario creado correctamente!!");
        console.log(result.user.uid);
        this.pushInfoUser(userForm, result.user.uid);
        this.logout();
        this.router.navigate(["/login"]);
      }
      return result;
      // this.router.navigate(["/login"]);
    } catch (error) {
      console.log(error);
      //"auth/weak-password"
      this.tostada(error.code);
    }
  }

  async logout() {
    try {
      await this._afAuth.signOut();
      console.log("sesion cerrada");
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUSer() {
    const user = await this._afAuth.authState.pipe(first()).toPromise();
    if (user) {
      this.logueado = true;
      console.log(user);
    } else {
      this.logueado = false;
    }
    // return 
  }
  metodo1() {
    let itemRef1 = this.db.object('users');
    itemRef1.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);
      console.log('Tiempo real', action.payload.val());

      // this.lugares = [];
      // for (let k in action.payload.val()) {
      //   let lugar = action.payload.val()[k];
      //   lugar.key = k;
      //   this.lugares.push(lugar);
      // }

      // console.log(this.lugares);

    });

  }
  pushInfoUser(userForm, uid) {
    const {
      email,
      username,
      name,
      lname,
      phoneCode,
      // password,
      phone,
    } = userForm.value;
    this.db.database.ref('users/' + uid).update({
      email,
      username,
      name,
      lname,
      phoneCode,
      // password,
      phone

    }).then(() => {

    });
  }


  getEmailToLogin(phone, password) {
    let itemRef1 = this.db.object('users');
    let subscription = itemRef1.snapshotChanges().subscribe((action: any) => {
      for (let k in action.payload.val()) {
        if (action.payload.val()[k].phone == phone) {
          console.log("El correo es: " + action.payload.val()[k].email);
          this.login(action.payload.val()[k].email, password);
          subscription.unsubscribe();
        }
      }
    });
  }

}