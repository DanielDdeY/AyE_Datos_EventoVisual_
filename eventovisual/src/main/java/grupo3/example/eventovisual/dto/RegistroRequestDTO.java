package grupo3.example.eventovisual.dto;

import grupo3.example.eventovisual.model.PerfilInicial;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistroRequestDTO {
    private String nombre;
    private String email;
    private String contrasena;
    private PerfilInicial perfilInicial;
}
