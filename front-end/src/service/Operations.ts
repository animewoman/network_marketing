import { api } from '@/http';
import { TransferData } from '@/types/operation';
import { showNotification } from '@/service/Notifications';

export async function transferMoney(data: TransferData): Promise<void> {
  const response = await api().post('/user/send-money', data);
  const prefix = scoreText(data.score!);

  if (response.status === 200) {
    showNotification(`${data.score} балл${prefix} переведено на аккаунт ${data.login}`, 'positive');
  }
}

export async function getReports(login: string): Promise<any> {
  const data = { login };
  const response = await api().post('/user/transfers', data);

  return response.data.data ?? [];
}

function scoreText(score: number) {
  const a = ['2', '3', '4'];
  const ov = ['0', '5', '6', '7', '8', '9', '11', '12', '13', '14'];

  const stringScore = String(score);
  const lengthScore = stringScore.length;
  const lastSymbol = stringScore.charAt(lengthScore - 1);
  const lastTwoSymbols = stringScore.slice(-2);

  if (ov.includes(lastTwoSymbols)) {
    return 'ов';
  }

  if (a.includes(lastSymbol)) {
    return 'а';
  }

  if (ov.includes(lastSymbol)) {
    return 'ов';
  }

  return '';
}
