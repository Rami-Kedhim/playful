import { LivecamModel } from "@/types/livecams";
import { JSDOM } from 'jsdom';

export const LivecamScraper = {
  async scrapeLivecams(): Promise<LivecamModel[]> {
    try {
      const response = await fetch('https://www.example.com/livecams'); // Replace with the actual URL
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      const livecams: LivecamModel[] = [];
      const camElements = document.querySelectorAll('.cam-item'); // Replace with the actual selector

      camElements.forEach(camElement => {
        const id = camElement.getAttribute('data-cam-id') || '';
        const isStreaming = camElement.classList.contains('streaming');
        const viewerCountText = camElement.querySelector('.viewer-count')?.textContent || '0';
        const viewerCount = parseInt(viewerCountText, 10) || 0;
        const username = camElement.querySelector('.username')?.textContent || 'Unknown';
        const imageUrl = camElement.querySelector('img')?.getAttribute('src') || '';
        const tags: string[] = []; // Extract tags if available
        const category = camElement.getAttribute('data-category') || 'Other';

        const livecam: LivecamModel = {
          id,
          isStreaming,
          viewerCount,
          username,
          imageUrl,
          tags,
          category,
          previewVideoUrl: '' // Assuming a default value or extract if available
        };

        livecams.push(livecam);
      });

      return livecams;
    } catch (error) {
      console.error('Error scraping livecams:', error);
      return [];
    }
  }
};
