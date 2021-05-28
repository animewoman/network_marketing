<template>
  <div class="q-pt-xl" style="max-width: 400px; margin: 0 auto">
    <q-toolbar-title class="q-pb-md">Регистрация пользователя</q-toolbar-title>

    <q-form ref="form">
      <q-input label="Имя пользователя" v-model="user.login" :rules="[requiredField]" />

      <q-input label="Почта" v-model="user.email" :rules="[requiredField]" />

      <q-input
        label="Телефон"
        v-model="user.phone"
        mask="(###)##-##-##"
        unmasked-value
        :rules="[requiredField, validatePhone]"
      />

      <q-input
        ref="pass"
        label="Пароль"
        type="password"
        v-model="user.password"
        :rules="[validatePassword, requiredField]"
      />

      <q-input
        ref="pass2"
        label="Пароль (повторно)"
        type="password"
        v-model="repeatPassword"
        :rules="[validatePassword]"
      />

      <q-btn class="q-mt-lg" label="Зарегистрировать" color="primary" no-caps @click="submit" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/types/user';
import { saveUser } from '@/service/Users';
import { QForm, QInput } from 'quasar';

@Component({
  name: 'Registration',
})
export default class Registration extends Vue {
  user: User = {
    login: '',
    password: '',
    phone: '',
    email: '',
  };

  repeatPassword = '';

  $refs!: {
    form: QForm;
    pass: QInput;
    pass2: QInput;
  };

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

  comparePasswords() {
    if (this.user.password === this.repeatPassword) {
      this.$refs.pass.resetValidation();
      this.$refs.pass2.resetValidation();

      return;
    }

    this.$refs.pass.validate();
    this.$refs.pass2.validate();
  }

  validatePassword(): string | boolean {
    if (this.user.password === this.repeatPassword) {
      return true;
    }

    return 'Пароли не совпадают!';
  }

  validatePhone(phone: string): string | boolean {
    if (phone.length < 9) {
      return 'Телефон должен содержать 9 символов';
    }

    return true;
  }

  requiredField(value: any): string | boolean {
    if (value) {
      return true;
    }

    return 'Поле обязательно для заполнения';
  }

  async submit() {
    this.$refs.form.validate();

    const test = await saveUser(this.user);
    console.log(test);
  }
}
</script>

<style scoped></style>
