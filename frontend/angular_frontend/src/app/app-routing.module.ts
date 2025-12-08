
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListComponent } from './components/productos/producto-list.component';
import { StockListComponent } from './components/movimientos/movimiento-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriaListComponent } from './components/categorias/categoria-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  //{ path: 'empleados', component: EmpleadoListComponent },
  //{ path: 'departamentos', component: DepartamentoListComponent },
  { path: 'productos', component: ProductoListComponent },
  { path: 'stockMovement', component: StockListComponent },
  { path: 'categorias', component: CategoriaListComponent },
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }