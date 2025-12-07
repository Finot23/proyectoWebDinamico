export interface ProductoDTO { //ni idea porque es dto pero sirve y mi plantilla dice que asi es. ACORDARME DE INVESTIGAR
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stockActual: number;
  categoriaId: number;
}