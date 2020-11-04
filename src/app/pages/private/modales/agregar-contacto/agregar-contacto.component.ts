import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-agregar-contacto',
  templateUrl: './agregar-contacto.component.html',
  styleUrls: ['./agregar-contacto.component.scss']
})
export class AgregarContactoComponent implements OnInit {
  textoBuscar='';
  constructor(
    public _usersList: UsuariosService,
    public _auth:AuthService
  ) { }

  ngOnInit(): void {
    this._usersList.getListUsers(this._auth.currentUid);
  }
  
  

}
