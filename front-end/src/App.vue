<template>
  <navigation />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Header/Navigation.vue';

@Component({
  components: { Navigation },
})
export default class App extends Vue {}
</script>
