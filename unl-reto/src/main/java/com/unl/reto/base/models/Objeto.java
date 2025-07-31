package com.unl.reto.base.models;

public class Objeto {
    private Integer id;
    private String nombre;
    private TipoObjeto tipo;
    private TamanioObjeto tamanio;
    private Integer idCajon;

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

	public TamanioObjeto getTamanio() {
		return this.tamanio;
	}

	public void setTamanio(TamanioObjeto tamanio) {
		this.tamanio = tamanio;
	}

	public Integer getIdCajon() {
		return this.idCajon;
	}

	public void setIdCajon(Integer idCajon) {
		this.idCajon = idCajon;
	}
    
}
