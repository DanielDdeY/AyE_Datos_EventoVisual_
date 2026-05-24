package grupo3.example.eventovisual.controller;

import grupo3.example.eventovisual.service.TareaService;
import grupo3.example.eventovisual.dto.TareaRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    // POST /api/tareas
    @PostMapping
    public ResponseEntity<String> crearTarea(@RequestBody TareaRequestDTO dto) { 
        boolean exito = tareaService.crearTarea(dto.getIdProyecto(), dto.getTitulo(), dto.getDescripcion(), dto.getPrioridad(), dto.getIdUsuarioAsignado());
        if (exito) {
            return ResponseEntity.ok("Tarea creada con éxito en la columna To-Do.");
        }
        return ResponseEntity.status(403).body("Error: No se pueden crear tareas. Hay invitaciones pendientes de aceptar en este proyecto.");
    }

    // PUT /api/tareas/5/avanzar?
    @PutMapping("/{idTarea}/avanzar")
    public ResponseEntity<String> avanzarTarea(
            @PathVariable Integer idTarea, 
            @RequestParam Integer idUsuario) {
        
        boolean exito = tareaService.avanzarEstadoTarea(idTarea, idUsuario);
        if (exito) {
            return ResponseEntity.ok("La tarea ha avanzado de estado exitosamente.");
        }
        return ResponseEntity.badRequest().body("Error al intentar avanzar la tarea. Es posible que ya esté terminada.");
    }

    // POST /api/tareas/5/rechazar?
    @PostMapping("/{idTarea}/rechazar")
    public ResponseEntity<String> rechazarTarea(
            @PathVariable Integer idTarea,
            @RequestParam Integer idRevisor,
            @RequestBody String motivoRechazo) {
        
        boolean exito = tareaService.rechazarTarea(idTarea, motivoRechazo, idRevisor);
        if (exito) {
            return ResponseEntity.ok("Tarea rechazada. Se ha notificado al desarrollador.");
        }
        return ResponseEntity.badRequest().body("Error al rechazar la tarea. Verifique que se encuentre en revisión.");
    }
}
