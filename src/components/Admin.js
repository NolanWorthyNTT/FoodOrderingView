import { useState, useEffect } from 'react';
import AdminMenuItem from './AdminMenuItem.js';

function Admin() {
    const [adminMenu, setAdminMenu] = useState([]);

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
            setAdminMenu(responseData);
        });
    }, []);

    const addDish = (e) => {
        setAdminMenu([...adminMenu, {}]);
    }

    return (
        <div>
            <div>
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
                        />
                    ))}
                </div>
                    <button onClick={addDish}>Add Dish</button>
            </div>
            <div>
                <h3>All past dishes</h3>
            </div>
        </div>
    );
}

export default Admin;