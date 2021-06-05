import { api } from '@/http';
import { TransferData } from '@/types/operation';

export async function transferMoney(data: TransferData): Promise<string> {
  const response = await api().post('/transfer', data);

  console.log(response);
  return 'success';
}
