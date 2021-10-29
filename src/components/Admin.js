import { useState, useEffect } from 'react';
import AdminMenuItem from './AdminMenuItem.js';
import PastDishItem from './PastDishItem.js';

function Admin() {
    const [adminMenu, setAdminMenu] = useState([]);
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
        getMenu().then(responseData => {
            setAdminMenu(responseData);
        });

        getDishes().then(responseData => {
            setDishes(responseData);
        });
    }, []);

    const addDish = (e) => {
        setAdminMenu([...adminMenu, {dishId: -1, dishName: "", qty: 0, pricePer: 0, imageUrl: "", ingredients: ""}]);
    }
    
    const submitMenu = (e) => {
        var dishesHaveNeededInput = false;
        for(const dish of adminMenu) {
            if(!dish.dishName || dish.pricePer === null || dish.pricePer < 0 || dish.qty === null || dish.qty < 0) {
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
                        <AdminMenuItem key={dish.dishId}
                                    dishId={dish.dishId}
                                    dishName={dish.dishName}
                                    qty={dish.qty}
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
                    <button onClick={addDish}>Add Dish</button>
                    <button onClick={submitMenu}>Submit Menu</button>
            </div>
            <div className="all-past-dishes">
                <h3>All Past Dishes</h3>
                <div className="past-dishes-list">
                    {/* only show dishes in All Past Dishes that aren't in menu */}
                    {dishes.filter((dish) => !adminMenu.some(i => i.dishId === dish.dishId))
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