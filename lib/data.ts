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
]

