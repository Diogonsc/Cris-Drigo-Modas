<template>
  <v-container>
    <div class="home-container text-center">
      <div class="btn-novo-cliente">
        <v-btn
          prepend-icon="mdi-account"
          color="primary"
          @click="handleOpenModalNovoCliente"
        >
          Novo cliente</v-btn
        >
      </div>
      <TabelaClientes />
    </div>
  </v-container>
  <v-dialog v-model="dialogNovoCliente" width="1024">
    <ModalNovoCliente @closeModalClienteNovo="handleCloseModalNovoCliente" />
  </v-dialog>
</template>

<script>
import TabelaClientes from "@/components/Tabelas/TabelaClientes.vue";
import ModalNovoCliente from "@/components/Modal/ModalNovoCliente.vue";
import { ref } from "vue";

export default {
  components: {
    TabelaClientes,
    ModalNovoCliente,
  },

  setup() {
    const dialogNovoCliente = ref(false);

    const handleOpenModalNovoCliente = () => {
      dialogNovoCliente.value = true;
    };

    const handleCloseModalNovoCliente = () => {
      dialogNovoCliente.value = false;
    };

    return {
      dialogNovoCliente,
      TabelaClientes,
      handleOpenModalNovoCliente,
      handleCloseModalNovoCliente,
    };
  },
};
</script>

<style scoped>
.btn-novo-cliente {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
</style>
