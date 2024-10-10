import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import { AuthRoute } from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import UploadPage from "./pages/Upload";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<PublicRoute element={<Login />} />} />
				<Route
					path="/signup"
					element={<PublicRoute element={<Signup />} />}
				/>
				<Route
					path="/dashboard"
					element={<AuthRoute element={<Dashboard />} />}
				/>
				<Route
					path="/profile"
					element={<AuthRoute element={<Profile />} />}
				/>
				<Route
					path="/upload"
					element={<AuthRoute element={<UploadPage />} />}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
            <ToastContainer />
		</Router>
	);
}

export default App;
