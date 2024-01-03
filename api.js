const apiUrl = 'http://127.0.0.1:8000'; // Update with your FastAPI server URL

async function searchTools(query) {
    try {
        const response = await fetch(`${apiUrl}/find_tool/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query })
        });
        return await response.json();
    } catch (error) {
        console.error('Error during tool search:', error);
    }
}

async function submitFeedback(feedback) {
    try {
        const response = await fetch(`${apiUrl}/submit_feedback/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ratings: feedback })
        });
        return await response.json();
    } catch (error) {
        console.error('Error submitting feedback:', error);
    }
}
