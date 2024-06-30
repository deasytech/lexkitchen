import CustomerList from '@/components/dashboard/lists/customer-list'
import Customer from '@/lib/models/Customer'
import { connectToDB } from '@/lib/mongoDB'

const Customers = async () => {
  await connectToDB()

  const customers = await Customer.find().sort({ createdAt: "desc" })

  return (
    <CustomerList />
  )
}

export default Customers