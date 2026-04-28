import { useState } from "react";
import OrderFilters from "../components/orders/OrderFilters";
import OrderTable from "../components/orders/OrderTable";
import OrderDetailModal from "../components/orders/OrderDetailModal";

const orders = [
  {
            id: "30e6e652-bc4a-4034-8153-f99ab1966532",
            user_email: "nibretumengaw@gmail.com",
            total_price: "92000.00",
            status: "failed",
            created_at: "2026-04-26T09:24:53.326487Z"
        },
        {
            id: "fd7035f7-31a2-4c98-a577-0b00922b00a3",
            user_email: "d2708071@gmail.com",
            total_price: "6000.00",
            status: "delivered",
            created_at: "2026-04-23T18:59:29.349106Z"
        },
        {
            id: "1be34165-42d6-41f2-beed-1eed4780e02a",
            user_email: "d2708071@gmail.com",
            total_price: "6300.00",
            status: "paid",
            created_at: "2026-04-21T21:01:55.695703Z"
        },
        {
            id: "a4e5b1ce-9737-4e22-922b-6fa129d4dfdf",
            user_email: "d2708071@gmail.com",
            total_price: "6900.00",
            status: "paid",
            created_at: "2026-04-21T20:32:57.897932Z"
        }
];

function Orders() {

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      <OrderFilters />

      <OrderTable
        data={orders}
        onView={handleView}
      />

      <OrderDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={orderdetail}
      />
    </div> 
  );
}

export default Orders;


const orderdetail = 
  {
    id: "a4e5b1ce-9737-4e22-922b-6fa129d4dfdf",
    user_email: "d2708071@gmail.com",
    total_price: "6900.00",
    status: "paid",
    created_at: "2026-04-21T20:32:57.897932Z",
    shipping_address: {
        id: 1,
        full_name: "Nib Man",
        phone_number: "0903500000",
        city: "Bahir Dar",
        district: "Kebele 10",
        specific_address: "Poly",
        is_default: false
    },
    items: [
        {
            id: "d6ff5edb-4e56-4895-8dbc-599d6ea944ee",
            product: "51aa59a8-d0a2-43dc-9809-6f40e119dd60",
            product_name: "Apple AirPods Max Silver",
            product_image: "lokelanfrcf3qnjjbem6",
            quantity: 3,
            price_at_purchase: "2300.00",
            subtotal: 6900.0
        },
        {
            id: "d6ff5edb-4e56-4895-8dbc-599d6ea944ee",
            product: "51aa59a8-d0a2-43dc-9809-6f40e119dd60",
            product_name: "Apple AirPods Max Silver",
            product_image: "lokelanfrcf3qnjjbem6",
            quantity: 3,
            price_at_purchase: "2300.00",
            subtotal: 6900.0
        }
    ]
}