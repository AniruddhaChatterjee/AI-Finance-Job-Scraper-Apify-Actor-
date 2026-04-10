import {
    scrapeLinkedIn,
    scrapeIndeed,
    scrapeZipRecruiter,
    scrapeSimplyHired,
    scrapeBuiltIn
} from './platforms.js';

import { parseJobs } from './parser.js';
import { enrichJobs } from './aiEnrichment.js';

export async function scrapeJobs(input) {
    const { keywords = [], locations = ["India"], max_results = 20 } = input;

    let allJobs = [];

    for (const keyword of keywords) {
        console.log(`Scraping jobs for: ${keyword}`);

        try {
            const linkedinJobs = await scrapeLinkedIn(keyword, locations[0], max_results);
            const indeedJobs = await scrapeIndeed(keyword, locations[0]);
            const zipJobs = await scrapeZipRecruiter(keyword, locations[0]);
            const simplyJobs = await scrapeSimplyHired(keyword, locations[0]);
            const builtInJobs = await scrapeBuiltIn(keyword);

            allJobs.push(
                ...linkedinJobs,
                ...indeedJobs,
                ...zipJobs,
                ...simplyJobs,
                ...builtInJobs
            );

        } catch (error) {
            console.error(`Error for ${keyword}:`, error.message);
        }
    }

    console.log(`Total jobs scraped: ${allJobs.length}`);

    const parsedJobs = parseJobs(allJobs);
    const enrichedJobs = await enrichJobs(parsedJobs);

    return enrichedJobs;
}
