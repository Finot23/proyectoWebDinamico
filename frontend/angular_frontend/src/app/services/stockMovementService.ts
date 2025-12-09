import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StockMovementDTO } from '../models/stockMovement.model';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class StockMovementService {
  private base = `${environment.apiUrl}/stockMovement`;
  constructor(private http: HttpClient) { }


  getAll(): Observable<StockMovementDTO[]> {
    return this.http.get<StockMovementDTO[]>(this.base);
  }
  create(emp: StockMovementDTO){
    return this.http.post<StockMovementDTO>(this.base, emp).pipe(catchError(this.handleError));
  }
  private handleError(err: any) {
      console.error(err);
      return throwError(() => err);
    }
}