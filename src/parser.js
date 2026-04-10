export function parseJobs(data) {
    return data.jobs.map(job => ({
        job_title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        apply_link: job.url
    }));
}
