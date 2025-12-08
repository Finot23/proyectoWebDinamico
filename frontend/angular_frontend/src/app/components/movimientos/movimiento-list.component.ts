import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


import { StockMovementService } from '../../services/stockMovementService'; 
import { StockMovementDTO } from '../../models/stockMovement.model';

@Component({
  selector: 'app-movimiento-list', 
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule], 
  templateUrl: './movimiento-list.component.html'
})
export class StockListComponent implements OnInit {
  
 
  private stockService = inject(StockMovementService);


  displayedColumns: string[] = ['id', 'producto_id', 'cantidad', 'tipo', 'fecha'];
  
  dataSource: StockMovementDTO[] = [];

  ngOnInit() {
    this.cargarMovimientos();
  }

  cargarMovimientos() {
   
    this.stockService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log('Movimientos cargados:', data);
      },
      error: (err) => console.error('Error al cargar movimientos:', err)
    });
  }
}