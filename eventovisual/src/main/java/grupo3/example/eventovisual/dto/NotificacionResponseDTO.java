package grupo3.example.eventovisual.dto;

import grupo3.example.eventovisual.model.TipoNotificacion;
import grupo3.example.eventovisual.model.EstadoNotificacion;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificacionResponseDTO {
    private Integer idNotificacion;
    private Integer idProyecto;
    private String nombreProyecto; 
    private String emailDestinatario;
    private TipoNotificacion tipoNotificacion;
    private String mensajeDescripcion;
    private String nombreRevisor;   
    private EstadoNotificacion estado;
}
