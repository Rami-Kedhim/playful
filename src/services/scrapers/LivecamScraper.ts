
import { LivecamModel } from "@/types/livecams";
import { JSDOM } from "jsdom";

export const LivecamScraper = {
  async scrapeLivecams(): Promise<LivecamModel[]> {
    try {
      const response = await fetch("https://www.example.com/livecams"); // Replace with actual URL
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      const livecams: LivecamModel[] = [];
      const camElements = document.querySelectorAll(".cam-item"); // Replace selector accordingly

      camElements.forEach((camElement) => {
        const id = camElement.getAttribute("data-cam-id") || "";
        const isStreaming = camElement.classList.contains("streaming");
        const viewerCountText = camElement.querySelector(".viewer-count")?.textContent || "0";
        const viewerCount = parseInt(viewerCountText, 10) || 0;
        const username = camElement.querySelector(".username")?.textContent || "Unknown";
        const displayName = camElement.querySelector(".display-name")?.textContent || username;
        const name = displayName;
        const imageUrl = camElement.querySelector("img")?.getAttribute("src") || "";
        const thumbnailUrl = camElement.querySelector("img")?.getAttribute("data-thumbnail") || imageUrl;
        const tags: string[] = [];
        const category = camElement.getAttribute("data-category") || "Other";
        const language = camElement.getAttribute("data-language") || "English";

        // Extract tags if available
        const tagElements = camElement.querySelectorAll(".cam-tag");
        tagElements.forEach(tag => {
          tags.push(tag.textContent || "");
        });

        const livecam: LivecamModel = {
          id,
          displayName,
          name,
          thumbnailUrl,
          isStreaming,
          isLive: isStreaming,
          viewerCount,
          username,
          imageUrl,
          tags,
          category,
          language
        };

        livecams.push(livecam);
      });

      return livecams;
    } catch (error) {
      console.error("Error scraping livecams:", error);
      return [];
    }
  }
};
