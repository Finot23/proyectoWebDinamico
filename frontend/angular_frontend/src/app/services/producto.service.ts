//Usare este como ejemplo para generar plantilla de servicio
import { Injectable } from '@angular/core';//PLANTILLA //Esta madre siempre va
import { HttpClient } from '@angular/common/http';//PLANTILLA //Para hacer peticiones HTTP
import { Observable, throwError } from 'rxjs';//PLANTILLA //ni idea para que sirve pero siempre va RECORDAR INVETIGAR
import { catchError } from 'rxjs/operators';

import { ProductoDTO } from '../models/producto.model';//CAMBIAR //Importa el modelo de datos
import { environment } from '../../environments/environment';//PLANTILLA //Importa las variables de entorno

@Injectable({ //PLANTILLA
  providedIn: 'root' //PLANTILLA
})//PLANTILLA
export class ProductoService {//CAMBIAR //Nombre del servicio
  private base = `${environment.apiUrl}/productos`;//SOLO CAMBIAR EL SLASH AL FINAL lo demas es PLANTILLA
  constructor(private http: HttpClient) { }//PLANTILLA //Constructor con inyeccion de dependencias

  getAll(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(this.base);
  }
  getById(id: number) {
    return this.http.get<ProductoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
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
    /* DE MOMENTO ESTA MADRE NO LA USARE PERO LA DEJO AQUI POR SI ACASO
    return this.http.get<EmpleadoDTO[]>(this.base).pipe(catchError(this.handleError));
  }
  getById(id: number) {
    return this.http.get<EmpleadoDTO>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  create(emp: EmpleadoDTO) {
    return this.http.post<EmpleadoDTO>(this.base, emp).pipe(catchError(this.handleError));
  }
  update(id: number, emp: EmpleadoDTO) {
    return this.http.put<EmpleadoDTO>(`${this.base}/${id}`, emp).pipe(catchError(this.handleError));
  }
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }
  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}
*/
