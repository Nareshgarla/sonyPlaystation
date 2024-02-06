import { expect, type Locator, type Page } from '@playwright/test';
import { Context } from "vm";

export class sonyHomePage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly acceptCookiesButton: Locator;
  readonly mySonylink: Locator; 
  readonly mainMenuDropDown: Locator; 
  readonly playStationLink:Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept' });
    this.mySonylink = page.getByRole('button', { name: 'My Sony My Sony' });
    this.mainMenuDropDown = page.getByLabel('ariaLabelClose');
    this.signInButton = page.getByRole('link', { name: ' Sign in' });
    this.playStationLink = this.page.getByRole('link', { name: 'PlayStation' })

  }

  async navigateToHomePage() {
    await this.page.goto('/');
  }
 
  async navigateToSignInPage() 
  {
    await this.acceptCookiesButton.click();
    await this.mySonylink.click();
    await this.signInButton.click();
  }
  async navigateToPlayStationHomePage() 
  {
    await this.acceptCookiesButton.click();
    await this.mainMenuDropDown.click();
    const newTab = this.page.waitForEvent('popup');
    await this.playStationLink.click(); 
    const playstationTab = await newTab;
    await playstationTab.waitForLoadState();
    return playstationTab;
  }
}