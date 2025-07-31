package com.unl.reto.base.models;

public class Cajon {
    private Integer id;
    private String nombre;
    private Integer capacidad;
    private Integer capacidadOcupada;

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

    public Integer getCapacidad() {
        return this.capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public Integer getCapacidadOcupada() {
        return this.capacidadOcupada;
    }

    public void setCapacidadOcupada(Integer capacidadOcupada) {
        this.capacidadOcupada = capacidadOcupada;
    }
    
}