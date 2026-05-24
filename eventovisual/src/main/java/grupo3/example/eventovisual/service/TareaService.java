package grupo3.example.eventovisual.service;

import grupo3.example.eventovisual.model.*;
import grupo3.example.eventovisual.repository.NotificacionRepository;
import grupo3.example.eventovisual.repository.ProyectoRepository;
import grupo3.example.eventovisual.repository.TareaRepository;
import grupo3.example.eventovisual.repository.UsuarioRepository;
import grupo3.example.eventovisual.structures.ListaDobleEnlazada;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProyectoRepository proyectoRepository;

    // Operación: Crear Tarea
    public boolean crearTarea(Integer idProyecto, String titulo, String descripcion, String prioridad, Integer idUsuarioAsignado) {
        // Validación Crítica: ¿Hay invitaciones pendientes en este proyecto?
        long pendientes = notificacionRepository.countByProyecto_IdProyectoAndEstado(idProyecto, EstadoNotificacion.PENDIENTE);
        if (pendientes > 0) {
            return false; // Bloqueado: Faltan miembros por aceptar
        }

        Tarea nuevaTarea = new Tarea();
        // Buscar el proyecto y el usuario asignado en sus repositorios y setearlos
        proyectoRepository.findById(idProyecto).ifPresent(nuevaTarea::setProyecto);
        if (idUsuarioAsignado != null) {
            usuarioRepository.findById(idUsuarioAsignado).ifPresent(nuevaTarea::setUsuarioAsignado);
        }
        
        nuevaTarea.setTitulo(titulo);
        nuevaTarea.setDescripcion(descripcion);
        nuevaTarea.setPrioridad(Prioridad.valueOf(prioridad.toUpperCase()));
        nuevaTarea.setEstadoActual(EstadoActual.TO_DO);
        
        tareaRepository.save(nuevaTarea);
        return true;
    }
    // La primera 
    public boolean avanzarEstadoTarea(Integer idTarea, Integer idUsuarioActual) {
        Optional<Tarea> tareaOpt = tareaRepository.findById(idTarea);

        if (tareaOpt.isPresent()) {

        Tarea tarea = tareaOpt.get();

        // --------ACCAAA OTRAVEZZZ!!!*/*/*/ */ */
        // IMPLEMENTACIÓN DE LISTA DOBLE ENLAZADA
        // --- ACA TIENES QUE VER CHENSEN ---//

        ListaDobleEnlazada<EstadoActual> flujoEstados =
                new ListaDobleEnlazada<>();

        flujoEstados.insertar(EstadoActual.TO_DO);
        flujoEstados.insertar(EstadoActual.EN_PROGRESO);
        flujoEstados.insertar(EstadoActual.EN_REVISION);
        flujoEstados.insertar(EstadoActual.TERMINADA);

        // RECORRIDO DE LA LISTA DOBLE

            for (int i = 0; i < flujoEstados.getTamano(); i++) {

            EstadoActual estado = flujoEstados.obtener(i);

                if (estado == tarea.getEstadoActual()) {

                    // Si ya está terminado
                    if (i == flujoEstados.getTamano() - 1) {
                    return false;
                    }

                    // Avanzar al siguiente estado
                    EstadoActual siguienteEstado =
                        flujoEstados.obtener(i + 1);

                    tarea.setEstadoActual(siguienteEstado);

                    // Asignación automática
                    if (siguienteEstado == EstadoActual.EN_PROGRESO &&
                        tarea.getUsuarioAsignado() == null) {

                        usuarioRepository.findById(idUsuarioActual)
                            .ifPresent(tarea::setUsuarioAsignado);
                    }

                tareaRepository.save(tarea);

                return true;
                }
            }
        }

    return false;
    }

    // La segunda
    public boolean rechazarTarea(Integer idTarea, String motivoRechazo, Integer idRevisorActual) {
        Optional<Tarea> tareaOpt = tareaRepository.findById(idTarea);
        Optional<Usuario> revisorOpt = usuarioRepository.findById(idRevisorActual);

        // Verifica que la tarea exista, el revisor exista, que existas tu y que la tarea esté en revisión
        if (tareaOpt.isPresent()
            && revisorOpt.isPresent()) {

            Tarea tarea = tareaOpt.get();

                    // ---SIGAN VIENDOOO ---//
            // SEGUNDA VUELTA DE LISTA DOBLE ENLAZADA //

            ListaDobleEnlazada<EstadoActual> flujoEstados =
                new ListaDobleEnlazada<>();

            flujoEstados.insertar(EstadoActual.TO_DO);
            flujoEstados.insertar(EstadoActual.EN_PROGRESO);
            flujoEstados.insertar(EstadoActual.EN_REVISION);
            flujoEstados.insertar(EstadoActual.TERMINADA);

            // RECORRIDO DE LA LISTA DOBLE

            for (int i = 0; i < flujoEstados.getTamano(); i++) {

                EstadoActual estadoActual = flujoEstados.obtener(i);

                // Verificamos el estado actual de la tarea
                if (estadoActual == tarea.getEstadoActual()) {

                    // Solo se puede rechazar si está en revisión
                    if (estadoActual != EstadoActual.EN_REVISION) {
                    return false;
                    }

                // APLICACION DE RETRO EN LA LISTA DOBLE

                EstadoActual estadoAnterior =
                        flujoEstados.obtener(i - 1);

                tarea.setEstadoActual(estadoAnterior);

                tareaRepository.save(tarea);

                // GENERAR NOTIFICACIÓN (LO QUE NUNCA HIZO ELLA CONTIGO)

                Notificacion alertaRechazo =
                        new Notificacion();

                alertaRechazo.setProyecto(
                        tarea.getProyecto()
                );

                // Destinatario
                if (tarea.getUsuarioAsignado() != null) {

                    alertaRechazo.setEmailDestinatario(
                            tarea.getUsuarioAsignado().getEmail()
                    );

                } else {
                    return false;
                }

                alertaRechazo.setTipoNotificacion(
                        TipoNotificacion.TAREA_RECHAZADA
                );

                alertaRechazo.setMensajeDescripcion(
                        motivoRechazo
                );

                alertaRechazo.setRevisor(
                        revisorOpt.get()
                );

                alertaRechazo.setEstado(
                        EstadoNotificacion.PENDIENTE
                );

                notificacionRepository.save(alertaRechazo);

                return true;
                }
            }
        }

        return false;
    }
}
