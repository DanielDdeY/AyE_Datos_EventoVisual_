package grupo3.example.eventovisual.controller;

import grupo3.example.eventovisual.dto.LoginRequestDTO;
import grupo3.example.eventovisual.dto.RegistroRequestDTO;
import grupo3.example.eventovisual.dto.UsuarioResponseDTO;
import grupo3.example.eventovisual.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // POST /api/auth/registrar
    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody RegistroRequestDTO dto) {
        boolean exito = authService.registrar(dto);
        if (exito) {
            return ResponseEntity.ok("Usuario registrado con éxito");
        }
        return ResponseEntity.badRequest().body("Error: El email ya está en uso");
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<UsuarioResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        UsuarioResponseDTO usuario = authService.login(dto);
        if (usuario != null) {   
            return ResponseEntity.ok(usuario);
        }
        return ResponseEntity.status(401).build(); 
    }
}
