import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from '../services/base-config/base.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Controls access to pages that require the user to be authenticated. If the AuthGuard
 * is set for a page, the user must be logged in in order to continue.
 */
export class AuthGuard implements CanActivate {

  constructor(private base: BaseService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.base.isLoggedIn()) {
      this.router.navigate(['']);
      return false;
    }
  }
}
