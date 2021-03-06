import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import MenuItem from './MenuItem.js';
import CartAside from './CartAside.js';

function Menu(props) {
    const { setMenu } = props;
    const history = useHistory();

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
        getMenu().then(responseData => {
            setMenu(responseData);
        });
    }, [setMenu]);

    return (
        <div>
            <h2>Today's Menu</h2>
            <div className="menu-screen">
                <div className="menu-grid">
                    {props.menu.length === 0 ? 'No menu' : props.menu.filter(item => item.qty > 0).map((item) => (
                        <MenuItem key={item.dish.dishId}
                                    dishId={item.dish.dishId}
                                    dishName={item.dish.dishName}
                                    qty={item.qty}
                                    pricePer={item.dish.pricePer}
                                    imageUrl={item.dish.imageUrl}
                                    ingredients={item.dish.ingredients}
                                    menu={props.menu}
                                    cart={props.cart}
                                    setCart={props.setCart}
                        />
                    ))}
                </div>
                <div className="cart-aside">
                    <CartAside menu={props.menu} cart={props.cart} setCart={props.setCart} userId={props.userId} />
                </div>
            </div>
        </div>
    );
}

export default Menu;