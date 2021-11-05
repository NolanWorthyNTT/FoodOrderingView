import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminMenuItem from './AdminMenuItem.js';
import PastDishItem from './PastDishItem.js';

function Admin(props) {
    const [adminMenu, setAdminMenu] = useState([]);
    const [dishes, setDishes] = useState([]);
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

    const getDishes = () => {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:8080/dishes");

            // fires on response
            xhr.onload = () => {
                resolve(JSON.parse(xhr.response));
            };

            xhr.send();
        })
        return promise;
    }

    const postNewMenu = (requestData) => {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:8080/uploadMenu");

            xhr.setRequestHeader('Content-type', 'application/json');

            // fires on response
            xhr.onload = () => {
                resolve();
            };

            xhr.send(JSON.stringify(requestData));
        })
        return promise;
    }

    useEffect(() => {
        if(props.role !== 'admin') {
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
            setAdminMenu(responseData);
        });

        getDishes().then(responseData => {
            setDishes(responseData);
        });
    }, []);

    const addDish = (e) => {
        setAdminMenu([...adminMenu, {dish: {dishId: -1, dishName: "", pricePer: 0, imageUrl: "", ingredients: ""}, qty: 0}]);
    }
    
    const submitMenu = (e) => {
        var dishesHaveNeededInput = true;
        for(const dish of adminMenu) {
            if(!dish.dish.dishName || dish.dish.pricePer === null || dish.dish.pricePer < 0 || dish.qty === null || dish.qty < 0) {
                dishesHaveNeededInput = false;
                break;
            }
            dishesHaveNeededInput = true;
        }

        if(dishesHaveNeededInput) {
            if(window.confirm('Current menu will be overwritten with new menu. Are you sure?')) {
                postNewMenu(adminMenu);
            }
        } else {
           alert('Every dish must have a name, price, and quantity in order to be added to the menu');
        }
    }

    return (
        <div>
            <div className="current-menu">
                <h3>Current Menu</h3>
                <div className="admin-menu">
                    {adminMenu.map((dish) => (
                        <AdminMenuItem key={dish.dish.dishId}
                                    dishId={dish.dish.dishId}
                                    dishName={dish.dish.dishName}
                                    qty={dish.qty}
                                    pricePer={dish.dish.pricePer}
                                    imageUrl={dish.dish.imageUrl}
                                    ingredients={dish.dish.ingredients}
                                    adminMenu={adminMenu}
                                    setAdminMenu={setAdminMenu}
                                    dishes={dishes}
                                    setDishes={setDishes}
                        />
                    ))}
                </div>
                    <button onClick={addDish}>Add Dish</button>
                    <button onClick={submitMenu}>Submit Menu</button>
            </div>
            <div className="all-past-dishes">
                <h3>All Past Dishes</h3>
                <div className="past-dishes-list">
                    {/* only show dishes in All Past Dishes that aren't in menu */}
                    {dishes.filter((dish) => !adminMenu.some(i => i.dish.dishId === dish.dishId))
                        .map((dish) => (
                            <PastDishItem key={dish.dishId}
                                            dishId={dish.dishId}
                                            dishName={dish.dishName}
                                            pricePer={dish.pricePer}                
                                            imageUrl={dish.imageUrl}
                                            ingredients={dish.ingredients}
                                            adminMenu={adminMenu}
                                            setAdminMenu={setAdminMenu}
                                            dishes={dishes}
                                            setDishes={setDishes}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Admin;