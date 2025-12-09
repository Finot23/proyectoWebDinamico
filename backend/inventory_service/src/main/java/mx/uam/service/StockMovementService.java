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
    private ProductoRepository productoRepository;

    
    public List<StockMovementDTO> findAll() {
        return stockMovementRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

  
    public StockMovementDTO create(StockMovementDTO dto) {
       
        if (dto.getProductoId() == null) {
        System.out.println("❌ ERROR CRÍTICO: El productoId es NULL. Revisa el Frontend.");
        return null; 
    }
        Optional<Producto> productoOpt = productoRepository.findById(dto.getProductoId());
        
if (!productoOpt.isPresent()) {
        return null;
    }

        Producto producto = productoOpt.get();

       
        StockMovement movement = new StockMovement();
        movement.setTipo(dto.getTipo());
        movement.setCantidad(dto.getCantidad());
        movement.setFecha(java.time.LocalDateTime.now()); 
        movement.setProducto(producto);

       
        if ("ENTRADA".equalsIgnoreCase(dto.getTipo())) {
            producto.setStockActual(producto.getStockActual() + dto.getCantidad());
        } else if ("SALIDA".equalsIgnoreCase(dto.getTipo())) {
          
            if (producto.getStockActual() < dto.getCantidad()) {
                return null; 
            }
            producto.setStockActual(producto.getStockActual() - dto.getCantidad());
        }
        
       
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