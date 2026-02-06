import { useMemo, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // adjust path if needed
// import { getAvailableMedicinesForPrescription } 

import {
  getAvailableMedicinesForPrescription,
  printPrescription,
  getTodayPrescriptionCount,
} from "../api/medicineApi";


// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//pdfMake.vfs = pdfFonts.pdfMake.vfs; // attach font virtual file system
pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;


async function fetchAvailableMeds() {
  const response = await fetch("http://localhost:8080/api/medicines/available");

  if (!response.ok) {
    throw new Error("Failed to fetch medicines");
  }

  return response.json(); // returns array of objects
}


const diagnosisOptions = [
  { value: "filling", label: "Filling" },
  { value: "extraction", label: "Extraction" },
  { value: "cleaning", label: "Cleaning" },
  { value: "rct", label: "Root Canal" },
  { value: "implant", label: "Implant" },
  { value: "whitening", label: "Whitening" },
  { value: "other", label: "Other" },
];

const instructionByDiagnosis = {
  filling:
    "After filling: mild sensitivity is possible. Avoid very hot/cold foods today. If severe pain/fever/infection signs within 24h, contact the clinic at 077654122.\n\n",
  extraction:
    "After extraction: bite on gauze 20 minutes if slight bleeding. Avoid hot foods, alcohol, smoking for 48h. Call the clinic if fever or severe pain at 077654122.\n\n" ,

  cleaning:
    "After cleaning: gums may feel tender. Mild bleeding possible when brushing. Use a soft brush. If heavy bleeding or pain, contact the clinic at 077654122.\n\n",

  rct:
    "After root canal step: mild pain/sensitivity is possible. Take painkiller as prescribed. If the temporary filling loosens, contact the clinic at 077654122.\n\n" ,

  implant:
    "After implant: avoid pressure/chewing on the site. Soft diet 48h. Rinse with prescribed mouthwash. Call the clinic if swelling/fever/pus at 077654122.\n\n" ,

  whitening:
    "After whitening: avoid strongly colored foods/drinks (coffee/tea/red wine) for 24–48h. Mild sensitivity possible; use desensitizing toothpaste. Emergency: 077654122.\n\n" ,

  other: "Custom instructions: please edit this text as needed.\n\n" ,
};

const defaultPrescriptionRow = () => ({
  drug: "",
  brand: "",
  timesPerDay: "",
  duration: "",
  source: "clinic",
  remark: "",
});

export default function NotesPage() {
  const [availableMeds, setAvailableMeds] = useState([]);
  const [patient, setPatient] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("filling");
  const [procedureDetail, setProcedureDetail] = useState("");
  const [hasAllergy, setHasAllergy] = useState("no");
  const [allergyText, setAllergyText] = useState("");
  const [prescriptions, setPrescriptions] = useState([defaultPrescriptionRow()]);
  const [postOpText, setPostOpText] = useState(instructionByDiagnosis["filling"]);
  const [followUp, setFollowUp] = useState("");
  const [prescriptionsIssuedToday, setPrescriptionsIssuedToday] = useState(0); // TODO: seed from API

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

useEffect(() => {
  getAvailableMedicinesForPrescription()
    .then(setAvailableMeds)
    .catch(() => setAvailableMeds([]));
}, []);

useEffect(() => {
  getTodayPrescriptionCount()
    .then(setPrescriptionsIssuedToday)
    .catch(() => setPrescriptionsIssuedToday(0));
}, []);
// const updatedCount = await printPrescription();
// setPrescriptionsIssuedToday(updatedCount);




  const handleAddRow = () => setPrescriptions((p) => [...p, defaultPrescriptionRow()]);
  const handleRemoveRow = (idx) =>
    setPrescriptions((p) => (p.length === 1 ? p : p.filter((_, i) => i !== idx)));
  const handleRowChange = (idx, field, value) =>
    setPrescriptions((p) => p.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));

  const handleDiagnosisChange = (value) => {
    setDiagnosis(value);
    setPostOpText(instructionByDiagnosis[value] || "");
  };

  const validationError = useMemo(() => {
    if (!patient.trim()) return "Patient is required.";
    if (!visitDate) return "Visit date/time is required.";
    if (!diagnosis) return "Diagnosis is required.";
    //if (!procedureDetail.trim()) return "Procedure/Detail is required.";
    if (!prescriptions.length) return "At least one prescription is required.";
    for (const [i, row] of prescriptions.entries()) {
      if (!row.drug.trim()) return `Prescription #${i + 1}: drug is required.`;
     // if (!row.dose.trim()) return `Prescription #${i + 1}: dose is required.`;
      if (!row.timesPerDay.trim()) return `Prescription #${i + 1}: times/day is required.`;
      if (!row.duration.trim()) return `Prescription #${i + 1}: duration is required.`;
    }
    return null;
  }, [patient, visitDate, diagnosis, prescriptions]);

  //new

  

//   const handleSave = () => {
//     if (validationError) return;
//     // TODO: connect to backend API
//     alert("Saved (demo). Wire this to your API.");
//   };

//   const handlePrint = () => {
//     if (validationError) return;
//     window.print(); // print preview (no download)
//   };

// const handleSave = () => {
//   if (validationError) return;
//   const doc = buildDocDefinition();
//   pdfMake.createPdf(doc).download("note.pdf");
// };
const handleCancel = () => {
  setPatient("");
  setVisitDate("");
  setDiagnosis("filling");
  setProcedureDetail("");
  setHasAllergy("no");
  setAllergyText("");
  setPrescriptions([defaultPrescriptionRow()]);
  setPostOpText(instructionByDiagnosis["filling"]);
  setFollowUp("");
};

const handlePrint = async () => {
  if (validationError) return;

  const doc = buildDocDefinition();
 pdfMake.createPdf(doc).open(); // preview/print
   const prescriptionsIssuedToday = await printPrescription();
  setPrescriptionsIssuedToday(prescriptionsIssuedToday);

 
};


//new
  // PDF layout for Dentpulse Dental note
const buildDocDefinition = () => ({
  pageMargins: [36, 40, 36, 40],
  content: [
    { text: "Dentpulse Dental", style: "title", margin: [0, 0, 0, 12] },

    { text: "Patient information", style: "section" },
    {
      table: {
        widths: ["*", "*"],
        body: [
          ["Name", patient || "-"],
          ["Date/Time", visitDate || "-"],
          ["Allergies", hasAllergy === "yes" ? allergyText || "Yes (unspecified)" : "No"],
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 4, 0, 12],
    },

    { text: "Prescription", style: "section" },
    {
      table: {
        widths: ["*", "auto", "auto", "auto", "auto", "*"],
        body: [
          ["Drug", "Brand", "Times/day", "Duration", "Source", "Remark"],
          ...prescriptions.map((p) => [
            p.drug || "-",          // ✅ FIXED: drug name prints correctly
            p.brand || "-",         // brand stays brand
            p.timesPerDay || "-",
            p.duration || "-",
            p.source === "outside" ? "Outside" : "Clinic",
            p.remark || "",
          ]),
        ],

      },
      layout: "lightHorizontalLines",
      margin: [0, 4, 0, 12],
    },

      { text: "Post follow-up instructions", style: "section" },

      // Show follow-up date ONLY if selected
      ...(followUp
        ? [
            {
              text: `Follow-up Date: ${followUp}`,
              bold: true,
              margin: [0, 4, 0, 6],
            },
          ]
        : []),

{ text: postOpText || "-", margin: [0, 4, 0, 24] },


    { text: "Doctor’s official stamp: ____________________", margin: [0, 12, 0, 0] },
  ],
  styles: {
    title: { fontSize: 16, bold: true, alignment: "center" },
    section: { fontSize: 12, bold: true, margin: [0, 6, 0, 2] },
  },
  defaultStyle: { fontSize: 10 },
});

  return (
    <div className="flex min-h-screen bg-emerald-50 text-slate-900">
      <Sidebar />

      <div className="flex-1 mx-auto max-w-6xl px-6 py-6">
        
        {/* Header cards */}
        <div className="w-1/4 flex flex-wrap gap-4 mb-6">

          {/* <div className="flex-1 min-w-[220px] rounded-xl bg-white shadow-sm border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Today’s Notes</p>
            <p className="text-3xl font-semibold text-emerald-600 mt-1">4</p>
          </div> */}
            <div className="flex-1 min-w-[220px] rounded-xl bg-white shadow-sm border border-slate-200 p-4">
            <p className="text-sm text-black">Prescriptions Issued Today</p>
            <p className="text-3xl font-semibold text-green-600 mt-1">{prescriptionsIssuedToday}</p>
            </div>
        </div>

        {/* Patient & Visit */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 mb-6">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">Patient & Visit Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Patient *</label>
              <input
                required
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                placeholder="Search or type patient name/ID"
                className="w-full rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-400 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Date / Time *</label>
              <input
                required
                type="datetime-local"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                max="2099-12-31T23:59"
                className="w-full rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-400 px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Diagnosis *</label>
              <select
                required
                value={diagnosis}
                onChange={(e) => handleDiagnosisChange(e.target.value)}
                className="w-full rounded-lg border border-emerald-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              >
                {diagnosisOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Procedure / Detail </label>
              <input
                required
                value={procedureDetail}
                onChange={(e) => setProcedureDetail(e.target.value)}
                placeholder="e.g., UL8 extraction, Class II MO filling"
                className="w-full rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-400 px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-slate-600 mb-1">Allergies?</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  value="no"
                  checked={hasAllergy === "no"}
                  onChange={() => setHasAllergy("no")}
                  className="text-emerald-600"
                />
                <span>No</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  value="yes"
                  checked={hasAllergy === "yes"}
                  onChange={() => setHasAllergy("yes")}
                  className="text-emerald-600"
                />
                <span>Yes</span>
              </label>
              {hasAllergy === "yes" && (
                <input
                  value={allergyText}
                  onChange={(e) => setAllergyText(e.target.value)}
                  placeholder="e.g., Penicillin"
                  className="flex-1 rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-400 px-3 py-2"
                />
              )}
            </div>
          </div>
        </div>

        {/* Prescriptions */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 mb-6">
          <h2 className="text-lg font-semibold text-emerald-700 mb-3">Prescriptions *</h2>
           <h3 className="text-sm font-semibold text-red-600 mb-3">(first select the  clinic/outside pharmacy)</h3>
              <p></p>
          <div className="space-y-3">
            {prescriptions.map((row, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <div className="grid md:grid-cols-3 gap-3">
                  {/* Drug field changes depending on source */}

                    <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        className="text-emerald-600"
                        checked={row.source === "clinic"}
                        onChange={() => handleRowChange(idx, "source", "clinic")}
                      />
                      <span>Clinic</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        className="text-emerald-600"
                        checked={row.source === "outside"}
                        onChange={() => handleRowChange(idx, "source", "outside")}
                      />
                      <span>Outside pharmacy</span>
                    </label>
                  </div>

                  {row.source === "clinic" ? (
                  <select
                    required
                    value={row.drug}
                    onChange={(e) => handleRowChange(idx, "drug", e.target.value)}
                    className="rounded-lg border border-emerald-300 px-3 py-2"
                  >
                    <option value="">Select available medicine</option>

                    {availableMeds.map((m) => (
                      <option key={m.medicineId} value={m.medicineId}>
                        {m.medicineName} {m.dosage}
                      </option>
                    ))}
                  </select>


                  ) : (
                    <input
                      required
                      className="rounded-lg border border-emerald-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400"
                      placeholder="Drug name (outside pharmacy)"
                      value={row.drug}
                      onChange={(e) => handleRowChange(idx, "drug", e.target.value)}
                    />
                  )}
                  

        
                  <input
                    required
                    className="rounded-lg border border-emerald-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400"
                    placeholder="Times/day"
                    value={row.timesPerDay}
                    onChange={(e) => handleRowChange(idx, "timesPerDay", e.target.value)}
                  />
                  <input
                    required
                    className="rounded-lg border border-emerald-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400"
                    placeholder="Duration (e.g., 5 days)"
                    value={row.duration}
                    onChange={(e) => handleRowChange(idx, "duration", e.target.value)}
                  />
                
                  <input
                    className="rounded-lg border border-emerald-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400 md:col-span-2"
                    placeholder="Remark (e.g., after meals)"
                    value={row.remark}
                    onChange={(e) => handleRowChange(idx, "remark", e.target.value)}
                  />
                  <div className="flex md:justify-end">
                    {idx > 0 && (
                      <button
                        onClick={() => handleRemoveRow(idx)}
                        className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))}
            <button
              onClick={handleAddRow}
              className="px-4 py-2 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold"
            >
              + Add prescription
            </button>
          </div>
        </div>

        {/* Post-op & Follow-up */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 mb-24">
          <h2 className="text-lg font-semibold text-emerald-700 mb-3">Post-Op Instructions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Instructions (auto from diagnosis)</label>
              <select
                value={diagnosis}
                onChange={(e) => handleDiagnosisChange(e.target.value)}
                className="w-full rounded-lg border border-emerald-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              >
                {diagnosisOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Follow-up (optional)</label>
              <input
                type="date"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                min={today}
                className="w-full rounded-lg border border-emerald-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>
          <div className="mt-3">
            <textarea
              value={postOpText}
              onChange={(e) => setPostOpText(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-emerald-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Sticky actions + warning */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-inner">
        <div className="mx-auto max-w-xl px-6 py-3 flex flex-col gap-2">
          {validationError && (
            <div className="text-sm text-red-600  font-semibold">
              {validationError}
            </div>
          )}
          <div className="flex justify-end gap-3">
        <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg font-semibold border border-green-500 bg-green-200 text-black hover:bg-green-600"

        >
            Cancel
        </button>

            {/* <button
              onClick={handleSave}
              disabled={!!validationError}
              className={`px-4 py-2 rounded-lg font-semibold text-white ${
                validationError
                  ? "bg-emerald-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Cancel
            </button> */}
            <button
              onClick={handlePrint}
              disabled={!!validationError}
              className={`px-4 py-2 rounded-lg  bg-green-200 font-semibold ${
                validationError
                  ? "border border-green-500 text-black cursor-not-allowed"
                  : "border border-green-500 text-emerald-700 hover:bg-green-600"
              }`}
            > 
              Print 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}