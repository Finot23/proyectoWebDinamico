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

import { CategoriaService } from '../../services/categoria.service'; 
import { CategoriaDTO } from '../../models/categoria.model';
import { CategoriaFormComponent } from './categoria-form.component';
import { MovimientoFormComponent } from '../movimientos/movimiento-form.component';

@Component({
  selector: 'app-categoria-list',
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
  templateUrl: './categoria-list.component.html'
})
export class CategoriaListComponent implements OnInit, AfterViewInit {

  private categoriaService = inject(CategoriaService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'nombre', 'descripcion','acciones'];
  
 
  dataSource = new MatTableDataSource<CategoriaDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.cargarCategorias();
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarCategorias() {
    this.categoriaService.getAll().subscribe({
      next: (data) => {
        
        this.dataSource.data = data; 
      },
      error: (err) => console.error('Error al cargar categorias:', err)
    });
  }

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
 
  abrirMovimiento(categoria: CategoriaDTO){
    const dialogRef = this.dialog.open(MovimientoFormComponent, {
      width: '400px',
    
      data: { id: categoria.id } 
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        
        this.cargarCategorias(); 
      }
    });
  }
 
  abrirFormulario(categoriaEditar?: CategoriaDTO) {
    const dialogRef = this.dialog.open(CategoriaFormComponent, {
      width: '500px',
      data: categoriaEditar || null 
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.cargarCategorias();
      }
    });
  }
  
  eliminar(id: number) {
    if(confirm('¿Estás seguro de que deseas eliminar esta categoria?')) {
      this.categoriaService.delete(id).subscribe(() => {
        this.cargarCategorias();
      });
    }
  }
}