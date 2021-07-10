<template>
  <q-card class="q-pa-lg">
    <q-toolbar-title>Профиль</q-toolbar-title>
    <q-card-section class="q-pt-none">
      <div class="row q-pt-md">
        <q-input class="col-5 q-mx-sm" label="ФИО" v-model="user.fullName">
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input class="col-5 q-mx-sm" label="Телефон" v-model="user.phone" mask="(###)##-##-##" unmasked-value>
          <template #prepend>
            <q-icon name="call" />
          </template>
        </q-input>

        <q-input class="col-5 q-mx-sm" label="Почта" v-model="user.email">
          <template #prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input class="col-5 q-mx-sm" label="Регион" v-model="user.region">
          <template #prepend>
            <q-icon name="location_on" />
          </template>
        </q-input>

        <q-input
          label="Пароль"
          v-model="user.password"
          ref="pass"
          class="col-5 q-mx-sm"
          type="password"
          :rules="[validateLoginOrPassword, isPasswordsMatch]"
        >
          <template #prepend>
            <q-icon name="vpn_key" />
          </template>
        </q-input>

        <q-input
          label="Пароль (повторно)"
          v-model="repeatPassword"
          ref="pass2"
          class="col-5 q-mx-sm"
          type="password"
          :rules="[isPasswordsMatch]"
        >
          <template #prepend>
            <q-icon name="vpn_key" />
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn dense label="Редактировать" color="primary" v-close-popup @click="editUser" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { User } from '@/types/user';
import { updateUser } from '@/service/Users';

@Component({
  name: 'UserEdit',
})
export default class UserEdit extends Vue {
  @Prop({ type: Object, default: null }) readonly user!: User;

  repeatPassword = '';

  @Watch('user.password')
  onPasswordChange() {
    if (this.user.password && this.repeatPassword) {
      this.comparePasswords();
    }
  }

  @Watch('repeatPassword')
  onRepeatPasswordChange() {
    if (this.user.password && this.repeatPassword) {
      this.comparePasswords();
    }
  }

  async editUser() {
    await updateUser(this.user);
  }

  comparePasswords() {
    if (this.user.password === this.repeatPassword) {
      this.$refs.pass.resetValidation();
      this.$refs.pass2.resetValidation();

      return;
    }

    this.$refs.pass.validate();
    this.$refs.pass2.validate();
  }

  validateLoginOrPassword(login: string): string | boolean {
    return !login.match(/[^.1-9 a-zA-Z\s]/g) || 'Разрешены буквы латинского алфавита и цифры';
  }

  isPasswordsMatch(): string | boolean {
    if (this.user.password === this.repeatPassword) {
      return true;
    }

    return 'Пароли не совпадают!';
  }
}
</script>

<style scoped></style>
