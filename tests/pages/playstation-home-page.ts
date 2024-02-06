import { expect, type Locator, type Page } from '@playwright/test';
import { log } from 'console';

export class playstationHomePage {

  readonly page: Page
  readonly acceptCookiesButton: Locator
  readonly carouselSlides: Locator
  readonly sliderControl: Locator
  readonly buttonBlockLocator: Locator
  readonly carouselSlideTitle: Locator
  readonly headingLocator: Locator
  readonly sliderControlImageLocator: Locator

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.getByLabel('Accept');
    this.carouselSlides = this.page.locator('xpath=//div[@class="homepage-hero-wrapper"]//div[@class="slider__slides"]/div[contains(@class, "slider__slide")]');
    this.sliderControl = page.locator('.slider__controls');
    this.buttonBlockLocator = this.page.locator('xpath=//div[@class="homepage-hero-wrapper"]//div[@class="slider__slides"]/div[contains(@class, "slider__slide")]//div[contains(@class,"btn-block")]')
    this.carouselSlideTitle = this.page.locator('xpath=//div[@class="homepage-hero-wrapper"]//div[@class="slider__slides"]/div[contains(@class, "slider__slide")]//div[contains(@class,"title-block")]')
    this.headingLocator = this.page.locator('xpath=//div[@class="homepage-hero-wrapper"]//div[@class="slider__slides"]/div[contains(@class, "slider__slide")]//a[@aria-label="PAGE_BANNER_ARIA_LABEL"]')
    this.sliderControlImageLocator = this.page.locator('xpath=//div[contains(@class,"slider__controls carousel")]//div[@role="button"]//picture//source');

  }
  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }

  async verifyCourouselSectionIsVisible() {
    expect(this.carouselSlides).toBeVisible;
  }
  async verifyCarouselSlidesAutomatically() {
    for (let slide of await this.carouselSlides.all()) {
        await slide.waitFor();
        await expect(slide).not.toHaveClass(/hidden/);
    }
}
  async selectAndVerifiySlide(slideNum: number) {
    const slideEle = this.page.locator(`.slider__controls > div:nth-child(${slideNum})`);
    await slideEle.click();
    await expect(slideEle).toHaveClass(/selected/);

  }
  async totalSlides() {
    const slides = await this.page.$$(`.slider__controls > div.slider__control.carousel-cell`);
    return slides.length;
  }
  async selectEachSlideAndVerifiySelected() {
    for (let i = 1; i <= await this.totalSlides(); i++) {
      await this.selectAndVerifiySlide(i);
    }

  }
}