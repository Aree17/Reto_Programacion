/*import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, DatePicker, Dialog, Grid, GridColumn, TextField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';
import { ObjetoService, TaskService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';
import { useGridDataProvider } from '@vaadin/hilla-react-crud';
import { useEffect, useState } from 'react';

export const config: ViewConfig = {
  title: 'Objeto',
  menu: {
    icon: 'vaadin:cube',
    order: 5,
    title: 'Objeto',
  },
};

type Objeto = {
  id: number;
  nombre: string;
  tipo: string;
  tamanio: string;
  cajon : string;

};

/*private Integer id;
    private String nombre;
    private TipoObjeto tipo;
    private TamanioObjeto tamanio;
    private Integer idCajon;

type ObjetoEntryFormProps = {
  onObjetoCreated?: () => void;
};

type ObjetoEntryFormPropsUpdate = {
  objeto: Objeto;
  onObjetoUpdated?: () => void;
};

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

  let listaPersona = useSignal<String[]>([]);
  useEffect(() => {
    VehiculoService.listPersonaCombo().then(data =>
      //console.log(data)
      listaPersona.value = data
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

// Actualizar Objeto
function ObjetoEntryFormUpdate(props: ObjetoEntryFormPropsUpdate) {
  const dialogOpened = useSignal(false);

  // Inicializa los campos con los datos de la Objeto
  const id = useSignal(props.Objeto?.id?.toString() || '');
  const nombre = useSignal(props.Objeto?.nombre || '');
  const capacidad = useSignal(props.Objeto?.capacidad || '');

  // Cuando se abre el diálogo, actualiza los valores
  const openDialog = () => {
    id.value = props.Objeto?.id?.toString() || '';
    nombre.value = props.Objeto?.nombre || '';
    capacidad.value = props.Objeto?.capacidad || '';
    dialogOpened.value = true;
  };

  const updateObjeto = async () => {
    try {
      if (nombre.value.trim().length > 0 && capacidad.value.trim().length > 0) {
        await ObjetoService.update(
          parseInt(id.value),
          nombre.value,
          capacidad.value
        );
        if (props.onObjetoUpdated) {
          props.onObjetoUpdated();
        }
        dialogOpened.value = false;
        Notification.show('Objeto editado', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo editar, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
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
        headerTitle="Editar Objeto"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button onClick={() => { dialogOpened.value = false; }}>Cancelar</Button>
            <Button onClick={updateObjeto} theme="primary">Registrar</Button>
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
      <Button onClick={openDialog}>Editar</Button>
    </>
  );
}


//Lista de Objetoes
export default function ObjetoView() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    ObjetoService.listAll().then(function (data) {
      console.log(data);
      setItems(data);
    });
  }, []);

  const deleteObjeto = async (Objeto: Objeto) => {
    //mensaje antes de eliminar
    const confirmed = window.confirm(`¿Está seguro de que desea eliminar la estación con el código ${Objeto.nombre}?`);

    if (confirmed) {
      try {
        await ObjetoService.delete(Objeto.id);
        Notification.show('Estación eliminada exitosamente', {
          duration: 5000,
          position: 'bottom-end',
          theme: 'success'
        });
        // Recargar la lista después de eliminar
        callData();
      } catch (error) {
        console.error('Error al eliminar la estación:', error);
        Notification.show('Error al eliminar la estación', {
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
      // Sin orden, mostrar lista original
      ObjetoService.listAll().then(setItems);
    } else {
      var dir = (direction == 'asc') ? 1 : 2;
      ObjetoService.order(columnId, dir).then(setItems);
    }
  }

  const callData = () => {
    ObjetoService.listAll().then(function (data) {
      //console.log(data);
      setItems(data);
    });
  }

  function indexLink({ model }: { model: GridItemModel<Objeto> }) {
    return (
      <span>
        <ObjetoEntryFormUpdate Objeto={model.item} onObjetoUpdated={callData} />
      </span>
    );
  }



  function indexIndex({ model }: { model: GridItemModel<Objeto> }) {
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
      ObjetoService.search(criterio.value, texto.value, 0).then(function (data) {
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

  function rendercapacidad({ model }: { model: GridItemModel<Objeto> }) {
    const capacidad = model.item.capacidad;
    switch (capacidad) {
      case 'ACTIVO':
        return <span>Activo</span>;
      case 'ENUSO':
        return <span>En Uso</span>;
      case 'FUERA_SERVICIO':
        return <span>Fuera de Servicio</span>;
      default:
        return <span>{capacidad}</span>;
    }
  }


  return (

    <main className="w-full h-full flex flex-col box-border gap-s p-m">

      <ViewToolbar title="Lista de Objetoes">
        <Group>
          <ObjetoEntryForm onObjetoCreated={callData} />
        </Group>
      </ViewToolbar>
      <HorizontalLayout theme="spacing">
        <Select
          items={itemSelect}
          value={criterio.value}
          onValueChanged={(evt) => (criterio.value = evt.detail.value)}
          placeholder="Selecione un criterio"></Select>
        {criterio.value === 'capacidad' ? (
          <Select
            items={[
              { label: 'Activo', value: 'ACTIVO' },
              { label: 'En Uso', value: 'ENUSO' },
              { label: 'Fuera de Servicio', value: 'FUERA_SERVICIO' },
            ]}
            value={texto.value}
            onValueChanged={(evt) => (texto.value = evt.detail.value)}
            placeholder="Seleccione el capacidad"
            style={{ width: '50%' }}
          />
        ) : (
          <>
            <TextField
              placeholder="Search"
              style={{ width: '50%' }}
              value={texto.value}
              onValueChanged={(evt) => (texto.value = evt.detail.value)}>
              <Icon slot="prefix" icon="vaadin:search" />
            </TextField>
          </>
        )}
        <Button onClick={search} theme="primary">
          BUSCAR
        </Button>
        <Button onClick={callData} theme="secondary">
          <Icon icon="vaadin:refresh" />
        </Button>
      </HorizontalLayout>
      <Grid items={items}>
        <GridColumn renderer={indexIndex} header="Nro" />
        <GridSortColumn onDirectionChanged={(e) => order(e, "nombre")} path="nombre" header="Objeto" />
        <GridSortColumn onDirectionChanged={(e) => order(e, "capacidad")} renderer={rendercapacidad} header="capacidad" />
        <GridColumn header="Acciones" renderer={indexLink} />
        {/*<GridColumn
          header="Eliminar"
          renderer={({ item }) => (
            <Button
              theme="error"
              onClick={() => deleteObjeto(item)}
            >
              Eliminar
            </Button>
          )}
        />*/}
      </Grid>
    </main>
  );
}
*/