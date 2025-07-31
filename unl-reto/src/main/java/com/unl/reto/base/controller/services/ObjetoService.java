package com.unl.reto.base.controller.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.github.javaparser.quality.NotNull;
import com.unl.reto.base.controller.dao.dao_models.DaoCajon;
import com.unl.reto.base.controller.dao.dao_models.DaoObjeto;
import com.unl.reto.base.controller.dataStruct.list.LinkedList;
import com.unl.reto.base.models.Cajon;
import com.unl.reto.base.models.TamanioObjeto;
import com.unl.reto.base.models.TipoObjeto;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;

@BrowserCallable
@Transactional(propagation = Propagation.REQUIRES_NEW)
@AnonymousAllowed

public class ObjetoService {

    private DaoObjeto dc;

    public ObjetoService() {
        dc = new DaoObjeto();

    }

    public List<HashMap> listAll() throws Exception {
        return Arrays.asList(dc.all().toArray());
    }

    public List<HashMap> order(String attribute, Integer type) throws Exception {
        return Arrays.asList(dc.orderByObjeto(type, attribute).toArray());
    }

    public List<HashMap> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, Object>> lista = dc.search(attribute, text, type);
        if (!lista.isEmpty()) {
            return Arrays.asList(lista.toArray()); 
        }else {
            return new ArrayList<>();
        }
    }

    public void create(@NotEmpty String nombre, @NotEmpty String tipo, @NotEmpty String tamanio, Integer idCajon) throws Exception {
        if (nombre.trim().length() > 0 && tipo.trim().length() > 0 && tamanio.trim().length() > 0 && idCajon != null) {
            dc.getObj().setNombre(nombre);
            dc.getObj().setTipo(TipoObjeto.valueOf(tipo));
            dc.getObj().setTamanio(TamanioObjeto.valueOf(tamanio));
            if (!dc.save()) {
                throw new Exception("No se pudo guardar los datos de Persona");
            }
        }
    }

    public void update(@NotNull Integer id, @NotEmpty String nombre, @NotEmpty String tipo, @NotEmpty String tamanio, Integer idCajon, Integer idObjeto) throws Exception {
        if (nombre.trim().length() > 0 && tipo.trim().length() > 0 && tamanio.trim().length() > 0 && idCajon != null && idObjeto != null) {
            dc.setObj(dc.listAll().get(id));
            dc.getObj().setId(idObjeto);
            dc.getObj().setNombre(nombre);
            dc.getObj().setTipo(TipoObjeto.valueOf(tipo));
            dc.getObj().setTamanio(TamanioObjeto.valueOf(tamanio));
            if(!dc.update(id)){
                throw new  Exception("No se pudo guardar los datos de Estacion");
    
            }
        }
    }

    public List<String> ListTamanio() {
        List<String> lista = new ArrayList<>();
        for (TamanioObjeto r : TamanioObjeto.values()) {
            lista.add(r.toString());
        }
        return lista;
    }

    public List<String> ListTipo() {
        List<String> lista = new ArrayList<>();
        for (TipoObjeto r : TipoObjeto.values()) {
            lista.add(r.toString());
        }
        return lista;
    }

    public List<HashMap> listCajonCombo(){
        List<HashMap> lista = new ArrayList<>();
        DaoCajon  dp= new DaoCajon();
        if(!dp.listAll().isEmpty()) {
            Cajon [] arreglo = dp.listAll().toArray();
            for(int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString(i));
                aux.put("label", arreglo[i].getNombre());
                lista.add(aux);
            }
        }
        return lista;
    }


    





}
