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
        if(qty < 32767) {
            setQty(qty+1);
        }
    }

    const onQtyBoxChange = (e) => {
        console.log('change');
        if(e.target.value >= 0 && e.target.value <= 32767) {
            setQty(e.target.value);
        }
    }

    const addToCart = (e) => {
        if(qty > 0) {
            var existingIndex = props.cart.findIndex((o) => o.dishId === props.dishId);
            if(existingIndex > -1) {
                // if item being added to cart is already in cart, add to its quantity
                var localCart = props.cart.slice();
                localCart[existingIndex].qtyToBuy += qty;
                props.setCart(localCart);
            } else {
                // otherwise, add new item to existing cart
                props.setCart([...props.cart, {
                    dishId: props.dishId,
                    dishName: props.dishName,
                    qtyToBuy: qty,
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