import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', Validators.email),
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.required,Validators.minLength(6)] ),
    passwordConfirm: new FormControl('',[Validators.required,Validators.minLength(6)]),
    phoneCode: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor() { }

  ngOnInit(): void {
  }

}
