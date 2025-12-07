
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { EmpleadoListComponent } from './components/empleados/empleado-list.component';
//import { DepartamentoListComponent } from './components/departamentos/departamento-list.component';
import { ProductoListComponent } from './components/productos/producto-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  //{ path: 'empleados', component: EmpleadoListComponent },
  //{ path: 'departamentos', component: DepartamentoListComponent },
  { path: 'productos', component: ProductoListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }