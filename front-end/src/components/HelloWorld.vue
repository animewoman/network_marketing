<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <q-btn no-caps>{{ msg }}</q-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop({ type: String, default: '' }) readonly msg!: string;

  message = 'Hello World!';
}
</script>
