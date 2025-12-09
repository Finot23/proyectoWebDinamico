
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProductoDTO } from '../models/producto.model';
import { environment } from '../../environments/environment';

@Injectable({ 
  providedIn: 'root' 
})
export class ProductoService {
  private base = `${environment.apiUrl}/productos`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(this.base);
  }
  getById(id: number) {
    return this.http.get<ProductoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  getBajoStock(): Observable<ProductoDTO[]> {
  return this.http.get<ProductoDTO[]>(`${this.base}/bajo-stock`);
}
  create(emp: ProductoDTO) {
    return this.http.post<ProductoDTO>(this.base, emp).pipe(catchError(this.handleError));
  }
  update(id: number, emp: ProductoDTO) {
    return this.http.put<ProductoDTO>(`${this.base}/${id}`, emp).pipe(catchError(this.handleError));
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}
  
