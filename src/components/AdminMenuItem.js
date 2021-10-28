import { FaTrashAlt } from 'react-icons/fa';

function AdminMenuItem(props) {

    const onDishNameChange = (e) => {
        var indexInAdminMenu = props.adminMenu.findIndex((o) => o.dishId === props.dishId);
        var localAdminMenu = props.adminMenu.slice();

        localAdminMenu[indexInAdminMenu].dishName = e.target.value;
        props.setAdminMenu(localAdminMenu);
    }

    const onPricePerChange = (e) => {
        var indexInAdminMenu = props.adminMenu.findIndex((o) => o.dishId === props.dishId);
        var localAdminMenu = props.adminMenu.slice();

        localAdminMenu[indexInAdminMenu].pricePer = e.target.value;
        props.setAdminMenu(localAdminMenu);
    }
    
    const onMinusClick = (e) => {
        var indexInAdminMenu = props.adminMenu.findIndex((o) => o.dishId === props.dishId);
        var localAdminMenu = props.adminMenu.slice();

        if(localAdminMenu[indexInAdminMenu].qty - 1 >= 0) {
            localAdminMenu[indexInAdminMenu].qty -= 1;
            props.setAdminMenu(localAdminMenu);
        }
    }

    const onQtyBoxChange = (e) => {
        var indexInAdminMenu = props.adminMenu.findIndex((o) => o.dishId === props.dishId);
        var localAdminMenu = props.adminMenu.slice();

        if(e.target.value >= 0 && e.target.value <= 32767) {
            localAdminMenu[indexInAdminMenu].qty = e.target.value;
            props.setAdminMenu(localAdminMenu);
        }
    }

    const onPlusClick = (e) => {
        var indexInAdminMenu = props.adminMenu.findIndex((o) => o.dishId === props.dishId);
        var localAdminMenu = props.adminMenu.slice();

        if(localAdminMenu[indexInAdminMenu].qty + 1 <= 32767) {
            localAdminMenu[indexInAdminMenu].qty += 1;
            props.setAdminMenu(localAdminMenu);
        }
    }

    const onIngredientsChange = (e) => {
        var indexInAdminMenu = props.adminMenu.findIndex((o) => o.dishId === props.dishId);
        var localAdminMenu = props.adminMenu.slice();

        localAdminMenu[indexInAdminMenu].ingredients = e.target.value;
        props.setAdminMenu(localAdminMenu);
    }

    const onImageUrlChange = (e) => {
        var indexInAdminMenu = props.adminMenu.findIndex((o) => o.dishId === props.dishId);
        var localAdminMenu = props.adminMenu.slice();

        localAdminMenu[indexInAdminMenu].imageUrl = e.target.value;
        props.setAdminMenu(localAdminMenu);
    }

    const deleteItem = (e) => {
        var indexInAdminMenu = props.adminMenu.findIndex((o) => o.dishId === props.dishId);
        var localAdminMenu = props.adminMenu.slice();

        localAdminMenu.splice(indexInAdminMenu, 1);
        props.setAdminMenu(localAdminMenu);
    }

    return (
        <div className="admin-menu-item">
            <div className="label-above-input">
                <label forHtml="dishName">Dish name:</label>
                <input type="text" value={props.dishName} onChange={onDishNameChange} />
            </div>
            <div className="label-above-input">
                <label forHtml="pricePer">Price per:</label>
                <input type="number" id="pricePer" min="0.01" step="0.01" value={Number(props.pricePer).toFixed(2)} onChange={onPricePerChange} />
            </div>
            <div className="label-above-input">
                <label forHtml="qty">Price per:</label>
                <div>
                    <button type="button" onClick={onMinusClick}>-</button>
                    <input type="text" value={props.qty} onChange={onQtyBoxChange} />
                    <button type="button" onClick={onPlusClick}>+</button>
                </div>
            </div>
            <div className="label-above-input">
                <label forHtml="ingredients">Ingredients:</label>
                <input type="textarea" value={props.ingredients} onChange={onIngredientsChange} />
            </div>
            <div className="label-above-input">
                <label forHtml="imageUrl">Image URL:</label>
                <input type="text" value={props.imageUrl} onChange={onImageUrlChange} />
            </div>
            <FaTrashAlt style={{ cursor: 'pointer' }} onClick={deleteItem} />
        </div>
    )
}

export default AdminMenuItem;