<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="align-items: centre">
      <q-card>
        <q-tabs v-model="tab" indicator-color="purple" class="text-teal">
          <q-tab name="table" icon="table_chart" label="Points Table" />
          <q-tab name="matches" icon="diversity_2" label="Matchup" />
          <q-tab name="winner" icon="emoji_events" label="Winner" />
        </q-tabs>
        <q-separator />

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
            <div
              class="q-pa-md items-start q-gutter-md"
              style="margin: auto; width: 50%"
            >
              <q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section>
              </q-card>
              <q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section> </q-card
              ><q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section> </q-card
              ><q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section> </q-card
              ><q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section> </q-card
              ><q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section> </q-card
              ><q-card dark bordered class="bg-grey-9 my-card">
                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                  {{ lorem }}
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="winner" style="margin: auto; width: 70%">
            <div>
              <div style="width: fit-content; margin: auto; padding: 10px">
                <q-img
                  src="../images/trophy.png"
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
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("table"),
      columns,
      rows,
    };
  },
};

// table

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "played",
    align: "center",
    label: "Played",
    field: "played",
  },
  { name: "won", align: "center", label: "Won", field: "won" },
  { name: "lost", align: "center", label: "Lost", field: "lost" },
  { name: "tie", align: "center", label: "Tie", field: "tie" },
  {
    name: "points",
    align: "center",
    label: "Points",
    field: "points",
    sortable: true,
  },
];

const rows = [
  {
    name: "Sumit",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Shubham",
    played: 5,
    won: 3,
    lost: 2,
    tie: 0,
    points: 4,
  },
  {
    name: "Rahul",
    played: 5,
    won: 4,
    lost: 1,
    tie: 0,
    points: 7,
  },
  {
    name: "Player 1",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Player 2",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Player 3",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Player 4",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Player 5",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Player 6",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Player 7",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Player 8",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
  {
    name: "Player 9",
    played: 5,
    won: 2,
    lost: 2,
    tie: 1,
    points: 4,
  },
];
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 340px


  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #04dbbf

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
