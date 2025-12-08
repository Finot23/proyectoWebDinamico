import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { EmpleadoListComponent } from './components/empleados/empleado-list.component';
//import { EmpleadoFormComponent } from './components/empleados/empleado-form.component';
//import { DepartamentoListComponent } from './components/departamentos/departamento-list.component';
//import { DepartamentoFormComponent } from './components/departamentos/departamento-form.component';
import { ViewDialogComponent } from './shared/view-dialog.component';
import { ProductoListComponent } from './components/productos/producto-list.component';
import { ProductoFormComponent } from './components/productos/producto-form.component';
//import { MovimientoFormComponent } from './components/movimientos/movimiento-form.component';


@NgModule({
  //bootstrap: [AppComponent],
  declarations: [
    //AppComponent,
    ViewDialogComponent,
    //MovimientoFormComponent,
    //ProductoFormComponent,
    //ProductoListComponent,
    
  ],
  imports: [
    //AppComponent,
    //ProductoListComponent,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [],

})
export class AppModule { }
