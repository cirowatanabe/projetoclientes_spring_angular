package io.github.cirowatanabe.clientes.model.repository;

import io.github.cirowatanabe.clientes.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> { //JpaRepository recebe o tipo de entidade que vai admnistrar (no caso, Usuario) e o tipo da chave primária dessa tabela (no caso, Integer)

    UserDetails findByUsername(String username);

}
