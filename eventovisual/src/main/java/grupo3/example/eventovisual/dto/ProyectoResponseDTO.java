package grupo3.example.eventovisual.dto;

import grupo3.example.eventovisual.model.EstadoProyecto;
import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProyectoResponseDTO {
    private Integer idProyecto;
    private String nombre;
    private String descripcion;
    private LocalDate fechaInicio;
    private Integer idJefeGrupo;
    private EstadoProyecto estadoProyecto;
}
