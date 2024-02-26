import db from "../config/db";
import { v4 as uuidv4 } from "uuid";

interface QueryRequest {
  patientId: string;
  patientName: string;
  dateOfTreatment: Date;
  treatmentDescription: JSON;
  medicationsPrescribed: JSON;
  costOfTreatment: number;
}

interface QueryResponse extends QueryRequest {}

async function getAllData(): Promise<QueryResponse[]> {
  try {
    const queryResponse: any = await db
      .promise()
      .query("SELECT * FROM carenow.form_data");
    return queryResponse[0] as QueryResponse[];
  } catch (err) {
    throw err;
  }
}

async function insertFormData(data: QueryRequest): Promise<QueryResponse[]> {
  try {
    const queryResponse: any = await db
      .promise()
      .query(
        "INSERT INTO carenow.form_data (patient_id, patient_name, date_of_treatment, treatment_description, medications_prescribed, cost_of_treatment) VALUES (?, ?, ?, ?, ?, ?)",
        [
          uuidv4(),
          data.patientName,
          data.dateOfTreatment,
          JSON.stringify(data.treatmentDescription),
          JSON.stringify(data.medicationsPrescribed),
          data.costOfTreatment,
        ]
      );
    return queryResponse[0] as QueryResponse[];
  } catch (err) {
    throw err;
  }
}

export { getAllData, insertFormData };
