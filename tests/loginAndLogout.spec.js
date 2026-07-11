import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import loginData from '../test-data/loginData.json' with {type: 'json'};
let loginPg;
let logoutPg;
test.beforeEach(async({page})=>{
    loginPg = new LoginPage(page);
    logoutPg = new LogoutPage(page);
    await loginPg.gotoWebpage();
     console.log("url navigation success");
    
})
test("VerifyLoginLogout", async({page})=>{
    await loginPg.login(loginData.ValidUser.username,loginData.ValidUser.password);
    await loginPg.verifyLogin();
    console.log("login successfull");
    await logoutPg.logout();
    console.log("the logout is successful");
})
test("LockedUser @smoke",async({page})=>{
    await loginPg.login((loginData.lockedUser.username),(loginData.lockedUser.password));
    await loginPg.verifyLogin();
    
})
test("EmptyUser", async({page})=>{
    await loginPg.login(loginData.EmptyUser.username,loginData.EmptyUser.password);
    await loginPg.verifyLogin();
    
    
   
})