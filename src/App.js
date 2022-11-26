import Header from './component/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Signin from './pages/Signin';
import Posts from './pages/Posts';

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					{/* <Route path='/' element={<Home />} /> */}
					<Route path='/signin' element={<Signin />} />
					<Route path='/' element={<Posts />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
