package mx.uam.model.dto;
import io.swagger.v3.oas.annotations.media.Schema;

public class CategoriaDTO {
   
@Schema(description = "ID autogenerado", accessMode = Schema.AccessMode.READ_ONLY)
   private Integer id;
@Schema(description = "Breve descripcion de la categoria", example = "Gadgets tecnologicos")
   private String descripcion;
@Schema(description = "Nombre de la categoria", example = "Juegos de Mesa")
   private String nombre;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
   
}