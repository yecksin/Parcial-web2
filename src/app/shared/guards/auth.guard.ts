import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private _afAuth:AngularFireAuth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   /* const isLogged = this.authService.isLogged();
    console.log(`Existe una sesión de usaurio? ${isLogged}`);
    if (!isLogged) {
      this.router.navigate(['login']);
      return false;
    }*/
   return  this._afAuth.authState.pipe(
      map(auth=>{
        console.log("jelou");
        
        console.log(auth);
        if(auth){
          return true;
        }else{
          this.router.navigate(['/login']);
          return false;
        }
        
      })
    )
   
  }
  
}
