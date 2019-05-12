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
  constructor(private httpClient: HttpClient) { }

  /**
   * Base get call
   * @param path - Path to call
   * @returns An Observable of the response from the server
   */
  get(path: string): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('jwt');
    headers = headers.append('Authorization', `Bearer ${token}`);
    return this.httpClient.get(environment.apiEndpoint + path, { headers });
  }

  /**
   * Base post call
   * @param path - Path to call
   * @param body - Object to be sent as the post body
   * @returns An Observable of the response from the server
   */
  post(path: string, body: any): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('access_token');
    headers = headers.append('Authorization', `Bearer ${token}`);
    return this.httpClient.post(
      environment.apiEndpoint + path,
      body,
      { headers });
  }

  /**
   * Base put call
   * @param path - Path to call
   * @param body - Object to be sent as the put body
   * @returns An Observable of the response from the server
   */
  put(path: string, body: any): Observable<any> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('access_token');
    headers = headers.append('Authorization', `Bearer ${token}`);
    return this.httpClient.put(environment.apiEndpoint + path, body, { headers });
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
