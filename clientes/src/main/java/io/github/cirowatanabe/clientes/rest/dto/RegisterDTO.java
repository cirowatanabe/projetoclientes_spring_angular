package io.github.cirowatanabe.clientes.rest.dto;

import jakarta.validation.constraints.NotEmpty;

public record RegisterDTO (
        @NotEmpty(message = "{campo.login.obrigatorio}") String login,
        @NotEmpty(message = "{campo.password.obrigatorio}") String password,
        String role) {}
