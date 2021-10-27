import CartAsideItem from "./CartAsideItem.js";

function cartAside(props) {
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
                <button type="button" className="cart-aside-proceed-btn" onClick={onClick}>Proceed To Checkout</button>
            </div>
        </div>
    )
}

export default cartAside;