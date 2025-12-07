package mx.uam.controller;

import mx.uam.model.dto.ProductoDTO;
import mx.uam.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;

@RestController
@RequestMapping("/productos") // <--- ¡Vital! Antes decía /empleados
@Tag(name = "Producto", description = "Operaciones CRUD para productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    @GetMapping
    @Operation(summary = "Obtener todos los productos", description = "Retorna una lista de todos los productos")
    public List<ProductoDTO> getAll() {
        return productoService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID", description = "Retorna un producto por su ID")
    public ResponseEntity<ProductoDTO> getById(@Parameter(description = "ID del producto") @PathVariable Integer id) {
        ProductoDTO dto = productoService.findById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @Operation(summary = "Crear producto", description = "Crea un nuevo producto")
    public ResponseEntity<ProductoDTO> create(@RequestBody ProductoDTO dto) {
        ProductoDTO created = productoService.create(dto);
        if (created == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto", description = "Actualiza un producto existente")
    public ResponseEntity<ProductoDTO> update(@Parameter(description = "ID del producto") @PathVariable Integer id, @RequestBody ProductoDTO dto) {
        ProductoDTO updated = productoService.update(id, dto);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto", description = "Elimina un producto por su ID")
    public ResponseEntity<Void> delete(@Parameter(description = "ID del producto") @PathVariable Integer id) {
        boolean deleted = productoService.delete(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
