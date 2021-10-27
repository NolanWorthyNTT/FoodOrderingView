import { useState } from 'react';

function CartAsideItem(props) {
    const [cartQty, setCartQty] = useState(props.qtyToBuy);

    
    const onMinusClick = () => {
        if(cartQty > 1) {
            setCartQty(cartQty-1);
        }
    }

    const onPlusClick = () => {
        // 32767 is max value of SQL SMALLINT - the type of qtyAvailable in Menu table
        if(cartQty < 32767) {
            setCartQty(cartQty+1);
        }
    }

    return (
        <div className="cart-aside-item">
            <img src={props.imageUrl} alt={props.dishName} className="cart-aside-item-image" />
            <div className="cart-aside-item-vertical">
                <div><h5>{props.dishName} - ${props.pricePer}</h5></div>
                <div><p>{props.ingredients}</p></div>
                <button type="button" className="cart-aside-item-minus-btn" onClick={onMinusClick}>-</button>
                {cartQty}
                <button type="button" className="cart-aside-item-plus-btn" onClick={onPlusClick}>+</button>
            </div>
        </div>
    )
}

export default CartAsideItem