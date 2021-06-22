<template>
  <div>
    <div class="row">
      <q-card v-for="(item, i) in items" :key="i" :class="backgroundImage(item.stage)">
        <div class="self-center full-width no-outline">
          <q-toolbar-title class="card-title">Эликсир {{ item.stage }} этапа</q-toolbar-title>
          <p class="card-text q-mt-lg q-pa-sm">Купив этот эликсир вы сразу начнете с {{ item.stage }} этапа</p>

          <div class="row">
            <q-space />
            <p class="price-text q-px-sm" style="color: #027be3; font-weight: bold">Цена: {{ item.price }}$</p>
          </div>
        </div>
      </q-card>
    </div>
    <q-toolbar-title style="text-align: center; color: #e30249">Brilliant Life</q-toolbar-title>
    <p class="text-bold">О компании:</p>
    <p>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
      literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
      College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
      going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes
      from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
      written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first
      line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of
      Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de
      Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by Englis
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Showcase',
})
export default class Showcase extends Vue {
  items = [
    {
      stage: 1,
      price: 18,
    },
    {
      stage: 2,
      price: 54,
    },
    {
      stage: 3,
      price: 150,
    },
    {
      stage: 4,
      price: 500,
    },
  ];

  backgroundImage(val: number) {
    return `col-sm-4 q-ma-xl q-pa-lg bg-card-img background-image-${val}`;
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

.price-text {
  font-family: 'Noto Sans JP', sans-serif;
  background-color: rgb(43, 43, 43);
  border-radius: 20px;
}

.bg-card-img {
  max-width: 600px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
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
