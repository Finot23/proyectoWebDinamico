import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CategoriaDTO } from '../models/categoria.model';//CAMBIAR //Importa el modelo de datos
import { environment } from '../../environments/environment';//PLANTILLA //Importa las variables de entorno



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private base = `${environment.apiUrl}/categorias`;
  constructor(private http: HttpClient) { }


  getAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.base);
  }
  private handleError(err: any) {
      console.error(err);
      return throwError(() => err);
    }
}