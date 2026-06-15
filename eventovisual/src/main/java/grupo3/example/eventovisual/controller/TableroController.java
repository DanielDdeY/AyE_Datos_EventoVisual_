package grupo3.example.eventovisual.controller;

import grupo3.example.eventovisual.dto.TareaResponseDTO;
import grupo3.example.eventovisual.service.TableroService;
import grupo3.example.eventovisual.service.TareaService;
import grupo3.example.eventovisual.structures.MatrizDatos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tablero")
public class TableroController {

    @Autowired
    private TableroService tableroService;

    @Autowired
    private TareaService tareaService;

    // GET /api/tablero/{idProyecto}
    @GetMapping("/{idProyecto}")
    public ResponseEntity<?> obtenerTableroVisual(@PathVariable Integer idProyecto) {
        
        // Validación:Tienen que estar todos los miembros para poder iniciar
        if (!tableroService.puedeCrearTareas(idProyecto)) {
            return ResponseEntity.status(403)
                    .body("El tablero está bloqueado. Faltan miembros por aceptar su invitación.");
        }

        // Si la validación pasa, se genera la matriz 2D con las tareas
        MatrizDatos<TareaResponseDTO> matriz = tableroService.cargarTableroVisual(idProyecto);
        return ResponseEntity.ok(matriz);
    }
    // GET /api/tablero/ultimo-movimiento
    @GetMapping("/ultimo-movimiento")
    public ResponseEntity<String> obtenerUltimoMovimiento() {
        String ultimoLog = tareaService.obtenerUltimoMovimiento();
        return ResponseEntity.ok(ultimoLog);
    }
}
