import { Injectable } from '@angular/core';
import { BaseService } from '../base-config/base.service';
import { Observable } from 'rxjs';

export interface Box {
  size: number;
  description: string;
}

export interface Request {
  giver_first_name: string;
  giver_last_name: string;
  giver_phone: string;
  pickup_time: string;
  boxes: Box[];
  street: string;
  street_info: string;
  colony: string;
  state: string;
  postal_code: string;
  comments: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private base: BaseService) { }

  getRequests(): Observable<any> {
    return this.base.get('requests');
  }

  getRequest(id): Observable<any> {
    return this.base.get(`requests/${id}`);
  }

  postRequest(body: Request): Observable<any> {
    return this.base.post('requests', body);
  }

  updateRequest(id, body): Observable<any> {
    return this.base.patch(`requests/${id}`, body);
  }
}
