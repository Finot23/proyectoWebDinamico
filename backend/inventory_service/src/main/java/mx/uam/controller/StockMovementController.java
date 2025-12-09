/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mx.uam.controller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import mx.uam.model.dto.StockMovementDTO;
import mx.uam.service.StockMovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stockMovement")
@Tag(name = "Movimientos de Stock", description = "Registrar entradas y salidas de almacén")
public class StockMovementController {

    @Autowired
    private StockMovementService stockMovementService;
    
    @GetMapping
    @Operation(summary="Lista todos los movimientos", description = "Obtiene el historial de movimientos")
    public List<StockMovementDTO> findAll() {
        return stockMovementService.findAll();
    }
    
    @PostMapping
    @Operation(summary = "Registrar Movimiento", description = "Crea un movimiento y actualiza el stock del producto automáticamente")
    public ResponseEntity<StockMovementDTO> create(@RequestBody StockMovementDTO dto) {
        StockMovementDTO created = stockMovementService.create(dto);
        if (created == null) {
           
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(created);
    }
}