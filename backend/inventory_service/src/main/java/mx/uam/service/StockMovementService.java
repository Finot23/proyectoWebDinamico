/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mx.uam.service;

import mx.uam.model.dto.StockMovementDTO;
import mx.uam.model.entity.Producto;
import mx.uam.model.entity.StockMovement;
import mx.uam.repository.ProductoRepository;
import mx.uam.repository.StockMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class StockMovementService {

    @Autowired
    private StockMovementRepository stockMovementRepository;
    
    @Autowired
    private ProductoRepository productoRepository; // Necesario para actualizar el stock

    public StockMovementDTO create(StockMovementDTO dto) {
        // 1. Validar que el producto existe
        if (dto.getProductoId() == null) return null;
        Optional<Producto> productoOpt = productoRepository.findById(dto.getProductoId());
        
        if (!productoOpt.isPresent()) {
            return null; // O lanzar una excepción personalizada
        }

        Producto product = productoOpt.get();

        // 2. Actualizar el stock del producto
        if ("ENTRADA".equals(dto.getTipo())) {
            product.setStockActual(product.getStockActual() + dto.getCantidad());
        } else {
            // Validación simple para no tener stock negativo
            if (product.getStockActual() < dto.getCantidad()) {
                return null; // Error: No hay suficiente stock
            }
            product.setStockActual(product.getStockActual() - dto.getCantidad());
        }
        productoRepository.save(product); // Guardamos el producto actualizado

        // 3. Guardar el movimiento
        StockMovement movement = new StockMovement();
        movement.setTipo(dto.getTipo());
        movement.setCantidad(dto.getCantidad());
        movement.setFecha(LocalDateTime.now());
        movement.setProducto(product);

        StockMovement saved = stockMovementRepository.save(movement);
        
        return toDTO(saved);
    }

    // Método helper para convertir Movimiento a DTO
    private StockMovementDTO toDTO(StockMovement entity) {
        StockMovementDTO dto = new StockMovementDTO();
        dto.setId(entity.getId());
        dto.setProductoId(entity.getProducto().getId());
        dto.setTipo(entity.getTipo());
        dto.setCantidad(entity.getCantidad());
        // dto.setFecha(entity.getFecha()); // Si tienes este campo en el DTO
        return dto;
    }
}