import { Injectable } from '@angular/core';
import { BaseService } from '../base-config/base.service';
import { ServiceResponse } from 'src/app/interfaces/service-response';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Boxes service. Handles all information related to the packages
 */
export class BoxesService {

  constructor(private base: BaseService) { }

  get_boxes(id: string): Observable<ServiceResponse> {
    return this.base.get(`boxes/${id}`);
  }
}
