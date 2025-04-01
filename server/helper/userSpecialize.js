const userDataModel = require("../models/userDataModel.js")
async function userSpecialize(user, products) {
  const userData = await userDataModel.findOne({user : user});
//  console.log("userData ----");
//  console.log(userData[0]);
/*console.log(userData);
console.log(user);
console.log(products);*/
console.log("userSpecialization :"+user);
console.log(userData);
  const cart = userData.cart;
  const wishlist = userData.wishlist;
  products.forEach(p => ({...p}));
  products = products.map(p => {
    const plainP = p.toObject ? p.toObject() : {...p};
    console.log("Before adding user special props")
    console.log(p);
    plainP.count = cart.get(String(p.product_code)) ?? 0;
    console.log(plainP.count);
    plainP.wished = wishlist.includes(String(p.product_code));
    console.log(p.wished);
    console.log("After adding user special props")
    console.log(p);
    return plainP;
  });
  return products;
//  console.log(products);
}

module.exports = userSpecialize;