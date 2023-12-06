import "./App.css";
import Converter from "./components/Converter/Converter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div>
			<ToastContainer position="bottom-right" />
			<Converter />
		</div>
	);
}

export default App;
