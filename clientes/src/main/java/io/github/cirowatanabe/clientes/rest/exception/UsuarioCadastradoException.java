package io.github.cirowatanabe.clientes.rest.exception;

public class UsuarioCadastradoException extends RuntimeException {

    public UsuarioCadastradoException(String login){
        super("O login " + login + " não está disponível");
    }

}
