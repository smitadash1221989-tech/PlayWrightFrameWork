import{test}from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import loginData from '../test-data/loginData.json' with {type:'json'};
import { CartPage } from '../pages/CartPage';
let loginpg;
let inventorypg;
let cartpg ;
test.beforeEach('loginTestcase',async({page})=>{
    loginpg = new LoginPage(page);
    inventorypg=new InventoryPage(page);
    cartpg = new CartPage(page);
    await loginpg.gotoWebpage();
    await loginpg.login(loginData.ValidUser.username,loginData.ValidUser.password);
    await loginpg.verifyLogin();
    await inventorypg.addProduct(loginData.ProductByName.prod1.id);
    await inventorypg.addProduct(loginData.ProductByName.prod2.id);
    await inventorypg.addProduct(loginData.ProductByName.prod3.id);
    await inventorypg.Openshoppingcart();
   
})
test("verify-cart-details", async({page})=>{
    
    await cartpg.itemsInCart();
    await cartpg.clickContinueShopping();
    await inventorypg.verifyProductscreen();
    await inventorypg.Openshoppingcart();
   
})
test("remove-Product-From-Cart",async({page})=>{
    await cartpg.itemsInCart();
    await cartpg.removeProduct(loginData.ProductByName.prod2.id);
    await cartpg.verifyProductRemoval(loginData.ProductByName.prod2.name);
    await cartpg.itemsInCart();

})
test("checkout",async({page})=>{
  await cartpg.checkoutProcess();
})
//npx playwright test tests/cartpage.spec.js --grep "verify-cart-details"