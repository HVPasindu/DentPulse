// export const registerpagedata = [

//     {
//         id: 1,
//         type: "text",
//         name: "Full Name",

//     },
//     {
//         id: 2,
//         type: "email",
//         name: "Email Address",
//     },
//     {
//         id: 3,
//         type: "text",
//         name: "Address",
//     },
//     {
//         id: 4,
//         type: "tel",
//         name: "Phone Number",
//     },

//     {
//         id: 5,
//         type: "date",
//         name: "Date of Birth"
//     },
//     {
//         id: 6,
//         type: "checkbox",
//         name: "Gender",
//         genders: ["Male", "Female"]
//     },
//     {
//         id: 7,
//         type: "password",
//         name: "Password",
//     },
//     {
//         id: 8,
//         type: "password",
//         name: "Confrim Password",

//     },

// ]


export const registerpagedata = [
  {
    id: 1,
    type: "text",
    name: "fullName", // This matches the key in formData
    label: "Full Name", // This is the label for display
  },
  {
    id: 2,
    type: "email",
    name: "email",
    label: "Email Address",
  },
  {
    id: 3,
    type: "text",
    name: "address",
    label: "Address",
  },
  {
    id: 4,
    type: "tel",
    name: "phone",
    label: "Phone Number",
  },
  {
    id: 5,
    type: "date",
    name: "birthDate",
    label: "Date of Birth",
  },
  {
    id: 6,
    type: "checkbox",
    name: "gender",
    genders: ["Male", "Female"], // Gender options
    label: "Gender",
  },
  {
    id: 7,
    type: "password",
    name: "password",
    label: "Password",
  },
  {
    id: 8,
    type: "password",
    name: "confirmPassword", // For confirmation password
    label: "Confirm Password",
  },
];
