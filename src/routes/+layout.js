export async function load({ fetch }) {
	try {
		// Винер жду апи
		return {
			players: 0,
			maxplayers: 100
		};
	} catch (error) {
		console.error('Failed to fetch server status:', error);
		return {
			players: 0,
			maxplayers: 100
		};
	}
}
