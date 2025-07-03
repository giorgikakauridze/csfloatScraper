import { NextResponse } from "next/server";
import fs from "fs/promises";
import { chromium } from "playwright"; // or puppeteer
import skins from "../../../../skins.json";

export async function GET() {
  try {
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const context = browser.contexts()[0] ?? (await browser.newContext());
    const page = context.pages()[0] ?? (await context.newPage());

    await page.goto(
      "https://csfloat.com/db?rarity=6&order=4&min=0&max=1&only=1",
      {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 6500));

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await new Promise((resolve) => setTimeout(resolve, 4500));

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await new Promise((resolve) => setTimeout(resolve, 4500));

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await new Promise((resolve) => setTimeout(resolve, 4500));

    const items = await page.evaluate(() => {
      const itemElements = Array.from(
        document.querySelectorAll("tr.mat-mdc-row")
      );
      const formattedData = itemElements.map((element) => {
        const prefix =
          element.querySelector(".prefix")?.textContent?.trim() || "";
        const suffix =
          element.querySelector(".suffix")?.textContent?.trim() || "";
        const floatValue =
          element
            .querySelector(".cdk-column-float > div")
            ?.childNodes[0]?.textContent?.trim() || "";
        const floatLabel =
          element
            .querySelector(".cdk-column-float .label")
            ?.textContent?.trim() || "";
        const seed =
          element.querySelector(".cdk-column-seed")?.textContent?.trim() || "";
        //
        const profileAnchor = element.querySelector(
          ".cdk-column-actions a.playerAvatar"
        );
        const profileUrl = profileAnchor?.getAttribute("href") || "";

        const avatarUrl = profileAnchor?.querySelector("img")?.src || "";
        //
        const inspectAnchor = element.querySelector(
          'a[href^="steam://rungame/730"]'
        );
        const inspectLink = inspectAnchor?.getAttribute("href") || "";
        const online = profileAnchor?.classList.contains("online") ?? false;

        const imageEl = element.querySelector(".icon img");
        const image = imageEl?.getAttribute("src") || "";

        const historyCountEl = element.querySelector(
          ".mat-badge-content.mat-badge-active"
        );
        const historyCount = historyCountEl?.textContent?.trim() || "0";

        return {
          name: `${prefix} ${suffix}`.trim(),
          float: floatValue,
          floatLabel,
          seed,
          profileUrl,
          avatarUrl,
          itemImage: image,
          inspectLink,
          historyCount,
          online,
        };
      });

      return formattedData;
    });
    const filteredItems = items.filter((item) => {
      const includes = skins.some((skin) => skin === item.name);

      const includesURL =
        item.avatarUrl ===
          "https://avatars.akamai.steamstatic.com/53797778807c6af7d685e0810d83482e439a8794_medium.jpg" ||
        item.avatarUrl ===
          "https://avatars.akamai.steamstatic.com/1a13ac6e7117265a25d37f61e7bfcefcc43facf3_medium.jpg" ||
        item.avatarUrl ===
          "https://avatars.akamai.steamstatic.com/5f6c875b537b9f2df1c48a18c8c0303c256fcb6d_medium.jpg" ||
        item.avatarUrl ===
          "https://avatars.akamai.steamstatic.com/25d7c44d3cc194c98790b419a069678c32b41c2f_medium.jpg" ||
        item.avatarUrl ===
          "https://avatars.akamai.steamstatic.com/8df8af48b01621e0eca14e2a6b1105b4d33d1e61_medium.jpg" ||
        item.avatarUrl ===
          "https://avatars.akamai.steamstatic.com/d52f2e4e3f5d60ed6e01004c8d536a186ccb05a8_medium.jpg" ||
        item.avatarUrl ===
          "https://avatars.akamai.steamstatic.com/b52e11f9f5edbbdaa7cef8cc76c4e29e2002495f_medium.jpg" ||
        item.avatarUrl ===
          "https://avatars.akamai.steamstatic.com/2cf8ceab845b19227461aa3b00cd8a99b55c8013_full.jpg";

      return includes && !includesURL;
    });

    console.log("Done", items.length, filteredItems.length);
    return NextResponse.json({ data: filteredItems });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to scrape" },
      { status: 500 }
    );
  }
}
