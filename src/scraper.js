import axios from 'axios';
import { parseJobs } from './parser.js';
import { enrichJobs } from './aiEnrichment.js';

export async function scrapeJobs(input) {
    const { keywords, locations } = input;

    let allJobs = [];

    for (const keyword of keywords) {
        const url = `https://example-job-api.com/search?q=${keyword}`;

        const response = await axios.get(url);
        const parsed = parseJobs(response.data);

        allJobs.push(...parsed);
    }

    const enrichedJobs = await enrichJobs(allJobs);

    return enrichedJobs;
}
