import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Library from "@/pages/Library";
import Favorites from "@/pages/Favorites";
import Webinars from "@/pages/Webinars";
import Channels from "@/pages/Channels";
import Analytics from "@/pages/Analytics";
import Remix from "@/pages/Remix";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/library" element={<Library />} />
          <Route path="/dashboard/favorites" element={<Favorites />} />
          <Route path="/dashboard/webinars" element={<Webinars />} />
          <Route path="/dashboard/channels" element={<Channels />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/remix" element={<Remix />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
