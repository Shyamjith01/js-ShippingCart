
let products = [
    {
        id: 1,
        name: "boots",
        Image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        price: 1200
    }, {
        id: 2,
        name: "snikers",
        Image: 'https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
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
    },
    {
        id:5,
        name:"puma",
        Image:'https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        price:4800
    },
    {
        id:5,
        name:"nike s1",
        Image:'https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=546&q=80',
        price:5200
    },
    {
        id:5,
        name:"snikers s2",
        Image:'https://images.unsplash.com/photo-1581017316696-709bf1da2ed5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        price:1900
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
        let cartBtn = `<a  class="orangeBtn btn btn-primary" onClick="handleAddToCart(${product.id})">Add to Cart</a>`
        cart.forEach(item => {
            if (item.productId == product.id) {
                console.log("yes");
                cartBtn = `<a class="orangeBtn btn btn-primary" onclick="removeItem(${product.id})" >-</a> ${item.quantity} <a  class="orangeBtn btn btn-primary" onclick="addMoreItem(${product.id})" >+</a>`

            }
        })

        productListTag.innerHTML += `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
                        <div class="card">
                            <img src="${product.Image}" class="proImg card-img-top" alt="...">
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
    renderCart();

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
    renderCart();

}

// data-bs-toggle="modal" data-bs-target="#CartModal" 

let cartBodyTag = document.querySelector('#CartModal .modal-body')
let mainBtnTag = document.querySelector('#mainBtn')

let renderCart = () => {

    cartBodyTag.innerHTML = ""
    let cartTotal = 0;

    cart.forEach(item => {
        let product = products.filter(prod => prod.id === item.productId)
        cartTotal += product[0].price * item.quantity
        cartBodyTag.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${product[0].Image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${product[0].name}</h5>
                    <p class="card-text">₹${product[0].price} x ${item.quantity}</p>
                    <a class="orangeBtn btn btn-primary" onclick="removeItem(${product[0].id})" >-</a> ${item.quantity} <a  class="orangeBtn btn btn-primary" onclick="addMoreItem(${product[0].id})" >+</a>
                </div>
            </div>
        </div>
        </div>`
    })

    document.querySelector('#cartTotal').innerHTML = "Total : " + cartTotal
    mainBtnTag.innerHTML = `<button type="button"  class="orangeBtn btn btn-primary" onclick="handleCheckout()">Checkout</button>`

}





let handleCheckout = () => {
    cartBodyTag.innerHTML = `<div class="mb-3">
    <label for="fullNameInput" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="fullNameInput"
        placeholder="full name">
</div>
<div class="mb-3">
    <label for="emailInput" class="form-label">Email address</label>
    <input type="email" class="form-control" id="emailInput"
        placeholder="name@example.com">
</div>`
    mainBtnTag.innerHTML = `<button type="button"  class="btn btn-primary" onclick="handleOrder()">Order</button>`

}


let handleOrder = () => {
    let fullName = document.querySelector('#fullNameInput').value
    let email = document.querySelector('#emailInput').value

    cartBodyTag.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </symbol>
                    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </symbol>
                    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </symbol>
                </svg>
    <div class="alert alert-success d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    <div>
      <h5>Your Order Placed</h5>
      <p>Thank You <strong>${fullName}</strong>, Your item will delivered soon <br> you will get email your <strong>${email}</strong> email  adress regarding order proccess</p>
    </div>
  </div>`

  mainBtnTag.innerHTML= ''

}



renderProducts();