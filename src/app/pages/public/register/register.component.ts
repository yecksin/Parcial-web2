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
    favNumber: new FormControl(''),
  });

  constructor(
    private router:Router,
    private _auth:AuthService
    ) { }

  ngOnInit(): void {
  }

  async onRegister() {
    console.log("Register");
    console.log(this.userForm.value);
    const {email,password} = this.userForm.value;
   

    try {
      const user: any= await this._auth.register(email,password)
      if(user){
      //  this.router.navigate(["/login"]);
      }
    } catch (error) {
      
    }
    // e.preventDefault();

    // const user: UserI = {
    //   email: "pabhoz@usbcali.edu.co",
    //   username: "pabhoz",
    //   favNumber: 4,
    //   lname: "Bejarano",
    //   password: "suanfanzon",
    //   name: "Pablo",
    // };

    // console.log(this.userForm);

    //this.authService.login(user);

    //this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
