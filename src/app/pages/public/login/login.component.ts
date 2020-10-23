import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = "Hola Mundo";
  color: string = "red"
  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private router:Router,
    private _auth:AuthService
    ) { }

  ngOnInit(): void {
    this._auth.getCurrentUSer();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    console.log("login");
    const {email,password} = this.userForm.value;
    this._auth.login(email,password);
  //  this._auth.login(); 
  
  }

}
