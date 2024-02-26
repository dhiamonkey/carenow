import { postFormData } from "../functions";
import { insertFormData } from "../models/model";
import request from "supertest";
import { app } from "../server/server";

const data = {
  data: {
    patientName: "asdas",
    treatmentDescription: ["Physical examination", "X-ray"],
    dateOfTreatment: "2024-02-27T15:09:54.000Z",
    medicationsPrescribed: ["Paracetamol", "Amoxicillin"],
    costOfTreatment: "2333",
  },
};

const mockData2 = {
  data: {
    patientName: "john test",
    treatmentDescription: ["X-ray"],
    dateOfTreatment: "2024-02-27T15:09:54.000Z",
    medicationsPrescribed: ["Paracetamol", "Amoxicillin"],
    costOfTreatment: "2333",
  },
};

const invalidData = {
  data: {
    patientName: 10,
    treatmentDescription: null,
    costOfTreatment: "2333",
  },
};

const invalidData2 = {
  data: {
    patientName: undefined,
    medicationsPrescribed: null,
    costOfTreatment: NaN,
  },
};

test("should successfully run the query with only 1 affected row", (done) => {
  request(app)
    .post("/create")
    .send(data)
    .expect(200)
    .end((err, res) => {
      expect(res.body).toMatchInlineSnapshot(`
{
  "affectedRows": 1,
  "changedRows": 0,
  "fieldCount": 0,
  "info": "",
  "insertId": 0,
  "serverStatus": 2,
  "warningStatus": 0,
}
`);
      return done();
    });

  request(app)
    .post("/create")
    .send(mockData2)
    .expect(200)
    .end((err, res) => {
      expect(res.body).toMatchInlineSnapshot(`
{
  "affectedRows": 1,
  "changedRows": 0,
  "fieldCount": 0,
  "info": "",
  "insertId": 0,
  "serverStatus": 2,
  "warningStatus": 0,
}
`);
      return done();
    });
});
test("should fail the query due to invalid data type(s) ", (done) => {
  request(app)
    .post("/create")
    .send(invalidData)
    .expect(500)
    .end((err, res) => {
      expect(res.body).toMatchInlineSnapshot(`
{
  "error": "Error retrieving data",
}
`);
      return done();
    });
  request(app)
    .post("/create")
    .send(invalidData2)
    .expect(500)
    .end((err, res) => {
      expect(res.body).toMatchInlineSnapshot(`
{
  "error": "Error retrieving data",
}
`);
      return done();
    });
});
