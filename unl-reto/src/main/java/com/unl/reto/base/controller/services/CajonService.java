package com.unl.reto.base.controller.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.github.javaparser.quality.NotNull;
import com.unl.reto.base.controller.dao.dao_models.DaoCajon;
import com.unl.reto.base.controller.dataStruct.list.LinkedList;
import com.unl.reto.base.models.Cajon;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;

@BrowserCallable
@Transactional(propagation = Propagation.REQUIRES_NEW)
@AnonymousAllowed

public class CajonService {
    private DaoCajon dc;

    public CajonService() {
        dc = new DaoCajon();
    }

    public void create(@NotEmpty String nombre, Integer capacidad) throws Exception {
        if (nombre.trim().length() > 0 && capacidad > 0) {
            dc.getObj().setNombre(nombre);
            dc.getObj().setCapacidad(capacidad);
            if (!dc.save()) {
                throw new Exception("No se pudo guardar los datos de Cajon");
            }
        } else {
            throw new Exception("Los campos no pueden estar vacíos");
        }
    }

    public void update(@NotNull Integer id, @NotEmpty String nombre, Integer capacidad) throws Exception {
        if (nombre.trim().length() > 0 && capacidad > 0) {

        }
        Cajon CajonExistente = dc.getById(id);
        if (CajonExistente == null) {
            throw new Exception("No se encontró la estación con ID: " + id);
        }

        Integer posicion = null;
        for (int i = 0; i < dc.listAll().getLength(); i++) {
            Cajon CajonEnPosicion = dc.listAll().get(i);
            if (CajonEnPosicion.getId().equals(id)) {
                posicion = i;
                break;
            }
        }
        if (posicion == null) {
            throw new Exception("No se pudo encontrar la posición de la estación con ID: " + id);
        }

        dc.setObj(new Cajon());
        dc.getObj().setId(id);
        dc.getObj().setNombre(nombre);
        dc.getObj().setCapacidad(capacidad);

        if (!dc.update(posicion)) {
            throw new Exception("No se pudo guardar los datos de Cajon");
        }
    }



    public List<HashMap<String, Object>> listAll() {
        return Arrays.asList(dc.all().toArray());
    }

    public List<HashMap> order(String attribute, Integer type) throws Exception {
        return Arrays.asList(dc.orderByCajon(type, attribute).toArray());
    }

    public void delete(Integer id) throws Exception {
        if (id == null || id <= 0) {
            throw new Exception("ID de estación inválido");
        }
        if (!dc.deleteCajon(id)) {
            throw new Exception("No se pudo eliminar la estación con ID: " + id);
        }
    }

    public List<HashMap> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, Object>> lista = dc.search(attribute, text, type);
        if (!lista.isEmpty()) {
            return Arrays.asList(lista.toArray());
        } else {
            return new ArrayList<>();
        }
    }

}