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
    email: new FormControl('', Validators.email),
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.required,Validators.minLength(6)] ),
    passwordConfirm: new FormControl('',[Validators.required,Validators.minLength(6)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, this.pwdMatchValidator);

  constructor(
    private router: Router,
    private _auth: AuthService
  ) { }
  pwdMatchValidator(frm: FormGroup) {
    //console.log(frm.get('password').value + " " + frm.get('passwordConfirm').value);
    if(frm.get('password').value == frm.get('passwordConfirm').value){
      // console.log("Son IGuales");
      frm.controls['passwordConfirm'].setErrors(null);
    }else{
      // console.log("Son diferentes");
      // frm.get('passwordConfirm').setErrors( {MatchPassword: true} )
      frm.controls['passwordConfirm'].setErrors({'incorrect': true});
    }
   
    return frm.get('password').value === frm.get('passwordConfirm').value ? null : { 'mismatch': true };
  }

  // pwdMatchValidator2(frm: FormGroup) {
  //   console.log(frm.get('password').value + " " + frm.get('passwordConfirm').value);
  //   frm.get('passwordConfirm').setErrors( {MatchPassword: false} )
  //   return frm.get('password').value === frm.get('passwordConfirm').value ? null : true;
  // }
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