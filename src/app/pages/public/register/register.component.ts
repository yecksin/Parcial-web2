import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from 'src/app/shared/interfaces/UserI';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    private router:Router,
    private _auth:AuthService
    ) { }

  ngOnInit(): void {
  }

  async onRegister(userForm) {
    try {
      return await this._auth.register(userForm)
    } catch (error) {
      console.log(error);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
