package mx.uam.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class ProductoDTO {
    @Schema(description = "ID autogenerado", accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;
    @Schema(description = "Nombre del producto", example = "Takis Fuego")
    private String nombre;
    @Schema(description = "Breve descripcion del Producto", example = "papas de chicharron")
    private String descripcion;
    @Schema(description = "Precio del producto", example = "100")
    private double precio;
    @Schema(description = "Stock del producto", example = "10")
    private Integer stockActual;
    @Schema(description = "ID de la Categoria", example = "2")
    private Integer categoriaId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public Integer getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Integer categoriaId) {
        this.categoriaId = categoriaId;
    }

    
}