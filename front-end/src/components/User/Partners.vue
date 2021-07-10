<template>
  <div>
    <div v-for="(partner, index) in stages" :key="index" class="col q-pa-sm">
      <div class="row" style="justify-content: center">
        <q-card v-if="partner[0]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ partner[0].login }}</p>
            </div>

            <div>
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showUserDetail(partner[0])" />
            </div>
          </div>
        </q-card>
      </div>

      <div class="row" style="justify-content: center">
        <q-card v-if="partner[1]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ partner[1].login }}</p>
            </div>

            <div>
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showUserDetail(partner[1])" />
            </div>
          </div>
        </q-card>

        <q-card v-if="partner[2]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ partner[2].login }}</p>
            </div>

            <div>
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showUserDetail(partner[2])" />
            </div>
          </div>
        </q-card>
      </div>

      <div class="row" style="justify-content: center">
        <q-card v-if="partner[3]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ partner[3].login }}</p>
            </div>

            <div>
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showUserDetail(partner[3])" />
            </div>
          </div>
        </q-card>

        <q-card v-if="partner[4]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ partner[4].login }}</p>
            </div>

            <div>
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showUserDetail(partner[4])" />
            </div>
          </div>
        </q-card>

        <q-card v-if="partner[5]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ partner[5].login }}</p>
            </div>

            <div>
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showUserDetail(partner[5])" />
            </div>
          </div>
        </q-card>

        <q-card v-if="partner[6]" class="col-2 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row justify-center">
              <p>{{ partner[6].login }}</p>
            </div>

            <div>
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showUserDetail(partner[6])" />
            </div>
          </div>
        </q-card>
      </div>
    </div>

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

  selectedUser: User | null = null;

  showDetail = false;

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
    const userLogin = localStorage.getItem('login');
    if (userLogin) {
      this.stages = await getPartners(userLogin);
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
