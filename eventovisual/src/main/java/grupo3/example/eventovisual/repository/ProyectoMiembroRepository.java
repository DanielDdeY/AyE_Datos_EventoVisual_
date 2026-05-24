package grupo3.example.eventovisual.repository;

import grupo3.example.eventovisual.model.ProyectoMiembro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProyectoMiembroRepository extends JpaRepository<ProyectoMiembro, Integer> {
    List<ProyectoMiembro> findByUsuario_IdUsuario(Integer idUsuario);
}
