import axios from "axios";
export default axios.create({
    baseURL: "https://maistocadasufmg-bcsth.ondigitalocean.app/backmaistocadasufmg/apiS",//"https://maistocadasufmg.herokuapp.com/api", //"http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});