import { DataTable } from "@/components/custom-ui/data-table"
import { columns } from "@/components/dashboard/columns/order-items-columns"
import { dollars } from "@/lib/utils"


const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.orderId}`)
  const { orderDetails, customer } = await res.json()

  const { street, city, state, postalCode, country } = orderDetails.shippingAddress

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-body-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-body-bold">
        Customer name: <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-body-bold">
        Shipping address: <span className="text-base-medium">{street}, {city}, {state}, {postalCode}, {country}</span>
      </p>
      <p className="text-body-bold">
        Total Paid: <span className="text-base-medium">{dollars.format(orderDetails.totalAmount)}</span>
      </p>
      <p className="text-body-bold">
        Shipping rate ID: <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>
      <DataTable columns={columns} data={orderDetails.dishes} searchKey="dish" />
    </div>
  )
}

export default OrderDetails