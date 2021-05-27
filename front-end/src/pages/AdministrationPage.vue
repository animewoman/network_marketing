<template>
  <div>
    <registration />
    <users />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Registration from '@/components/Registration.vue';
import Users from '@/components/Users.vue';

@Component({
  name: 'AdministrationPage',
  components: { Users, Registration },
})
export default class AdministrationPage extends Vue {}
</script>

<style scoped></style>
