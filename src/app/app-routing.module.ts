import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/private/home/home.component';
import { HomeModule } from './pages/private/home/home.module';
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { PublicGuard } from './shared/guards/public.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [PublicGuard]  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule, HomeModule]
})
export class AppRoutingModule { }
