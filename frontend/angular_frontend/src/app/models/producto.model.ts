export interface ProductoDTO { 
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stockActual: number;
  categoriaId: number;
}