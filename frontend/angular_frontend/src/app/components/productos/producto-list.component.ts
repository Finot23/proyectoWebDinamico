import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ProductoService } from '../../services/producto.service'; 
import { ProductoDTO } from '../../models/producto.model';
import { ProductoFormComponent } from './producto-form.component';
import { MovimientoFormComponent } from '../movimientos/movimiento-form.component';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatButtonModule,   
    MatDialogModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule
  ], 
  templateUrl: './producto-list.component.html'
})
export class ProductoListComponent implements OnInit, AfterViewInit {

  private productoService = inject(ProductoService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'stockActual','descripcion','categoria','acciones'];
  
 
  dataSource = new MatTableDataSource<ProductoDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.cargarProductos();
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarProductos() {
    this.productoService.getAll().subscribe({
      next: (data) => {
        
        this.dataSource.data = data; 
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
 
  abrirMovimiento(producto: ProductoDTO){
    const dialogRef = this.dialog.open(MovimientoFormComponent, {
      width: '400px',
    
      data: { id: producto.id } 
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        
        this.cargarProductos(); 
      }
    });
  }
 
  abrirFormulario(productoEditar?: ProductoDTO) {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '500px',
      data: productoEditar || null 
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.cargarProductos();
      }
    });
  }
  
  eliminar(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.delete(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }
}