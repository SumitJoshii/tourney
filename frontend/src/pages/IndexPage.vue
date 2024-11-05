<template>
  <q-page class="q-pl-md" style="margin: auto; width: 70%">
    <!-- Table -->
    <div
      class="q-pa-md q-mt-lg"
      style="margin: auto; min-width: 600px; max-width: 900px; margin-top: 20px"
    >
      <q-table
        flat
        bordered
        :rows="tournaments"
        :columns="columns"
        row-key="id"
        :filter="filter"
        @row-click="onRowClick"
      >
        <template v-slot:top-left>
          <div style="display: flex; height: 25px">
            <div style="font-size: large">Tournaments</div>
            <div>
              <q-img
                src="../assets/images/info.png"
                :ratio="1"
                style="
                  height: 15px;
                  width: 15px;
                  margin-left: 4px;
                  margin-top: 4px;
                "
              ></q-img>
              <q-tooltip>
                <p>
                  There are quite a few different ways to run tournaments, but
                  there are about 5 formats that are far more popular than the
                  rest.
                </p>
                <ul>
                  <li>Single Elimination Tournament</li>
                  <li>Double Elimination Tournament</li>
                  <li>Round Robin</li>
                  <li>Double Round Robin</li>
                  <li>Consolation Tournaments</li>
                </ul>
              </q-tooltip>
            </div>
          </div>
        </template>
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn class="q-ml-md" color="green" @click="showCreateForm"
            >Create!</q-btn
          >
        </template>
      </q-table>
    </div>

    <q-dialog v-model="showCreateFormModal">
      <q-card>
        <p class="q-pa-md q-mb-xs text-center">Create a Tournament.</p>
        <hr />
        <q-card-section>
          <q-input v-model="newTournament.name" label="Tournament Name" />
          <q-input
            type="number"
            v-model="newTournament.number_of_teams"
            label="Number of Players"
          />
          <q-select
            v-model="newTournament.type"
            :options="tournamentTypes"
            option-label="name"
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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useTournamentApi from 'src/api/tournament';

import { useRouter } from 'vue-router';
import { Tournament, TournamentType } from 'src/models/tournament';

import { QTableProps } from 'quasar';

const router = useRouter();

const tournamentApi = useTournamentApi();
const tournamentTypes = ref<TournamentType[]>([]);
const showCreateFormModal = ref(false);
const dateNow = new Date();
const newTournament = ref<Tournament>({
  name: '',
  number_of_teams: 0,
  type: {
    name: '',
    description: '',
  },
  start_date: dateNow.toISOString().split('T')[0],
  end_date: dateNow.toISOString().split('T')[0],
  is_finished: false,
  winner: null,
});

const tournaments = ref<Tournament[]>([]);
const filter = ref('');

//blank issue:
// beforeRouteEnter(to, from, next) => {
//     next(vm => {
//       vm.initializeData(); // Call method that contains your onMounted logic
//     });
//   }

onMounted(async () => {
  tournamentTypes.value = await tournamentApi.getTournamentTypes();
  tournaments.value = await tournamentApi.getTournaments();
  console.log('All tournaments: ', tournaments.value);
  console.log('Tournament options: ', tournamentTypes.value);
});

const showCreateForm = async () => {
  showCreateFormModal.value = true;
};

const addTournament = async () => {
  showCreateFormModal.value = false;
  const response = await tournamentApi.createTournament(newTournament.value);

  void router.push({
    name: 'tournament/TournamentDetails',
    params: { id: response.id },
  });
};

const onRowClick = async (evt: Event, row: Tournament) => {
  void router.push({
    name: 'tournament/TournamentDetails',
    params: { id: row.id },
  });
};

// Table
const columns: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'center',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'center',
    field: 'name',
    sortable: true,
  },
  {
    name: 'start_date',
    align: 'center',
    label: 'Start Date',
    field: 'start_date',
  },
  {
    name: 'end_date',
    align: 'center',
    label: 'End Date',
    field: 'end_date',
  },
  {
    name: 'number_of_teams',
    align: 'center',
    label: 'No. Of Teams',
    field: 'number_of_teams',
    sortable: true,
  },
  {
    name: 'type',
    align: 'center',
    label: 'Type',
    field: (row: Tournament) => row.type.name,
    sortable: true,
  },
];
</script>
