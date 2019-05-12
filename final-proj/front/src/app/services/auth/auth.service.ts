import { Injectable } from '@angular/core';
import { BaseService } from '../base-config/base.service';
import { ServiceResponse } from 'src/app/interfaces/service-response';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Authorization service. Handles all autentication and authorization
 * calls to server.
 */
export class AuthService {
  constructor(private base: BaseService) { }

  /**
   * Calls the authentication service at /auth/login and authenticates
   * the user with the given username and password.
   * @param username - The username
   * @param password - The password
   * @returns An Observable of ServiceResponse with the appropriate response.
   */
  login(username: string, password: string): Observable<any> {
    return this.base.post('users/login', { email: username, password });
  }

  /**
   * Registers a user given their userData.
   * @param userData - The userData
   * @returns An Observable of ServiceResponse with the appropriate response.
   */
  registration(userData: UserData): Observable<any> {
    console.log(userData);
    return this.base.post('users', {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.username,
      password: userData.password
    });
  }
}

/**
 * Models the user data required to
 * register a user.
 */
export interface UserData {
  first_name: string;
  last_name?: string;
  username: string;
  password: string;
}
