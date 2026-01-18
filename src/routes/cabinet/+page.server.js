export const load = async ({ fetch }) => {
	try {
		const response = await fetch('http://mc.winerecia.fun:7000/api/players/reater');

		if (!response.ok) {
			console.error('Failed to fetch user data:', response.status);
			return { userData: null, error: true };
		}

		const userData = await response.json();
		return { userData, error: false };
	} catch (error) {
		console.error('Error loading cabinet data:', error);
		return { userData: null, error: true };
	}
};
