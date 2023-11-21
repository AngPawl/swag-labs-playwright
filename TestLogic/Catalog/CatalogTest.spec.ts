import {test} from '../BaseTest';
import { highestPriceItem, lowestPriceItem, item, itemForZASorting } from '../../TestData/ProductInfo';
import { expect } from '@playwright/test';

test.describe('Catalog tests', async () => {

  test('Page title should be displayed', async ({pageManager}) => {
    const pageTitle = 'Products';
    
    await expect(pageManager.catalogPage.Header.PageTitle).toBeVisible();
    await expect(pageManager.catalogPage.Header.PageTitle).toHaveText(pageTitle);
  });

  test('Item card should display correct info', async ({pageManager}) => {
    await expect(pageManager.catalogPage.Item.ItemCard.first()).toBeVisible;
    await expect(pageManager.catalogPage.Item.ItemName.first()).toHaveText(item.name);
    await expect(pageManager.catalogPage.Item.ItemDescription.first()).toHaveText(item.description);
    await expect(pageManager.catalogPage.Item.ItemCardPrice.first()).toHaveText(item.price);
  });

  test('Sort by price from low to high should return correct results', async ({pageManager}) => {
    const lowHigh = 'lohi';
    
    await pageManager.catalogPage.sortBy(lowHigh);
    await expect(pageManager.catalogPage.Item.ItemCardPrice.first()).toHaveText(lowestPriceItem.price);
  });

  test('Sort by price from high to low should return correct results', async ({pageManager}) => {
    const highLow = 'hilo';
  
    await pageManager.catalogPage.sortBy(highLow);
    await expect(pageManager.catalogPage.Item.ItemCardPrice.first()).toHaveText(highestPriceItem.price);
  });

  test('Sort by name from Z to A should return correct results', async ({pageManager}) => {
    const zA = 'za';
  
    await pageManager.catalogPage.sortBy(zA);
    await expect(pageManager.catalogPage.Item.ItemName.first()).toHaveText(itemForZASorting.name);
  })

  test('Item list should contain 6 cards', async ({pageManager}) => {
    await expect(pageManager.catalogPage.Item.ItemCard).toHaveCount(6);
  })

});