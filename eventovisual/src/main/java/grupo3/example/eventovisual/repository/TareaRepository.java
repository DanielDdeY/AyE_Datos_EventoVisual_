package grupo3.example.eventovisual.repository;

import grupo3.example.eventovisual.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Integer> {
    
}
