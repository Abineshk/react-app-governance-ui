import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Container } from "./components/reusable/Container";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-backdrop-primary pb-[50px] font-sans">
      <Header />
      <Container>
        <Dashboard />
      </Container>
      <Footer />
    </div>
  );
}
