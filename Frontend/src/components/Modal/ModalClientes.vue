yarn dev<template>
  <v-row justify="center">
    <v-card>
      <div class="d-flex justify-center mt-3">
        <span class="text-h5">Informações do cliente</span>
      </div>

        <v-container>
          <form @submit.prevent="submit">
            <v-row>
              <div class="py-1 pt-5 v-col-sm-12 v-col-md-8 v-col-lg-12">
                <v-text-field
                v-model="items.name"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Nome"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-8">
                <v-text-field
                v-model="items.email"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="E-mail"
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-4">
                <v-text-field
                v-model="items.telefone"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Telefone"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-4">
                <v-text-field
                v-model="items.cep"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="CEP"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-8">
                <v-text-field
                v-model="items.endereco"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Endereço"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-4">
                <v-text-field
                v-model="items.numero"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Número"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 pb-5 v-col-sm-12 v-col-md-8 v-col-lg-8">
                <v-text-field
                v-model="items.bairro"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Bairro"
                  required
                ></v-text-field>
              </div>
            </v-row>
            <v-card-actions class="d-flex justify-space-between">
              <v-btn color="primary" variant="outlined" @click="handleCloseModalClientes"> Voltar </v-btn>
              <v-btn color="primary" variant="outlined" @click="submit">
                Salvar alterações
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  color="primary"
                  :size="20"
                  :width="2"
                  class="ml-2"
                ></v-progress-circular
              ></v-btn>
            </v-card-actions>
          </form>
        </v-container>
    </v-card>
  </v-row>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  props:['selectedClient'],
  emits: ['closeModalClientes'],

  setup(props, { emit }) {
    const loading = ref(false);
    const items = props.selectedClient

    const submit = (values) => {
      loading.value = true;
      const idCliente = items.id
      axios.put(`http://localhost:8080/cliente/${idCliente}`,  {
          name: items.name,
          email: items.email,
          telefone: items.telefone,
          cep: items.cep,
          endereco: items.endereco,
          numero: items.numero,
          bairro: items.bairro,
        })
      .then((response) => {
        console.log('cliente atualizado com sucesso!')
        handleCloseModalClientes();
      })

    };

    const handleCloseModalClientes = () => {
      emit("closeModalClientes");
    };

    return {
      items,
      submit,
      loading,
      handleCloseModalClientes,
    };
  },
};
</script>

<style scoped>
.v-input {
  height: 48px;
}
.text-field label {
  color: #460735;
  font-weight: 400;
}
</style>
