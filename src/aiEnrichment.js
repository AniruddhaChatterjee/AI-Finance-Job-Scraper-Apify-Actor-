export async function enrichJobs(jobs) {
    const enriched = [];

    for (const job of jobs) {
        const prompt = `
        Extract structured data from this job:

        ${job.description}

        Return ONLY JSON:
        {
          "category": "",
          "seniority": "",
          "skills": [],
          "summary": ""
        }
        `;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        });

        let aiData;
        try {
            aiData = JSON.parse(response.choices[0].message.content);
        } catch {
            aiData = {};
        }

        enriched.push({
            ...job,
            ...aiData
        });
    }

    return enriched;
}
