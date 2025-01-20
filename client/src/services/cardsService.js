export const fetchCards = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/cards');
        if (!response.ok) {
            throw new Error('Failed to fetch cards');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cards:', error);
        return [];
    }
};
