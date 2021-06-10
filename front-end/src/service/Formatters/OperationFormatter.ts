export function formatReports(reports: Array<any>): Array<any> {
  const statuses = [
    {
      name: 'Отправил',
      color: 'negative',
    },
    {
      name: 'Получил',
      color: 'positive',
    },
  ];

  const result: Array<any> = [];

  reports.forEach((report) => {
    const statusReport = statuses.find((status) => status.name === report.type);
    const formatterReport = { ...report, status: { title: statusReport?.name, color: statusReport?.color } };
    result.push(formatterReport);
  });

  return result;
}

export function getPrefixByScore(score: number): string {
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
