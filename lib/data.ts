export interface Lesson {
  id: string
  title: string
  description?: string
  folderUrl: string
}

export interface Subject {
  id: string
  name: string
  lessons: Lesson[]
}

export interface Semester {
  id: number
  name: string
  subjects: Subject[]
}

export const semesters: Semester[] = [
  {
    id: 1,
    name: "Semester 1",
    subjects: [
      {
        id: "algebra",
        name: "Algebra",
        lessons: [
          {
            id: "algebra_1",
            title: "Algebra - Lesson 1",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
          {
            id: "algebra_2",
            title: "Algebra - Lesson 2",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
          {
            id: "algebra_3",
            title: "Algebra - Lesson 3",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
        ],
      },
      {
        id: "real_analysis",
        name: "Real Analysis",
        lessons: [
          {
            id: "real_analysis_1",
            title: "Real Analysis - Lesson 1",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
          {
            id: "real_analysis_2",
            title: "Real Analysis - Lesson 2",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
          {
            id: "real_analysis_3",
            title: "Real Analysis - Lesson 3",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
        ],
      },
      {
        id: "general_topology",
        name: "General Topology",
        lessons: [
          {
            id: "3",
            title: "GENERAL TOPOLOGY",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
        ],
      },
      {
        id: "ordinary_differential_equations",
        name: "Ordinary Differential Equations",
        lessons: [
          {
            id: "4",
            title: "ORDINARY DIFFERENTIAL EQUATIONS",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
        ],
      },
      {
        id: "discrete_mathematics",
        name: "Discrete Mathematics",
        lessons: [
          {
            id: "5",
            title: "DISCRETE MATHEMATICS",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
        ],
      },
      {
        id: "operations_research",
        name: "Operations Research",
        lessons: [
          {
            id: "6",
            title: "OPERATIONS RESEARCH",
            folderUrl: "https://drive.google.com/drive/folders/1wf9jWcRRUxQncPqrcQL0EQRJt8O1elrQ",
          },
        ],
      },
      {
        id: "number_theory",
        name: "Number Theory",
        lessons: [
          {
            id: "7",
            title: "NUMBER THEORY",
            folderUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Semester 2",
    subjects: [
      {
        id: "complex_analysis",
        name: "Complex Analysis",
        lessons: [
          {
            id: "complex_analysis_1",
            title: "Complex Analysis - Lesson 1",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
          {
            id: "complex_analysis_2",
            title: "Complex Analysis - Lesson 2",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
          {
            id: "complex_analysis_3",
            title: "Complex Analysis - Lesson 3",
            folderUrl: "https://drive.google.com/file/d/1AqJeOIvM4zagJ19ETa-CS_R7UmgwO2nE/view?usp=sharing",
          },
        ],
      },
      {
        id: "partial_differential_equations",
        name: "Partial Differential Equations",
        lessons: [
          {
            id: "s2_2",
            title: "PARTIAL DIFFERENTIAL EQUATIONS",
            folderUrl: "",
          },
        ],
      },
      {
        id: "basics_of_c_programming_and_matlab",
        name: "Basics of C-Programming and MATLAB",
        lessons: [
          {
            id: "s2_3",
            title: "BASICS OF C-PROGRAMMING AND MATLAB",
            folderUrl: "",
          },
          {
            id: "s2_4",
            title: "BASICS OF C-PROGRAMMING AND MATLAB (PRACTICALS)",
            folderUrl: "",
          },
        ],
      },
      {
        id: "fuzzy_sets_and_systems",
        name: "Fuzzy Sets and Systems",
        lessons: [
          {
            id: "s2_5",
            title: "FUZZY SETS AND SYSTEMS",
            folderUrl: "",
          },
        ],
      },
      {
        id: "fourier_transforms_and_integral_equations",
        name: "Fourier Transforms and Integral Equations",
        lessons: [
          {
            id: "s2_6",
            title: "FOURIER TRANSFORMS AND INTEGRAL EQUATIONS",
            folderUrl: "",
          },
        ],
      },
      {
        id: "operations_research_i",
        name: "Operations Research – I",
        lessons: [
          {
            id: "s2_7",
            title: "OPERATIONS RESEARCH – I",
            folderUrl: "",
          },
        ],
      },
      {
        id: "operations_research_i_practicals",
        name: "Operations Research – I (PRACTICALS)",
        lessons: [
          {
            id: "s2_8",
            title: "OPERATIONS RESEARCH – I (PRACTICALS)",
            folderUrl: "",
          },
        ],
      },
    ],
  },
]

