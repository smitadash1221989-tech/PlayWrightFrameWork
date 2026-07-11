import{test}from'@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import loginData from '../test-data/loginData.json' with {type: 'json'};
let inventorypg;
let loginpg;

test.beforeEach(async({page})=>{
     loginpg = new LoginPage(page);
     inventorypg = new InventoryPage(page);
    await loginpg.gotoWebpage();
    await loginpg.login(loginData.ValidUser.username,loginData.ValidUser.password);
    await inventorypg.verifyProductscreen();
    console.log("the login is successful and user is inside the product listview screen");
})

test('VerifyProductcount',async({page})=>{
    await inventorypg.productCount();
    await inventorypg.productNamesList();
    await page.screenshot({
        path:"screenshots/screen1.png"
    });
    

})
test('verifySorting',async({page})=>{
    
    await inventorypg.productListSort(loginData.SortOrder.sort4);
    await page.screenshot({
        path:"screenshots/screen2.png"
    });
})
//testcase to show product name,product description and price
test('verifyProductDetails',async({page})=>{
      
    await inventorypg.productDescription();
    
})
test('AddRemoveProduct',async({page})=>{
    
    await inventorypg.addProduct(loginData.ProductByName.prod1.id);
    await inventorypg.addProduct(loginData.ProductByName.prod2.id);
    console.log("the item is added successfully");
    await inventorypg.verifyProduct(loginData.ProductByName.prod1.name);
    await inventorypg.cartCount();
    console.log("cart counted");
    await inventorypg.removeProduct(loginData.ProductByName.prod1.id);
    console.log("the item is removed");
    await inventorypg.cartCount();
    console.log("open cart");
    await inventorypg.Openshoppingcart();
    await inventorypg.verifyShoppingcart()
    console.log("user is in the shopping cart")
  
    

    
})
// npx playwright test tests/inventoryPage.spec.js --grep "AddRemoveProduct"

