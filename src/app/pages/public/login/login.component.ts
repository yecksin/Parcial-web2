import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = "Hola Mundo";
  color: string = "red"

  constructor(
    private router:Router,
    private _auth:AuthService
    ) { }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  doLogin() {
  //  this._auth.login();
  }

}
