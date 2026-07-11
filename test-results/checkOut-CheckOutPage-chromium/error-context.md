# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkOut.spec.js >> CheckOutPage
- Location: tests\checkOut.spec.js:26:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Thanks you for your order!' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Thanks you for your order!' })

```

```yaml
- button "Open Menu"
- img "Open Menu"
- text: "Swag Labs Checkout: Complete!"
- img "Pony Express"
- heading "Thank you for your order!" [level=2]
- text: Your order has been dispatched, and will arrive just as fast as the pony can get there!
- button "Back Home"
- button "Generate PDF order"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | //Complete Checkout
  2  | //Empty First Name Validation
  3  | //Empty Last Name Validation
  4  | //Empty Zip Code Validation
  5  | //Verify Order Confirmation
  6  | import {expect} from '@playwright/test';
  7  | export class CheckOutPage{
  8  |     constructor(page)
  9  |     {
  10 |         this.page=page;
  11 |         this.firstname= page.getByRole("textbox",{name:"First Name"});
  12 |         this.lastname=page.getByRole("textbox",{name:"Last Name"});
  13 |         this.zipcode=page.getByRole("textbox",{name:"Zip/Postal Code"});
  14 |         this.cancelBtn=page.getByAltText("Go back");
  15 |         this.continueBtn=page.getByRole("button",{name:"Continue"});
  16 |         
  17 | 
  18 |     }
  19 |     async checkoutdetails(fname,lname,zip)
  20 |     {
  21 |         await this.firstname.fill(fname);
  22 |         await this.lastname.fill(lname);
  23 |         await this.zipcode.fill(zip);
  24 |         await this.continueBtn.click();
  25 |     }
  26 |     async verifyCheckout()
  27 |     {
  28 |         await expect(this.page.getByText("Checkout: Overview")).toBeVisible();
  29 |         console.log("the user is in the checkout screen");
  30 |         console.log("the checkout screen details: ");
  31 |         await this.page.locator("//button[@id='finish']").click();
> 32 |         await expect(this.page.getByRole("heading",{name:"Thanks you for your order!"})).toBeVisible();
     |                                                                                          ^ Error: expect(locator).toBeVisible() failed
  33 |         console.log(await this.page.locator("//div[@class='complete-text']").textContent());
  34 |     }
  35 |     async cancelButton()
  36 |     {
  37 |         await this.cancelBtn.click();
  38 |         await this.page.screenshot({
  39 |             path:"screenshot.png"
  40 |         });
  41 |         await expect(this.page.getByText("Your Cart")).toBeVisible();
  42 |         console.log("the user cancelled the checkout process and is in the cart screen");
  43 |     }
  44 |     
  45 | } 
```