import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component"
import mlogo from './style/mtocadas-logo.png';
//https://medium.com/@awhite4096/no-my-collage-generator-for-spotify-cannot-hack-your-spotify-7d44cd68b1d1



class App extends Component {
    render() {
        var client_id = process.env.REACT_APP_CLIENT_ID
        var redirect_uri = process.env.REACT_APP_REDIRECT_URI
        var client_secret = process.env.REACT_APP_CLIENT_SECRET
        return (
            <div className="container-fluid container">
                <div className="app-container">
                    <div className="row text-center" id="title_div">
                        <div><img src={mlogo} className="smol" />
                            <a className="lighter"> com Spotify&nbsp;
                                <i className="fa fa-spotify fa-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div className="wrapper nav_container">
                        <div id="msform">
                            <fieldset>
                                <h2 className="fs-title">Isso não irá expor seus dados ou hackear sua conta&nbsp;
                                    <a className="fs-subtitle"></a>
                                    <a className="link"
                                        href="https://developer.spotify.com/documentation/general/guides/authorization/">
                                        (saiba mais)</a></h2>
                                <Login client_id={client_id} redirect_uri={redirect_uri} />
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