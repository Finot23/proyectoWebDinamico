import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// 1. AGREGAR ESTE IMPORT (Necesario para las líneas divisorias del HTML)
import { MatDividerModule } from '@angular/material/divider'; 

import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProductoDTO } from '../../models/producto.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 2. AGREGAR MatDividerModule AQUÍ
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule, MatDividerModule], 
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);

  totalProductos = 0;
  totalCategorias = 0;
  productosBajoStock: ProductoDTO[] = [];

  ngOnInit() {
    this.cargarMetricas();
  }

  cargarMetricas() {
    // A. Obtener PRODUCTOS (Calculamos total y bajo stock AQUÍ mismo)
    this.productoService.getAll().subscribe(data => {
        // 1. Contamos el total
        this.totalProductos = data.length;

        // 2. Filtramos los que tienen menos de 5 unidades
        // Esto evita tener que crear un endpoint especial en el backend
        this.productosBajoStock = data.filter(producto => producto.stockActual < 5);
    });

    // B. Obtener CATEGORÍAS
    this.categoriaService.getAll().subscribe(data => {
        this.totalCategorias = data.length;
    });
  }
}