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
    
    // hay que cambiar todo lo que tenga departamentorepository por categoria repository
    //private CategoriaRepository departamentoRepository;

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
        //Yo digo que no se debe de crear id porque la Db ya da autoincrement
        //categoria.setId(dto.getId());
        
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setNombre(dto.getNombre());
        //Error cabron, ya es noche pero se solucionaba agregando algo del @ para que me acuerde de agregarlo mañana 
        Categoria saved = categoriaRepository.save(categoria);
        return toDTO(saved);
        
        /* Hay que cambiar esta madre porque es lo de departamentos y estan mal los setter y getters en la clase categoriadto
        departamento.setNombre(dto.getNombre());
        departamento.setDireccion(dto.getDireccion());
        Categoria saved = departamentoRepository.save(departamento);
        return toDTO(saved);
*/
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
        /*
        categoria.setNombre(dto.getNombre());
        categoria.setDireccion(dto.getDireccion());
*/
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