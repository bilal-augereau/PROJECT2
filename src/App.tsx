import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";

function App() {
	const [plant, setPlant] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const url = "https://house-plants2.p.rapidapi.com/all";

		const options = {
			method: "GET",
			headers: {
				"x-rapidapi-key": "9db15f58b8msh5101d3f3e72beaep175fadjsn258b615b608e",
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
		<Router>
			<div>
				{/* Navigation */}
				<nav>
					<ul>
						<li>
							<Link to="/">Accueil</Link>
						</li>
						<li>
							<Link to="/search">Search</Link>
						</li>
					</ul>
				</nav>

				{/* Définir les Routes */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
				</Routes>
				<div>
					<h1>Liste des Plantes</h1>
					<ul>
						{plant.map((item, index) => (
							<li key={index}>
								{item["Temperature max"]?.C && item["Temperature min"]?.C ? (
									<span>
										{item["Temperature max"].C - item["Temperature min"].C}°C
									</span>
								) : item["Temperature max"]?.C &&
									!item["Temperature min"]?.C ? (
									<span>
										{item["Temperature max"].C}°C (Min temperature data not
										available)
									</span>
								) : (
									<span>Temperature data not available</span>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</Router>
	);
}

export default App;
