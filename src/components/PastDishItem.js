import { FaPlusCircle } from 'react-icons/fa';

function PastDishItem(props) {
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
            <div className="label-above-input">
                <label htmlFor="dishName">Dish name:</label>
                {props.dishName}
            </div>
            <div className="label-above-input">
                <label htmlFor="pricePer">Price per:</label>
                {props.pricePer}
            </div>
            <div className="label-above-input">
                <label htmlFor="ingredients">Ingredients:</label>
                {props.ingredients}
            </div>
            <div className="label-above-input">
                <label htmlFor="imageUrl">Image URL:</label>
                {props.imageUrl}
            </div>
        </div>
    )
}

export default PastDishItem;