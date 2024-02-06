import { test, expect } from '@playwright/test';
import { sonyHomePage } from './pages/sony-home-page';
import { signInPage } from './pages/signIn-page';
import { playstationHomePage } from './pages/playstation-home-page';
test('navigate to sony homePage and login', async ({ page }) => {
    const homePage = new sonyHomePage(page);
    const signinForm = new signInPage(page);
    await homePage.navigateToHomePage();
    await expect(page).toHaveTitle(/Sony UK/);
    await homePage.navigateToSignInPage();
    await expect(page).toHaveTitle(/Sign In | Sony/);
    await signinForm.signInAs( process.env.EmailID, process.env.Password);
});

test('navigate to playsation site & validate carousel section', async ({ page }) => {
    const homePage = new sonyHomePage(page);
    await homePage.navigateToHomePage();
    await expect(page).toHaveTitle(/Sony UK/);
    const newPage = await homePage.navigateToPlayStationHomePage();
    await expect(newPage).toHaveTitle(/PlayStation® Official Site/);
    const playstationHome = new playstationHomePage(newPage);
    await playstationHome.acceptCookies();
    await playstationHome.verifyCourouselSectionIsVisible();
    await playstationHome.verifyCarouselSlidesAutomatically();
    await playstationHome.selectEachSlideAndVerifiySelected();
});

