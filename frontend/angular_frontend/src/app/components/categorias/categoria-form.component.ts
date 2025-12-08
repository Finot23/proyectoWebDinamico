import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaDTO } from '../../models/categoria.model';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent {
  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private dialogRef = inject(MatDialogRef<CategoriaFormComponent>);

  public data: CategoriaDTO | null = inject(MAT_DIALOG_DATA)
  form: FormGroup;
  esEdicion = false;

  constructor(){
    this.form = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['']
    });

    if (this.data) {
      this.esEdicion = true;
      this.form.patchValue(this.data);
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const categoria = this.form.value;

    if (this.esEdicion) {
      this.categoriaService.update(categoria.id, categoria).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.categoriaService.create(categoria).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}