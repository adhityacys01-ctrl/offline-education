// Auto-generated comprehensive multilingual course catalog with rich theory, formulas & solved sums

export interface QuestionSeed {
  order: number
  prompt: string
  correctIndex: number
  options: { label: string; text: string }[]
}

export interface QuizSeed {
  title: string
  version: number
  questions: QuestionSeed[]
}

export interface TranslationSeed {
  title: string
  contentHtml: string
  keyPoints?: string[]
}

export interface GlossarySeed {
  term: string
  enDef: string
  hiDef?: string
  mrDef?: string
  enEquiv?: string
  hiEquiv?: string
  mrEquiv?: string
}

export interface LessonSeed {
  order: number
  title: string
  contentHtml: string
  keyPoints: string[]
  translations?: {
    hi?: TranslationSeed
    mr?: TranslationSeed
  }
  glossary?: GlossarySeed[]
}

export interface CourseSeed {
  id: string
  title: string
  subject: string
  description: string
  offlinePackageSizeMb: number
  lessons: LessonSeed[]
  quizzes: QuizSeed[]
}

export const COURSE_CATALOG: CourseSeed[] = [
  {
    "id": "seed-course-biology",
    "title": "Biology Fundamentals",
    "subject": "Biology",
    "description": "Comprehensive study of cytology, membrane physiology, bioenergetics, photosynthesis, molecular genetics, human physiology, nervous coordination, and ecosystem dynamics.",
    "offlinePackageSizeMb": 15.2,
    "quizzes": [
      {
        "title": "Biology Quiz 1 – Cell Biology & Energy Foundations",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "Which organelle is responsible for generating cellular ATP through oxidative phosphorylation?",
            "options": [
              {
                "label": "A",
                "text": "Golgi apparatus"
              },
              {
                "label": "B",
                "text": "Mitochondria"
              },
              {
                "label": "C",
                "text": "Endoplasmic reticulum"
              },
              {
                "label": "D",
                "text": "Lysosome"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "What gas do green plants primarily absorb during the light-independent reactions (Calvin cycle)?",
            "options": [
              {
                "label": "A",
                "text": "Carbon dioxide (CO2)"
              },
              {
                "label": "B",
                "text": "Oxygen (O2)"
              },
              {
                "label": "C",
                "text": "Nitrogen (N2)"
              },
              {
                "label": "D",
                "text": "Hydrogen (H2)"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 3,
            "prompt": "Where in eukaryotic cells does glycolysis take place?",
            "options": [
              {
                "label": "A",
                "text": "Mitochondrial matrix"
              },
              {
                "label": "B",
                "text": "Chloroplast stroma"
              },
              {
                "label": "C",
                "text": "Cytoplasm / Cytosol"
              },
              {
                "label": "D",
                "text": "Nucleus"
              }
            ],
            "correctIndex": 2
          },
          {
            "order": 4,
            "prompt": "Which pigment is primarily responsible for absorbing light energy in plant chloroplasts?",
            "options": [
              {
                "label": "A",
                "text": "Chlorophyll"
              },
              {
                "label": "B",
                "text": "Carotene"
              },
              {
                "label": "C",
                "text": "Hemoglobin"
              },
              {
                "label": "D",
                "text": "Melanin"
              }
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "title": "Biology Quiz 2 – Molecular Genetics & Cell Division",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "In DNA, which nitrogenous base forms complementary hydrogen bonds with Adenine?",
            "options": [
              {
                "label": "A",
                "text": "Guanine"
              },
              {
                "label": "B",
                "text": "Cytosine"
              },
              {
                "label": "C",
                "text": "Thymine"
              },
              {
                "label": "D",
                "text": "Uracil"
              }
            ],
            "correctIndex": 2
          },
          {
            "order": 2,
            "prompt": "What is the direct product of DNA transcription inside the eukaryotic nucleus?",
            "options": [
              {
                "label": "A",
                "text": "Polypeptide chain"
              },
              {
                "label": "B",
                "text": "Messenger RNA (mRNA)"
              },
              {
                "label": "C",
                "text": "Phospholipid bilayer"
              },
              {
                "label": "D",
                "text": "Transfer RNA (tRNA)"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "How many haploid daughter cells are generated at the conclusion of meiosis?",
            "options": [
              {
                "label": "A",
                "text": "Two identical diploid cells"
              },
              {
                "label": "B",
                "text": "Four genetically diverse haploid cells"
              },
              {
                "label": "C",
                "text": "One somatic cell"
              },
              {
                "label": "D",
                "text": "Eight identical spores"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "During which phase of meiosis does genetic crossing over take place?",
            "options": [
              {
                "label": "A",
                "text": "Metaphase II"
              },
              {
                "label": "B",
                "text": "Anaphase I"
              },
              {
                "label": "C",
                "text": "Prophase I"
              },
              {
                "label": "D",
                "text": "Telophase II"
              }
            ],
            "correctIndex": 2
          }
        ]
      },
      {
        "title": "Biology Quiz 3 – Physiology, Transport & Ecology",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "Which heart chamber pumps oxygenated blood into the aorta for systemic distribution?",
            "options": [
              {
                "label": "A",
                "text": "Right atrium"
              },
              {
                "label": "B",
                "text": "Right ventricle"
              },
              {
                "label": "C",
                "text": "Left atrium"
              },
              {
                "label": "D",
                "text": "Left ventricle"
              }
            ],
            "correctIndex": 3
          },
          {
            "order": 2,
            "prompt": "Which plant vascular tissue is specialized for the bidirectional translocation of sugars?",
            "options": [
              {
                "label": "A",
                "text": "Xylem"
              },
              {
                "label": "B",
                "text": "Phloem"
              },
              {
                "label": "C",
                "text": "Epidermis"
              },
              {
                "label": "D",
                "text": "Cortex"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "Approximately what percentage of energy is transferred from one trophic level to the next?",
            "options": [
              {
                "label": "A",
                "text": "10%"
              },
              {
                "label": "B",
                "text": "50%"
              },
              {
                "label": "C",
                "text": "75%"
              },
              {
                "label": "D",
                "text": "90%"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 4,
            "prompt": "What structure on plant leaves regulates gas exchange and transpirational water loss?",
            "options": [
              {
                "label": "A",
                "text": "Lenticels"
              },
              {
                "label": "B",
                "text": "Stomata"
              },
              {
                "label": "C",
                "text": "Root hairs"
              },
              {
                "label": "D",
                "text": "Cambium"
              }
            ],
            "correctIndex": 1
          }
        ]
      }
    ],
    "lessons": [
      {
        "order": 1,
        "title": "Cell Structure: Prokaryotic & Eukaryotic Cells",
        "keyPoints": [
          "The cell is the structural, functional, and biological unit of all living organisms.",
          "Prokaryotes lack membrane-bound nuclei, while eukaryotes possess specialized organelles.",
          "Mitochondria act as the primary metabolic ATP power plants of the cell."
        ],
        "contentHtml": "\n<h3>1. Cellular Organization</h3>\n<p>All life on Earth is classified into prokaryotic and eukaryotic architectures. Eukaryotic cells compartmentalize metabolic pathways within specialized membrane-bound organelles.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Prokaryotes (Bacteria): Circular DNA, No Nuclear Membrane, 70S Ribosomes}</div>\n    <div class=\"formula-line\">\\text{Eukaryotes (Animals, Plants): Linear Chromosomes, Nucleus, 80S Ribosomes, Mitochondria}</div>\n</div>\n\n<h3>2. Organelle Functions</h3>\n<p>The <strong>Mitochondrion</strong> synthesizes cellular energy ($ATP$) via oxidative phosphorylation. <strong>Ribosomes</strong> translate mRNA codons into polypeptide chains.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Differentiate between plant and animal cell structures regarding cell wall, chloroplasts, and vacuoles.<br/>\n2. Describe the endosymbiotic theory for the origin of mitochondria.</p>",
        "translations": {
          "hi": {
            "title": "कोशिका संरचना: प्रोकैरियोटिक एवं यूकैरियोटिक कोशिकाएँ",
            "keyPoints": [
              "कोशिका जीवन की संरचनात्मक एवं कार्यात्मक इकाई है।",
              "प्रोकैरियोट्स में केंद्रक झिल्ली का अभाव होता है, जबकि यूकैरियोट्स में सुविकसित केंद्रक होता है।",
              "माइटोकॉन्ड्रिया कोशिका का ऊर्जा घर (Powerhouse) है।"
            ],
            "contentHtml": "\n<h3>1. कोशिकीय संगठन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Prokaryotes: अनावृत वृत्ताकार DNA, 70S Ribosomes}</div>\n    <div class=\"formula-line\">\\text{Eukaryotes: केंद्रक झिल्ली युक्त, 80S Ribosomes, Mitochondria}</div>\n</div>\n\n<h3>2. कोशिकांगों के कार्य</h3>\n<p><strong>Mitochondria</strong> ऑक्सीडेटिव फॉस्फारिलीकरण द्वारा <strong>ATP</strong> का निर्माण करते हैं। <strong>Ribosomes</strong> प्रोटीन संश्लेषण करते हैं।</p>"
          },
          "mr": {
            "title": "पेशी रचना: आदिकेंद्रकी आणि दृश्यकेंद्रकी पेशी",
            "keyPoints": [
              "पेशी ही सजीवांची मूलभूत रचनात्मक आणि कार्यात्मक संस्था आहे.",
              "तंतुकणिका (Mitochondria) पेशीचे ऊर्जा केंद्र आहे."
            ],
            "contentHtml": "\n<h3>1. पेशीचे प्रकार</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{आदिकेंद्रकी: स्पष्ट केंद्रक नसते, 70S Ribosomes}</div>\n    <div class=\"formula-line\">\\text{दृश्यकेंद्रकी: सुस्पष्ट केंद्रक, तंतुकणिका, 80S Ribosomes}</div>\n</div>\n\n<h3>2. पेशी अंगके</h3>\n<p><strong>Mitochondria</strong> पेशीत <strong>ATP</strong> ऊर्जानिर्मिती करतात.</p>"
          }
        },
        "glossary": [
          {
            "term": "Mitochondria",
            "enDef": "Membrane-bound cell organelles that generate most of the chemical energy needed to power the cell.",
            "hiEquiv": "माइटोकॉन्ड्रिया",
            "mrEquiv": "तंतुकणिका"
          }
        ]
      },
      {
        "order": 2,
        "title": "Cell Membrane Transport: Diffusion & Osmosis",
        "keyPoints": [
          "The fluid mosaic model depicts membranes as phospholipid bilayers with embedded proteins.",
          "Osmosis is the net movement of water across semipermeable membranes driven by water potential.",
          "Water potential equation: Ψ = Ψ_s + Ψ_p."
        ],
        "contentHtml": "\n<h3>1. Membrane Transport Dynamics</h3>\n<p>Water moves from high water potential (less negative) to low water potential (more negative):</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\Psi = \\Psi_s + \\Psi_p</div>\n    <div class=\"formula-line\">\\text{Pure water at standard conditions: } \\Psi = 0\\text{ MPa}</div>\n</div>\n\n<h3>2. Solved Problem: Water Potential Gradient</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Predicting Direction of Water Movement in Plant Cell</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Cell interior: Solute potential Ψ_s = -0.8 MPa, Pressure potential Ψ_p = +0.3 MPa \\n Surrounding solution: Ψ = -0.9 MPa</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Ψ_cell = Ψ_s + Ψ_p</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Ψ_cell = (-0.8) + (+0.3) = -0.5 MPa \\n Surrounding solution Ψ_sol = -0.9 MPa \\n Since -0.5 MPa > -0.9 MPa, water moves OUT of cell.</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Net water flow is outward from cell into solution (exosmosis).</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Explain what happens to red blood cells placed in hypotonic distilled water.<br/>\n2. Define active transport and explain how the $Na^+/K^+$ ATPase pump operates.</p>",
        "translations": {
          "hi": {
            "title": "कोशिका झिल्ली परिवहन: विसरण एवं परासरण",
            "keyPoints": [
              "तरल मोजेक मॉडल के अनुसार झिल्ली फॉस्फोलिपिड द्विपरत है।",
              "परासरण (Osmosis) अर्धपारगम्य झिल्ली के माध्यम से जल का प्रवाह है।",
              "जल विभव समीकरण: Ψ = Ψ_s + Ψ_p।"
            ],
            "contentHtml": "\n<h3>1. जल विभव का समीकरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\Psi = \\Psi_s + \\Psi_p</div>\n    <div class=\"formula-line\">\\text{शुद्ध जल: } \\Psi = 0\\text{ MPa}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">पादप कोशिका में जल प्रवाह की दिशा</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> कोशिका: Ψ_s = -0.8 MPa, Ψ_p = +0.3 MPa, बाह्य घोल: Ψ = -0.9 MPa</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>Ψ_cell = Ψ_s + Ψ_p</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Ψ_cell = -0.5 MPa \\n चूंकि -0.5 MPa > -0.9 MPa, जल कोशिका से बाहर जाएगा।</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> जल का कुल प्रवाह कोशिका से बाहर की ओर (बहिःपरासरण) होगा।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. अल्पपरासारी (hypotonic) घोल में लाल रक्त कणिकाओं पर क्या प्रभाव पड़ता है?</p>"
          },
          "mr": {
            "title": "पेशीपटल वहन: विसरण आणि परासरण",
            "keyPoints": [
              "परासरण म्हणजे अर्धपारपटल ओलांडून पाण्याचे होणारे वहन.",
              "पाण्याचे विभव सूत्र: Ψ = Ψ_s + Ψ_p."
            ],
            "contentHtml": "\n<h3>1. परासरण व जल विभव</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\Psi = \\Psi_s + \\Psi_p</div>\n    <div class=\"formula-line\">\\text{शुद्ध पाण्यासाठी: } \\Psi = 0\\text{ MPa}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">पाण्याच्या प्रवाहाची दिशा ओळखणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> पेशी: Ψ_s = -0.8, Ψ_p = +0.3, बाहेरील द्रावण: -0.9 MPa</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>Ψ_cell = Ψ_s + Ψ_p</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Ψ_cell = -0.5 MPa  ⇒  पाणी पेशीतून बाहेर पडेल</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> पाण्याचा प्रवाह पेशीच्या बाहेरच्या दिशेने होईल.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. मिठाच्या पाण्यात मनुका ठेवल्यास काय होते ते स्पष्ट करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Osmosis",
            "enDef": "Spontaneous net movement of solvent molecules through a selectively permeable membrane.",
            "hiEquiv": "परासरण",
            "mrEquiv": "परासरण"
          }
        ]
      },
      {
        "order": 3,
        "title": "Cellular Respiration & ATP Production",
        "keyPoints": [
          "Cellular respiration oxidizes glucose to yield carbon dioxide, water, and ATP energy.",
          "Three primary stages: Glycolysis (cytosol), Krebs Cycle (mitochondrial matrix), and ETC (inner membrane).",
          "Theoretical maximum aerobic ATP yield is 36 to 38 ATP per glucose molecule."
        ],
        "contentHtml": "\n<h3>1. Stoichiometry of Aerobic Respiration</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\text{ ATP}</div>\n    <div class=\"formula-line\">\\Delta G^\\circ = -2870\\text{ kJ/mol glucose}</div>\n</div>\n\n<h3>2. Stages of Energy Generation</h3>\n<p><strong>Glycolysis:</strong> $1\\text{ Glucose} \\rightarrow 2\\text{ Pyruvate} + 2\\text{ ATP} + 2\\text{ NADH}$.<br/>\n<strong>Krebs Cycle:</strong> Produces $6\\text{ NADH}, 2\\text{ FADH}_2, 2\\text{ ATP}$ per glucose.<br/>\n<strong>Oxidative Phosphorylation:</strong> Chemiosmosis across ATP synthase yields remaining ATP.</p>\n\n<h3>3. Solved Numerical Problem</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating ATP Production from 5 Moles of Glucose</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Amount of glucose = 5 moles, Average yield = 36 ATP / mole glucose</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Total ATP = Moles of Glucose × 36</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Total ATP = 5 × 36 = 180 moles of ATP \\n Molecules = 180 × (6.022 × 10²³) = 1.084 × 10²⁶ ATP molecules</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> 180 moles of ATP (1.084 × 10²⁶ molecules) generated.</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. Compare aerobic respiration with anaerobic lactic acid fermentation in human muscle cells.<br/>\n2. Explain the role of molecular oxygen ($O_2$) as the terminal electron acceptor in the electron transport chain.</p>",
        "translations": {
          "hi": {
            "title": "कोशिकीय श्वसन एवं ATP उत्पादन",
            "keyPoints": [
              "श्वसन में ग्लूकोज का ऑक्सीकरण होकर CO₂, H₂O तथा ATP ऊर्जा प्राप्त होती है।",
              "तीन मुख्य चरण: ग्लाइकोलिसिस, क्रेब्स चक्र एवं इलेक्ट्रॉन परिवहन श्रृंखला।",
              "एक ग्लूकोज अणु से 36 से 38 ATP उत्पन्न होते हैं।"
            ],
            "contentHtml": "\n<h3>1. श्वसन का रासायनिक समीकरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\text{ ATP}</div>\n    <div class=\"formula-line\">\\Delta G^\\circ = -2870\\text{ kJ/mol}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">5 मोल ग्लूकोज से ATP उत्पादन</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> ग्लूकोज = 5 mol, दर = 36 ATP / mol</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>Total ATP = Moles × 36</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">5 × 36 = 180 mol ATP</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 180 मोल ATP प्राप्त होगा।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. अवायवीय श्वसन एवं वायवीय श्वसन में अंतर स्पष्ट कीजिए।</p>"
          },
          "mr": {
            "title": "पेशीय श्वसन आणि ATP निर्मिती",
            "keyPoints": [
              "श्वसन प्रक्रियेत ग्लुकोजचे ऑक्सिडीकरण होऊन ATP ऊर्जा मिळते.",
              "एका ग्लुकोज रेणूपासून 36 ते 38 ATP तयार होतात."
            ],
            "contentHtml": "\n<h3>1. श्वसनाचे समीकरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\text{ ATP}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">5 मोल ग्लुकोजपासून मिळणारी ऊर्जा</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> 5 मोल ग्लुकोज, 36 ATP/मोल</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>Total ATP = 5 × 36</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">5 × 36 = 180 mol ATP</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 180 मोल ATP तयार होते.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. तंतुकणिकेत क्रेब्स चक्र कसे घडते ते थोडक्यात सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "ATP",
            "enDef": "Adenosine triphosphate, primary organic energy carrier molecule of life.",
            "hiEquiv": "एटीपी",
            "mrEquiv": "एटीपी"
          }
        ]
      },
      {
        "order": 4,
        "title": "Photosynthesis: Light & Dark Reactions",
        "keyPoints": [
          "Photosynthesis captures solar photons to convert carbon dioxide and water into glucose and oxygen.",
          "Light-dependent reactions occur in thylakoid membranes generating ATP and NADPH.",
          "Calvin cycle (Dark reaction) in stroma fixes atmospheric CO₂ via enzyme RuBisCO."
        ],
        "contentHtml": "\n<h3>1. Overall Photosynthetic Equation</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">6CO_2 + 6H_2O + \\text{light photons} \\rightarrow C_6H_{12}O_6 + 6O_2</div>\n    <div class=\"formula-line\">\\text{Light Reaction: } 2H_2O + 2NADP^+ + 3ADP + 3P_i \\rightarrow O_2 + 2NADPH + 3ATP</div>\n</div>\n\n<h3>2. The Calvin Cycle (C3 Pathway)</h3>\n<p>RuBisCO catalyzes the fixation of $CO_2$ with Ribulose 1,5-bisphosphate ($RuBP$). For every 6 turns of the cycle, one net glucose ($C_6H_{12}O_6$) molecule is synthesized using $18\\text{ ATP}$ and $12\\text{ NADPH}$.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Why is RuBisCO considered the most abundant enzyme on Earth?<br/>\n2. Differentiate between C3, C4, and CAM photosynthetic pathways in plants.</p>",
        "translations": {
          "hi": {
            "title": "प्रकाश संश्लेषण: प्रकाशिक एवं अप्रकाशिक अभिक्रियाएँ",
            "keyPoints": [
              "प्रकाश संश्लेषण सूर्य के प्रकाश की उपस्थिति में CO₂ और जल से ग्लूकोज बनाता है।",
              "प्रकाशिक अभिक्रियाएं थायलाकोइड में होती हैं और ATP तथा NADPH बनाती हैं।",
              "केल्विन चक्र स्ट्रोमा में RuBisCO एंजाइम द्वारा CO₂ का स्थिरीकरण करता है।"
            ],
            "contentHtml": "\n<h3>1. प्रकाश संश्लेषण का समीकरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">6CO_2 + 6H_2O + \\text{light photons} \\rightarrow C_6H_{12}O_6 + 6O_2</div>\n    <div class=\"formula-line\">\\text{उत्पाद: } C_6H_{12}O_6 + 6O_2</div>\n</div>\n\n<h3>2. केल्विन चक्र</h3>\n<p>RuBisCO एंजाइम CO₂ का RuBP के साथ संयोजन कराता है।</p>"
          },
          "mr": {
            "title": "प्रकाशसंश्लेषण: प्रकाश व अप्रकाश अभिक्रिया",
            "keyPoints": [
              "सूर्यप्रकाश वापरून वनस्पती CO₂ व पाण्यातून ग्लुकोज आणि ऑक्सिजन तयार करतात.",
              "केल्विन चक्रात RuBisCO विकर CO₂ चे स्थिरीकरण करतो."
            ],
            "contentHtml": "\n<h3>1. प्रकाशसंश्लेषणाचे समीकरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">6CO_2 + 6H_2O + \\text{light} \\rightarrow C_6H_{12}O_6 + 6O_2</div>\n</div>\n\n<h3>2. अप्रकाश अभिक्रिया</h3>\n<p>स्ट्रोमामध्ये केल्विन चक्र घडते.</p>"
          }
        },
        "glossary": [
          {
            "term": "Photosynthesis",
            "enDef": "Process by which green plants synthesize nutrients from carbon dioxide and water using sunlight.",
            "hiEquiv": "प्रकाश संश्लेषण",
            "mrEquiv": "प्रकाशसंश्लेषण"
          }
        ]
      },
      {
        "order": 5,
        "title": "DNA Structure, Replication & Protein Synthesis",
        "keyPoints": [
          "DNA is a double-stranded antiparallel helical polymer of nucleotides (A, T, G, C).",
          "Chargaff’s rules mandate base pairing: A pairs with T (2 H-bonds) and G pairs with C (3 H-bonds).",
          "Central Dogma of Molecular Biology: DNA → (Transcription) → mRNA → (Translation) → Protein."
        ],
        "contentHtml": "\n<h3>1. The Molecular Double Helix</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">A = T \\quad (2\\text{ hydrogen bonds})</div>\n    <div class=\"formula-line\">G \\equiv C \\quad (3\\text{ hydrogen bonds})</div>\n    <div class=\"formula-line\">\\text{Central Dogma: } \\text{DNA} \\xrightarrow{\\text{transcription}} \\text{mRNA} \\xrightarrow{\\text{translation}} \\text{Polypeptide Protein}</div>\n</div>\n\n<h3>2. Solved Problem: Base Composition Analysis</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Applying Chargaff’s Rule to Genomic DNA</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Double-stranded DNA sample has 28% Adenine (A = 28%)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>%A = %T and %G = %C, with %A + %T + %G + %C = 100%</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">%T = 28% \\n %A + %T = 28 + 28 = 56% \\n %G + %C = 100 - 56 = 44% \\n %G = 44 / 2 = 22%  and  %C = 22%</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Thymine = 28%, Guanine = 22%, Cytosine = 22%.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Transcribe the DNA coding strand sequence $5'-ATG \\, GCA \\, TGC \\, TAA-3'$ into mRNA.<br/>\n2. Describe the functional difference between DNA Polymerase III and RNA Primase.</p>",
        "translations": {
          "hi": {
            "title": "DNA संरचना, प्रतिकृतियन एवं प्रोटीन संश्लेषण",
            "keyPoints": [
              "DNA द्विकुंडलित न्यूक्लियोटाइड बहुलक है (A, T, G, C)।",
              "चारगाफ का नियम: A = T तथा G ≡ C।",
              "सेंट्रल डोग्मा: DNA → mRNA → प्रोटीन।"
            ],
            "contentHtml": "\n<h3>1. DNA संरचना एवं चारगाफ नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">A = T \\quad (2\\text{ हाइड्रोजन बंध})</div>\n    <div class=\"formula-line\">G \\equiv C \\quad (3\\text{ हाइड्रोजन बंध})</div>\n    <div class=\"formula-line\">\\text{DNA} \\rightarrow \\text{mRNA} \\rightarrow \\text{Protein}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">चारगाफ के नियम द्वारा क्षार प्रतिशत ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> DNA में Adenine = 28%</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>%A = %T और %G = %C</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">%T = 28%  ⇒  %G + %C = 44%  ⇒  %G = 22%, %C = 22%</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> T = 28%, G = 22%, C = 22% होगा।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. अनुलेखन (Transcription) एवं अनुवाद (Translation) में अंतर स्पष्ट कीजिए।</p>"
          },
          "mr": {
            "title": "DNA रचना, प्रतिकृती आणि प्रथिन निर्मिती",
            "keyPoints": [
              "DNA दुहेरी सर्पिलाकार रेणू आहे.",
              "चारगाफचा नियम: A = T आणि G = C.",
              "Central Dogma: DNA → mRNA → प्रथिन."
            ],
            "contentHtml": "\n<h3>1. DNA चे दुहेरी मॉडेल</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">A = T, \\quad G \\equiv C</div>\n    <div class=\"formula-line\">\\text{DNA} \\rightarrow \\text{mRNA} \\rightarrow \\text{Protein}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">नायट्रोजनयुक्त क्षारांचे प्रमाण काढणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> Adenine (A) = 28%</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>%A = %T आणि %G = %C</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">T = 28%, G = 22%, C = 22%</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> T = 28%, G = 22%, C = 22%.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. DNA आणि RNA मधील मुख्य फरक कोणते ते लिहा.</p>"
          }
        },
        "glossary": [
          {
            "term": "DNA",
            "enDef": "Deoxyribonucleic acid, molecule carrying genetic instructions for development and functioning.",
            "hiEquiv": "डीएनए",
            "mrEquiv": "डीएनए"
          }
        ]
      },
      {
        "order": 6,
        "title": "Mendelian Genetics & Punnett Squares",
        "keyPoints": [
          "Gregor Mendel formulated laws of segregation and independent assortment through pea plant hybridization.",
          "Monohybrid heterozygous crosses yield a 3:1 phenotypic and 1:2:1 genotypic ratio.",
          "Dihybrid crosses of independent unlinked genes yield a characteristic 9:3:3:1 phenotypic ratio."
        ],
        "contentHtml": "\n<h3>1. Mendelian Ratios</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Monohybrid Cross } (Tt \\times Tt): \\text{Genotype: } 1TT : 2Tt : 1tt \\quad \\text{Phenotype: } 3\\text{ Tall} : 1\\text{ Dwarf}</div>\n    <div class=\"formula-line\">\\text{Dihybrid Cross } (RrYy \\times RrYy): 9\\text{ Round Yellow} : 3\\text{ Round Green} : 3\\text{ Wrinkled Yellow} : 1\\text{ Wrinkled Green}</div>\n</div>\n\n<h3>2. Solved Problem: Punnett Square Offspring</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Probability of Heterozygous Offspring in Monohybrid Cross</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Cross between two heterozygous tall pea plants (Tt × Tt)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Punnett Square: Gametes T, t × T, t  ⇒  TT, Tt, Tt, tt</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Total outcomes = 4. Heterozygous outcomes (Tt) = 2 \\n P(Heterozygous Tt) = 2 / 4 = 1/2 = 50%</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> 50% of the progeny will be heterozygous (Tt).</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. In humans, brown eyes (B) are dominant over blue eyes (b). Cross a heterozygous brown-eyed parent with a blue-eyed parent.<br/>\n2. State Mendel’s Law of Independent Assortment.</p>",
        "translations": {
          "hi": {
            "title": "मेंडेलियन आनुवंशिकी एवं पुनेट वर्ग (Punnett Squares)",
            "keyPoints": [
              "मेंडल ने मटर के पौधों पर प्रयोग कर आनुवंशिकता के नियम दिए।",
              "एकसंकर संकरण में लक्षणप्ररूपी अनुपात 3:1 और जीनप्ररूपी अनुपात 1:2:1 होता है।",
              "द्विसंकर संकरण में लक्षणप्ररूपी अनुपात 9:3:3:1 होता है।"
            ],
            "contentHtml": "\n<h3>1. मेंडल के संकरण अनुपात</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{एकसंकर अनुपात: } 3\\text{ लंबा} : 1\\text{ बौना} \\quad (1TT : 2Tt : 1tt)</div>\n    <div class=\"formula-line\">\\text{द्विसंकर अनुपात: } 9 : 3 : 3 : 1</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">एकसंकर संकरण में विषमयुग्मजी संतति की संभावना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> Tt × Tt संकरण</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>पुनेट वर्ग</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">कुल संतति = 4, विषमयुग्मजी (Tt) = 2  ⇒  2/4 = 50%</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 50% संतति विषमयुग्मजी (Tt) होगी।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. मेंडल का पृथक्करण का नियम क्या है?</p>"
          },
          "mr": {
            "title": "मेंडेलची अनुवंशिकता आणि पुनेट चौरस",
            "keyPoints": [
              "मेंडेलचे अनुवंशिकतेचे नियम वाटाण्याच्या झाडांवरील प्रयोगांवर आधारित आहेत.",
              "एकसंकर संकरणात 3:1 प्रमाण मिळते.",
              "द्विसंकर संकरणात 9:3:3:1 प्रमाण मिळते."
            ],
            "contentHtml": "\n<h3>1. मेंडेलचे प्रमाण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{एकसंकर: } 3 : 1</div>\n    <div class=\"formula-line\">\\text{द्विसंकर: } 9 : 3 : 3 : 1</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Tt × Tt संकरणात विषमयुग्मजी प्रमाण</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> Tt × Tt</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>पुनेट चौरस</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">2/4 = 50%</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 50% रोपे विषमयुग्मजी (Tt) असतील.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. प्रभावी आणि अप्रभावी गुणधर्म स्पष्ट करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Allele",
            "enDef": "Alternative forms of a gene occupying the same locus on a chromosome.",
            "hiEquiv": "युग्मविकल्पी (Allele)",
            "mrEquiv": "युग्मविकल्पी"
          }
        ]
      },
      {
        "order": 7,
        "title": "Human Circulatory System & Cardiac Output",
        "keyPoints": [
          "The human cardiovascular system features a four-chambered myogenic double-pump heart.",
          "Cardiac Output equation: CO = HR × SV (Stroke Volume).",
          "Systemic blood pressure averages 120/80 mmHg in healthy resting adults."
        ],
        "contentHtml": "\n<h3>1. Cardiovascular Mechanics</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">CO = HR \\times SV</div>\n    <div class=\"formula-line\">\\text{Stroke Volume } SV = EDV - ESV \\approx 70\\text{ mL/beat}</div>\n    <div class=\"formula-line\">\\text{Cardiac Output } CO = 72\\text{ beats/min} \\times 0.070\\text{ L/beat} \\approx 5.04\\text{ L/min}</div>\n</div>\n\n<h3>2. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating Cardiac Output During Aerobic Exercise</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Heart rate HR = 140 beats/min, Stroke volume SV = 110 mL/beat</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>CO = HR × SV</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">CO = 140 beats/min × 0.110 L/beat = 15.4 L/min</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Exercise cardiac output is 15.4 Liters per minute.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Trace the path of a deoxygenated erythrocyte from the superior vena cava to systemic circulation in the aorta.<br/>\n2. What causes the characteristic 'lub' and 'dub' heart sounds detected by stethoscopes?</p>",
        "translations": {
          "hi": {
            "title": "मानव परिसंचरण तंत्र एवं कार्डियक आउटपुट",
            "keyPoints": [
              "मानव हृदय चार कक्षों वाला दोहरा परिसंचरण अंग है।",
              "कार्डियक आउटपुट सूत्र: CO = HR × SV (स्ट्रोक आयतन)।",
              "सामान्य विश्राम रक्तचाप 120/80 mmHg होता है।"
            ],
            "contentHtml": "\n<h3>1. हृदय कार्यप्रणाली सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">CO = HR \\times SV</div>\n    <div class=\"formula-line\">CO = 72\\text{ beats/min} \\times 0.070\\text{ L} \\approx 5.04\\text{ L/min}</div>\n</div>\n\n<h3>2. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">व्यायाम के दौरान कार्डियक आउटपुट</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> HR = 140 beats/min, SV = 110 mL/beat = 0.110 L</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>CO = HR × SV</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">CO = 140 × 0.110 = 15.4 L/min</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> कार्डियक आउटपुट 15.4 L/min है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. दोहरा परिसंचरण क्या है और यह मानव के लिए क्यों महत्वपूर्ण है?</p>"
          },
          "mr": {
            "title": "मानवी रक्ताभिसरण संस्था आणि कार्डियाक आउटपुट",
            "keyPoints": [
              "मानवी हृदय चार कप्प्यांचे बनलेले असून दुहेरी रक्ताभिसरण घडवून आणते.",
              "कार्डियाक आउटपुट: CO = HR × SV."
            ],
            "contentHtml": "\n<h3>1. रक्ताभिसरणाचे सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">CO = HR \\times SV</div>\n    <div class=\"formula-line\">CO = 72 \\times 0.070 \\approx 5.04\\text{ L/min}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">व्यायामादरम्यान रक्ताभिसरण दर</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> HR = 140, SV = 0.110 L</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>CO = HR × SV</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">CO = 140 × 0.110 = 15.4 L/min</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> कार्डियाक आउटपुट 15.4 L/min आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. धमन्या आणि शिरा यांमधील फरक सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Cardiac Output",
            "enDef": "Volume of blood pumped by each ventricle per minute.",
            "hiEquiv": "कार्डियक आउटपुट",
            "mrEquiv": "कार्डियाक आउटपुट"
          }
        ]
      },
      {
        "order": 8,
        "title": "Nervous System, Action Potentials & Synapses",
        "keyPoints": [
          "Neurons propagate electro-chemical signals termed action potentials along axons.",
          "Resting membrane potential is approximately -70 mV maintained by Na⁺/K⁺ ATPase pumps.",
          "Action potentials exhibit an 'all-or-none' threshold triggering rapid depolarization (+30 mV)."
        ],
        "contentHtml": "\n<h3>1. Biophysics of Neuronal Action Potentials</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Resting Potential: } -70\\text{ mV}</div>\n    <div class=\"formula-line\">\\text{Depolarization Threshold: } -55\\text{ mV } (Na^+ \\text{ influx})</div>\n    <div class=\"formula-line\">\\text{Action Potential Peak: } +30\\text{ mV}</div>\n    <div class=\"formula-line\">\\text{Repolarization: } K^+ \\text{ efflux restoring negative polarity}</div>\n</div>\n\n<h3>2. Synaptic Transmission</h3>\n<p>Voltage-gated calcium channels open at axon terminals, triggering exocytosis of neurotransmitters (e.g., Acetylcholine) across the $20\\text{ nm}$ synaptic cleft.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Explain the physiological consequence of myelin sheaths and saltatory conduction.<br/>\n2. How does the refractory period ensure unidirectional impulse propagation?</p>",
        "translations": {
          "hi": {
            "title": "तंत्रिका तंत्र, क्रिया विभव एवं सिनेप्स",
            "keyPoints": [
              "तंत्रिका कोशिकाएं (न्यूरॉन्स) विद्युत-रासायनिक संकेतों का संचरण करती हैं।",
              "विश्राम विभव -70 mV होता है।",
              "Na⁺ आयनों के अंदर आने से विध्रुवण होकर क्रिया विभव उत्पन्न होता है।"
            ],
            "contentHtml": "\n<h3>1. क्रिया विभव के चरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{विश्राम विभव: } -70\\text{ mV}</div>\n    <div class=\"formula-line\">\\text{देहली विभव: } -55\\text{ mV } (Na^+ \\text{ का प्रवेश})</div>\n    <div class=\"formula-line\">\\text{शिखर विभव: } +30\\text{ mV}</div>\n</div>\n\n<h3>2. सिनेप्स संचरण</h3>\n<p>न्यूरोट्रांसमीटर (जैसे Acetylcholine) सिनेप्टिक विदर को पार कर संदेश पहुंचाते हैं।</p>"
          },
          "mr": {
            "title": "चेतासंस्था, क्रिया विभव आणि चेतासंधि",
            "keyPoints": [
              "चेतासंस्था विद्युत-रासायनिक लहरींद्वारे संदेशवहन करते.",
              "विश्राम विभव -70 mV असते."
            ],
            "contentHtml": "\n<h3>1. क्रिया विभव</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{विश्राम स्थिती: } -70\\text{ mV}</div>\n    <div class=\"formula-line\">\\text{शिखर विभव: } +30\\text{ mV}</div>\n</div>\n\n<h3>2. चेतासंधि</h3>\n<p>चेताअभिसरण रसायनांद्वारे घडते.</p>"
          }
        },
        "glossary": [
          {
            "term": "Neuron",
            "enDef": "Electrically excitable cell communicating via specialized synaptic connections.",
            "hiEquiv": "न्यूरॉन",
            "mrEquiv": "चेताकोशिका"
          }
        ]
      },
      {
        "order": 9,
        "title": "Endocrine Regulation & Hormonal Feedback Loops",
        "keyPoints": [
          "The endocrine system releases chemical messengers (hormones) directly into the blood circulation.",
          "Negative feedback loops maintain biological homeostasis.",
          "Blood glucose is regulated by pancreatic antagonistic hormones: Insulin and Glucagon."
        ],
        "contentHtml": "\n<h3>1. Hormonal Homeostasis Principles</h3>\n<p>When blood glucose deviates from normal fasting setpoint ($70 - 100\\text{ mg/dL}$):</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Elevated Glucose } (> 100\\text{ mg/dL}) \\rightarrow \\beta\\text{-cells release Insulin } \\rightarrow \\text{Liver stores Glycogen}</div>\n    <div class=\"formula-line\">\\text{Low Glucose } (< 70\\text{ mg/dL}) \\rightarrow \\alpha\\text{-cells release Glucagon } \\rightarrow \\text{Liver breaks down Glycogen}</div>\n</div>\n\n<h3>2. Practice Exercises</h3>\n<p>1. Compare steroid hormones and peptide hormones regarding receptor location and mechanism of action.<br/>\n2. Explain the hormonal cascade involving TRH, TSH, and Thyroxine in thyroid regulation.</p>",
        "translations": {
          "hi": {
            "title": "अंतःस्रावी नियमन एवं हार्मोनल फीडबैक लूप",
            "keyPoints": [
              "अंतःस्रावी ग्रंथियां रक्त में सीधे हार्मोन स्रावित करती हैं।",
              "नकारात्मक फीडबैक लूप शरीर में समस्थापन (Homeostasis) बनाए रखता है।",
              "इंसुलिन और ग्लूकागॉन रक्त शर्करा का संतुलन बनाते हैं।"
            ],
            "contentHtml": "\n<h3>1. रक्त शर्करा नियमन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{शर्करा वृद्धि: } \\text{इंसुलिन स्रावित } \\rightarrow \\text{ग्लाइकोजन संग्रह}</div>\n    <div class=\"formula-line\">\\text{शर्करा कमी: } \\text{ग्लूकागॉन स्रावित } \\rightarrow \\text{ग्लूकोज विमुक्ति}</div>\n</div>\n\n<h3>2. अभ्यास प्रश्न</h3>\n<p>1. नकारात्मक फीडबैक लूप शरीर के संतुलन में कैसे सहायता करता है?</p>"
          },
          "mr": {
            "title": "अंतःस्रावी संस्था आणि संप्रेरक नियंत्रण",
            "keyPoints": [
              "संप्रेरके (Hormones) थेट रक्तात मिसळतात.",
              "इन्सुलिन आणि ग्लुकागॉन रक्तातील साखरेचे प्रमाण नियंत्रित ठेवतात."
            ],
            "contentHtml": "\n<h3>1. साखर नियंत्रण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{इन्सुलिन: साखरेचे प्रमाण कमी करते}</div>\n    <div class=\"formula-line\">\\text{ग्लुकागॉन: साखरेचे प्रमाण वाढवते}</div>\n</div>\n\n<h3>2. सराव प्रश्न</h3>\n<p>1. थायरॉईड ग्रंथीचे कार्य स्पष्ट करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Homeostasis",
            "enDef": "State of steady internal physical and chemical conditions maintained by living systems.",
            "hiEquiv": "समस्थापन",
            "mrEquiv": "समस्थापन"
          }
        ]
      },
      {
        "order": 10,
        "title": "Ecology, Trophic Levels & Energy Transfer",
        "keyPoints": [
          "Ecosystems organize into trophic levels: primary producers, primary consumers, and apex predators.",
          "Lindeman’s 10% Rule: Only approximately 10% of energy transfers from one trophic level to the next.",
          "Ecological pyramids of energy are always upright due to thermodynamic entropy."
        ],
        "contentHtml": "\n<h3>1. Lindeman’s Ten Percent Ecological Law</h3>\n<p>Energy declines geometrically as it ascends trophic tiers due to metabolic respiration and heat loss:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">E_{n+1} = E_n \\times 0.10</div>\n    <div class=\"formula-line\">10,000\\text{ J (Plants)} \\rightarrow 1,000\\text{ J (Herbivores)} \\rightarrow 100\\text{ J (Carnivores)} \\rightarrow 10\\text{ J (Apex Predator)}</div>\n</div>\n\n<h3>2. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating Energy Available to Tertiary Consumers</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Primary producers capture 50,000 kJ of solar energy. Trophic efficiency = 10%</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>E_tertiary = E_producer × (0.10)³</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Herbivores: 50,000 × 0.10 = 5,000 kJ \\n Secondary Consumers: 5,000 × 0.10 = 500 kJ \\n Tertiary Consumers: 500 × 0.10 = 50 kJ</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Energy reaching tertiary consumers is 50 kJ.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Why can an ecological pyramid of numbers be inverted in a forest ecosystem, whereas an energy pyramid cannot?<br/>\n2. Describe biomagnification of persistent pollutants such as DDT across trophic levels.</p>",
        "translations": {
          "hi": {
            "title": "पारिस्थितिकी, पोषण स्तर एवं ऊर्जा स्थानांतरण",
            "keyPoints": [
              "पारिस्थितिक तंत्र में पोषण स्तर: उत्पादक, प्राथमिक उपभोक्ता, द्वितीयक उपभोक्ता एवं शीर्ष उपभोक्ता।",
              "लिंडमैन का 10% का नियम: एक स्तर से दूसरे स्तर तक केवल 10% ऊर्जा का स्थानांतरण होता है।",
              "ऊर्जा का पिरामिड सदैव सीधा होता है।"
            ],
            "contentHtml": "\n<h3>1. लिंडमैन का 10% नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">E_{n+1} = E_n \\times 0.10</div>\n    <div class=\"formula-line\">10,000\\text{ J (पादप)} \\rightarrow 1,000\\text{ J} \\rightarrow 100\\text{ J} \\rightarrow 10\\text{ J (शीर्ष मांसाहारी)}</div>\n</div>\n\n<h3>2. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">तृतीयक उपभोक्ता को प्राप्त ऊर्जा</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> प्राथमिक उत्पादक = 50000 kJ, 10% स्थानांतरण</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>E = 50000 × 0.10 × 0.10 × 0.10</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">50000 → 5000 → 500 → 50 kJ</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> तृतीयक उपभोक्ता को 50 kJ ऊर्जा प्राप्त होगी।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. ऊर्जा का पिरामिड कभी उलटा क्यों नहीं हो सकता?</p>"
          },
          "mr": {
            "title": "पर्यावरणशास्त्र, पोषण पातळ्या आणि ऊर्जा संक्रमण",
            "keyPoints": [
              "परिसंस्थेतील पोषण पातळ्यांमध्ये उत्पादक, भक्षक आणि सर्वोच्च भक्षक येतात.",
              "लिंडमनचा 10% नियम: एका पोषण पातळीतून दुसऱ्या पातळीत फक्त 10% ऊर्जा जाते."
            ],
            "contentHtml": "\n<h3>1. ऊर्जेचा 10% नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">E_{n+1} = E_n \\times 0.10</div>\n    <div class=\"formula-line\">10000\\text{ J} \\rightarrow 1000\\text{ J} \\rightarrow 100\\text{ J} \\rightarrow 10\\text{ J}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">सर्वोच्च भक्षकाला मिळणारी ऊर्जा</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> उत्पादक = 50000 kJ</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>10% प्रमाणे संक्रमण</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">50000 → 5000 → 500 → 50 kJ</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> शेवटच्या पातळीस 50 kJ ऊर्जा मिळेल.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. अन्नसाखळी आणि अन्नजाळे यांमधील फरक स्पष्ट करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Trophic Level",
            "enDef": "Hierarchical levels in an ecosystem comprising organisms sharing the same function in the food chain.",
            "hiEquiv": "पोषण स्तर",
            "mrEquiv": "पोषण पातळी"
          }
        ]
      }
    ]
  },
  {
    "id": "seed-course-mathematics",
    "title": "Mathematics Algebra",
    "subject": "Mathematics",
    "description": "Core secondary and higher-secondary mathematics covering algebra, quadratic equations, progressions, coordinate geometry, trigonometry, statistics, probability, and introductory calculus.",
    "offlinePackageSizeMb": 12.4,
    "quizzes": [
      {
        "title": "Mathematics Quiz 1 – Linear Equations & Systems",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "Solve for x in the equation: 4x - 9 = 15",
            "options": [
              {
                "label": "A",
                "text": "x = 4"
              },
              {
                "label": "B",
                "text": "x = 6"
              },
              {
                "label": "C",
                "text": "x = 8"
              },
              {
                "label": "D",
                "text": "x = 3"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "What happens to the inequality sign when both sides of -3x > 12 are divided by -3?",
            "options": [
              {
                "label": "A",
                "text": "The sign remains >"
              },
              {
                "label": "B",
                "text": "The sign reverses to <"
              },
              {
                "label": "C",
                "text": "The sign turns into an equal sign"
              },
              {
                "label": "D",
                "text": "The inequality becomes undefined"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "Find the solution to the system: x + y = 10 and x - y = 4",
            "options": [
              {
                "label": "A",
                "text": "x = 7, y = 3"
              },
              {
                "label": "B",
                "text": "x = 6, y = 4"
              },
              {
                "label": "C",
                "text": "x = 8, y = 2"
              },
              {
                "label": "D",
                "text": "x = 5, y = 5"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 4,
            "prompt": "What is the slope of the linear equation 2y = 6x + 8?",
            "options": [
              {
                "label": "A",
                "text": "6"
              },
              {
                "label": "B",
                "text": "4"
              },
              {
                "label": "C",
                "text": "3"
              },
              {
                "label": "D",
                "text": "8"
              }
            ],
            "correctIndex": 2
          }
        ]
      },
      {
        "title": "Mathematics Quiz 2 – Polynomials & Quadratics",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "What is the factored form of the difference of squares: x² - 49?",
            "options": [
              {
                "label": "A",
                "text": "(x - 7)(x - 7)"
              },
              {
                "label": "B",
                "text": "(x + 7)(x + 7)"
              },
              {
                "label": "C",
                "text": "(x - 7)(x + 7)"
              },
              {
                "label": "D",
                "text": "x(x - 49)"
              }
            ],
            "correctIndex": 2
          },
          {
            "order": 2,
            "prompt": "What are the solutions to the quadratic equation x² - 5x + 6 = 0?",
            "options": [
              {
                "label": "A",
                "text": "x = 2 and x = 3"
              },
              {
                "label": "B",
                "text": "x = -2 and x = -3"
              },
              {
                "label": "C",
                "text": "x = 1 and x = 6"
              },
              {
                "label": "D",
                "text": "x = -1 and x = 5"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 3,
            "prompt": "What does a discriminant Δ = b² - 4ac of zero indicate about a quadratic equation?",
            "options": [
              {
                "label": "A",
                "text": "Two distinct real roots"
              },
              {
                "label": "B",
                "text": "Exactly one real repeated root"
              },
              {
                "label": "C",
                "text": "Two complex imaginary roots"
              },
              {
                "label": "D",
                "text": "No solutions exist"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "Expand the binomial product: (2x + 3)(x - 4)",
            "options": [
              {
                "label": "A",
                "text": "2x² - 8x - 12"
              },
              {
                "label": "B",
                "text": "2x² - 5x - 12"
              },
              {
                "label": "C",
                "text": "2x² + 5x - 12"
              },
              {
                "label": "D",
                "text": "2x² - 12"
              }
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "title": "Mathematics Quiz 3 – Functions, Logarithms & Progressions",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "What is the value of log₂(32)?",
            "options": [
              {
                "label": "A",
                "text": "4"
              },
              {
                "label": "B",
                "text": "5"
              },
              {
                "label": "C",
                "text": "6"
              },
              {
                "label": "D",
                "text": "16"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "In an arithmetic progression with first term a₁ = 3 and common difference d = 4, what is the 10th term?",
            "options": [
              {
                "label": "A",
                "text": "39"
              },
              {
                "label": "B",
                "text": "40"
              },
              {
                "label": "C",
                "text": "43"
              },
              {
                "label": "D",
                "text": "36"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 3,
            "prompt": "Evaluate the expression 3⁻²:",
            "options": [
              {
                "label": "A",
                "text": "-6"
              },
              {
                "label": "B",
                "text": "-9"
              },
              {
                "label": "C",
                "text": "1/9"
              },
              {
                "label": "D",
                "text": "1/6"
              }
            ],
            "correctIndex": 2
          },
          {
            "order": 4,
            "prompt": "What is the common ratio r of the geometric progression: 3, 6, 12, 24, ...?",
            "options": [
              {
                "label": "A",
                "text": "3"
              },
              {
                "label": "B",
                "text": "2"
              },
              {
                "label": "C",
                "text": "4"
              },
              {
                "label": "D",
                "text": "6"
              }
            ],
            "correctIndex": 1
          }
        ]
      }
    ],
    "lessons": [
      {
        "order": 1,
        "title": "Algebraic Expressions & Polynomial Operations",
        "keyPoints": [
          "Polynomials are linear combinations of variables raised to whole-number exponents.",
          "Standard algebraic identities simplify expansion and factorization of complex terms.",
          "Degree of a polynomial corresponds to the highest power of the variable."
        ],
        "contentHtml": "\n<h3>1. Algebraic Foundations</h3>\n<p>An algebraic expression combines constants and variables through arithmetic operations. Standard identities include:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">(a + b)^2 = a^2 + 2ab + b^2</div>\n    <div class=\"formula-line\">(a - b)^2 = a^2 - 2ab + b^2</div>\n    <div class=\"formula-line\">a^2 - b^2 = (a - b)(a + b)</div>\n</div>\n\n<h3>2. Expansion and Factoring</h3>\n<p>Applying the difference of squares identity on $4x^2 - 9$:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">4x^2 - 9 = (2x)^2 - (3)^2 = (2x - 3)(2x + 3)</div>\n</div>\n\n<h3>3. Solved Problem</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Algebraic Factoring: Quadratic Trinomial</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Polynomial P(x) = x² + 7x + 12</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>x² + (a+b)x + ab = (x + a)(x + b)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Find factors of 12 summing to 7: 3 + 4 = 7 and 3 × 4 = 12 \\n x² + 7x + 12 = (x + 3)(x + 4)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Factored form is (x + 3)(x + 4).</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. Expand $(3x + 5y)^2$ using algebraic identities.<br/>\n2. Factorize completely: $9a^2 - 16b^2$.</p>",
        "translations": {
          "hi": {
            "title": "बीजीय व्यंजक एवं बहुपद संक्रियाएँ",
            "keyPoints": [
              "बहुपद चरों और अचरों के गणितीय संयोजन होते हैं।",
              "मानक सर्वसमिकाएं व्यंजकों के विस्तार और गुणनखंडन में सहायक हैं।",
              "बहुपद की घात चर के उच्चतम घातांक द्वारा निर्धारित होती है।"
            ],
            "contentHtml": "\n<h3>1. बीजीय सर्वसमिकाएँ</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">(a + b)^2 = a^2 + 2ab + b^2</div>\n    <div class=\"formula-line\">(a - b)^2 = a^2 - 2ab + b^2</div>\n    <div class=\"formula-line\">a^2 - b^2 = (a - b)(a + b)</div>\n</div>\n\n<h3>2. गुणनखंडन का उदाहरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">4x^2 - 9 = (2x)^2 - (3)^2 = (2x - 3)(2x + 3)</div>\n</div>\n\n<h3>3. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">बहुपद गुणनखंडन</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> बहुपद P(x) = x² + 7x + 12</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>x² + (a+b)x + ab = (x + a)(x + b)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">3 + 4 = 7 और 3 × 4 = 12  ⇒  (x + 3)(x + 4)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> गुणनखंड (x + 3)(x + 4) है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. $(3x + 5y)^2$ का विस्तार कीजिए।<br/>\n2. $9a^2 - 16b^2$ का पूर्ण गुणनखंडन कीजिए।</p>"
          },
          "mr": {
            "title": "बैजिक राशी आणि बहुपदी वरील क्रिया",
            "keyPoints": [
              "बहुपदी म्हणजे चलांचे धन पूर्णांक घातांक असणाऱ्या राशी.",
              "नित्यसमीकरणे विस्तार आणि अवयव पाडण्यासाठी वापरली जातात."
            ],
            "contentHtml": "\n<h3>1. बैजिक नित्यसमीकरणे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">(a + b)^2 = a^2 + 2ab + b^2</div>\n    <div class=\"formula-line\">(a - b)^2 = a^2 - 2ab + b^2</div>\n    <div class=\"formula-line\">a^2 - b^2 = (a - b)(a + b)</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">बहुपदीचे अवयव पाडणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> P(x) = x² + 7x + 12</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>x² + (a+b)x + ab = (x + a)(x + b)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">3 + 4 = 7 आणि 3 × 4 = 12  ⇒  (x + 3)(x + 4)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> अवयव (x + 3)(x + 4) आहेत.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. $(3x + 5y)^2$ चा विस्तार करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Polynomial",
            "enDef": "An expression consisting of variables and coefficients with non-negative integer exponents.",
            "hiEquiv": "बहुपद",
            "mrEquiv": "बहुपदी"
          }
        ]
      },
      {
        "order": 2,
        "title": "Linear Equations in One & Two Variables",
        "keyPoints": [
          "Linear equations represent straight-line graphs in Cartesian space: ax + by + c = 0.",
          "Systems of two linear equations can be solved using substitution, elimination, or matrix determinants.",
          "Unique solution exists when lines intersect (a₁/a₂ ≠ b₁/b₂)."
        ],
        "contentHtml": "\n<h3>1. Linear Equations and Systems</h3>\n<p>A linear equation in two variables $x$ and $y$ has the standard form $ax + by + c = 0$. For a system of two simultaneous equations:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_1 x + b_1 y = c_1</div>\n    <div class=\"formula-line\">a_2 x + b_2 y = c_2</div>\n</div>\n\n<h3>2. Slope-Intercept Form</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">y = m x + c</div>\n    <div class=\"formula-line\">m = \\frac{y_2 - y_1}{x_2 - x_1}</div>\n</div>\n\n<h3>3. Solved Problem: Simultaneous Linear System</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Solving by Elimination Method</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Eq 1: 2x + 3y = 13,  Eq 2: x - y = 4</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>From Eq 2: x = y + 4. Substitute into Eq 1</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">2(y + 4) + 3y = 13  ⇒  2y + 8 + 3y = 13  ⇒  5y = 5  ⇒  y = 1 \\n x = 1 + 4 = 5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Solution is x = 5, y = 1.</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. Solve for $x$ and $y$: $3x + 2y = 16$ and $2x - y = 6$.<br/>\n2. Find the slope of the line passing through points $(2, 3)$ and $(6, 11)$.</p>",
        "translations": {
          "hi": {
            "title": "एक एवं दो चरों वाले रैखिक समीकरण",
            "keyPoints": [
              "दो चरों वाले रैखिक समीकरण का मानक रूप ax + by + c = 0 होता है।",
              "समीकरण युग्म को प्रतिस्थापन अथवा विलोपन विधि द्वारा हल किया जाता है।",
              "अद्वितीय हल तब प्राप्त होता है जब a₁/a₂ ≠ b₁/b₂ हो।"
            ],
            "contentHtml": "\n<h3>1. दो चरों वाले युगपत समीकरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_1 x + b_1 y = c_1</div>\n    <div class=\"formula-line\">a_2 x + b_2 y = c_2</div>\n</div>\n\n<h3>2. रेखा का ढाल-अंतःखंड रूप</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">y = m x + c</div>\n    <div class=\"formula-line\">m = \\frac{y_2 - y_1}{x_2 - x_1}</div>\n</div>\n\n<h3>3. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">विलोपन विधि द्वारा हल</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> समीकरण 1: 2x + 3y = 13,  समीकरण 2: x - y = 4</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>प्रतिस्थापन: x = y + 4</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">2(y + 4) + 3y = 13  ⇒  5y = 5  ⇒  y = 1, x = 5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> हल x = 5, y = 1 है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. हल कीजिए: $3x + 2y = 16$ और $2x - y = 6$।</p>"
          },
          "mr": {
            "title": "एक आणि दोन चलांतील रेषीय समीकरणे",
            "keyPoints": [
              "दोन चलांतील रेषीय समीकरणाचे सामान्य रूप ax + by + c = 0 असते.",
              "एकरेषीय समीकरणांची उकल लोप पद्धतीने किंवा चलाची किंमत ठेवून काढली जाते."
            ],
            "contentHtml": "\n<h3>1. एकसामयिक समीकरणे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_1 x + b_1 y = c_1</div>\n    <div class=\"formula-line\">a_2 x + b_2 y = c_2</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">लोप पद्धतीने उकल शोधणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> 2x + 3y = 13 आणि x - y = 4</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>x = y + 4</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">2(y + 4) + 3y = 13  ⇒  5y = 5  ⇒  y = 1, x = 5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> उकल x = 5, y = 1 आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. सोडवा: $3x + 2y = 16$ आणि $2x - y = 6$.</p>"
          }
        },
        "glossary": [
          {
            "term": "Linear Equation",
            "enDef": "An equation between two variables that gives a straight line when plotted on a graph.",
            "hiEquiv": "रैखिक समीकरण",
            "mrEquiv": "रेषीय समीकरण"
          }
        ]
      },
      {
        "order": 3,
        "title": "Quadratic Equations & Quadratic Formula",
        "keyPoints": [
          "Standard quadratic form is ax² + bx + c = 0, where a ≠ 0.",
          "The discriminant Δ = b² - 4ac determines the nature of the roots (real, equal, or complex).",
          "The quadratic formula gives exact analytical solutions: x = (-b ± √Δ) / (2a)."
        ],
        "contentHtml": "\n<h3>1. The Quadratic Equation & Discriminant</h3>\n<p>A second-degree polynomial equation $ax^2 + bx + c = 0$ is solved by completing the square or applying the quadratic formula:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}</div>\n    <div class=\"formula-line\">\\Delta = b^2 - 4ac</div>\n</div>\n\n<h3>2. Nature of Roots</h3>\n<ul>\n  <li>$\\Delta > 0$: Two distinct real roots</li>\n  <li>$\\Delta = 0$: Two real equal roots (repeated root: $x = -b / 2a$)</li>\n  <li>$\\Delta < 0$: No real roots (two complex conjugate roots)</li>\n</ul>\n\n<h3>3. Solved Problem: Finding Roots</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Solving Quadratic Equation with Quadratic Formula</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Equation: 2x² - 7x + 3 = 0 (a = 2, b = -7, c = 3)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>x = (-b ± √(b² - 4ac)) / (2a)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Δ = (-7)² - 4(2)(3) = 49 - 24 = 25 \\n x = (7 ± √25) / (2 × 2) = (7 ± 5) / 4 \\n x₁ = 12/4 = 3,  x₂ = 2/4 = 0.5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The roots are x = 3 and x = 0.5.</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. Find the discriminant and nature of roots for $3x^2 + 2x - 1 = 0$.<br/>\n2. Solve $x^2 - 6x + 9 = 0$.</p>",
        "translations": {
          "hi": {
            "title": "द्विघात समीकरण एवं द्विघात सूत्र",
            "keyPoints": [
              "द्विघात समीकरण का मानक रूप ax² + bx + c = 0 होता है (a ≠ 0)।",
              "विविक्तकर (Discriminant) Δ = b² - 4ac मूलों की प्रकृति निर्धारित करता है।",
              "द्विघात सूत्र (श्रीधराचार्य सूत्र): x = (-b ± √Δ) / (2a)।"
            ],
            "contentHtml": "\n<h3>1. द्विघात समीकरण एवं विविक्तकर</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}</div>\n    <div class=\"formula-line\">\\Delta = b^2 - 4ac</div>\n</div>\n\n<h3>3. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">द्विघात सूत्र द्वारा मूल ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> समीकरण: 2x² - 7x + 3 = 0 (a = 2, b = -7, c = 3)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>x = (-b ± √(b² - 4ac)) / (2a)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Δ = 49 - 24 = 25  ⇒  x = (7 ± 5) / 4  ⇒  x₁ = 3, x₂ = 0.5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> समीकरण के मूल x = 3 तथा x = 0.5 हैं।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. $3x^2 + 2x - 1 = 0$ के मूलों की प्रकृति बताइए।</p>"
          },
          "mr": {
            "title": "वर्गसमीकरणे आणि सूत्र पद्धती",
            "keyPoints": [
              "वर्गसमीकरणाचे सामान्य रूप ax² + bx + c = 0 असते.",
              "विवेचक Δ = b² - 4ac वरून मुळांचे स्वरूप ठरते.",
              "सूत्र पद्धती: x = (-b ± √Δ) / (2a)."
            ],
            "contentHtml": "\n<h3>1. वर्गसमीकरणाचे सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}</div>\n    <div class=\"formula-line\">\\Delta = b^2 - 4ac</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">सूत्राचा वापर करून वर्गसमीकरण सोडवणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> 2x² - 7x + 3 = 0 (a = 2, b = -7, c = 3)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>x = (-b ± √(b² - 4ac)) / (2a)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Δ = 49 - 24 = 25  ⇒  x = (7 ± 5) / 4  ⇒  x = 3 किंवा x = 0.5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> समीकरणाची मुळे 3 आणि 0.5 आहेत.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. $x^2 - 6x + 9 = 0$ ची मुळे काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Discriminant",
            "enDef": "The part of the quadratic formula under the square root: b² - 4ac.",
            "hiEquiv": "विविक्तकर",
            "mrEquiv": "विवेचक"
          }
        ]
      },
      {
        "order": 4,
        "title": "Arithmetic Progressions",
        "keyPoints": [
          "An Arithmetic Progression (AP) is a sequence where consecutive terms differ by a constant common difference d.",
          "The nth general term is: a_n = a + (n - 1)d.",
          "The sum of the first n terms is: S_n = (n/2)[2a + (n - 1)d]."
        ],
        "contentHtml": "\n<h3>1. Arithmetic Sequence Formulation</h3>\n<p>Given first term $a$ and constant difference $d$, terms are $a, a+d, a+2d, \\dots$</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_n = a + (n - 1)d</div>\n    <div class=\"formula-line\">S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)</div>\n</div>\n\n<h3>2. Solved Problem: Sum and nth Term</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating 20th Term and Sum of 20 Terms</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> AP sequence: 3, 7, 11, 15, ... (a = 3, d = 4, n = 20)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>aₙ = a + (n-1)d  and  Sₙ = (n/2)[2a + (n-1)d]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a₂₀ = 3 + (20 - 1)(4) = 3 + 76 = 79 \\n S₂₀ = (20 / 2)[2(3) + 19(4)] = 10[6 + 76] = 10[82] = 820</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The 20th term is 79 and sum S₂₀ is 820.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Find the 15th term of the sequence $10, 7, 4, 1, \\dots$<br/>\n2. Find the sum of first 50 positive integers: $1 + 2 + 3 + \\dots + 50$.</p>",
        "translations": {
          "hi": {
            "title": "समान्तर श्रेढ़ी (Arithmetic Progression)",
            "keyPoints": [
              "समान्तर श्रेढ़ी में दो क्रमागत पदों का अंतर d नियत रहता है।",
              "n-वां पद: a_n = a + (n - 1)d।",
              "प्रथम n पदों का योग: S_n = (n/2)[2a + (n - 1)d]।"
            ],
            "contentHtml": "\n<h3>1. समान्तर श्रेढ़ी के सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_n = a + (n - 1)d</div>\n    <div class=\"formula-line\">S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">20वां पद एवं 20 पदों का योग ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> श्रेणी: 3, 7, 11, 15... (a = 3, d = 4, n = 20)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>aₙ = a + (n-1)d, Sₙ = (n/2)[2a + (n-1)d]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a₂₀ = 3 + 19(4) = 79 \\n S₂₀ = 10[6 + 76] = 820</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 20वां पद 79 तथा योग 820 है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. प्रथम 50 धन पूर्णांकों का योग ज्ञात कीजिए: $1 + 2 + 3 + ... + 50$।</p>"
          },
          "mr": {
            "title": "अंकगणिती श्रेढी",
            "keyPoints": [
              "अंकगणिती श्रेढीत लगतच्या दोन पदांमधील फरक d स्थिर असतो.",
              "n वे पद: a_n = a + (n - 1)d.",
              "पहिल्या n पदांची बेरीज: S_n = (n/2)[2a + (n - 1)d]."
            ],
            "contentHtml": "\n<h3>1. अंकगणिती श्रेढीची सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_n = a + (n - 1)d</div>\n    <div class=\"formula-line\">S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">20 वे पद आणि बेरीज काढणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> 3, 7, 11, 15... (a = 3, d = 4, n = 20)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>aₙ = a + (n-1)d, Sₙ = (n/2)[2a + (n-1)d]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a₂₀ = 3 + 19(4) = 79, S₂₀ = 10(82) = 820</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 20 वे पद 79 आणि बेरीज 820 आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. पहिल्या 50 नैसर्गिक संख्यांची बेरीज काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Common Difference",
            "enDef": "Constant difference between consecutive terms in an arithmetic progression.",
            "hiEquiv": "सार्व अंतर",
            "mrEquiv": "सामाईक फरक"
          }
        ]
      },
      {
        "order": 5,
        "title": "Geometric Progressions",
        "keyPoints": [
          "A Geometric Progression (GP) exhibits a constant common ratio r between successive terms.",
          "The nth general term is: a_n = a × r^(n - 1).",
          "Sum of first n terms: S_n = a(r^n - 1) / (r - 1) for r ≠ 1."
        ],
        "contentHtml": "\n<h3>1. Geometric Sequence Properties</h3>\n<p>For first term $a$ and common ratio $r = \\frac{a_{k+1}}{a_k}$:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_n = a r^{n - 1}</div>\n    <div class=\"formula-line\">S_n = \\frac{a(r^n - 1)}{r - 1} \\quad (r > 1)</div>\n</div>\n\n<h3>2. Solved Problem: GP Terms and Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating 6th Term and Sum of GP</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> GP: 2, 6, 18, 54, ... (a = 2, r = 3, n = 6)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>a₆ = a r⁵  and  S₆ = a(r⁶ - 1)/(r - 1)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a₆ = 2 × 3⁵ = 2 × 243 = 486 \\n S₆ = 2(3⁶ - 1)/(3 - 1) = 2(729 - 1)/2 = 728</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The 6th term is 486 and the sum S₆ is 728.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Find the 8th term of the geometric sequence $1, 2, 4, 8, \\dots$<br/>\n2. Calculate the infinite sum of $1 + 1/2 + 1/4 + 1/8 + \\dots$ using $S_\\infty = a / (1 - r)$.</p>",
        "translations": {
          "hi": {
            "title": "गुणोत्तर श्रेढ़ी (Geometric Progression)",
            "keyPoints": [
              "गुणोत्तर श्रेढ़ी में क्रमागत पदों का अनुपात r (सार्व अनुपात) नियत रहता है।",
              "n-वां पद: a_n = a × r^(n - 1)।",
              "योग सूत्र: S_n = a(r^n - 1) / (r - 1)।"
            ],
            "contentHtml": "\n<h3>1. गुणोत्तर श्रेढ़ी के सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_n = a r^{n - 1}</div>\n    <div class=\"formula-line\">S_n = \\frac{a(r^n - 1)}{r - 1} \\quad (r > 1)</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">6वां पद एवं योग ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> श्रेणी: 2, 6, 18, 54... (a = 2, r = 3, n = 6)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>a₆ = a r⁵, S₆ = a(r⁶ - 1)/(r - 1)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a₆ = 2 × 243 = 486 \\n S₆ = 2(728)/2 = 728</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 6वां पद 486 तथा 6 पदों का योग 728 है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. अनंत गुणोत्तर श्रेणी $1 + 1/2 + 1/4 + ...$ का योग ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "भूमिती श्रेढी",
            "keyPoints": [
              "भूमिती श्रेढीत लगतच्या दोन पदांमधील गुणोत्तर r स्थिर असते.",
              "n वे पद: a_n = a × r^(n - 1)."
            ],
            "contentHtml": "\n<h3>1. भूमिती श्रेढीची सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_n = a r^{n - 1}</div>\n    <div class=\"formula-line\">S_n = \\frac{a(r^n - 1)}{r - 1} \\quad (r > 1)</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">6 वे पद आणि बेरीज काढणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> 2, 6, 18, 54... (a = 2, r = 3, n = 6)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>a₆ = a r⁵, S₆ = a(r⁶ - 1)/(r - 1)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a₆ = 2 × 243 = 486, S₆ = 728</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 6 वे पद 486 आणि बेरीज 728 आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. $1, 2, 4, 8...$ या श्रेढीचे आठवे पद काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Common Ratio",
            "enDef": "Ratio of any term to its previous term in a geometric sequence.",
            "hiEquiv": "सार्व अनुपात",
            "mrEquiv": "सामान्य गुणोत्तर"
          }
        ]
      },
      {
        "order": 6,
        "title": "Coordinate Geometry & Distance Formula",
        "keyPoints": [
          "Points in a 2D plane are uniquely defined by Cartesian ordered pairs (x, y).",
          "The distance between two points (x₁, y₁) and (x₂, y₂) is given by Euclidean distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²].",
          "The section formula calculates coordinates dividing a line segment in ratio m:n."
        ],
        "contentHtml": "\n<h3>1. Coordinate Formulas in 2D Space</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}</div>\n    <div class=\"formula-line\">M = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)</div>\n</div>\n\n<h3>2. Solved Problem: Distance and Midpoint</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Euclidean Distance Between Coordinates</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Points P(1, 2) and Q(4, 6)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">d = √[(4 - 1)² + (6 - 2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5 units</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Distance PQ is 5 units, Midpoint is (2.5, 4).</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Calculate the distance from origin $(0, 0)$ to point $(-6, 8)$.<br/>\n2. Find the point dividing the segment joining $(1, 3)$ and $(4, 6)$ internally in ratio $2:1$.</p>",
        "translations": {
          "hi": {
            "title": "निर्देशांक ज्यामिति एवं दूरी सूत्र",
            "keyPoints": [
              "तल पर किसी बिंदु की स्थिति कार्तीय निर्देशांक (x, y) द्वारा व्यक्त होती है।",
              "दो बिंदुओं के बीच की दूरी: d = √[(x₂ - x₁)² + (y₂ - y₁)²]।"
            ],
            "contentHtml": "\n<h3>1. दूरी एवं मध्य बिंदु सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}</div>\n    <div class=\"formula-line\">M = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">दो बिंदुओं के बीच दूरी ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> बिंदु P(1, 2) और Q(4, 6)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">d = √[(3)² + (4)²] = √25 = 5 इकाई</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> दूरी 5 इकाई है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. मूल बिंदु $(0, 0)$ से बिंदु $(-6, 8)$ की दूरी ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "निर्देशांक भूमिती आणि अंतराचे सूत्र",
            "keyPoints": [
              "दोन बिंदूंमधील अंतर: d = √[(x₂ - x₁)² + (y₂ - y₁)²].",
              "मध्यबिंदू निर्देशक: ((x₁+x₂)/2, (y₁+y₂)/2)."
            ],
            "contentHtml": "\n<h3>1. अंतराचे सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}</div>\n    <div class=\"formula-line\">M = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">दोन बिंदूंमधील अंतर काढणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> P(1, 2) आणि Q(4, 6)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">d = √[3² + 4²] = √25 = 5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> अंतर 5 एकक आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. आरंभबिंदू $(0, 0)$ ते $(-6, 8)$ मधील अंतर काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Euclidean Distance",
            "enDef": "Straight-line distance between two points in Euclidean space.",
            "hiEquiv": "दूरी सूत्र",
            "mrEquiv": "अंतराचे सूत्र"
          }
        ]
      },
      {
        "order": 7,
        "title": "Trigonometric Ratios & Identities",
        "keyPoints": [
          "Trigonometric functions relate angle measurements to side ratios in right-angled triangles.",
          "Fundamental ratios: sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj.",
          "Pythagorean identities: sin² θ + cos² θ = 1, 1 + tan² θ = sec² θ, 1 + cot² θ = cosec² θ."
        ],
        "contentHtml": "\n<h3>1. Foundational Trigonometric Identities</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\sin^2\\theta + \\cos^2\\theta = 1</div>\n    <div class=\"formula-line\">1 + \\tan^2\\theta = \\sec^2\\theta</div>\n    <div class=\"formula-line\">1 + \\cot^2\\theta = \\csc^2\\theta</div>\n</div>\n\n<h3>2. Solved Problem: Evaluating Trigonometric Ratios</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Given sin θ = 3/5, Find cos θ and tan θ</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Right triangle with sin θ = 3/5 (opposite = 3, hypotenuse = 5)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>cos θ = √(1 - sin² θ),  tan θ = sin θ / cos θ</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">cos θ = √(1 - 9/25) = √(16/25) = 4/5 \\n tan θ = (3/5) / (4/5) = 3/4</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> cos θ = 4/5 (0.8) and tan θ = 3/4 (0.75).</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Prove the identity: $(\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta$.<br/>\n2. Calculate the exact value of $\\sin(30^\\circ) + \\cos(60^\\circ)$.</p>",
        "translations": {
          "hi": {
            "title": "त्रिकोणमितीय अनुपात एवं सर्वसमिकाएँ",
            "keyPoints": [
              "त्रिकोणमिति समकोण त्रिभुज की भुजाओं और कोणों के अनुपात का अध्ययन है।",
              "पाइथागोरस सर्वसमिका: sin² θ + cos² θ = 1।"
            ],
            "contentHtml": "\n<h3>1. त्रिकोणमितीय सर्वसमिकाएँ</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\sin^2\\theta + \\cos^2\\theta = 1</div>\n    <div class=\"formula-line\">1 + \\tan^2\\theta = \\sec^2\\theta</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">sin θ = 3/5 होने पर cos θ और tan θ ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> sin θ = 3/5</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>cos θ = √(1 - sin² θ), tan θ = sin θ / cos θ</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">cos θ = √(1 - 9/25) = 4/5 \\n tan θ = (3/5)/(4/5) = 3/4</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> cos θ = 4/5 तथा tan θ = 3/4 है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. मान ज्ञात कीजिए: $\\sin(30^\\circ) + \\cos(60^\\circ)$।</p>"
          },
          "mr": {
            "title": "त्रिकोणमितीय गुणोत्तरे आणि नित्यसमीकरणे",
            "keyPoints": [
              "काटकोन त्रिकोणात sin, cos, tan ही गुणोत्तरे बाजूंचे प्रमाण दर्शवतात.",
              "नित्यसमीकरण: sin² θ + cos² θ = 1."
            ],
            "contentHtml": "\n<h3>1. त्रिकोणमितीची नित्यसमीकरणे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\sin^2\\theta + \\cos^2\\theta = 1</div>\n    <div class=\"formula-line\">1 + \\tan^2\\theta = \\sec^2\\theta</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">sin θ = 3/5 वरून cos θ आणि tan θ काढणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> sin θ = 3/5</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>cos θ = √(1 - sin² θ), tan θ = sin θ / cos θ</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">cos θ = √(1 - 9/25) = 4/5, tan θ = 3/4</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> cos θ = 4/5 आणि tan θ = 3/4.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. किंमत काढा: $\\sin(30^\\circ) + \\cos(60^\\circ)$.</p>"
          }
        },
        "glossary": [
          {
            "term": "Hypotenuse",
            "enDef": "Longest side of a right-angled triangle opposite the right angle.",
            "hiEquiv": "कर्ण",
            "mrEquiv": "कर्ण"
          }
        ]
      },
      {
        "order": 8,
        "title": "Statistics: Mean, Median, Mode & Standard Deviation",
        "keyPoints": [
          "Measures of central tendency summarize datasets with single representative values (Mean, Median, Mode).",
          "Standard deviation σ measures dispersion around the arithmetic mean.",
          "Variance is the square of standard deviation: σ² = Σ(x - μ)² / N."
        ],
        "contentHtml": "\n<h3>1. Statistical Measures Formulas</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\bar{x} = \\frac{\\sum x_i}{n}</div>\n    <div class=\"formula-line\">\\sigma = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n}}</div>\n</div>\n\n<h3>2. Solved Problem: Computing Mean and Standard Deviation</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating Mean and Std Deviation for Dataset {2, 4, 6, 8, 10}</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Values: x = [2, 4, 6, 8, 10], sample size n = 5</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Mean x̄ = Σx / n, σ = √[Σ(x - x̄)² / n]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Σx = 2 + 4 + 6 + 8 + 10 = 30  ⇒  x̄ = 30 / 5 = 6 \\n Deviations squared: (2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)² = 16 + 4 + 0 + 4 + 16 = 40 \\n σ = √(40 / 5) = √8 ≈ 2.828</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Mean x̄ = 6, Standard Deviation σ ≈ 2.83.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Find the median and mode of data: $3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29$.<br/>\n2. Calculate the mean deviation about mean for $4, 7, 8, 9, 10, 12, 13, 17$.</p>",
        "translations": {
          "hi": {
            "title": "सांख्यिकी: माध्य, माध्यिका, बहुलक एवं मानक विचलन",
            "keyPoints": [
              "माध्य, माध्यिका एवं बहुलक केंद्रीय प्रवृत्ति के प्रमुख माप हैं।",
              "मानक विचलन σ आंकड़ों के फैलाव का सटीक माप है।"
            ],
            "contentHtml": "\n<h3>1. सांख्यिकीय सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\bar{x} = \\frac{\\sum x_i}{n}</div>\n    <div class=\"formula-line\">\\sigma = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n}}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">माध्य एवं मानक विचलन ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> आंकड़े: 2, 4, 6, 8, 10 (n = 5)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>x̄ = Σx / n, σ = √[Σ(x - x̄)² / n]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Σx = 30  ⇒  x̄ = 6 \\n विचलन वर्ग योग = 16 + 4 + 0 + 4 + 16 = 40 \\n σ = √(40/5) = √8 ≈ 2.83</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> माध्य = 6, मानक विचलन ≈ 2.83 है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. आंकड़े $5, 8, 12, 15, 20$ का माध्य ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "सांख्यिकी: मध्य, मध्यक, बहुलक आणि प्रमाण विचलन",
            "keyPoints": [
              "केंद्रीय प्रवृत्तीची परिमाणे: मध्य, मध्यक आणि बहुलक.",
              "प्रमाण विचलन (Standard Deviation) विखुरलेपणा मोजते."
            ],
            "contentHtml": "\n<h3>1. सांख्यिकी सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\bar{x} = \\frac{\\sum x_i}{n}</div>\n    <div class=\"formula-line\">\\sigma = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n}}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">मध्य व प्रमाण विचलन काढणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> 2, 4, 6, 8, 10 (n = 5)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>x̄ = Σx / n, σ = √[Σ(x - x̄)² / n]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">x̄ = 30 / 5 = 6, σ = √8 ≈ 2.83</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> मध्य 6 आणि प्रमाण विचलन 2.83 आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. $5, 8, 12, 15, 20$ चा मध्य काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Standard Deviation",
            "enDef": "Measure of the amount of variation or dispersion of a set of values.",
            "hiEquiv": "मानक विचलन",
            "mrEquiv": "प्रमाण विचलन"
          }
        ]
      },
      {
        "order": 9,
        "title": "Probability & Combinatorics",
        "keyPoints": [
          "Classical probability of event A in sample space S is P(A) = n(A) / n(S).",
          "Permutations evaluate ordered arrangements: ⁿPᵣ = n! / (n - r)!.",
          "Combinations evaluate unordered selections: ⁿCᵣ = n! / [r!(n - r)!]."
        ],
        "contentHtml": "\n<h3>1. Probability and Counting Principles</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P(A) = \\frac{n(A)}{n(S)} \\quad (0 \\le P(A) \\le 1)</div>\n    <div class=\"formula-line\">{}^nC_r = \\frac{n!}{r!(n - r)!}</div>\n</div>\n\n<h3>2. Solved Problem: Dice Probability</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Probability of Rolling a Sum of 7 with Two Dice</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Two fair 6-sided dice rolled. Total outcomes n(S) = 6 × 6 = 36</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>P(Sum = 7) = n(favorable pairs) / n(S)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Favorable pairs summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)  ⇒  6 pairs \\n P = 6 / 36 = 1 / 6 ≈ 0.1667</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The probability is 1/6 (approx 16.67%).</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. A bag contains 4 red balls and 6 green balls. Calculate the probability of picking a red ball at random.<br/>\n2. Calculate the number of ways to choose a committee of 3 students from a group of 10 students (C(10, 3)).</p>",
        "translations": {
          "hi": {
            "title": "प्रायिकता एवं संचय (Probability & Combinatorics)",
            "keyPoints": [
              "प्रायिकता P(A) = अनुकूल परिणाम / कुल परिणाम = n(A) / n(S)।",
              "संचय (Combinations): ⁿCᵣ = n! / [r!(n - r)!]।"
            ],
            "contentHtml": "\n<h3>1. प्रायिकता के मूल सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P(A) = \\frac{n(A)}{n(S)} \\quad (0 \\le P(A) \\le 1)</div>\n    <div class=\"formula-line\">{}^nC_r = \\frac{n!}{r!(n - r)!}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">दो पासों पर योग 7 आने की प्रायिकता</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> दो पासे फेंकने पर कुल परिणाम n(S) = 36</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>P(A) = n(A) / n(S)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">अनुकूल युग्म: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 \\n P = 6 / 36 = 1 / 6</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> प्रायिकता 1/6 (16.67%) है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. 10 विद्यार्थियों में से 3 की समिति बनाने के कुल तरीके (C(10, 3)) ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "संभाव्यता आणि क्रमपरिवर्तन व संचयन",
            "keyPoints": [
              "संभाव्यता P(A) = n(A) / n(S).",
              "निवड करण्याचे प्रकार: ⁿCᵣ = n! / [r!(n - r)!]."
            ],
            "contentHtml": "\n<h3>1. संभाव्यतेचे सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P(A) = \\frac{n(A)}{n(S)} \\quad (0 \\le P(A) \\le 1)</div>\n    <div class=\"formula-line\">{}^nC_r = \\frac{n!}{r!(n - r)!}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">दोन फासे टाकल्यावर बेरीज 7 येण्याची संभाव्यता</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> एकूण नमुना अवकाश n(S) = 36</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>P(A) = n(A) / n(S)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">अनुकूल जोड्या = 6  ⇒  P = 6 / 36 = 1 / 6</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> संभाव्यता 1/6 आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. एका नाण्यावर छापा (Head) येण्याची संभाव्यता काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Sample Space",
            "enDef": "The set of all possible outcomes of a random experiment.",
            "hiEquiv": "प्रतिदर्श समष्टि",
            "mrEquiv": "नमुना अवकाश"
          }
        ]
      },
      {
        "order": 10,
        "title": "Differential Calculus & Derivatives",
        "keyPoints": [
          "The derivative represents the instantaneous rate of change and geometric tangent slope of a curve.",
          "Power Rule: d/dx [xⁿ] = n xⁿ⁻¹.",
          "Sum and constant multiple rules allow term-by-term polynomial differentiation."
        ],
        "contentHtml": "\n<h3>1. Calculus Differentiation Rules</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}</div>\n    <div class=\"formula-line\">\\frac{d}{dx}[x^n] = n x^{n - 1}</div>\n    <div class=\"formula-line\">\\frac{d}{dx}[c \\cdot f(x)] = c f'(x)</div>\n</div>\n\n<h3>2. Solved Problem: Polynomial Derivative</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Differentiating a Cubic Polynomial Function</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Function: f(x) = 4x³ - 5x² + 7x - 9</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>d/dx [a xⁿ] = a n xⁿ⁻¹ and d/dx [c] = 0</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">f'(x) = 4(3x²) - 5(2x) + 7(1) - 0 = 12x² - 10x + 7</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The derivative is f'(x) = 12x² - 10x + 7.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Find the derivative of $g(x) = 3x^5 - 2x^3 + 4x$.<br/>\n2. Calculate the slope of the tangent to curve $y = x^2 - 4x + 3$ at $x = 3$.</p>",
        "translations": {
          "hi": {
            "title": "अवकलन एवं अवकलज (Differential Calculus)",
            "keyPoints": [
              "अवकलज किसी फलन के तात्कालिक परिवर्तन की दर और स्पर्शरेखा की प्रवणता को दर्शाता है।",
              "घात नियम: d/dx [xⁿ] = n xⁿ⁻¹।"
            ],
            "contentHtml": "\n<h3>1. अवकलन के मूल नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}</div>\n    <div class=\"formula-line\">\\frac{d}{dx}[x^n] = n x^{n - 1}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">बहुपद फलन का अवकलन</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> फलन: f(x) = 4x³ - 5x² + 7x - 9</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>d/dx [xⁿ] = n xⁿ⁻¹</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">f'(x) = 4(3x²) - 5(2x) + 7 = 12x² - 10x + 7</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> अवकलज f'(x) = 12x² - 10x + 7 है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. फलन $y = x^2$ का $x = 3$ पर ढाल ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "अवकलन आणि विकलज (Calculus)",
            "keyPoints": [
              "विकलज म्हणजे तात्कालिक बदलाचा दर आणि आलेखाच्या स्पर्शिकेचा चढ.",
              "घातांक नियम: d/dx [xⁿ] = n xⁿ⁻¹."
            ],
            "contentHtml": "\n<h3>1. अवकलनाचे मूलभूत नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}</div>\n    <div class=\"formula-line\">\\frac{d}{dx}[x^n] = n x^{n - 1}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">बहुपदीचे अवकलन करणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> f(x) = 4x³ - 5x² + 7x - 9</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>d/dx [xⁿ] = n xⁿ⁻¹</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">f'(x) = 12x² - 10x + 7</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> विकलज f'(x) = 12x² - 10x + 7 आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. $g(x) = x^3$ चे अवकलन करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Derivative",
            "enDef": "A measure of how a function changes as its input changes.",
            "hiEquiv": "अवकलज",
            "mrEquiv": "विकलज"
          }
        ]
      }
    ]
  },
  {
    "id": "seed-course-physics",
    "title": "Physics Motion",
    "subject": "Physics",
    "description": "Comprehensive study of classical mechanics, kinematics, dynamics, gravitation, work, energy, and circular motion.",
    "offlinePackageSizeMb": 14.8,
    "quizzes": [
      {
        "title": "Physics Quiz 1 – Kinematics & Graph Analysis",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "Which of the following is a vector quantity?",
            "options": [
              {
                "label": "A",
                "text": "Speed"
              },
              {
                "label": "B",
                "text": "Distance"
              },
              {
                "label": "C",
                "text": "Displacement"
              },
              {
                "label": "D",
                "text": "Mass"
              }
            ],
            "correctIndex": 2
          },
          {
            "order": 2,
            "prompt": "What physical quantity does the area under a velocity-time graph represent?",
            "options": [
              {
                "label": "A",
                "text": "Acceleration"
              },
              {
                "label": "B",
                "text": "Displacement"
              },
              {
                "label": "C",
                "text": "Force"
              },
              {
                "label": "D",
                "text": "Power"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "A car accelerates uniformly from rest at 3 m/s² for 4 seconds. What is its final velocity?",
            "options": [
              {
                "label": "A",
                "text": "7 m/s"
              },
              {
                "label": "B",
                "text": "12 m/s"
              },
              {
                "label": "C",
                "text": "24 m/s"
              },
              {
                "label": "D",
                "text": "18 m/s"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "What is the slope of a position-time graph?",
            "options": [
              {
                "label": "A",
                "text": "Acceleration"
              },
              {
                "label": "B",
                "text": "Instantaneous velocity"
              },
              {
                "label": "C",
                "text": "Total momentum"
              },
              {
                "label": "D",
                "text": "Kinetic energy"
              }
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "title": "Physics Quiz 2 – Newton’s Laws & Momentum",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "What net force is required to accelerate a 5 kg mass at 4 m/s²?",
            "options": [
              {
                "label": "A",
                "text": "20 N"
              },
              {
                "label": "B",
                "text": "9 N"
              },
              {
                "label": "C",
                "text": "1.25 N"
              },
              {
                "label": "D",
                "text": "40 N"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 2,
            "prompt": "Why don’t action and reaction forces cancel each other out?",
            "options": [
              {
                "label": "A",
                "text": "They act on different interacting bodies"
              },
              {
                "label": "B",
                "text": "They occur at different times"
              },
              {
                "label": "C",
                "text": "One force is always larger than the other"
              },
              {
                "label": "D",
                "text": "Friction prevents them from interacting"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 3,
            "prompt": "What is the momentum of a 1000 kg vehicle moving at 20 m/s?",
            "options": [
              {
                "label": "A",
                "text": "50 kg·m/s"
              },
              {
                "label": "B",
                "text": "20,000 kg·m/s"
              },
              {
                "label": "C",
                "text": "200,000 kg·m/s"
              },
              {
                "label": "D",
                "text": "10,000 kg·m/s"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "Which law of physics explains the recoil felt when firing a cannon?",
            "options": [
              {
                "label": "A",
                "text": "Newton’s First Law"
              },
              {
                "label": "B",
                "text": "Newton’s Third Law"
              },
              {
                "label": "C",
                "text": "Hooke’s Law"
              },
              {
                "label": "D",
                "text": "Ohm’s Law"
              }
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "title": "Physics Quiz 3 – Work, Energy & Gravitation",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "How much kinetic energy does a 2 kg object possess when traveling at 6 m/s?",
            "options": [
              {
                "label": "A",
                "text": "12 J"
              },
              {
                "label": "B",
                "text": "36 J"
              },
              {
                "label": "C",
                "text": "72 J"
              },
              {
                "label": "D",
                "text": "18 J"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "If you push against a concrete wall with 200 N of force for 5 minutes without it moving, how much mechanical work was done on the wall?",
            "options": [
              {
                "label": "A",
                "text": "1000 J"
              },
              {
                "label": "B",
                "text": "0 J"
              },
              {
                "label": "C",
                "text": "60,000 J"
              },
              {
                "label": "D",
                "text": "200 J"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "What happens to the gravitational attraction between two masses if the distance separating them is doubled?",
            "options": [
              {
                "label": "A",
                "text": "It is halved"
              },
              {
                "label": "B",
                "text": "It reduces to one-fourth (1/4)"
              },
              {
                "label": "C",
                "text": "It doubles"
              },
              {
                "label": "D",
                "text": "It remains unchanged"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "What is the centripetal acceleration of a body moving at 10 m/s around a circular track of radius 25 m?",
            "options": [
              {
                "label": "A",
                "text": "4 m/s²"
              },
              {
                "label": "B",
                "text": "0.4 m/s²"
              },
              {
                "label": "C",
                "text": "2.5 m/s²"
              },
              {
                "label": "D",
                "text": "250 m/s²"
              }
            ],
            "correctIndex": 0
          }
        ]
      }
    ],
    "lessons": [
      {
        "order": 1,
        "title": "Measurement, Units & Scalars vs. Vectors",
        "keyPoints": [
          "SI base units provide international standardization for all physical quantities.",
          "Scalars possess magnitude only, whereas vectors possess both magnitude and direction.",
          "Vector addition adheres to the triangle and parallelogram laws of vector addition.",
          "Dimensional analysis validates equation consistency and derives physical relationships."
        ],
        "contentHtml": "\n<h3>1. Foundations of Physical Measurement</h3>\n<p>Physical quantities are characteristics of phenomena, bodies, or substances that can be quantified and measured. The <strong>International System of Units (SI)</strong> defines seven fundamental base units, including the <strong>meter (m)</strong> for length, <strong>kilogram (kg)</strong> for mass, and <strong>second (s)</strong> for time.</p>\n\n<h3>2. Scalars vs. Vectors</h3>\n<p>A <strong>Scalar</strong> quantity is completely specified by its numerical magnitude and physical unit (e.g., mass $5\\text{ kg}$, time $12\\text{ s}$, temperature $300\\text{ K}$). A <strong>Vector</strong> quantity requires both magnitude and directional orientation in coordinate space (e.g., displacement, velocity, force).</p>\n\n<p>The resultant magnitude $R$ of two vectors $\\vec{A}$ and $\\vec{B}$ inclined at angle $\\theta$ is given by:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">R = \\sqrt{A^2 + B^2 + 2AB \\cos\\theta}</div>\n    <div class=\"formula-line\">R = \\sqrt{3^2 + 4^2 + 2(3)(4)\\cos(90^\\circ)} = 5\\text{ units}</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Resultant Displacement</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Vector A = 6 m North, Vector B = 8 m East (angle θ = 90°)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>R = √(A² + B² + 2AB cos θ)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">R = √(6² + 8² + 0) = √(36 + 64) = √100 = 10 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Resultant displacement is 10 m at 53.13° North of East.</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. Identify whether electric current ($I$) and pressure ($P$) are scalar or vector quantities and justify your reasoning.<br/>\n2. Two forces of magnitude $12\\text{ N}$ and $5\\text{ N}$ act perpendicularly on a body. Calculate the net force magnitude.</p>",
        "translations": {
          "hi": {
            "title": "मापन, मात्रक एवं अदिश तथा सदिश राशियाँ",
            "keyPoints": [
              "SI मूल मात्रक सभी भौतिक राशियों के अंतर्राष्ट्रीय मानकीकरण का आधार हैं।",
              "अदिश राशियों में केवल परिमाण होता है, जबकि सदिश राशियों में परिमाण और दिशा दोनों होते हैं।",
              "सदिश योग त्रिभुज तथा समानांतर चतुर्भुज के नियमों का पालन करता है।",
              "विमीय विश्लेषण सूत्रों की सत्यता की जांच में अत्यंत उपयोगी है।"
            ],
            "contentHtml": "\n<h3>1. भौतिक मापन के मूल सिद्धांत</h3>\n<p>भौतिक राशियाँ वे गुण हैं जिन्हें मापा जा सकता है। <strong>SI प्रणाली</strong> सात मूल मात्रक निर्धारित करती है, जिनमें लंबाई के लिए <strong>meter (m)</strong>, द्रव्यमान के लिए <strong>kilogram (kg)</strong>, और समय के लिए <strong>second (s)</strong> शामिल हैं।</p>\n\n<h3>2. अदिश (Scalars) बनाम सदिश (Vectors)</h3>\n<p><strong>Scalar</strong> राशि केवल परिमाण द्वारा व्यक्त की जाती है (जैसे द्रव्यमान <strong>5 kg</strong>, समय <strong>12 s</strong>)। <strong>Vector</strong> राशि के लिए परिमाण और दिशा दोनों अनिवार्य हैं (जैसे विस्थापन, वेग, <strong>Force</strong>)।</p>\n\n<p>दो सदिशों $\\vec{A}$ तथा $\\vec{B}$ के मध्य $\\theta$ कोण होने पर परिणामी $R$ का सूत्र:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">R = \\sqrt{A^2 + B^2 + 2AB \\cos\\theta}</div>\n    <div class=\"formula-line\">R = \\sqrt{3^2 + 4^2 + 2(3)(4)\\cos(90^\\circ)} = 5\\text{ units}</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: परिणामी विस्थापन</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> सदिश A = 6 m उत्तर, सदिश B = 8 m पूर्व (कोण θ = 90°)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>R = √(A² + B² + 2AB cos θ)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">R = √(6² + 8² + 0) = √(36 + 64) = √100 = 10 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> परिणामी विस्थापन 10 m है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. $12\\text{ N}$ और $5\\text{ N}$ के दो बल समकोण पर कार्यरत हैं। कुल परिणामी बल ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "मापन, एकके आणि अदिश व सदिश राशी",
            "keyPoints": [
              "SI मूलभूत एकके सर्व भौतिक राशींच्या आंतरराष्ट्रीय मानकीकरणाचा पाया आहेत.",
              "अदिश राशींना केवळ मूल्य असते, तर सदिश राशींना मूल्य आणि दिशा दोन्ही असतात.",
              "सदिश बेरीज त्रिकोण आणि समांतरभुज चौकोनाच्या नियमांचे पालन करते."
            ],
            "contentHtml": "\n<h3>1. भौतिक मापनाची मूलभूत तत्त्वे</h3>\n<p>भौतिक राशींचे मोजमाप करण्यासाठी <strong>SI प्रणाली</strong> सात मूलभूत एकके निश्चित करते, ज्यात लांबीसाठी <strong>meter (m)</strong>, वस्तुमानासाठी <strong>kilogram (kg)</strong> आणि वेळेसाठी <strong>second (s)</strong> आहे.</p>\n\n<h3>2. अदिश (Scalars) विरुद्ध सदिश (Vectors)</h3>\n<p><strong>Scalar</strong> राशी केवळ मूल्याद्वारे व्यक्त केली जाते (उदा. <strong>5 kg</strong>, <strong>12 s</strong>). <strong>Vector</strong> राशीसाठी मूल्य व दिशा दोन्ही आवश्यक असतात (उदा. विस्थापन, वेग, <strong>Force</strong>).</p>\n\n<div class=\"formula-box\">\n    <div class=\"formula-line\">R = \\sqrt{A^2 + B^2 + 2AB \\cos\\theta}</div>\n    <div class=\"formula-line\">R = \\sqrt{3^2 + 4^2 + 2(3)(4)\\cos(90^\\circ)} = 5\\text{ units}</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: परिणामी विस्थापन</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> सदिश A = 6 m उत्तर, सदिश B = 8 m पूर्व (θ = 90°)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>R = √(A² + B² + 2AB cos θ)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">R = √(6² + 8² + 0) = √(36 + 64) = √100 = 10 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> एकूण परिणामी विस्थापन 10 m आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. $12\\text{ N}$ आणि $5\\text{ N}$ ची दोन बले परस्परांना लंबरूप असल्यास एकूण बल काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Scalar",
            "enDef": "A physical quantity that has magnitude but no directional orientation.",
            "hiEquiv": "अदिश राशि",
            "mrEquiv": "अदिश राशी"
          },
          {
            "term": "Vector",
            "enDef": "A physical quantity characterized by both magnitude and direction.",
            "hiEquiv": "सदिश राशि",
            "mrEquiv": "सदिश राशी"
          }
        ]
      },
      {
        "order": 2,
        "title": "Displacement, Velocity & Acceleration",
        "keyPoints": [
          "Distance is total path length travelled, while displacement is the shortest vector from origin to terminus.",
          "Average velocity is the rate of change of displacement with respect to time.",
          "Acceleration represents the rate of change of velocity over time (a = Δv/Δt)."
        ],
        "contentHtml": "\n<h3>1. Linear Kinematics: Core Concepts</h3>\n<p>Motion in a straight line involves position, time, velocity, and acceleration. When an object changes position from $x_1$ to $x_2$ over time interval $\\Delta t = t_2 - t_1$, its average velocity is:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">v_{avg} = \\frac{\\Delta x}{\\Delta t} = \\frac{x_2 - x_1}{t_2 - t_1}</div>\n    <div class=\"formula-line\">v_{avg} = \\frac{100\\text{ m} - 20\\text{ m}}{4\\text{ s}} = 20\\text{ m/s}</div>\n</div>\n\n<h3>2. Acceleration Formulation</h3>\n<p><strong>Acceleration</strong> measures how rapidly velocity alters. Uniform acceleration occurs when velocity changes at a constant rate:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a = \\frac{v - u}{t}</div>\n    <div class=\"formula-line\">a = \\frac{25\\text{ m/s} - 5\\text{ m/s}}{5\\text{ s}} = 4\\text{ m/s}^2</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Vehicle Acceleration</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Initial velocity u = 10 m/s, Final velocity v = 30 m/s, Time t = 4 s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>a = (v - u) / t</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a = (30 - 10) / 4 = 20 / 4 = 5 m/s²</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The acceleration of the vehicle is 5 m/s².</p>\n</div>\n\n<h3>4. Practice Problems</h3>\n<p>1. An express train slows uniformly from $36\\text{ m/s}$ to rest in $12\\text{ s}$. Compute the deceleration rate.<br/>\n2. Calculate the displacement of a runner sprinting at $8.5\\text{ m/s}$ for $24\\text{ s}$.</p>",
        "translations": {
          "hi": {
            "title": "विस्थापन, वेग एवं त्वरण",
            "keyPoints": [
              "दूरी कुल तय किया गया मार्ग है, जबकि विस्थापन प्रारंभिक और अंतिम बिंदु के बीच का न्यूनतम सदिश है।",
              "औसत वेग विस्थापन में परिवर्तन की समय दर है।",
              "त्वरण वेग में परिवर्तन की दर को दर्शाता है (a = Δv/Δt)।"
            ],
            "contentHtml": "\n<h3>1. गतििकी के मुख्य सिद्धांत</h3>\n<p>सरल रेखा में गति में स्थिति, समय, वेग और त्वरण शामिल होते हैं। यदि कोई वस्तु समय अंतराल $\\Delta t$ में $x_1$ से $x_2$ तक विस्थापित होती है, तो उसका औसत वेग:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">v_{avg} = \\frac{\\Delta x}{\\Delta t} = \\frac{x_2 - x_1}{t_2 - t_1}</div>\n    <div class=\"formula-line\">v_{avg} = \\frac{100\\text{ m} - 20\\text{ m}}{4\\text{ s}} = 20\\text{ m/s}</div>\n</div>\n\n<h3>2. त्वरण (Acceleration) का सूत्र</h3>\n<p><strong>Acceleration</strong> यह मापता है कि वेग कितनी तेजी से बदल रहा है:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a = \\frac{v - u}{t}</div>\n    <div class=\"formula-line\">a = \\frac{25\\text{ m/s} - 5\\text{ m/s}}{5\\text{ s}} = 4\\text{ m/s}^2</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: वाहन का त्वरण</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> प्रारंभिक वेग u = 10 m/s, अंतिम वेग v = 30 m/s, समय t = 4 s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>a = (v - u) / t</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a = (30 - 10) / 4 = 20 / 4 = 5 m/s²</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> वाहन का त्वरण 5 m/s² है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. एक रेलगाड़ी $36\\text{ m/s}$ की गति से चलकर $12\\text{ s}$ में विराम अवस्था में आती है। मंदन ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "विस्थापन, वेग आणि त्वरण",
            "keyPoints": [
              "अंतर म्हणजे कापलेला एकूण मार्ग, तर विस्थापन हे आरंभ आणि शेवटच्या बिंदूमधील किमान सदिश अंतर आहे.",
              "सरासरी वेग म्हणजे विस्थापनातील बदलाचा दर होय.",
              "त्वरण म्हणजे वेगातील बदलाचा दर (a = Δv/Δt)."
            ],
            "contentHtml": "\n<h3>1. रेषीय गतीची मूलतत्त्वे</h3>\n<p>एका सरळ रेषेत वस्तू गतिमान असताना विस्थापन वेळेनुसार बदलते:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">v_{avg} = \\frac{\\Delta x}{\\Delta t} = \\frac{x_2 - x_1}{t_2 - t_1}</div>\n    <div class=\"formula-line\">v_{avg} = \\frac{100\\text{ m} - 20\\text{ m}}{4\\text{ s}} = 20\\text{ m/s}</div>\n</div>\n\n<h3>2. त्वरणाचे सूत्र (Acceleration)</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a = \\frac{v - u}{t}</div>\n    <div class=\"formula-line\">a = \\frac{25\\text{ m/s} - 5\\text{ m/s}}{5\\text{ s}} = 4\\text{ m/s}^2</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: वाहनाचे त्वरण</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> आरंभीचा वेग u = 10 m/s, अंतिम वेग v = 30 m/s, वेळ t = 4 s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>a = (v - u) / t</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a = (30 - 10) / 4 = 20 / 4 = 5 m/s²</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> वाहनाचे त्वरण 5 m/s² आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. $36\\text{ m/s}$ वेगाने धावणारी गाडी $12\\text{ s}$ मध्ये थांबते. गाडीचे मंदन काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Displacement",
            "enDef": "Vector quantity representing shortest straight-line distance between initial and final points.",
            "hiEquiv": "विस्थापन",
            "mrEquiv": "विस्थापन"
          },
          {
            "term": "Acceleration",
            "enDef": "Rate of change of velocity with respect to time.",
            "hiEquiv": "त्वरण",
            "mrEquiv": "त्वरण"
          }
        ]
      },
      {
        "order": 3,
        "title": "Graphical Analysis: Position, Velocity & Time",
        "keyPoints": [
          "The slope of a position-time graph yields the instantaneous velocity.",
          "The slope of a velocity-time graph represents the instantaneous acceleration.",
          "The area under a velocity-time graph equals the total displacement traveled."
        ],
        "contentHtml": "\n<h3>1. Interpreting Kinematic Graphs</h3>\n<p>Graphs provide immediate visual understanding of physical motion. For a position-time graph ($x$-$t$), slope $\\frac{dx}{dt}$ gives velocity. For a velocity-time graph ($v$-$t$), slope gives acceleration:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Slope} = \\frac{\\Delta v}{\\Delta t} = a</div>\n    <div class=\"formula-line\">\\text{Area under curve} = \\int v \\, dt = \\Delta x</div>\n</div>\n\n<h3>2. Calculating Displacement from Geometry</h3>\n<p>For uniform acceleration starting from initial velocity $u$ to final velocity $v$ in time $t$, the area under the $v$-$t$ graph forms a trapezoid:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">s = \\frac{1}{2}(u + v)t</div>\n    <div class=\"formula-line\">s = \\frac{1}{2}(10\\text{ m/s} + 30\\text{ m/s})(4\\text{ s}) = 80\\text{ m}</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Area Under v-t Graph</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Triangle base (time) t = 6 s, height (peak velocity) v = 18 m/s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Displacement = (1/2) × base × height</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">s = (1/2) × 6 × 18 = 3 × 18 = 54 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Total displacement traveled during the phase is 54 m.</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. Describe the physical state of a particle whose position-time graph is a horizontal straight line.<br/>\n2. A car starts from rest, accelerates uniformly for $10\\text{ s}$ reaching $20\\text{ m/s}$, and cruises for $20\\text{ s}$. Determine the total distance using graph areas.</p>",
        "translations": {
          "hi": {
            "title": "ग्राफिकल विश्लेषण: स्थिति, वेग एवं समय",
            "keyPoints": [
              "स्थिति-समय ग्राफ का ढाल तात्कालिक वेग प्रदान करता है।",
              "वेग-समय ग्राफ का ढाल तात्कालिक त्वरण दर्शाता है।",
              "वेग-समय ग्राफ के नीचे का क्षेत्रफल कुल विस्थापन के बराबर होता है।"
            ],
            "contentHtml": "\n<h3>1. गतिकीय ग्राफ की व्याख्या</h3>\n<p>ग्राफ गति को समझने का सबसे स्पष्ट साधन हैं। स्थिति-समय ग्राफ ($x$-$t$) का ढाल वेग देता है, जबकि वेग-समय ग्राफ ($v$-$t$) का ढाल <strong>Acceleration</strong> दर्शाता है:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Slope} = \\frac{\\Delta v}{\\Delta t} = a</div>\n    <div class=\"formula-line\">\\text{Area under curve} = \\int v \\, dt = \\Delta x</div>\n</div>\n\n<h3>2. ग्राफ द्वारा विस्थापन गणना</h3>\n<p>एकसमान त्वरण में वेग-समय ग्राफ का क्षेत्रफल समलंब चतुर्भुज बनता है:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">s = \\frac{1}{2}(u + v)t</div>\n    <div class=\"formula-line\">s = \\frac{1}{2}(10\\text{ m/s} + 30\\text{ m/s})(4\\text{ s}) = 80\\text{ m}</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: v-t ग्राफ द्वारा विस्थापन</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> समय आधार t = 6 s, शीर्ष वेग v = 18 m/s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>विस्थापन = (1/2) × base × height</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">s = (1/2) × 6 × 18 = 3 × 18 = 54 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> तय किया गया कुल विस्थापन 54 m है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. यदि किसी कण का स्थिति-समय ग्राफ समय अक्ष के समानांतर सरल रेखा हो, तो कण की गति अवस्था बताइए।</p>"
          },
          "mr": {
            "title": "आलेखीय विश्लेषण: स्थान, वेग आणि वेळ",
            "keyPoints": [
              "स्थान-वेळ आलेखाचा चढ तात्कालिक वेग दर्शवतो.",
              "वेग-वेळ आलेखाचा चढ तात्कालिक त्वरण दर्शवतो.",
              "वेग-वेळ आलेखाखालील क्षेत्रफळ एकूण विस्थापन दर्शवते."
            ],
            "contentHtml": "\n<h3>1. गती आलेखांचे स्पष्टीकरण</h3>\n<p>स्थान-वेळ आलेखाचा चढ वेग दर्शवतो, आणि वेग-वेळ आलेखाचा चढ <strong>Acceleration</strong> दर्शवतो:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Slope} = \\frac{\\Delta v}{\\Delta t} = a</div>\n    <div class=\"formula-line\">\\text{Area under curve} = \\int v \\, dt = \\Delta x</div>\n</div>\n\n<h3>2. क्षेत्रफळावरून विस्थापन शोधणे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">s = \\frac{1}{2}(u + v)t</div>\n    <div class=\"formula-line\">s = \\frac{1}{2}(10\\text{ m/s} + 30\\text{ m/s})(4\\text{ s}) = 80\\text{ m}</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: आलेखावरून विस्थापन</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> वेळ t = 6 s, कमाल वेग v = 18 m/s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>विस्थापन = (1/2) × base × height</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">s = (1/2) × 6 × 18 = 54 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> एकूण कापलेले विस्थापन 54 m आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. स्थिर उभ्या असणाऱ्या वस्तूचा स्थान-वेळ आलेख कसा दिसेल ते सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Slope",
            "enDef": "Gradient of a curve representing rate of change.",
            "hiEquiv": "ढाल",
            "mrEquiv": "चढ"
          }
        ]
      },
      {
        "order": 4,
        "title": "Equations of Uniformly Accelerated Motion",
        "keyPoints": [
          "The three kinematic equations apply exclusively to motion under constant acceleration.",
          "v = u + at relates initial velocity, acceleration, and final velocity over time.",
          "s = ut + (1/2)at² determines displacement from initial conditions.",
          "v² = u² + 2as connects velocities and displacement independently of elapsed time."
        ],
        "contentHtml": "\n<h3>1. The Three Fundamental Kinematic Equations</h3>\n<p>For rectilinear motion with constant acceleration $a$, initial velocity $u$, final velocity $v$, displacement $s$, and elapsed time $t$, three foundational kinematic equations govern the motion:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">v = u + at</div>\n    <div class=\"formula-line\">s = ut + \\frac{1}{2}at^2</div>\n    <div class=\"formula-line\">v^2 = u^2 + 2as</div>\n</div>\n\n<h3>2. Free Fall Under Gravity</h3>\n<p>When an object moves vertically in a vacuum near Earth's surface, acceleration is $g = 9.8\\text{ m/s}^2$ downward. Substituting $a = g$ into equation 2 with $u = 0$:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">h = \\frac{1}{2}gt^2</div>\n    <div class=\"formula-line\">h = \\frac{1}{2}(9.8\\text{ m/s}^2)(3\\text{ s})^2 = 44.1\\text{ m}</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Braking Distance Calculation</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Initial velocity u = 20 m/s, Final velocity v = 0 m/s, Deceleration a = -4 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>v² = u² + 2as  ⇒  s = (v² - u²) / (2a)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">s = (0² - 20²) / (2 × -4) = -400 / -8 = 50 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The vehicle requires 50 m of stopping distance.</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. A ball dropped from rest hits the ground with a speed of $29.4\\text{ m/s}$. Find the fall duration ($g = 9.8\\text{ m/s}^2$).<br/>\n2. An airplane accelerates along a runway from rest at $3\\text{ m/s}^2$ for $30\\text{ s}$ before takeoff. Calculate the runway length used.</p>",
        "translations": {
          "hi": {
            "title": "एकसमान त्वरित गति के समीकरण",
            "keyPoints": [
              "गति के तीन समीकरण केवल नियत त्वरण की स्थिति में ही लागू होते हैं।",
              "v = u + at प्रारंभिक वेग, त्वरण तथा समय के बीच संबंध दर्शाता है।",
              "s = ut + (1/2)at² समय के साथ विस्थापन की गणना करता है।",
              "v² = u² + 2as समय के बिना वेग और विस्थापन का सीधा संबंध देता है।"
            ],
            "contentHtml": "\n<h3>1. एकसमान त्वरण के तीन मूल समीकरण</h3>\n<p>जब त्वरण $a$ नियत हो, तब प्रारंभिक वेग $u$, अंतिम वेग $v$, समय $t$ और विस्थापन $s$ के बीच संबंध:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">v = u + at</div>\n    <div class=\"formula-line\">s = ut + \\frac{1}{2}at^2</div>\n    <div class=\"formula-line\">v^2 = u^2 + 2as</div>\n</div>\n\n<h3>2. गुरुत्वाकर्षण के अंतर्गत मुक्त पतन</h3>\n<p>पृथ्वी की सतह के निकट गुरुत्वीय त्वरण $g = 9.8\\text{ m/s}^2$ होता है। यदि वस्तु को विरामावस्था ($u = 0$) से छोड़ा जाए:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">h = \\frac{1}{2}gt^2</div>\n    <div class=\"formula-line\">h = \\frac{1}{2}(9.8\\text{ m/s}^2)(3\\text{ s})^2 = 44.1\\text{ m}</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: अवरोधन दूरी (Stopping Distance)</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> प्रारंभिक वेग u = 20 m/s, अंतिम वेग v = 0 m/s, मंदन a = -4 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>v² = u² + 2as  ⇒  s = (v² - u²) / (2a)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">s = (0² - 20²) / (2 × -4) = -400 / -8 = 50 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> वाहन को रुकने के लिए 50 m की दूरी आवश्यक है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. एक गेंद को विरामावस्था से गिराने पर वह $29.4\\text{ m/s}$ के वेग से भूमि से टकराती है। गिरने में लगा समय ज्ञात कीजिए ($g = 9.8\\text{ m/s}^2$)।</p>"
          },
          "mr": {
            "title": "एकसमान त्वरणीत गतीची समीकरणे",
            "keyPoints": [
              "गतीची तीन समीकरणे केवळ स्थिर त्वरणासाठी लागू होतात.",
              "v = u + at वेग, त्वरण आणि वेळ यांतील संबंध दर्शवते.",
              "s = ut + (1/2)at² विस्थापन मोजण्यासाठी वापरले जाते.",
              "v² = u² + 2as वेळेचा उल्लेख न करता वेग आणि अंतराचा संबंध देते."
            ],
            "contentHtml": "\n<h3>1. गतीची मूलभूत तीन समीकरणे</h3>\n<p>स्थिर <strong>Acceleration</strong> साठी ही समीकरणे लागू होतात:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">v = u + at</div>\n    <div class=\"formula-line\">s = ut + \\frac{1}{2}at^2</div>\n    <div class=\"formula-line\">v^2 = u^2 + 2as</div>\n</div>\n\n<h3>2. गुरुत्वाकर्षणाखालील मुक्त पतन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">h = \\frac{1}{2}gt^2</div>\n    <div class=\"formula-line\">h = \\frac{1}{2}(9.8\\text{ m/s}^2)(3\\text{ s})^2 = 44.1\\text{ m}</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: थांबण्याचे अंतर (Braking Distance)</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> सुरुवातीचा वेग u = 20 m/s, अंतिम वेग v = 0 m/s, मंदन a = -4 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>v² = u² + 2as  ⇒  s = (v² - u²) / (2a)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">s = (0² - 20²) / (2 × -4) = -400 / -8 = 50 m</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> गाडी थांबण्यासाठी 50 m अंतर लागते.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. एका वस्तूची गती स्थिर ठेवून $30\\text{ s}$ मध्ये $3\\text{ m/s}^2$ त्वरणाने कापलेले अंतर काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Free Fall",
            "enDef": "Motion of an object under sole influence of gravitational force.",
            "hiEquiv": "मुक्त पतन",
            "mrEquiv": "मुक्त पतन"
          }
        ]
      },
      {
        "order": 5,
        "title": "Newton’s First & Second Laws of Motion",
        "keyPoints": [
          "Newton’s First Law states bodies persist in uniform motion unless acted upon by an external net force.",
          "Inertia is the inherent property of matter directly proportional to mass.",
          "Newton’s Second Law establishes the fundamental quantitative relation: Force = mass × acceleration.",
          "One Newton is defined as the force required to accelerate 1 kg at 1 m/s²."
        ],
        "contentHtml": "\n<h3>1. Newton’s First Law & Principle of Inertia</h3>\n<p>Sir Isaac Newton formulated the foundation of classical dynamics. The <strong>First Law of Motion</strong> states that an object continues in its state of rest or uniform motion in a straight line unless compelled to change that state by forces impressed upon it. Mass serves as the direct quantitative measure of an object’s <strong>Inertia</strong>.</p>\n\n<h3>2. Newton’s Second Law of Motion</h3>\n<p>The rate of change of momentum of a body is directly proportional to the applied force and occurs in the direction in which the force acts. For constant mass $m$:</p>\n\n<p>The <strong>Force</strong> acting on an object of mass <strong>5 kg</strong> with an acceleration of <strong>2 m/s²</strong> is <strong>10 N</strong>.</p>\n\n<div class=\"formula-box\">\n    <div class=\"formula-line\">F = m \\times a</div>\n    <div class=\"formula-line\">F = 5 \\times 2 = 10\\text{ N}</div>\n</div>\n\n<h3>3. Solved Numerical Sums</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example 1: Net Force Calculation</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Mass m = 1500 kg, Acceleration a = 3 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>F = m × a</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F = 1500 × 3 = 4500 N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The required net propelling force is 4500 N (or 4.5 kN).</p>\n</div>\n\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example 2: Acceleration from Applied Force</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Applied Force F = 60 N, Mass m = 12 kg</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>a = F / m</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a = 60 / 12 = 5 m/s²</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The resulting acceleration is 5 m/s².</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. A hockey puck of mass $0.16\\text{ kg}$ is struck with a force of $80\\text{ N}$. Calculate the instant acceleration imparted.<br/>\n2. Explain why a passenger lunges forward when a fast-moving bus suddenly applies brakes.</p>",
        "translations": {
          "hi": {
            "title": "न्यूटन के गति के प्रथम एवं द्वितीय नियम",
            "keyPoints": [
              "न्यूटन का प्रथम नियम कहता है कि वस्तु अपनी विरामावस्था या सरल रेखा में एकसमान गति को तब तक बनाए रखती है जब तक उस पर बाह्य बल न लगे।",
              "जड़त्व द्रव्यमान का स्वाभाविक गुण है जो वस्तु के द्रव्यमान के समानुपाती होता है।",
              "द्वितीय नियम बल का मात्रात्मक सूत्र स्थापित करता है: Force = mass × acceleration.",
              "1 Newton वह बल है जो 1 kg के पिंड में 1 m/s² का त्वरण उत्पन्न करता है।"
            ],
            "contentHtml": "\n<h3>1. न्यूटन का प्रथम नियम एवं जड़त्व</h3>\n<p>न्यूटन का <strong>प्रथम नियम</strong> यह सिद्ध करता है कि कोई भी वस्तु अपनी विरामावस्था अथवा एकसमान गति की अवस्था को तब तक नहीं बदलती जब तक उस पर कोई असंतुलित बाह्य <strong>Force</strong> न लगाया जाए। इसे <strong>Inertia</strong> का नियम भी कहते हैं।</p>\n\n<h3>2. न्यूटन का द्वितीय नियम</h3>\n<p>किसी पिंड के संवेग परिवर्तन की दर उस पर लगाए गए बल के अनुक्रमानुपाती होती है।</p>\n\n<p>किसी वस्तु का द्रव्यमान <strong>5 kg</strong> है और उसका त्वरण <strong>2 m/s²</strong> है, तो उस पर लगने वाला <strong>Force 10 N</strong> होगा।</p>\n\n<div class=\"formula-box\">\n    <div class=\"formula-line\">F = m \\times a</div>\n    <div class=\"formula-line\">F = 5 \\times 2 = 10\\text{ N}</div>\n</div>\n\n<h3>3. हल किए गए संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण 1: कुल बल की गणना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> द्रव्यमान m = 1500 kg, त्वरण a = 3 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>F = m × a</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F = 1500 × 3 = 4500 N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> आवश्यक कुल बल 4500 N (4.5 kN) है।</p>\n</div>\n\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण 2: बल से त्वरण ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> आरोपित बल F = 60 N, द्रव्यमान m = 12 kg</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>a = F / m</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a = 60 / 12 = 5 m/s²</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> उत्पन्न त्वरण 5 m/s² है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. $0.16\\text{ kg}$ की वस्तु पर $80\\text{ N}$ का बल लगाने पर उत्पन्न त्वरण ज्ञात कीजिए।<br/>\n2. बस के अचानक रुकने पर यात्री आगे की ओर क्यों झुक जाते हैं? जड़त्व के आधार पर समझाइए।</p>"
          },
          "mr": {
            "title": "न्यूटनचे गतीविषयक पहिला व दुसरा नियम",
            "keyPoints": [
              "न्यूटनचा पहिला नियम सांगतो की बाह्य असंतुलित बल कार्य करत नाही तोपर्यंत वस्तू आपली मूळ स्थिती कायम ठेवते.",
              "जडत्व हा वस्तूच्या वस्तुमानावर अवलंबून असणारा मूलभूत गुणधर्म आहे.",
              "दुसरा नियम बलाचे परिमाण देतो: Force = mass × acceleration.",
              "1 Newton म्हणजे 1 kg वस्तुमानाच्या वस्तूत 1 m/s² त्वरण निर्माण करणारे बल."
            ],
            "contentHtml": "\n<h3>1. न्यूटनचा पहिला नियम व जडत्व</h3>\n<p>कोणत्याही वस्तूवर जोपर्यंत बाह्य असंतुलित <strong>Force</strong> कार्य करत नाही, तोपर्यंत ती वस्तू आपल्या स्थिर स्थितीत किंवा सरळ रेषेतील एकसमान गतीत कायम राहते. याला <strong>Inertia</strong> चा नियम म्हणतात.</p>\n\n<h3>2. न्यूटनचा दुसरा नियम</h3>\n<p>संवेग परिवर्तनाचा दर प्रयुक्त बलाशी समप्रमाणात असतो आणि संवेगाचे परिवर्तन बलाच्या दिशेने होते.</p>\n\n<p>एखाद्या वस्तूचे वस्तुमान <strong>5 kg</strong> आहे आणि तिचे त्वरण <strong>2 m/s²</strong> आहे, तर तिच्यावर कार्य करणारे <strong>Force 10 N</strong> असेल.</p>\n\n<div class=\"formula-box\">\n    <div class=\"formula-line\">F = m \\times a</div>\n    <div class=\"formula-line\">F = 5 \\times 2 = 10\\text{ N}</div>\n</div>\n\n<h3>3. सोडवलेली उदाहरणे</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण 1: प्रयुक्त बलाची गणना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> वस्तुमान m = 1500 kg, त्वरण a = 3 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>F = m × a</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F = 1500 × 3 = 4500 N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> एकूण आवश्यक बल 4500 N (4.5 kN) आहे.</p>\n</div>\n\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण 2: त्वरणाची गणना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> प्रयुक्त बल F = 60 N, वस्तुमान m = 12 kg</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>a = F / m</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">a = 60 / 12 = 5 m/s²</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> निर्माण झालेले त्वरण 5 m/s² आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. $0.16\\text{ kg}$ वस्तुमानाच्या वस्तूवर $80\\text{ N}$ बल लावल्यास निर्माण होणारे त्वरण काढा.<br/>\n2. चालत्या बसने अचानक ब्रेक लावल्यास प्रवासी पुढे का झुकतात? शास्त्रीय कारण स्पष्ट करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Force",
            "enDef": "An interaction that causes an object with mass to change its velocity.",
            "hiEquiv": "बल",
            "mrEquiv": "बल"
          },
          {
            "term": "Inertia",
            "enDef": "The resistance of any physical object to any change in its velocity.",
            "hiEquiv": "जड़त्व",
            "mrEquiv": "जडत्व"
          },
          {
            "term": "Mass",
            "enDef": "Quantitative measure of inertia, measured in kilograms (kg).",
            "hiEquiv": "द्रव्यमान",
            "mrEquiv": "वस्तुमान"
          }
        ]
      },
      {
        "order": 6,
        "title": "Newton’s Third Law & Momentum Conservation",
        "keyPoints": [
          "To every action there is an equal and opposite reaction acting on distinct bodies.",
          "Linear momentum is defined as the product of mass and velocity (p = m × v).",
          "In an isolated system without external forces, total linear momentum is strictly conserved."
        ],
        "contentHtml": "\n<h3>1. Action and Reaction Principles</h3>\n<p>Newton’s Third Law reveals that forces always occur in matched pairs: $\\vec{F}_{AB} = -\\vec{F}_{BA}$. These forces act on two separate bodies, which prevents them from canceling each other internally.</p>\n\n<h3>2. Law of Conservation of Linear Momentum</h3>\n<p>Linear momentum is $\\vec{p} = m \\vec{v}$. In any closed collision between bodies 1 and 2:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2</div>\n    <div class=\"formula-line\">p_{total, initial} = p_{total, final}</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Rifle Recoil Velocity</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Rifle mass M = 4 kg, Bullet mass m = 0.05 kg, Bullet muzzle velocity v = 400 m/s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>V_{recoil} = - (m × v) / M</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">V_{recoil} = - (0.05 × 400) / 4 = - 20 / 4 = -5 m/s</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The recoil velocity of the rifle is 5 m/s backwards (-5 m/s).</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. A skater of mass $60\\text{ kg}$ pushes another skater of mass $40\\text{ kg}$ away with a force of $120\\text{ N}$. State the magnitude of force experienced by the first skater.<br/>\n2. Calculate the velocity of a $2000\\text{ kg}$ railway wagon colliding and coupling with a stationary $3000\\text{ kg}$ wagon if initial speed was $5\\text{ m/s}$.</p>",
        "translations": {
          "hi": {
            "title": "न्यूटन का तृतीय नियम एवं संवेग संरक्षण",
            "keyPoints": [
              "प्रत्येक क्रिया के बराबर और विपरीत प्रतिक्रिया होती है जो अलग-अलग वस्तुओं पर कार्य करती है।",
              "रैखिक संवेग द्रव्यमान और वेग का गुणनफल है (p = m × v)।",
              "बाह्य बल की अनुपस्थिति में किसी निकाय का कुल संवेग संरक्षित रहता है।"
            ],
            "contentHtml": "\n<h3>1. क्रिया एवं प्रतिक्रिया का नियम</h3>\n<p>न्यूटन का तृतीय नियम स्पष्ट करता है कि बल सदैव युगलों में उत्पन्न होते हैं: $\\vec{F}_{AB} = -\\vec{F}_{BA}$। क्रिया और प्रतिक्रिया भिन्न-भिन्न वस्तुओं पर लगती हैं।</p>\n\n<h3>2. संवेग संरक्षण का नियम</h3>\n<p>संवेग $\\vec{p} = m \\vec{v}$ होता है। संघट्ट (collision) के पूर्व और पश्चात कुल संवेग अपरिवर्तित रहता है:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2</div>\n    <div class=\"formula-line\">p_{total, initial} = p_{total, final}</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: बंदूक का प्रतिक्षेप वेग (Recoil Velocity)</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> बंदूक का द्रव्यमान M = 4 kg, गोली का द्रव्यमान m = 0.05 kg, गोली का वेग v = 400 m/s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>V_{recoil} = - (m × v) / M</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">V_{recoil} = - (0.05 × 400) / 4 = - 20 / 4 = -5 m/s</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> बंदूक का प्रतिक्षेप वेग पीछे की ओर 5 m/s है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. रॉकेट नोदन किस भौतिक सिद्धांत पर कार्य करता है? संवेग संरक्षण द्वारा स्पष्ट कीजिए।</p>"
          },
          "mr": {
            "title": "न्यूटनचा तिसरा नियम आणि संवेग अक्षय्यता",
            "keyPoints": [
              "प्रत्येक क्रियेला समान व विरुद्ध दिशेने प्रतिक्रिया असते आणि ती वेगवेगळ्या वस्तूंवर घडते.",
              "रेषीय संवेग म्हणजे वस्तुमान व वेगाचा गुणाकार (p = m × v).",
              "बाह्य बल कार्यरत नसल्यास एकूण संवेग स्थिर राहतो."
            ],
            "contentHtml": "\n<h3>1. क्रिया आणि प्रतिक्रिया तत्त्व</h3>\n<p>न्यूटनचा तिसरा नियम सांगतो की बले नेहमी जोडीने अस्तित्वात असतात: $\\vec{F}_{AB} = -\\vec{F}_{BA}$:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2</div>\n    <div class=\"formula-line\">p_{total, initial} = p_{total, final}</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: बंदुकीचा प्रतिक्षेप वेग (Recoil)</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> बंदुकीचे वस्तुमान M = 4 kg, गोळीचे वस्तुमान m = 0.05 kg, गोळीचा वेग v = 400 m/s</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>V_{recoil} = - (m × v) / M</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">V_{recoil} = - (0.05 × 400) / 4 = - 20 / 4 = -5 m/s</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> बंदुकीचा मागे सरकण्याचा प्रतिक्षेप वेग 5 m/s आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. अग्निबाण (Rocket) उड्डाण संवेग अक्षय्यतेच्या नियमाने कसे घडते ते स्पष्ट करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Momentum",
            "enDef": "Product of mass and velocity of an object in motion.",
            "hiEquiv": "संवेग",
            "mrEquiv": "संवेग"
          }
        ]
      },
      {
        "order": 7,
        "title": "Work, Kinetic Energy & Potential Energy",
        "keyPoints": [
          "Work is done when a force produces displacement along its line of action: W = F × d × cos(θ).",
          "Kinetic energy is the energy possessed by virtue of motion: KE = (1/2)mv².",
          "Gravitational potential energy is stored due to position: PE = mgh."
        ],
        "contentHtml": "\n<h3>1. Physical Definition of Work</h3>\n<p>Work is scalar dot product of force vector and displacement vector. When angle between them is $\\theta$:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">W = \\vec{F} \\cdot \\vec{d} = F d \\cos\\theta</div>\n    <div class=\"formula-line\">1\\text{ Joule (J)} = 1\\text{ Newton} \\times 1\\text{ meter}</div>\n</div>\n\n<h3>2. Mechanical Energy Expressions</h3>\n<p>Translational kinetic energy ($KE$) and gravitational potential energy ($PE$) near Earth's surface:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">KE = \\frac{1}{2} m v^2</div>\n    <div class=\"formula-line\">PE = m g h</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Lifting a Water Tank Load</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Mass m = 50 kg, Height h = 10 m, Acceleration of gravity g = 9.8 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>W = m × g × h</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">W = 50 × 9.8 × 10 = 4900 J</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The work done against gravity is 4900 Joules (4.9 kJ).</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. Calculate the kinetic energy of an athlete of mass $70\\text{ kg}$ running at $10\\text{ m/s}$.<br/>\n2. A force of $150\\text{ N}$ pulls a crate across a floor for $8\\text{ m}$ at an angle of $60^\\circ$ to the horizontal. Find the work done.</p>",
        "translations": {
          "hi": {
            "title": "कार्य, गतिज ऊर्जा एवं स्थितिज ऊर्जा",
            "keyPoints": [
              "कार्य तब होता है जब बल की दिशा में विस्थापन हो: W = F × d × cos(θ)।",
              "गतिज ऊर्जा गति के कारण उत्पन्न ऊर्जा है: KE = (1/2)mv²।",
              "गुरुत्वीय स्थितिज ऊर्जा स्थिति अथवा ऊंचाई के कारण संचित ऊर्जा है: PE = mgh।"
            ],
            "contentHtml": "\n<h3>1. कार्य की वैज्ञानिक परिभाषा</h3>\n<p>कार्य बल और विस्थापन का अदिश गुणनफल है:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">W = \\vec{F} \\cdot \\vec{d} = F d \\cos\\theta</div>\n    <div class=\"formula-line\">1\\text{ Joule (J)} = 1\\text{ Newton} \\times 1\\text{ meter}</div>\n</div>\n\n<h3>2. यांत्रिक ऊर्जा के रूप</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">KE = \\frac{1}{2} m v^2</div>\n    <div class=\"formula-line\">PE = m g h</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: ऊंचाई पर भार उठाना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> द्रव्यमान m = 50 kg, ऊंचाई h = 10 m, गुरुत्वीय त्वरण g = 9.8 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>W = m × g × h</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">W = 50 × 9.8 × 10 = 4900 J</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> गुरुत्वाकर्षण के विरुद्ध किया गया कार्य 4900 Joules (4.9 kJ) है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. $70\\text{ kg}$ का धावक $10\\text{ m/s}$ की चाल से दौड़ रहा है। उसकी गतिज ऊर्जा ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "कार्य, गतिज ऊर्जा आणि स्थितिज ऊर्जा",
            "keyPoints": [
              "बलाच्या दिशेने विस्थापन घडून आल्यास कार्य झाले असे म्हणतात: W = F × d × cos(θ).",
              "गतीमुळे प्राप्त होणाऱ्या ऊर्जेला गतिज ऊर्जा म्हणतात: KE = (1/2)mv².",
              "विशिष्ट स्थानामुळे साठवलेल्या ऊर्जेला स्थितिज ऊर्जा म्हणतात: PE = mgh."
            ],
            "contentHtml": "\n<h3>1. कार्याची व्याख्या</h3>\n<p>कार्य म्हणजे प्रयुक्त बल आणि विस्थापनाचा गुणाकार:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">W = \\vec{F} \\cdot \\vec{d} = F d \\cos\\theta</div>\n    <div class=\"formula-line\">1\\text{ Joule (J)} = 1\\text{ Newton} \\times 1\\text{ meter}</div>\n</div>\n\n<h3>2. यांत्रिक ऊर्जेची सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">KE = \\frac{1}{2} m v^2</div>\n    <div class=\"formula-line\">PE = m g h</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: वजन उचलण्याचे कार्य</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> वस्तुमान m = 50 kg, उंची h = 10 m, g = 9.8 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>W = m × g × h</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">W = 50 × 9.8 × 10 = 4900 J</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> गुरुत्वाकर्षणाविरुद्ध झालेले कार्य 4900 Joules (4.9 kJ) आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. $70\\text{ kg}$ चा खेळाडू $10\\text{ m/s}$ वेगाने धावताना त्याची गतिज ऊर्जा काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Kinetic Energy",
            "enDef": "Energy possessed by an object due to its motion.",
            "hiEquiv": "गतिज ऊर्जा",
            "mrEquiv": "गतिज ऊर्जा"
          },
          {
            "term": "Potential Energy",
            "enDef": "Energy stored within an object due to position in a force field.",
            "hiEquiv": "स्थितिज ऊर्जा",
            "mrEquiv": "स्थितिज ऊर्जा"
          }
        ]
      },
      {
        "order": 8,
        "title": "Conservation of Energy, Power & Efficiency",
        "keyPoints": [
          "The Law of Conservation of Energy states energy cannot be created or destroyed, only transformed.",
          "Power is the rate at which work is performed: P = W/t, measured in Watts (W).",
          "Efficiency is the ratio of useful energy output to total energy input expressed as a percentage."
        ],
        "contentHtml": "\n<h3>1. Principle of Conservation of Mechanical Energy</h3>\n<p>In a conservative force field (like ideal gravity neglecting air friction), total mechanical energy remains invariant:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">E_{total} = KE + PE = \\text{constant}</div>\n    <div class=\"formula-line\">\\frac{1}{2} m v_1^2 + m g h_1 = \\frac{1}{2} m v_2^2 + m g h_2</div>\n</div>\n\n<h3>2. Power and Mechanical Efficiency</h3>\n<p><strong>Power</strong> measures the speed of energy conversion. <strong>Efficiency</strong> ($eta$) defines machine performance:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P = \\frac{W}{t} = \\vec{F} \\cdot \\vec{v}</div>\n    <div class=\"formula-line\">\\eta = \\left( \\frac{P_{out}}{P_{in}} \\right) \\times 100\\%</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Industrial Crane Power</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Load m = 800 kg, Lift height h = 15 m, Time t = 20 s, g = 9.8 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Work = m × g × h, Power = Work / t</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Work = 800 × 9.8 × 15 = 117,600 J \\n Power = 117,600 / 20 = 5880 W</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Crane output power is 5880 Watts (5.88 kW).</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. An electric pump consumes $2000\\text{ W}$ of electrical power and delivers $1600\\text{ W}$ of hydraulic work. Calculate its efficiency.<br/>\n2. A pendulum bob is pulled aside to a vertical height of $0.45\\text{ m}$ and released from rest. What is its speed at the lowest point?</p>",
        "translations": {
          "hi": {
            "title": "ऊर्जा संरक्षण, शक्ति एवं दक्षता",
            "keyPoints": [
              "ऊर्जा संरक्षण का नियम: ऊर्जा को न उत्पन्न किया जा सकता है और न नष्ट, केवल रूपांतरित किया जा सकता है।",
              "शक्ति कार्य करने की समय दर है: P = W/t, मात्रक Watt (W)।",
              "दक्षता उपयोगी निर्गत ऊर्जा और कुल निवेशित ऊर्जा का प्रतिशत अनुपात है।"
            ],
            "contentHtml": "\n<h3>1. यांत्रिक ऊर्जा संरक्षण का सिद्धांत</h3>\n<p>घर्षणहीन संरक्षी बलों के अंतर्गत कुल यांत्रिक ऊर्जा स्थिर रहती है:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">E_{total} = KE + PE = \\text{constant}</div>\n    <div class=\"formula-line\">\\frac{1}{2} m v_1^2 + m g h_1 = \\frac{1}{2} m v_2^2 + m g h_2</div>\n</div>\n\n<h3>2. शक्ति (Power) एवं दक्षता (Efficiency)</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P = \\frac{W}{t} = \\vec{F} \\cdot \\vec{v}</div>\n    <div class=\"formula-line\">\\eta = \\left( \\frac{P_{out}}{P_{in}} \\right) \\times 100\\%</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: क्रेन की उपयोगी शक्ति</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> भार m = 800 kg, ऊंचाई h = 15 m, समय t = 20 s, g = 9.8 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>Work = m × g × h, Power = Work / t</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Work = 800 × 9.8 × 15 = 117600 J  ⇒  Power = 117600 / 20 = 5880 W</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> क्रेन की शक्ति 5880 Watts (5.88 kW) है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. एक विद्युत मोटर $2000\\text{ W}$ ऊर्जा लेकर $1600\\text{ W}$ उपयोगी कार्य करती है। मोटर की दक्षता ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "ऊर्जा अक्षय्यता, शक्ती आणि कार्यक्षमता",
            "keyPoints": [
              "ऊर्जा निर्माणही करता येत नाही आणि नष्टही करता येत नाही; तिचे फक्त एका रूपातून दुसऱ्या रूपात रूपांतर होते.",
              "शक्ती म्हणजे कार्य करण्याचा दर: P = W/t, एकक Watt (W).",
              "कार्यक्षमता म्हणजे उपयुक्त ऊर्जा आणि इनपुट ऊर्जेचे टक्केवारीतील प्रमाण."
            ],
            "contentHtml": "\n<h3>1. यांत्रिक ऊर्जा अक्षय्यतेचा नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">E_{total} = KE + PE = \\text{constant}</div>\n    <div class=\"formula-line\">\\frac{1}{2} m v_1^2 + m g h_1 = \\frac{1}{2} m v_2^2 + m g h_2</div>\n</div>\n\n<h3>2. शक्ती व कार्यक्षमता</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P = \\frac{W}{t} = \\vec{F} \\cdot \\vec{v}</div>\n    <div class=\"formula-line\">\\eta = \\left( \\frac{P_{out}}{P_{in}} \\right) \\times 100\\%</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: क्रेनची शक्ती</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> भार m = 800 kg, उंची h = 15 m, वेळ t = 20 s, g = 9.8 m/s²</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>Work = m × g × h, Power = Work / t</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Work = 117600 J  ⇒  Power = 117600 / 20 = 5880 W</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> क्रेनची शक्ती 5880 Watts (5.88 kW) आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. $2000\\text{ W}$ वीज वापरून $1600\\text{ W}$ उपयुक्त पाणी उपसणाऱ्या पंपाची कार्यक्षमता काढा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Power",
            "enDef": "Rate of doing work or transferring energy per unit time.",
            "hiEquiv": "शक्ति",
            "mrEquiv": "शक्ती"
          },
          {
            "term": "Efficiency",
            "enDef": "Ratio of useful work performed to total energy expended.",
            "hiEquiv": "दक्षता",
            "mrEquiv": "कार्यक्षमता"
          }
        ]
      },
      {
        "order": 9,
        "title": "Universal Gravitation & Free Fall Motion",
        "keyPoints": [
          "Newton’s Universal Law of Gravitation: Every mass attracts every other mass with inverse square proportionality.",
          "Gravitational constant G = 6.674 × 10⁻¹¹ N m²/kg² is a fundamental cosmic constant.",
          "Surface gravity g = GM/R² determines weight independently of object mass."
        ],
        "contentHtml": "\n<h3>1. Newton’s Universal Law of Gravitation</h3>\n<p>Between any two spherical masses $m_1$ and $m_2$ separated by center-to-center distance $r$, mutual attraction is:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">F = G \\frac{m_1 m_2}{r^2}</div>\n    <div class=\"formula-line\">G = 6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2</div>\n</div>\n\n<h3>2. Gravitational Acceleration at Planet Surface</h3>\n<p>Equating gravitational force to weight $W = m g$ for a planet of mass $M$ and radius $R$:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">g = \\frac{G M}{R^2}</div>\n    <div class=\"formula-line\">g_{Earth} = \\frac{(6.674 \\times 10^{-11})(5.972 \\times 10^{24})}{(6.371 \\times 10^6)^2} \\approx 9.81\\text{ m/s}^2</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Gravitational Force Between Two Ships</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Masses m₁ = 20,000 kg, m₂ = 50,000 kg, Distance r = 10 m</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>F = G × (m₁ × m₂) / r²</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F = (6.674 × 10⁻¹¹) × (20000 × 50000) / (10²) = (6.674 × 10⁻¹¹) × 10⁹ / 100 = 6.674 × 10⁻⁴ N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The mutual gravitational attraction is 0.000667 N (6.674 × 10⁻⁴ N).</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. If Earth's radius were compressed to half its current size while keeping mass constant, what would happen to $g$?<br/>\n2. Calculate the gravitational weight of a $60\\text{ kg}$ astronaut on the Moon ($M_{moon} = 7.35 \\times 10^{22}\\text{ kg}$, $R_{moon} = 1.74 \\times 10^6\\text{ m}$).</p>",
        "translations": {
          "hi": {
            "title": "सार्वत्रिक गुरुत्वाकर्षण एवं मुक्त पतन गति",
            "keyPoints": [
              "न्यूटन का गुरुत्वाकर्षण नियम: प्रत्येक कण दूसरे कण को द्रव्यमानों के गुणनफल के समानुपाती और दूरी के वर्ग के व्युत्क्रमानुपाती बल से आकर्षित करता है।",
              "सार्वत्रिक गुरुत्वाकर्षण नियतांक G = 6.674 × 10⁻¹¹ N m²/kg² है।",
              "सतह पर गुरुत्वीय त्वरण g = GM/R² होता है।"
            ],
            "contentHtml": "\n<h3>1. न्यूटन का सार्वत्रिक गुरुत्वाकर्षण नियम</h3>\n<p>ब्रह्मांड में किन्हीं दो पिंडों $m_1$ और $m_2$ के बीच जिनकी दूरी $r$ है:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">F = G \\frac{m_1 m_2}{r^2}</div>\n    <div class=\"formula-line\">G = 6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2</div>\n</div>\n\n<h3>2. ग्रह की सतह पर गुरुत्वीय त्वरण (g)</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">g = \\frac{G M}{R^2}</div>\n    <div class=\"formula-line\">g_{Earth} \\approx 9.81\\text{ m/s}^2</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: दो जहाजों के बीच गुरुत्वाकर्षण बल</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> द्रव्यमान m₁ = 20000 kg, m₂ = 50000 kg, दूरी r = 10 m</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>F = G × (m₁ × m₂) / r²</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F = (6.674 × 10⁻¹¹) × (10⁹) / 100 = 6.674 × 10⁻⁴ N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> परस्पर आकर्षण बल 6.674 × 10⁻⁴ N है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. चंद्रमा की सतह पर $60\\text{ kg}$ के अंतरिक्ष यात्री का भार ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "वैश्विक गुरुत्वाकर्षण आणि मुक्त पतन गती",
            "keyPoints": [
              "न्यूटनचा वैश्विक गुरुत्वाकर्षणाचा नियम: विश्वातील प्रत्येक वस्तू दुसऱ्या वस्तूला आकर्षून घेते.",
              "गुरुत्वीय स्थिरांक G = 6.674 × 10⁻¹¹ N m²/kg² आहे.",
              "पृथ्वीवरील गुरुत्वीय त्वरण g = GM/R² = 9.81 m/s² असते."
            ],
            "contentHtml": "\n<h3>1. वैश्विक गुरुत्वाकर्षणाचा नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">F = G \\frac{m_1 m_2}{r^2}</div>\n    <div class=\"formula-line\">G = 6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2</div>\n</div>\n\n<h3>2. गुरुत्वीय त्वरण (g)</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">g = \\frac{G M}{R^2}</div>\n    <div class=\"formula-line\">g_{Earth} \\approx 9.81\\text{ m/s}^2</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: दोन वस्तूंमधील गुरुत्वीय बल</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> m₁ = 20000 kg, m₂ = 50000 kg, अंतर r = 10 m</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>F = G × (m₁ × m₂) / r²</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F = 6.674 × 10⁻⁴ N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> एकूण गुरुत्वीय आकर्षण बल 6.674 × 10⁻⁴ N आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. चंद्रावर गुरुत्वीय त्वरण पृथ्वीच्या एक षष्ठांश ($1/6$) का असते ते सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Gravitation",
            "enDef": "Fundamental attractive force acting between all masses in the universe.",
            "hiEquiv": "गुरुत्वाकर्षण",
            "mrEquiv": "गुरुत्वाकर्षण"
          }
        ]
      },
      {
        "order": 10,
        "title": "Circular Motion, Centripetal Force & Friction",
        "keyPoints": [
          "Uniform circular motion involves constant speed but continuously changing velocity vector.",
          "Centripetal acceleration is directed strictly toward center: a_c = v²/r.",
          "Centripetal force is provided by tension, gravity, normal force, or friction: F_c = m v² / r.",
          "Static and kinetic friction obey Coulomb laws: f_s ≤ μ_s N and f_k = μ_k N."
        ],
        "contentHtml": "\n<h3>1. Dynamics of Uniform Circular Motion</h3>\n<p>An object traversing a circular trajectory of radius $r$ at tangential speed $v$ experiences radial centripetal acceleration:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_c = \\frac{v^2}{r} = \\omega^2 r</div>\n    <div class=\"formula-line\">F_c = m a_c = \\frac{m v^2}{r}</div>\n</div>\n\n<h3>2. Maximum Safe Turning Speed with Friction</h3>\n<p>On a level unbanked curved road of radius $r$ with coefficient of static friction $\\mu_s$, maximum safe negotiating speed without skidding is:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">f_{max} = \\mu_s m g = \\frac{m v_{max}^2}{r}</div>\n    <div class=\"formula-line\">v_{max} = \\sqrt{\\mu_s g r}</div>\n</div>\n\n<h3>3. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Numerical Example: Centripetal Force on a Cornering Vehicle</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Car mass m = 1200 kg, Speed v = 15 m/s, Curve radius r = 50 m</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>F_c = (m × v²) / r</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F_c = (1200 × 15²) / 50 = (1200 × 225) / 50 = 270,000 / 50 = 5400 N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The necessary centripetal friction force is 5400 N.</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. A washing machine centrifuge drum of radius $0.3\\text{ m}$ rotates with tangential speed $12\\text{ m/s}$. Find the centripetal acceleration on wet clothing.<br/>\n2. Calculate the maximum safe speed for a car taking a flat turn of radius $80\\text{ m}$ on a dry asphalt road ($\\mu_s = 0.8$, $g = 9.8\\text{ m/s}^2$).</p>",
        "translations": {
          "hi": {
            "title": "वृत्तीय गति, अभिकेन्द्रीय बल एवं घर्षण",
            "keyPoints": [
              "एकसमान वृत्तीय गति में चाल स्थिर रहती है किंतु दिशा बदलने के कारण वेग निरंतर बदलता रहता है।",
              "अभिकेन्द्रीय त्वरण सदैव केंद्र की ओर निर्देशित होता है: a_c = v²/r।",
              "आवश्यक अभिकेन्द्रीय बल: F_c = m v² / r।",
              "घर्षण बल संपर्क सतह पर गति का विरोध करता है।"
            ],
            "contentHtml": "\n<h3>1. एकसमान वृत्तीय गति के सिद्धांत</h3>\n<p>त्रिज्या $r$ के वृत्ताकार पथ पर चाल $v$ से घूमते पिंड पर केंद्र की ओर अभिकेन्द्रीय त्वरण कार्य करता है:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_c = \\frac{v^2}{r} = \\omega^2 r</div>\n    <div class=\"formula-line\">F_c = m a_c = \\frac{m v^2}{r}</div>\n</div>\n\n<h3>2. मोड़ पर सुरक्षित चाल</h3>\n<p>समतल सड़क पर बिना फिसले सुरक्षित चाल:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">v_{max} = \\sqrt{\\mu_s g r}</div>\n    <div class=\"formula-line\">v_{max} = \\sqrt{0.5 \\times 9.8 \\times 50} = 15.65\\text{ m/s}</div>\n</div>\n\n<h3>3. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: मोड़ पर कार पर अभिकेन्द्रीय बल</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> कार का द्रव्यमान m = 1200 kg, वेग v = 15 m/s, मोड़ त्रिज्या r = 50 m</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>F_c = (m × v²) / r</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F_c = (1200 × 225) / 50 = 5400 N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> आवश्यक अभिकेन्द्रीय घर्षण बल 5400 N है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. $80\\text{ m}$ त्रिज्या वाले समतल मोड़ पर $\\mu_s = 0.8$ के लिए अधिकतम सुरक्षित चाल ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "वर्तुळाकार गती, अभिकेंद्री बल आणि घर्षण",
            "keyPoints": [
              "एकसमान वर्तुळाकार गतीत वेग बदलत असल्याने त्वरण निर्माण होते.",
              "अभिकेंद्री त्वरण वर्तुळाच्या केंद्राकडे निर्देशित असते: a_c = v²/r.",
              "अभिकेंद्री बल: F_c = m v² / r."
            ],
            "contentHtml": "\n<h3>1. वर्तुळाकार गती आणि अभिकेंद्री बल</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">a_c = \\frac{v^2}{r} = \\omega^2 r</div>\n    <div class=\"formula-line\">F_c = m a_c = \\frac{m v^2}{r}</div>\n</div>\n\n<h3>2. सुरक्षित वेगाची मर्यादा</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">v_{max} = \\sqrt{\\mu_s g r}</div>\n    <div class=\"formula-line\">v_{max} = \\sqrt{0.5 \\times 9.8 \\times 50} = 15.65\\text{ m/s}</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">संख्यात्मक उदाहरण: वाहनावरील अभिकेंद्री बल</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> गाडीचे वस्तुमान m = 1200 kg, वेग v = 15 m/s, वळणाची त्रिज्या r = 50 m</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>F_c = (m × v²) / r</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">F_c = (1200 × 15²) / 50 = 5400 N</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> आवश्यक अभिकेंद्री बल 5400 N आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. पृथ्वीभोवती फिरणाऱ्या उपग्रहासाठी आवश्यक अभिकेंद्री बल कशामुळे मिळते ते सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Centripetal Force",
            "enDef": "A net force that acts on an object to keep it moving along a circular path.",
            "hiEquiv": "अभिकेन्द्रीय बल",
            "mrEquiv": "अभिकेंद्री बल"
          }
        ]
      }
    ]
  },
  {
    "id": "seed-course-chemistry",
    "title": "Chemistry Basics",
    "subject": "Chemistry",
    "description": "Comprehensive study of atomic theory, periodic trends, stoichiometry, chemical equations, gas laws, solutions, acids and bases, equilibrium, and thermodynamics.",
    "offlinePackageSizeMb": 13.9,
    "quizzes": [
      {
        "title": "Chemistry Quiz 1 – Atoms & The Periodic Table",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "What subatomic particle determines the atomic number of an element?",
            "options": [
              {
                "label": "A",
                "text": "Neutron"
              },
              {
                "label": "B",
                "text": "Proton"
              },
              {
                "label": "C",
                "text": "Electron"
              },
              {
                "label": "D",
                "text": "Positron"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "Atoms of the same element that have different numbers of neutrons are known as:",
            "options": [
              {
                "label": "A",
                "text": "Isotopes"
              },
              {
                "label": "B",
                "text": "Allotropes"
              },
              {
                "label": "C",
                "text": "Isomers"
              },
              {
                "label": "D",
                "text": "Isobars"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 3,
            "prompt": "Which group on the periodic table contains unreactive noble gases with full valence octets?",
            "options": [
              {
                "label": "A",
                "text": "Group 1 (Alkali metals)"
              },
              {
                "label": "B",
                "text": "Group 17 (Halogens)"
              },
              {
                "label": "C",
                "text": "Group 18 (Noble gases)"
              },
              {
                "label": "D",
                "text": "Group 2 (Alkaline earth metals)"
              }
            ],
            "correctIndex": 2
          },
          {
            "order": 4,
            "prompt": "Which element is the most electronegative on the periodic table?",
            "options": [
              {
                "label": "A",
                "text": "Oxygen"
              },
              {
                "label": "B",
                "text": "Chlorine"
              },
              {
                "label": "C",
                "text": "Fluorine"
              },
              {
                "label": "D",
                "text": "Sodium"
              }
            ],
            "correctIndex": 2
          }
        ]
      },
      {
        "title": "Chemistry Quiz 2 – Bonding & Chemical Reactions",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "What type of chemical bond forms when electrons are shared between nonmetal atoms?",
            "options": [
              {
                "label": "A",
                "text": "Ionic bond"
              },
              {
                "label": "B",
                "text": "Covalent bond"
              },
              {
                "label": "C",
                "text": "Metallic bond"
              },
              {
                "label": "D",
                "text": "Hydrogen bond"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "Balance the equation: _H₂ + _O₂ → 2H₂O. What is the coefficient for H₂?",
            "options": [
              {
                "label": "A",
                "text": "1"
              },
              {
                "label": "B",
                "text": "2"
              },
              {
                "label": "C",
                "text": "3"
              },
              {
                "label": "D",
                "text": "4"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "What kind of reaction is represented by 2Na + Cl₂ → 2NaCl?",
            "options": [
              {
                "label": "A",
                "text": "Decomposition"
              },
              {
                "label": "B",
                "text": "Synthesis (Combination)"
              },
              {
                "label": "C",
                "text": "Single replacement"
              },
              {
                "label": "D",
                "text": "Double replacement"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "What molecular geometry does a methane (CH₄) molecule possess?",
            "options": [
              {
                "label": "A",
                "text": "Linear"
              },
              {
                "label": "B",
                "text": "Trigonal planar"
              },
              {
                "label": "C",
                "text": "Tetrahedral"
              },
              {
                "label": "D",
                "text": "Bent"
              }
            ],
            "correctIndex": 2
          }
        ]
      },
      {
        "title": "Chemistry Quiz 3 – Stoichiometry, Acids & Kinetics",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "What is the numerical value of Avogadro’s number?",
            "options": [
              {
                "label": "A",
                "text": "3.00 × 10⁸"
              },
              {
                "label": "B",
                "text": "6.022 × 10²³"
              },
              {
                "label": "C",
                "text": "9.81 × 10³"
              },
              {
                "label": "D",
                "text": "1.602 × 10⁻¹⁹"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "A solution with a pH of 2 is classified as:",
            "options": [
              {
                "label": "A",
                "text": "Strongly acidic"
              },
              {
                "label": "B",
                "text": "Weakly basic"
              },
              {
                "label": "C",
                "text": "Neutral"
              },
              {
                "label": "D",
                "text": "Strongly basic"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 3,
            "prompt": "What products are formed in an acid-base neutralization reaction between HCl and NaOH?",
            "options": [
              {
                "label": "A",
                "text": "NaCl and H₂O"
              },
              {
                "label": "B",
                "text": "NaH and Cl₂"
              },
              {
                "label": "C",
                "text": "NaOH and Cl₂"
              },
              {
                "label": "D",
                "text": "H₂ and O₂"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 4,
            "prompt": "How does a catalyst increase the rate of a chemical reaction?",
            "options": [
              {
                "label": "A",
                "text": "By increasing the temperature of reactants"
              },
              {
                "label": "B",
                "text": "By lowering the activation energy barrier"
              },
              {
                "label": "C",
                "text": "By increasing the volume of products"
              },
              {
                "label": "D",
                "text": "By shifting the reaction equilibrium position"
              }
            ],
            "correctIndex": 1
          }
        ]
      }
    ],
    "lessons": [
      {
        "order": 1,
        "title": "Atomic Structure, Isotopes & Electron Configuration",
        "keyPoints": [
          "Atoms consist of a dense central nucleus with protons and neutrons surrounded by electron orbitals.",
          "Atomic number Z equals proton count, while mass number A = Z + N.",
          "Isotopes share identical proton counts but differ in neutron numbers.",
          "Electron configurations follow Aufbau, Pauli exclusion, and Hund principles."
        ],
        "contentHtml": "\n<h3>1. Subatomic Architecture</h3>\n<p>Atoms are the fundamental units of chemical elements. The atomic nucleus houses positively charged <strong>protons</strong> and neutral <strong>neutrons</strong>, while negatively charged <strong>electrons</strong> occupy quantized energy shells.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">A = Z + N</div>\n    <div class=\"formula-line\">\\text{Carbon-12: } Z = 6, N = 6 \\quad \\text{Carbon-14: } Z = 6, N = 8</div>\n</div>\n\n<h3>2. Electron Configuration</h3>\n<p>According to the Aufbau principle, electrons fill lowest energy subshells first ($1s < 2s < 2p < 3s < 3p < 4s < 3d$).</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Sodium (Na, } Z = 11): 1s^2 2s^2 2p^6 3s^1</div>\n</div>\n\n<h3>3. Solved Problem: Isotopic Abundance</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating Average Atomic Mass of Chlorine</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Cl-35 (mass 34.97 amu, abundance 75.77%), Cl-37 (mass 36.97 amu, abundance 24.23%)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Average mass = (m₁ × %₁) + (m₂ × %₂)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Avg mass = (34.97 × 0.7577) + (36.97 × 0.2423) = 26.50 + 8.96 = 35.46 amu</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Average atomic mass of natural chlorine is 35.45 amu.</p>\n</div>\n\n<h3>4. Practice Exercises</h3>\n<p>1. Write the full electron configuration of Iron ($Fe, Z = 26$).<br/>\n2. Calculate the number of neutrons in Uranium-238 ($Z = 92$).</p>",
        "translations": {
          "hi": {
            "title": "परमाणु संरचना, समस्थानिक एवं इलेक्ट्रॉनिक विन्यास",
            "keyPoints": [
              "परमाणु के नाभिक में प्रोटॉन तथा न्यूट्रॉन होते हैं और इलेक्ट्रॉन कक्षाओं में परिक्रमा करते हैं।",
              "परमाणु क्रमांक Z = प्रोटॉन संख्या, द्रव्यमान संख्या A = Z + N।",
              "समस्थानिकों में प्रोटॉनों की संख्या समान परंतु न्यूट्रॉनों की संख्या भिन्न होती है।"
            ],
            "contentHtml": "\n<h3>1. परमाणु संरचना के आधार</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">A = Z + N</div>\n    <div class=\"formula-line\">\\text{Carbon-12: } Z = 6, N = 6 \\quad \\text{Carbon-14: } Z = 6, N = 8</div>\n</div>\n\n<h3>2. इलेक्ट्रॉनिक विन्यास</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Sodium (Na, } Z = 11): 1s^2 2s^2 2p^6 3s^1</div>\n</div>\n\n<h3>3. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">क्लोरीन का औसत परमाणु द्रव्यमान</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> Cl-35 (75.77%), Cl-37 (24.23%)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>औसत द्रव्यमान = (m₁ × %₁) + (m₂ × %₂)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">(34.97 × 0.7577) + (36.97 × 0.2423) = 35.46 amu</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> औसत परमाणु द्रव्यमान 35.45 amu है।</p>\n</div>\n\n<h3>4. अभ्यास प्रश्न</h3>\n<p>1. सोडियम (Na, Z = 11) का इलेक्ट्रॉनिक विन्यास लिखिए।</p>"
          },
          "mr": {
            "title": "अणूची रचना, समस्थानिके आणि इलेक्ट्रॉन संरूपण",
            "keyPoints": [
              "अणुकेंद्रकात प्रोटॉन व न्यूट्रॉन असतात, तर इलेक्ट्रॉन कक्षांमध्ये फिरतात.",
              "अणुवस्तुमानांक A = Z + N."
            ],
            "contentHtml": "\n<h3>1. अणूची मूलभूत रचना</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">A = Z + N</div>\n    <div class=\"formula-line\">\\text{Carbon-12: } Z = 6, N = 6 \\quad \\text{Carbon-14: } Z = 6, N = 8</div>\n</div>\n\n<h3>3. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">क्लोरीनचे सरासरी अणुवस्तुमान</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> Cl-35 (75.77%), Cl-37 (24.23%)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>सरासरी = (m₁ × %₁) + (m₂ × %₂)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">26.50 + 8.96 = 35.46 amu</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> सरासरी अणुवस्तुमान 35.45 amu आहे.</p>\n</div>\n\n<h3>4. सराव प्रश्न</h3>\n<p>1. कार्बनचे ($Z = 6$) इलेक्ट्रॉन संरूपण लिहा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Isotope",
            "enDef": "Atoms with same number of protons but different numbers of neutrons.",
            "hiEquiv": "समस्थानिक",
            "mrEquiv": "समस्थानिके"
          }
        ]
      },
      {
        "order": 2,
        "title": "Periodic Table Trends & Chemical Bonding",
        "keyPoints": [
          "Elements are arranged in increasing atomic number with repeating periodic properties.",
          "Electronegativity and ionization energy increase across a period and decrease down a group.",
          "Ionic bonds transfer electrons, covalent bonds share electron pairs, metallic bonds share an electron sea."
        ],
        "contentHtml": "\n<h3>1. Periodic Trends</h3>\n<p>The modern periodic table organizes elements into periods and groups reflecting their valence configurations:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Ionization Energy & Electronegativity: } \\text{Increases } \\rightarrow, \\text{ Decreases } \\downarrow</div>\n    <div class=\"formula-line\">\\text{Atomic Radius: } \\text{Decreases } \\rightarrow, \\text{ Increases } \\downarrow</div>\n</div>\n\n<h3>2. Bonding Types</h3>\n<p><strong>Ionic:</strong> Formed between metals and non-metals via electrostatic attraction ($Na^+ + Cl^- \\rightarrow NaCl$).<br/>\n<strong>Covalent:</strong> Non-metal electron sharing (e.g., $H_2O, CO_2, CH_4$).</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Arrange Fluorine (F), Chlorine (Cl), Bromine (Br), and Iodine (I) in order of increasing atomic radius.<br/>\n2. Draw the Lewis electron dot structure for Ammonia ($NH_3$).</p>",
        "translations": {
          "hi": {
            "title": "आवर्त सारणी की प्रवृत्तियाँ एवं रासायनिक आबंधन",
            "keyPoints": [
              "तत्वों को बढ़ते परमाणु क्रमांक के अनुसार व्यवस्थित किया गया है।",
              "विद्युत ऋणात्मकता आवर्त में बाएं से दाएं बढ़ती है और वर्ग में नीचे घटती है।",
              "आयनिक बंध में इलेक्ट्रॉनों का स्थानांतरण होता है, जबकि सहसंयोजक बंध में इलेक्ट्रॉनों का साझा होता है।"
            ],
            "contentHtml": "\n<h3>1. आवर्ती प्रवृत्तियाँ</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{विद्युत ऋणात्मकता: } \\text{बाएं से दाएं बढ़ती है } \\rightarrow, \\text{ नीचे घटती है } \\downarrow</div>\n    <div class=\"formula-line\">\\text{परमाणु त्रिज्या: } \\text{बाएं से दाएं घटती है } \\rightarrow, \\text{ नीचे बढ़ती है } \\downarrow</div>\n</div>\n\n<h3>2. रासायनिक बंधों के प्रकार</h3>\n<p><strong>Ionic बंध:</strong> $Na^+ + Cl^- \\rightarrow NaCl$<br/>\n<strong>Covalent बंध:</strong> $H_2O, CH_4$ में इलेक्ट्रॉनों का साझा।</p>"
          },
          "mr": {
            "title": "आवर्त सारणीतील कल आणि रासायनिक बंध",
            "keyPoints": [
              "मूलद्रव्यांची मांडणी वाढत्या अणुक्रमांकानुसार केलेली आहे.",
              "आयोनिक बंधात इलेक्ट्रॉन्सचे देवाणघेवाण होते, तर सहसंयुज बंधात भागीदारी होते."
            ],
            "contentHtml": "\n<h3>1. आवर्ती कल</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{विद्युत ऋणता: वाढते } \\rightarrow, \\text{ कमी होते } \\downarrow</div>\n    <div class=\"formula-line\">\\text{अणु त्रिज्या: कमी होते } \\rightarrow, \\text{ वाढते } \\downarrow</div>\n</div>\n\n<h3>2. बंधांचे प्रकार</h3>\n<p><strong>Ionic Bond:</strong> $NaCl$<br/>\n<strong>Covalent Bond:</strong> $H_2O, CH_4$.</p>"
          }
        },
        "glossary": [
          {
            "term": "Electronegativity",
            "enDef": "Tendency of an atom to attract shared electron pairs towards itself.",
            "hiEquiv": "विद्युत ऋणात्मकता",
            "mrEquiv": "विद्युत ऋणता"
          }
        ]
      },
      {
        "order": 3,
        "title": "Chemical Equations & Balancing Reactions",
        "keyPoints": [
          "The Law of Conservation of Mass dictates total mass of reactants equals total mass of products.",
          "Chemical equations must balance stoichiometry with identical atom counts on both sides.",
          "Types of reactions include combination, decomposition, single displacement, and double displacement."
        ],
        "contentHtml": "\n<h3>1. Balancing Chemical Equations</h3>\n<p>Mass conservation requires stoichiometric coefficients balancing all elements across reaction boundaries:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Combustion of Propane: } C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O</div>\n    <div class=\"formula-line\">\\text{Atoms Left: } C=3, H=8, O=10 \\quad \\text{Atoms Right: } C=3, H=8, O=10</div>\n</div>\n\n<h3>2. Solved Problem: Reaction Balancing</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Balancing the Formation of Rust (Iron Oxide)</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Unbalanced equation: Fe + O₂ → Fe₂O₃</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Conservation of Fe and O atoms</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">4Fe + 3O₂ → 2Fe₂O₃ \\n Left: 4 Fe, 6 O  |  Right: 4 Fe, 6 O</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Balanced equation is 4Fe + 3O₂ → 2Fe₂O₃.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Balance: $Al + HCl \\rightarrow AlCl_3 + H_2$.<br/>\n2. Identify the type of reaction: $BaCl_2 + Na_2SO_4 \\rightarrow BaSO_4\\downarrow + 2NaCl$.</p>",
        "translations": {
          "hi": {
            "title": "रासायनिक समीकरण एवं अभिक्रियाओं का संतुलन",
            "keyPoints": [
              "द्रव्यमान संरक्षण के नियम के अनुसार अभिकारकों का कुल द्रव्यमान उत्पादों के कुल द्रव्यमान के बराबर होता है।",
              "समीकरण में दोनों ओर प्रत्येक तत्व के परमाणुओं की संख्या समान होनी चाहिए।"
            ],
            "contentHtml": "\n<h3>1. रासायनिक समीकरणों का संतुलन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O</div>\n    <div class=\"formula-line\">\\text{दोनों ओर: } C=3, H=8, O=10</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">आयरन ऑक्साइड समीकरण का संतुलन</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> Fe + O₂ → Fe₂O₃</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>परमाणु संरक्षण</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">4Fe + 3O₂ → 2Fe₂O₃</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> संतुलित समीकरण 4Fe + 3O₂ → 2Fe₂O₃ है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. संतुलित कीजिए: $Al + HCl \\rightarrow AlCl_3 + H_2$।</p>"
          },
          "mr": {
            "title": "रासायनिक समीकरणे आणि अभिक्रियांचे संतुलन",
            "keyPoints": [
              "द्रव्य अक्षय्यतेच्या नियमानुसार रासायनिक अभिक्रियेत वस्तुमान नष्ट होत नाही.",
              "अभिक्रियाकारके आणि उत्पादिते यांमधील अणूंची संख्या समान असावी लागते."
            ],
            "contentHtml": "\n<h3>1. समीकरणाचे संतुलन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">C_3H_8 + 5O_2 \\rightarrow 3CO_2 + 4H_2O</div>\n    <div class=\"formula-line\">\\text{दोन्ही बाजूंस: } C=3, H=8, O=10</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">लोखंडाच्या गंजण्याची अभिक्रिया संतुलित करणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> Fe + O₂ → Fe₂O₃</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>अणूंची संख्या समान करणे</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">4Fe + 3O₂ → 2Fe₂O₃</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> संतुलित समीकरण 4Fe + 3O₂ → 2Fe₂O₃ आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. संतुलित करा: $Al + HCl \\rightarrow AlCl_3 + H_2$.</p>"
          }
        },
        "glossary": [
          {
            "term": "Stoichiometry",
            "enDef": "Calculation of relative quantities of reactants and products in chemical reactions.",
            "hiEquiv": "रससमीकरणमिति",
            "mrEquiv": "स्टोइकिओमेट्री"
          }
        ]
      },
      {
        "order": 4,
        "title": "The Mole Concept & Molar Mass",
        "keyPoints": [
          "One mole contains exactly 6.022 × 10²³ elementary entities (Avogadro constant N_A).",
          "Molar mass M in grams per mole equals numerical atomic or molecular weight in amu.",
          "Number of moles n = mass (m) / Molar mass (M)."
        ],
        "contentHtml": "\n<h3>1. The Mole Concept & Avogadro's Constant</h3>\n<p>A <strong>Mole</strong> bridges the microscopic scale of atoms with macroscopic bench chemistry:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">N_A = 6.022 \\times 10^{23}\\text{ entities/mol}</div>\n    <div class=\"formula-line\">n = \\frac{m}{M}</div>\n    <div class=\"formula-line\">N = n \\times N_A</div>\n</div>\n\n<h3>2. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating Moles and Molecules in Water</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Mass of water m = 36 g, Molar mass of H₂O M = 18 g/mol</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>n = m / M  and  N = n × N_A</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">n = 36 / 18 = 2 mol \\n N = 2 × (6.022 × 10²³) = 1.2044 × 10²⁴ molecules</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> 36 g of water contains 2 moles and 1.2044 × 10²⁴ molecules.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Calculate the mass in grams of $0.5\\text{ mol}$ of Carbon Dioxide ($CO_2$, $M = 44\\text{ g/mol}$).<br/>\n2. How many atoms are present in $46\\text{ g}$ of Sodium ($Na$, $M = 23\\text{ g/mol}$)?</p>",
        "translations": {
          "hi": {
            "title": "मोल संकल्पना एवं मोलर द्रव्यमान",
            "keyPoints": [
              "एक मोल में 6.022 × 10²³ कण (आवोगाद्रो संख्या) उपस्थित होते हैं।",
              "मोलों की संख्या n = द्रव्यमान (m) / मोलर द्रव्यमान (M)।"
            ],
            "contentHtml": "\n<h3>1. मोल संकल्पना</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">N_A = 6.022 \\times 10^{23}\\text{ कण/mol}</div>\n    <div class=\"formula-line\">n = \\frac{m}{M}</div>\n    <div class=\"formula-line\">N = n \\times N_A</div>\n</div>\n\n<h3>2. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">36 g जल में मोल तथा अणुओं की संख्या</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> जल का द्रव्यमान m = 36 g, H₂O का मोलर द्रव्यमान M = 18 g/mol</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>n = m / M, N = n × N_A</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">n = 36 / 18 = 2 mol \\n N = 2 × (6.022 × 10²³) = 1.2044 × 10²⁴ अणु</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> जल में 2 mol तथा 1.2044 × 10²⁴ अणु हैं।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. $44\\text{ g}$ $CO_2$ में कितने मोल होते हैं?</p>"
          },
          "mr": {
            "title": "मोल संकल्पना आणि मोलर वस्तुमान",
            "keyPoints": [
              "एका मोलमध्ये 6.022 × 10²³ एव्होगॅड्रो कण असतात.",
              "मोल संख्या n = m / M."
            ],
            "contentHtml": "\n<h3>1. मोल संकल्पनेची सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">N_A = 6.022 \\times 10^{23}\\text{ कण/mol}</div>\n    <div class=\"formula-line\">n = \\frac{m}{M}</div>\n    <div class=\"formula-line\">N = n \\times N_A</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">36 g पाण्यात मोल आणि रेणूंची संख्या</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> वस्तुमान m = 36 g, M = 18 g/mol</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>n = m / M, N = n × N_A</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">n = 36 / 18 = 2 mol, N = 1.2044 × 10²⁴ रेणू</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> पाण्यात 2 mol आणि 1.2044 × 10²⁴ रेणू असतात.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. $46\\text{ g}$ सोडियममधील मोल काढा ($M = 23\\text{ g/mol}$).</p>"
          }
        },
        "glossary": [
          {
            "term": "Mole",
            "enDef": "SI unit of amount of substance containing exactly 6.02214076 × 10²³ particles.",
            "hiEquiv": "मोल",
            "mrEquiv": "मोल"
          }
        ]
      },
      {
        "order": 5,
        "title": "Stoichiometry & Limiting Reagents",
        "keyPoints": [
          "The limiting reagent is completely consumed first, restricting the maximum theoretical yield of product.",
          "Excess reagents have unreacted portions remaining after reaction completion.",
          "Percentage yield = (Actual Yield / Theoretical Yield) × 100%."
        ],
        "contentHtml": "\n<h3>1. Limiting Reagent Concept</h3>\n<p>In reaction $2H_2 + O_2 \\rightarrow 2H_2O$, $2\\text{ moles}$ of $H_2$ react stoichiometrically with $1\\text{ mole}$ of $O_2$.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">2H_2 + O_2 \\rightarrow 2H_2O</div>\n    <div class=\"formula-line\">\\text{Theoretical Yield} = \\text{Yield determined by limiting reactant}</div>\n    <div class=\"formula-line\">\\% \\text{ Yield} = \\left( \\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\right) \\times 100\\%</div>\n</div>\n\n<h3>2. Solved Problem: Limiting Reactant</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Determining Limiting Reactant in Water Synthesis</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> 4 g of H₂ (2 moles, M = 2 g/mol) mixed with 64 g of O₂ (2 moles, M = 32 g/mol)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Stoichiometric ratio: 2 mol H₂ requires 1 mol O₂</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">We have 2 mol H₂ and 2 mol O₂. \\n H₂ is completely consumed using 1 mol O₂. O₂ has 1 mol in excess. \\n Maximum H₂O produced = 2 mol = 2 × 18 g = 36 g</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> H₂ is the limiting reagent; theoretical yield of H₂O is 36 g.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. If $30\\text{ g}$ of $H_2O$ is collected in the experiment above, calculate the percentage yield.<br/>\n2. Identify the limiting reagent when $56\\text{ g}$ of $N_2$ reacts with $18\\text{ g}$ of $H_2$ to form $NH_3$ ($N_2 + 3H_2 \\rightarrow 2NH_3$).</p>",
        "translations": {
          "hi": {
            "title": "रससमीकरणमिति एवं सीमांत अभिकर्मक (Limiting Reagents)",
            "keyPoints": [
              "सीमांत अभिकर्मक वह अभिकारक है जो अभिक्रिया में सबसे पहले समाप्त हो जाता है।",
              "उत्पाद की अधिकतम मात्रा सीमांत अभिकर्मक द्वारा निर्धारित होती है।"
            ],
            "contentHtml": "\n<h3>1. सीमांत अभिकर्मक की अवधारणा</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">2H_2 + O_2 \\rightarrow 2H_2O</div>\n    <div class=\"formula-line\">\\% \\text{ Yield} = \\left( \\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\right) \\times 100\\%</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">जल निर्माण में सीमांत अभिकर्मक ज्ञात करना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> 4 g H₂ (2 mol) और 64 g O₂ (2 mol)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>2 mol H₂ के लिए 1 mol O₂ चाहिए</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">H₂ पूर्णतः प्रयुक्त होगा। O₂ 1 mol शेष रहेगा। \\n H₂O की सैद्धांतिक मात्रा = 2 mol = 36 g</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> H₂ सीमांत अभिकर्मक है, H₂O की मात्रा 36 g होगी।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. यदि वास्तव में $30\\text{ g}$ जल प्राप्त हुआ तो प्रतिशत लब्धि ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "मर्यादित अभिक्रियाकारक आणि उत्पादन प्रमाण",
            "keyPoints": [
              "अभिक्रियेत प्रथम संपणाऱ्या घटकाला मर्यादित अभिक्रियाकारक म्हणतात.",
              "उत्पादनाची कमाल मर्यादा या घटकावर अवलंबून असते."
            ],
            "contentHtml": "\n<h3>1. मर्यादित अभिक्रियाकारक</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">2H_2 + O_2 \\rightarrow 2H_2O</div>\n    <div class=\"formula-line\">\\% \\text{ Yield} = \\left( \\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\right) \\times 100\\%</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">मर्यादित घटक ओळखणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> 4 g H₂ (2 mol) आणि 64 g O₂ (2 mol)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>2 mol H₂ साठी 1 mol O₂ आवश्यक</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">H₂ पूर्ण संपतो, O₂ शिल्लक राहतो  ⇒  36 g पाणी निर्माण होते</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> H₂ हा मर्यादित घटक आहे, 36 g पाणी बनते.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. टक्केवारी उत्पादन काढा जर प्रत्यक्ष उत्पादन $30\\text{ g}$ मिळाले.</p>"
          }
        },
        "glossary": [
          {
            "term": "Limiting Reagent",
            "enDef": "The reactant that gets completely consumed first in a reaction.",
            "hiEquiv": "सीमांत अभिकर्मक",
            "mrEquiv": "मर्यादित अभिक्रियाकारक"
          }
        ]
      },
      {
        "order": 6,
        "title": "Gas Laws: Boyle’s, Charles’s & Ideal Gas Law",
        "keyPoints": [
          "Boyle’s Law: Pressure is inversely proportional to volume at constant temperature: P₁V₁ = P₂V₂.",
          "Charles’s Law: Volume is directly proportional to absolute temperature: V₁/T₁ = V₂/T₂.",
          "Ideal Gas Equation: PV = nRT, where R = 8.314 J/(mol K)."
        ],
        "contentHtml": "\n<h3>1. Classical Gas Laws & Synthesis</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P_1 V_1 = P_2 V_2 \\quad (T = \\text{constant})</div>\n    <div class=\"formula-line\">\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\quad (P = \\text{constant})</div>\n    <div class=\"formula-line\">P V = n R T \\quad (R = 8.314\\text{ J/(mol}\\cdot\\text{K)} = 0.0821\\text{ L}\\cdot\\text{atm/(mol}\\cdot\\text{K)})</div>\n</div>\n\n<h3>2. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating Gas Pressure in a Rigid Cylinder</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Moles n = 2.0 mol, Volume V = 10.0 L, Temperature T = 300 K, R = 0.0821 L atm/(mol K)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>P = (n R T) / V</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">P = (2.0 × 0.0821 × 300) / 10.0 = 49.26 / 10.0 = 4.926 atm</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The gas exerts a pressure of 4.93 atm (approx 499 kPa).</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. A balloon contains $2.0\\text{ L}$ of gas at $300\\text{ K}$. What is its volume if heated to $450\\text{ K}$ at constant pressure?<br/>\n2. Calculate the volume occupied by $1\\text{ mol}$ of ideal gas at STP ($P = 1\\text{ atm}$, $T = 273.15\\text{ K}$).</p>",
        "translations": {
          "hi": {
            "title": "गैस नियम: बॉयल, चार्ल्स एवं आदर्श गैस समीकरण",
            "keyPoints": [
              "बॉयल का नियम: स्थिर ताप पर दाब आयतन के व्युत्क्रमानुपाती होता है (P₁V₁ = P₂V₂)।",
              "चार्ल्स का नियम: स्थिर दाब पर आयतन परम ताप के समानुपाती होता है (V₁/T₁ = V₂/T₂)।",
              "आदर्श गैस समीकरण: PV = nRT।"
            ],
            "contentHtml": "\n<h3>1. गैसों के नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P_1 V_1 = P_2 V_2 \\quad (T = \\text{constant})</div>\n    <div class=\"formula-line\">\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\quad (P = \\text{constant})</div>\n    <div class=\"formula-line\">P V = n R T</div>\n</div>\n\n<h3>2. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">गैस दाब की गणना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> n = 2.0 mol, V = 10.0 L, T = 300 K, R = 0.0821 L atm/(mol K)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>P = (n R T) / V</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">P = (2.0 × 0.0821 × 300) / 10.0 = 4.926 atm</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> गैस का दाब 4.93 atm है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. STP पर 1 मोल आदर्श गैस का आयतन $22.4\\text{ L}$ क्यों होता है? सिद्ध कीजिए।</p>"
          },
          "mr": {
            "title": "वायूचे नियम: बॉयल, चार्ल्स आणि आदर्श वायू समीकरण",
            "keyPoints": [
              "बॉयलचा नियम: स्थिर तापमानाला दाब आणि आकारमान व्यस्त प्रमाणात बदलतात (P₁V₁ = P₂V₂).",
              "आदर्श वायू समीकरण: PV = nRT."
            ],
            "contentHtml": "\n<h3>1. वायू नियम सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">P_1 V_1 = P_2 V_2</div>\n    <div class=\"formula-line\">\\frac{V_1}{T_1} = \\frac{V_2}{T_2}</div>\n    <div class=\"formula-line\">P V = n R T</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">वायूच्या दाबाची गणना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> n = 2.0 mol, V = 10.0 L, T = 300 K, R = 0.0821</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>P = (n R T) / V</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">P = 4.926 atm</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> वायूचा दाब 4.93 atm आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. स्थिर दाबाखाली तापमान वाढवल्यास फुग्याचे आकारमान का वाढते ते स्पष्ट करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Ideal Gas",
            "enDef": "Hypothetical gas whose molecules exhibit zero intermolecular force and occupy negligible volume.",
            "hiEquiv": "आदर्श गैस",
            "mrEquiv": "आदर्श वायू"
          }
        ]
      },
      {
        "order": 7,
        "title": "Solutions, Molarity & Concentration",
        "keyPoints": [
          "A solution is a homogeneous mixture composed of solute dissolved in solvent.",
          "Molarity (M) expresses concentration in moles of solute per liter of solution.",
          "Dilution equation: M₁V₁ = M₂V₂."
        ],
        "contentHtml": "\n<h3>1. Solution Concentration Metrics</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">M = \\frac{\\text{moles of solute } (n)}{\\text{liters of solution } (V)} = \\frac{m}{M_{wt} \\times V_{(L)}}</div>\n    <div class=\"formula-line\">M_1 V_1 = M_2 V_2</div>\n</div>\n\n<h3>2. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Preparing a Standard NaOH Solution</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Mass of NaOH m = 8.0 g, Molar mass M = 40.0 g/mol, Solution volume V = 500 mL = 0.50 L</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Moles n = m / M  and  Molarity M = n / V</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">n = 8.0 / 40.0 = 0.20 mol \\n Molarity M = 0.20 mol / 0.50 L = 0.40 mol/L (0.40 M)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The molar concentration of the solution is 0.40 M.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. How many grams of Glucose ($C_6H_{12}O_6$, $M = 180\\text{ g/mol}$) are needed to prepare $2.0\\text{ L}$ of $0.5\\text{ M}$ solution?<br/>\n2. What volume of $12\\text{ M}$ stock $HCl$ is required to prepare $500\\text{ mL}$ of $2\\text{ M}$ $HCl$?</p>",
        "translations": {
          "hi": {
            "title": "विलयन, मोलरता एवं सांद्रता",
            "keyPoints": [
              "विलयन विलेय और विलायक का समांगी मिश्रण होता है।",
              "मोलरता (M): विलयन के प्रति लीटर आयतन में उपस्थित विलेय के मोलों की संख्या।",
              "तनुता सूत्र: M₁V₁ = M₂V₂।"
            ],
            "contentHtml": "\n<h3>1. मोलरता एवं तनुता के सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">M = \\frac{n}{V_{(L)}} = \\frac{m}{M_{wt} \\times V_{(L)}}</div>\n    <div class=\"formula-line\">M_1 V_1 = M_2 V_2</div>\n</div>\n\n<h3>2. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">NaOH विलयन की मोलरता</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> m = 8.0 g NaOH, M = 40.0 g/mol, V = 0.50 L</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>n = m / M, Molarity M = n / V</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">n = 8.0 / 40.0 = 0.20 mol \\n M = 0.20 / 0.50 = 0.40 M</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> विलयन की मोलरता 0.40 M है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. $2\\text{ L}$ में $0.5\\text{ M}$ ग्लूकोज विलयन बनाने हेतु कितने ग्राम ग्लूकोज चाहिए?</p>"
          },
          "mr": {
            "title": "द्रावणे, मोलारिटी आणि संहती",
            "keyPoints": [
              "द्रावण म्हणजे द्राव्य आणि द्रावकाचे एकजिनसी मिश्रण.",
              "मोलारिटी M = द्राव्याचे मोल्स / द्रावणाचे लिटरमधील आकारमान.",
              "विरलन सूत्र: M₁V₁ = M₂V₂."
            ],
            "contentHtml": "\n<h3>1. मोलारिटी सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">M = \\frac{n}{V_{(L)}}</div>\n    <div class=\"formula-line\">M_1 V_1 = M_2 V_2</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">NaOH द्रावणाची मोलारिटी</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> m = 8.0 g, M = 40.0 g/mol, V = 0.50 L</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>M = n / V</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">n = 0.20 mol  ⇒  M = 0.20 / 0.50 = 0.40 M</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> द्रावणाची मोलारिटी 0.40 M आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. $500\\text{ mL}$ पाण्यात $0.40\\text{ M}$ द्रावण तयार करणे.</p>"
          }
        },
        "glossary": [
          {
            "term": "Molarity",
            "enDef": "Number of moles of solute per liter of solution.",
            "hiEquiv": "मोलरता",
            "mrEquiv": "मोलारिटी"
          }
        ]
      },
      {
        "order": 8,
        "title": "Acids, Bases & pH Calculations",
        "keyPoints": [
          "Acids donate protons (H⁺) while bases accept protons according to Bronsted-Lowry theory.",
          "pH is logarithmic measure of hydrogen ion concentration: pH = -log₁₀[H⁺].",
          "At 25°C, autoionization of water satisfies K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴, and pH + pOH = 14."
        ],
        "contentHtml": "\n<h3>1. Acid-Base Equilibrium & pH Scale</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{pH} = -\\log_{10}[H^+]</div>\n    <div class=\"formula-line\">\\text{pOH} = -\\log_{10}[OH^-]</div>\n    <div class=\"formula-line\">\\text{pH} + \\text{pOH} = 14 \\quad (\\text{at } 25^\\circ\\text{C})</div>\n    <div class=\"formula-line\">K_w = [H^+][OH^-] = 1.0 \\times 10^{-14}</div>\n</div>\n\n<h3>2. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating pH of Strong Hydrochloric Acid</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Concentration of HCl solution = 0.001 M (strong acid completely ionizes: [H⁺] = 1.0 × 10⁻³ M)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>pH = -log₁₀[H⁺]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">pH = -log₁₀(1.0 × 10⁻³) = -(-3.0) = 3.0</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The solution pH is 3.0 (strongly acidic).</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Calculate the pH of a $0.01\\text{ M}$ Sodium Hydroxide ($NaOH$) solution.<br/>\n2. If blood has a pH of $7.40$, calculate its hydronium ion concentration $[H^+]$.</p>",
        "translations": {
          "hi": {
            "title": "अम्ल, क्षार एवं pH गणना",
            "keyPoints": [
              "ब्रान्स्टेड-लॉरी सिद्धांत: अम्ल प्रोटॉन (H⁺) दाता हैं और क्षार प्रोटॉन ग्राही हैं।",
              "pH हाइड्रोजन आयन सांद्रता का ऋणात्मक लघुगणक है: pH = -log₁₀[H⁺]।",
              "25°C पर pH + pOH = 14।"
            ],
            "contentHtml": "\n<h3>1. pH पैमाना एवं सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{pH} = -\\log_{10}[H^+]</div>\n    <div class=\"formula-line\">\\text{pOH} = -\\log_{10}[OH^-]</div>\n    <div class=\"formula-line\">\\text{pH} + \\text{pOH} = 14</div>\n</div>\n\n<h3>2. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">0.001 M HCl का pH मान</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> [H⁺] = 1.0 × 10⁻³ M</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>pH = -log₁₀[H⁺]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">pH = -log₁₀(10⁻³) = 3.0</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> विलयन का pH 3.0 (अम्लीय) है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. $0.01\\text{ M}$ NaOH का pH ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "आम्ल, आम्लारी आणि pH ची गणना",
            "keyPoints": [
              "आम्ल H⁺ आयन देते आणि आम्लारी H⁺ आयन स्वीकारते.",
              "pH = -log₁₀[H⁺].",
              "pH + pOH = 14."
            ],
            "contentHtml": "\n<h3>1. pH सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{pH} = -\\log_{10}[H^+]</div>\n    <div class=\"formula-line\">\\text{pH} + \\text{pOH} = 14</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">0.001 M HCl चा pH काढणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> [H⁺] = 10⁻³ M</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>pH = -log₁₀[H⁺]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">pH = -(-3) = 3.0</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> द्रावणाचा pH 3.0 आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. शुद्ध पाण्याचा pH 7 का असतो ते स्पष्ट करा.</p>"
          }
        },
        "glossary": [
          {
            "term": "pH",
            "enDef": "Logarithmic scale used to specify the acidity or basicity of an aqueous solution.",
            "hiEquiv": "pH मान",
            "mrEquiv": "pH मूल्य"
          }
        ]
      },
      {
        "order": 9,
        "title": "Chemical Equilibrium & Le Chatelier’s Principle",
        "keyPoints": [
          "Dynamic chemical equilibrium occurs when forward and reverse reaction rates are precisely identical.",
          "Equilibrium constant K_c relates product and reactant equilibrium molarities.",
          "Le Chatelier’s Principle states an equilibrium shifts to counteract external perturbations in concentration, temperature, or pressure."
        ],
        "contentHtml": "\n<h3>1. Equilibrium Constant Expression</h3>\n<p>For generalized reversible reaction $aA + bB \\rightleftharpoons cC + dD$:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}</div>\n    <div class=\"formula-line\">N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) \\quad \\Delta H < 0</div>\n</div>\n\n<h3>2. Le Chatelier's Shifts</h3>\n<ul>\n  <li><strong>Increasing pressure:</strong> Shifts towards fewer gas moles ($2\\text{ moles of } NH_3$ vs $4\\text{ moles of reactants}$).</li>\n  <li><strong>Decreasing temperature (exothermic):</strong> Shifts equilibrium towards products ($NH_3$).</li>\n</ul>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Write the equilibrium expression $K_c$ for $2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g)$.<br/>\n2. Predict the shift in position when pressure is halved on $PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$.</p>",
        "translations": {
          "hi": {
            "title": "रासायनिक साम्यावस्था एवं ला-शातेलिए का नियम",
            "keyPoints": [
              "गतिक साम्यावस्था तब होती है जब अग्र और पश्च अभिक्रियाओं की दरें बराबर हो जाती हैं।",
              "साम्य स्थिरांक K_c = [C]^c [D]^d / ([A]^a [B]^b)।",
              "ला-शातेलिए का सिद्धांत: निकाय पर दबाव, ताप या सांद्रता का परिवर्तन करने पर साम्य उस दिशा में विस्थापित होता है जिससे प्रभाव समाप्त हो सके।"
            ],
            "contentHtml": "\n<h3>1. साम्य स्थिरांक का व्यंजक</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}</div>\n    <div class=\"formula-line\">N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)</div>\n</div>\n\n<h3>2. ला-शातेलिए का सिद्धांत</h3>\n<p>दाब बढ़ाने पर साम्य कम गैस मोलों की ओर विस्थापित होता है।</p>"
          },
          "mr": {
            "title": "रासायनिक संतुलन आणि ल शॅटेलिएचे तत्त्व",
            "keyPoints": [
              "संतुलन अवस्थेत पुढील व मागील अभिक्रियांचे वेग समान होतात.",
              "ल शॅटेलिएचे तत्त्व बाह्य बदलांचा परिणाम कमी करणाऱ्या दिशेने संतुलन हलवते."
            ],
            "contentHtml": "\n<h3>1. संतुलन स्थिरांक</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}</div>\n</div>\n\n<h3>2. ल शॅटेलिएचे तत्त्व</h3>\n<p>दाब वाढवल्यास अभिक्रिया कमी वायू मोल्स असणाऱ्या बाजूकडे सरकते.</p>"
          }
        },
        "glossary": [
          {
            "term": "Equilibrium",
            "enDef": "State in a reversible chemical reaction where forward and reverse rates are equal.",
            "hiEquiv": "साम्यावस्था",
            "mrEquiv": "रासायनिक संतुलन"
          }
        ]
      },
      {
        "order": 10,
        "title": "Thermochemistry, Enthalpy & Hess’s Law",
        "keyPoints": [
          "Enthalpy change ΔH measures heat absorbed or released at constant pressure.",
          "Exothermic reactions release energy (ΔH < 0), endothermic reactions absorb heat (ΔH > 0).",
          "Heat capacity formula: q = m × c × ΔT.",
          "Hess’s Law states total enthalpy change is independent of reaction pathways."
        ],
        "contentHtml": "\n<h3>1. Thermochemical Formulations</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">q = m \\cdot c \\cdot \\Delta T</div>\n    <div class=\"formula-line\">\\Delta H^\\circ = \\sum \\Delta H_f^\\circ(\\text{products}) - \\sum \\Delta H_f^\\circ(\\text{reactants})</div>\n</div>\n\n<h3>2. Solved Numerical Sum</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Heating Water in a Calorimeter</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Mass of water m = 250 g, Specific heat capacity c = 4.184 J/(g °C), Temperature rise ΔT = (80 - 20) = 60 °C</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>q = m × c × ΔT</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">q = 250 × 4.184 × 60 = 62,760 J = 62.76 kJ</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The total thermal energy absorbed is 62.76 kJ.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Calculate the heat released when $500\\text{ g}$ of iron cools from $100^\\circ\\text{C}$ to $25^\\circ\\text{C}$ ($c_{Fe} = 0.449\\text{ J/(g }^\\circ\\text{C)}$).<br/>\n2. State Hess's Law of constant heat summation with a diagrammatic cycle.</p>",
        "translations": {
          "hi": {
            "title": "ऊष्मा रसायन, एन्थैल्पी एवं हेस का नियम",
            "keyPoints": [
              "एन्थैल्पी परिवर्तन ΔH स्थिर दाब पर अवशोषित या उत्सर्जित ऊष्मा है।",
              "ऊष्माक्षेपी अभिक्रियाओं में ΔH < 0 तथा ऊष्माशोषी में ΔH > 0 होता है।",
              "ऊष्मा सूत्र: q = m × c × ΔT।"
            ],
            "contentHtml": "\n<h3>1. ऊष्मा रसायन के समीकरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">q = m \\cdot c \\cdot \\Delta T</div>\n    <div class=\"formula-line\">\\Delta H^\\circ = \\sum \\Delta H_f^\\circ(\\text{products}) - \\sum \\Delta H_f^\\circ(\\text{reactants})</div>\n</div>\n\n<h3>2. हल किया गया संख्यात्मक प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">जल को गर्म करने हेतु आवश्यक ऊष्मा</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> m = 250 g, c = 4.184 J/(g °C), ΔT = 60 °C</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>q = m × c × ΔT</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">q = 250 × 4.184 × 60 = 62760 J = 62.76 kJ</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> अवशोषित कुल ऊष्मा 62.76 kJ है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. हेस का नियम क्या है? संक्षेप में समझाइए।</p>"
          },
          "mr": {
            "title": "उष्णतारसायनशास्त्र, एन्थॅल्पी आणि हेसचा नियम",
            "keyPoints": [
              "एन्थॅल्पी बदल ΔH स्थिर दाबाखाली उष्णता बदल दर्शवतो.",
              "उष्णता सूत्र: q = m × c × ΔT."
            ],
            "contentHtml": "\n<h3>1. उष्णतेचे सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">q = m \\cdot c \\cdot \\Delta T</div>\n    <div class=\"formula-line\">\\Delta H^\\circ = \\sum \\Delta H_f^\\circ - \\sum \\Delta H_f^\\circ</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">पाणी तापवण्यासाठी लागणारी उष्णता</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> m = 250 g, c = 4.184 J/(g °C), ΔT = 60 °C</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>q = m × c × ΔT</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">q = 250 × 4.184 × 60 = 62.76 kJ</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> शोषून घेतलेली उष्णता 62.76 kJ आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. उष्मादायी आणि उष्माग्राही अभिक्रिया म्हणजे काय?</p>"
          }
        },
        "glossary": [
          {
            "term": "Enthalpy",
            "enDef": "Thermodynamic quantity equivalent to total heat content of a system.",
            "hiEquiv": "एन्थैल्पी",
            "mrEquiv": "एन्थॅल्पी"
          }
        ]
      }
    ]
  },
  {
    "id": "seed-course-history",
    "title": "Indian History",
    "subject": "History",
    "description": "Comprehensive curriculum tracing Indian history from ancient urbanism of the Indus Valley through the Vedic era, classical Mauryan and Gupta empires, medieval Sultanates and Mughals, Maratha Swarajya, British colonial rule, and the freedom movement culminating in the Constitution.",
    "offlinePackageSizeMb": 11.7,
    "quizzes": [
      {
        "title": "History Quiz 1 – Ancient Indian Civilisations",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "Which famous archaeological structure was unearthed at Mohenjo-daro, signifying communal ritual bathing?",
            "options": [
              {
                "label": "A",
                "text": "The Great Stupa"
              },
              {
                "label": "B",
                "text": "The Great Bath"
              },
              {
                "label": "C",
                "text": "The Iron Pillar"
              },
              {
                "label": "D",
                "text": "The Sun Temple"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "Who was the chief advisor and strategist behind Chandragupta Maurya’s founding of the Mauryan Empire?",
            "options": [
              {
                "label": "A",
                "text": "Aryabhata"
              },
              {
                "label": "B",
                "text": "Chanakya (Kautilya)"
              },
              {
                "label": "C",
                "text": "Banabhatta"
              },
              {
                "label": "D",
                "text": "Harishena"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "Following which historic conflict did Emperor Ashoka renounce military conquest to embrace Buddhist Dhamma?",
            "options": [
              {
                "label": "A",
                "text": "Battle of Panipat"
              },
              {
                "label": "B",
                "text": "Kalinga War"
              },
              {
                "label": "C",
                "text": "Battle of Hydaspes"
              },
              {
                "label": "D",
                "text": "Battle of Plassey"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "Which ancient Indian text is celebrated as the earliest collection of Vedic hymns?",
            "options": [
              {
                "label": "A",
                "text": "Samaveda"
              },
              {
                "label": "B",
                "text": "Yajurveda"
              },
              {
                "label": "C",
                "text": "Rigveda"
              },
              {
                "label": "D",
                "text": "Atharvaveda"
              }
            ],
            "correctIndex": 2
          }
        ]
      },
      {
        "title": "History Quiz 2 – Classical, Sultanate & Mughal Periods",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "Which ancient seat of international higher learning flourished during the Gupta and Harsha eras in modern-day Bihar?",
            "options": [
              {
                "label": "A",
                "text": "Nalanda University"
              },
              {
                "label": "B",
                "text": "Taxila Academy"
              },
              {
                "label": "C",
                "text": "Vikramashila"
              },
              {
                "label": "D",
                "text": "Vallabhi"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 2,
            "prompt": "Who founded the Mughal Empire in 1526 following the First Battle of Panipat?",
            "options": [
              {
                "label": "A",
                "text": "Akbar"
              },
              {
                "label": "B",
                "text": "Babur"
              },
              {
                "label": "C",
                "text": "Humayun"
              },
              {
                "label": "D",
                "text": "Shah Jahan"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "Which Mughal emperor initiated the policy of Sulh-i-Kul (universal peace and religious harmony)?",
            "options": [
              {
                "label": "A",
                "text": "Aurangzeb"
              },
              {
                "label": "B",
                "text": "Jahangir"
              },
              {
                "label": "C",
                "text": "Akbar"
              },
              {
                "label": "D",
                "text": "Babur"
              }
            ],
            "correctIndex": 2
          },
          {
            "order": 4,
            "prompt": "Who was the prominent Delhi Sultan known for rigorous market and price-control regulations?",
            "options": [
              {
                "label": "A",
                "text": "Qutb ud-Din Aibak"
              },
              {
                "label": "B",
                "text": "Alauddin Khalji"
              },
              {
                "label": "C",
                "text": "Muhammad bin Tughluq"
              },
              {
                "label": "D",
                "text": "Ibrahim Lodi"
              }
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "title": "History Quiz 3 – Freedom Struggle & Republic",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "In which year did the major Indian uprising against British East India Company rule ignite?",
            "options": [
              {
                "label": "A",
                "text": "1757"
              },
              {
                "label": "B",
                "text": "1857"
              },
              {
                "label": "C",
                "text": "1905"
              },
              {
                "label": "D",
                "text": "1942"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "Which famous march did Mahatma Gandhi lead in 1930 to protest the British monopoly on salt?",
            "options": [
              {
                "label": "A",
                "text": "Bardoli March"
              },
              {
                "label": "B",
                "text": "Dandi March"
              },
              {
                "label": "C",
                "text": "Champaran Yatra"
              },
              {
                "label": "D",
                "text": "Delhi Chalo"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "Who chaired the drafting committee that framed the Constitution of Independent India?",
            "options": [
              {
                "label": "A",
                "text": "Jawaharlal Nehru"
              },
              {
                "label": "B",
                "text": "Dr. B.R. Ambedkar"
              },
              {
                "label": "C",
                "text": "Sardar Vallabhbhai Patel"
              },
              {
                "label": "D",
                "text": "Dr. Rajendra Prasad"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "Who formed the Indian National Army (Azad Hind Fauj) to fight British rule with the slogan \"Give me blood, and I will give you freedom\"?",
            "options": [
              {
                "label": "A",
                "text": "Bhagat Singh"
              },
              {
                "label": "B",
                "text": "Subhas Chandra Bose"
              },
              {
                "label": "C",
                "text": "Chandrashekhar Azad"
              },
              {
                "label": "D",
                "text": "Lala Lajpat Rai"
              }
            ],
            "correctIndex": 1
          }
        ]
      }
    ],
    "lessons": [
      {
        "order": 1,
        "title": "Indus Valley Civilization: Urban Planning, Trade & Drainage",
        "keyPoints": [
          "The Harappan civilization flourished along the Indus river basin circa 2600 to 1900 BCE.",
          "Pioneering urban features included orthogonal grid street layouts, baked brick structures, and enclosed drainage networks.",
          "Major urban centres included Mohenjo-daro, Harappa, Dholavira, Kalibangan, and Lothal (dockyard)."
        ],
        "contentHtml": "\n<h3>1. Urban Architecture of Harappa & Mohenjo-daro</h3>\n<p>The <strong>Indus Valley Civilization (Bronze Age)</strong> was renowned for sophisticated town planning. Cities were split into a raised western <strong>Citadel</strong> for public structures and an expansive lower residential town laid out on an orthogonal grid pattern.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Key Sites: Harappa (Punjab), Mohenjo-daro (Sindh), Lothal (Gujarat Dockyard), Dholavira (Water Reservoirs)}</div>\n    <div class=\"formula-line\">\\text{Standard Brick Ratio: } 1 : 2 : 4 \\quad (\\text{Height : Width : Length})</div>\n</div>\n\n<h3>2. Sanitation & Maritime Commerce</h3>\n<p>Every house connected to covered underground brick sewers running under streets, equipped with inspection manholes. Harappan merchants conducted regular maritime commerce with ancient Mesopotamia (Dilmun, Magan, and Meluhha).</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Describe the construction and probable socio-religious purpose of the Great Bath at Mohenjo-daro.<br/>\n2. Discuss the technological significance of the Lothal tidal dockyard in international trade.</p>",
        "translations": {
          "hi": {
            "title": "सिंधु घाटी सभ्यता: नगर नियोजन, व्यापार एवं जल निकासी",
            "keyPoints": [
              "हड़प्पा सभ्यता 2600 से 1900 ईसा पूर्व सिंधु नदी घाटी में फली-फूली।",
              "ग्रिड पद्धति पर आधारित सड़कें, पकी ईंटों के मकान और ढकी हुई नालियां इसकी प्रमुख विशेषताएं थीं।",
              "लोथल में गोदीबाड़ा (डॉकयार्ड) और मोहनजोदड़ो में विशाल स्नानागार स्थित था।"
            ],
            "contentHtml": "\n<h3>1. नगर नियोजन एवं दुर्ग</h3>\n<p>सिंधु घाटी सभ्यता अपनी उन्नत नगरीय व्यवस्था के लिए प्रसिद्ध थी। सड़कें समकोण पर काटती थीं और आवासीय क्षेत्र सुनियोजित ग्रिड पर बसे थे।</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{ईंटों का मानक अनुपात: } 1 : 2 : 4</div>\n    <div class=\"formula-line\">\\text{प्रमुख स्थल: हड़प्पा, मोहनजोदड़ो, लोथल (डॉकयार्ड), धोलावीरा}</div>\n</div>\n\n<h3>2. उन्नत जल निकासी व्यवस्था</h3>\n<p>प्रत्येक घर की नाली मुख्य सड़क की ढकी हुई नाली से जुड़ती थी जिसमें सफाई के लिए मैनहोल बने थे।</p>"
          },
          "mr": {
            "title": "सिंधू संस्कृती: नगररचना, व्यापार आणि सांडपाणी व्यवस्था",
            "keyPoints": [
              "हडप्पा संस्कृती ही इसवी सन पूर्व 2600 ते 1900 दरम्यान विकसित झाली.",
              "काटकोनातील रस्ते, भाजलेल्या विटा आणि बंदिस्त गटारे हे वैशिष्ट्य होते.",
              "लोथल हे प्राचीन बंदर व गोदी होती."
            ],
            "contentHtml": "\n<h3>1. हडप्पाची वैशिष्ट्यपूर्ण नगररचना</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{विटांचे गुणोत्तर: } 1 : 2 : 4</div>\n    <div class=\"formula-line\">\\text{मुख्य शहरे: हडप्पा, मोहेंजोदडो, लोथल, धोलाविरा}</div>\n</div>\n\n<h3>2. व्यापार व बंदरे</h3>\n<p>लोथल बंदरातून मेसोपोटेमियाशी सागरी व्यापार चालत असे.</p>"
          }
        },
        "glossary": [
          {
            "term": "Citadel",
            "enDef": "Elevated fortified area in ancient Harappan cities hosting monumental civic architecture.",
            "hiEquiv": "दुर्ग (सिटाडेल)",
            "mrEquiv": "बालेकिल्ला"
          }
        ]
      },
      {
        "order": 2,
        "title": "Vedic Period: Social Order, Literature & Philosophy",
        "keyPoints": [
          "The Vedic era is chronologically divided into Early Vedic (Rigvedic pastoral) and Later Vedic (sedentary agricultural) epochs.",
          "The four sacred Vedas are Rigveda, Samaveda, Yajurveda, and Atharvaveda.",
          "Upanishadic philosophy introduced transcendental concepts of Brahman, Atman, and Moksha."
        ],
        "contentHtml": "\n<h3>1. Vedic Corpus & Transition</h3>\n<p>The <strong>Rigveda</strong>, composed primarily in the Punjab region, comprises 1,028 hymns dedicated to natural deities including Indra, Agni, and Soma. The transition to the Later Vedic period saw iron metallurgy (Krishna Ayas), agricultural surplus, and the emergence of territorial chiefdoms (Janapadas).</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{The 4 Vedas: Rigveda (Hymns), Samaveda (Melodies), Yajurveda (Rituals), Atharvaveda (Medicine/Charms)}</div>\n    <div class=\"formula-line\">\\text{Philosophical Upanishads: Introduce Brahman (Universal Reality) and Atman (Individual Self)}</div>\n</div>\n\n<h3>2. Practice Exercises</h3>\n<p>1. Trace the socio-economic evolution between the Early Vedic pastoral society and Later Vedic agricultural polities.<br/>\n2. Explain the fundamental philosophical doctrine articulated in the Chandogya Upanishad.</p>",
        "translations": {
          "hi": {
            "title": "वैदिक काल: सामाजिक व्यवस्था, साहित्य एवं दर्शन",
            "keyPoints": [
              "वैदिक काल को ऋग्वैदिक काल (पूर्व वैदिक) और उत्तर वैदिक काल में विभाजित किया गया है।",
              "चार वेद हैं: ऋग्वेद, सामवेद, यजुर्वेद और अथर्ववेद।",
              "उपनिषदों ने ब्रह्म, आत्मा और मोक्ष के दार्शनिक विचार दिए।"
            ],
            "contentHtml": "\n<h3>1. वैदिक साहित्य</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{चार वेद: ऋग्वेद, सामवेद, यजुर्वेद, अथर्ववेद}</div>\n    <div class=\"formula-line\">\\text{उपनिषद: आत्मा एवं ब्रह्म की एकता का दर्शन}</div>\n</div>"
          },
          "mr": {
            "title": "वैदिक काळ: समाजव्यवस्था, साहित्य आणि तत्त्वज्ञान",
            "keyPoints": [
              "वैदिक काळात चार वेदांची निर्मिती झाली: ऋग्वेद, सामवेद, यजुर्वेद, अथर्ववेद.",
              "उपनिषदांनी तत्त्वज्ञानाचा पाया घातला."
            ],
            "contentHtml": "\n<h3>1. वैदिक वाङ्मय</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{चार वेद: ऋग्वेद, सामवेद, यजुर्वेद, अथर्ववेद}</div>\n</div>"
          }
        },
        "glossary": [
          {
            "term": "Upanishad",
            "enDef": "Late Vedic philosophical Sanskrit texts elucidating metaphysics and spiritual liberation.",
            "hiEquiv": "उपनिषद",
            "mrEquiv": "उपनिषद"
          }
        ]
      },
      {
        "order": 3,
        "title": "The Mauryan Empire: Chandragupta, Ashoka & Edicts",
        "keyPoints": [
          "Founded by Chandragupta Maurya and Chanakya in 322 BCE, establishing Pan-Indian political integration.",
          "Chanakya’s Arthashastra established comprehensive principles of statecraft, diplomacy, and espionage.",
          "Following the Kalinga War (261 BCE), Emperor Ashoka embraced Buddhism and propagated moral governance (Dhamma) through rock edicts."
        ],
        "contentHtml": "\n<h3>1. Imperial Integration & Administration</h3>\n<p>Under Chandragupta Maurya and adviser Kautilya (Chanakya), the Mauryan Empire centered in Pataliputra unified northern and peninsular India. Megasthenes, the Seleucid ambassador, documented imperial military organization and municipal boards.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Kalinga War (261 BCE): Triggers Ashoka's conversion from Bherighosha (war drum) to Dhammaghosha (moral voice)}</div>\n    <div class=\"formula-line\">\\text{Ashokan Edicts: Inscribed in Prakrit (Brahmi/Kharosthi scripts), Greek, and Aramaic}</div>\n</div>\n\n<h3>2. The Principles of Ashoka's Dhamma</h3>\n<p>Ashoka's policy emphasized ahimsa (non-violence), respect for parents and ascetics, religious tolerance (Rock Edict XII), and social welfare through medical facilities and roadside wells.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Analyze the structural organization of Mauryan central administration as outlined in the Arthashastra.<br/>\n2. Discuss the historical significance of the Sarnath Lion Capital as India’s National Emblem.</p>",
        "translations": {
          "hi": {
            "title": "मौर्य साम्राज्य: चंद्रगुप्त, अशोक एवं शिलालेख",
            "keyPoints": [
              "322 ईसा पूर्व में चंद्रगुप्त मौर्य और चाणक्य ने मौर्य साम्राज्य की स्थापना की।",
              "कौटिल्य का अर्थशास्त्र शासन कला का अद्वितीय ग्रंथ है।",
              "कलिंग युद्ध (261 ईसा पूर्व) के पश्चात सम्राट अशोक ने बौद्ध धर्म अपनाकर धम्म का प्रचार किया।"
            ],
            "contentHtml": "\n<h3>1. मौर्य साम्राज्य एवं अशोक का धम्म</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{कलिंग युद्ध: 261 ईसा पूर्व}</div>\n    <div class=\"formula-line\">\\text{अशोक के शिलालेख: ब्राह्मी एवं खरोष्ठी लिपि}</div>\n</div>\n\n<h3>2. धम्म के सिद्धांत</h3>\n<p>अहिंसा, सत्य, माता-पिता की सेवा और धार्मिक सहिष्णुता (शिलालेख XII)।</p>"
          },
          "mr": {
            "title": "मौर्य साम्राज्य: चंद्रगुप्त, सम्राट अशोक आणि शिलालेख",
            "keyPoints": [
              "चंद्रगुप्त मौर्य आणि चाणक्य यांनी मौर्य साम्राज्याची स्थापना केली.",
              "कलिंग युद्धानंतर सम्राट अशोकाने शांतता व धम्माचा मार्ग स्वीकारला."
            ],
            "contentHtml": "\n<h3>1. मौर्य साम्राज्य</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{कलिंग युद्ध: इसवी सन पूर्व 261}</div>\n    <div class=\"formula-line\">\\text{अशोकाचे शिलालेख ब्राह्मी लिपीत कोरलेले आहेत.}</div>\n</div>"
          }
        },
        "glossary": [
          {
            "term": "Dhamma",
            "enDef": "Prakrit term for moral law and universal ethical conduct promoted by Emperor Ashoka.",
            "hiEquiv": "धम्म",
            "mrEquiv": "धम्म"
          }
        ]
      },
      {
        "order": 4,
        "title": "The Gupta Golden Age: Science, Mathematics & Arts",
        "keyPoints": [
          "The Gupta Empire (circa 320 to 550 CE) witnessed a classical renaissance in mathematics, astronomy, and literature.",
          "Aryabhata calculated π ≈ 3.1416, solar year duration, and postulated Earth’s axial rotation.",
          "Literary and artistic summits included Kalidasa’s drama and Ajanta cave murals."
        ],
        "contentHtml": "\n<h3>1. Mathematical and Astronomical Breakthroughs</h3>\n<p>Gupta scholars perfected the decimal place-value system and symbol zero, enabling advanced mathematical computation:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Aryabhata (499 CE): } \\pi \\approx \\frac{62832}{20000} = 3.1416</div>\n    <div class=\"formula-line\">\\text{Earth's Axial Rotation: Postulated day and night caused by diurnal rotation of the terrestrial globe}</div>\n    <div class=\"formula-line\">\\text{Varahamihira: Composed the encyclopedic Panchasiddhantika and Brihat Samhita}</div>\n</div>\n\n<h3>2. Classical Sanskrit Literature & Art</h3>\n<p>Kalidasa authored immortal works including <em>Abhijnanasakuntalam</em> and <em>Meghaduta</em>. Metallurgy reached unprecedented heights, exemplified by the rust-resistant 7-meter Mehrauli Iron Pillar in Delhi.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Evaluate the contributions of Aryabhata and Brahmagupta to universal mathematics.<br/>\n2. Discuss the thematic and artistic significance of the Ajanta and Ellora cave frescoes.</p>",
        "translations": {
          "hi": {
            "title": "गुप्त काल का स्वर्ण युग: विज्ञान, गणित एवं कलाएँ",
            "keyPoints": [
              "गुप्त काल (320-550 ईस्वी) को प्राचीन भारत का स्वर्ण युग कहा जाता है।",
              "आर्यभट्ट ने पाई (π ≈ 3.1416) का मान निकाला और पृथ्वी के घूर्णन की खोज की।",
              "दशमलव प्रणाली एवं शून्य का आविष्कार इसी युग की देन है।"
            ],
            "contentHtml": "\n<h3>1. गणित एवं खगोल विज्ञान में प्रगति</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{आर्यभट्ट: } \\pi \\approx 3.1416</div>\n    <div class=\"formula-line\">\\text{शून्य एवं दशमलव प्रणाली का विकास}</div>\n</div>\n\n<h3>2. साहित्य एवं स्थापत्य</h3>\n<p>कालिदास के महाकाव्य और महरौली का लौह स्तंभ इस युग की श्रेष्ठ उपलब्धियां हैं।</p>"
          },
          "mr": {
            "title": "गुप्त घराण्याचा सुवर्णकाळ: विज्ञान, गणित आणि कला",
            "keyPoints": [
              "गुप्त काळ हा भारतीय इतिहासाचा सुवर्णकाळ मानला जातो.",
              "आर्यभटांनी गणितात शून्य, दशांश पद्धती आणि पायचे मूल्य दिले."
            ],
            "contentHtml": "\n<h3>1. विज्ञान व गणित</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{आर्यभट: } \\pi \\approx 3.1416</div>\n</div>"
          }
        },
        "glossary": [
          {
            "term": "Decimal System",
            "enDef": "Base-10 positional numeral system developed in classical India featuring the operational zero.",
            "hiEquiv": "दशमलव प्रणाली",
            "mrEquiv": "दशांश पद्धती"
          }
        ]
      },
      {
        "order": 5,
        "title": "Delhi Sultanate: Administration, Architecture & Economy",
        "keyPoints": [
          "Ruled northern India from 1206 to 1526 across five dynasties: Mamluk, Khalji, Tughlaq, Sayyid, and Lodi.",
          "Alauddin Khalji implemented market control reforms and price-fixing on grain and textiles.",
          "Architectural fusion produced Indo-Islamic monuments including the Qutb Minar, Alai Darwaza, and Tughlaqabad."
        ],
        "contentHtml": "\n<h3>1. Dynastic Trajectory & Agrarian Revenue</h3>\n<p>The Sultanate initiated centralized bureaucratic administration backed by the <strong>Iqta system</strong>, where military commanders collected land revenue in designated districts to maintain standing contingents.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{5 Dynasties: Mamluk (1206-90), Khalji (1290-1320), Tughlaq (1320-1414), Sayyid (1414-51), Lodi (1451-1526)}</div>\n    <div class=\"formula-line\">\\text{Alauddin Khalji's Market Reforms: Strict price ceilings, state granaries, and the Shahna-i-Mandi}</div>\n</div>\n\n<h3>2. Monetary and Capital Experiments</h3>\n<p>Muhammad bin Tughlaq introduced bronze token currency and shifted imperial capital to Daulatabad (Devagiri) in Maharashtra.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Analyze the agrarian and economic policies introduced during the reign of Alauddin Khalji.<br/>\n2. Describe the architectural evolution from the Qutb Minar to the tomb of Ghiyasuddin Tughlaq.</p>",
        "translations": {
          "hi": {
            "title": "दिल्ली सल्तनत: प्रशासन, वास्तुकला एवं अर्थव्यवस्था",
            "keyPoints": [
              "1206 से 1526 तक पांच राजवंशों ने शासन किया: गुलाम, खिलजी, तुगलक, सैयद और लोदी।",
              "अलाउद्दीन खिलजी ने बाजार नियंत्रण और मूल्य निर्धारण नीति लागू की।",
              "इक्ता प्रणाली द्वारा भू-राजस्व और सैन्य प्रशासन चलाया जाता था।"
            ],
            "contentHtml": "\n<h3>1. दिल्ली सल्तनत का प्रशासन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{5 राजवंश: गुलाम, खिलजी, तुगलक, सैयद, लोदी}</div>\n    <div class=\"formula-line\">\\text{अलाउद्दीन खिलजी के बाजार सुधार: शहना-ए-मंडी}</div>\n</div>"
          },
          "mr": {
            "title": "दिल्ली सल्तनत: प्रशासन, स्थापत्य आणि अर्थव्यवस्था",
            "keyPoints": [
              "1206 ते 1526 पर्यंत पाच घराण्यांनी राज्य केले.",
              "अल्लाउद्दीन खिलजीने बाजार नियंत्रण पद्धत सुरू केली."
            ],
            "contentHtml": "\n<h3>1. सल्तनत कालखंड</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{गुलाम, खिलजी, तुघलक, सय्यद आणि लोदी घराणी}</div>\n</div>"
          }
        },
        "glossary": [
          {
            "term": "Iqta",
            "enDef": "Islamic administrative grant of land revenue allocated to army commanders in exchange for military service.",
            "hiEquiv": "इक्ता प्रणाली",
            "mrEquiv": "इक्ता पद्धत"
          }
        ]
      },
      {
        "order": 6,
        "title": "The Mughal Empire: Akbar's Policy of Sulh-i-kul & Revenue System",
        "keyPoints": [
          "Founded by Babur after the First Battle of Panipat (1526), expanding under Akbar the Great.",
          "Akbar instituted the Mansabdari administrative-military hierarchy and Raja Todar Mal’s Dahsala revenue settlement.",
          "Policy of Sulh-i-kul (universal peace) promoted interfaith dialogue at the Ibadat Khana in Fatehpur Sikri."
        ],
        "contentHtml": "\n<h3>1. Imperial Administrative Architecture</h3>\n<p>Akbar institutionalized civil-military bureaucracy via the <strong>Mansabdari system</strong>, grading officers through dual ranks: <em>Zat</em> (personal status and salary) and <em>Sawar</em> (required cavalry quota).</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Mansabdari Ranks: } \\text{Zat (personal grade)} + \\text{Sawar (cavalry troops to maintain)}</div>\n    <div class=\"formula-line\">\\text{Todar Mal's Dahsala (1580): Land survey, classification (Polaj, Parauti, Chachar, Banjar), 10-year average yield}</div>\n    <div class=\"formula-line\">\\text{Sulh-i-kul: State policy of universal peace and religious coexistence}</div>\n</div>\n\n<h3>2. Synthesis of Art and Architecture</h3>\n<p>The empire achieved monumental architectural grandeur culminating in Humayun’s Tomb, Fatehpur Sikri, the Red Fort, and the Taj Mahal in Agra.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Explain the operational mechanics of Raja Todar Mal’s Zabti (Dahsala) revenue assessment system.<br/>\n2. Discuss the socio-political implications of Akbar’s abolition of the Jizya tax in 1564.</p>",
        "translations": {
          "hi": {
            "title": "मुगल साम्राज्य: अकबर की सुलह-ए-कुल नीति एवं राजस्व व्यवस्था",
            "keyPoints": [
              "1526 में पानीपत के प्रथम युद्ध में बाबर ने मुगल साम्राज्य की नींव रखी।",
              "अकबर ने मनसबदारी प्रणाली और टोडरमल की दहसाला भू-राजस्व व्यवस्था स्थापित की।",
              "सुलह-ए-कुल (सार्वभौमिक शांति) और इबादत खाना की स्थापना धार्मिक सद्भाव के स्तंभ थे।"
            ],
            "contentHtml": "\n<h3>1. अकबर की प्रशासनिक नीतियां</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{मनसबदारी प्रणाली: जात और सवार पद}</div>\n    <div class=\"formula-line\">\\text{टोडरमल का दहसाला बंदोबस्त (1580)}</div>\n    <div class=\"formula-line\">\\text{सुलह-ए-कुल: सर्वधर्म सद्भाव की नीति}</div>\n</div>"
          },
          "mr": {
            "title": "मुघल साम्राज्य: अकबराची सुलह-ए-कुल नीती आणि महसूल पद्धती",
            "keyPoints": [
              "1526 मध्ये बाबराने मुघल सत्तेची स्थापना केली.",
              "अकबराची मनसबदारी व्यवस्था आणि तोडरमलची महसूल पद्धत.",
              "सुलह-ए-कुल म्हणजे सर्वसमावेशक शांततेचे धोरण."
            ],
            "contentHtml": "\n<h3>1. अकबराचे प्रशासन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{मनसबदारी आणि तोडरमल महसूल पद्धत}</div>\n</div>"
          }
        },
        "glossary": [
          {
            "term": "Mansabdar",
            "enDef": "Rank holder within the Mughal military and bureaucratic administrative hierarchy.",
            "hiEquiv": "मनसबदार",
            "mrEquiv": "मनसबदार"
          }
        ]
      },
      {
        "order": 7,
        "title": "The Maratha Empire: Chhatrapati Shivaji Maharaj & Swarajya",
        "keyPoints": [
          "Chhatrapati Shivaji Maharaj established Hindavi Swarajya in the 17th century based on civil welfare and military genius.",
          "Military mastery utilized Ganimi Kava (guerrilla warfare) tailored to the rugged Sahyadri terrain.",
          "Ashtapradhan council of eight ministers provided structured civil governance, complemented by forts and naval power."
        ],
        "contentHtml": "\n<h3>1. Foundation of Hindavi Swarajya</h3>\n<p><strong>Chhatrapati Shivaji Maharaj</strong> (coronated at Raigad in 1674) challenged Bijapur Sultanate and Mughal dominance to establish an independent sovereign state dedicated to public welfare and tolerance.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Coronation: 6 June 1674 at Fort Raigad, assuming the title Chhatrapati}</div>\n    <div class=\"formula-line\">\\text{Ashtapradhan Council: Eight ministers led by the Peshwa (Prime Minister)}</div>\n    <div class=\"formula-line\">\\text{Naval Fortresses: Sindhudurg, Vijaydurg, Suvarnadurg defending maritime trade}</div>\n</div>\n\n<h3>2. Ganimi Kava & Fort Architecture</h3>\n<p>Shivaji Maharaj established a network of over 300 hill and sea forts. <strong>Ganimi Kava</strong> (guerrilla warfare) combined swift mobility, tactical ambushes, and local intelligence to repeatedly overcome numerically superior armies.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Analyze the administrative portfolio and functioning of Shivaji Maharaj’s Ashtapradhan Mandal.<br/>\n2. Describe the strategic importance of hill forts in the defense of the Maratha territory.</p>",
        "translations": {
          "hi": {
            "title": "मराठा साम्राज्य: छत्रपति शिवाजी महाराज एवं हिंदवी स्वराज्य",
            "keyPoints": [
              "छत्रपति शिवाजी महाराज ने 17वीं शताब्दी में हिंदवी स्वराज्य की स्थापना की।",
              "गनिमी कावा (गुरिल्ला युद्ध नीति) से दुर्गम सह्याद्रि में विशाल सेनाओं को परास्त किया।",
              "अष्टप्रधान मंत्रिमंडल सुव्यवस्थित शासन व्यवस्था का आधार था।"
            ],
            "contentHtml": "\n<h3>1. हिंदवी स्वराज्य की स्थापना</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{राज्याभिषेक: 6 जून 1674, रायगढ़ किला}</div>\n    <div class=\"formula-line\">\\text{अष्टप्रधान मंडल: पेशवा के नेतृत्व में आठ मंत्रियों की परिषद}</div>\n    <div class=\"formula-line\">\\text{गनिमी कावा: गुरिल्ला युद्ध पद्धति}</div>\n</div>\n\n<h3>2. जलदुर्ग एवं नौसेना</h3>\n<p>सिंधुदुर्ग और विजयदुर्ग जैसे जलदुर्गों के निर्माण से शिवाजी महाराज ने शक्तिशाली नौसेना स्थापित की।</p>"
          },
          "mr": {
            "title": "मराठा साम्राज्य: छत्रपती शिवाजी महाराज आणि हिंदवी स्वराज्य",
            "keyPoints": [
              "छत्रपती शिवाजी महाराजांनी 17 व्या शतकात लोककल्याणकारी हिंदवी स्वराज्याची स्थापना केली.",
              "गनिमी कावा युद्धनीतीचा वापर करून बलाढ्य शत्रूंचा पराभव केला.",
              "अष्टप्रधान मंडळ, गडकोट आणि आरमार ही स्वराज्याची प्रमुख ताकद होती."
            ],
            "contentHtml": "\n<h3>1. हिंदवी स्वराज्याची स्थापना आणि राज्याभिषेक</h3>\n<p>छत्रपती शिवाजी महाराजांचा राज्याभिषेक <strong>6 जून 1674</strong> रोजी किल्ले रायगडावर झाला. त्यांनी रयतेचे राज्य निर्माण केले.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{राज्याभिषेक: 6 जून 1674, किल्ले रायगड}</div>\n    <div class=\"formula-line\">\\text{अष्टप्रधान मंडळ: पेशव्यांच्या नेतृत्वाखालील 8 मंत्र्यांचे मंडळ}</div>\n    <div class=\"formula-line\">\\text{जलदुर्ग: सिंधुदुर्ग, विजयदुर्ग, सुवर्णदुर्ग (भारतीय आरमाराचे जनक)}</div>\n</div>\n\n<h3>2. गनिमी कावा व गडकोट रचना</h3>\n<p>सह्याद्रीच्या डोंगररांगांचा आणि 300 हून अधिक किल्ल्यांचा चपखल वापर करून शत्रूवर मात केली.</p>"
          }
        },
        "glossary": [
          {
            "term": "Swarajya",
            "enDef": "Self-rule and sovereignty concept pioneered by Chhatrapati Shivaji Maharaj in 17th-century India.",
            "hiEquiv": "स्वराज्य",
            "mrEquiv": "स्वराज्य"
          }
        ]
      },
      {
        "order": 8,
        "title": "British Colonial Expansion: Battle of Plassey to 1857 Revolt",
        "keyPoints": [
          "Battle of Plassey (1757) and Buxar (1764) established British East India Company territorial dominance in Bengal.",
          "Expansionist mechanisms included Lord Wellesley’s Subsidiary Alliance and Lord Dalhousie’s Doctrine of Lapse.",
          "The 1857 War of Independence represented the first major united armed uprising against colonial exploitation."
        ],
        "contentHtml": "\n<h3>1. Mechanisms of Colonial Conquest</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Battle of Plassey (1757): Clive defeats Siraj-ud-Daulah through Mir Jafar's treachery}</div>\n    <div class=\"formula-line\">\\text{Battle of Buxar (1764): Diwani rights of Bengal, Bihar, and Orissa granted to Company}</div>\n    <div class=\"formula-line\">\\text{Subsidiary Alliance: Indian rulers forced to maintain British contingent and surrender foreign policy}</div>\n    <div class=\"formula-line\">\\text{Doctrine of Lapse: Annexation of Satara, Jhansi, and Nagpur when native rulers died without male heir}</div>\n</div>\n\n<h3>2. The Revolt of 1857</h3>\n<p>Triggered at Meerut on 10 May 1857 by the greased Enfield cartridge grievance, the revolt united sepoys, dispossessed rulers (Rani Lakshmibai, Nana Saheb, Kunwar Singh), and peasants across northern India. It ended Company rule, transferring governance to the British Crown under the Government of India Act 1858.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Analyze Dadabhai Naoroji’s Drain of Wealth theory detailing colonial economic extraction.<br/>\n2. Discuss the causes leading to the 1857 uprising and reasons for its ultimate military suppression.</p>",
        "translations": {
          "hi": {
            "title": "ब्रिटिश औपनिवेशिक विस्तार: प्लासी के युद्ध से 1857 की क्रांति तक",
            "keyPoints": [
              "प्लासी (1757) और बक्सर (1764) के युद्धों से ईस्ट इंडिया कंपनी का बंगाल पर प्रभुत्व स्थापित हुआ।",
              "सहायक संधि और हड़प नीति (Doctrine of Lapse) से देशी रियासतों का विलय किया गया।",
              "1857 का प्रथम स्वतंत्रता संग्राम औपनिवेशिक शासन के विरुद्ध पहला संगठित जनविद्रोह था।"
            ],
            "contentHtml": "\n<h3>1. औपनिवेशिक विस्तार के साधन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{प्लासी का युद्ध: 1757}</div>\n    <div class=\"formula-line\">\\text{बक्सर का युद्ध: 1764 (दीवानी अधिकार प्राप्त)}</div>\n    <div class=\"formula-line\">\\text{1857 की क्रांति: मेरठ से आरंभ, 1858 में ताज का शासन लागू}</div>\n</div>"
          },
          "mr": {
            "title": "ब्रिटिश वसाहतवादी विस्तार: प्लासी ते 1857 चा उठाव",
            "keyPoints": [
              "प्लासीच्या (1757) आणि बक्सरच्या (1764) लढाईने ब्रिटिशांचा पाया घातला.",
              "लॉर्ड डलहौसीचे खालसा धोरण आणि 1857 चा स्वातंत्र्य लढा."
            ],
            "contentHtml": "\n<h3>1. ब्रिटिश सत्तेचा विस्तार</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{प्लासीची लढाई: 1757}</div>\n    <div class=\"formula-line\">\\text{1857 चा राष्ट्रीय उठाव: झाशीची राणी लक्ष्मीबाई व नानासाहेब पेशवे}</div>\n</div>"
          }
        },
        "glossary": [
          {
            "term": "Doctrine of Lapse",
            "enDef": "Annexation policy devised by Lord Dalhousie taking over princely states without natural biological male heirs.",
            "hiEquiv": "हड़प नीति (व्यपगत सिद्धांत)",
            "mrEquiv": "खालसा धोरण"
          }
        ]
      },
      {
        "order": 9,
        "title": "Indian National Movement: Non-Cooperation, Civil Disobedience & Quit India",
        "keyPoints": [
          "The Indian National Congress (founded 1885) evolved from moderate constitutionalism to mass anti-colonial agitation.",
          "Mahatma Gandhi introduced Satyagraha (truth-force) and Ahimsa (non-violence) as mass struggle doctrines.",
          "Three nationwide mass campaigns: Non-Cooperation (1920-22), Civil Disobedience / Salt March (1930), and Quit India (1942)."
        ],
        "contentHtml": "\n<h3>1. Gandhian Epoch and Mass Movements</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Non-Cooperation Movement (1920-22): Boycott of British courts, schools, and foreign cloth; halted after Chauri Chaura}</div>\n    <div class=\"formula-line\">\\text{Salt Satyagraha & Civil Disobedience (1930): Dandi March (12 March - 6 April 1930) breaking salt laws}</div>\n    <div class=\"formula-line\">\\text{Quit India Movement (8 August 1942): Call to \"Do or Die\" at Gowalia Tank Maidan, Mumbai}</div>\n</div>\n\n<h3>2. Armed Revolutionary Resistance</h3>\n<p>Parallel revolutionary contributions were led by Bhagat Singh, Chandrashekhar Azad, and Netaji Subhas Chandra Bose’s Indian National Army (Azad Hind Fauj) with its battle cry 'Chalo Dilli'.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Why did Mahatma Gandhi select ordinary common salt as the focal symbol of the 1930 Civil Disobedience movement?<br/>\n2. Evaluate the military and psychological contribution of the Indian National Army under Netaji Subhas Chandra Bose.</p>",
        "translations": {
          "hi": {
            "title": "भारतीय राष्ट्रीय आंदोलन: असहयोग, सविनय अवज्ञा एवं भारत छोड़ो",
            "keyPoints": [
              "भारतीय राष्ट्रीय कांग्रेस की स्थापना 1885 में हुई।",
              "महात्मा गांधी ने सत्याग्रह और अहिंसा के आधार पर जनांदोलनों का नेतृत्व किया।",
              "तीन प्रमुख आंदोलन: असहयोग (1920), सविनय अवज्ञा (1930 दांडी मार्च), भारत छोड़ो (1942)।"
            ],
            "contentHtml": "\n<h3>1. प्रमुख राष्ट्रीय आंदोलन</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{असहयोग आंदोलन: 1920-1922}</div>\n    <div class=\"formula-line\">\\text{दांडी मार्च / नमक सत्याग्रह: 1930}</div>\n    <div class=\"formula-line\">\\text{भारत छोड़ो आंदोलन: 1942 (\"करो या मरो\")}</div>\n</div>\n\n<h3>2. क्रांतिकारी आंदोलन</h3>\n<p>भगत सिंह, चंद्रशेखर आजाद और नेताजी सुभाष चंद्र बोस की आजाद हिंद फौज का योगदान अविस्मरणीय है।</p>"
          },
          "mr": {
            "title": "भारतीय राष्ट्रीय चळवळ: असहकार, सविनय कायदेभंग आणि चले जाव",
            "keyPoints": [
              "महात्मा गांधीजींच्या नेतृत्वाखाली सत्य आणि अहिंसेवर आधारित लढा.",
              "दांडी यात्रा (1930) आणि चले जाव चळवळ (1942)."
            ],
            "contentHtml": "\n<h3>1. गांधीवादी जनआंदोलने</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{असहकार आंदोलन: 1920}</div>\n    <div class=\"formula-line\">\\text{सविनय कायदेभंग (मिठाचा सत्याग्रह): 1930}</div>\n    <div class=\"formula-line\">\\text{भारत छोडो आंदोलन: 1942 (\"करा किंवा मरा\")}</div>\n</div>"
          }
        },
        "glossary": [
          {
            "term": "Satyagraha",
            "enDef": "Philosophy of non-violent resistance developed by Mahatma Gandhi meaning adherence to truth.",
            "hiEquiv": "सत्याग्रह",
            "mrEquiv": "सत्याग्रह"
          }
        ]
      },
      {
        "order": 10,
        "title": "Independence, Partition & Drafting of the Indian Constitution",
        "keyPoints": [
          "The Indian Independence Act 1947 ended British paramountcy, bifurcating British India into India and Pakistan.",
          "Sardar Vallabhbhai Patel integrated 565 princely states into the unified Indian Union.",
          "The Constituent Assembly, chaired by Dr. B.R. Ambedkar (Drafting Committee), drafted the world’s longest written democratic constitution."
        ],
        "contentHtml": "\n<h3>1. The Dawn of Freedom and National Integration</h3>\n<p>At midnight on 15 August 1947, India gained independence. Deputy Prime Minister Sardar Vallabhbhai Patel successfully negotiated the integration of 565 princely states through Instruments of Accession.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Constituent Assembly: Formed under Cabinet Mission (1946), took 2 years, 11 months, and 18 days}</div>\n    <div class=\"formula-line\">\\text{Drafting Committee Chairman: Dr. B. R. Ambedkar (Father of the Indian Constitution)}</div>\n    <div class=\"formula-line\">\\text{Adoption: 26 November 1949 (Constitution Day)  |  Enforcement: 26 January 1950 (Republic Day)}</div>\n</div>\n\n<h3>2. Constitutional Values</h3>\n<p>The Preamble solemnizes India as a <strong>Sovereign, Socialist, Secular, Democratic Republic</strong> guaranteeing Justice, Liberty, Equality, and Fraternity to all citizens.</p>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Analyze the institutional role played by Dr. B.R. Ambedkar in shaping the Fundamental Rights and Directive Principles.<br/>\n2. Discuss the historical significance of 26 January chosen for the enforcement of the Constitution of India.</p>",
        "translations": {
          "hi": {
            "title": "स्वतंत्रता, विभाजन एवं भारतीय संविधान का निर्माण",
            "keyPoints": [
              "15 अगस्त 1947 को भारत स्वतंत्र हुआ और सरदार वल्लभभाई पटेल ने 565 देशी रियासतों का एकीकरण किया।",
              "संविधान सभा की प्रारूप समिति के अध्यक्ष डॉ. बी. आर. अम्बेडकर थे।",
              "26 जनवरी 1950 को संविधान लागू हुआ और भारत एक संप्रभु गणराज्य बना।"
            ],
            "contentHtml": "\n<h3>1. स्वतंत्रता एवं संविधान निर्माण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{संविधान निर्माण अवधि: 2 वर्ष, 11 माह, 18 दिन}</div>\n    <div class=\"formula-line\">\\text{प्रारूप समिति अध्यक्ष: डॉ. भीमराव अम्बेडकर}</div>\n    <div class=\"formula-line\">\\text{लागू: 26 जनवरी 1950 (गणतंत्र दिवस)}</div>\n</div>\n\n<h3>2. संविधान की प्रस्तावना</h3>\n<p>प्रस्तावना भारत को संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य घोषित करती है।</p>"
          },
          "mr": {
            "title": "स्वातंत्र्य, फाळणी आणि भारतीय राज्यघटनेची निर्मिती",
            "keyPoints": [
              "15 ऑगस्ट 1947 रोजी देशाला स्वातंत्र्य मिळाले आणि संस्थानांचे विलीनीकरण झाले.",
              "भारतरत्न डॉ. बाबासाहेब आंबेडकर मसुदा समितीचे अध्यक्ष होते.",
              "26 जानेवारी 1950 रोजी भारतीय संविधान लागू झाले."
            ],
            "contentHtml": "\n<h3>1. संविधान निर्मितीचा इतिहास</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{कालावधी: 2 वर्षे, 11 महिने, 18 दिवस}</div>\n    <div class=\"formula-line\">\\text{मसुदा समिती अध्यक्ष: डॉ. बाबासाहेब आंबेडकर}</div>\n    <div class=\"formula-line\">\\text{संविधान अंमलबजावणी: 26 जानेवारी 1950}</div>\n</div>"
          }
        },
        "glossary": [
          {
            "term": "Constitution",
            "enDef": "Fundamental supreme legal framework governing the state and enshrining citizen rights.",
            "hiEquiv": "संविधान",
            "mrEquiv": "राज्यघटना"
          }
        ]
      }
    ]
  },
  {
    "id": "seed-course-computer-science",
    "title": "Computer Science",
    "subject": "Computer Science",
    "description": "Comprehensive computer science curriculum covering digital logic, data structures, algorithms, complexity analysis, trees, graphs, computer organization, and operating system principles.",
    "offlinePackageSizeMb": 16.1,
    "quizzes": [
      {
        "title": "Computer Science Quiz 1 – Fundamentals & Programming",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "Which part of the CPU is responsible for performing mathematical calculations and logical evaluations?",
            "options": [
              {
                "label": "A",
                "text": "Control Unit (CU)"
              },
              {
                "label": "B",
                "text": "Arithmetic Logic Unit (ALU)"
              },
              {
                "label": "C",
                "text": "Solid State Drive (SSD)"
              },
              {
                "label": "D",
                "text": "Read-Only Memory (ROM)"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "What condition is essential in a recursive function to prevent infinite recursion and stack overflow?",
            "options": [
              {
                "label": "A",
                "text": "A while loop"
              },
              {
                "label": "B",
                "text": "A base case"
              },
              {
                "label": "C",
                "text": "A global variable"
              },
              {
                "label": "D",
                "text": "A class constructor"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "What is the time complexity to access any element by index in a standard contiguous array?",
            "options": [
              {
                "label": "A",
                "text": "O(1) – Constant time"
              },
              {
                "label": "B",
                "text": "O(n) – Linear time"
              },
              {
                "label": "C",
                "text": "O(log n) – Logarithmic time"
              },
              {
                "label": "D",
                "text": "O(n²) – Quadratic time"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 4,
            "prompt": "How many distinct values can be represented by a single 8-bit byte?",
            "options": [
              {
                "label": "A",
                "text": "128"
              },
              {
                "label": "B",
                "text": "256"
              },
              {
                "label": "C",
                "text": "512"
              },
              {
                "label": "D",
                "text": "1024"
              }
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "title": "Computer Science Quiz 2 – OOP & Data Structures",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "Which data structure follows the Last-In, First-Out (LIFO) order of operations?",
            "options": [
              {
                "label": "A",
                "text": "Queue"
              },
              {
                "label": "B",
                "text": "Stack"
              },
              {
                "label": "C",
                "text": "Binary Tree"
              },
              {
                "label": "D",
                "text": "Hash Table"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "Which OOP principle refers to bundling data attributes and methods into a single class while restricting direct access?",
            "options": [
              {
                "label": "A",
                "text": "Encapsulation"
              },
              {
                "label": "B",
                "text": "Inheritance"
              },
              {
                "label": "C",
                "text": "Polymorphism"
              },
              {
                "label": "D",
                "text": "Overloading"
              }
            ],
            "correctIndex": 0
          },
          {
            "order": 3,
            "prompt": "In a singly linked list, what does each node store besides its data element?",
            "options": [
              {
                "label": "A",
                "text": "A copy of the entire list"
              },
              {
                "label": "B",
                "text": "A pointer or reference to the next node"
              },
              {
                "label": "C",
                "text": "Its absolute array index"
              },
              {
                "label": "D",
                "text": "A hash of all previous nodes"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 4,
            "prompt": "Which data structure follows the First-In, First-Out (FIFO) principle?",
            "options": [
              {
                "label": "A",
                "text": "Stack"
              },
              {
                "label": "B",
                "text": "Queue"
              },
              {
                "label": "C",
                "text": "Heap"
              },
              {
                "label": "D",
                "text": "Graph"
              }
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "title": "Computer Science Quiz 3 – Algorithms, Networks & Security",
        "version": 1,
        "questions": [
          {
            "order": 1,
            "prompt": "What is the worst-case time complexity of Binary Search on a sorted array of size n?",
            "options": [
              {
                "label": "A",
                "text": "O(1)"
              },
              {
                "label": "B",
                "text": "O(log n)"
              },
              {
                "label": "C",
                "text": "O(n)"
              },
              {
                "label": "D",
                "text": "O(n log n)"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 2,
            "prompt": "Which network transport protocol guarantees reliable, ordered, error-checked packet delivery?",
            "options": [
              {
                "label": "A",
                "text": "UDP"
              },
              {
                "label": "B",
                "text": "TCP"
              },
              {
                "label": "C",
                "text": "IP"
              },
              {
                "label": "D",
                "text": "ICMP"
              }
            ],
            "correctIndex": 1
          },
          {
            "order": 3,
            "prompt": "Which sorting algorithm has a guaranteed average and worst-case time complexity of O(n log n)?",
            "options": [
              {
                "label": "A",
                "text": "Bubble Sort"
              },
              {
                "label": "B",
                "text": "Selection Sort"
              },
              {
                "label": "C",
                "text": "Merge Sort"
              },
              {
                "label": "D",
                "text": "Insertion Sort"
              }
            ],
            "correctIndex": 2
          },
          {
            "order": 4,
            "prompt": "What cryptographic protocol encrypts web browser communications under HTTPS?",
            "options": [
              {
                "label": "A",
                "text": "TLS / SSL"
              },
              {
                "label": "B",
                "text": "DNS"
              },
              {
                "label": "C",
                "text": "FTP"
              },
              {
                "label": "D",
                "text": "DHCP"
              }
            ],
            "correctIndex": 0
          }
        ]
      }
    ],
    "lessons": [
      {
        "order": 1,
        "title": "Number Systems: Binary, Decimal, Hexadecimal & Bitwise Operations",
        "keyPoints": [
          "Digital computers process all data in base-2 binary representation (bits and bytes).",
          "Positional notation establishes value as: N = Σ (digit_i × base^i).",
          "Two’s complement representation allows signed integer arithmetic without special subtraction circuits.",
          "Bitwise operators (AND, OR, XOR, NOT, shift) execute in single CPU clock cycles."
        ],
        "contentHtml": "\n<h3>1. Positional Number Systems</h3>\n<p>Modern computing hardware is based on binary logic gates. Hexadecimal (base-16) provides human-readable shorthand for 4-bit nibbles.</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Decimal to Binary: } 42_{10} = 32 + 8 + 2 = 101010_2</div>\n    <div class=\"formula-line\">\\text{Binary to Hexadecimal: } 0010 \\, 1010_2 = 2A_{16}</div>\n    <div class=\"formula-line\">\\text{Two's Complement of } X = (\\sim X) + 1</div>\n</div>\n\n<h3>2. Solved Problem: Base Conversion</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Decimal to Binary and Hexadecimal Conversion</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Decimal number N = 156</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Successive division by 2 and 16</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">156 / 16 = 9 remainder 12 (C in hex)  ⇒  9C₁₆ \\n 9C₁₆ = 1001 1100₂ in 8-bit binary</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> 156₁₀ = 10011100₂ = 9C₁₆.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Convert $-18$ into an 8-bit two’s complement binary integer.<br/>\n2. Calculate the bitwise XOR: $1101_2 \\oplus 1011_2$.</p>",
        "translations": {
          "hi": {
            "title": "संख्या पद्धतियाँ: बाइनरी, दशमलव, हेक्साडेसिमल एवं बिटवाइज़ संक्रियाएँ",
            "keyPoints": [
              "कंप्यूटर सभी डेटा को बाइनरी (0 और 1) में प्रोसेस करते हैं।",
              "टूज कॉम्प्लीमेंट (Two's Complement) ऋणात्मक पूर्णांकों के लिए प्रयुक्त होता है।",
              "बिटवाइज़ ऑपरेटर एक ही CPU चक्र में संपन्न होते हैं।"
            ],
            "contentHtml": "\n<h3>1. संख्या पद्धतियों का रूपांतरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Decimal to Binary: } 42_{10} = 101010_2</div>\n    <div class=\"formula-line\">\\text{Binary to Hex: } 0010 \\, 1010_2 = 2A_{16}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">दशमलव से बाइनरी एवं हेक्साडेसिमल में रूपांतरण</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> दशमलव संख्या N = 156</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>16 और 2 से उत्तरोत्तर भाग</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">156 / 16 = 9 शेष 12 (C)  ⇒  9C₁₆ = 10011100₂</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 156₁₀ = 10011100₂ = 9C₁₆ है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. $1101_2 \\oplus 1011_2$ का बिटवाइज़ XOR ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "संख्या पद्धती: बायनरी, दशांश, हेक्साडेसिमल आणि बिटवाईज क्रिया",
            "keyPoints": [
              "संगणक सर्व माहिती बायनरी (0 आणि 1) स्वरूपात साठवतो.",
              "बिटवाईज ऑपरेशन्स थेट हार्डवेअर पातळीवर वेगाने होतात."
            ],
            "contentHtml": "\n<h3>1. संख्या रूपांतरण</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">42_{10} = 101010_2 = 2A_{16}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">दशांश ते बायनरी रूपांतरण</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> संख्या N = 156</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>16 ने भागाकार</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">156 = 9C₁₆ = 10011100₂</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> 156 = 10011100₂ आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. 8-बिट बायनरीमध्ये 25 ही संख्या लिहा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Binary",
            "enDef": "Base-2 numerical system using digits 0 and 1.",
            "hiEquiv": "बाइनरी",
            "mrEquiv": "बायनरी"
          }
        ]
      },
      {
        "order": 2,
        "title": "Algorithms, Asymptotic Notation & Time Complexity",
        "keyPoints": [
          "Big-O notation characterizes upper-bound algorithm runtime growth as input size n grows asymptotically.",
          "Common complexity hierarchy: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).",
          "Space complexity evaluates auxiliary memory consumption independent of input storage."
        ],
        "contentHtml": "\n<h3>1. Asymptotic Complexity Classes</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">O(1) \\subset O(\\log n) \\subset O(n) \\subset O(n \\log n) \\subset O(n^2) \\subset O(2^n)</div>\n    <div class=\"formula-line\">f(n) = O(g(n)) \\iff \\exists c > 0, n_0 > 0 \\text{ s.t. } |f(n)| \\le c|g(n)| \\; \\forall n \\ge n_0</div>\n</div>\n\n<h3>2. Solved Problem: Nested Loop Complexity</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Analyzing Algorithmic Time Complexity</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Algorithm with outer loop running n times and inner loop running n times performing constant work</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Total operations T(n) = Σ_{i=1}^n Σ_{j=1}^n O(1) = n × n × c</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">T(n) = c n²  ⇒  Highest power of n is 2</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Time complexity is quadratic O(n²).</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. What is the time complexity of Binary Search on a sorted array of $n$ elements?<br/>\n2. Differentiate between Big-O ($O$), Big-Omega ($\\Omega$), and Big-Theta ($\\Theta$).</p>",
        "translations": {
          "hi": {
            "title": "एल्गोरिदम, स्पर्शोन्मुख संकेतन एवं समय जटिलता (Time Complexity)",
            "keyPoints": [
              "Big-O नोटेशन इनपुट आकार n बढ़ने पर एल्गोरिदम के समय की ऊपरी सीमा दर्शाता है।",
              "जटिलता पदानुक्रम: O(1) < O(log n) < O(n) < O(n log n) < O(n²)।"
            ],
            "contentHtml": "\n<h3>1. समय जटिलता श्रेणियां</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">O(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2) < O(2^n)</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">नेस्टेड लूप की जटिलता</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> दो नेस्टेड लूप (प्रत्येक n बार चलते हैं)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>T(n) = n × n = n²</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">T(n) = O(n²)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> समय जटिलता O(n²) है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. बाइनरी सर्च (Binary Search) की समय जटिलता O(log n) क्यों होती है?</p>"
          },
          "mr": {
            "title": "अल्गोरिदम, ॲसिम्प्टोटिक नोटेशन आणि टाईम कॉम्प्लेक्सिटी",
            "keyPoints": [
              "Big-O नोटेशन अल्गोरिदमचा कार्यकाळ इनपुट n नुसार कसा वाढतो ते मोजते.",
              "पायरी: O(1) < O(log n) < O(n) < O(n²)."
            ],
            "contentHtml": "\n<h3>1. कॉम्प्लेक्सिटी वर्ग</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">O(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2)</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">नेस्टेड लूपचे विश्लेषण</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> दोन लूप प्रत्येकी n वेळा</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>T(n) = n × n</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">T(n) = O(n²)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> कॉम्प्लेक्सिटी O(n²) आहे.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. बायनरी सर्चची कॉम्प्लेक्सिटी काय असते?</p>"
          }
        },
        "glossary": [
          {
            "term": "Big-O",
            "enDef": "Mathematical notation describing the limiting behavior of a function when the argument tends towards a particular value or infinity.",
            "hiEquiv": "बिग-ओ नोटेशन",
            "mrEquiv": "बिग-ओ नोटेशन"
          }
        ]
      },
      {
        "order": 3,
        "title": "Linear Data Structures: Arrays, Linked Lists & Stacks",
        "keyPoints": [
          "Arrays provide O(1) constant-time indexed access in contiguous memory buffers.",
          "Linked lists provide O(1) insertion/deletion at pointers but O(n) sequential search.",
          "Stacks operate on Last-In-First-Out (LIFO) semantics with O(1) push, pop, and peek operations."
        ],
        "contentHtml": "\n<h3>1. Memory Layout and Operations</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Array Access: } \\text{Address}(A[i]) = \\text{Base} + i \\times \\text{element\\_size} \\quad [O(1)]</div>\n    <div class=\"formula-line\">\\text{Stack Operations: } \\text{Push}(x), \\text{Pop}(), \\text{Peek}() \\quad [O(1) \\text{ LIFO}]</div>\n</div>\n\n<h3>2. Practice Exercises</h3>\n<p>1. Implement a balanced parentheses validator using a Stack in pseudo-code.<br/>\n2. Contrast singly linked lists with doubly linked lists in terms of memory overhead and reverse traversal.</p>",
        "translations": {
          "hi": {
            "title": "रैखिक डेटा संरचनाएँ: ऐरे, लिंक्ड लिस्ट एवं स्टैक",
            "keyPoints": [
              "Array लगातार मेमोरी में तत्वों को संग्रहीत करता है और O(1) में इंडेक्स एक्सेस देता है।",
              "Stack LIFO (Last-In-First-Out) सिद्धांत पर कार्य करता है।"
            ],
            "contentHtml": "\n<h3>1. डेटा संरचनाओं की तुलना</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Array Access: } O(1)</div>\n    <div class=\"formula-line\">\\text{Stack (LIFO): } \\text{Push, Pop } O(1)</div>\n</div>\n\n<h3>2. अभ्यास प्रश्न</h3>\n<p>1. स्टैक का उपयोग कर कोष्ठक संतुलन (Balanced Parentheses) की जांच कैसे की जाती है?</p>"
          },
          "mr": {
            "title": "रेषीय डेटा स्ट्रक्चर्स: अ‍ॅरे, लिंक्ड लिस्ट आणि स्टॅक",
            "keyPoints": [
              "Array मध्ये सलग मेमरी असते आणि O(1) वेळेत घटक मिळतात.",
              "Stack हा LIFO (Last-In-First-Out) पद्धतीवर चालतो."
            ],
            "contentHtml": "\n<h3>1. मेमरी रचना</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Array Access: } O(1)</div>\n    <div class=\"formula-line\">\\text{Stack (LIFO): } \\text{Push, Pop } O(1)</div>\n</div>\n\n<h3>2. सराव प्रश्न</h3>\n<p>1. स्टॅक आणि लिंक्ड लिस्ट मधील फरक सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Stack",
            "enDef": "Linear data structure operating on Last-In-First-Out (LIFO) discipline.",
            "hiEquiv": "स्टैक (Stack)",
            "mrEquiv": "स्टॅक"
          }
        ]
      },
      {
        "order": 4,
        "title": "Queues, Deques & Circular Buffers",
        "keyPoints": [
          "Queues enforce First-In-First-Out (FIFO) semantics with enqueue and dequeue operations.",
          "Circular buffers prevent memory shifting using modulo wrap-around arithmetic: rear = (rear + 1) % capacity.",
          "Priority queues retrieve elements ordered by priority rather than arrival time."
        ],
        "contentHtml": "\n<h3>1. Queue & Circular Modulo Arithmetic</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Enqueue: } \\text{rear} = (\\text{rear} + 1) \\pmod{\\text{capacity}}</div>\n    <div class=\"formula-line\">\\text{Dequeue: } \\text{front} = (\\text{front} + 1) \\pmod{\\text{capacity}}</div>\n    <div class=\"formula-line\">\\text{Size} = (\\text{rear} - \\text{front} + \\text{capacity}) \\pmod{\\text{capacity}}</div>\n</div>\n\n<h3>2. Solved Problem: Circular Buffer Wrap</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Circular Queue Index Wrap Calculation</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Queue capacity C = 8, current rear index = 7</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Next rear = (rear + 1) % capacity</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Next rear = (7 + 1) % 8 = 8 % 8 = 0</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The new element wraps around to index 0.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. How do operating system CPU schedulers utilize round-robin circular queues?<br/>\n2. Describe an efficient array-based implementation of a Double-Ended Queue (Deque).</p>",
        "translations": {
          "hi": {
            "title": "कतार, डीक एवं वृत्ताकार बफर (Queues & Circular Buffers)",
            "keyPoints": [
              "Queue FIFO (First-In-First-Out) सिद्धांत पर कार्य करती है।",
              "सर्कुलर कतार में सूचकांक का मॉड्युलो चक्रण होता है: (rear + 1) % capacity।"
            ],
            "contentHtml": "\n<h3>1. वृत्ताकार कतार के सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{rear} = (\\text{rear} + 1) \\pmod{\\text{capacity}}</div>\n    <div class=\"formula-line\">\\text{front} = (\\text{front} + 1) \\pmod{\\text{capacity}}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">वृत्ताकार कतार इंडेक्स रैप</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> कतार क्षमता = 8, वर्तमान rear = 7</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>Next = (rear + 1) % capacity</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">(7 + 1) % 8 = 0</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> नया इंडेक्स 0 पर रैप होगा।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. FIFO और LIFO में मुख्य अंतर क्या है?</p>"
          },
          "mr": {
            "title": "कतार (Queue), डीक आणि वर्तुळाकार बफर",
            "keyPoints": [
              "Queue ही FIFO (First-In-First-Out) तत्त्वावर चालते.",
              "सर्कुलर क्यू मेमरीचा योग्य वापर करते: (rear + 1) % capacity."
            ],
            "contentHtml": "\n<h3>1. सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{rear} = (\\text{rear} + 1) \\pmod{\\text{capacity}}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">इंडेक्स रॅपिंग</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> क्षमता = 8, rear = 7</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>(rear + 1) % 8</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">8 % 8 = 0</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> नवीन इंडेक्स 0 येईल.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. FIFO म्हणजे काय ते सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "FIFO",
            "enDef": "First-In-First-Out queuing discipline.",
            "hiEquiv": "फीफो (FIFO)",
            "mrEquiv": "फिफो (FIFO)"
          }
        ]
      },
      {
        "order": 5,
        "title": "Recursion, Recurrence Relations & Master Theorem",
        "keyPoints": [
          "Recursive algorithms divide problems into identical subproblems terminating at defined base cases.",
          "Divide-and-conquer recurrence relations are modeled by: T(n) = a T(n/b) + f(n).",
          "The Master Theorem provides asymptotic solutions for standard polynomial recurrences."
        ],
        "contentHtml": "\n<h3>1. The Master Theorem Formulation</h3>\n<p>For recurrence relations of the form $T(n) = a T(n/b) + f(n)$ with $a \\ge 1, b > 1$:</p>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">T(n) = a T(n/b) + \\Theta(n^d)</div>\n    <div class=\"formula-line\">\\text{Case 1: If } d < \\log_b a \\implies T(n) = \\Theta(n^{\\log_b a})</div>\n    <div class=\"formula-line\">\\text{Case 2: If } d = \\log_b a \\implies T(n) = \\Theta(n^d \\log n)</div>\n    <div class=\"formula-line\">\\text{Case 3: If } d > \\log_b a \\implies T(n) = \\Theta(n^d)</div>\n</div>\n\n<h3>2. Solved Problem: Merge Sort Recurrence</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Solving Merge Sort Recurrence Relation</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Recurrence: T(n) = 2T(n/2) + Θ(n)  [a = 2, b = 2, f(n) = n¹ so d = 1]</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Compare d with log_b a: log₂ 2 = 1. Here d = log_b a (Case 2)</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">T(n) = Θ(n^d log n) = Θ(n¹ log n) = Θ(n log n)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> Merge sort runs in optimal Θ(n log n) time.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. Solve using Master Theorem: $T(n) = 4T(n/2) + O(n)$.<br/>\n2. Identify the base case and recursive relation in the Fibonacci recurrence $F(n) = F(n-1) + F(n-2)$.</p>",
        "translations": {
          "hi": {
            "title": "पुनरावृत्ति, संबंध एवं मास्टर प्रमेय (Master Theorem)",
            "keyPoints": [
              "पुनरावृत्ति (Recursion) में फलन स्वयं को छोटे उप-समस्याओं के लिए कॉल करता है।",
              "मास्टर प्रमेय T(n) = a T(n/b) + f(n) प्रकार के सूत्रों का समय विश्लेषण करता है।"
            ],
            "contentHtml": "\n<h3>1. मास्टर प्रमेय के नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">T(n) = a T(n/b) + \\Theta(n^d)</div>\n    <div class=\"formula-line\">\\text{यदि } d = \\log_b a \\implies T(n) = \\Theta(n^d \\log n)</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">मर्ज सॉर्ट (Merge Sort) का समय विश्लेषण</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> T(n) = 2T(n/2) + Θ(n) [a = 2, b = 2, d = 1]</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>log₂ 2 = 1 = d  ⇒  Case 2</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">T(n) = Θ(n log n)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> समय जटिलता Θ(n log n) है।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. $T(n) = 4T(n/2) + n$ की जटिलता ज्ञात कीजिए।</p>"
          },
          "mr": {
            "title": "रिकर्शन आणि मास्टर प्रमेय (Master Theorem)",
            "keyPoints": [
              "रिकर्शनमध्ये फंक्शन स्वतःला पुन्हा कॉल करते.",
              "मास्टर प्रमेय वेळेचे विश्लेषण करण्यासाठी वापरले जाते."
            ],
            "contentHtml": "\n<h3>1. मास्टर प्रमेय सूत्र</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">T(n) = a T(n/b) + \\Theta(n^d)</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">मर्ज सॉर्टचे विश्लेषण</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> T(n) = 2T(n/2) + Θ(n)</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>log₂ 2 = 1</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">T(n) = Θ(n log n)</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> वेळ Θ(n log n) लागते.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. बेस कंडिशन का आवश्यक असते ते सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Recursion",
            "enDef": "Method of solving computational problems where the solution depends on solutions to smaller instances of the same problem.",
            "hiEquiv": "पुनरावृत्ति (Recursion)",
            "mrEquiv": "रिकर्शन"
          }
        ]
      },
      {
        "order": 6,
        "title": "Sorting Algorithms: QuickSort, MergeSort & HeapSort",
        "keyPoints": [
          "Comparison-based sorting algorithms possess a theoretical lower bound of Ω(n log n).",
          "MergeSort achieves guaranteed O(n log n) performance with O(n) auxiliary space.",
          "QuickSort partitions in-place around a pivot with O(n log n) average and O(n²) worst-case runtime."
        ],
        "contentHtml": "\n<h3>1. Comparison Sort Complexities</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{MergeSort: } O(n \\log n) \\text{ best/avg/worst, } O(n) \\text{ space, Stable}</div>\n    <div class=\"formula-line\">\\text{QuickSort: } O(n \\log n) \\text{ avg, } O(n^2) \\text{ worst, } O(\\log n) \\text{ space, In-place}</div>\n    <div class=\"formula-line\">\\text{HeapSort: } O(n \\log n) \\text{ guaranteed, } O(1) \\text{ space, In-place}</div>\n</div>\n\n<h3>2. Practice Exercises</h3>\n<p>1. Trace QuickSort partitioning on the array $[38, 27, 43, 3, 9, 82, 10]$ with the last element as pivot.<br/>\n2. Why is MergeSort preferred over QuickSort for sorting linked lists?</p>",
        "translations": {
          "hi": {
            "title": "सॉर्टिंग एल्गोरिदम: क्विकसॉर्ट, मर्जसॉर्ट एवं हीपसॉर्ट",
            "keyPoints": [
              "तुलना आधारित सॉर्टिंग की न्यूनतम सैद्धांतिक सीमा Ω(n log n) होती है।",
              "मर्जसॉर्ट की जटिलता सदैव O(n log n) रहती है।"
            ],
            "contentHtml": "\n<h3>1. सॉर्टिंग की समय जटिलताएँ</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{MergeSort: } O(n \\log n) \\text{ (स्थिर)}</div>\n    <div class=\"formula-line\">\\text{QuickSort: } O(n \\log n) \\text{ औसत}</div>\n    <div class=\"formula-line\">\\text{HeapSort: } O(n \\log n)</div>\n</div>\n\n<h3>2. अभ्यास प्रश्न</h3>\n<p>1. क्विकसॉर्ट में पाइवोट (Pivot) का चयन कैसे किया जाता है?</p>"
          },
          "mr": {
            "title": "सॉर्टिंग अल्गोरिदम्स: क्विकसॉर्ट, मर्जसॉर्ट आणि हीपसॉर्ट",
            "keyPoints": [
              "मर्जसॉर्ट O(n log n) वेळेत खात्रीशीर क्रमवारी करतो.",
              "क्विकसॉर्ट इन-प्लेस काम करतो."
            ],
            "contentHtml": "\n<h3>1. अल्गोरिदम तुलना</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{MergeSort: } O(n \\log n)</div>\n    <div class=\"formula-line\">\\text{QuickSort: } O(n \\log n)</div>\n</div>\n\n<h3>2. सराव प्रश्न</h3>\n<p>1. स्टेबल सॉर्टिंग म्हणजे काय?</p>"
          }
        },
        "glossary": [
          {
            "term": "QuickSort",
            "enDef": "Divide-and-conquer sorting algorithm based on partitioning around a pivot.",
            "hiEquiv": "क्विकसॉर्ट",
            "mrEquiv": "क्विकसॉर्ट"
          }
        ]
      },
      {
        "order": 7,
        "title": "Binary Search Trees & Tree Traversal",
        "keyPoints": [
          "A Binary Search Tree (BST) enforces: key(left) < key(node) < key(right).",
          "Search, insertion, and deletion operate in O(h) where h is tree height (O(log n) if balanced).",
          "In-order traversal of a valid BST always yields keys in ascending sorted order."
        ],
        "contentHtml": "\n<h3>1. BST Invariants & Traversals</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\forall x \\in \\text{left}(N): x.key < N.key \\quad \\text{and} \\quad \\forall y \\in \\text{right}(N): y.key > N.key</div>\n    <div class=\"formula-line\">\\text{In-order: } \\text{Left} \\rightarrow \\text{Node} \\rightarrow \\text{Right} \\implies \\text{Sorted Sequence}</div>\n    <div class=\"formula-line\">\\text{Pre-order: } \\text{Node} \\rightarrow \\text{Left} \\rightarrow \\text{Right}</div>\n    <div class=\"formula-line\">\\text{Post-order: } \\text{Left} \\rightarrow \\text{Right} \\rightarrow \\text{Node}</div>\n</div>\n\n<h3>2. Practice Exercises</h3>\n<p>1. Insert $[15, 10, 20, 8, 12, 18, 25]$ into an empty BST and write the in-order sequence.<br/>\n2. Explain how AVL trees maintain balance using single and double rotations.</p>",
        "translations": {
          "hi": {
            "title": "बाइनरी सर्च ट्री (BST) एवं ट्री ट्रेवर्सल",
            "keyPoints": [
              "BST में बायां उपट्री हमेशा नोड से छोटा और दायां उपट्री बड़ा होता है।",
              "इन-ऑर्डर (In-order) ट्रेवर्सल हमेशा तत्वों को आरोही क्रम में देता है।"
            ],
            "contentHtml": "\n<h3>1. BST नियम एवं ट्रेवर्सल</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Left} < \\text{Node} < \\text{Right}</div>\n    <div class=\"formula-line\">\\text{In-order: Left } \\rightarrow \\text{ Node } \\rightarrow \\text{ Right}</div>\n</div>\n\n<h3>2. अभ्यास प्रश्न</h3>\n<p>1. इन-ऑर्डर ट्रेवर्सल आरोही क्रम क्यों देता है?</p>"
          },
          "mr": {
            "title": "बायनरी सर्च ट्री आणि ट्री ट्रॅव्हर्सल",
            "keyPoints": [
              "BST मध्ये डावीकडील नोड लहान आणि उजवीकडील नोड मोठा असतो.",
              "In-order ट्रॅव्हर्सल चढत्या क्रमाने मूल्ये देतो."
            ],
            "contentHtml": "\n<h3>1. BST रचना</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Left} < \\text{Node} < \\text{Right}</div>\n</div>\n\n<h3>2. सराव प्रश्न</h3>\n<p>1. AVL ट्री म्हणजे काय?</p>"
          }
        },
        "glossary": [
          {
            "term": "Binary Search Tree",
            "enDef": "Node-based binary tree data structure where each node has at most two children adhering to BST ordering.",
            "hiEquiv": "बाइनरी सर्च ट्री",
            "mrEquiv": "बायनरी सर्च ट्री"
          }
        ]
      },
      {
        "order": 8,
        "title": "Graph Theory: BFS, DFS & Shortest Path",
        "keyPoints": [
          "Graphs G = (V, E) consist of vertices connected by directed or undirected edges.",
          "Breadth-First Search (BFS) uses a Queue to find shortest paths in unweighted graphs in O(V + E).",
          "Dijkstra’s algorithm uses a priority queue to determine single-source shortest paths with non-negative weights in O((V + E) log V)."
        ],
        "contentHtml": "\n<h3>1. Graph Traversal Complexities</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{BFS (Queue): } O(V + E) \\text{ time, computes shortest hops in unweighted graphs}</div>\n    <div class=\"formula-line\">\\text{DFS (Stack/Recursion): } O(V + E) \\text{ time, topological sort and cycle detection}</div>\n    <div class=\"formula-line\">\\text{Dijkstra Algorithm: } O((V + E) \\log V) \\text{ time using Min-Heap}</div>\n</div>\n\n<h3>2. Practice Exercises</h3>\n<p>1. Trace BFS traversal on a 5-node graph starting from vertex 1.<br/>\n2. Why does Dijkstra’s algorithm fail when edges have negative weights?</p>",
        "translations": {
          "hi": {
            "title": "ग्राफ सिद्धांत: BFS, DFS एवं न्यूनतम मार्ग (Dijkstra)",
            "keyPoints": [
              "ग्राफ G = (V, E) शीर्षों (Vertices) और किनारों (Edges) का समुच्चय है।",
              "BFS कतार (Queue) का प्रयोग कर न्यूनतम पथ खोजता है: O(V + E)।",
              "डाइकस्ट्रा (Dijkstra) एल्गोरिदम धनात्मक भार वाले ग्राफ का न्यूनतम पथ निकालता है।"
            ],
            "contentHtml": "\n<h3>1. ग्राफ एल्गोरिदम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{BFS: } O(V + E)</div>\n    <div class=\"formula-line\">\\text{Dijkstra: } O((V + E) \\log V)</div>\n</div>\n\n<h3>2. अभ्यास प्रश्न</h3>\n<p>1. ऋणात्मक भार होने पर डाइकस्ट्रा एल्गोरिदम क्यों विफल हो जाता है?</p>"
          },
          "mr": {
            "title": "ग्राफ थिअरी: BFS, DFS आणि सर्वात लहान मार्ग",
            "keyPoints": [
              "ग्राफ शीर्ष (V) आणि कडा (E) यांचा बनलेला असतो.",
              "BFS लहान अंतर शोधण्यासाठी कतार (Queue) वापरतो."
            ],
            "contentHtml": "\n<h3>1. ग्राफ अल्गोरिदम सूत्रे</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{BFS / DFS: } O(V + E)</div>\n    <div class=\"formula-line\">\\text{Dijkstra: } O((V + E) \\log V)</div>\n</div>\n\n<h3>2. सराव प्रश्न</h3>\n<p>1. BFS आणि DFS मधील फरक सांगा.</p>"
          }
        },
        "glossary": [
          {
            "term": "Dijkstra Algorithm",
            "enDef": "Algorithm for finding the shortest paths between nodes in a weighted graph.",
            "hiEquiv": "डाइकस्ट्रा एल्गोरिदम",
            "mrEquiv": "डायक्स्ट्रा अल्गोरिदम"
          }
        ]
      },
      {
        "order": 9,
        "title": "Computer Architecture: CPU, Memory Hierarchy & Cache",
        "keyPoints": [
          "Von Neumann architecture features unified memory for programs and data with Fetch-Decode-Execute cycles.",
          "Memory hierarchy trades capacity against access speed: Registers < L1/L2/L3 Cache < DRAM < SSD.",
          "Amdahl’s Law models theoretical speedup limitations when parallelizing code."
        ],
        "contentHtml": "\n<h3>1. Memory Hierarchy & Amdahl’s Law</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Access Latencies: Registers (0.5 ns) } < \\text{ L1 Cache (1 ns) } < \\text{ DRAM (60 ns) } < \\text{ SSD (100 µs)}</div>\n    <div class=\"formula-line\">S_{latency}(s) = \\frac{1}{(1 - p) + \\frac{p}{s}}</div>\n</div>\n\n<h3>2. Solved Problem: Amdahl’s Law Speedup</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">Calculating Maximum Parallel Speedup</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Given:</strong> Program has 80% parallelizable portion (p = 0.80), accelerated with s = 4 parallel cores</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>Formula:</strong> <code>Speedup = 1 / [(1 - p) + p / s]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">Speedup = 1 / [(1 - 0.80) + 0.80 / 4] = 1 / [0.20 + 0.20] = 1 / 0.40 = 2.5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>Result:</strong> The theoretical speedup is 2.5×.</p>\n</div>\n\n<h3>3. Practice Exercises</h3>\n<p>1. What is the theoretical maximum speedup possible for the program above if an infinite number of cores ($s \\to \\infty$) were used?<br/>\n2. Explain the difference between spatial locality and temporal locality in CPU cache design.</p>",
        "translations": {
          "hi": {
            "title": "कंप्यूटर संरचना: CPU, मेमोरी पदानुक्रम एवं कैश",
            "keyPoints": [
              "वॉन न्यूमैन आर्किटेक्चर: निर्देश फेच, डिकोड और निष्पादन चक्र।",
              "मेमोरी पदानुक्रम: रजिस्टर्स < कैश < रैम < डिस्क।",
              "एमडाहल का नियम (Amdahl's Law) समानांतर प्रसंस्करण में गति वृद्धि की सीमा तय करता है।"
            ],
            "contentHtml": "\n<h3>1. मेमोरी पदानुक्रम एवं एमडाहल का नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">S = \\frac{1}{(1 - p) + \\frac{p}{s}}</div>\n</div>\n\n<h3>2. हल किया गया प्रश्न</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">एमडाहल के नियम से स्पीडअप की गणना</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिया गया मान (Given):</strong> समानांतर भाग p = 0.80, कोर संख्या s = 4</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>Speedup = 1 / [(1 - p) + p / s]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">1 / [0.20 + 0.20] = 1 / 0.40 = 2.5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> सैद्धांतिक गति वृद्धि 2.5× होगी।</p>\n</div>\n\n<h3>3. अभ्यास प्रश्न</h3>\n<p>1. कैश मेमोरी (Cache Memory) CPU की गति कैसे बढ़ाती है?</p>"
          },
          "mr": {
            "title": "संगणक रचना: CPU, मेमरी उतरंड आणि कॅश",
            "keyPoints": [
              "मेमरी उतरंड: रजिस्टर्स < L1/L2 कॅश < रॅम < एसएसडी.",
              "अॅमडालचा नियम पॅरलल संगणनाची कमाल गती ठरवतो."
            ],
            "contentHtml": "\n<h3>1. अॅमडालचा नियम</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">S = \\frac{1}{(1 - p) + \\frac{p}{s}}</div>\n</div>\n\n<h3>2. सोडवलेले उदाहरण</h3>\n\n<div class=\"my-5 p-5 bg-[#F8FAFC] border border-[#D7E5F0] rounded-2xl\">\n  <h4 class=\"font-bold text-sm text-[#0C2B47] mb-2\">स्पीडअप काढणे</h4>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>दिलेली माहिती (Given):</strong> p = 0.80, s = 4</p>\n  <p class=\"text-xs text-slate-600 mb-2\"><strong>सूत्र (Formula):</strong> <code>S = 1 / [(1 - p) + p / s]</code></p>\n  <div class=\"formula-box my-3\">\n    <div class=\"formula-line\">1 / 0.40 = 2.5</div>\n  </div>\n  <p class=\"text-xs font-semibold text-[#1465A3] mt-2\"><strong>उत्तर (Result):</strong> स्पीडअप 2.5× होईल.</p>\n</div>\n\n<h3>3. सराव प्रश्न</h3>\n<p>1. व्हॉन न्यूमन आर्किटेक्चरची वैशिष्ट्ये कोणती?</p>"
          }
        },
        "glossary": [
          {
            "term": "Cache",
            "enDef": "Hardware or software component that stores data so that future requests for that data can be served faster.",
            "hiEquiv": "कैश मेमोरी",
            "mrEquiv": "कॅश मेमरी"
          }
        ]
      },
      {
        "order": 10,
        "title": "Operating Systems: Process Scheduling & Deadlocks",
        "keyPoints": [
          "Operating systems manage CPU multiplexing through pre-emptive and cooperative scheduling policies.",
          "Round-Robin scheduling allocates discrete time quanta to ensure fair responsiveness.",
          "Deadlock requires all four Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait."
        ],
        "contentHtml": "\n<h3>1. Process States & Deadlock Conditions</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{The 4 Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait}</div>\n    <div class=\"formula-line\">\\text{Deadlock occurs } \\iff \\text{All 4 conditions hold simultaneously}</div>\n    <div class=\"formula-line\">\\text{Banker's Algorithm verifies: } \\text{Need} \\le \\text{Available Resources}</div>\n</div>\n\n<h3>2. Practice Exercises</h3>\n<p>1. How does the Banker's Algorithm prevent deadlock in resource allocation?<br/>\n2. Calculate average turnaround time for 3 processes running under Round Robin with a quantum of $4\\text{ ms}$.</p>",
        "translations": {
          "hi": {
            "title": "ऑपरेटिंग सिस्टम: प्रोसेस शेड्यूलिंग एवं गतिरोध (Deadlocks)",
            "keyPoints": [
              "ऑपरेटिंग सिस्टम CPU समय को शेड्यूलिंग एल्गोरिदम द्वारा प्रबंधित करता है।",
              "गतिरोध (Deadlock) तब होता है जब कॉफमैन की चारों शर्तें एक साथ पूरी होती हैं।"
            ],
            "contentHtml": "\n<h3>1. कॉफमैन की 4 शर्तें</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{कॉफमैन शर्तें: परस्पर अपवर्जन, होल्ड एंड वेट, नो प्रीएम्पशन, चक्रीय प्रतीक्षा}</div>\n    <div class=\"formula-line\">\\text{बैंकर्स एल्गोरिदम गतिरोध से बचाव करता है।}</div>\n</div>\n\n<h3>2. अभ्यास प्रश्न</h3>\n<p>1. डेडलॉक (Deadlock) से बचने के उपाय क्या हैं?</p>"
          },
          "mr": {
            "title": "ऑपरेटिंग सिस्टीम्स: प्रोसेस शेड्युलिंग आणि डेडलॉक",
            "keyPoints": [
              "CPU वेळेचे योग्य नियोजन करण्यासाठी शेड्युलिंग अल्गोरिदम वापरले जातात.",
              "डेडलॉक टाळण्यासाठी बँकर्स अल्गोरिदम वापरला जातो."
            ],
            "contentHtml": "\n<h3>1. डेडलॉकच्या चार अटी</h3>\n<div class=\"formula-box\">\n    <div class=\"formula-line\">\\text{Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait}</div>\n</div>\n\n<h3>2. सराव प्रश्न</h3>\n<p>1. राऊंड रॉबिन शेड्युलिंग म्हणजे काय?</p>"
          }
        },
        "glossary": [
          {
            "term": "Deadlock",
            "enDef": "Condition where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process.",
            "hiEquiv": "गतिरोध (Deadlock)",
            "mrEquiv": "डेडलॉक"
          }
        ]
      }
    ]
  }
]
