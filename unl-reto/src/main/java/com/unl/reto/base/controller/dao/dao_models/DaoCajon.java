package com.unl.reto.base.controller.dao.dao_models;

import com.unl.reto.base.controller.dao.AdapterDao;
import com.unl.reto.base.models.Cajon;

public class DaoCajon extends AdapterDao<Cajon> {
    private Cajon obj;

    public DaoCajon(){
        super(Cajon.class);
    }

    public Cajon getObj() {
        if(obj==null)
            this.obj=new Cajon();
        return this.obj;
    }

    
    public void setObj(Cajon obj) {
        this.obj = obj;
    }

    public Boolean save(){
        try{
            this.persist(obj); 
            return true;

        }catch(Exception e){
            e.printStackTrace(); 
            System.out.println(e);
            return false;
        }
    }

    public Boolean update(Integer pos){
        try{
            obj.setId(listAll().getLength()+1);
            this.update(obj, pos);
            return true;

        }catch(Exception e){
            e.printStackTrace(); 
            System.out.println(e);
            return false;
        }
    }

    public Boolean deletePersona(Integer id) {
        try {
            super.delete(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
            return false;
        }
    }


    public static void main(String[] args) {
        DaoCajon da= new DaoCajon();
        da.getObj().setId(da.listAll().getLength()+1);
        if(da.save())
            System.out.println("GUARDADO");
        else
        System.out.println("Error");
    }


}