import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

interface URLMetadata {
  title: string;
  imageURL: string;
  description: string;
  date: string;
  favicon: string;
}

async function getFaviconURL(doc: Document, baseURL: string): Promise<string> {
  // Check for favicon in different formats and locations
  const selectors = [
    // Apple touch icons
    'link[rel="apple-touch-icon"]',
    'link[rel="apple-touch-icon-precomposed"]',
    // Standard favicons
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="mask-icon"]',
    // Legacy favicon
    'link[rel="favicon"]'
  ];

  for (const selector of selectors) {
    const link = doc.querySelector(selector);
    if (link?.getAttribute('href')) {
      const faviconPath = link.getAttribute('href')!;
      
      // Handle absolute and relative URLs
      try {
        if (faviconPath.startsWith('http')) {
          return faviconPath;
        } else if (faviconPath.startsWith('//')) {
          return `https:${faviconPath}`;
        } else {
          // Convert relative path to absolute URL
          const url = new URL(faviconPath, baseURL);
          return url.href;
        }
      } catch (error) {
        console.warn(`Error processing favicon path: ${faviconPath}`, error);
        continue;
      }
    }
  }

  // If no favicon found in links, try the default location
  try {
    const defaultFavicon = new URL('/favicon.ico', baseURL);
    return defaultFavicon.href;
  } catch (error) {
    return '';
  }
}

async function getURLMetadata(url: string): Promise<URLMetadata> {
  try {
    // Fetch the HTML content
    const response = await fetch(url);
    const html = await response.text();

    // Create a DOM parser using JSDOM
    const dom = new JSDOM(html, { url }); // Pass URL for proper base URL resolution
    const doc = dom.window.document;

    // Extract metadata
    const metadata: URLMetadata = {
      title: '',
      imageURL: '',
      description: '',
      date: '',
      favicon: ''
    };

    // Get title (try Open Graph first, then regular title)
    metadata.title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                    doc.querySelector('title')?.textContent ||
                    '';

    // Get image (try Open Graph first, then regular image)
    metadata.imageURL = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                       doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
                       '';

    // Get description (try Open Graph first, then regular description)
    metadata.description = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                         doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
                         '';

    // Get date (try article published date first, then modified date)
    metadata.date = doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
                   doc.querySelector('meta[property="article:modified_time"]')?.getAttribute('content') ||
                   doc.querySelector('time')?.getAttribute('datetime') ||
                   '';

    // Get favicon
    metadata.favicon = await getFaviconURL(doc, url);

    return metadata;
  } catch (error) {
    throw new Error(`Failed to fetch metadata: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Example usage
try {
    const metadata = await getURLMetadata('https://www.plasticsurgery.org/news/press-releases/american-society-of-plastic-surgeons-reveals-2022s-most-sought-after-procedures');
    console.log('Metadata:', JSON.stringify(metadata, null, 2));
} catch (error) {
    console.error('Error:', error);
}