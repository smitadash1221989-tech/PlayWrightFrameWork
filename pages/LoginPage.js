import{expect}from'@playwright/test';
export class LoginPage{
    constructor(page)
    {
        this.page=page;
        this.username=page.getByRole("textbox",{name: "Username"});
        this.password=page.getByRole("textbox",{name:"Password"});
        this.loginButton=page.getByRole("button",{name:"Login"});
        this.errorMessage = page.locator("//div[@class='error-message-container error']");
        this.errorbutton = page.locator("//h3[data-test='error']");

    }
    async gotoWebpage()
    {
        await this.page.goto("https://www.saucedemo.com/");
    }
    async login(user,passwd)
    {
        await this.username.fill(user);
        await this.password.fill(passwd);
        await this.loginButton.click();
       
       
    }
    async verifyLogin()
    {
        if(await this.errorMessage.isVisible())
        {
            const error = await this.errorMessage.textContent();
            console.log(error);
            console.log("LOGIN UNSUCCESSFUL");  
        } 
       else
       {
        console.log("LOGIN SUCCESSFUL");
       }
    }
    
       
    
}