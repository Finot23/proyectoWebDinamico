package mx.uam.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.uam.model.dto.StockMovementDTO;
import mx.uam.model.entity.StockMovement;
import mx.uam.model.entity.Producto;
import mx.uam.repository.StockMovementRepository;
import mx.uam.repository.ProductoRepository;

@Service
public class StockMovementService {

    @Autowired
    private StockMovementRepository stockMovementRepository;

    @Autowired
    private ProductoRepository productoRepository; // Necesario para validar al crear

    
    public List<StockMovementDTO> findAll() {
        return stockMovementRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

  
    public StockMovementDTO create(StockMovementDTO dto) {
        // Validamos que el producto exista
        Optional<Producto> productoOpt = productoRepository.findById(dto.getProductoId());
        if (!productoOpt.isPresent()) {
            return null; // O lanzar una excepción
        }

        Producto producto = productoOpt.get();

       
        StockMovement movement = new StockMovement();
        movement.setTipo(dto.getTipo());
        movement.setCantidad(dto.getCantidad());
        movement.setFecha(java.time.LocalDateTime.now()); // O la fecha que venga
        movement.setProducto(producto);

        // Lógica de negocio: Actualizar el stock del producto
        if ("ENTRADA".equalsIgnoreCase(dto.getTipo())) {
            producto.setStockActual(producto.getStockActual() + dto.getCantidad());
        } else if ("SALIDA".equalsIgnoreCase(dto.getTipo())) {
            // Validar que no quede en negativo
            if (producto.getStockActual() < dto.getCantidad()) {
                return null; // Stock insuficiente
            }
            producto.setStockActual(producto.getStockActual() - dto.getCantidad());
        }
        
        // Guardamos ambos (algunos JPA lo hacen en cascada, pero mejor asegurar)
        productoRepository.save(producto);
        StockMovement saved = stockMovementRepository.save(movement);

        return toDTO(saved);
    }

    
    private StockMovementDTO toDTO(StockMovement entity) {
        StockMovementDTO dto = new StockMovementDTO();
        dto.setId(entity.getId());
        dto.setCantidad(entity.getCantidad());
        dto.setTipo(entity.getTipo());
        dto.setFecha(entity.getFecha());
        
      
        if (entity.getProducto() != null) {
            dto.setProductoId(entity.getProducto().getId());
        }
        
        return dto;
    }
}