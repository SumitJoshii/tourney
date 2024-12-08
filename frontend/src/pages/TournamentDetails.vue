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
          <div
            class="q-pa-md"
            style="margin: auto; min-width: 600px; max-width: 900px"
          >
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              :rows="rows"
              :columns="columns"
              row-key="name"
            >
              <template v-slot:body-cell-name="props">
                <q-td :props="props">
                  <div class="hover-edit-cell">
                    <span>{{ props.row.team.name }}</span>
                    <q-btn
                      class="edit-button"
                      color="black"
                      icon="edit"
                      round
                      size="xs"
                      @click="openNameEditForm(props.row.team)"
                    ></q-btn>
                  </div>
                </q-td>
              </template>
            </q-table>
            <div class="finishTournament">
              <q-btn
                class="q-pa-md"
                color="primary"
                size="small"
                label="Finish Tournament"
                @click="getWinner()"
              />

              <q-tooltip transition-show="rotate" transition-hide="rotate">
                Click to see the winner.</q-tooltip
              >
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel
          name="matches"
          style="margin: auto; min-width: 600px; max-width: 900px"
        >
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
          <div v-if="tournamentWinner">
            <div style="width: fit-content; margin: auto; padding: 10px">
              <q-img
                src="../assets/images/trophy.png"
                :ratio="1"
                style="height: 50px; width: 50px"
              ></q-img>
            </div>
            <div style="width: fit-content; margin: auto">
              <p style="font-size: large">
                Congrats {{ tournamentWinner }}, for winning the tournament!!
              </p>
            </div>
          </div>
          <div v-else>
            <p style="text-align: center; font-size: large; color: gray">
              Tournament yet to be finished
            </p>
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
          :label="`Score of ${selectedMatch.team1.name}`"
        />
        <q-input
          v-model="selectedMatch.score_team2"
          type="number"
          :label="`Score of ${selectedMatch.team2.name}`"
        />
      </q-card-section>
      <q-card-section>
        <q-btn label="Save" @click="saveScore()" />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Team</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="teamName" label="Team Name" autofocus />
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" label="Save" @click="updateNameChange" />
        <q-btn color="grey" label="Cancel" @click="showEditDialog = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Table } from 'src/models/table';
import { onMounted, ref } from 'vue';
import { QTableProps } from 'quasar';
import { Match } from 'src/models/match';
import useMatchApi from 'src/api/match';
import useTournamentApi from 'src/api/tournament';
import { useRoute } from 'vue-router';
import { TeamWithoutTournament } from 'src/models/team';
import confetti from 'canvas-confetti';

const tab = ref('table');
const matches = ref<Match[]>([]);
const matchApi = useMatchApi();
const tournamentApi = useTournamentApi();
const route = useRoute();
const tournamentId = ref(0);
const showMatchEditForm = ref(false);
const selectedMatch = ref<Match>();
const showEditDialog = ref(false);
const selectedTeam = ref<TeamWithoutTournament>();
const teamName = ref('');
let tournamentWinner = ref();
const tournamentWinnerId = ref<number>();

onMounted(async () => {
  console.log('Route data: ', route.params, route);
  tournamentId.value = Number(route.params.id);

  const tournament = await tournamentApi.getTournament(tournamentId.value);
  tournamentWinner.value = tournament.winner;
  await getMatches();
  await getTableInfo();
});

const openMatchEditForm = (match: Match) => {
  showMatchEditForm.value = true;
  selectedMatch.value = match;
};

const saveScore = async () => {
  console.log('selected Match: ', selectedMatch.value);
  if (selectedMatch.value) {
    await matchApi.saveScore(tournamentId.value, selectedMatch.value);
  }
  await getMatches();
  await getTableInfo();
  showMatchEditForm.value = false;
};

const getMatches = async () => {
  matches.value = await matchApi.getMatches(tournamentId.value);
  console.log('matches data: ', matches.value);
};

const getTableInfo = async () => {
  rows.value = await tournamentApi.getTableInfo(tournamentId.value);
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

const openNameEditForm = (team: TeamWithoutTournament) => {
  selectedTeam.value = team; // Set the selected team
  teamName.value = team.name;
  showEditDialog.value = true;
};

const updateNameChange = async () => {
  if (selectedTeam.value) {
    selectedTeam.value.name = teamName.value;
    await tournamentApi.updateTeamName(tournamentId.value, selectedTeam.value);
    getMatches();

    console.log(tournamentWinnerId.value, '---', selectedTeam.value.id);
    if (tournamentWinnerId.value == selectedTeam.value.id) {
      getWinner();
    }

    showEditDialog.value = false; // Close the dialog after saving
    console.log('Name Updated :', teamName.value);
  } else {
    console.error('No team selected for editing.');
    showEditDialog.value = false;
  }
};
const getWinner = async () => {
  const winnerName = rows.value[0].team.name;
  tournamentWinnerId.value = rows.value[0].team.id;
  await tournamentApi.updateTournamentWinner(tournamentId.value, winnerName);

  console.log('Winner updated: ', tournamentWinnerId, '-- ', winnerName);

  tournamentWinner.value = winnerName;
  //debounce
  setTimeout(() => {
    tab.value = 'winner';

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 500);
  }, 800);
};

// table
// TS is the Best. Read

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'center',
    field: (row: Table) => row.team.name,
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
  {
    name: 'cumulative_deciding_factor',
    align: 'center',
    label: 'CDF',
    field: 'cumulative_deciding_factor',
    sortable: true,
  },
];

const rows = ref<Table[]>([]);
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

.finishTournament {
  width: fit-content;
  margin: auto;
  margin-top: 10px;
}

.hover-edit-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.edit-button {
  opacity: 0; /* Hidden by default */
  margin-left: 10px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  transition: display 1s ease;
}

.hover-edit-cell:hover .edit-button {
  opacity: 1; /* Show on hover */
}

.q-tab {
  width: 150px;
}
</style>
