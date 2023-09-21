import "./App.scss";
import Content from "./components/Content/Content";
import SideBar from "./components/SideBar/SideBar";

export default function App() {
  return (
    <div className="App">
      <SideBar />
      <Content />
    </div>
  );
}
