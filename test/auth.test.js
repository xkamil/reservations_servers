const User = require('../server/models/user');
const Reservation = require('../server/models/reservation');
const Resource = require('../server/models/resource');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('API', () => {
    const VALID_EMAIL_1 = 'roman@pega.com';
    const VALID_EMAIL_2 = 'roman2@pega.com';
    const RESOURCE_1 = 'tennis table';
    const RESOURCE_2 = 'ps4';
    const INVALID_EMAIL_1 = 'roman@gmail.com';

    beforeEach(done => {
        clearDatabase()
            .then(() => done())
            .catch(done)
    });

    describe(('Users'), () => {

        describe('POST /api/users/:email', () => {
            const expectedKeys = ["created", "updated", "_id", "email"];

            it('should return http 200 and created user if valid email is passed', (done) => {
                createUser(VALID_EMAIL_1)
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.keys(expectedKeys);
                        expect(res.body.email).to.equal(VALID_EMAIL_1);
                        done();
                    })
                    .catch(done);
            });

            it('should return http 200 and existing user if passing registered email', (done) => {
                let userId = null;

                createUser(VALID_EMAIL_1)
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.keys(expectedKeys);
                        expect(res.body.email).to.equal(VALID_EMAIL_1);
                        userId = res.body._id;

                        return createUser(VALID_EMAIL_1);
                    })
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.keys(expectedKeys);
                        expect(res.body.email).to.equal(VALID_EMAIL_1);

                        expect(res.body._id).to.equal(userId);
                        done();
                    })
                    .catch(done);
            });

            it('should return http 400 if passing invalid email', (done) => {
                createUser(INVALID_EMAIL_1)
                    .then(res => {
                        expect(res).to.have.status(400);
                        done();
                    })
                    .catch(done);
            });

        });

        describe('GET /api/users', () => {

            it('should return http 200 and empty list', (done) => {
                getAllUsers()
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(0);
                        done();
                    })
                    .catch(done);
            });

            it('should return http 200 and 2 users', (done) => {
                createUser(VALID_EMAIL_1)
                    .then(() => createUser(VALID_EMAIL_2))
                    .then(() => getAllUsers())
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(2);
                        done();
                    })
                    .catch(done);
            });

        });

        describe('DELETE /api/users', () => {

            it('should return http 200 and delete all users', (done) => {
                createUser(VALID_EMAIL_1)
                    .then(() => createUser(VALID_EMAIL_2))
                    .then(() => getAllUsers())
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(2);

                        return deleteAllUsers()
                    })
                    .then(res => {
                        expect(res).to.have.status(200);

                        return getAllUsers();
                    })
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(0);
                        done();
                    })
                    .catch(done);
            });

        });

    });

    describe(('Resources'), () => {

        describe('POST /api/resources/:name', () => {
            const expectedKeys = ["created", "updated", "_id", "name"];

            it('should return http 200 and created resource', (done) => {
                createResource(RESOURCE_1)
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.keys(expectedKeys);
                        expect(res.body.name).to.equal(RESOURCE_1);
                        done();
                    })
                    .catch(done);
            });

            it('should return http 409 if passing existing resource name', (done) => {
                createResource(RESOURCE_1)
                    .then(() => createResource(RESOURCE_1))
                    .then(res => {
                        expect(res).to.have.status(409);
                        done();
                    })
                    .catch(done);
            });

        });

        describe('GET /api/resources', () => {

            it('should return http 200 and empty list', (done) => {
                getAllResources()
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(0);
                        done();
                    })
                    .catch(done);
            });

            it('should return http 200 and 2 resources', (done) => {
                createResource(RESOURCE_1)
                    .then(() => createResource(RESOURCE_2))
                    .then(() => getAllResources())
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(2);
                        done();
                    })
                    .catch(done);
            });

        });

        describe('DELETE /api/resources', () => {

            it('should return http 200 and delete all resources', (done) => {
                createResource(RESOURCE_1)
                    .then(() => createResource(RESOURCE_2))
                    .then(() => getAllResources())
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(2);

                        return deleteAllResources()
                    })
                    .then(res => {
                        expect(res).to.have.status(200);

                        return getAllResources();
                    })
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(0);
                        done();
                    })
                    .catch(done);
            });

        });

        describe('DELETE /api/resources/:name', () => {

            it('should return http 200 and delete one resource', (done) => {
                createResource(RESOURCE_1)
                    .then(() => createResource(RESOURCE_2))
                    .then(() => getAllResources())
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(2);

                        return deleteResource(RESOURCE_1)
                    })
                    .then(res => {
                        expect(res).to.have.status(200);

                        return getAllResources();
                    })
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body instanceof Array).to.equal(true);
                        expect(res.body.length).to.equal(1);
                        expect(res.body[0].name).to.equal(RESOURCE_2);
                        done();
                    })
                    .catch(done);
            });

        });

    });

});

function clearDatabase() {
    return User.remove()
        .then(() => Reservation.remove())
        .then(() => Resource.remove());
}

function handleRequest(req) {
    return new Promise((resolve, reject) => {
        req.end((err, res) => {
            if (err && err.response) {
                resolve(err);
            } else if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    });
}

// Users

function createUser(email) {
    return handleRequest(chai.request(server).post(`/api/users/${email}`));
}

function getAllUsers() {
    return handleRequest(chai.request(server).get(`/api/users`));
}

function deleteAllUsers() {
    return handleRequest(chai.request(server).delete(`/api/users`));
}

// Resources

function createResource(name) {
    return handleRequest(chai.request(server).post(`/api/resources/${name}`));
}

function getAllResources() {
    return handleRequest(chai.request(server).get(`/api/resources`));
}

function deleteAllResources() {
    return handleRequest(chai.request(server).delete(`/api/resources`));
}

function deleteResource(name) {
    return handleRequest(chai.request(server).delete(`/api/resources/${name}`));
}