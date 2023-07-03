yarn dev
<template>
  <v-row justify="center">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span class="text-h5">Debitos do cliente</span>
        <v-icon icon="mdi-close" @click="handleCloseModalTotalDevido"></v-icon>
      </v-card-title>
      <v-card-text>

         Cliente: {{ items.name }}

        <v-container>
          <div class="valor-total mb-5">
            <v-chip prepend-icon="mdi-currency-usd" :color="cor">
              R$: {{ totalDevido }}
            </v-chip>
          </div>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="valor"
                class="text-field"
                density="compact"
                variant="outlined"
                label="R$: Valor"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-space-between">
              <v-btn
                prepend-icon="mdi-plus"
                color="success"
                @click="handleAdcionarValorDebito"
                >Adicionar</v-btn
              >
              <v-btn
                prepend-icon="mdi-minus"
                color="red"
                @click="handleSubtrairValorDebito"
                >Subtrair</v-btn
              >
            </v-col>
          </v-row>
          <v-card-actions class="d-flex justify-center mt-10">
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
        </v-container>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";

export default {
  props: ["selectedClient"],
  emits: ['closeModalTotalDevido'],

  setup(props, { emit }) {
    const loading = ref(false);
    const totalDevido = ref(0);
    const valor = ref("");
    const items = props.selectedClient;

    console.log(items);
    totalDevido.value = items.valordevido;

    const submit = (values) => {
      loading.value = true;
      console.log(values);
      const clienteId = items.id;
      axios
        .put(`http://localhost:8080/cliente/${clienteId}/valordevido`, {
          valordevido: totalDevido.value,
        })
        .then((response) => {
          console.log("Cliente atualizado com sucesso");
          loading.value = false;
          setTimeout(() => {
            handleCloseModalTotalDevido()
          }, 2000)
        })
        .catch((error) => {
          console.error("Erro ao atualizar cliente:", error.response.data);
          loading.value = false;
          handleCloseModalTotalDevido()
        });
    };

    const handleAdcionarValorDebito = () => {
      const parsedValor = parseFloat(valor.value);
      if (!isNaN(parsedValor)) {
        totalDevido.value = Number(totalDevido.value) + parsedValor;
        valor.value = "";
        console.log(totalDevido.value);
      }
    };

    const handleSubtrairValorDebito = () => {
      const parsedValor = parseFloat(valor.value);
      if (!isNaN(parsedValor)) {
        totalDevido.value -= parsedValor;
        totalDevido.value = Math.max(totalDevido.value, 0);
        valor.value = "";
      }
    };

    const cor = computed(() => {
      if (totalDevido.value > 0) {
        return "red";
      } else if (totalDevido.value === 0) {
        return "green";
      } else {
        return "";
      }
    });

    const handleCloseModalTotalDevido = () => {
      emit("closeModalTotalDevido");
    };

    return {
      cor,
      valor,
      submit,
      loading,
      handleCloseModalTotalDevido,
      totalDevido,
      handleAdcionarValorDebito,
      handleSubtrairValorDebito,
      items,
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
