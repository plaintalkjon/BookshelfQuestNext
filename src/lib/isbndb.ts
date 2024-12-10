const ISBNDB_BASE_URL = 'https://api2.isbndb.com';

export const isbndb = {
  async fetch(endpoint: string) {
    const response = await fetch(`${ISBNDB_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_ISBNDB_API_KEY!
      }
    });

    if (!response.ok) {
      throw new Error('ISBNDB API error');
    }

    return response.json();
  }
}; 