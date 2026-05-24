package grupo3.example.eventovisual.mapper;

import grupo3.example.eventovisual.dto.TareaResponseDTO;
import grupo3.example.eventovisual.model.Tarea;

public class TareaMapper {

    public static TareaResponseDTO toResponseDTO(Tarea tarea) {
        if (tarea == null) return null;
        
        Integer idUsuario = null;
        String nombreUsuario = "Sin Asignar"; 
        
        if (tarea.getUsuarioAsignado() != null) {
            idUsuario = tarea.getUsuarioAsignado().getIdUsuario();
            nombreUsuario = tarea.getUsuarioAsignado().getNombre();
        }

        return new TareaResponseDTO(
            tarea.getIdTarea(),
            tarea.getProyecto().getIdProyecto(),
            idUsuario,
            nombreUsuario,
            tarea.getTitulo(),
            tarea.getDescripcion(),
            tarea.getEstadoActual(),
            tarea.getPrioridad(),
            tarea.getFechaCreacion(),
            tarea.getFechaEntrega()
        );
    }
}
