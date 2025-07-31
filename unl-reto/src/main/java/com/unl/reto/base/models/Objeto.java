package com.unl.reto.base.models;

public class Objeto {
    private Integer id;
    private String nombre;
    private TipoObjeto tipo;
    private TamañoObjeto tamano;
    private Cajon cajon;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoObjeto getTipo() {
        return this.tipo;
    }

    public void setTipo(TipoObjeto tipo) {
        this.tipo = tipo;
    }

    public TamañoObjeto getTamano() {
        return this.tamano;
    }

    public void setTamano(TamañoObjeto tamano) {
        this.tamano = tamano;
    }

    public Cajon getCajon() {
        return this.cajon;
    }

    public void setCajon(Cajon cajon) {
        this.cajon = cajon;
    }

}
