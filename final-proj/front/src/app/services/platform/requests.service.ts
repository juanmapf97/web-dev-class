import { Injectable } from '@angular/core';
import { BaseService } from '../base-config/base.service';
import { Observable } from 'rxjs';
import { Box } from '../../components/info-form/info-form.component'

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private base: BaseService) { }

  getRequests(): Observable<any> {
    return this.base.get('requests');
  }

  postRequest(time: string, boxes: Box): Observable<any> {
    let body = {
      "time": time,
      "latitude": 21.21231,
      "longitude": 122.2234,
      "boxes": boxes
     }
    return this.base.post('requests', body);
  }
}
