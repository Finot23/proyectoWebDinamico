import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProductoDTO } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';


import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaDTO } from '../../models/categoria.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  templateUrl: './producto-form.component.html',
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
export class ProductoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  public dialogRef = inject(MatDialogRef<ProductoFormComponent>);

  public data: ProductoDTO | null = inject(MAT_DIALOG_DATA);
  
  form: FormGroup;

  categorias: CategoriaDTO[] = []; 
  esEdicion = false;

  constructor(){
    this.form = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0.1)]],
      stockActual: [0, [Validators.required, Validators.min(0)]],
      categoriaId: [null, [Validators.required]]
    });

 
    if (this.data) {
      this.esEdicion = true;
      this.form.patchValue(this.data);
    }
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {

    this.categoriaService.getAll().subscribe(cats => this.categorias = cats);
  }

  guardar() {
    if (this.form.invalid) return;

    const producto = this.form.value;

    if (this.esEdicion) {
    
      this.productoService.update(producto.id, producto).subscribe(() => {
        this.dialogRef.close(true); 
      });
    } else {
   
      this.productoService.create(producto).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}