package mx.uam.service;

import mx.uam.model.dto.CategoriaDTO;
import mx.uam.model.entity.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import mx.uam.repository.CategoriaRepository;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;
    

    public List<CategoriaDTO> findAll() {
        return categoriaRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public CategoriaDTO findById(Integer id) {
        if (id == null) {
            return null;
        }
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        return categoria.map(this::toDTO).orElse(null);
    }

    public CategoriaDTO create(CategoriaDTO dto) {
        Categoria categoria = new Categoria();
        
        
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setNombre(dto.getNombre());
        
        Categoria saved = categoriaRepository.save(categoria);
        return toDTO(saved);
        
    }

    public CategoriaDTO update(Integer id, CategoriaDTO dto) {
        if (id == null || dto == null) {
            return null;
        }
        Optional<Categoria> categoriaOpt = categoriaRepository.findById(id);
        if (!categoriaOpt.isPresent()) {
            return null;
        }
        Categoria categoria = categoriaOpt.get();
        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());
        
        Categoria updated = categoriaRepository.save(categoria);
        return toDTO(updated);
    }

    public boolean delete(Integer id) {
        if (id == null || !categoriaRepository.existsById(id)) {
            return false;
        }
        categoriaRepository.deleteById(id);
        return true;
    }

    private CategoriaDTO toDTO(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        dto.setDescripcion(categoria.getDescripcion());
        return dto;
    }
}