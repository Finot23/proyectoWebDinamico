import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatDividerModule } from '@angular/material/divider'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProductoDTO } from '../../models/producto.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatListModule, 
    MatDividerModule,
    MatProgressBarModule
  ], 
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);

  totalProductos = 0;
  totalCategorias = 0;
  totalValorInventario = 0;
  productosBajoStock: ProductoDTO[] = [];

  topProductos: any[] = [];

  ngOnInit() {
    this.cargarMetricas();
  }

  cargarMetricas() {
   
    this.productoService.getAll().subscribe(data => {
        
        this.totalProductos = data.length;

        
        this.productosBajoStock = data.filter(producto => producto.stockActual < 5);
        
        this.totalValorInventario = data.reduce((suma, p) => suma + (p.precio * p.stockActual), 0);

        const ordenados = [...data].sort((a, b) => b.stockActual - a.stockActual).slice(0, 5);
        const maxStock = ordenados.length > 0 ? ordenados[0].stockActual : 100;
        this.topProductos = ordenados.map(p => ({
            nombre: p.nombre,
            stock: p.stockActual,
            
            porcentaje: (p.stockActual / maxStock) * 100
            }));
    });

    
    this.categoriaService.getAll().subscribe(data => {
        this.totalCategorias = data.length;
    });
  }
}