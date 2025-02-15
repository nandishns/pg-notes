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
        title: "OPERATIONAL RESEARCH",
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
        title: "DISCRETE MATHEMATICS",
        semester: 1,
        folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
      },
      {
        id: "4",
        title: "TOPOLOGY",
        semester: 1,
        folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
      },
      {
        id: "5",
        title: "ALGEBRA 1",
        semester: 1,
        folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
      },
      {
        id: "6",
        title: "ORDINARY DIFFERENTIAL EQUATION",
        semester: 1,
        folderUrl: "https://drive.google.com/drive/folders/1wf9jWcRRUxQncPqrcQL0EQRJt8O1elrQ",
      },
    ],
  },
  {
    id: 2,
    name: "Semester 2",
    notes: [
      {
        id: "s2_1",
        title: "C Programming",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_2",
        title: "Algebra-2",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_3",
        title: "Partial Differential Equation",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_4",
        title: "Complex Analysis",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_5",
        title: "O.E.T 2.1 Basics Statistics",
        semester: 2,
        folderUrl: "",
      },
      {
        id: "s2_6",
        title: "C Programming Lab",
        semester: 2,
        folderUrl: "",
      },
    ],
  },
]

