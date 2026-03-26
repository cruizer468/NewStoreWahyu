import PaymentClient from "./payment-client";

export default async function PaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ amount?: string }>;
}) {
  const { orderId } = await params;
  const { amount } = await searchParams;

  return <PaymentClient orderId={orderId} amount={amount || ""} />;
}