import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StockMovementService } from '../../services/stockMovementService';

@Component({
  selector: 'app-movimiento-form',
  standalone: true,
  templateUrl: './movimiento-form.component.html',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule
  ]
})

export class MovimientoFormComponent {
  
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<MovimientoFormComponent>);
  private stockService = inject(StockMovementService); 

  form: FormGroup;
  productoId: number;

 
  public data: { id: number } = inject(MAT_DIALOG_DATA);

  constructor() {
    this.productoId = this.data.id;

    this.form = this.fb.group({
      tipo: ['ENTRADA', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const movimiento = {
      productoId: this.productoId,
      tipo: this.form.value.tipo,
      cantidad: this.form.value.cantidad
    };

    this.stockService.create(movimiento).subscribe({
      next: () => {
        
        this.dialogRef.close(true); 
      },
      error: (err) => {
        console.error(err);
        
        alert('Error al guardar el movimiento');
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}