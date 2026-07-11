import{test,expect}from '@playwright/test';
export class CartPage{
    constructor(page)
    {
        this.page=page;
        this.carttitle= page.getByText("Your Cart");
        this.cartitem=page.locator("//div[@class='cart_item']");
        this.checkoutBtn=page.getByRole("button",{name:'Checkout'});
        this.continuShop=page.getByRole("button",{name:'Continue Shopping'});

    }
    async itemsInCart()
    {
        const itemcount = await this.cartitem.count();
        const itemname=await this.page.locator("//div[@class='inventory_item_name']");
        const itemdesc=await this.page.locator("//div[@class='inventory_item_desc']");
        const itemprice=await this.page.locator("//div[@class='inventory_item_price']");
        console.log("the total items in the cart is: "+itemcount);
        for(let i=0;i<itemcount;i++)
        {
            console.log("item name: "+await itemname.nth(i).textContent());
            console.log("item description: "+await itemdesc.nth(i).textContent());
            console.log("item price: "+ await itemprice.nth(i).textContent());
        }
    }
    async clickContinueShopping()
    {
        await this.continuShop.click();
        console.log("user lands on the product list view screen");
    }
    async checkoutProcess()
    {
        await this.checkoutBtn.click();
        const pagetitle=this.page.getByText("Checkout: Your Information");
        await expect(pagetitle).toContainText(/Checkout: Your Information/);
        console.log("User is in the Checkout Screen");
    }
    async removeProduct(productitem)//pass the product by id
    {
        await this.page.locator(`//button[@id="remove-${productitem}"]`).click();
        //id="remove-sauce-labs-bike-light"
    }
    async verifyProductRemoval(productitem)//pass the product by name
    {
        await expect(this.page.getByText(productitem)).not.toBeVisible();
        console.log("the product is removed")
    }
}