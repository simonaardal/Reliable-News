var mysql = require("mysql");

const SakDao = require("./sakdao");
const runsqlfile = require("./runsqlfile");

var pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});
let sakDao = new SakDao(pool);

beforeAll(done => {
    runsqlfile("dao/create_table.sql", pool, () => {
        runsqlfile("dao/create_testdata.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});

test("hent en sak fra db med id=1", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].navn).toBe("Lars Larsen");
        done();
    }
    sakDao.getSak(1, callback);
});

test("opprett sak", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows === 1);
        done();
    }

    sakDao.opprettSak({navn: "Nils Nilsen", tittel: "Erna slutter", tekst: "Lorem ipsum", prioritering: "prioritering2",
    kategori: "politikk", url: "https://smp.vgc.no/v2/images/ff01bc25-f277-4b4b-b9d5-d882ee57ca3e?fit=crop&h=1267&w=1900&s=a31b05956233d38a7fa19e60a0ec86e1db046dc8", tidspunkt: "2019-11-12: 13:12"}, callback);

});

test("hent saker med prioritering 1", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length === 1);
        done();
    }
    sakDao.getSakerMedPri1(callback);
});

test("hent saker med prioritering 2", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length === 1);
        expect(data[0].navn).toBe("Nils Nilsen");
        done();
    }
    sakDao.getSakerMedPri2(callback);
});

test("hent saker med gitt kategori", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length === 1);
        expect(data[0].tittel).toBe("Vulkanutbrudd på Island");
        done();
    }
    sakDao.getKategori("politikk", callback);
});

test("endre sak med gitt id", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows === 1);
        done();
    }
    sakDao.endreSak(1, {navn: "Nils Nilsen", tittel: "Jens kommer tilbake", tekst: "Lorem ipsum", prioritering: "prioritering1",
        kategori: "politikk", url: "https://e3.365dm.com/19/08/768x432/skynews-jens-stoltenberg-jens-stoltenberg-nato_4757153.jpg?20190827155837"}, callback);
});


test("publiser kommentar", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows === 1);
        done();
    }
    sakDao.publiserKommentar(1, {navn: "Nils Nilsen", kommentar: "Jens er kjempeflink", pub_tidspunkt: "2019-20-19:13:14"}, callback);
});

test("hent kommentarer fra en sak med ID=1", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length === 1);
        expect(data[0].navn).toBe("Nils Nilsen");
        done();
    }
    sakDao.getKommentarer(1, callback);
});

test("like sak med gitt ID", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows === 1);
        done();
    }
    sakDao.like(1, callback);
});

test("dislike sak med gitt ID", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows === 1);
        done();
    }
    sakDao.dislike(1, callback);
});

test("hent likes fra en sak med gitt ID", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        done();
    }
    sakDao.getLikes(1, callback);
});

test("hent dislikes fra en sak med gitt ID", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        done();
    }
    sakDao.getDislikes(1, callback);
});





