import { Notify } from 'quasar';

export function showNotification(message: string, color = 'info', timeout = 4000): void {
  let textColor = 'white';

  if (color === 'info') {
    textColor = 'black';
  }

  Notify.create({
    color,
    textColor,
    message,
    position: 'bottom',
    timeout,
    actions: [{ label: 'OK', color: textColor }],
  });
}
