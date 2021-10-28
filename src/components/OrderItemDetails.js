

const OrderItemDetails = (props) => {
    return (
        <div className="order-item-details">
            <img src={props.item.imageUrl} alt={props.item.dishName} className="order-item-details-image" />
            <div>
                <div><h5>{props.item.dishName}</h5></div>
                <div><p>{props.item.ingredients}</p></div>
                <p>Price: {props.item.pricePer.toFixed(2)} | Quantity purchased: {props.item.qty}</p>
            </div>
        </div>
    )
}

export default OrderItemDetails;