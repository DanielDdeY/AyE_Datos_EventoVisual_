package grupo3.example.eventovisual.service;

import grupo3.example.eventovisual.model.*;
import grupo3.example.eventovisual.repository.NotificacionRepository;
import grupo3.example.eventovisual.repository.ProyectoRepository;
import grupo3.example.eventovisual.repository.TareaRepository;
import grupo3.example.eventovisual.repository.UsuarioRepository;
import grupo3.example.eventovisual.structures.ListaDobleEnlazada;
import grupo3.example.eventovisual.structures.Pila;

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

    // Para retroceder una accion
    private static class MovimientoHistorial {
        Integer idTarea;
        EstadoActual estadoAnterior;

        MovimientoHistorial(Integer idTarea, EstadoActual estadoAnterior) {
            this.idTarea = idTarea;
            this.estadoAnterior = estadoAnterior;
        }
    }
    private final Pila<MovimientoHistorial> pilaDeshacer = new Pila<>();

    // Operación: Crear Tarea
    public boolean crearTarea(Integer idProyecto, String titulo, String descripcion, String prioridad, Integer idUsuarioAsignado) {
        // Validación Crítica: ¿Hay invitaciones pendientes en este proyecto?
        long pendientes = notificacionRepository.countByProyecto_IdProyectoAndEstadoAndTipoNotificacion(
            idProyecto, EstadoNotificacion.PENDIENTE, TipoNotificacion.INVITACION);
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
        EstadoActual estadoViejo = tarea.getEstadoActual();

        // IMPLEMENTACIÓN DE LISTA DOBLE ENLAZADA //

        ListaDobleEnlazada<EstadoActual> flujoEstados = new ListaDobleEnlazada<>();

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
                //AQUI SON LAS PILAS SIEGOS
                pilaDeshacer.apilar(new MovimientoHistorial(tarea.getIdTarea(), estadoViejo));
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
            EstadoActual estadoViejo = tarea.getEstadoActual();

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

                // APLICACION DE RETROCEDER EN LA LISTA DOBLE

                EstadoActual estadoAnterior = flujoEstados.obtener(i - 1);
                tarea.setEstadoActual(estadoAnterior);
                tareaRepository.save(tarea);

                // GENERAR NOTIFICACIÓN
                Notificacion alertaRechazo = new Notificacion();

                alertaRechazo.setProyecto(tarea.getProyecto());

                // Destinatario
                if (tarea.getUsuarioAsignado() != null) {

                    alertaRechazo.setEmailDestinatario(
                            tarea.getUsuarioAsignado().getEmail()
                    );

                } else {
                    alertaRechazo.setEmailDestinatario("sin-asignar@taskflow.com");
                }

                alertaRechazo.setTipoNotificacion(TipoNotificacion.TAREA_RECHAZADA);
                alertaRechazo.setMensajeDescripcion(motivoRechazo);
                alertaRechazo.setRevisor(revisorOpt.get());
                alertaRechazo.setEstado(EstadoNotificacion.PENDIENTE);

                
                // ACA OTRA VEZ PILA
                pilaDeshacer.apilar(new MovimientoHistorial(tarea.getIdTarea(), estadoViejo));
                return true;
                }
            }
        }

        return false;
    }
    public boolean eliminarTarea(Integer idTarea) {
        if (tareaRepository.existsById(idTarea)) {
            tareaRepository.deleteById(idTarea);
            return true;
        }
        return false;
    }

    // OPERACION DESHACER
    public boolean deshacerUltimoMovimiento() {
        if (pilaDeshacer.estaVacia()) {
            return false; 
        }

        MovimientoHistorial ultimoMovimiento = pilaDeshacer.desapilar();
        Optional<Tarea> tareaOpt = tareaRepository.findById(ultimoMovimiento.idTarea);
        
        if (tareaOpt.isPresent()) {
            Tarea tarea = tareaOpt.get();
            
            tarea.setEstadoActual(ultimoMovimiento.estadoAnterior);
            // se librera el usuario
            if (ultimoMovimiento.estadoAnterior == EstadoActual.TO_DO) {
                tarea.setUsuarioAsignado(null);
            }
            
            tareaRepository.save(tarea);
            return true;
        }
        return deshacerUltimoMovimiento(); 
    }

    public String obtenerUltimoMovimiento() {
        if (pilaDeshacer.estaVacia()) {
            return "No hay movimientos recientes en el historial.";
        }
        
        // Mira la cima de la pila
        MovimientoHistorial ultimo = pilaDeshacer.cima();
        
        Optional<Tarea> tareaOpt = tareaRepository.findById(ultimo.idTarea);
        if (tareaOpt.isPresent()) {
            return "La última tarea modificada fue ID " + ultimo.idTarea + 
                   " ('" + tareaOpt.get().getTitulo() + "') cuyo estado previo era " + ultimo.estadoAnterior.name();
        }
        
        return "Último movimiento registrado en la tarea ID: " + ultimo.idTarea;
    }
}
