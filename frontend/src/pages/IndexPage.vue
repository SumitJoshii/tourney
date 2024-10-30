<template>
  <q-page class="q-pl-md">
    <h3>Welcome to Tourney!</h3>
    <p>
      There are quite a few different ways to run tournaments, but there are
      about 5 formats that are far more popular than the rest.
    </p>
    <ul>
      <li>Single Elimination Tournament</li>
      <li>Double Elimination Tournament</li>
      <li>Round Robin</li>
      <li>Double Round Robin</li>
      <li>Consolation Tournaments</li>
    </ul>
    <q-btn color="green" @click="showCreateForm">Create a tournament!</q-btn>

    <q-dialog v-model="showCreateFormModal">
      <q-card>
        <p class="q-pa-md q-mb-xs text-center">Create a Tournament.</p>
        <hr />
        <q-card-section>
          <q-input
            v-model="newTournament.tournament_name"
            label="Tournament Name"
          />
          <q-select
            v-model="newTournament.player_count"
            :options="playerOptions"
            label="Number of Players"
          />
          <q-select
            v-model="newTournament.tournament_type"
            :options="tournamentOptions"
            label="Tournament Type"
          />
        </q-card-section>
        <q-card-section>
          <q-btn label="Create" @click="addTournament()" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useTournamentApi from "src/api/tournamentApi";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const tournamentApi = useTournamentApi();
const tournamentOptions = ref(["one", "two"]);
const playerOptions = ref(["2", "3", "4"]);
const showCreateFormModal = ref(false);
const newTournament = ref({
  tournament_name: "",
  player_count: "",
  tournament_type: "",
});

onMounted(async () => {
  tournamentOptions.value = await tournamentApi.getTournaments();
  console.log(tournamentOptions);
});

const showCreateForm = async () => {
  showCreateFormModal.value = true;
};

const addTournament = async () => {
  showCreateFormModal.value = false;
  router.push({ path: "/match/matches/", params: { newTournament } });
};
</script>
