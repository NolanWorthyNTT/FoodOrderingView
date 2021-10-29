import { FaPlusCircle } from 'react-icons/fa';

function PastDishItem(props) {
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

    const addToMenu = (e) => {
        // add dish to adminMenu
        props.setAdminMenu([...props.adminMenu, {dishId: props.dishId,
                                                    dishName: props.dishName,
                                                    qty: 0,
                                                    pricePer: props.pricePer,
                                                    imageUrl: props.imageUrl,
                                                    ingredients: props.ingredients}]);
    }

    return (
        <div className="admin-menu-item">
            <FaPlusCircle style={{ cursor: 'pointer' }} onClick={addToMenu}/>
            <img src={props.imageUrl ? props.imageUrl : defaultImage} alt={props.dishName} className="past-dish-item-image" />
            <div className="label-above-field">
                <label htmlFor="dishName">Dish name:</label>
                {props.dishName}
            </div>
            <div className="label-above-field">
                <label htmlFor="pricePer">Price per:</label>
                ${props.pricePer.toFixed(2)}
            </div>
            <div className="label-above-field">
                <label htmlFor="ingredients">Ingredients:</label>
                {props.ingredients}
            </div>
            <div className="label-above-field">
                <label htmlFor="imageUrl">Image URL:</label>
                {props.imageUrl}
            </div>
        </div>
    )
}

export default PastDishItem;