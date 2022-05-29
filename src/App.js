import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component"

class App extends Component {
    render() {
        return (
            <div className="wrapper container-fluid">
                <div className="app-container">
                    <div className="row text-center" id="title_div">
                        <h2>EscutaUFMG
                            <span className="lighter"> com Spotify </span>
                            <i className="fa fa-spotify fa-right" aria-hidden="true"></i>
                        </h2>
                    </div>
                    <div>
                        <div id="msform">
                            <fieldset>
                                <h2 className="fs-title">Isso não irá expor seus dados ou hackear sua conta.</h2>
                                <h3 className="fs-subtitle"><a className="link"
                                    href="https://medium.com/@bauus/no-my-collage-generator-for-spotify-cannot-hack-your-spotify-7d44cd68b1d1?sk=ef58ff48ac46a1fec575700f4844d7eb">
                                    (saiba mais)</a></h3>
                                <Login />
                            </fieldset>
                        </div>
                    </div>
                </div>
                <nav className="footer">
                    <p>
                        <a className="link" href="https://open.spotify.com/user/aapw?si=-o1yIHjYTHiYZnbuRUi3iA">Siga-me</a> no Spotify
                        <i className="fa fa-spotify" aria-hidden="true"></i>
                    </p>
                    <p id="copyright">Copyright © Otávio Venâncio 2022</p>
                </nav>
            </div>
        );
    }
}
export default App;

/*            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/songdatas" className="navbar-brand">
                        bezKoder
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/songdatas"} className="nav-link">
                                SongData
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route exact path="/songdatas" element={<SongDataList />}></Route>
                        <Route exact path="/add" element={<AddSongData />}></Route>
                        <Route path="/songdatas/:id" element={<SongData />}></Route>
                    </Routes>
                </div>
            </div>*/