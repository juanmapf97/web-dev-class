import { Injectable } from '@angular/core';
import { BaseService } from '../base-config/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private base: BaseService) { }

  getUserSelf(): Observable<any> {
    return this.base.get('users');
  }

  patchUserSelf(body): Observable<any> {
    return this.base.patch('users', body);
  }

}
