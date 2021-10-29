

const OrderItemDetails = (props) => {
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

    return (
        <div className="order-item-details">
            <img src={props.item.imageUrl ? props.item.imageUrl : defaultImage} alt={props.item.dishName} className="order-item-details-image" />
            <div>
                <div><h5>{props.item.dishName}</h5></div>
                <div><p>{props.item.ingredients}</p></div>
                <p>Price: ${props.item.pricePer.toFixed(2)} | Quantity purchased: {props.item.qty}</p>
            </div>
        </div>
    )
}

export default OrderItemDetails;