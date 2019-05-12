import { Injectable } from '@angular/core';
import { BaseService } from '../base-config/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private base: BaseService) { }

  getRequests(): Observable<any> {
    return this.base.get('requests');
  }
}
