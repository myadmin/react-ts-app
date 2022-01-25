import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomTable from "./Components/CustomTable";
import AudioPlayer from './Components/AudioPlayer';
import PageNotFound from './Components/PageNotFound';
import tracks from './tracks';
import "./App.less";

const App = () => {
    return (
        <BrowserRouter>
            <nav className="nav-top">
                <Link to="/">Home</Link>
                <Link to="/music">Music</Link>
            </nav>
            <Routes>
                <Route path="/" element={<CustomTable />} />
                <Route path="/music" element={<AudioPlayer tracks={tracks} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;
