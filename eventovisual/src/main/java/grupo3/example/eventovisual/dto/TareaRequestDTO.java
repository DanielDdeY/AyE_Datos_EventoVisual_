package grupo3.example.eventovisual.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TareaRequestDTO {
    private Integer idProyecto;
    private String titulo;
    private String descripcion;
    private String prioridad;
    private Integer idUsuarioAsignado;

}
