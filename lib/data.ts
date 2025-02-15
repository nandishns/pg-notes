export interface Note {
  id: string
  title: string
  description?: string
  semester: number
  folderUrl: string
}

export interface Semester {
  id: number
  name: string
  notes: Note[]
}

export const semesters: Semester[] = [
  {
    id: 1,
    name: "Semester 1",
    notes: [
      {
        id: "1",
        title: "ALGEBRA",
        semester: 1,
        folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
      },
      {
        id: "2",
        title: "REAL ANALYSIS",
        semester: 1,
        folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
      },
      {
        id: "3",
        title: "GENERAL TOPOLOGY",
        semester: 1,
        folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
      },
      {
        id: "4",
        title: "ORDINARY DIFFERENTIAL EQUATIONS",
        semester: 1,
        folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
      },
      {
        id: "5",
        title: "DISCRETE MATHEMATICS",
        semester: 1,
        folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
      },
      {
        id: "6",
        title: "OPERATIONS RESEARCH",
        semester: 1,
        folderUrl: "https://drive.google.com/drive/folders/1wf9jWcRRUxQncPqrcQL0EQRJt8O1elrQ",
      },
      {
        id: "7",
        title: "NUMBER THEORY",
        semester: 1,
        folderUrl: "",
      },
    ],
  },
  {
    id: 2,
    name: "Semester 2",
    notes: [
      {
        id: "s2_1",
        title: "COMPLEX ANALYSIS",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_2",
        title: "PARTIAL DIFFERENTIAL EQUATIONS",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_3",
        title: "BASICS OF C-PROGRAMMING AND MATLAB",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_4",
        title: "BASICS OF C-PROGRAMMING AND MATLAB (PRACTICALS)",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_5",
        title: "FUZZY SETS AND SYSTEMS",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_6",
        title: "FOURIER TRANSFORMS AND INTEGRAL EQUATIONS",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_7",
        title: "OPERATIONS RESEARCH – I",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_8",
        title: "OPERATIONS RESEARCH – I (PRACTICALS)",
        semester: 2,
        folderUrl: "",
      },
    ],
  },
]

