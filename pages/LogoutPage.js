import {expect} from '@playwright/test';
export class LogoutPage{
    constructor(page)
    {
        this.page=page;
        this.menuButton=page.getByRole("button",{name:"Open Menu"});
        this.logoutButton=page.getByRole("link",{name:"Logout"});
    }
    async logout()
    {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

}