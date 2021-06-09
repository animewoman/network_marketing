<template>
  <div>
    <q-expansion-item
      class="shadow-1 overflow-hidden q-my-sm"
      style="border-radius: 30px"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <template #header>
        <q-toolbar-title> Первый этап </q-toolbar-title>
      </template>

      <div class="row q-pa-sm">
        <q-card v-for="item in firstLine" :key="item" class="col-sm-3 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row">
              <div class="q-pt-sm">
                <p class="small-text">Логин</p>
                <p class="small-text">Спонсор</p>
              </div>

              <div class="q-ml-lg">
                <p>jhon234</p>
                <p>boris</p>
              </div>
            </div>

            <div class="row">
              <q-space />
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showDetail = true" />
            </div>
          </div>
        </q-card>
      </div>
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden q-my-sm"
      style="border-radius: 30px"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
      default-opened
    >
      <template #header>
        <q-toolbar-title>
          Второй этап <span style="font-size: 11px" class="q-ml-xl">{{ subtitle }}</span>
        </q-toolbar-title>
      </template>

      <div class="row q-pa-sm">
        <q-card v-for="item in secondLine" :key="item" class="col-sm-3 q-ma-sm q-px-md">
          <div class="self-center full-width no-outline" tabindex="0">
            <div class="row">
              <div class="q-pt-sm">
                <p class="small-text">Логин</p>
                <p class="small-text">Спонсор</p>
              </div>

              <div class="q-ml-lg">
                <p>jhon234</p>
                <p>boris</p>
              </div>
            </div>

            <div class="row">
              <q-space />
              <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat @click="showDetail = true" />
            </div>
          </div>
        </q-card>
      </div>
    </q-expansion-item>

    <q-dialog v-model="showDetail">
      <q-card class="q-pa-lg">
        <q-card-section class="q-pt-none">
          <q-toolbar-title class="background-title"> Джон Дое </q-toolbar-title>

          <div class="row q-pt-md">
            <q-input class="col-sm-5 q-mx-sm" label="Логин" value="jhon">
              <template #prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input class="col-sm-5 q-mx-sm" label="Спонсор" value="dalores">
              <template #prepend>
                <q-icon name="school" />
              </template>
            </q-input>

            <q-input class="col-sm-5 q-mx-sm" label="Телефон" value="555642354" mask="(###)##-##-##" unmasked-value>
              <template #prepend>
                <q-icon name="call" />
              </template>
            </q-input>

            <q-input class="col-sm-5 q-mx-sm" label="Почта" value="jhon@mail.su">
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input class="col-sm-5 q-mx-sm" label="Регион" value="Нарын">
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
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Partners',
})
export default class Partners extends Vue {
  firstLine = [1, 2];

  secondLine = [1, 2, 3, 4];

  showDetail = false;

  get subtitle() {
    // только для активного этапа или отображать в другом месте
    return `Партнеров до перехода в следующий этап  ${this.secondLine[2]} / ${this.secondLine[3]}`;
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
</style>
