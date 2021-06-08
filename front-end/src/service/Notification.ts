import { Notify } from 'quasar';

export function showNotification(message: string, type = 'info', timeout = 4000): void {
  let textColor = 'white';

  if (type === 'info') {
    textColor = 'grey';
  }

  Notify.create({
    type,
    textColor,
    message,
    timeout,
  });
}
