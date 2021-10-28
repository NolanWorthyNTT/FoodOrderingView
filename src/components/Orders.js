import { useState, useEffect } from 'react';
import OrderItem from './OrderItem.js';

function Orders(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        sendHttpRequest('GET', 'http://localhost:8080/orders?id=' + props.userId).then(responseData => {
            setOrders(responseData);
        });
    }, [props.userId]);

    const sendHttpRequest = (method, url) => {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            // fires on response
            xhr.onload = () => {
                resolve(JSON.parse(xhr.response));
            };

            xhr.send();
        })
        return promise;
    }

    return (
        <div>
            <h2>My Orders</h2>
            {orders.map((order) => (
                <OrderItem key={order.order.orderId}
                                    orderId={order.order.orderId}
                                    dateOfOrder={order.order.dateOfOrder}
                                    total={order.order.total}
                                    userId={order.userId}
                                    orderDetails={order.dishes}
                />  
                ))}
        </div>
    )
}

export default Orders;