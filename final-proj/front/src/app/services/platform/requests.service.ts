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

  postRequest(time: string, boxes: any): Observable<any> {
    let body = {
      "time": "12-11-2020",
      "latitude": 21.21231,
      "longitude": 122.2234,
      "boxes": boxes
     }
    return this.base.post('requests', body);
  }
}
