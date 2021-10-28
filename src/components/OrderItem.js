

function OrderItem(props) {
    const showDetails = () => {

    }

    return (
        <div className="order-item">
            Order ID: {props.orderId}
            <p>Total: ${props.total.toFixed(2)} - {props.dateOfOrder}</p>
            <button className="order-item-show-details-btn" onClick={showDetails}>Show Details</button>
        </div>
    )
}

export default OrderItem;