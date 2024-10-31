<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Tourney - a tournament app! </q-toolbar-title>
        <q-btn color="green">Create</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="q-pa-md">
        <q-avatar class="q-pa-xs" style="display: inline-block">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <p style="display: inline-block; margin: 15px 0px 0px 30px">
          Hello, User!
          <!-- {{ user?.username }} -->
          <!-- Wew, use '?' -->
        </p>
        <hr class="q-mt-md" />
      </div>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-item>
          <q-item-section>
            <q-item-label></q-item-label>
            <q-item-label caption>App Ver. 1.0</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout',
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Github',
    caption: 'github.com/SumitJoshii',
    icon: 'code',
    link: 'https://github.com/SumitJoshii',
  },
  {
    title: 'Developer',
    caption: 'Connect with the Dev Team',
    icon: 'web',
    link: 'https://www.linkedin.com/in/sumit-joshi1/',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
