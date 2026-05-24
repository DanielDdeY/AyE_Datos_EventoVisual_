package grupo3.example.eventovisual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Proyecto_miembros", 
       uniqueConstraints = {@UniqueConstraint(columnNames = {"id_proyecto", "id_usuario"})})
@Getter
@Setter
@NoArgsConstructor
public class ProyectoMiembro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_miembro")
    private Integer idMiembro;

    @ManyToOne
    @JoinColumn(name = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "rol_proyecto", length = 70, nullable = false)
    private String rolProyecto;
}
