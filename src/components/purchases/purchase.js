export const Purchase = ({ id, productName, productPrice }) => {
    return <section className="purchase" key={`purchase--${id}`}>
                        <div>
                            <div to={`/purchases/${id}`} >Product: {productName}</div>
                        </div>
                        <div>Price: ${productPrice}</div>
                    </section>

}