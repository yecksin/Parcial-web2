import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { InboxChatComponent } from './components/inbox-chat/inbox-chat.component';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { AgregarContactoComponent } from '../modales/agregar-contacto/agregar-contacto.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { FiltroBuscarUsuarioPipe } from '../../../shared/pipes/filtro-buscar-usuario.pipe';
import {MatButtonModule} from '@angular/material/button';
import { EditarPerfilComponent } from '../modales/editar-perfil/editar-perfil.component';
import { FiltroUsuarioChatPipe } from '../../../shared/pipes/filtro-usuario-chat.pipe';
import { FiltroBuscarMensajesPipe } from '../../../shared/pipes/filtro-buscar-mensajes.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    InboxChatComponent,
    ChatAreaComponent,
    ChatMessageComponent,
    AgregarContactoComponent,
    FiltroBuscarUsuarioPipe,
    EditarPerfilComponent,
    FiltroUsuarioChatPipe,
    FiltroBuscarMensajesPipe,
  ],
  entryComponents:[AgregarContactoComponent,EditarPerfilComponent],
  imports: [
    CommonModule, FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
    

  ],
})
export class HomeModule { }


