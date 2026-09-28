import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DocksPage from "./pages/DocksPage";
import DockDetailPage from "./pages/DockDetailPage";
import RequestsPage from "./pages/RequestsPage";
import NewRequestPage from "./pages/NewRequestPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/docks" replace />} />
        <Route path="/docks" element={<DocksPage />} />
        <Route path="/docks/:dockId" element={<DockDetailPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/requests/new" element={<NewRequestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
