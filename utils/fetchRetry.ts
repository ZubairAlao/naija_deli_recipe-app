export const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = 3, delay = 1000): Promise<Response> => {
    let attempt = 0;
    while (attempt < retries) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response; // Return successful response
        } catch (error) {
            attempt++;
            if (attempt >= retries) {
                console.error(`Failed after ${retries} attempts`, error);
                throw error; // Throw error after max retries
            }
            console.log(`Retrying... (${attempt}/${retries})`);
            await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
        }
    }
    throw new Error("Unexpected failure in fetchWithRetry");
};
