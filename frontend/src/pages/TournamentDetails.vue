<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-y-md" style="align-items: centre">
      <q-tabs v-model="tab" indicator-color="purple" class="text-teal">
        <q-tab name="table" icon="table_chart" label="Points Table" />
        <q-tab name="matches" icon="diversity_2" label="Matchup" />
        <q-tab name="winner" icon="emoji_events" label="Winner" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="table">
          <div class="q-pa-md" style="margin: auto; width: 50%">
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              :rows="rows"
              :columns="columns"
              row-key="name"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="matches">
          <div class="row q-col-gutter-md">
            <div class="col-6" v-for="(match, index) in matches" :key="index">
              <q-card bordered class="hover-card">
                <q-btn
                  color="black"
                  icon="edit"
                  round
                  size="xs"
                  class="hover-edit"
                  @click="openMatchEditForm(match)"
                ></q-btn>
                <q-card-section class="row items-center justify-evenly">
                  <div class="col-4">
                    {{ match.team1.name }}
                  </div>
                  <div class="col-4 text-center">
                    {{ match.score_team1 || '--' }}
                  </div>
                  <div class="col-4 text-center">
                    {{
                      getDecidingFactor(
                        match.team1,
                        match.winner,
                        match.deciding_factor
                      )
                    }}
                  </div>
                  <div class="col-1 text-center text-caption">vs</div>
                  <div class="col-11">
                    <q-separator />
                  </div>
                  <div class="col-4">
                    {{ match.team2.name }}
                  </div>
                  <div class="col-4 text-center">
                    {{ match.score_team2 || '--' }}
                  </div>
                  <div class="col-4 text-center">
                    {{
                      getDecidingFactor(
                        match.team2,
                        match.winner,
                        match.deciding_factor
                      )
                    }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="winner" style="margin: auto; width: 70%">
          <div>
            <div style="width: fit-content; margin: auto; padding: 10px">
              <q-img
                src="../assets/images/trophy.png"
                :ratio="1"
                style="height: 50px; width: 50px"
              ></q-img>
            </div>
            <div style="width: fit-content; margin: auto">
              <p style="font-size: large">
                Congrats [player-name], for winning the tournament!!
              </p>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
  <q-dialog v-model="showMatchEditForm">
    <q-card>
      <p class="q-pa-md q-mb-xs text-center">Edit Score</p>
      <hr />
      <q-card-section v-if="selectedMatch">
        <q-input
          v-model="selectedMatch.score_team1"
          type="number"
          label="Score of Team 1:"
        />
        <q-input
          v-model="selectedMatch.score_team2"
          type="number"
          label="Score of Team 2:"
        />
      </q-card-section>
      <q-card-section>
        <q-btn label="Save" @click="saveScore()" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Table } from 'src/models/table';
import { onMounted, ref } from 'vue';
import { QTableProps } from 'quasar';
import { Match } from 'src/models/match';
import useMatchApi from 'src/api/match';
import { useRoute } from 'vue-router';
import { TeamWithoutTournament } from 'src/models/team';

const tab = ref('table');
const matches = ref<Match[]>([]);
const matchApi = useMatchApi();
const route = useRoute();
const tournamentId = ref(0);
const showMatchEditForm = ref(false);
const selectedMatch = ref<Match>();

onMounted(async () => {
  console.log('Route data: ', route.params, route);
  tournamentId.value = Number(route.params.id);
  await getMatches();
});

const openMatchEditForm = (match: Match) => {
  showMatchEditForm.value = true;
  selectedMatch.value = match;
};

const saveScore = async () => {
  console.log(selectedMatch.value);
  if (selectedMatch.value) {
    await matchApi.saveScore(tournamentId.value, selectedMatch.value);
  }
  showMatchEditForm.value = false;
};

const getMatches = async () => {
  matches.value = await matchApi.getMatches(tournamentId.value);
  console.log('matches data: ', matches.value);
};

const getDecidingFactor = (
  team: TeamWithoutTournament,
  winner: TeamWithoutTournament,
  deciding_factor: number
) => {
  if (winner && winner.id) {
    return winner.id === team.id ? deciding_factor : -deciding_factor;
  }
  return '--';
};

// table
// TS is the Best. Read

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'center',
    field: (row: Table) => row.name,

    sortable: true,
  },
  {
    name: 'played',
    align: 'center',
    label: 'Played',
    field: 'played',
  },
  { name: 'won', align: 'center', label: 'Won', field: 'won' },
  { name: 'lost', align: 'center', label: 'Lost', field: 'lost' },
  { name: 'tie', align: 'center', label: 'Tie', field: 'tie' },
  {
    name: 'points',
    align: 'center',
    label: 'Points',
    field: 'points',
    sortable: true,
  },
];

const rows: Table[] = [
  {
    name: 'Sumit',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Shubham',
    played: 5,
    won: 3,
    lost: 2,
    tie: 0,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Rahul',
    played: 5,
    won: 4,
    lost: 1,
    tie: 0,
    points: 7,
    decision_factor: 0,
  },
  {
    name: 'Player 1',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Player 2',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Player 3',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Player 4',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Player 5',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Player 6',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Player 7',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Player 8',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
  {
    name: 'Player 9',
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
    decision_factor: 0,
  },
];
</script>

<style scoped>
.hover-card {
  position: relative;
}

.hover-edit {
  position: absolute;
  top: -10px;
  right: -10px;
  display: none;
  z-index: 101;
}

.hover-card:hover .hover-edit {
  display: inline-flex;
}
</style>
