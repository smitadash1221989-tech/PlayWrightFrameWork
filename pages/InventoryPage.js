import{expect} from '@playwright/test';
export class InventoryPage
{
    constructor(page)
    {
        this.page = page;
        this.producttitle = page.getByText("Products",{exact:true});
        this.inventoryItem = page.locator("//div[@class='inventory_item_name ']");
        this.sorting = page.locator("//select[@class='product_sort_container']");
        this.inventoryDesc = page.locator("//div[@class='inventory_item_desc']");
        this.inventoryPrice = page.locator("//div[@class='inventory_item_price']");
        this.shoppingcartBadge = page.locator("//span[@data-test='shopping-cart-badge']");
        this.shoppingcart = page.locator("//a[@class='shopping_cart_link']");
    }
    //verify user is in the inventory screen after login/
    async verifyProductscreen()
    {
        await expect(this.producttitle).toContainText(/Product/);
    }
    //check for the product count,
    async productCount()
    {
        const prodcnt = await this.inventoryItem.count();
        console.log("the total count of the product is: "+ prodcnt);
        await expect(this.inventoryItem).toHaveCount(prodcnt);
        console.log("the product count is verified ");
    }
    //check for the product names list tobe shown correctly.
    async productNamesList()
    {
        const prodcnt = await this.inventoryItem.count();
        for(let i=0;i<prodcnt;i++)
        {
            console.log(await this.inventoryItem.nth(i).textContent());
        }
    }
    //check for sorting
    async productListSort(sortoption)
    {   
        console.log("before sorting");
        console.log(await this.inventoryItem.allTextContents());
        console.log("after sorting:");
        await this.sorting.selectOption(sortoption);
        console.log(await this.inventoryItem.allTextContents());
        //check the sorting is successfull by printing the new sorted list.
    }
    //show product details,product name,price for each of the product present.
    async productDescription()
    {
        
        const count = await this.inventoryItem.count();
        for(let i=0;i<count;i++)
        {
            const item = await this.inventoryItem.nth(i).textContent();
            const description = await this.inventoryDesc.nth(i).textContent();
            const price= await this.inventoryPrice.nth(i).textContent();
            console.log(`${item} , ${description} , ${price} `);
        }
    }
    async addProduct(proditem)
    {
        
        await this.page.locator(`//button[@id='add-to-cart-${proditem}']`).click();
       // await this.page.getByRole("button",{name: 'Add to cart',hasText:'`${proditem}`}).click();
    }
    async verifyProduct(productname)
    {
        // ///div[@class='inventory_item_name '],{hasText:${productname}}`)
        await expect(this.page.locator("//div[@class='inventory_item_name ']",{hasText:productname})).toHaveText(productname);
        console.log("the product matches");

    } 
    async cartCount()
    {
      const cartItem=  await this.shoppingcartBadge.textContent();
      console.log("the total item in the cart is: "+ cartItem);

    }
    async removeProduct(proditem)
    {
       
        await this.page.locator(`//button[@id="remove-${proditem}"]`).click();

    }
    async Openshoppingcart()
    {
        await this.shoppingcart.click();
    }
    async verifyShoppingcart()
    {
        await expect(this.page.getByText("Your Cart")).toBeVisible();
        console.log("user is in the shopping cart page");
    }

} 