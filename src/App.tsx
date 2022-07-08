import { HashRouter, Routes, Route, Link } from "react-router-dom";
import CustomTable from "./Components/CustomTable";
import AudioPlayer from './Components/AudioPlayer';
import Detail from './Components/Detail';
import PageNotFound from './Components/PageNotFound';
import tracks from './tracks';
import "./App.less";

const App = () => {
    return (
        <HashRouter>
            <nav className="nav-top">
                <Link to="/">Home</Link>
                <Link to="/music">Music</Link>
                <Link to="/detail">Detail</Link>
            </nav>
            <Routes>
                <Route path="/" element={<CustomTable />} />
                <Route path="/music" element={<AudioPlayer tracks={tracks} />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </HashRouter>
    )
};

export default App;
