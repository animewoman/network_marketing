<template>
  <div class="col">
    <div class="row">
      <div class="col-9 q-pl-xl" style="display: flex; justify-content: center">
        <q-img :src="require('@/assets/bl-logo.png')" style="max-width: 140px; max-height: 80px" />
      </div>

      <div class="row col-3">
        <q-icon name="search" size="md" />
        <q-icon name="person" size="md" />
        <q-icon name="favorite" size="md" />
        <q-icon name="home" size="md" />
        <p class="q-pl-md" style="font-size: 20px">0 ₸</p>
      </div>
    </div>

    <q-separator />

    <q-list class="row" style="justify-content: center">
      <q-item class="text-bold" clickable>Главная</q-item>
      <q-item class="text-bold" clickable>Магазин</q-item>
      <q-item class="text-bold" clickable> О компании</q-item>
      <q-item class="text-bold" clickable>Новости</q-item>
      <q-item class="text-bold" clickable>Вопросы</q-item>
      <q-item class="text-bold" clickable>Контакты</q-item>
      <q-item class="text-bold" clickable @click="toAuth"> Вход в Кабинет</q-item>
    </q-list>

    <q-img :src="require('@/assets/content.png')" />

    <div class="row q-pt-md" style="justify-content: center">
      <q-img class="col-8 q-mx-xs" :src="require('@/assets/banner1.jpg')" style="max-width: 660px" />
      <q-img class="col-3 q-mx-xs" :src="require('@/assets/banner2.png')" />
      <q-img class="col-3 q-mx-xs" :src="require('@/assets/banner3.jpg')" />
    </div>

    <q-toolbar-title class="text-center text-bold q-mt-xl">Хиты продаж</q-toolbar-title>

    <q-list class="row" style="justify-content: center">
      <q-card class="q-mx-xs" style="max-width: 200px; min-height: 380px">
        <img :src="require('@/assets/product1.png')" />
        <p class="text-bold q-pt-md" style="text-align: center">Мазь BL</p>
        <p class="text-bold" style="color: #c10015; text-align: center">17$</p>
        <q-btn color="grey" class="q-mx-md" label="В Корзину" />
      </q-card>

      <q-card class="q-mx-xs" style="max-width: 200px; min-height: 380px">
        <img :src="require('@/assets/product2.png')" />
        <p class="text-bold q-pt-md" style="text-align: center">Топинамбур</p>
        <p class="text-bold" style="color: #c10015; text-align: center">11$</p>
        <q-btn color="grey" class="q-mx-md" label="В Корзину" />
      </q-card>

      <q-card class="q-mx-xs" style="max-width: 200px; min-height: 380px">
        <img :src="require('@/assets/product3.png')" />
        <p class="text-bold q-pt-md" style="text-align: center">Глазные капли</p>
        <p class="text-bold" style="color: #c10015; text-align: center">11$</p>
        <q-btn color="grey" class="q-mx-md" label="В Корзину" />
      </q-card>

      <q-card class="q-mx-xs" style="max-width: 200px; min-height: 380px">
        <img :src="require('@/assets/product4.png')" />
        <p class="text-bold q-pt-md" style="text-align: center">Effect со вкусом лайма и лимона</p>
        <p class="text-bold" style="color: #c10015; text-align: center">11$</p>
        <q-btn color="grey" class="q-mx-md" label="В Корзину" />
      </q-card>

      <q-card class="q-mx-xs" style="max-width: 200px; min-height: 380px">
        <img :src="require('@/assets/product5.png')" />
        <p class="text-bold q-pt-md" style="text-align: center">Immuno со вкусом клубники</p>
        <p class="text-bold" style="color: #c10015; text-align: center">11$</p>
        <q-btn color="grey" class="q-mx-md" label="В Корзину" />
      </q-card>

      <q-card class="q-mx-xs" style="max-width: 200px; min-height: 380px">
        <img :src="require('@/assets/product6.png')" />
        <p class="text-bold q-pt-md" style="text-align: center">Vita Life со вкусом Граната</p>
        <p class="text-bold" style="color: #c10015; text-align: center">11$</p>
        <q-btn color="grey" class="q-mx-md" label="В Корзину" />
      </q-card>

      <q-card class="q-mx-xs" style="max-width: 200px; min-height: 380px">
        <img :src="require('@/assets/product7.png')" />
        <p class="text-bold q-pt-md" style="text-align: center">Блокнот твоего успеха</p>
        <p class="text-bold" style="color: #c10015; text-align: center">11$</p>
        <q-btn color="grey" class="q-mx-md" label="В Корзину" />
      </q-card>
    </q-list>

    <q-img class="q-mt-xl" :src="require('@/assets/content2.png')" />

    <div class="q-pt-xl">
      <q-toolbar-title class="text-bold" style="color: #21ba45; text-align: center">
        Почему выбирают нас?
      </q-toolbar-title>
      <q-toolbar-title class="text-bold q-pt-md" style="text-align: center">Что нас отличает</q-toolbar-title>

      <div class="row q-pt-lg" style="justify-content: center">
        <div class="col-4 q-mx-lg" style="max-width: 300px">
          <p class="text-bold">Только натуральные ингредиенты</p>
          <p style="color: rgba(33, 32, 32, 0.8)">
            Мы используем только свежие фрукты и овощи. Используем процесс холодного отжима, чтобы извлечь все до
            последней капли полезности.
          </p>
        </div>

        <div class="col-4 q-mx-lg" style="max-width: 300px">
          <p class="text-bold">Большая Польза для Здоровья</p>
          <p style="color: rgba(33, 32, 32, 0.8)">
            Следи за своим здоровьем получая все нужные витамины и минералы используя нашу продукцию, а так же
            возможность заработать и сделать карьеру.
          </p>
        </div>

        <div class="col-4 q-mx-lg" style="max-width: 300px">
          <p class="text-bold">Вкус натуральных продуктов</p>
          <p style="color: rgba(33, 32, 32, 0.8)">
            Выжимаем сок из наших ингредиентов, чтобы добиться превосходного вкуса и максимального количества
            питательных веществ, витаминов и антиоксидантов.
          </p>
        </div>
      </div>
    </div>
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

  toAuth() {
    this.$router.push({ name: 'auth' });
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
