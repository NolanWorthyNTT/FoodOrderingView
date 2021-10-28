import { FaTrashAlt } from 'react-icons/fa';

function CartAsideItem(props) {

    const onMinusClick = () => {
        var indexInCart = props.cart.findIndex((o) => o.dishId === props.dishId);
        var localCart = props.cart.slice();

        if(localCart[indexInCart].qty > 1) {
            localCart[indexInCart].qty -= 1;
            props.setCart(localCart);
        }
    }

    const onPlusClick = () => {
        var indexInCart = props.cart.findIndex((o) => o.dishId === props.dishId);
        var indexInMenu = props.menu.findIndex((o) => o.dishId === props.dishId);
        var localCart = props.cart.slice();

        if(localCart[indexInCart].qty < props.menu[indexInMenu].qty) {
            localCart[indexInCart].qty += 1;
            props.setCart(localCart);
        }
    }

    const deleteItem = () => {
        var indexInCart = props.cart.findIndex((o) => o.dishId === props.dishId);
        var localCart = props.cart.slice();

        localCart.splice(indexInCart, 1);
        props.setCart(localCart);
    }

    return (
        <div className="cart-aside-item">
            <img src={props.imageUrl} alt={props.dishName} className="cart-aside-item-image" />
            <div className="cart-aside-item-vertical">
                <div><h5>{props.dishName} - ${props.pricePer}</h5></div>
                <div><p>{props.ingredients}</p></div>
                <button type="button" className="cart-aside-item-minus-btn" onClick={onMinusClick}>-</button>
                {props.cart[props.cart.findIndex((o) => o.dishId === props.dishId)].qty}
                <button type="button" className="cart-aside-item-plus-btn" onClick={onPlusClick}>+</button>
                <FaTrashAlt style={{ cursor: 'pointer' }} onClick={deleteItem} />
            </div>
        </div>
    )
}

export default CartAsideItem