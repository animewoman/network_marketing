<template>
  <div class="col justify-center q-pt-xl">
    <div class="row justify-center">
      <img :src="require('@/assets/logo.png')" style="width: 100px" alt="Brilliant Life" />
    </div>

    <q-card class="m-auto q-pa-lg bg-white" style="max-width: 500px">
      <q-form ref="form">
        <q-toolbar-title class="text-grey">ФИО</q-toolbar-title>
        <q-input label="Фамилия Имя Отчество" v-model="user.fullName" :rules="[requiredField, validateName]" />

        <q-toolbar-title class="text-grey q-px-none q-pt-lg">ЛОГИН (НА ЛАТИНСКОМ)</q-toolbar-title>
        <q-input label="Введите логин" v-model="user.login" :rules="[requiredField, latinSymbolsAndNumbersOnly]" />

        <q-toolbar-title class="text-grey q-px-none q-pt-lg">ПАРОЛЬ</q-toolbar-title>
        <q-input
          label="Пароль"
          v-model="user.password"
          ref="pass"
          type="password"
          :rules="[requiredField, latinSymbolsAndNumbersOnly, isPasswordsMatch]"
        />

        <q-toolbar-title class="text-grey q-px-none q-pt-lg">ПОДТВЕРЖДЕНИЕ ПАРОЛЯ</q-toolbar-title>
        <q-input
          label="Пароль (повторно)"
          v-model="repeatPassword"
          ref="pass2"
          type="password"
          :rules="[isPasswordsMatch]"
        />

        <q-toolbar-title class="text-grey q-px-none q-pt-lg">ТЕЛЕФОН</q-toolbar-title>
        <q-input
          label="Номер телефона"
          v-model="user.phone"
          mask="(###)##-##-##"
          unmasked-value
          :rules="[requiredField, validatePhone]"
        />

        <q-toolbar-title class="text-grey q-px-none q-pt-lg">ЛОГИН СПОНСОРА</q-toolbar-title>
        <q-input label="Логин пригласившего партнера" v-model="user.parent" />

        <q-checkbox label="Согласие с правилами платформы" v-model="isRulesAccepted" class="text-grey" />

        <q-btn label="Регистрация" class="q-my-md" color="negative" type="submit" style="width: 100%" />
        <p class="text-grey text-center">
          Уже есть аккаунт?
          <span>
            <router-link class="text-red" no-c to="auth" style="text-decoration: none"> Войти </router-link>
          </span>
        </p>
      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { User } from '@/types/user';
import { QForm, QInput } from 'quasar';

@Component({
  name: 'Registration',
})
export default class Registration extends Vue {
  isRulesAccepted = false;
  repeatPassword = '';

  user: User = {
    fullName: '',
    login: '',
    password: '',
    parent: '',
    phone: '',
    email: '',
    region: '',
  };

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

  requiredField(value: string): string | true {
    if (value) {
      return true;
    }

    return 'Поле обязательно для заполнения';
  }

  isPasswordsMatch(): string | boolean {
    if (this.user.password === this.repeatPassword) {
      return true;
    }

    return 'Пароли не совпадают!';
  }

  latinSymbolsAndNumbersOnly(login: string): string | boolean {
    return !login.match(/[^.0-9 a-zA-Z\s]/g) || 'Разрешены буквы латинского алфавита и цифры';
  }

  validateName(name: string): string | boolean {
    return !name.match(/[^- .а-яА-Яa-zA-ZёЁ\s]/g) || 'Разрешенные символы: -, пробел, буквы';
  }

  validatePhone(phone: string): string | boolean {
    if (phone.length < 9) {
      return 'Телефон должен содержать 9 символов';
    }

    return true;
  }
}
</script>

<style scoped></style>
