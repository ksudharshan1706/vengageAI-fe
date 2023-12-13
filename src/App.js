import logo from "./logo.svg";
import "./App.css";
import Modal from "react-modal";
// import { Calendar } from "@fullcalendar/core";
import Calnendar from "./componants/Calnendar";
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
function App() {
  return <Calnendar />;
}

export default App;
