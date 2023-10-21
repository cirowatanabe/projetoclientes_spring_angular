package io.github.cirowatanabe.clientes.rest;

import io.github.cirowatanabe.clientes.model.entity.Usuario;
import io.github.cirowatanabe.clientes.model.repository.UsuarioRepository;
import io.github.cirowatanabe.clientes.rest.dto.AuthenticationDTO;
import io.github.cirowatanabe.clientes.rest.dto.RegisterDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        System.out.println(data);
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        try{
            var auth = this.authenticationManager.authenticate(usernamePassword);
        } catch(Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if (this.repository.findByUsername(data.login()) != null){
            return ResponseEntity.badRequest().build();
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        Usuario user = new Usuario(data.login(), encryptedPassword, data.role());

        this.repository.save(user);

        return ResponseEntity.ok().build();
    }


}
