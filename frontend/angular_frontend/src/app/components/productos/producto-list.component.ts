import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // <--- Importante para el modal
import { ProductoService } from '../../services/producto.service'; // <--- Revisa esta ruta (según tu estructura anterior)
import { ProductoDTO } from '../../models/producto.model';
import { ProductoFormComponent } from './producto-form.component';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  // Agregamos MatDialogModule para que funcionen los diálogos
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatDialogModule], 
  templateUrl: './producto-list.component.html',
  //styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  private productoService = inject(ProductoService);
  private dialog = inject(MatDialog); // Inyectamos el servicio de Dialog

  // --- 1. VARIABLES DE LA TABLA (Que faltaban en tu código) ---
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'stockActual', 'acciones'];
  dataSource: ProductoDTO[] = [];

  // --- 2. CARGA INICIAL ---
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

  // --- 3. LÓGICA DEL FORMULARIO (Lo nuevo) ---
  abrirFormulario(productoEditar?: ProductoDTO) {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '500px',
      // Si pasamos un producto, es EDICIÓN. Si es null, es CREACIÓN.
      data: productoEditar || null 
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        // Si el formulario devolvió 'true' (guardado exitoso), recargamos la tabla
        this.cargarProductos();
      }
    });
  }
  
  // --- 4. LÓGICA DE BORRADO ---
  eliminar(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.delete(id).subscribe(() => {
        // Recargamos la tabla después de borrar
        this.cargarProductos();
      });
    }
  }
}