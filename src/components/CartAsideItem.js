
function CartAsideItem(props) {

    const onMinusClick = () => {
        var existingIndex = props.cart.findIndex((o) => o.dishId === props.dishId);
        var localCart = props.cart.slice();
        if(localCart[existingIndex].qtyToBuy > 1) {
            localCart[existingIndex].qtyToBuy -= 1;
            props.setCart(localCart);
        }
    }

    const onPlusClick = () => {
        var existingIndex = props.cart.findIndex((o) => o.dishId === props.dishId);
        var localCart = props.cart.slice();
        // 32767 is max value of SQL SMALLINT - the type of qtyAvailable in Menu table
        if(localCart[existingIndex].qtyToBuy < 32767) {
            localCart[existingIndex].qtyToBuy += 1;
            props.setCart(localCart);
        }
    }

    return (
        <div className="cart-aside-item">
            <img src={props.imageUrl} alt={props.dishName} className="cart-aside-item-image" />
            <div className="cart-aside-item-vertical">
                <div><h5>{props.dishName} - ${props.pricePer}</h5></div>
                <div><p>{props.ingredients}</p></div>
                <button type="button" className="cart-aside-item-minus-btn" onClick={onMinusClick}>-</button>
                {props.cart[props.cart.findIndex((o) => o.dishId === props.dishId)].qtyToBuy}
                <button type="button" className="cart-aside-item-plus-btn" onClick={onPlusClick}>+</button>
            </div>
        </div>
    )
}

export default CartAsideItem