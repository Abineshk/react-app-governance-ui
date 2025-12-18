import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Container } from "./components/reusable/Container";
import { Dashboard } from "./pages/Dashboard";
import { Page1 } from "./pages/Page1";

export default function App() {
  return (
    <BrowserRouter basename="/react-app-governance-ui">
      <div className="min-h-screen bg-backdrop-primary font-sans flex flex-col">
        <Header />
        <Container className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="page1" element={<Page1 />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
