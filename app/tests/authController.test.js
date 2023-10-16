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
  describe("Testing /protected/authenticated", () => {
    let loginToken = "";

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
