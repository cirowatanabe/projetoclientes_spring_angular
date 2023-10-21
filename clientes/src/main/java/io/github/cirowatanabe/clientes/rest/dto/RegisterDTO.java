package io.github.cirowatanabe.clientes.rest.dto;

import io.github.cirowatanabe.clientes.model.entity.enums.UserRole;

public record RegisterDTO (String login, String password, UserRole role) {
}
