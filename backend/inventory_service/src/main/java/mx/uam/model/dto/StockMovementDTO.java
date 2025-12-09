/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mx.uam.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

/**
 *
 * @author antoniosalinas
 */
public class StockMovementDTO {
    @Schema(description = "ID autogenerado", accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;
   @Schema(description = "Tipo entrada/salida", example = "Salida")
	private String tipo;
   @Schema(description = "Cantidad de stock", example = "5")
	private Integer cantidad;
    @Schema(description = "Fecha auto generada", accessMode = Schema.AccessMode.READ_ONLY)
	private LocalDateTime fecha;
    @Schema(description = "ID Producto", example = "2")
        private Integer productoId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Integer getProductoId() {
        return productoId;
    }

    public void setProductoId(Integer productoId) {
        this.productoId = productoId;
    }
    
        
    
    
    
}
