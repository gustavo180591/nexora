export function formatMoney(amount: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount / 100);
}

export function calculateMetrics(orders: any[]) {
  const paid = orders.filter(o => o.status === 'PAID');

  const gross = paid.reduce((sum, o) => sum + o.totalAmount, 0);

  const fee = Math.round(gross * 0.1); // 10%
  const net = gross - fee;

  return { gross, fee, net };
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'PAID': return 'text-green-600 bg-green-50';
    case 'PENDING': return 'text-yellow-600 bg-yellow-50';
    case 'CANCELED': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getStatusText(status: string) {
  switch (status) {
    case 'PAID': return 'Paid';
    case 'PENDING': return 'Pending';
    case 'CANCELED': return 'Canceled';
    default: return status;
  }
}
