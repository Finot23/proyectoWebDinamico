/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mx.uam.repository;

import mx.uam.model.entity.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author antoniosalinas
 */
public interface StockMovementRepository extends JpaRepository<StockMovement, Integer> {
    
}
