import React, { useState, useEffect } from "react";
import axios from "axios";
import SongDDataService from "../services/songdata.service";


const optionsArea = [
    {
        label: "Selecione a área de estudo",
        value: "",
    },
    {
        label: "Ciências Humanas",
        value: "humanas",
    },
    {
        label: "Ciências Exatas da Terra",
        value: "exatas",
    },
    {
        label: "Ciências Biológicas",
        value: "biologicas",
    },
    {
        label: "Engenharias",
        value: "eng",
    },
    {
        label: "Ciências da Saúde",
        value: "saude",
    },
    {
        label: "Ciências Agrárias",
        value: "agrarias",
    },
    {
        label: "Linguística, Letras e Artes",
        value: "letras",
    },
    {
        label: "Ciências Sociais Aplicadas",
        value: "sociais",
    },
    {
        label: "Outras",
        value: "outras",
    }
];

const optionsGrau = [
    {
        label: "Selecione o grau de estudo",
        value: "",
    },
    {
        label: "Graduação",
        value: "graduacao",
    },
    {
        label: "Especialização/MBA",
        value: "espec",
    },
    {
        label: "Mestrado",
        value: "mestrado",
    },
    {
        label: "Doutorado",
        value: "doutorado",
    },
];

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


function Login(props) {
    const CLIENT_ID = props.client_id
    const REDIRECT_URI = props.redirect_uri
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = 'user-top-read';

    const [token, setToken] = useState("")
    //const [topTracks, setTopTracks] = useState([])
    const [area, setArea] = useState("")
    const [grau, setGrau] = useState("")
    const [erro, setError] = useState([false, ""]) //status,message
    const [succ, setSucess] = useState(0)

    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        // getToken()
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
    }, [])

    const onChangeArea = async (e) => {
        setError(false, "")
        setSucess(0)
        setArea(e.target.value)
    }

    const onChangeGrau = async (e) => {
        setError(false, "")
        setSucess(0)
        setGrau(e.target.value)
    }

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }
    const saveSongData = async (e) => {
        setError(false, "")
        setSucess(0)
        e.preventDefault()
        if (grau === "" || area === "") {
            setError([true])
            return
        }
        try {
            const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            //setTopTracks(data)
            var req = data
            req.grau = grau
            req.area = area
            const { resp } = await SongDDataService.create(req)
            setSucess(1)
        } catch (err) {
            setSucess(-1)
            console.error(err);
        }
    }

    return (
        <div>
            {succ <= 0 ?
                <div>
                    {erro[0] ?
                        <div className="warning">Preencha todos os campos!</div> : null}
                    {succ < 0 ?
                        <div className="error">Erro Fatal!</div> : null}
                    {token ?
                        <div>
                            <select id="spotifyCols" autoComplete="off" onChange={onChangeGrau}>
                                {optionsGrau.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <select id="spotifyPeriod" autoComplete="off" onChange={onChangeArea}>
                                {optionsArea.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <button onClick={saveSongData} className="next action-button">Finalizar
                            </button>
                            <button onClick={logout} style={{ visibility: token ? 'visible' : 'hidden' }} className="next action-button">Cancelar</button>
                        </div>
                        : <h2>Please login</h2>
                    }
                    {!token ?
                        <a className="next action-button abutton" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&state=${generateRandomString(16)}`}>
                            Autenticar <i className="fa fa-spotify fa-right aria-hidden=true"></i></a>
                        : null}

                </div> : <div className="success"><h1>Sucesso!</h1></div>}

        </div>
    );
}
export default Login;