import { expect, type Locator, type Page } from '@playwright/test';

export class signInPage {
  readonly page: Page;
  readonly emailIdField: Locator;
  readonly passwordField: Locator;
  readonly nextButton: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.emailIdField = page.getByLabel('Email*');
    this.passwordField = page.getByPlaceholder('Password');
  }
 

  async enterEmailID(email: string) {
    await this.emailIdField.fill(email);  
  }
  async enterPassword(pwd: string) {
    await this.passwordField.fill(pwd);  
  }
  async signInAs(email: string, pwd: string){
    await this.emailIdField.fill(email); 
    await this.signInButton.click();
    await this.passwordField.fill(pwd); 
    await this.signInButton.click();
  }
}