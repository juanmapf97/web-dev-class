import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from 'src/app/interfaces/service-response';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Base service. Every service call should pass through this
 * service. Handles preparation of a call before doing it.
 */
export class BaseService {
  /**
   * The client id required for authentication against the server.
   */
  clientId = '9ozVWuqUurgGMLi9XGkxMLmn6SMiSMjBagok7ysb';

  /**
   * This handles when the user doesn't want the session to perdure.
   * Session storage erases data at the end, local storage endures it.
   */
  currentStorage: Storage = localStorage.getItem('access_token') ? localStorage :
                            sessionStorage.getItem('access_token') ? sessionStorage : null;

  constructor(private httpClient: HttpClient) { }

  /**
   * Checks if the current user is logged in.
   * @returns - true if user is logged in, false otherwise
   */
  isLoggedIn(): boolean {
    const expireDate = this.currentStorage.getItem('expires_in');
    return this.currentStorage.getItem('acces_token') ? new Date() < new Date(expireDate) : false;
  }

  /**
   * Checks if the current user is logged in by calling AuthService isLoggedIn. If this is false,
   * an Observable is created that calls the refreshToken function based on the refresh_token
   * stored in local storage and attempts to authenticate, if this is true, returns an Observable
   * of true. Otherwise, returns an Observable of false.
   * @returns - An Observable of a boolean value representing if the user is authenticated or not.
   */
  renewAccess(): Observable<boolean> {
    if (!this.isLoggedIn()) {
      if (this.currentStorage.getItem('refresh_token')) {
        return Observable.create(observer => {
          const params = new FormData();
          params.append('refresh_token', this.currentStorage.getItem('refresh_token'));
          params.append('grant_type', 'refresh_token');
          params.append('client_id', this.clientId);
          this.httpClient.post<ServiceResponse>(environment.apiEndpoint + 'auth/login', params).subscribe(
            (resp) => {
              if (resp.success) {
                const date = new Date();
                this.currentStorage.setItem('access_token', resp.data.access_token);
                this.currentStorage.setItem('expires_in', new Date(date.getTime() + resp.data.expires_in / 60 * 60000).toString());
                this.currentStorage.setItem('refresh_token', resp.data.refresh_token);
                this.currentStorage.setItem('scope', resp.data.scope);
                observer.next(true);
                observer.complete();
              } else {
                observer.next(false);
                observer.complete();
              }
            },
            () => {
              observer.next(false);
              observer.complete();
            }
          );
        });
      }
      return of(false);
    }
    return of(true);
  }

  /**
   * Base get call
   * @param path - Path to call
   * @returns An Observable of the response from the server
   */
  get(path: string): Observable<ServiceResponse> {
    return this.renewAccess().pipe(
      flatMap((authenticated) => {
        const headers = new HttpHeaders();
        if (authenticated) {
          const token = this.currentStorage.getItem('access_token');
          headers.append('Authorization', `Bearer ${token}`);
        }
        return this.httpClient.get<ServiceResponse>(environment.apiEndpoint + path, { headers });
      })
    );
  }

  /**
   * Base post call
   * @param path - Path to call
   * @param body - Object to be sent as the post body
   * @returns An Observable of the response from the server
   */
  post(path: string, body: any): Observable<ServiceResponse> {
    return this.renewAccess().pipe(
      flatMap((authenticated) => {
        const headers = new HttpHeaders();
        if (authenticated) {
          const token = this.currentStorage.getItem('access_token');
          headers.append('Authorization', `Bearer ${token}`);
        }
        return this.httpClient.post<ServiceResponse>(
          environment.apiEndpoint + path,
          body,
          { headers });
      })
    );
  }

  /**
   * Base put call
   * @param path - Path to call
   * @param body - Object to be sent as the put body
   * @returns An Observable of the response from the server
   */
  put(path: string, body: any): Observable<ServiceResponse> {
    return this.renewAccess().pipe(
      flatMap((authenticated) => {
        const headers = new HttpHeaders();
        if (authenticated) {
          const token = this.currentStorage.getItem('access_token');
          headers.append('Authorization', `Bearer ${token}`);
        }
        return this.httpClient.put<ServiceResponse>(environment.apiEndpoint + path, body, { headers });
      })
    );
  }

  /**
   * @todo
   * Base delete call
   * @param path - Path to call
   * @param body - Object to be sent inside the delete http options
   * @returns An Observable of the response from the server
   */
  delete(path: string, body: any) {
    // const httpOptions = {
    //   body,
    //   headers:
    // };
    // return this.httpClient.delete(environment.apiEndpoint + path, httpOptions);
  }
}
