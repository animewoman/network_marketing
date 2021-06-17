<template>
  <div class="row">
    <q-card
      v-for="item in items"
      class="col-sm-4 q-ma-xl q-pa-lg"
      style="
        max-width: 600px;
        height: 200px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      "
      :key="item"
      :class="backgroundImage(item)"
    >
      <div class="self-center full-width no-outline" tabindex="0">
        <div>
          <q-toolbar-title class="card-title">Эликсир {{ item }} этапа</q-toolbar-title>
          <p class="card-text q-mt-lg q-pa-sm">Купив этот эликсир вы сразу начнете с {{ item }} этапа</p>
        </div>

        <div class="row">
          <q-space />
          <q-btn label="Подробнее" icon="info" size="sm" color="primary" flat />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Showcase',
})
export default class Showcase extends Vue {
  items = [1, 2, 3, 4];

  backgroundImage(val: number) {
    return `background-image-${val}`;
  }
}
</script>

<style scoped>
.card-title {
  text-align: center;
  background-color: #21ba45;
  border-radius: 10px;
}

.card-text {
  font-size: 14px;
  font-family: 'Noto Sans JP', sans-serif;
  text-align: center;
  border-radius: 20px;
  background-color: rgba(238, 238, 238, 0.35);
}

.background-image-1 {
  background-image: url('https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
}

.background-image-2 {
  background-image: url('https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
}

.background-image-3 {
  background-image: url('https://prograils-com-statics-playground.s3.eu-central-1.amazonaws.com/variants/viwquadphs33duqmbjl5ly6encb8/82eefbabec73d5974cc0655e56750730617a1509d9f62ff59ab6c557e7228b00?response-content-disposition=inline%3B%20filename%3D%22the-state-of-elixir-2020-blog.jpg%22%3B%20filename%2A%3DUTF-8%27%27the-state-of-elixir-2020-blog.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIMATFQ2AIU6CVT7Q%2F20210614%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210614T183022Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=05c902b33c277c105178c0468e94511181588ab7fe76217abd1d026d2de89df3');
}

.background-image-4 {
  background-image: url('https://prograils-com-statics-playground.s3.eu-central-1.amazonaws.com/variants/viwquadphs33duqmbjl5ly6encb8/82eefbabec73d5974cc0655e56750730617a1509d9f62ff59ab6c557e7228b00?response-content-disposition=inline%3B%20filename%3D%22the-state-of-elixir-2020-blog.jpg%22%3B%20filename%2A%3DUTF-8%27%27the-state-of-elixir-2020-blog.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIMATFQ2AIU6CVT7Q%2F20210614%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210614T183022Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=05c902b33c277c105178c0468e94511181588ab7fe76217abd1d026d2de89df3');
}
</style>
