package grupo3.example.eventovisual.service;

import grupo3.example.eventovisual.dto.NotificacionResponseDTO;
import grupo3.example.eventovisual.mapper.NotificacionMapper;
import grupo3.example.eventovisual.model.*;
import grupo3.example.eventovisual.repository.NotificacionRepository;
import grupo3.example.eventovisual.repository.ProyectoMiembroRepository;
import grupo3.example.eventovisual.repository.ProyectoRepository;
import grupo3.example.eventovisual.repository.UsuarioRepository;
import grupo3.example.eventovisual.structures.ListaSimpleEnlazada;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificacionService {

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProyectoMiembroRepository proyectoMiembroRepository;

    public boolean enviarInvitacion(Integer idProyecto, String emailDestinatario) {
        Optional<Proyecto> proyectoOpt = proyectoRepository.findById(idProyecto);
        
        if (proyectoOpt.isPresent()) {
            Notificacion invitacion = new Notificacion();
            invitacion.setProyecto(proyectoOpt.get());
            invitacion.setEmailDestinatario(emailDestinatario);
            invitacion.setTipoNotificacion(TipoNotificacion.INVITACION);
            invitacion.setEstado(EstadoNotificacion.PENDIENTE);
            
            notificacionRepository.save(invitacion);
            return true;
        }
        return false;
    }

    public List<NotificacionResponseDTO> obtenerPendientes(String emailUsuario) {

        List<Notificacion> pendientes = notificacionRepository
                .findByEmailDestinatarioAndEstado(emailUsuario, EstadoNotificacion.PENDIENTE);

        //  IMPLEMENTACION DE LA LISTA SIMPLE ENLAZADA
    ListaSimpleEnlazada<Notificacion> listaEnlazada =
            new ListaSimpleEnlazada<>();

    // Se insertan todas las noti
    for (Notificacion notif : pendientes) {
        listaEnlazada.insertar(notif);
    }

    //  ORDENAMIENTO 
    listaEnlazada.ordenar((n1, n2) ->
            n1.getIdNotificacion()
                    .compareTo(n2.getIdNotificacion())
    );

    //  RECORRIDO MANUAL DE LA LISTA 
    List<NotificacionResponseDTO> respuesta =
            new java.util.ArrayList<>();

    for (int i = 0; i < listaEnlazada.getTamano(); i++) {

        Notificacion notif = listaEnlazada.obtener(i);

        respuesta.add(
                NotificacionMapper.toResponseDTO(notif)
        );
    }

    return respuesta;
    }
    // PARA MOSTRAR LA LISTA
    public boolean aceptarInvitacion(Integer idNotificacion, Integer idUsuario) {
        Optional<Notificacion> notifOpt = notificacionRepository.findById(idNotificacion);
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(idUsuario);

        if (notifOpt.isPresent() && usuarioOpt.isPresent()) {
            Notificacion notificacion = notifOpt.get();
            Usuario usuario = usuarioOpt.get();

            notificacion.setEstado(EstadoNotificacion.PROCESADA);
            notificacionRepository.save(notificacion);

            ProyectoMiembro nuevoMiembro = new ProyectoMiembro();
            nuevoMiembro.setProyecto(notificacion.getProyecto());
            nuevoMiembro.setUsuario(usuario);
            nuevoMiembro.setRolProyecto("DESARROLLADOR"); 
            
            proyectoMiembroRepository.save(nuevoMiembro);
            return true;
        }
        return false;
    }
}
