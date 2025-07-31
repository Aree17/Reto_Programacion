package com.unl.reto.base.controller.dataStruct.list;


public class LinkedList <E>{
    private Node <E> head;
    private Node <E> last;
    private Integer length;

    public Integer getLength() {
        return this.length;
    }


    public LinkedList(){
        head=null;
        last=null;
        length=0;
    }

    public Boolean isEmpty(){
        return head == null || length ==0;
    }

    private Node<E> getNode(Integer pos) {
        if(isEmpty()){
            throw new ArrayIndexOutOfBoundsException("Lista vacía");
        } else if(pos < 0 || pos >= length){
            throw new ArrayIndexOutOfBoundsException("fuera de rango...");
        } else if(pos==0){
            return head;
        }else if ((length.intValue()-1) == pos.intValue()){
            return last;
        }else{
            Node<E> search = head;
            Integer cont = 0;
            while(cont < pos){
                cont++;
                search = search.getNext();
            }
            return search; 
        }
    }
           
    private E getDataFirst(){
        if(isEmpty()){
            throw new ArrayIndexOutOfBoundsException("Lista vacìa");
        }else{
            return head.getData();
        }
    }

    private E getDataLast(){
        if(isEmpty()){
            throw new ArrayIndexOutOfBoundsException("Lista vacìa");
        }else{
            return last.getData();
        }
    }

    public E get(Integer pos) throws ArrayIndexOutOfBoundsException{
    return getNode(pos).getData();
    }   


    private void addFirst(E data){
        if(isEmpty()){
            Node<E> aux=new Node<>(data);
            head =aux;
            last=aux;
        }else{
            Node<E> head_old=head;
            Node<E> aux = new Node<>(data, head_old);
            aux.setNext(head_old);
            head=aux;
        }
        length++;
    }

private void addLast(E data){
    if(isEmpty()){
        addFirst(data);
    }else{
        Node<E> aux=new Node<>(data);
        last.setNext(aux);
        last=aux;
        length++;
    }
}

    public void add(E data, Integer pos) throws Exception{
        if(pos==0){
            addFirst(data);
        }else if(length.intValue()==pos.intValue()){
           addLast(data);

        }else{
            Node<E> search_preview =getNode(pos -1);
            Node<E> search =getNode(pos);

            Node<E> aux= new Node<>(data, search);
            search_preview.setNext(aux);
            length++;
        }

    }

    public void add(E data){
        addLast(data);
    }


    public String print(){
        if(isEmpty())
            return "Esta vacia";
        else{
            StringBuilder resp= new StringBuilder();
            Node<E> help=head;
            while(help != null){
                resp.append(help.getData()).append(" - ");
                help=help.getNext();
            }
            resp.append("\n");
            return resp.toString();
        }
    }


    public void update(E data, Integer pos){
        getNode(pos).setData(data);
    }


    public E[] toArray(){
        Class clazz=null;
        E[] matriz=null;
        if(this.length>0){
            clazz=head.getData().getClass();
            matriz=(E[]) java.lang.reflect.Array.newInstance(clazz, this.length);
            Node<E> aux=head;
            for(int i  = 0; i<length;i++){
                matriz[i]=aux.getData();
                aux=aux.getNext();
            }
        }
        return matriz;
    }


    public LinkedList<E> toList(E[] matriz){
        clear();
        for(int i =0; i<matriz.length; i++){
            this.add(matriz[i]);
        }
        return this;
    }

    protected E deleteFirst() throws Exception{
        if(isEmpty()){
            throw new Exception("Lista vacia");
        }else{
            E element = head.getData();
            Node<E> aux=head.getNext();
            head=aux;
            if(length.intValue()==1)
                last=null;
            length--;
            return element;
        }
    }

    protected E deleteLast() throws Exception{
        if(isEmpty()){
            throw new Exception("Lista vacia");
        }else{
            E element = last.getData();
            Node<E> aux=getNode(length -2);

            if(aux==null){
                last=null;
                if(length==2){
                    last=head;
                }else{
                    head=null;
                }
            }else{
                last=null;
                last=aux;
                last.setNext(null);
            }
            length--;
            return element;
        }
    }

    public E delete(Integer pos) throws Exception{
        if(isEmpty()){
            throw new ArrayIndexOutOfBoundsException("Lista vacìa");
        } else if(pos < 0 || pos >= length){
            throw new ArrayIndexOutOfBoundsException("fuera de rango...");
        } else if(pos==0){
            return deleteFirst();
        }else if ((length.intValue()-1) == pos.intValue()){
            return deleteLast();
        }else{
            Node<E> preview = getNode(pos-1);
            Node<E> actualy = getNode(pos);
            E element=preview.getData();
            Node<E> next = actualy.getNext();
            actualy=null;
            preview.setNext(next);
            length--;
            return element;
        }
    }



    public void clear(){
        head=null;
        last=null;
        length=0;
    }
    public static void main(String[] args) {
        LinkedList<Double> lista = new LinkedList<>();
        try{
            lista.add(56.7);
            lista.add(65.7);
            lista.add(56.7, 0);
            lista.add(4.7);
            lista.add(9.0, 3);
            lista.add(-1.0, lista.getLength());
            System.out.println(lista.print());
            //System.out.println(lista.get(lista.getLength()-1));
            System.out.println("Actualizar ");
            lista.update(10.0, 0);
            System.out.println(lista.print());
            System.out.println(lista.length);
            System.out.println(lista.length);
            System.out.println(lista.print());

            System.out.println("Eliminar cola");
            lista.deleteLast();
            System.out.println(lista.length);
            System.out.println(lista.print());
            lista.delete(3);
            System.out.println("Eliminar ");
            System.out.println(lista.length);
            System.out.println(lista.print());
            System.out.println("Tamaño ");
            System.out.println(lista.length);
        }catch(Exception e){
            System.out.println("Error "+e);
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        Node<E> current = head; // Suponiendo que tienes un nodo 'head' en tu LinkedList
        while (current != null) {
            sb.append(current.data);
            if (current.next != null) {
                sb.append(", ");
            }
            current = current.next;
        }
        sb.append("]");
        return sb.toString();
    }
}