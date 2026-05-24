package grupo3.example.eventovisual.dto;

import grupo3.example.eventovisual.model.EstadoActual;
import grupo3.example.eventovisual.model.Prioridad;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TareaResponseDTO {
    private Integer idTarea;
    private Integer idProyecto;
    private Integer idUsuarioAsignado;
    private String nombreUsuarioAsignado; 
    private String titulo;
    private String descripcion;
    private EstadoActual estadoActual;
    private Prioridad prioridad;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaEntrega;
}
