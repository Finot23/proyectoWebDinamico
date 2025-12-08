import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { ProductoService } from '../../services/producto.service'; 
import { ProductoDTO } from '../../models/producto.model';
import { ProductoFormComponent } from './producto-form.component';
import { MovimientoFormComponent } from '../movimientos/movimiento-form.component';
import { StockMovementDTO } from '../../models/stockMovement.model';


@Component({
  selector: 'app-producto-list',
  standalone: true,
 
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatDialogModule], 
  templateUrl: './producto-list.component.html'
  //styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  private productoService = inject(ProductoService);
  private dialog = inject(MatDialog);

 
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'stockActual','descripcion','categoria','acciones'];
  dataSource: ProductoDTO[] = [];


  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }
  abrirMovimiento(idProducto: StockMovementDTO){
    const dialogRef = this.dialog.open(MovimientoFormComponent, {
      width: '400px',
      data: { id: idProducto }
      
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        
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