package grupo3.example.eventovisual.service;

import grupo3.example.eventovisual.dto.TareaResponseDTO;
import grupo3.example.eventovisual.mapper.TareaMapper;
import grupo3.example.eventovisual.model.EstadoNotificacion;
import grupo3.example.eventovisual.model.Tarea;
import grupo3.example.eventovisual.model.TipoNotificacion;
import grupo3.example.eventovisual.repository.NotificacionRepository;
import grupo3.example.eventovisual.repository.TareaRepository;
import grupo3.example.eventovisual.structures.MatrizDatos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TableroService {

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private NotificacionRepository notificacionRepository;

    public boolean puedeCrearTareas(Integer idProyecto) {
        long invitadosPendientes = notificacionRepository.countByProyecto_IdProyectoAndEstadoAndTipoNotificacion(
            idProyecto, EstadoNotificacion.PENDIENTE, TipoNotificacion.INVITACION
        );
        return invitadosPendientes == 0; 
    }

    // Integración del TAD con la Base de Datos 
    public MatrizDatos<TareaResponseDTO> cargarTableroVisual(Integer idProyecto) {
        MatrizDatos<TareaResponseDTO> matrizSTR = new MatrizDatos<>();
        
        List<Tarea> tareas = tareaRepository.findAll(); 
        
        for (Tarea tarea : tareas) {
            if (tarea.getProyecto().getIdProyecto().equals(idProyecto)) {
                TareaResponseDTO dto = TareaMapper.toResponseDTO(tarea);
                
                int fila = matrizSTR.mapearEstadoAFila(tarea.getEstadoActual().name());
                
                matrizSTR.registrarEnTablero(fila, dto);
            }
        }
        
        return matrizSTR;
    }
}
