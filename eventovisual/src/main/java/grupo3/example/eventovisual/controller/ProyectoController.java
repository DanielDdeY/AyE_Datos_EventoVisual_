package grupo3.example.eventovisual.controller;

import grupo3.example.eventovisual.dto.ProyectoRequestDTO;
import grupo3.example.eventovisual.dto.ProyectoResponseDTO;
import grupo3.example.eventovisual.service.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    // POST /api/proyectos (Crear)
    @PostMapping
    public ResponseEntity<ProyectoResponseDTO> crearProyecto(@RequestBody ProyectoRequestDTO dto) {
        try {
            return ResponseEntity.ok(proyectoService.crearProyecto(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // GET /api/proyectos?estado=ACTIVO (Filtro del panel de Admin)
    @GetMapping
    public ResponseEntity<List<ProyectoResponseDTO>> listarProyectosFiltro(@RequestParam(required = false) String estado) {
        // Por defecto, si no mandan estado, listamos los activos
        String estadoFiltro = (estado != null && !estado.isEmpty()) ? estado : "ACTIVO";
        return ResponseEntity.ok(proyectoService.listarProyectosPorEstado(estadoFiltro));
    }

    // GET /api/proyectos/mis-proyectos?idUsuario=1 (Lista desplegable del usuario)
    @GetMapping("/mis-proyectos")
    public ResponseEntity<List<ProyectoResponseDTO>> misProyectos(@RequestParam Integer idUsuario) {
        return ResponseEntity.ok(proyectoService.obtenerProyectosPorUsuario(idUsuario));
    }

    // PUT /api/proyectos/1/jefe?email=jefe@test.com (Asignar líder)
    @PutMapping("/{idProyecto}/jefe")
    public ResponseEntity<String> asignarJefe(
            @PathVariable Integer idProyecto,
            @RequestParam String email) {
        
        boolean exito = proyectoService.asignarJefeGrupo(idProyecto, email);
        if (exito) {
            return ResponseEntity.ok("Jefe de grupo asignado e incorporado al equipo con éxito.");
        }
        return ResponseEntity.badRequest().body("Error: El proyecto no existe o el correo del usuario es inválido.");
    }
    // DELETE /api/proyectos/5
    @DeleteMapping("/{idProyecto}")
    public ResponseEntity<String> eliminarProyecto(@PathVariable Integer idProyecto) {
        try {
            proyectoService.eliminarProyecto(idProyecto);
            return ResponseEntity.ok("Proyecto eliminado correctamente de la base de datos.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: No se pudo eliminar. Asegúrese de borrar primero las tareas vinculadas a este proyecto.");
        }
    }
    // GET /api/proyectos/autocompletar?query=Proy (ARBOL)
    @GetMapping("/autocompletar")
    public ResponseEntity<List<String>> autocompletarProyectos(@RequestParam String query) {
        List<String> sugerencias = proyectoService.sugerirProyectosPorPrefijo(query);
        return ResponseEntity.ok(sugerencias);
    }
}
