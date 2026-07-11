//Complete Checkout
//Empty First Name Validation
//Empty Last Name Validation
//Empty Zip Code Validation
//Verify Order Confirmation
import {expect} from '@playwright/test';
export class CheckOutPage{
    constructor(page)
    {
        this.page=page;
        this.firstname= page.getByRole("textbox",{name:"First Name"});
        this.lastname=page.getByRole("textbox",{name:"Last Name"});
        this.zipcode=page.getByRole("textbox",{name:"Zip/Postal Code"});
        this.cancelBtn=page.getByAltText("Go back");
        this.continueBtn=page.getByRole("button",{name:"Continue"});
        

    }
    async checkoutdetails(fname,lname,zip)
    {
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.zipcode.fill(zip);
        await this.continueBtn.click();
    }
    async verifyCheckout()
    {
        await expect(this.page.getByText("Checkout: Overview")).toBeVisible();
        console.log("the user is in the checkout screen");
        console.log("the checkout screen details: ");
        await this.page.locator("//button[@id='finish']").click();
        await expect(this.page.getByRole("heading",{name:"Thank you for your order!"})).toBeVisible();
        console.log(await this.page.locator("//div[@class='complete-text']").textContent());
    }
    async cancelButton()
    {
        await this.cancelBtn.click();
        await this.page.screenshot({
            path:"screenshot.png"
        });
        await expect(this.page.getByText("Your Cart")).toBeVisible();
        console.log("the user cancelled the checkout process and is in the cart screen");
    }
    
} 