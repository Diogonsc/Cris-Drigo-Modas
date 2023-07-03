<template>
  <v-row justify="center">
    <v-card>
      <div class="d-flex justify-center mt-3">
        <span class="text-h5">Adicionar Novo Cliente</span>
      </div>
      <div class="pa-2">
        <v-container class="pa-0">
          <form ref="form" @submit.prevent="submit">
            <v-row>
              <div class="py-1 pt-3 v-col-sm-12 v-col-md-8 v-col-lg-12">
                <v-text-field
                  v-model.lazy="formValues.name"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Nome"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-8">
                <v-text-field
                  v-model.lazy="formValues.email"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="E-mail"
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-4">
                <v-text-field
                  v-model.lazy="formValues.telefone"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Telefone"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-4">
                <v-text-field
                  v-model.lazy="formValues.cep"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="CEP"
                  required
                  @change="buscarDadosViaCEP(formValues.cep)"
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-8">
                <v-text-field
                  v-model.lazy="formValues.endereco"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Endereço"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-4">
                <v-text-field
                  v-model.lazy="formValues.numero"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Número"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 v-col-sm-12 v-col-md-8 v-col-lg-8">
                <v-text-field
                  v-model.lazy="formValues.bairro"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Bairro"
                  required
                ></v-text-field>
              </div>
              <div class="py-1 pb-5 v-col-sm-12 v-col-md-8 v-col-lg-4">
                <v-text-field
                  v-model.lazy="formValues.valordevido"
                  class="text-field"
                  density="compact"
                  variant="outlined"
                  label="Valor do débito"
                  required
                ></v-text-field>
              </div>
            </v-row>
            <v-card-actions class="d-flex justify-space-between">
              <v-btn
                color="primary"
                variant="outlined"
                @click="handleCloseModalNovoCliente"
                >Voltar</v-btn
              >
              <v-btn color="primary" variant="outlined" type="submit">
                Cadastrar
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  color="primary"
                  size="20"
                  width="2"
                  class="ml-2"
                ></v-progress-circular>
              </v-btn>
            </v-card-actions>
          </form>
        </v-container>
      </div>
    </v-card>
  </v-row>
  <div class="alert">
    <transition name="fade">
      <div
        v-if="alertMsg"
        class="alert-msg animate__animated animate__fadeInDown"
      >
        <v-alert
          v-model="alertMsg"
          variant="elevated"
          closable
          close-label="Close Alert"
          type="success"
          text="Cliente adicionado."
        ></v-alert>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import "animate.css";
import Swal from "sweetalert2";

export default {
  emits: ['closeModalClienteNovo'],

  setup(props, { emit }) {
    const loading = ref(false);
    const formValues = ref({});
    const alertMsg = ref(false);

    const submit = () => {
      loading.value = true;
      const values = formValues.value;

      axios
        .post("http://localhost:8080/novocliente", values)
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cliente adcionado com sucesso!",
            showConfirmButton: false,
            timer: 1500,
          });
          loading.value = false;
          handleCloseModalNovoCliente();
          getValuesClients();
        })
        .catch((error) => {
          loading.value = false;
          console.error("Erro ao adicionar cliente:", error);
        });
    };

    const handleCloseModalNovoCliente = () => {
      emit("closeModalClienteNovo");
    };

    const getValuesClients = () => {
      emit("getValuesClients");
    };

    const buscarDadosViaCEP = async (cep) => {
      try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(url);
        const data = await response.json();
        formValues.value.endereco = data.logradouro;
        formValues.value.bairro = data.bairro;
      } catch (error) {
        console.error("Erro ao buscar os dados do CEP:", error);
        throw error;
      }
    };

    return {
      submit,
      loading,
      alertMsg,
      formValues,
      handleCloseModalNovoCliente,
      buscarDadosViaCEP,
      getValuesClients,
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

.alert {
  width: auto;
  position: absolute;
  top: 10px;
  left: 25%;
  right: 25%;
  z-index: 999;
}
</style>
