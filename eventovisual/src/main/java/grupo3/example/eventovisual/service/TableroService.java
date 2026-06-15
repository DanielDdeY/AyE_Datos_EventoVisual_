package grupo3.example.eventovisual.service;

import grupo3.example.eventovisual.dto.TareaResponseDTO;
import grupo3.example.eventovisual.mapper.TareaMapper;
import grupo3.example.eventovisual.model.EstadoActual;
import grupo3.example.eventovisual.model.EstadoNotificacion;
import grupo3.example.eventovisual.model.Tarea;
import grupo3.example.eventovisual.model.TipoNotificacion;
import grupo3.example.eventovisual.repository.NotificacionRepository;
import grupo3.example.eventovisual.repository.TareaRepository;
import grupo3.example.eventovisual.structures.MatrizDatos;
import grupo3.example.eventovisual.structures.Cola;
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

    // Uso de colas con la Base de Datos 
    public MatrizDatos<TareaResponseDTO> cargarTableroVisual(Integer idProyecto) {
        MatrizDatos<TareaResponseDTO> matrizSTR = new MatrizDatos<>();
        Cola<TareaResponseDTO> colaBacklog = new Cola<>(); 
        
        List<Tarea> tareas = tareaRepository.findAll(); 
        
        for (Tarea tarea : tareas) {
            if (tarea.getProyecto().getIdProyecto().equals(idProyecto)) {
                TareaResponseDTO dto = TareaMapper.toResponseDTO(tarea);
                
                if (tarea.getEstadoActual() == EstadoActual.TO_DO) {
                    colaBacklog.encolar(dto); // OPERACION: ENCOLAR
                } else {
                    int fila = matrizSTR.mapearEstadoAFila(tarea.getEstadoActual().name());
                    matrizSTR.registrarEnTablero(fila, dto);
                }
            }
        }
        
        int filaToDo = matrizSTR.mapearEstadoAFila(EstadoActual.TO_DO.name());
        
        while (!colaBacklog.estaVacia()) {
            TareaResponseDTO dto = colaBacklog.desencolar(); // OPERACION: DESENCOLAR
            matrizSTR.registrarEnTablero(filaToDo, dto);
        }
        
        return matrizSTR;
    }
}
