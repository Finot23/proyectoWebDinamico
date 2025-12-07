package mx.uam.model.dto;

public class CategoriaDTO {
    /* hay que cambiar esto porque no coincide en el post.
    private Integer id;
    private String nombre;
    private String direccion;
*/

   private Integer id;
   private String descripcion;
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