"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import { FormTypes } from "@/utils";
import Snackbar from "@/components/snackbar";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const treatmentDescriptions = [
  { value: "Physical examination", label: "Physical Examination" },
  { value: "Blood test", label: "Blood Test" },
  { value: "X-ray", label: "X-ray" },
];

const medications = [
  { value: "Ibuprofen", label: "Ibuprofen" },
  { value: "Paracetamol", label: "Paracetamol" },
  { value: "Amoxicillin", label: "Amoxicillin" },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [formData, setFormData] = useState<FormTypes>({
    patientName: "",
    treatmentDescription: [],
    dateOfTreatment: "",
    medicationsPrescribed: [],
    costOfTreatment: 0,
  });
  const [errors, setErrors] = useState<FormTypes>({
    patientName: "",
    treatmentDescription: [],
    dateOfTreatment: "",
    medicationsPrescribed: [],
    costOfTreatment: 0,
  });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeSelect = (selectedOptions: any, name: string) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setFormData({
      ...formData,
      [name]: selectedValues,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formIsValid = true;
    const newErrors: FormTypes = {
      patientName: "",
      treatmentDescription: [],
      dateOfTreatment: "",
      medicationsPrescribed: [],
      costOfTreatment: 0,
    };

    if (!/^[a-zA-Z0-9\s]*$/.test(formData.patientName)) {
      newErrors.patientName = "Patient Name must be alphanumeric.";
      formIsValid = false;
    }

    if (formData.treatmentDescription.length === 0) {
      newErrors.treatmentDescription = [
        "Please select at least one treatment description.",
      ];
      formIsValid = false;
    }

    if (formData.medicationsPrescribed.length === 0) {
      newErrors.medicationsPrescribed = [
        "Please select at least one medication.",
      ];
      formIsValid = false;
    }

    if (!/^\d*\.?\d*$/.test(formData.costOfTreatment.toString())) {
      newErrors.costOfTreatment = NaN;
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      axios.post("http://localhost:5000/create", {
        data: { ...formData, dateOfTreatment: startDate },
      });
      console.log("Form submitted:", {
        ...formData,
        dateOfTreatment: startDate,
      });
      setFormData({
        patientName: "",
        treatmentDescription: [],
        dateOfTreatment: "",
        medicationsPrescribed: [],
        costOfTreatment: 0,
      });
    } else {
      setShowSnackbar(true);

      console.log(errors, "errors");
      setFormData({
        patientName: "",
        dateOfTreatment: "",
        treatmentDescription: [],
        medicationsPrescribed: [],
        costOfTreatment: 0,
      });
    }
  };

  useEffect(() => {
    console.log(startDate, "start date");
  }, [startDate]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  console.log(formData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <div className="container mx-auto mt-10 bg-gray-300 rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="patientName"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Name:
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="mt-1 p-2 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateOfTreatment"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Treatment:
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="treatmentDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Treatment Description:
            </label>
            <Select
              isMulti
              name="treatment"
              onChange={(selectedOptions) => {
                handleChangeSelect(selectedOptions, "treatmentDescription");
              }}
              options={treatmentDescriptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="medicationsPrescribed"
              className="block text-sm font-medium text-gray-700"
            >
              Medications Prescribed:
            </label>
            <Select
              isMulti
              name="medications"
              onChange={(option) =>
                handleChangeSelect(option, "medicationsPrescribed")
              }
              options={medications}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="costOfTreatment"
              className="block text-sm font-medium text-gray-700"
            >
              Cost of Treatment:
            </label>
            <input
              type="number"
              id="costOfTreatment"
              name="costOfTreatment"
              onChange={handleChange}
              value={formData.costOfTreatment}
              className="mt-1 p-2 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm w-full"
            />{" "}
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit Form
          </button>
        </form>
      </div>
      {showSnackbar && (
        <Snackbar errors={errors} onClose={() => setShowSnackbar(false)} />
      )}
    </main>
  );
}
