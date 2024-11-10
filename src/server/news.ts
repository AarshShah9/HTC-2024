"user server";

import { parseStringPromise } from 'xml2js';

export async function fetchAndParseRSS(query: string) {
    try {
        // Fetch the RSS feed
        const url = `https://news.google.com/rss/search?q=${query}’&hl=en-CA&gl=CA&ceid=CA:en`
        const response = await fetch(url);
        const xmlData = await response.text();

        // Parse the XML to JSON
        const jsonData = await parseStringPromise(xmlData, { mergeAttrs: true, explicitArray: false });
        console.log(jsonData)
        return jsonData.rss.channel.item;
      } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
      }
} 