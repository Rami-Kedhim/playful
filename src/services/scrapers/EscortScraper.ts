import axios from 'axios';
import * as cheerio from 'cheerio';
import { Escort, ContactInfo, Rates } from '@/types/escort';

interface ScrapedEscort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  services: string[];
  price: number;
  imageUrl: string;
  profileImage: string;
  gallery: string[];
  rates: Rates;
  contactInfo: ContactInfo;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  boostLevel: number;
}

export class EscortScraper {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async scrapeEscortList(page: number = 1): Promise<ScrapedEscort[]> {
    const url = `${this.baseUrl}/escorts?page=${page}`;
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const escorts: ScrapedEscort[] = [];

      $('.escort-card').each((index, element) => {
        const escort = this.extractEscortData($, element);
        escorts.push(escort);
      });

      return escorts;
    } catch (error) {
      console.error('Error scraping escort list:', error);
      return [];
    }
  }

  async scrapeEscortDetail(escortId: string): Promise<ScrapedEscort | null> {
    const url = `${this.baseUrl}/escorts/${escortId}`;
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // Extract detailed information from the detail page
      const escort = this.extractEscortDetails($, html);
      return escort;
    } catch (error) {
      console.error(`Error scraping escort detail for ID ${escortId}:`, error);
      return null;
    }
  }

  private extractEscortData($, element): ScrapedEscort {
    const id = $(element).data('escort-id') || `escort-${Date.now()}`;
    const name = $(element).find('.name').text().trim() || 'Anonymous';
    const age = parseInt($(element).find('.age').text(), 10) || 25;
    const gender = $(element).find('.gender').text().trim() || 'Unknown';
    const location = $(element).find('.location').text().trim() || 'Unknown';
    const bio = $(element).find('.bio').text().trim() || 'No bio provided';
    const services = $(element).find('.services').text().split(',').map(s => s.trim()) || [];
    const price = parseInt($(element).find('.price').text().replace(/\D/g, ''), 10) || 200;
    const imageUrl = $(element).find('img').attr('src') || '';
    const profileImage = $(element).find('.profile-image').attr('src') || '';
    const gallery = $(element).find('.gallery-image').map((i, el) => $(el).attr('src')).get() || [];

    return {
      id,
      name,
      age,
      gender,
      location,
      bio,
      services,
      price,
      imageUrl,
      profileImage,
      gallery,
      rates: { hourly: price },
      contactInfo: { email: 'contact@example.com' },
      phone: 'N/A',
      email: 'N/A',
      website: 'N/A',
      rating: 4.5,
      reviewCount: 10,
      isAvailable: true,
      boostLevel: 1
    };
  }

  private extractEscortDetails($, html: string): ScrapedEscort {
    // Example of extracting data, adjust selectors as needed
    const name = $('h1.name').text().trim() || 'Anonymous';
    const age = parseInt($('.age').text(), 10) || 25;
    const gender = $('.gender').text().trim() || 'Unknown';
    const location = $('.location').text().trim() || 'Unknown';
    const bio = $('.bio').text().trim() || 'No bio provided';
    const services = $('.services').text().split(',').map(s => s.trim()) || [];
    const price = parseInt($('.price').text().replace(/\D/g, ''), 10) || 200;
    const imageUrl = $('img.main').attr('src') || '';
    const profileImage = $('img.profile').attr('src') || '';
    const gallery = $('.gallery-img').map((i, el) => $(el).attr('src')).get() || [];
    const phone = $('.contact-phone').text().trim() || 'N/A';
    const email = $('.contact-email').text().trim() || 'N/A';
    const website = $('.website').attr('href') || 'N/A';
    const rating = parseFloat($('.rating').text()) || 4.5;
    const reviewCount = parseInt($('.review-count').text(), 10) || 10;
    const isAvailable = $('.availability').text().includes('Available');
    const boostLevel = parseInt($('.boost-level').text(), 10) || 1;

    // Example of extracting rates
    const hourlyRate = parseInt($('.hourly-rate').text().replace(/\D/g, ''), 10) || price;
    const halfHourRate = parseInt($('.half-hour-rate').text().replace(/\D/g, ''), 10) || price / 2;

    // Example of extracting contact info
    const contactPhone = $('.contact-phone').text().trim() || 'N/A';
    const contactEmail = $('.contact-email').text().trim() || 'N/A';

    const escort: ScrapedEscort = {
      id: `escort-${Date.now()}`,
      name,
      age,
      gender,
      location,
      bio,
      services,
      price,
      imageUrl,
      profileImage,
      gallery,
      rates: {
        hourly: hourlyRate,
        halfHour: halfHourRate
      },
      contactInfo: {
        email: contactEmail,
        phone: contactPhone,
        website: website
      },
      phone,
      email,
      website,
      rating,
      reviewCount,
      isAvailable,
      boostLevel
    };

    return escort;
  }
}

export default EscortScraper;
