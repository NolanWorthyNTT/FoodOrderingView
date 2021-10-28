import { useState } from 'react';

function MenuItem(props) {
    const [qty, setQty] = useState(0);

    const onMinusClick = () => {
        if(qty > 0) {
            setQty(qty-1);
        }
    }

    const onPlusClick = () => {
        // 32767 is max value of SQL SMALLINT - the type of qtyAvailable in Menu table
        if(qty < props.qty) {
            setQty(qty+1);
        }
    }

    const onQtyBoxChange = (e) => {
        if(e.target.value >= 0 && e.target.value <= props.qty) {
            setQty(e.target.value);
        }
    }

    const addToCart = (e) => {
        if(qty > 0) {
            var indexInCart = props.cart.findIndex((o) => o.dishId === props.dishId);
            var indexInMenu = props.menu.findIndex((o) => o.dishId === props.dishId);
            if(indexInCart > -1) {
                // if item being added to cart is already in cart, add to its quantity
                var localCart = props.cart.slice();
                if(localCart[indexInCart].qty + qty <= props.menu[indexInMenu].qty) {
                    localCart[indexInCart].qty += qty;
                    props.setCart(localCart);
                } else {
                    alert('Exceeds remaining quantity of dish');
                }
            } else {
                // otherwise, add new item to existing cart
                props.setCart([...props.cart, {
                    dishId: props.dishId,
                    dishName: props.dishName,
                    qty: qty,
                    pricePer: props.pricePer,
                    imageUrl: props.imageUrl,
                    ingredients: props.ingredients
                }]);
            }
        }
    }

    return (
        <div className="menu-grid-item">
            <img src={props.imageUrl} alt={props.dishName} className="menu-item-image" />
            <h5>{props.dishName} - ${props.pricePer.toFixed(2)}</h5>
            <p>{props.ingredients}</p>
            <p>Remaining: {props.qty}</p>
            <div className="menu-item-footer">
                <button type="button" className="menu-item-minus-btn" onClick={onMinusClick}>-</button>
                <input type="text" className="menu-item-qty-text" size="5" value={qty} onChange={onQtyBoxChange} />
                <button type="button" className="menu-item-plus-btn" onClick={onPlusClick}>+</button>
                <button type="button" className="menu-item-add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    )
}

export default MenuItem;