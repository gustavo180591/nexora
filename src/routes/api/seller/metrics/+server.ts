import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { requireUser } from '$lib/server/auth/guards';
import { calculatePlatformFee, formatCurrency } from '$lib/server/billing/config';

export async function GET({ locals }) {
  const user = requireUser(locals);

  const seller = await prisma.seller.findUnique({
    where: { userId: user.id }
  });

  if (!seller) {
    return json({
      isSeller: false,
      metrics: null
    });
  }

  // 🎯 Métricas completas del seller
  const orders = await prisma.order.findMany({
    where: { 
      sellerId: seller.id,
      status: 'PAID' 
    },
    include: {
      payments: {
        where: { status: 'SUCCEEDED' }
      }
    }
  });

  const totalOrders = orders.length;
  const totalGross = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalPlatformFees = orders.reduce((sum, order) => sum + calculatePlatformFee(order.totalAmount), 0);
  const totalNet = totalGross - totalPlatformFees;

  // 📊 Métricas adicionales
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);

  const monthlyOrders = orders.filter(order => order.createdAt >= thisMonth);
  const monthlyGross = monthlyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const monthlyNet = monthlyGross - monthlyOrders.reduce((sum, order) => sum + calculatePlatformFee(order.totalAmount), 0);

  return json({
    isSeller: true,
    metrics: {
      // 🎯 Totales históricos
      totalOrders,
      totalGross,
      totalPlatformFees,
      totalNet,
      
      // 📈 Mensuales
      monthlyOrders: monthlyOrders.length,
      monthlyGross,
      monthlyNet,
      
      // 💰 Formateados para UI
      formatted: {
        totalGross: formatCurrency(totalGross),
        totalPlatformFees: formatCurrency(totalPlatformFees),
        totalNet: formatCurrency(totalNet),
        monthlyGross: formatCurrency(monthlyGross),
        monthlyNet: formatCurrency(monthlyNet)
      },
      
      // 📊 Porcentajes y promedios
      averageOrderValue: totalOrders > 0 ? Math.round(totalGross / totalOrders) : 0,
      platformFeeRate: totalGross > 0 ? Math.round((totalPlatformFees / totalGross) * 100) : 0
    }
  });
}
