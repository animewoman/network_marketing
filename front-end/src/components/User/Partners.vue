<template>
  <div>
    <div v-if="currentStage && currentStage.length" class="col q-pa-sm">
      <q-toolbar-title class="q-pb-lg q-pa-none">Структура</q-toolbar-title>
      <q-toolbar-title class="text-center q-mb-lg bg-grey-4 text-accent">Этап {{ stageNumber }}</q-toolbar-title>

      <div class="row" style="justify-content: center">
        <q-card v-if="currentStage[0]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ currentStage[0].login }}</p>
            </div>

            <div>
              <q-btn
                label="Подробнее"
                icon="info"
                size="sm"
                color="primary"
                flat
                @click="showUserDetail(currentStage[0])"
              />
            </div>
          </div>
        </q-card>
      </div>

      <q-separator />

      <div class="row q-pt-sm" style="justify-content: center">
        <q-card v-if="currentStage[1]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ currentStage[1].login }}</p>
            </div>

            <div>
              <q-btn
                label="Подробнее"
                icon="info"
                size="sm"
                color="primary"
                flat
                @click="showUserDetail(currentStage[1])"
              />
            </div>
          </div>
        </q-card>

        <q-card v-if="currentStage[2]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ currentStage[2].login }}</p>
            </div>

            <div>
              <q-btn
                label="Подробнее"
                icon="info"
                size="sm"
                color="primary"
                flat
                @click="showUserDetail(currentStage[2])"
              />
            </div>
          </div>
        </q-card>
      </div>

      <q-separator />

      <div class="row q-pt-sm" style="justify-content: center">
        <q-card v-if="currentStage[3]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ currentStage[3].login }}</p>
            </div>

            <div>
              <q-btn
                label="Подробнее"
                icon="info"
                size="sm"
                color="primary"
                flat
                @click="showUserDetail(currentStage[3])"
              />
            </div>
          </div>
        </q-card>

        <q-card v-if="currentStage[4]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ currentStage[4].login }}</p>
            </div>

            <div>
              <q-btn
                label="Подробнее"
                icon="info"
                size="sm"
                color="primary"
                flat
                @click="showUserDetail(currentStage[4])"
              />
            </div>
          </div>
        </q-card>

        <q-card v-if="currentStage[5]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ currentStage[5].login }}</p>
            </div>

            <div>
              <q-btn
                label="Подробнее"
                icon="info"
                size="sm"
                color="primary"
                flat
                @click="showUserDetail(currentStage[5])"
              />
            </div>
          </div>
        </q-card>

        <q-card v-if="currentStage[6]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ currentStage[6].login }}</p>
            </div>

            <div>
              <q-btn
                label="Подробнее"
                icon="info"
                size="sm"
                color="primary"
                flat
                @click="showUserDetail(currentStage[6])"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <q-toolbar-title v-else class="text-negative">Вы не достигли этапа {{ stageNumber }}</q-toolbar-title>

    <q-dialog v-if="selectedUser" v-model="showDetail">
      <q-card class="q-pa-lg">
        <q-card-section class="q-pt-none">
          <q-toolbar-title class="background-title"> {{ selectedUser.fullName }} </q-toolbar-title>

          <div class="row q-pt-md">
            <q-input label="Логин" class="col-5 q-mx-sm" readonly :value="selectedUser.login">
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input label="Спонсор" class="col-5 q-mx-sm" readonly :value="selectedUser.parent">
              <template #prepend>
                <q-icon name="school" />
              </template>
            </q-input>

            <q-input
              class="col-5 q-mx-sm"
              label="Телефон"
              mask="(###)##-##-##"
              readonly
              unmasked-value
              :value="selectedUser.phone"
            >
              <template #prepend>
                <q-icon name="call" />
              </template>
            </q-input>

            <q-input label="Почта" class="col-5 q-mx-sm" readonly :value="selectedUser.email">
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input label="Регион" class="col-5 q-mx-sm" readonly :value="selectedUser.region">
              <template #prepend>
                <q-icon name="location_on" />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getPartners } from '@/service/Operations';
import { User } from '@/types/user';

@Component({
  name: 'Partners',
})
export default class Partners extends Vue {
  stages = [];
  currentStage = null;

  selectedUser: User | null = null;

  showDetail = false;

  stageNumber = 0;

  @Watch('$route.query')
  onQueryChange(query: any) {
    this.stageNumber = +query.stage;
    this.currentStage = this.stages[this.stageNumber - 1];
  }

  @Watch('showDetail')
  onShowDetail(showDetail: boolean) {
    if (!showDetail) {
      this.selectedUser = null;
    }
  }

  created() {
    this.fetchPartners();
  }

  async fetchPartners() {
    this.stageNumber = +this.$route.query.stage;
    const userLogin = localStorage.getItem('login');

    if (userLogin) {
      this.stages = await getPartners(userLogin);
      const stageIndex = this.stageNumber - 1;
      this.currentStage = this.stages[stageIndex];
    }
  }

  showUserDetail(user: User) {
    this.showDetail = true;
    this.selectedUser = { ...user };
  }
}
</script>

<style>
.small-text {
  font-size: 11px;
}

.background-title {
  text-align: center;
  background-color: rgba(82, 81, 81, 0.82);
  border-radius: 15px;
}

.background-card {
  background-color: #d9d9d9;
}
</style>
