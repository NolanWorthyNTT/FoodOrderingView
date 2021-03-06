import { useState, useEffect } from 'react';
import OrderItem from './OrderItem.js';
import { useHistory } from 'react-router-dom';

function Orders(props) {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    const history = useHistory();

    useEffect(() => {
        if(props.role !== 'user') {
            alert('You do not have access to this page');
            props.setRole('');
            props.setUsername('');
            props.setUserId(-1);
            props.setCart([]);
            history.push('/');
        }
    });

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
            {orders.length === 0 ? 'No orders' :
                <div>
                    <label htmlFor="search">Search by order number:</label>
                    <input type="text" id="search" name="search" placeholder="&quot;ORD-...&quot;" value={search} onChange={(e) => setSearch(e.target.value)} /><br />
                    {orders.filter(order => ('ORD-'+order.order.orderId).includes(search.toUpperCase())).map((order) => (
                        <OrderItem key={order.order.orderId}
                                            orderId={order.order.orderId}
                                            dateOfOrder={order.order.dateOfOrder}
                                            total={order.order.total}
                                            userId={order.userId}
                                            orderDetails={order.dishes}
                        />  
                    ))}
                </div>
            }
        </div>
    )
}

export default Orders;