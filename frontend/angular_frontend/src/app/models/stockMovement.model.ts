export interface StockMovementDTO {
    id?: number;
    productoId: number;
    cantidad: number;
    tipo: 'ENTRADA' | 'SALIDA';
    fecha?: string;
    
}