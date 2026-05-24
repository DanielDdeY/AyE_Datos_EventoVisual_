package grupo3.example.eventovisual.repository;

import grupo3.example.eventovisual.model.Proyecto;
import grupo3.example.eventovisual.model.EstadoProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {
    List<Proyecto> findByEstadoProyecto(EstadoProyecto estado);
}
