import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import CartAsideItem from "./CartAsideItem.js";

function CartAside(props) {
    //const history = useHistory();
    const [total, setTotal] = useState(0);

    // whenever the cart is updated, calculate the new total
    useEffect(() => {
        setTotal(0);
        props.cart.forEach((i) => {
            /// 1.0725 == 7.25% sales tax in Charlotte
            setTotal(total => total + ((i.pricePer * i.qtyToBuy) * 1.0725));
        });
    }, [props.cart]);

    const onClick = () => {
        
    }

    return (
        <div>
            <div className="cart-aside-list">
                <h2 className="cart-aside-heading">My Cart</h2>
                {props.cart.map((cartItem) => (
                    <CartAsideItem key={cartItem.dishId}
                                dishId={cartItem.dishId}
                                dishName={cartItem.dishName}
                                qtyToBuy={cartItem.qtyToBuy}
                                pricePer={cartItem.pricePer}
                                imageUrl={cartItem.imageUrl}
                                ingredients={cartItem.ingredients}
                                cart={props.cart}
                                setCart={props.setCart}
                    />
                ))}
                Total: ${total.toFixed(2)} <button type="button" className="cart-aside-proceed-btn" onClick={onClick}>Proceed To Checkout</button>
            </div>
        </div>
    )
}

export default CartAside;