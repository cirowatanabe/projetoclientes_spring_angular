package io.github.cirowatanabe.service;

import io.github.cirowatanabe.model.Cliente;
import io.github.cirowatanabe.repository.ClientesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientesService {

    private ClientesRepository repository;

    public ClientesService(ClientesRepository repository) {
        this.repository = repository;
    }

    public void salvarCliente(Cliente cliente){
        validarCliente(cliente);
        repository.persistir(cliente);
    }

    public void validarCliente(Cliente cliente){
        //TODO aplica validações
    }

}
