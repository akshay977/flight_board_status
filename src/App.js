import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const FlightStatusBoard = lazy(() => import('./routes/flight_status_board'));
const FlightDetails = lazy(() => import('./routes/flight_details'));

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={ <FlightStatusBoard/> } />
          <Route path="/:id" element={ <FlightDetails /> } />
        </Routes>     
    </div>
  );
}

export default App;
