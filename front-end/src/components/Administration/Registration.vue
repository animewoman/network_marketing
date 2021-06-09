<template>
  <q-card class="q-my-md q-pa-lg" style="max-width: 400px">
    <q-toolbar-title class="q-pb-md">Регистрация пользователя</q-toolbar-title>

    <q-form ref="form" @submit="submit">
      <q-input label="Логин" v-model="user.login" :rules="[requiredField]" />

      <q-input label="ФИО пользователя" v-model="user.fullName" :rules="[requiredField, validateName]" />

      <q-input label="Спонсор" v-model="user.parent" />

      <q-input label="Регион" v-model="user.region" :rules="[requiredField]" />

      <!--      <q-input label="Почта" v-model="user.email" :rules="[requiredField, validateMail]" />-->

      <q-input
        label="Телефон"
        v-model="user.phone"
        mask="(###)##-##-##"
        unmasked-value
        :rules="[requiredField, validatePhone]"
      />

      <q-input
        label="Пароль"
        v-model="user.password"
        ref="pass"
        type="password"
        :rules="[validatePassword, requiredField]"
      />

      <q-input
        label="Пароль (повторно)"
        v-model="repeatPassword"
        ref="pass2"
        type="password"
        :rules="[validatePassword]"
      />

      <q-btn class="q-mt-lg" label="Зарегистрировать" color="primary" no-caps type="submit" />
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/types/user';
import { saveUser } from '@/service/Users';
import { QForm, QInput } from 'quasar';
import { showNotification } from '@/service/Notifications';

@Component({
  name: 'Registration',
})
export default class Registration extends Vue {
  user: User = {
    _id: '',
    login: '',
    fullName: '',
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

  validateName(name: string): string | boolean {
    return !name.match(/[^- .а-яА-Яa-zA-ZёЁ\s]/g) || 'Разрешенные символы: -, пробел, буквы';
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
        showNotification('Заполните все поля!', 'negative');

        return;
      }

      this.$emit('save-user', this.user);
      this.clearFields();
    });
  }

  clearFields() {
    this.user = {
      _id: '',
      login: '',
      fullName: '',
      password: '',
      phone: '',
      email: '',
      parent: '',
      region: '',
      score: 0,
    };

    this.repeatPassword = '';

    this.$refs.form.resetValidation();
    this.$refs.form.reset();
  }

  validate() {
    return this.$refs.form.validate();
  }
}
</script>

<style scoped></style>
