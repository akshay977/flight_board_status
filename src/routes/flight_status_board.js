import { useState, useEffect } from 'react';
import './flight_status_board.css';

function FlightStatusBoard() {
	const [state, setState] = useState({
		flightsList: []
	});

	useEffect(() => {
		setInterval(fetchFlightsList, 5000);
	}, []);

	const fetchFlightsList = async () => {
		try {
			const response = await fetch('https://flight-status-mock.core.travelopia.cloud/flights');
			if (!response.ok) {
				throw new Error(`Response status: ${response.status} - ${response.statusText}`);
		    }
			
			const json = await response.json();
			setState(prev => ({ ...prev, flightsList: json }));
		} catch (err) {
			console.log('Error ocurred while fetching flights list', err);
			throw err;
		}
	};

	return (
		<div className="flight_status_board">
			<div className="heading">Real-Time Flight Status Board</div>
			<div className="list">
				<table>
					<thead>
						<tr>
							<th>Airline</th>
							<th>Flight</th>
							<th>From</th>
							<th>To</th>
							<th>ETD</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{state.flightsList.map(el => (
							<tr key={el.id + el.flightNumber}>
								<td>{el.airline}</td>
								<td>{el.flightNumber}</td>
								<td>{el.origin}</td>
								<td>{el.destination}</td>
								<td>{new Date(el.departureTime).toLocaleTimeString('en-US', {
									  hour12: false,
									  hour: '2-digit',
									  minute: '2-digit'
									})}
								</td>
								<td style={{ color: el.status === 'On Time' ? 'green' : el.status === 'Delayed' ? 'red' : el.status === 'Boarding' ? 'blue' : 'orange' }}>{el.status.toUpperCase()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default FlightStatusBoard;