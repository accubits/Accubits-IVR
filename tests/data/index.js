let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../../app');
//Our parent block
describe('Podcast', () => {
    describe('/GET media', () => {
        it('it should GET all the podcast', (done) => {
            chai.request(server)
                .get('/get_data?success=1')
                // .send({'success': true})
                .end((err, res) => {
                    // console.log(res.body.success)
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.success).should.be.eql(true);
                    done();
                });
        });
    });
    describe('/POST message', () => {
        it('it should Post data and get a message', (done) => {
            chai.request(server)
                .post('/get_data')
                .send({'success': 1})
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});
