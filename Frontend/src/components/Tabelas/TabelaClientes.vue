<template>
  <v-row class="d-flex justify-center">
    <div class="col-form v-col-sm-12 v-col-md-8 v-col-lg-6">
        <v-text-field
          class="search"
          v-model="filtro"
          density="compact"
          variant="outlined"
          label="Pesquisar..."
          prepend-inner-icon="mdi-magnify"
          color="primary"
        ></v-text-field>
    </div>
  </v-row>
  <v-card v-if="displayedItems.length > 0">
    <v-table class="table-clientes">
      <thead>
        <tr>
          <th class="text-center">Nome</th>
          <th class="text-center">Telefone</th>
          <th class="text-center" v-if="esconder === true">email</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayedItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.telefone }}</td>
          <td v-if="esconder === true">{{ item.email }}</td>
          <td class="d-flex justify-center align-center">
            <v-icon
              class="mr-2"
              icon="mdi-pencil"
              title="Editar"
              @click="handleOpenModalClientes(item)"
            ></v-icon>
            <v-icon
              class="mr-2"
              icon="mdi-currency-usd"
              title="Debito"
              @click="handleOpenModalTotalDevido(item)"
            ></v-icon>
            <v-icon
              class="ml-2"
              icon="mdi-delete"
              title="Excluir"
              @click="handleDeleteCliente(item)"
            ></v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="5"
      base-color="#460735"
    ></v-pagination>
  </v-card>

  <div class="texto-informativo" v-else>
    <p>Nenhum cliente cadastrado</p>
  </div>

  <v-dialog v-model="dialog" width="1024">
    <ModalClientes
      @closeModalClientes="handleCloseModalClientes(items)"
      :selectedClient="selectedClient"
    />
  </v-dialog>

  <v-dialog v-model="dialogTotal" width="1024">
    <ModalValorTotalDevido
      @closeModalTotalDevido="handleCloseModalTotalDevido"
      @getValuesClients="getValuesClients"
      :selectedClient="selectedClient"
    />
  </v-dialog>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import ModalClientes from "@/components/Modal/ModalClientes.vue";
import ModalValorTotalDevido from "@/components/Modal/ModalValorTotalDevido.vue";

export default {
  components: {
    ModalClientes,
    ModalValorTotalDevido,
  },
  setup() {
    const dialog = ref(false);
    const dialogTotal = ref(false);
    const items = ref([]);
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const selectedClient = ref(null);
    const filtro = ref('');
    const displayedItemsFiltered = ref([]);
    const esconder = ref(false)

    const totalItems = computed(() => {
      return items.value.length;
    });

    const totalPages = computed(() => {
      return Math.ceil(totalItems.value / itemsPerPage);
    });

    const displayedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return items.value.slice(startIndex, endIndex);
    });

    // ...

    const getValuesClients = () => {
      axios
        .get("http://localhost:8080/clientes")
        .then(function (response) {
          items.value = response.data.filter((client) => {
            const filtroLowerCase = filtro.value ? filtro.value.toLowerCase() : "";
            return (
              client.name && client.name.toLowerCase().includes(filtroLowerCase)
            );
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    };


    setInterval(() => {
      watchEffect(() => {
        getValuesClients();
      });
    }, 2000);

    const handleOpenModalClientes = (item) => {
      selectedClient.value = item;
      dialog.value = true;
    };

    const handleCloseModalClientes = () => {
      dialog.value = false;
    };

    const handleOpenModalTotalDevido = (item) => {
      selectedClient.value = item;
      dialogTotal.value = true;
    };

    const handleCloseModalTotalDevido = () => {
      dialogTotal.value = false;
    };

    const handleDeleteCliente = (cliente) => {
      if (cliente) {
        Swal.fire({
          title: `Deseja realmente excluir <br> ${cliente.name}`,
          text: "Essa ação é irreversivél.",
          showCancelButton: true,
          confirmButtonText: "Ecluir",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://localhost:8080/deletecliente/${cliente.id}`)
              .then((response) => {
                getValuesClients();
              })
              .catch((error) => {
                console.error("Erro ao deletar:", error);
              });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Excluido com sucesso!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    };

    const filtrarTabela = () => {
    const filtroLowerCase = filtro.value ? filtro.value.toLowerCase() : "";
    displayedItemsFiltered.value = items.value.filter((client) => {
      const includesFilter =
        client.name && client.name.toLowerCase().includes(filtroLowerCase);
      return includesFilter;
    });
  };

    watchEffect(() => {
      filtrarTabela();
    });

    const handleWindowResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 650) {
        esconder.value = false;
      } else {
        esconder.value = true;
      }
    };

    watchEffect(() => {
      handleWindowResize();
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    });

    return {
      esconder,
      filtro,
      dialog,
      dialogTotal,
      items,
      itemsPerPage,
      currentPage,
      totalItems,
      totalPages,
      displayedItems,
      getValuesClients,
      handleOpenModalClientes,
      handleCloseModalClientes,
      ModalClientes,
      handleDeleteCliente,
      handleOpenModalTotalDevido,
      handleCloseModalTotalDevido,
      selectedClient,
      filtrarTabela,
      displayedItemsFiltered,
    };
  },
};
</script>

<style scoped>
tr:hover {
  background: #46073511;
}
</style>
