import http from "../http-common";
class SongDDataService {
    getAll() {
        return http.get("/songdatas");
    }
    get(id) {
        return http.get(`/songdatas/${id}`);
    }
    create(data) {
        return http.post("/songdatas", data);
    }
    update(id, data) {
        return http.put(`/songdatas/${id}`, data);
    }
    delete(id) {
        return http.delete(`/songdatas/${id}`);
    }
    deleteAll() {
        return http.delete(`/songdatas`);
    }
    findByTitle(id) {
        return http.get(`/songdatas?id=${id}`);
    }
}
export default new SongDDataService();