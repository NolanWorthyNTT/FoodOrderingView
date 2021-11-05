import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CartAsideItem from "./CartAsideItem.js";

function CartAside(props) {
    const history = useHistory();
    const [total, setTotal] = useState(0);

    // whenever the cart is updated, calculate the new total
    useEffect(() => {
        setTotal(0);
        props.cart.forEach((i) => {
            /// 1.0725 == 7.25% sales tax in Charlotte
            setTotal(total => total + ((i.dish.pricePer * i.qty) * 1.0725));
        });
    }, [props.cart]);

    const sendHttpRequest = (method, url, data) => {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.setRequestHeader('Content-type', 'application/json');

            // fires on response
            xhr.onload = () => {
                resolve();
            };

            xhr.send(JSON.stringify(data));
        })
        return promise;
    }

    const onClick = () => {
        if(props.cart.length > 0) {
            sendHttpRequest('POST', 'http://localhost:8080/placeOrder', {
                "order": {
                    "total": total,
                    "userId": props.userId
                },
                "dishesInOrder": props.cart
            }).then(responseData => {
                props.setCart([]);

                history.push('/orders');
            });
        }
    }

    const TotalAndButton = () => {
        return (
            <div>
                Total: ${total.toFixed(2)} <button type="button" className="cart-aside-place-order-btn" onClick={onClick}>Place Order</button>
            </div>
        )
    }

    return (
        <div>
            <div className="cart-aside-list">
                <h2 className="cart-aside-heading">My Cart</h2>
                {(props.cart.length === 0 ? 'Nothing in cart' : props.cart.map((cartItem) => (
                    <CartAsideItem key={cartItem.dish.dishId}
                                dishId={cartItem.dish.dishId}
                                dishName={cartItem.dish.dishName}
                                qtyToBuy={cartItem.qty}
                                pricePer={cartItem.dish.pricePer}
                                imageUrl={cartItem.dish.imageUrl}
                                ingredients={cartItem.dish.ingredients}
                                menu={props.menu}
                                cart={props.cart}
                                setCart={props.setCart}
                    />
                )))}
                {props.cart.length === 0 ? '' : <TotalAndButton />}
            </div>
        </div>
    )
}

export default CartAside;