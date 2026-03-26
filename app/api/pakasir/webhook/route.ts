import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/orders';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      amount,
      order_id,
      status,
      payment_method,
      completed_at,
      project,
    } = body;

    console.log('Pakasir Webhook:', body);

    // VALIDASI WAJIB
    if (!order_id || !amount) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // TODO: ambil order dari database kamu
    // contoh:
    // const order = await getOrder(order_id)

    // VALIDASI amount cocok
    // if (order.amount !== amount) return ...

    // kalau pembayaran sukses
    if (status === 'completed') {
      await updateOrderStatus(order_id, 'paid');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}