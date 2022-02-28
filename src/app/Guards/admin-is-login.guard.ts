import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../Services/admin-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminIsLoginGuard implements CanActivate {
  AdminIsLogin: boolean = false;
  constructor(private AdminAuth: AdminAuthService, private Route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.AdminAuth.AdminIsLogin.subscribe((user) => {
      user ? (this.AdminIsLogin = true) : (this.AdminIsLogin = false);
    });
    if (this.AdminIsLogin) {
      return true;
    } else {
      this.Route.navigate(['/']);
      return false;
    }
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}
