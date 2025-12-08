package mx.uam.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import mx.uam.model.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    List<Producto> findByStockActualLessThan(Integer limite);
}
