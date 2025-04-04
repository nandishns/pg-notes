export interface Lesson {
  id: string
  title: string
  description?: string
  folderUrl: string
}

export interface PYQPaper {
  year: number
  paperUrl?: string
}

export interface Subject {
  id: string
  name: string
  lessons: Lesson[]
  pyqPapers?: PYQPaper[]
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
            title: "Unit 1",
            folderUrl: "https://drive.google.com/file/d/1I_AyJeQ9kBhQDSeiw2rAMFX73L00AMlW/view?usp=sharing",
          },
          {
            id: "algebra_2",
            title: "Unit 2",
            folderUrl: "https://drive.google.com/file/d/12TBVu5SrIi_cj-Wlafrqt-I_IstqRsha/view?usp=sharing",
          },
          {
            id: "algebra_3",
            title: "Unit 3",
            folderUrl: "https://drive.google.com/file/d/1zoImLWMsQWCuUYkRR6DpVNOLxClWa1aM/view?usp=sharing",
          },
          {
            id: "algebra_4",
            title: "Unit 4",
            folderUrl: "https://drive.google.com/file/d/1q3LJnDGzJDej7MZsD-yFUWwGvJlHhWZe/view?usp=sharing",
          },
        ],
        pyqPapers: [
          {
            year: 2024,
            paperUrl: "https://drive.google.com/file/d/1bylCyBu2pUOOmBGhSkIkKHZtkB2Bi0iW/view?usp=sharing",
          },
          {
            year: 2023,
            paperUrl : "https://drive.google.com/file/d/1qn1Dhnrl8iw_jTvZs7iPIRiDUMisS6dU/view?usp=sharing"
          }
          
        ],
      },
      {
        id: "real_analysis",
        name: "Real Analysis",
        lessons: [
          {
            id: "real_analysis_1",
            title: "Unit 1",
            folderUrl: "https://drive.google.com/file/d/1oQ4sNi1s9kro-2VYxxpYRefgkImIgjNZ/view?usp=sharing",
          },
          {
            id: "real_analysis_2",
            title: "Unit 2",
            folderUrl: "https://drive.google.com/file/d/1wve1aZwrXlUiDHbm3pp_sZQndizdLVH5/view?usp=sharing",
          },
          {
            id: "real_analysis_3",
            title: "Unit 3",
            folderUrl: "https://drive.google.com/file/d/1BGK1If93PyR-0jaZO5L75r7gSFSi_vHd/view?usp=sharing",
          },
          {
            id: "real_analysis_4",
            title: "Unit 4",
            folderUrl: "",
          },
        ],
        pyqPapers: [
          {
            year: 2024,
            paperUrl: "https://drive.google.com/file/d/1vgvo-5WOIp4z80rCYF3oAa_J3bL3dOeL/view?usp=sharing",
          },
          {
            year: 2023,
            paperUrl: "https://drive.google.com/file/d/1dvuKSKhUOJO8JaKS076XoHEBGjvAn9Xo/view?usp=sharing",
          },
        ],
      },
      {
        id: "general_topology",
        name: "General Topology",
        lessons: [
          {
            id: "general_topology_1",
            title: "Unit 1",
            folderUrl: "https://drive.google.com/file/d/1od4gG7-ORi-CwETLVEamLJlJNnmUgyPG/view?usp=sharing",
          },
          {
            id: "general_topology_2_3",
            title: "Unit 2 & 3",
            folderUrl: "https://drive.google.com/file/d/1d-c44zKbUo0lFOWyEAiC8z0Hglzi9uXq/view?usp=sharing",
          },
        
          {
            id: "general_topology_4",
            title: "Unit 4",
            folderUrl: "https://drive.google.com/file/d/15VaBS574JFnD23Vt0292-TQEbZ9pFc2q/view?usp=sharing",
          },
        ],
        pyqPapers: [
          {
            year: 2024,
            paperUrl: "https://drive.google.com/file/d/1wfLn8TCKiK5WgPysDw_hPMjPnx0d9CTK/view?usp=sharing",
          },
          {
            year: 2023,
            paperUrl: "https://drive.google.com/file/d/1u6yjzNiHROdfUU5JXiZSIYkgX5n3-2ZX/view?usp=sharing",
          },
        ],
      },
      {
        id: "ordinary_differential_equations",
        name: "Ordinary Differential Equations",
        lessons: [
          {
            id: "ordinary_differential_equations_1",
            title: "Unit 1",
            folderUrl: "https://drive.google.com/file/d/17JnUrdxp3QqMa-mEWspoeIC8z_42E6bd/view?usp=sharing",
          },
          {
            id: "ordinary_differential_equations_2",
            title: "Unit 2",
            folderUrl: "https://drive.google.com/file/d/1emYbRKZKBFv0TVNTmw2vfAM0gE1lZDrr/view?usp=sharing",
          },
          {
            id: "ordinary_differential_equations_3",
            title: "Unit 3",
            folderUrl: "https://drive.google.com/file/d/1BGK1If93PyR-0jaZO5L75r7gSFSi_vHd/view?usp=sharing",
          },
          
          {
            id: "ordinary_differential_equations_4",
            title: "Unit 4",
            folderUrl: "https://drive.google.com/file/d/1emYbRKZKBFv0TVNTmw2vfAM0gE1lZDrr/view?usp=sharing",
          },
          
        ],
        pyqPapers :[
          {
            year: 2024,
            paperUrl: "https://drive.google.com/file/d/1n3hQl1iDRBekLd6QZrL6h0B197RnDkkA/view?usp=sharing",
          },
          {
            year: 2023,
            paperUrl: "https://drive.google.com/file/d/1Zhk5HRgoXFf_dyNUZfTMVO50E6vv4Gy9/view?usp=sharing",
          },
        ]
      },
      {
        id: "discrete_mathematics",
        name: "Discrete Mathematics",
        lessons: [
          {
            id: "discrete_mathematics_1",
            title: "Unit 1",
            folderUrl: "https://drive.google.com/file/d/1s-ucxN3UtuKULAkM5mdF3tcca5EQaVso/view?usp=sharing",
          },
          {
            id: "discrete_mathematics_2",
            title: "Unit 2",
            folderUrl: "https://drive.google.com/file/d/1kjxlUmhXVnQVqhNHqy9b8HZodkmLixaO/view?usp=sharing",
          },
          {
            id: "discrete_mathematics_3",
            title: "Unit 3",
            folderUrl: "https://drive.google.com/file/d/1NF85ENSjCMMiqSa075hHn8BZliiLWbt4/view?usp=sharing",
          },
          
          
        ],
        pyqPapers :[
          {
            year: 2024,
            paperUrl: "https://drive.google.com/file/d/1a_YSM06_wAcZKF5pr57Cbm-r3XwjtjiM/view?usp=sharing",
          },
          {
            year: 2023,
            paperUrl: "https://drive.google.com/file/d/1M3Vmr0RBQr5iz5vpTplflaDWzVnb1xKU/view?usp=sharing",
          },
        ]
      },
      {
        id: "operations_research",
        name: "Operations Research",
        lessons: [
          {
            id: "operations_research_1",
            title: "Unit 1",
            folderUrl: "https://drive.google.com/file/d/1WukFwFGWiSn0TqI61dMuBv3ntqqnOhuV/view?usp=sharing",
          },
          {
            id: "operations_research_2",
            title: "Unit 2",
            folderUrl: "https://drive.google.com/file/d/160j8oOwRYrGs88m8lmyT-Be2V5r9mO3R/view?usp=sharing",
          },
          {
            id: "operations_research_3",
            title: "Unit 3",
            folderUrl: "https://drive.google.com/file/d/1vFCYC3Kiq8c7Way5vWOx4inFF-1Y73q1/view?usp=sharing",
          },
          {
            id: "operations_research_4",
            title: "Unit 4",
            folderUrl: "https://drive.google.com/file/d/1BoFojLXLf7nxrtRqMk8-z2WQin25XycU/view?usp=sharing",
          },


        ],
        pyqPapers :[
          {
            year: 2024,
            paperUrl: "https://drive.google.com/file/d/1T43uE2Dxjj9_b1kmz7Yi2ltOta-4md4A/view?usp=sharing",
          },
          {
            year: 2023,
            paperUrl: "https://drive.google.com/file/d/1fqLFzGgbnmhC0mdwOdU0FhnvTD43t4O1/view?usp=sharing",
          },
        ]
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

