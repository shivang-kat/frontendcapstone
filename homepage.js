document.getElementById('searchButton').addEventListener('click', async function() {
    const query = document.getElementById('searchInput').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    const priceRange = [];

    if (!isNaN(minPrice)) {
        priceRange.push(minPrice);
    }
    if (!isNaN(maxPrice)) {
        priceRange.push(maxPrice);
    }

    if (query.length > 2) {
        const results = await searchTools(query, priceRange);
        displaySearchResults(results.tool_info);
        populateFeedbackForm(results.tool_info);
    }
});

async function searchTools(query, priceRange) {
    try {
        const response = await fetch(`${apiUrl}/find_tool/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query, price_range: priceRange })
        });
        return await response.json();
    } catch (error) {
        console.error('Error during tool search:', error);
    }
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';  // Clear existing results

    results.forEach(tool => {
        // Create a container for each tool
        const toolDiv = document.createElement('div');
        toolDiv.className = 'tool-container';

        // Create and append elements for each tool attribute
        const toolName = document.createElement('h3');
        toolName.textContent = tool['Tool Name'];
        toolDiv.appendChild(toolName);

        const category = document.createElement('p');
        category.innerHTML = `<strong>Category:</strong> ${tool.Category}`;
        toolDiv.appendChild(category);

        const features = document.createElement('p');
        features.innerHTML = `<strong>Features:</strong> ${tool.Features}`;
        toolDiv.appendChild(features);

        const pricing = document.createElement('p');
        pricing.innerHTML = `<strong>Pricing:</strong> ${tool.Pricing}`;
        toolDiv.appendChild(pricing);

        const targetAudience = document.createElement('p');
        targetAudience.innerHTML = `<strong>Target Audience:</strong> ${tool['Target Audience']}`;
        toolDiv.appendChild(targetAudience);

        const rating = document.createElement('p');
        rating.innerHTML = `<strong>Rating:</strong> ${tool.Rating} (${tool['Review Count']} reviews)`;
        toolDiv.appendChild(rating);

        // Append the tool container to the results container
        resultsContainer.appendChild(toolDiv);
    });
}

function populateFeedbackForm(tools) {
    const form = document.getElementById('feedbackForm');
    form.innerHTML = '';
    
    tools.forEach(tool => {
        const label = document.createElement('label');
        label.textContent = tool['Tool Name'];
        form.appendChild(label);

        const select = document.createElement('select');
        select.name = tool['Tool Name'];

        // Create options for the select dropdown
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }

        form.appendChild(select);
    });
}


async function submitUserFeedback() {
    const form = document.getElementById('feedbackForm');
    const ratings = Array.from(form.elements).filter(el => el.type === 'number').map(input => {
        return { tool_name: input.name, rating: parseFloat(input.value) };
    });

    const response = await submitFeedbackToApi(ratings);
    console.log(response.message); // Handle response appropriately

    form.innerHTML = ''; // Clears the feedback form
    document.getElementById('searchInput').value = ''; // Clears the search input field
    document.getElementById('searchResults').innerHTML = ''; // Clears the search results container
    document.getElementById('minPrice').value = ''; // Clears the minimum price input field
    document.getElementById('maxPrice').value = ''; // Clears the maximum price input field

    document.getElementById('feedbackPopup').style.display = 'block';

    document.getElementById('feedbackPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('feedbackPopup').style.display = 'none';
}

window.onclick = function(event) {
    let feedbackPopup = document.getElementById('feedbackPopup');
    if (event.target === feedbackPopup) {
        feedbackPopup.style.display = 'none';
    }
}

async function submitFeedbackToApi(feedback) {
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
