package grupo3.example.eventovisual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Usuarios")
@Getter                 
@Setter                
@NoArgsConstructor     
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "email", length = 160, unique = true, nullable = false)
    private String email;

    @Column(name = "contrasena", length = 255, nullable = false)
    private String contrasena;

    @Enumerated(EnumType.STRING)
    @Column(name = "perfil_inicial")
    private PerfilInicial perfilInicial = PerfilInicial.USUARIO;
    
}