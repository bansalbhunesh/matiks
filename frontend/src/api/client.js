import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:8080' 
  : 'http://localhost:8080';

export const fetchLeaderboard = async (limit = 50) => {
  try {
    const response = await fetch(`${BASE_URL}/leaderboard?limit=${limit}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Fetch Leaderboard Error:", error);
    return [];
  }
};

export const searchUsers = async (query) => {
  try {
    if (!query) return [];
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};
