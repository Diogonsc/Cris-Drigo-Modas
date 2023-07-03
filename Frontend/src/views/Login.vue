<template>
  <div class="login-container">
    <div class="col-form">
      <form @submit.prevent="submit">
        <p class="text-primary mb-2 mt-15">Faça seu login</p>
        <v-text-field
          v-model.lazy="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Usuário"
          append-inner-icon="mdi-email-outline"
          variant="outlined"
          density="compact"
          color="primary"
          class="text-field"
        ></v-text-field>

        <v-text-field
          v-model.lazy="password.value.value"
          :error-messages="password.errorMessage.value"
          @click:append-inner="show1 = !show1"
          :type="show1 ? 'text' : 'password'"
          label="Senha"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          variant="outlined"
          density="compact"
          color="primary"
          class="text-field"
        ></v-text-field>

        <button
          class="btn-submit"
          type="submit"
          variant="tonal"
          @click="submit"
        >
          Entrar
          <v-progress-circular
            v-if="loadingLogin"
            indeterminate
            color="white"
            :size="20"
            :width="2"
            class="ml-2"
          ></v-progress-circular>
        </button>
        <div>
          <button
            class="text-btn-forgout"
            variant="text"
            @click="handleResetPassword"
          >
            <v-progress-circular
              v-if="loadingForgout"
              indeterminate
              color="white"
              :size="20"
              :width="2"
              class="ml-2"
            ></v-progress-circular>
          </button>
        </div>
      </form>
    </div>
    <div class="alert-container">
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
            type="error"
            text="Usuário não encontrado! Verifique os dados e tente novamente."
          >
          </v-alert>
        </div>
      </transition>
    </div>
    <div class="col-image px-0">
      <v-img
        src="../../src/assets/img/logo-crisdrigo.jpg"
        height="100vh"
        width="auto"
        cover
      ></v-img>
    </div>
  </div>
</template>

<script>
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";

export default {
  name: "PageLogin",

  components: {},

  setup() {
    const loadingLogin = ref(false);
    const loadingForgout = ref(false);
    const router = useRouter();
    const show1 = ref(false);
    const alertMsg = ref(false);
    let dadosFiltrados = ref([]);

    // let users;

    const { handleSubmit } = useForm({
      validationSchema: {
        email(value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
          return "Por favor digite um e-mail válido.";
        },
        password(value) {
          if (value && value.length >= 6 && value !== "") return true;
          return "A senha deve ter no mínimo 6 caracteres.";
        },
      },
    });

    const email = useField("email");
    const password = useField("password");

    const submit = handleSubmit(async (values) => {
      loadingLogin.value = true;
      axios
        .post("http://localhost:8080/login", {
          email: values.email,
          password: values.password,
        })
        .then(function (response) {
          console.log(response);
          if (
            response.data.email === email.values &&
            response.data.password === password.values
          ) {
           setTimeout(() => {
            router.push('home')
            loadingLogin.value = false;
          }, 2500)
          }
        })
        .catch(function (error) {
          console.error(error);
          loadingLogin.value = false;
        });
    });

    return {
      email,
      password,
      loadingLogin,
      loadingForgout,
      submit,
      show1,
      alertMsg,
      dadosFiltrados,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 095px;
  grid-row-gap: 0px;
  background-color: #f5f5f5;
  position: relative;
}

.col-image {
  grid-area: 1 / 2 / 2 / 3;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
}

.col-image img {
  width: 100%;
  height: auto;
}

.alert-container {
  width: 600px;
  position: absolute;
  top: 10px;
  left: 25%;
  right: 25%;
  z-index: 999;
}

.col-form {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text-field {
  width: 21.25rem;
}

.text-field label {
  color: #460735;
  font-weight: 400;
}

.text-field .v-icon {
  color: #460735;
}

.text-primary {
  font-size: 1.25rem;
}

.text-btn-forgout {
  color: #460735;
  margin-top: 4rem;
}

.text-btn-account {
  color: #52526b;
  font-weight: 700;
  margin-top: 2rem;
}

.btn-submit {
  width: 21.25rem;
  padding: 0.75rem 1rem;
  background-color: #460735;
  color: #ffffff;
  border-radius: 4px;
}
</style>
