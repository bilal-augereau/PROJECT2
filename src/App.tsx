import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [plant, setPlant] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const url = "https://house-plants2.p.rapidapi.com/all";

		const options = {
			method: "GET",
			headers: {
				"x-rapidapi-key": "9db15f58b8msh5101d3f3e72beaep175fadjsn258b615b608e", // Remplace par ta propre clé API
				"x-rapidapi-host": "house-plants2.p.rapidapi.com",
			},
		};

		fetch(url, options)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						"Une erreur s'est produite lors de la récupération des données",
					);
				}
				return response.json();
			})
			.then((data) => {
				setPlant(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Chargement...</div>;
	if (error) return <div>Erreur: {error}</div>;

	console.log(plant);
	return (
		<div>
			<h1>Liste des Plantes</h1>
			<ul>
				{plant.map((item, index) => (
					<li key={index}>
						{/* Check if both 'Temperature max' and 'Temperature min' exist */}
						{item["Temperature max"]?.C && item["Temperature min"]?.C ? (
							// Calculate and display the difference if both exist
							<span>
								{item["Temperature max"].C - item["Temperature min"].C}°C
							</span>
						) : item["Temperature max"]?.C && !item["Temperature min"]?.C ? (
							// If 'Temperature min' is missing, display 'Temperature min not available'
							<span>
								{item["Temperature max"].C}°C (Min temperature data not
								available)
							</span>
						) : (
							// If neither 'Temperature max' nor 'Temperature min' exist, display 'Temperature data not available'
							<span>Temperature data not available</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
