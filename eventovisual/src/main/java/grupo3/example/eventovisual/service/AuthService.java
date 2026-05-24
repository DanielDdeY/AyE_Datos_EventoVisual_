package grupo3.example.eventovisual.service;

import grupo3.example.eventovisual.dto.LoginRequestDTO;
import grupo3.example.eventovisual.dto.RegistroRequestDTO;
import grupo3.example.eventovisual.dto.UsuarioResponseDTO;
import grupo3.example.eventovisual.mapper.UsuarioMapper;
import grupo3.example.eventovisual.model.Usuario;
import grupo3.example.eventovisual.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean registrar(RegistroRequestDTO dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            return false; 
        }
        
        Usuario nuevoUsuario = UsuarioMapper.toEntity(dto);
        usuarioRepository.save(nuevoUsuario);
        return true;
    }

    public UsuarioResponseDTO login(LoginRequestDTO dto) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(dto.getEmail());
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getContrasena().equals(dto.getContrasena())) {
                return UsuarioMapper.toResponseDTO(usuario);
            }
        }
        return null; 
    }
}
