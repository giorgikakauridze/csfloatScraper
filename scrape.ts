import { chromium } from "playwright";
import fs from "fs/promises";

(async () => {
  console.log("Connecting to existing Chrome instance...");

  try {
    // Connect to existing Chrome instance via CDP
    const browser = await chromium.connectOverCDP("http://localhost:9222");

    // Get existing contexts (your opened profile)
    const contexts = browser.contexts();
    console.log(`Found ${contexts.length} browser contexts`);

    let context;
    if (contexts.length > 0) {
      // Use the first existing context
      context = contexts[0];
      console.log("Using existing browser context");
    } else {
      // Fallback: create new context (shouldn't happen if Chrome is already open)
      context = await browser.newContext();
      console.log("Created new browser context");
    }

    // Get existing pages or create a new one
    const pages = context.pages();
    let page;

    if (pages.length > 0) {
      // Use existing page or create new tab
      page = pages[0];
      console.log("Using existing page");
    } else {
      page = await context.newPage();
      console.log("Created new page");
    }

    // Optional: Add stealth scripts to the existing page
    await page.addInitScript(() => {
      delete (window as any).navigator.webdriver;
      Object.defineProperty(navigator, "plugins", {
        get: function () {
          return [1, 2, 3, 4, 5];
        },
      });
    });

    console.log("Navigating to CSFloat...");
    await page.goto(
      "https://csfloat.com/db?rarity=6&order=4&min=0&max=1&only=1",
      {
        waitUntil: "commit",
        timeout: 60000,
      }
    );

    console.log("Page loaded successfully!");

    await new Promise((resolve) => setTimeout(resolve, 2000000));

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await page.$("mat-mdc-row");

    const items = await page.evaluate(() => {
      const itemElements = Array.from(
        document.querySelectorAll("tr.mat-mdc-row")
      );

      const formattedItems = itemElements.map((element, index) => {
        const prefix = element.getElementsByClassName("prefix");
        const suffix = element.getElementsByClassName("suffix");
        // const image = element.getElementsByClassName("img.ng-star-inserted")[0];

        return {
          name: prefix[0].innerHTML + suffix[0].innerHTML,
          // image: image.innerHTML,
        };
      });

      return formattedItems;
    });

    await fs.writeFile("scraped.json", JSON.stringify(items, null, 2));

    console.log(items, "Items fetched ~ ");

    // Don't close the browser - leave it running
    console.log("Job completed! Browser remains open.");
  } catch (error) {
    console.error("Error:", error);
    console.log("\nMake sure Chrome is running with remote debugging enabled!");
    console.log("Start Chrome with: --remote-debugging-port=9222");
  }
})();
