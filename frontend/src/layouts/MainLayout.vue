<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div @click="goToHome()" style="display: flex; align-items: center">
          <q-img
            src="../assets/images/tournament.png"
            :ratio="1"
            style="height: 40px; width: 40px"
            class="q-ml-md"
          ></q-img>
          <q-toolbar-title> Tourney - a tournament app! </q-toolbar-title>
        </div>

        <div
          style="
            display: flex;
            align-items: center;
            margin-left: auto;
            margin-right: 15px;
          "
          @click="goToAbout()"
        >
          <q-img
            src="../assets/images/info-white.png"
            :ratio="1"
            style="height: 20px; width: 20px; margin-right: 4px"
          ></q-img>
          <div style="color: white; font-size: large">about</div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
defineOptions({
  name: 'MainLayout',
});

const goToAbout = () => {
  router.push({ name: 'about' });
};
const goToHome = () => {
  router.push({ name: 'index' });
};
</script>
