import React, { Component } from "react";
import SongDDataService from "../services/songdata.service";

const optionsArea = [
    {
        label: "Ciências Humanas",
        value: "humanas",
    },
    {
        label: "Ciências Exatas da Terra",
        value: "exaras",
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
const CLIENT_ID = "55b9c926505a44b9b685faaec5b28633"
const REDIRECT_URI = "http://localhost:8081/callback"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "code"

export default class AddSongData extends Component {
    constructor(props) {
        super(props);
        this.onChangeArea = this.onChangeArea.bind(this);
        this.onChangeGrau = this.onChangeGrau.bind(this);
        this.saveSongData = this.saveSongData.bind(this);
        this.newSongData = this.newSongData.bind(this);
        this.state = {
            posts: "",
            id: null,
            area: "",
            grau: ""
        };
    }

    componentDidMount() {
        console.log("montadaa ")
        console.log('this.state. ' + this.state.posts)
    }

    onChangeArea(e) {
        this.setState({
            title: e.target.value
        });
        console.log('onChangeArea ' + e.target.value)
    }
    onChangeGrau(e) {
        this.setState({
            title: e.target.value
        });
        console.log('onChangeGrau ' + e.target.value)
    }
    saveSongData(e) {
        e.preventDefault()
        fetch(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`, { mode: 'cors' })
            .then(response => response.json())
            .then(posts => this.setState({ posts: posts }));
        console.log('this.state. ' + this.state.posts)
        var data = {
            area: this.state.area,
            grau: this.state.grau,
        };
        console.log('saveSongData ' + data)
        //SpotifyService.getAuth()
        SongDDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newSongData() {
        this.setState({
            id: null,
            items: "",
            area: "",
            class: 0,
            limit: 0,
            offset: 0,
            previous: "",
            href: "",
            next: ""
        });
    }
    render() {
        return (
            <div>
                <select id="spotifyCols" autoComplete="off" defaultValue='Grau' onChange={this.onChangeGrau}>
                    {optionsGrau.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select id="spotifyPeriod" autoComplete="off" defaultValue='Área de Estudo' onChange={this.onChangeArea}>
                    {optionsArea.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <button onClick={this.saveSongData} className="next action-button">Autenticar
                    <i className="fa fa-spotify fa-right aria-hidden=true"></i>
                </button>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                    to Spotify</a>
            </div>
        );
    }
}