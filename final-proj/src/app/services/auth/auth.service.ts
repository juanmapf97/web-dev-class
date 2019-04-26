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
  login(username: string, password: string): Observable<ServiceResponse> {
    const params = new FormData();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');
    params.append('client_id', this.base.clientId);
    return this.base.post('auth/login', params);
  }

  /**
   * Refreshes the access_token of a user given their refresh_token stored
   * in local storage.
   * @param refresh - The refresh_token
   * @returns An Observable of ServiceResponse with the appropriate response.
   */
  refreshToken(refresh: string): Observable<ServiceResponse> {
    const params = new FormData();
    params.append('refresh_token', refresh);
    params.append('grant_type', 'refresh_token');
    params.append('client_id', this.base.clientId);
    return this.base.post('auth/login', params);
  }

  /**
   * Registers a user given their userData.
   * @param userData - The userData
   * @returns An Observable of ServiceResponse with the appropriate response.
   */
  registration(userData: UserData): Observable<ServiceResponse> {
    const params = new FormData();
    params.append('username', userData.username);
    params.append('password', userData.password);
    params.append('grant_type', 'password');
    params.append('client_id', this.base.clientId);
    params.append('first_name', userData.first_name);
    params.append('last_name', userData.last_name);
    return this.base.post('auth/registration', params);
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
