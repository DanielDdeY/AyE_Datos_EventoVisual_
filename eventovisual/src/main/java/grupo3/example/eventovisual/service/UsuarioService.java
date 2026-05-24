package grupo3.example.eventovisual.service;

import grupo3.example.eventovisual.model.Usuario;

import java.util.List;

public interface UsuarioService {
    List<Usuario> findAll();
    Usuario findById(Integer id);
    Usuario save(Usuario usuario);
    void deleteById(Integer id);
    Usuario update(Usuario usuario);
}
