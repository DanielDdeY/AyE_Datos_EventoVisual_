package grupo3.example.eventovisual.mapper;

import grupo3.example.eventovisual.dto.RegistroRequestDTO;
import grupo3.example.eventovisual.dto.UsuarioResponseDTO;
import grupo3.example.eventovisual.model.Usuario;

public class UsuarioMapper {

    // Convierte el DTO de registro a la Entidad base 
    public static Usuario toEntity(RegistroRequestDTO dto) {
        if (dto == null) return null;
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setContrasena(dto.getContrasena());
        if (dto.getPerfilInicial() != null) {
            usuario.setPerfilInicial(dto.getPerfilInicial());
        }
        return usuario;
    }

    // Convierte la Entidad a un DTO de respuesta para viajar por AJAX
    public static UsuarioResponseDTO toResponseDTO(Usuario usuario) {
        if (usuario == null) return null;
        return new UsuarioResponseDTO(
            usuario.getIdUsuario(),
            usuario.getNombre(),
            usuario.getEmail(),
            usuario.getPerfilInicial()
        );
    }
}
