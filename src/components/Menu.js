import { useState, useEffect } from 'react';
import MenuItem from './MenuItem.js';
import CartAside from './CartAside.js';

function Menu(props) {
    const [dishes, setDishes] = useState([]);

    const getMenu = () => {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:8080/menu");

            // fires on response
            xhr.onload = () => {
                resolve(JSON.parse(xhr.response));
            };

            xhr.send();
        })
        return promise;
    }

    useEffect(() => {
        getMenu().then(responseData => {
            setDishes(responseData);
        });
    }, []);

    return (
        <div>
            <h2>Today's Menu</h2>
            <div className="menu-grid">
                {dishes.map((dish) => (
                    <MenuItem key={dish.dishId}
                                dishId={dish.dishId}
                                dishName={dish.dishName}
                                qtyAvailable={dish.qtyAvailable}
                                pricePer={dish.pricePer}
                                imageUrl={dish.imageUrl}
                                ingredients={dish.ingredients}
                                cart={props.cart}
                                setCart={props.setCart}
                    />
                ))}
            </div>
            <div className="cart-aside">
                <CartAside cart={props.cart} setCart={props.setCart} userId={props.userId} />
            </div>
        </div>
    );
}

export default Menu;