
let products = [
    {
        id: 1,
        name: "boots",
        Image: 'https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&dpr=1&w=500',
        price: 1200
    }, {
        id: 2,
        name: "snikers",
        Image: 'https://images.pexels.com/photos/10963373/pexels-photo-10963373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        price: 6200
    },
    {
        id: 3,
        name: "Adidas",
        Image: 'https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        price: 1600
    },
    {
        id: 4,
        name: "Nike",
        Image: 'https://images.pexels.com/photos/11281577/pexels-photo-11281577.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        price: 3600
    }


]

let cart = [
    // {
    //     productId:1,
    //     quantity:3
    // }

]

let productListTag = document.querySelector('#products .row')

let renderProducts = () => {
    productListTag.innerHTML = ""
    products.forEach(product => {
        let cartBtn = `<a  class="btn btn-primary" onClick="handleAddToCart(${product.id})">Add to Cart</a>`
        cart.forEach(item => {
            if (item.productId == product.id) {
                console.log("yes");
                cartBtn = `<a class="btn btn-primary" onclick="removeItem(${product.id})" >-</a> ${item.quantity} <a  class="btn btn-primary" onclick="addMoreItem(${product.id})" >+</a>`

            }
        })

        productListTag.innerHTML += `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
                        <div class="card">
                            <img src="${product.Image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">₹${product.price}</p>
                                ${cartBtn}
                                
                            </div>
                        </div>
                    </div>`
    })
}


let handleAddToCart = (id) => {

    console.log("inside of function:", cart);
    console.log('product id', id);
    cart.push({
        productId: id,
        quantity: 1,

    })

    renderProducts();
}

let addMoreItem = (id) => {

    cart = cart.map(item => {
        if (item.productId == id) {
            item.quantity++;
        }
        return item

    })

    renderProducts();

}

let removeItem = (id) => {

    cart.forEach((item, index) => {
        if (item.productId == id && item.quantity > 1) {
            cart[index].quantity--;
        } else if (item.productId == id || item.quantity == 1) {
            cart = cart.filter(item => item.productId != id)
        }
        return item

    })

    renderProducts();

}

// data-bs-toggle="modal" data-bs-target="#CartModal" 

let cartBodyTag = document.querySelector('#cartItems')


let renderCart = () => {

}


renderProducts();