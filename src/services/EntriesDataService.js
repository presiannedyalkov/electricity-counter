import firebase from "../config/firebase";

const db = firebase.collection("/entries");

class EntriesDataService {
    getAll() {
        return db;
    }

    create(entry) {
        return db.add(entry);
    }

    update(id, value) {
        return db.doc(id).update(value);
    }

    delete(id) {
        return db.doc(id).delete();
    }
}

export default new EntriesDataService();