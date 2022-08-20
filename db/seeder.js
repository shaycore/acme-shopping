const { faker } = require('@faker-js/faker');

randomizeUser = () => {
    return {
        username: faker.internet.userName(),
        password: 'password',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isGuest: 0,
        isAdmin: 0,
        avatar: faker.image.avatar()
    }
}

randomizeProduct = () => {
    return {
        name: faker.commerce.productName(),
        type: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        brand: faker.commerce.productName(),
        size: "XL",
        color: faker.color.human(),
        image: `${faker.image.fashion(250,250)}?random=${Math.round(Math.random() * 100)}`,
        price: faker.commerce.price()
    }
}

randomizeLineItem = () => {
    return {
        quantity: Math.floor((Math.random() * 3) + 1),
        orderId: 1,
        productId: Math.floor((Math.random() * 10) + 1)
    }
}

productSeed = (name,type,brand,size,color,price) => {
    return {
        name: name,
        type: type,
        description: faker.commerce.productDescription(),
        brand: brand,
        size: size,
        color: color,
        image: `https://i.postimg.cc/g09V6ryb/placeholder-image.jpg`,
        price: price
    }
}

const USERS = [];
const PRODUCTS = [];
const LINEITEMS = [];

PRODUCTS.push(productSeed('Takeya Actives Insulated Water Bottle','Stainless Steel','Takeya','22 oz','Purple',24.99));
PRODUCTS.push(productSeed('Takeya Actives Insulated Water Bottle','Stainless Steel','Takeya','40 oz','Lilac',35.99));
PRODUCTS.push(productSeed('Hydro Flask Standard Mouth','Stainless Steel','Hydro Flask','21 oz','Green',35.99));
PRODUCTS.push(productSeed('Hydro Flask Standard Mouth','Stainless Steel','Hydro Flask','21 oz','Blue',35.99));
PRODUCTS.push(productSeed('CamelBak Eddy+','Plastic','CamelBak','25 oz','Blue',16.99));
PRODUCTS.push(productSeed('Purifyou Premium','Glass','Purifyou','22 oz','Blue',20.99));
PRODUCTS.push(productSeed('CamelBak Podium','Plastic','CamelBak','21 oz','Clear',11.99));
PRODUCTS.push(productSeed('Purist Mover','Glass','Purist','18 oz','Gray',48.99));
PRODUCTS.push(productSeed('Yeti Rambler Bottle','Metal','Yeti','18 oz','Yellow',30.99));
PRODUCTS.push(productSeed('Yeti Rambler Jr Bottle','Metal','Yeti','12 oz','Pink',25.99));

// Array.from({length: 10}).forEach(()=>PRODUCTS.push(randomizeProduct()));
Array.from({length: 3}).forEach(()=>USERS.push(randomizeUser()));
Array.from({length: 2}).forEach(()=>LINEITEMS.push(randomizeLineItem()));

module.exports = {
    USERS,
    PRODUCTS,
    LINEITEMS,
    randomizeUser,
    randomizeProduct
}