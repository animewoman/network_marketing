<template>
  <div>
    <q-expansion-item
      v-for="(partner, index) in stages"
      :key="index"
      class="shadow-1 overflow-hidden q-my-sm background-card"
      style="border-radius: 30px"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <template #header>
        <q-toolbar-title> Этап #{{ index + 1 }} </q-toolbar-title>
      </template>

      <div class="col q-pa-sm">
        <div class="row" style="justify-content: center">
          <q-card v-if="partner[0]" class="col-2 q-ma-sm q-px-md">
            <div class="self-center full-width no-outline" tabindex="0">
              <div class="row">
                <div class="q-pt-sm">
                  <p class="small-text">Логин</p>
                  <p class="small-text">Спонсор</p>
                </div>

                <div class="q-ml-lg">
                  <p>{{ partner[0].login }}</p>
                  <p>{{ partner[0].parent }}</p>
                </div>
              </div>

              <div class="row">
                <q-space />
                <q-btn
                  label="Подробнее"
                  icon="info"
                  size="sm"
                  color="primary"
                  flat
                  @click="showUserDetail(partner[0])"
                />
              </div>
            </div>
          </q-card>
        </div>

        <div class="row" style="justify-content: center">
          <q-card v-if="partner[1]" class="col-2 q-ma-sm q-px-md">
            <div class="self-center full-width no-outline" tabindex="0">
              <div class="row">
                <div class="q-pt-sm">
                  <p class="small-text">Логин</p>
                  <p class="small-text">Спонсор</p>
                </div>

                <div class="q-ml-lg">
                  <p>{{ partner[1].login }}</p>
                  <p>{{ partner[1].parent }}</p>
                </div>
              </div>

              <div class="row">
                <q-space />
                <q-btn
                  label="Подробнее"
                  icon="info"
                  size="sm"
                  color="primary"
                  flat
                  @click="showUserDetail(partner[1])"
                />
              </div>
            </div>
          </q-card>

          <q-card v-if="partner[2]" class="col-2 q-ma-sm q-px-md">
            <div class="self-center full-width no-outline" tabindex="0">
              <div class="row">
                <div class="q-pt-sm">
                  <p class="small-text">Логин</p>
                  <p class="small-text">Спонсор</p>
                </div>

                <div class="q-ml-lg">
                  <p>{{ partner[2].login }}</p>
                  <p>{{ partner[2].parent }}</p>
                </div>
              </div>

              <div class="row">
                <q-space />
                <q-btn
                  label="Подробнее"
                  icon="info"
                  size="sm"
                  color="primary"
                  flat
                  @click="showUserDetail(partner[2])"
                />
              </div>
            </div>
          </q-card>
        </div>

        <div class="row" style="justify-content: center">
          <q-card v-if="partner[3]" class="col-2 q-ma-sm q-px-md">
            <div class="self-center full-width no-outline" tabindex="0">
              <div class="row">
                <div class="q-pt-sm">
                  <p class="small-text">Логин</p>
                  <p class="small-text">Спонсор</p>
                </div>

                <div class="q-ml-lg">
                  <p>{{ partner[3].login }}</p>
                  <p>{{ partner[3].parent }}</p>
                </div>
              </div>

              <div class="row">
                <q-space />
                <q-btn
                  label="Подробнее"
                  icon="info"
                  size="sm"
                  color="primary"
                  flat
                  @click="showUserDetail(partner[3])"
                />
              </div>
            </div>
          </q-card>

          <q-card v-if="partner[4]" class="col-2 q-ma-sm q-px-md">
            <div class="self-center full-width no-outline" tabindex="0">
              <div class="row">
                <div class="q-pt-sm">
                  <p class="small-text">Логин</p>
                  <p class="small-text">Спонсор</p>
                </div>

                <div class="q-ml-lg">
                  <p>{{ partner[4].login }}</p>
                  <p>{{ partner[4].parent }}</p>
                </div>
              </div>

              <div class="row">
                <q-space />
                <q-btn
                  label="Подробнее"
                  icon="info"
                  size="sm"
                  color="primary"
                  flat
                  @click="showUserDetail(partner[4])"
                />
              </div>
            </div>
          </q-card>

          <q-card v-if="partner[5]" class="col-2 q-ma-sm q-px-md">
            <div class="self-center full-width no-outline" tabindex="0">
              <div class="row">
                <div class="q-pt-sm">
                  <p class="small-text">Логин</p>
                  <p class="small-text">Спонсор</p>
                </div>

                <div class="q-ml-lg">
                  <p>{{ partner[5].login }}</p>
                  <p>{{ partner[5].parent }}</p>
                </div>
              </div>

              <div class="row">
                <q-space />
                <q-btn
                  label="Подробнее"
                  icon="info"
                  size="sm"
                  color="primary"
                  flat
                  @click="showUserDetail(partner[5])"
                />
              </div>
            </div>
          </q-card>

          <q-card v-if="partner[6]" class="col-2 q-ma-sm q-px-md">
            <div class="self-center full-width no-outline" tabindex="0">
              <div class="row">
                <div class="q-pt-sm">
                  <p class="small-text">Логин</p>
                  <p class="small-text">Спонсор</p>
                </div>

                <div class="q-ml-lg">
                  <p>{{ partner[6].login }}</p>
                  <p>{{ partner[6].parent }}</p>
                </div>
              </div>

              <div class="row">
                <q-space />
                <q-btn
                  label="Подробнее"
                  icon="info"
                  size="sm"
                  color="primary"
                  flat
                  @click="showUserDetail(partner[6])"
                />
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </q-expansion-item>

    <q-dialog v-if="selectedUser" v-model="showDetail">
      <q-card class="q-pa-lg">
        <q-card-section class="q-pt-none">
          <q-toolbar-title class="background-title"> {{ selectedUser.fullName }} </q-toolbar-title>

          <div class="row q-pt-md">
            <q-input class="col-5 q-mx-sm" label="Логин" :value="selectedUser.login">
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input class="col-5 q-mx-sm" label="Спонсор" :value="selectedUser.parent">
              <template #prepend>
                <q-icon name="school" />
              </template>
            </q-input>

            <q-input
              class="col-5 q-mx-sm"
              label="Телефон"
              :value="selectedUser.phone"
              mask="(###)##-##-##"
              unmasked-value
            >
              <template #prepend>
                <q-icon name="call" />
              </template>
            </q-input>

            <q-input class="col-5 q-mx-sm" label="Почта" :value="selectedUser.email">
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input class="col-5 q-mx-sm" label="Регион" :value="selectedUser.region">
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
