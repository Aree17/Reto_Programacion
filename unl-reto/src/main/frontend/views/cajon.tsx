import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {
  Button,
  ComboBox,
  Dialog,
  Grid,
  GridColumn,
  GridSortColumn,
  HorizontalLayout,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';
import { CajonService, ObjetoService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';
import { useEffect, useState } from 'react';

export const config: ViewConfig = {
  title: 'Cajon',
  menu: {
    icon: 'vaadin:building',
    order: 5,
    title: 'Cajon',
  },
};

type Cajon = {
  id: number;
  nombre: string;
  capacidad: number;
  capacidadOcupada: number;
};

type Objeto = {
  id: number;
  nombre: string;
  tipo: string;
  tamanio: string;
  idCajon: number;
};

type CajonEntryFormProps = {
  onCajonCreated?: () => void;
};

type CajonEntryFormPropsUpdate = {
  Cajon: Cajon;
  onCajonUpdated?: () => void;
};

type ObjetoEntryFormProps = {
  idCajon: number;
  onObjetoCreated?: () => void;
};

// --------- Crear Cajon ----------
function CajonEntryForm(props: CajonEntryFormProps) {
  const nombre = useSignal('');
  const capacidad = useSignal('');
  const dialogOpened = useSignal(false);

  const createCajon = async () => {
    try {
      if (nombre.value.trim() && capacidad.value.trim()) {
        await CajonService.create(nombre.value, parseInt(capacidad.value));
        if (props.onCajonCreated) props.onCajonCreated();
        nombre.value = '';
        capacidad.value = '';
        dialogOpened.value = false;
        Notification.show('Cajon creado', { duration: 3000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan datos', { duration: 3000, position: 'top-center', theme: 'error' });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Dialog
        modeless
        headerTitle="Nuevo Cajon"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => (dialogOpened.value = detail.value)}
        footer={
          <>
            <Button onClick={() => (dialogOpened.value = false)}>Cancelar</Button>
            <Button onClick={createCajon} theme="primary">Crear</Button>
          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField
            label="Nombre del cajon"
            placeholder="Ingrese el nombre del cajon"
            value={nombre.value}
            onValueChanged={(evt) => (nombre.value = evt.detail.value)}
          />
          <TextField
            label="Capacidad del cajon"
            placeholder="Ingrese la capacidad del cajon"
            value={capacidad.value}
            onValueChanged={(evt) => (capacidad.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button onClick={() => (dialogOpened.value = true)}>Agregar</Button>
    </>
  );
}

// --------- Actualizar Cajon ----------
function CajonEntryFormUpdate(props: CajonEntryFormPropsUpdate) {
  const dialogOpened = useSignal(false);
  const id = useSignal(props.Cajon?.id?.toString() || '');
  const nombre = useSignal(props.Cajon?.nombre || '');
  const capacidad = useSignal(props.Cajon?.capacidad?.toString() || '');

  const openDialog = () => {
    id.value = props.Cajon?.id?.toString() || '';
    nombre.value = props.Cajon?.nombre || '';
    capacidad.value = props.Cajon?.capacidad?.toString() || '';
    dialogOpened.value = true;
  };

  const updateCajon = async () => {
    try {
      if (nombre.value.trim() && capacidad.value.trim()) {
        await CajonService.update(
          parseInt(id.value),
          nombre.value,
          parseInt(capacidad.value)
        );
        if (props.onCajonUpdated) props.onCajonUpdated();
        dialogOpened.value = false;
        Notification.show('Cajón actualizado', { duration: 3000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo actualizar, faltan datos o la capacidad es inválida', { duration: 3000, position: 'top-center', theme: 'error' });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Dialog
        modeless
        headerTitle="Editar Cajón"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => (dialogOpened.value = detail.value)}
        footer={
          <>
            <Button onClick={() => (dialogOpened.value = false)}>Cancelar</Button>
            <Button onClick={updateCajon} theme="primary">Editar</Button>
          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField
            label="Nombre del Cajón"
            placeholder="Ingrese el nombre del cajón"
            value={nombre.value}
            onValueChanged={(evt) => (nombre.value = evt.detail.value)}
          />
          <TextField
            label="Capacidad del Cajón"
            placeholder="Ingrese la capacidad del cajón"
            value={capacidad.value}
            onValueChanged={(evt) => (capacidad.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button onClick={openDialog}>Editar</Button>
    </>
  );
}

function ObjetoEntryForm(props: ObjetoEntryFormProps) {
  const nombre = useSignal('');
  const tipo = useSignal('');
  const tamanio = useSignal('');
  const cajon = useSignal('');
  const createObjeto = async () => {
    try {
      if (
        nombre.value.trim().length > 0 &&
        tipo.value.trim().length > 0 &&
        tamanio.value.trim().length > 0 &&
        cajon.value.trim().length > 0
      ) {
        const idCajon = parseInt(cajon.value);
        await ObjetoService.create(nombre.value, tipo.value, tamanio.value, idCajon);
        if (props.onObjetoCreated) {
          props.onObjetoCreated();
        }
        nombre.value = '';
        tipo.value = '';
        tamanio.value = '';
        cajon.value = '';

        dialogOpened.value = false;
        Notification.show('Objeto creado', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  let listaCajones = useSignal<String[]>([]);
  useEffect(() => {
    ObjetoService.listCajonCombo().then(
      (data) =>
        //console.log(data)
        (listaCajones.value = data)
    );
  }, []);

  let listaTipo = useSignal<String[]>([]);
  useEffect(() => {
    ObjetoService.ListTipo().then(
      (data) =>
        //console.log(data)
        (listaTipo.value = data)
    );
  }, []);

  let listaTamanio = useSignal<String[]>([]);
  useEffect(() => {
    ObjetoService.ListTamanio().then(
      (data) =>
        //console.log(data)
        (listaTamanio.value = data)
    );
  }, []);

  const dialogOpened = useSignal(false);
  return (
    <>
      <Dialog
        modeless
        headerTitle="Nuevo Objeto"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button
              onClick={() => {
                dialogOpened.value = false;
              }}>
              Cancelar
            </Button>
            <Button onClick={createObjeto} theme="primary">
              Crear
            </Button>
          </>
        }>
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField
            label="Nombre del Objeto"
            placeholder="Ingrese el nombre del Objeto"
            aria-label="Nombre del Objeto"
            value={nombre.value}
            onValueChanged={(evt) => (nombre.value = evt.detail.value)}
          />
          <ComboBox
            label="Cajon"
            items={listaCajones.value}
            placeholder="Seleccione un cajon"
            aria-label="Seleccione un cajon de la lista"
            value={cajon.value}
            onValueChanged={(evt) => (cajon.value = evt.detail.value)}
          />
          <ComboBox
            label="Tamanio"
            items={listaTamanio.value}
            placeholder="Seleccione un tamaño"
            aria-label="Seleccione un tamaño de la lista"
            value={tamanio.value}
            onValueChanged={(evt) => (tamanio.value = evt.detail.value)}
          />
          <ComboBox
            label="Tipo"
            items={listaTipo.value}
            placeholder="Seleccione un tipo"
            aria-label="Seleccione un tipo de la lista"
            value={tipo.value}
            onValueChanged={(evt) => (tipo.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button
        onClick={() => {
          dialogOpened.value = true;
        }}>
        Agregar Objeto
      </Button>
    </>
  );
}
// --------- Dialog para mostrar Objetos de un Cajón ----------
function MostrarObjetosDialog({ idCajon }: { idCajon: number }) {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [objetos, setObjetos] = useState<Objeto[]>([]);

  const loadObjetos = async () => {
    const all = await ObjetoService.listAll();
    // Filtrar por idCajon
    setObjetos(all.filter((obj: any) => obj.idCajon === idCajon));
  };

  useEffect(() => {
    if (dialogOpened) loadObjetos();
    // eslint-disable-next-line
  }, [dialogOpened]);

  return (
    <>
      <Dialog
        opened={dialogOpened}
        headerTitle="Objetos del Cajón"
        onOpenedChanged={({ detail }) => setDialogOpened(detail.value)}
        footer={
          <>
            <ObjetoEntryForm idCajon={idCajon} onObjetoCreated={loadObjetos} />
            <Button onClick={() => setDialogOpened(false)}>Cerrar</Button>
          </>
        }
      >
        <VerticalLayout>
          {objetos.length === 0 ? (
            <span>No hay objetos en este cajón.</span>
          ) : (
            objetos.map((obj) => (
              <div key={obj.id}>
                <strong>{obj.nombre}</strong> | Tipo: {obj.tipo} | Tamaño: {obj.tamanio}
              </div>
            ))
          )}
        </VerticalLayout>
      </Dialog>
      <Button onClick={() => setDialogOpened(true)} theme="primary">Mostrar Objetos</Button>
    </>
  );
}

// --------- Vista principal -----------
export default function CajonView() {
  const [items, setItems] = useState<Cajon[]>([]);
  useEffect(() => {
    callData();
    // eslint-disable-next-line
  }, []);

  const callData = () => {
    CajonService.listAll().then(setItems);
  };

  const deleteCajon = async (Cajon: Cajon) => {
    const confirmed = window.confirm(`¿Está seguro de que desea eliminar el cajón "${Cajon.nombre}"?`);
    if (confirmed) {
      try {
        await CajonService.delete(Cajon.id);
        Notification.show('Cajón eliminado exitosamente', {
          duration: 3000,
          position: 'bottom-end',
          theme: 'success'
        });
        callData();
      } catch (error) {
        Notification.show('Error al eliminar el cajón', {
          duration: 3000,
          position: 'top-center',
          theme: 'error'
        });
      }
    }
  };

  const order = (event, columnId) => {
    const direction = event.detail.value;
    if (!direction) {
      CajonService.listAll().then(setItems);
    } else {
      var dir = (direction == 'asc') ? 1 : 2;
      CajonService.order(columnId, dir).then(setItems);
    }
  };

  function indexLink({ model }: { model: any }) {
    return (
      <span>
        <CajonEntryFormUpdate Cajon={model.item} onCajonUpdated={callData} />
      </span>
    );
  }

  function indexIndex({ model }: { model: any }) {
    return <span>{model.index + 1}</span>;
  }

  // Busqueda
  const criterio = useSignal('');
  const texto = useSignal('');
  const itemSelect = [
    { label: 'nombre', value: 'nombre' },
    { label: 'capacidad', value: 'capacidad' },
  ];

  const search = async () => {
    try {
      CajonService.search(criterio.value, texto.value, 0).then(setItems);
      criterio.value = '';
      texto.value = '';
      Notification.show('Busqueda realizada', { duration: 3000, position: 'bottom-end', theme: 'success' });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Lista de Cajones">
      <HorizontalLayout>
            <CajonEntryForm onCajonCreated={callData} />
            <ObjetoEntryForm idCajon={0} onObjetoCreated={callData} />
          </HorizontalLayout>
      </ViewToolbar>
      <Grid items={items}>
        <GridColumn renderer={indexIndex} header="Nro" />
        <GridSortColumn onDirectionChanged={(e) => order(e, "nombre")} path="nombre" header="Cajon" />
        <GridSortColumn onDirectionChanged={(e) => order(e, "capacidad")} path="capacidad" header="Capacidad" />
        <GridSortColumn onDirectionChanged={(e) => order(e, "capacidadOcupada")} path="capacidadOcupada" header="Capacidad Ocupada" />
        {/* Acción de editar */}
        <GridColumn header="Acciones" renderer={indexLink} />
        {/* Acción de eliminar */}
        <GridColumn
          header="Eliminar"
          renderer={({ item }) => (
            <Button theme="error" onClick={() => deleteCajon(item)}>
              Eliminar
            </Button>
          )}
        />
        {/* Mostrar Objetos */}
        <GridColumn
          header="Mostrar Objetos"
          renderer={({ item }) => (
            <MostrarObjetosDialog idCajon={item.id} />
          )}
        />
      </Grid>
    </main>
  );
}