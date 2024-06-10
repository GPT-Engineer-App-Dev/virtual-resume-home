import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ConfettiPage from "./pages/ConfettiPage.jsx";
import KanbanBoardPage from "./pages/KanbanBoardPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/confetti" element={<ConfettiPage />} />
      <Route path="/kanban" element={<KanbanBoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
