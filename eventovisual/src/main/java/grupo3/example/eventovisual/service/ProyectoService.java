package grupo3.example.eventovisual.service;

import grupo3.example.eventovisual.dto.ProyectoRequestDTO;
import grupo3.example.eventovisual.dto.ProyectoResponseDTO;
import grupo3.example.eventovisual.mapper.ProyectoMapper;
import grupo3.example.eventovisual.model.EstadoProyecto;
import grupo3.example.eventovisual.model.Proyecto;
import grupo3.example.eventovisual.model.ProyectoMiembro;
import grupo3.example.eventovisual.model.Usuario;
import grupo3.example.eventovisual.repository.ProyectoRepository;
import grupo3.example.eventovisual.repository.ProyectoMiembroRepository;
import grupo3.example.eventovisual.repository.UsuarioRepository;

import grupo3.example.eventovisual.structures.ArbolBinarioBusqueda;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProyectoMiembroRepository proyectoMiembroRepository;

    @PostConstruct
    public void inicializarArbolDesdeBD() {
        List<Proyecto> todosLosProyectos = proyectoRepository.findAll();
        for (Proyecto p : todosLosProyectos) {
            arbolProyectos.insertar(p.getNombre()); // OPERACION: INSERCIÓN INICIAL
        }
        System.out.println("¡Árbol Binario de Búsqueda indexado con éxito con " + todosLosProyectos.size() + " proyectos!");
    }

    private final ArbolBinarioBusqueda<String> arbolProyectos = new ArbolBinarioBusqueda<>();

    // 1. Crear Proyecto e insertar en H2
    public ProyectoResponseDTO crearProyecto(ProyectoRequestDTO dto) {
        Proyecto nuevoProyecto = ProyectoMapper.toEntity(dto);
        Proyecto proyectoGuardado = proyectoRepository.save(nuevoProyecto);
        arbolProyectos.insertar(proyectoGuardado.getNombre());
        return ProyectoMapper.toResponseDTO(proyectoGuardado);
    }
    // 2. Autocompletar proyectos usando el Árbol Binario
    public List<String> sugerirProyectosPorPrefijo(String prefijo) {
        // OPERACION: BUSQUEDA POR PREFIJO EN EL ARBOL 
        return arbolProyectos.buscarPorPrefijo(prefijo);
    }
    // 3. Listar proyectos por estado
    public List<ProyectoResponseDTO> listarProyectosPorEstado(String estadoStr) {
        EstadoProyecto estado = EstadoProyecto.valueOf(estadoStr.toUpperCase());
        List<Proyecto> proyectos = proyectoRepository.findByEstadoProyecto(estado);
        
        return proyectos.stream()
                .map(ProyectoMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // 4. Obtener los proyectos de un usuario normal (nada especial asi como tu comprenderas)
    public List<ProyectoResponseDTO> obtenerProyectosPorUsuario(Integer idUsuario) {
        List<ProyectoMiembro> membresias = proyectoMiembroRepository.findByUsuario_IdUsuario(idUsuario);
        
        return membresias.stream()
                .map(miembro -> ProyectoMapper.toResponseDTO(miembro.getProyecto()))
                .collect(Collectors.toList());
    }

    // 5. Asignar un fefe de grupo al proyecto
    public boolean asignarJefeGrupo(Integer idProyecto, String emailJefe) {
        Optional<Proyecto> proyOpt = proyectoRepository.findById(idProyecto);
        Optional<Usuario> jefeOpt = usuarioRepository.findByEmail(emailJefe);

        if (proyOpt.isPresent() && jefeOpt.isPresent()) {
            Proyecto proyecto = proyOpt.get();
            Usuario jefe = jefeOpt.get();

            proyecto.setIdJefeGrupo(jefe.getIdUsuario());
            proyectoRepository.save(proyecto);

            ProyectoMiembro nuevoMiembro = new ProyectoMiembro();
            nuevoMiembro.setProyecto(proyecto);
            nuevoMiembro.setUsuario(jefe);
            nuevoMiembro.setRolProyecto("JEFE_GRUPO");
            proyectoMiembroRepository.save(nuevoMiembro);

            return true;
        }
        return false;
    }
    public void eliminarProyecto(Integer idProyecto) {
        proyectoRepository.deleteById(idProyecto);
    }
}
