import{test}from'@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'
import loginData from '../test-data/loginData.json' with {type:'json'};
import { CheckOutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
let inventorypg;
let loginpg;
let checkoutpg;
let cartpg;
test.beforeEach(async({page})=>{
     loginpg = new LoginPage(page);
     inventorypg = new InventoryPage(page);
     checkoutpg=new CheckOutPage(page);
     cartpg = new CartPage(page);
    await loginpg.gotoWebpage();
    await loginpg.login(loginData.ValidUser.username,loginData.ValidUser.password);
    await inventorypg.verifyProductscreen();
    console.log("the login is successful and user is inside the product listview screen");
    await inventorypg.addProduct(loginData.ProductByName.prod1.id);
    await inventorypg.addProduct(loginData.ProductByName.prod2.id);
    await inventorypg.addProduct(loginData.ProductByName.prod3.id);
    await inventorypg.Openshoppingcart();
    await cartpg.checkoutProcess();
})
test("CheckOutPage",async({page})=>{
    
    await checkoutpg.checkoutdetails("Smita","Dash","566112");
    await checkoutpg.verifyCheckout();
    })
test("cancelCheckout",async({page})=>{
    
    await checkoutpg.cancelButton();
})
    