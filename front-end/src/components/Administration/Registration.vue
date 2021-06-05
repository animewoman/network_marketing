<template>
  <div class="q-pt-xl q-px-lg" style="max-width: 400px">
    <q-toolbar-title class="q-pb-md">Регистрация пользователя</q-toolbar-title>

    <q-form ref="form">
      <q-input label="Имя пользователя" v-model="user.login" :rules="[requiredField]" />

      <q-input label="Спонсор" v-model="user.parent" />

      <q-input label="Регион" v-model="user.region" :rules="[requiredField]" />

      <q-input label="Почта" v-model="user.email" :rules="[requiredField, validateMail]" />

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
    _id: '',
    login: '',
    password: '',
    phone: '',
    email: '',
    parent: '',
    region: '',
    score: 0,
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

  validateMail(mail: string): string | boolean {
    return !!mail.match(/\S+?@\S+?\.\S+$/) || 'Неверный формат электронной почты';
  }

  requiredField(value: string): string | boolean {
    if (value) {
      return true;
    }

    return 'Поле обязательно для заполнения';
  }

  submit() {
    this.validate().then((success) => {
      if (!success) {
        this.showNotification('Заполните все поля!', 'negative');

        return;
      }

      this.$emit('save-user', this.user);
      this.clearFields();
    });
  }

  clearFields() {
    this.user = { _id: '', login: '', password: '', phone: '', email: '', parent: '' };
    this.repeatPassword = '';
    this.$refs.form.resetValidation();
  }

  validate() {
    return this.$refs.form.validate();
  }

  showNotification(message: string, color: string) {
    this.$q.notify({
      message,
      color,
    });
  }
}
</script>

<style scoped></style>
