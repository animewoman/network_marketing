import { api } from '@/http';
import { TransferData } from '@/types/operation';
import { showNotification } from '@/service/Notifications';
import { formatReports, getPrefixByScore } from '@/service/Formatters/OperationFormatter';

export async function transferMoney(data: TransferData): Promise<void> {
  const response = await api().post('/user/send-money', data);
  const prefix = getPrefixByScore(data.score!);

  if (response.status === 200) {
    showNotification(`${data.score} балл${prefix} переведено на аккаунт ${data.login}`, 'positive');
  }
}

export async function getReports(login: string): Promise<any> {
  const data = { login };
  const response = await api().post('/user/transfers', data);

  return formatReports(response.data.data) ?? [];
}
