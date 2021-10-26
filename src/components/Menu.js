import { useState, useEffect } from 'react';

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
            <h2>Menu</h2>
            {dishes.map((d) => (
                <p key={d.dishId}>{d.dishName}</p>
            ))}
        </div>
    );
}

export default Menu;