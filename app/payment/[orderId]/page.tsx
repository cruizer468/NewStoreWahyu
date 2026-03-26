import PaymentClient from "./payment-client";

export default async function PaymentPage({
  params,
}: {
  params: { orderId: string };
}) {
  return <PaymentClient orderId={params.orderId} />;
}