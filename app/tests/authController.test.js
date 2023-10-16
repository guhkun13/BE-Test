const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server");

chai.use(chaiHttp);
chai.should();

const PROTECTED = "/protected";
const AUTHENTICATED = "/authenticated";
const ADMIN = "/admin";
const STAFF = "/staff";
const FINANCE = "/finance";
const HRD = "/hrd";
const OK_MESSAGE = "you are authenticated & has right to access this resource";
const ERR_PERMISSION_DENIED = "Permission denied";

const User1 = {
  username: "user1",
  password: "pass1",
  role: "staff",
  division: "hrd",
};

const User2 = {
  username: "user2",
  password: "pass2",
  role: "staff",
  division: "finance",
};

const User3 = {
  username: "user3",
  password: "pass3",
  role: "admin",
  division: "",
};

describe("Auth Controller", () => {
  before((done) => {
    // Start the server before running the tests
    server = app.listen(3333, () => {
      done();
    });
  });

  after((done) => {
    server.close((err) => {
      if (err) {
        console.error(err);
        process.exit(1); // Exit with an error code
      } else {
        done();
      }
    });
  });

  let authenticatedUrl = PROTECTED + AUTHENTICATED;
  describe("Testing on route" + authenticatedUrl, () => {
    let loginToken = "";

    describe("Unallowed access for non-user ", () => {
      it("should not be able to access route " + authenticatedUrl, (done) => {
        chai
          .request(app)
          .get(authenticatedUrl)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe("Allowed access for existing user ", () => {
      const allUser = [User1, User2, User3];
      allUser.forEach((user) => {
        console.log(user);

        it("should return a JWT token on successful login", (done) => {
          chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("data");
              res.body.should.have.property("data").have.property("token");

              loginToken = res.body.data.token;
              done();
            });
        });

        it("should able to access route " + authenticatedUrl, (done) => {
          chai
            .request(app)
            .get(authenticatedUrl)
            .set("Authorization", "Bearer " + loginToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("message").equal(OK_MESSAGE);
              done();
            });
        });
      });
    });
  });

  let staffDivisionFinanceUrl = PROTECTED + STAFF + FINANCE;
  describe("Testing on route" + staffDivisionFinanceUrl, () => {
    let loginToken = "";

    const allowedUser = [User2, User3];
    const unallowedUser = [User1];

    describe("Access for allowed User", () => {
      allowedUser.forEach((user) => {
        it("should return a JWT token on successful login", (done) => {
          chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("data");
              res.body.should.have.property("data").have.property("token");

              loginToken = res.body.data.token;
              done();
            });
        });

        it(
          "should be able to access route " + staffDivisionFinanceUrl,
          (done) => {
            chai
              .request(app)
              .get(staffDivisionFinanceUrl)
              .set("Authorization", "Bearer " + loginToken)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").equal(OK_MESSAGE);
                done();
              });
          }
        );
      });
    });

    describe("Access for unallowed User", () => {
      unallowedUser.forEach((user) => {
        it("should return a JWT token on successful login", (done) => {
          chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("data");
              res.body.should.have.property("data").have.property("token");

              loginToken = res.body.data.token;
              done();
            });
        });

        it(
          "should get error permission denied " + staffDivisionFinanceUrl,
          (done) => {
            chai
              .request(app)
              .get(staffDivisionFinanceUrl)
              .set("Authorization", "Bearer " + loginToken)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have
                  .property("message")
                  .equal(ERR_PERMISSION_DENIED);
                done();
              });
          }
        );
      });
    });
  });

  let staffDivisionHrdUrl = PROTECTED + STAFF + HRD;
  describe("Testing on route" + staffDivisionHrdUrl, () => {
    let loginToken = "";

    const allowedUser = [User1, User3];
    const unallowedUser = [User2];

    describe("Access for allowed User", () => {
      allowedUser.forEach((user) => {
        it("should return a JWT token on successful login", (done) => {
          chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("data");
              res.body.should.have.property("data").have.property("token");

              loginToken = res.body.data.token;
              done();
            });
        });

        it("should be able to access route " + staffDivisionHrdUrl, (done) => {
          chai
            .request(app)
            .get(staffDivisionHrdUrl)
            .set("Authorization", "Bearer " + loginToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("message").equal(OK_MESSAGE);
              done();
            });
        });
      });
    });

    describe("Access for unallowed User", () => {
      unallowedUser.forEach((user) => {
        it("should return a JWT token on successful login", (done) => {
          chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("data");
              res.body.should.have.property("data").have.property("token");

              loginToken = res.body.data.token;
              done();
            });
        });

        it(
          "should get error permission denied " + staffDivisionHrdUrl,
          (done) => {
            chai
              .request(app)
              .get(staffDivisionHrdUrl)
              .set("Authorization", "Bearer " + loginToken)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have
                  .property("message")
                  .equal(ERR_PERMISSION_DENIED);
                done();
              });
          }
        );
      });
    });
  });

  let adminUrl = PROTECTED + ADMIN;
  describe("Testing on route" + adminUrl, () => {
    let loginToken = "";

    const allowedUser = [User3];
    const unallowedUser = [User1, User2];

    describe("Access for allowed User", () => {
      allowedUser.forEach((user) => {
        it("should return a JWT token on successful login", (done) => {
          chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("data");
              res.body.should.have.property("data").have.property("token");

              loginToken = res.body.data.token;
              done();
            });
        });

        it("should be able to access route " + adminUrl, (done) => {
          chai
            .request(app)
            .get(adminUrl)
            .set("Authorization", "Bearer " + loginToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("message").equal(OK_MESSAGE);
              done();
            });
        });
      });
    });

    describe("Access for unallowed User", () => {
      unallowedUser.forEach((user) => {
        it("should return a JWT token on successful login", (done) => {
          chai
            .request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("data");
              res.body.should.have.property("data").have.property("token");

              loginToken = res.body.data.token;
              done();
            });
        });

        it("should get error permission denied " + adminUrl, (done) => {
          chai
            .request(app)
            .get(adminUrl)
            .set("Authorization", "Bearer " + loginToken)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.have
                .property("message")
                .equal(ERR_PERMISSION_DENIED);
              done();
            });
        });
      });
    });
  });
});
