package grupo3.example.eventovisual.mapper;

import grupo3.example.eventovisual.dto.ProyectoRequestDTO;
import grupo3.example.eventovisual.dto.ProyectoResponseDTO;
import grupo3.example.eventovisual.model.Proyecto;

public class ProyectoMapper {

    public static Proyecto toEntity(ProyectoRequestDTO dto) {
        if (dto == null) return null;
        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(dto.getNombre());
        proyecto.setDescripcion(dto.getDescripcion());
        return proyecto;
    }

    public static ProyectoResponseDTO toResponseDTO(Proyecto proyecto) {
        if (proyecto == null) return null;
        return new ProyectoResponseDTO(
            proyecto.getIdProyecto(),
            proyecto.getNombre(),
            proyecto.getDescripcion(),
            proyecto.getFechaInicio(),
            proyecto.getIdJefeGrupo(),
            proyecto.getEstadoProyecto()
        );
    }
}