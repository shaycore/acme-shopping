const conn = require('./conn');
const { Sequelize } = conn;
const { STRING, BOOLEAN, VIRTUAL, TEXT } = Sequelize;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = conn.define('user', {
  username: {
    type: STRING
  },
  password: {
    type: STRING
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  isGuest: {
    type: BOOLEAN,
    defaultValue: true
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false
  },
  fullName: {
    type: VIRTUAL,
    get: function(){
      return `${this.firstName} ${this.lastName}`;
    }
  },
  avatar: {
    type: TEXT
  } 
});


User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.prototype.createOrderFromCart = async function(){
  const cart = await this.getCart();
  cart.isCart = false;
  return cart.save();
}

User.prototype.addToCart = async function({ product, quantity}){
  const cart = await this.getCart();
  let lineItem = await conn.models.lineItem.findOne({
    where: {
      productId: product.id,
      orderId: cart.id
    }
  });
  if(lineItem){
    lineItem.quantity = quantity;
    if(lineItem.quantity){
      await lineItem.save();
    }
    else {
      await lineItem.destroy();
    }
  }
  else {
    await conn.models.lineItem.create({ productId: product.id, quantity, orderId: cart.id });
  }
  return this.getCart();
}

User.prototype.getCart = async function(){
  let order = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [ conn.models.product ]
      }
    ]
  });
  if(!order){
    order = await conn.models.order.create({ userId: this.id });
    order = await conn.models.order.findByPk(order.id, {
      include: [ conn.models.lineItem ]
    });
  }
  return order;
}

User.prototype.getPreviousOrders = async function () {
  let order = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: false
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product]
      }
    ]
  });
  return order;
}

User.authenticate = async function(credentials){
  const user = await this.findOne({
    where: {
      username: credentials.username
    } 
  });
  if(user && await bcrypt.compare(credentials.password, user.password)){
    return jwt.sign({ id: user.id}, process.env.JWT);
  }
  else {
    const error = new Error('Bad Credentials');
    error.status = 401;
    throw error;
  }
}

User.findByToken = async function findByToken(token){
  try {
    const id = jwt.verify(token, process.env.JWT).id;
    const user = await User.findByPk(id);
    if(!user){
      throw 'error';
    }
    return user;
  }
  catch(ex){
    const error = new Error('bad token');
    error.status = 401;
    throw error;
  }
}

User.isAdmin = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user.isAdmin) {
      throw 'error';
    }
    return user;
  } catch (err) {
    const error = Error("User is not admin");
    error.status = 401;
    throw error;
  }
};

// User.prototype.getWishlist = async function(){
//   let wishlist = await conn.models.wishlist.findOne({
//     where: {
//       userId: this.id
//     },
//     include: [
//       {
//         model: conn.models.wishlistProduct,
//         include: [ conn.models.product ]
//       }
//     ]
//   });
//   if(!wishlist){
//     wishlist = await conn.models.wishlist.create({ userId: this.id });
//     wishlist = await conn.models.order.findByPk(wishlist.id, {
//       include: [ conn.models.wishlistProduct ]
//     });
//   }
//   return wishlist;
// }


module.exports = User;

