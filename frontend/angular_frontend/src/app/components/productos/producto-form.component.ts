import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService, Categoria } from '../../services/categoria.service';
import { ProductoDTO } from '../../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, // Vital para formularios
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule
  ],
  templateUrl: './producto-form.component.html',
  //styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  
  // Referencia a la ventana para poder cerrarla
  private dialogRef = inject(MatDialogRef<ProductoFormComponent>);

  form: FormGroup;
  categorias: Categoria[] = [];
  esEdicion = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductoDTO | null) {
    // Definimos las reglas del formulario
    this.form = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0.1)]],
      stockActual: [0, [Validators.required, Validators.min(0)]],
      categoriaId: [null, [Validators.required]]
    });

    // Si viene data, es EDICIÓN. Rellenamos el formulario.
    if (data) {
      this.esEdicion = true;
      this.form.patchValue(data);
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
      // Lógica de Actualizar
      this.productoService.update(producto.id, producto).subscribe(() => {
        this.dialogRef.close(true); // Cerramos enviando "true" (éxito)
      });
    } else {
      // Lógica de Crear
      this.productoService.create(producto).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}