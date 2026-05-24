package grupo3.example.eventovisual.mapper;

import grupo3.example.eventovisual.dto.NotificacionResponseDTO;
import grupo3.example.eventovisual.model.Notificacion;

public class NotificacionMapper {

    public static NotificacionResponseDTO toResponseDTO(Notificacion notificacion) {
        if (notificacion == null) return null;

        String nombreRevisor = "Sistema"; 
        if (notificacion.getRevisor() != null) {
            nombreRevisor = notificacion.getRevisor().getNombre();
        }

        return new NotificacionResponseDTO(
            notificacion.getIdNotificacion(),
            notificacion.getProyecto().getIdProyecto(),
            notificacion.getProyecto().getNombre(), 
            notificacion.getEmailDestinatario(),
            notificacion.getTipoNotificacion(),
            notificacion.getMensajeDescripcion(),
            nombreRevisor, 
            notificacion.getEstado()
        );
    }
}
