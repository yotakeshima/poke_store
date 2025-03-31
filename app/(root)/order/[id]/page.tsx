import { Metadata } from 'next';
import { getOrderById } from '@/lib/actions/order.actions';
import { notFound } from 'next/navigation';
import OrderDetailsTable from './order-details-table';
import { ShippingAddress } from '@/types';

export const metadata: Metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = await getOrderById(id);

  if (!order) notFound();

  return (
    <>
      <OrderDetailsTable
        order={{
          ...order,
          // Shipping Address has a structure type in Order
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
      />
    </>
  );
};

export default OrderDetailsPage;
