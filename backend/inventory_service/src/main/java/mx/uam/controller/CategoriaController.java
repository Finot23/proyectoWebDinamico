package mx.uam.controller;

import mx.uam.model.dto.CategoriaDTO;
import mx.uam.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;

@RestController
@RequestMapping("/categorias") 
@Tag(name = "Categoría", description = "Operaciones CRUD para categorías")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    @Operation(summary = "Obtener todos los categoria", description = "Retorna una lista de todos los categorias")
    public List<CategoriaDTO> getAll() {
        return categoriaService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener categoria por ID", description = "Retorna un categoria por su ID")
    public ResponseEntity<CategoriaDTO> getById(@Parameter(description = "ID del categoria") @PathVariable Integer id) {
        CategoriaDTO dto = categoriaService.findById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @Operation(summary = "Crear categoria", description = "Crea un nuevo categoria")
    public ResponseEntity<CategoriaDTO> create(@RequestBody CategoriaDTO dto) {
        CategoriaDTO created = categoriaService.create(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar categoria", description = "Actualiza una categoria existente")
    public ResponseEntity<CategoriaDTO> update(@Parameter(description = "ID del categoria") @PathVariable Integer id, @RequestBody CategoriaDTO dto) {
        CategoriaDTO updated = categoriaService.update(id, dto);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar categoria", description = "Elimina un categoria por su ID")
    public ResponseEntity<Void> delete(@Parameter(description = "ID del categoria") @PathVariable Integer id) {
        boolean deleted = categoriaService.delete(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
