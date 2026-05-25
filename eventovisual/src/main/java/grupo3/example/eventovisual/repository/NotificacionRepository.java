package grupo3.example.eventovisual.repository;

import grupo3.example.eventovisual.model.Notificacion;
import grupo3.example.eventovisual.model.TipoNotificacion;
import grupo3.example.eventovisual.model.EstadoNotificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Integer> {
    // Cuenta notificaciones pendientes para bloquear el tablero
    long countByProyecto_IdProyectoAndEstadoAndTipoNotificacion(Integer idProyecto, EstadoNotificacion estado, TipoNotificacion tipo);
    
    // Trae el buzón del usuario
    List<Notificacion> findByEmailDestinatarioAndEstado(String email, EstadoNotificacion estado);
}
