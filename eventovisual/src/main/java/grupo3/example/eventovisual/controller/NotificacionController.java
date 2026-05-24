package grupo3.example.eventovisual.controller;

import grupo3.example.eventovisual.dto.NotificacionResponseDTO;
import grupo3.example.eventovisual.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    // POST /api/notificaciones/invitar?idProyecto=1&email=dev@test.com
    @PostMapping("/invitar")
    public ResponseEntity<String> invitarUsuario(
            @RequestParam Integer idProyecto, 
            @RequestParam String email) {
        
        boolean exito = notificacionService.enviarInvitacion(idProyecto, email);
        if (exito) {
            return ResponseEntity.ok("Invitación enviada con éxito a " + email);
        }
        return ResponseEntity.badRequest().body("Error al enviar la invitación. Verifique el ID del proyecto.");
    }

    // GET /api/notificaciones/pendientes?email=dev@test.com
    @GetMapping("/pendientes")
    public ResponseEntity<List<NotificacionResponseDTO>> listarPendientes(@RequestParam String email) {
        List<NotificacionResponseDTO> pendientes = notificacionService.obtenerPendientes(email);
        return ResponseEntity.ok(pendientes);
    }

    // POST /api/notificaciones/15/aceptar?idUsuario=3
    @PostMapping("/{idNotificacion}/aceptar")
    public ResponseEntity<String> aceptarInvitacion(
            @PathVariable Integer idNotificacion, 
            @RequestParam Integer idUsuario) {
        
        boolean exito = notificacionService.aceptarInvitacion(idNotificacion, idUsuario);
        if (exito) {
            return ResponseEntity.ok("Invitación aceptada. ¡Bienvenido al proyecto!");
        }
        return ResponseEntity.badRequest().body("Error al procesar la invitación.");
    }
}
