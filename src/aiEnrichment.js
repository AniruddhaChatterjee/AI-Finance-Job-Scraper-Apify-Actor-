import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function enrichJobs(jobs) {
    const enriched = [];

    for (const job of jobs) {
        const prompt = `
        Classify this finance job:
        ${job.description}

        Return:
        - category
        - seniority
        - key skills
        - short summary
        `;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        });

        const aiData = response.choices[0].message.content;

        enriched.push({
            ...job,
            ai_insights: aiData
        });
    }

    return enriched;
}
