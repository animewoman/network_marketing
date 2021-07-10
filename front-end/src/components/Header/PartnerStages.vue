<template>
  <div>
    <template v-for="(stage, index) in stages">
      <q-item
        style="min-height: 30px"
        class="q-pa-none q-pt-xs justify-center"
        clickable
        :key="index"
        @click="changeRoute(stage)"
      >
        <q-icon name="account_tree" class="q-mx-sm" />
        Этап {{ stage }}
      </q-item>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'PartnerStages',
})
export default class PartnerStages extends Vue {
  stages = [1, 2, 3, 4, 5, 6, 7, 8];

  changeRoute(stageNum: number) {
    const stage = String(stageNum);
    this.$router.push({ name: 'partners', query: { stage } });
  }
}
</script>

<style scoped></style>
