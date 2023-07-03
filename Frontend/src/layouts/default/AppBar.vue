<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <span>Cris & Drigo Modas</span>

    <v-spacer></v-spacer>

    <v-btn class="text-none" variant="text" prepend-icon="mdi-logout" @click="handleLogout">Sair</v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list density="default" nav>
      <v-list-item
      base-color="primary"
      prepend-icon="mdi-view-dashboard"
      class="align-self-center"
      title="HOME"
      value="home"
      @click="router.push('home')"
    ></v-list-item>

      <v-list-item
      base-color="primary"
      prepend-icon="mdi-account"
      class="align-self-center"
      title="CADASTRAR USUARIO"
      value="cadastrar usuário"
      @click="router.push('cadastrar-usuario')"
    ></v-list-item>

    <v-list-item
    base-color="primary"
    prepend-icon="mdi-barcode-scan"
      class="align-self-center"
      title="CADASTRAR PRODUTOS"
      value="cadastrar produto"
      @click="router.push('cadastrar-produto')"
    ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {

  setup() {
    const drawer = ref(false);
    const router = useRouter()

    const handleLogout = () => {
      router.push('/login')
    }

    return {
      drawer,
      router,
      handleLogout,
    };
  },
};
</script>
