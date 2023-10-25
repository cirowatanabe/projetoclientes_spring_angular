package io.github.cirowatanabe.clientes.rest;

import io.github.cirowatanabe.clientes.rest.exception.UsuarioCadastradoException;
import io.github.cirowatanabe.clientes.infra.security.TokenService;
import io.github.cirowatanabe.clientes.model.entity.Usuario;
import io.github.cirowatanabe.clientes.model.repository.UsuarioRepository;
import io.github.cirowatanabe.clientes.rest.dto.AuthenticationDTO;
import io.github.cirowatanabe.clientes.rest.dto.LoginResponseDTO;
import io.github.cirowatanabe.clientes.rest.dto.RegisterDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        Authentication auth = null;
        try {
            auth = this.authenticationManager.authenticate(usernamePassword);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Login ou senha inválidos");
        }

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if (this.repository.findByUsername(data.login()) != null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O login " + data.login() + " não está disponível");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        Usuario user = new Usuario(data.login(), encryptedPassword, data.role());

        this.repository.save(user);

        return ResponseEntity.ok().build();
    }


}
