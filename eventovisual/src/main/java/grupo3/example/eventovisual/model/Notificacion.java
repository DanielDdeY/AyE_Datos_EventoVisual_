package grupo3.example.eventovisual.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Notificaciones")
@Getter
@Setter
@NoArgsConstructor
public class Notificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_notificacion")
    private Integer idNotificacion;

    @ManyToOne
    @JoinColumn(name = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @Column(name = "email_destinatario", length = 160, nullable = false)
    private String emailDestinatario;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_notificacion", nullable = false)
    private TipoNotificacion tipoNotificacion;

    @Column(name = "mensaje_descripcion", length = 255)
    private String mensajeDescripcion;

    @ManyToOne
    @JoinColumn(name = "id_revisor") 
    private Usuario revisor;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoNotificacion estado = EstadoNotificacion.PENDIENTE;
}