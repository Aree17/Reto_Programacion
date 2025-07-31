import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, DatePicker, Dialog, Grid, GridColumn, GridSortColumn, HorizontalLayout, Select, TextField, VerticalLayout } from '@vaadin/react-components';
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

};

type CajonEntryFormProps = {
  onCajonCreated?: () => void;
};

type ObjetoEntryFormProps = {
  onObjetoCreated?: () => void;
};

type CajonEntryFormPropsUpdate = {
  Cajon: Cajon;
  onCajonUpdated?: () => void;
};

//Guardar Cajon
function CajonEntryForm(props: CajonEntryFormProps) {
  const nombre = useSignal('');
  const capacidad = useSignal('');
  const capacidadOcupada = useSignal('0'); 
  const createCajon = async () => {
    try {
      if (nombre.value.trim().length > 0 && capacidad.value.trim().length > 0) {
        await CajonService.create(nombre.value, parseInt(capacidad.value));
        if (props.onCajonCreated) {
          props.onCajonCreated();
        }
        nombre.value = '';
        capacidad.value = '';

        dialogOpened.value = false;
        Notification.show('Cajon creado', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }

    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };



  const dialogOpened = useSignal(false);
  return (
    <>
      <Dialog
        modeless
        headerTitle="Nuevo Cajon"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button
              onClick={() => {
                dialogOpened.value = false;
              }}
            >
              Cancelar
            </Button>
            <Button onClick={createCajon} theme="primary">
              Crear
            </Button>

          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField label="Nombre del cajon"
            placeholder="Ingrese el nombre del cajon"
            aria-label="Nombre del cajon"
            value={nombre.value}
            onValueChanged={(evt) => (nombre.value = evt.detail.value)}
          />
          <TextField label="Capacidad del cajon"
            placeholder="Ingrese la capacidad del cajon"
            aria-label="Capacidad del cajon"
            value={capacidad.value}
            onValueChanged={(evt) => (capacidad.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button
        onClick={() => {
          dialogOpened.value = true;
        }}
      >
        Agregar
      </Button>
    </>
  );
}

// Actualizar Cajon
function CajonEntryFormUpdate(props: CajonEntryFormPropsUpdate) {
  const dialogOpened = useSignal(false);

  // Inicializa los campos con los datos de la Cajon
  const id = useSignal(props.Cajon?.id?.toString() || '');
  const nombre = useSignal(props.Cajon?.nombre || '');
  const capacidad = useSignal(props.Cajon?.capacidad?.toString() || '');

  // Helper function to validate capacidad as an integer
  const validateCapacidad = (value: string) => {
    return !isNaN(Number(value)) && Number(value) > 0;
  };

  // Cuando se abre el diálogo, actualiza los valores
  const openDialog = () => {
    id.value = props.Cajon?.id?.toString() || '';
    nombre.value = props.Cajon?.nombre || '';
    capacidad.value = props.Cajon?.capacidad?.toString() || '';
    dialogOpened.value = true;
  };

  const updateCajon = async () => {
    try {
      if (nombre.value.trim().length > 0 && validateCapacidad(capacidad.value)) {
        await CajonService.update(
          parseInt(id.value),
          nombre.value,
          parseInt(capacidad.value)
        );
        if (props.onCajonUpdated) {
          props.onCajonUpdated();
        }
        dialogOpened.value = false;
        Notification.show('Cajón actualizado', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo actualizar, faltan datos o la capacidad es inválida', { duration: 5000, position: 'top-center', theme: 'error' });
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  return (
    <>
      <Dialog
        modeless
        headerTitle="Editar Cajón"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button onClick={() => { dialogOpened.value = false; }}>Cancelar</Button>
            <Button onClick={updateCajon} theme="primary">Editar</Button>
          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField 
            label="Nombre del Cajón"
            placeholder="Ingrese el nombre del cajón"
            aria-label="Nombre del cajón"
            value={nombre.value}
            onValueChanged={(evt) => (nombre.value = evt.detail.value)}
          />
          <TextField 
            label="Capacidad del Cajón"
            placeholder="Ingrese la capacidad del cajón"
            aria-label="Capacidad del cajón"
            value={capacidad.value}
            onValueChanged={(evt) => (capacidad.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button onClick={openDialog}>Editar</Button>
    </>
  );
}

//Guardar Objeto
function ObjetoEntryForm(props: ObjetoEntryFormProps) {
  const nombre = useSignal('');
  const tipo = useSignal('');
  const tamanio = useSignal('');
  const cajon = useSignal('');
  const createObjeto = async () => {
    try {
      if (nombre.value.trim().length > 0 && tipo.value.trim().length > 0 && tamanio.value.trim().length > 0 && cajon.value.trim().length > 0) {
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
              }}
            >
              Cancelar
            </Button>
            <Button onClick={createObjeto} theme="primary">
              Crear
            </Button>

          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField label="Nombre del Objeto"
            placeholder="Ingrese el nombre del Objeto"
            aria-label="Nombre del Objeto"
            value={nombre.value}
            onValueChanged={(evt) => (nombre.value = evt.detail.value)}
          />
          <TextField label="Capacidad del Objeto"
            placeholder="Ingrese la capacidad del Objeto"
            aria-label="Capacidad del Objeto"
            value={nombre.value}
            onValueChanged={(evt) => (nombre.value = evt.detail.value)}
          />
        </VerticalLayout>
      </Dialog>
      <Button
        onClick={() => {
          dialogOpened.value = true;
        }}
      >
        Agregar
      </Button>
    </>
  );
}


//Lista de Cajones
export default function CajonView() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    CajonService.listAll().then(function (data) {
      console.log(data);
      setItems(data);
    });
  }, []);

  const deleteCajon = async (Cajon: Cajon) => {
    const confirmed = window.confirm(`¿Está seguro de que desea eliminar la estación con el código ${Cajon.nombre}?`);
    if (confirmed) {
      try {
        await CajonService.delete(Cajon.id);
        Notification.show('Estación eliminada exitosamente', {
          duration: 5000,
          position: 'bottom-end',
          theme: 'success'
        });
        callData();
      } catch (error) {
        console.error('Error al eliminar el cajon:', error);
        Notification.show('Error al eliminar el cajon', {
          duration: 5000,
          position: 'top-center',
          theme: 'error'
        });
      }
    }
  }

  const order = (event, columnId) => {
    const direction = event.detail.value;
    if (!direction) {
      CajonService.listAll().then(setItems);
    } else {
      var dir = (direction == 'asc') ? 1 : 2;
      CajonService.order(columnId, dir).then(setItems);
    }
  }

  const callData = () => {
    CajonService.listAll().then(function (data) {
      setItems(data);
    });
  }

  function indexLink({ model }: { model: GridItemModel<Cajon> }) {
    return (
      <span>
        <CajonEntryFormUpdate Cajon={model.item} onCajonUpdated={callData} />
      </span>
    );
  }

  function indexIndex({ model }: { model: GridItemModel<Cajon> }) {
    return (
      <span>
        {model.index + 1}
      </span>
    );
  }

  const criterio = useSignal('');
  const texto = useSignal('');
  const itemSelect = [
    {
      label: 'nombre',
      value: 'nombre',
    },
    {
      label: 'capacidad',
      value: 'capacidad',
    }
  ];
  const search = async () => {
    try {
      console.log(criterio.value + ' ' + texto.value);
      CajonService.search(criterio.value, texto.value, 0).then(function (data) {
        setItems(data);
      });

      criterio.value = '';
      texto.value = '';

      Notification.show('Busqueda realizada', { duration: 5000, position: 'bottom-end', theme: 'success' });
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  return (
    <main className="w-full h-full flex flex-col box-border gap-s p-m">
      <ViewToolbar title="Lista de Cajones">
        <Group>
          <CajonEntryForm onCajonCreated={callData} />
        </Group> 
        {/* Botón de agregar objeto dentro de una columna */}
        <Group>
          <ObjetoEntryForm onObjetoCreated={callData} />
        </Group>
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
            <Button
              theme="error"
              onClick={() => deleteCajon(item)}
            >
              Eliminar
            </Button>
          )}
        />
        <GridColumn
          header="Agregar Objeto"
          renderer={() => (
            <Button
              theme="primary"
              onClick={() => {
                const dialogOpened = useSignal(true);
                return (
                  <ObjetoEntryForm onObjetoCreated={callData} />
                );
              }}
            >
              Agregar Objeto
            </Button>
          )}
        />
      </Grid>
    </main>
  );
}
