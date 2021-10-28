import { useState } from 'react';
import OrderItemDetails from './OrderItemDetails';

function OrderItem(props) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
        <div className="order-item">
            Order ID: ORD-{props.orderId}
            <p>Total: ${props.total.toFixed(2)} | Date: {props.dateOfOrder}</p>
            <button onClick={toggleShow}>Show Details</button>
            {show ? (<div>{props.orderDetails.map((item) => (
                    <OrderItemDetails key={item.dishId} item={item} />
                ))}</div>) : null}
                
        </div>
    )
}

export default OrderItem;