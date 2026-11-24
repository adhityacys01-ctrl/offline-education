// ─── Course Curriculum & Quizzes Data ──────────────────────────────────────────
// 10 Lessons and 3 Quizzes for each of the 6 courses (60 lessons, 18 quizzes)
export const COURSE_CATALOG = [
    // ── 1. BIOLOGY ─────────────────────────────────────────────────────────────
    {
        id: 'seed-course-biology',
        title: 'Biology Fundamentals',
        subject: 'Biology',
        description: 'Explore the living world — cells, organisms, ecology, genetics, and evolution.',
        offlinePackageSizeMb: 11,
        lessons: [
            {
                order: 1,
                title: 'Cell Biology & Living Systems',
                keyPoints: [
                    'All living organisms are composed of one or more cells.',
                    'The cell is the basic structural and functional unit of life.',
                    'Cells arise only from pre-existing cells through cell division.',
                    'Prokaryotic cells lack a nucleus, while eukaryotic cells contain membrane-bound organelles.'
                ],
                contentHtml: `
          <h2>Introduction to Cell Biology</h2>
          <p>Cell theory forms the cornerstone of modern biology. Proposed by Matthias Schleiden, Theodor Schwann, and Rudolf Virchow, it establishes that all life shares common cellular foundations.</p>
          <div class="note-box"><strong>Key Principle:</strong> Cells maintain homeostasis through regulated transport across the plasma membrane.</div>
          <h3>Cell Classification</h3>
          <p>Organisms are divided into prokaryotes (bacteria, archaea) which lack a membrane-bound nucleus, and eukaryotes (plants, animals, fungi, protists) with organized internal compartmentalization.</p>
        `
            },
            {
                order: 2,
                title: 'Cell Organelles & Membrane Transport',
                keyPoints: [
                    'The plasma membrane operates via the fluid mosaic model with selective permeability.',
                    'Mitochondria generate ATP through oxidative phosphorylation.',
                    'The endoplasmic reticulum and Golgi apparatus synthesize, fold, and package proteins.',
                    'Lysosomes degrade cellular waste using specialized hydrolytic enzymes.'
                ],
                contentHtml: `
          <h2>Cell Organelles and Dynamic Transport</h2>
          <p>Every organelle within a eukaryotic cell specializes in critical metabolic duties. The nucleus safeguards genetic instructions, while mitochondria act as energetic powerplants.</p>
          <h3>Passive vs. Active Transport</h3>
          <p>Passive transport (diffusion, osmosis, facilitated diffusion) requires no ATP, flowing down concentration gradients. Active transport pumps ions against gradients using chemical energy.</p>
        `
            },
            {
                order: 3,
                title: 'Plant Photosynthesis & Energy Conversion',
                keyPoints: [
                    'Photosynthesis converts solar photons, H2O, and CO2 into glucose and oxygen.',
                    'Light reactions happen on thylakoid membranes, generating ATP and NADPH.',
                    'The Calvin cycle fixes atmospheric carbon in the chloroplast stroma.',
                    'Chlorophyll pigments absorb blue and red light while reflecting green light.'
                ],
                contentHtml: `
          <h2>Plant Photosynthesis Mechanism</h2>
          <p>Photosynthesis is the primary engine of biomass production on Earth. Sunlight energizes electrons in photosystems II and I, driving electron transport chains.</p>
          <p><strong>Chemical Equation:</strong> 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p>
        `
            },
            {
                order: 4,
                title: 'Cellular Respiration & ATP Synthesis',
                keyPoints: [
                    'Glycolysis splits glucose into pyruvate in the cytoplasm, yielding net 2 ATP.',
                    'The Krebs (citric acid) cycle occurs in the mitochondrial matrix.',
                    'The electron transport chain produces approximately 30-34 ATP via chemiosmosis.',
                    'Anaerobic respiration occurs in the absence of oxygen, resulting in fermentation.'
                ],
                contentHtml: `
          <h2>Cellular Respiration Pathway</h2>
          <p>Respiration harvests biochemical energy from organic molecules. Glycolysis breaks 6-carbon glucose into two 3-carbon pyruvates without requiring oxygen.</p>
          <p>Under aerobic conditions, pyruvate enters the mitochondria where the Krebs cycle and oxidative phosphorylation produce high-yield ATP for cellular work.</p>
        `
            },
            {
                order: 5,
                title: 'DNA Structure, Replication & Genes',
                keyPoints: [
                    'DNA is a double helix held together by hydrogen bonds between complementary base pairs.',
                    'Adenine pairs with thymine (A-T), and cytosine pairs with guanine (C-G).',
                    'DNA replication is semi-conservative, guided by DNA polymerase and helicase.',
                    'Genes are specific nucleotide sequences encoding functional RNA and proteins.'
                ],
                contentHtml: `
          <h2>DNA Structure and Replication</h2>
          <p>Elucidated by Watson, Crick, and Franklin, the antiparallel double-helix structure allows precise replication of genetic codes across generations.</p>
          <p>During the S-phase of the cell cycle, helicase unwinds the double strand, and DNA polymerases synthesize leading and lagging strands with proofreading precision.</p>
        `
            },
            {
                order: 6,
                title: 'Protein Synthesis: Transcription & Translation',
                keyPoints: [
                    'Transcription produces messenger RNA (mRNA) from a DNA template in the nucleus.',
                    'RNA polymerase reads the template strand from 3′ to 5′ and builds mRNA 5′ to 3′.',
                    'Ribosomes read mRNA codons in triplets to assemble polypeptides during translation.',
                    'Transfer RNA (tRNA) delivers matching amino acids via complementary anticodons.'
                ],
                contentHtml: `
          <h2>The Central Dogma: DNA to Protein</h2>
          <p>Genetic information flows from DNA → RNA → Protein. Transcription produces pre-mRNA which undergoes 5′ capping, polyadenylation, and splicing before nuclear export.</p>
          <p>On cytoplasmic ribosomes, tRNA molecules recognize three-letter mRNA codons, synthesizing specific amino acid chains that fold into functional enzymes and structural proteins.</p>
        `
            },
            {
                order: 7,
                title: 'Cell Division: Mitosis vs. Meiosis',
                keyPoints: [
                    'Mitosis produces two genetically identical diploid (2n) daughter cells for growth and repair.',
                    'Meiosis yields four genetically diverse haploid (1n) gametes for sexual reproduction.',
                    'Crossing over in Prophase I of meiosis generates crucial genetic variation.',
                    'Dysregulation of cell cycle checkpoints can lead to uncontrolled cancer cell proliferation.'
                ],
                contentHtml: `
          <h2>Mitosis and Meiosis Comparison</h2>
          <p>Mitotic phases (Prophase, Metaphase, Anaphase, Telophase) ensure somatic cells inherit identical chromosomes. Meiosis involves two successive divisions to reduce chromosome numbers by half.</p>
          <p>Homologous chromosome pairing and crossing-over in Meiosis I shuffle maternal and paternal alleles, creating unique genetic profiles.</p>
        `
            },
            {
                order: 8,
                title: 'Human Circulatory & Respiratory Systems',
                keyPoints: [
                    'The human four-chambered heart drives double circulation: systemic and pulmonary circuits.',
                    'Hemoglobin in erythrocytes binds oxygen in alveolar capillaries for transport.',
                    'Arteries withstand high systolic pressure; veins contain valves to prevent backflow.',
                    'Gas exchange in alveoli operates via passive diffusion governed by partial pressure differences.'
                ],
                contentHtml: `
          <h2>Human Circulation and Respiration</h2>
          <p>Deoxygenated blood returns via the vena cava to the right atrium, travels to the right ventricle, and is pumped to the lungs for oxygenation.</p>
          <p>Oxygen-rich blood enters the left atrium, moves to the left ventricle, and is propelled through the aorta to sustain body tissues.</p>
        `
            },
            {
                order: 9,
                title: 'Plant Transport: Xylem & Phloem Systems',
                keyPoints: [
                    'Xylem vessels transport water and dissolved inorganic minerals upward from roots.',
                    'Transpiration pull, cohesion, and adhesion drive continuous ascent of sap in xylem.',
                    'Phloem sieve tubes transport photosynthates (sucrose) bidirectionally from source to sink.',
                    'Stomata regulate transpiration and gas exchange through turgor changes in guard cells.'
                ],
                contentHtml: `
          <h2>Vascular Transport in Plants</h2>
          <p>The cohesion-tension theory explains how water ascends hundreds of feet in tall trees without metabolic pumping, powered by solar evaporation at leaf stomata.</p>
          <p>Phloem translocation relies on osmotic pressure gradients (Münch pressure flow hypothesis) to move nutrients into fruits, seeds, and root storage tissues.</p>
        `
            },
            {
                order: 10,
                title: 'Ecology, Biomes & Ecosystem Dynamics',
                keyPoints: [
                    'Ecosystems consist of biotic communities interacting with abiotic factors.',
                    'Energy flows unidirectionally through trophic levels, with ~10% transfer efficiency.',
                    'Biogeochemical cycles (carbon, nitrogen, water) recycle essential elements perpetually.',
                    'Biodiversity confers ecological resilience against environmental disruptions.'
                ],
                contentHtml: `
          <h2>Ecosystems and Ecological Balance</h2>
          <p>Producers capture radiant energy, supporting primary, secondary, and tertiary consumers. Decomposers recycle nutrients back into soil and aquatic reservoirs.</p>
          <p>Human conservation efforts focus on maintaining habitat integrity, protecting keystone species, and mitigating anthropogenic climate disruption.</p>
        `
            }
        ],
        quizzes: [
            {
                title: 'Biology Quiz 1 – Cell Biology & Energy Foundations',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'Which organelle is responsible for generating cellular ATP through oxidative phosphorylation?',
                        options: [
                            { label: 'A', text: 'Golgi apparatus' },
                            { label: 'B', text: 'Mitochondria' },
                            { label: 'C', text: 'Endoplasmic reticulum' },
                            { label: 'D', text: 'Lysosome' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'What gas do green plants primarily absorb during the light-independent reactions (Calvin cycle)?',
                        options: [
                            { label: 'A', text: 'Carbon dioxide (CO2)' },
                            { label: 'B', text: 'Oxygen (O2)' },
                            { label: 'C', text: 'Nitrogen (N2)' },
                            { label: 'D', text: 'Hydrogen (H2)' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 3,
                        prompt: 'Where in eukaryotic cells does glycolysis take place?',
                        options: [
                            { label: 'A', text: 'Mitochondrial matrix' },
                            { label: 'B', text: 'Chloroplast stroma' },
                            { label: 'C', text: 'Cytoplasm / Cytosol' },
                            { label: 'D', text: 'Nucleus' }
                        ],
                        correctIndex: 2
                    },
                    {
                        order: 4,
                        prompt: 'Which pigment is primarily responsible for absorbing light energy in plant chloroplasts?',
                        options: [
                            { label: 'A', text: 'Chlorophyll' },
                            { label: 'B', text: 'Carotene' },
                            { label: 'C', text: 'Hemoglobin' },
                            { label: 'D', text: 'Melanin' }
                        ],
                        correctIndex: 0
                    }
                ]
            },
            {
                title: 'Biology Quiz 2 – Molecular Genetics & Cell Division',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'In DNA, which nitrogenous base forms complementary hydrogen bonds with Adenine?',
                        options: [
                            { label: 'A', text: 'Guanine' },
                            { label: 'B', text: 'Cytosine' },
                            { label: 'C', text: 'Thymine' },
                            { label: 'D', text: 'Uracil' }
                        ],
                        correctIndex: 2
                    },
                    {
                        order: 2,
                        prompt: 'What is the direct product of DNA transcription inside the eukaryotic nucleus?',
                        options: [
                            { label: 'A', text: 'Polypeptide chain' },
                            { label: 'B', text: 'Messenger RNA (mRNA)' },
                            { label: 'C', text: 'Phospholipid bilayer' },
                            { label: 'D', text: 'Transfer RNA (tRNA)' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'How many haploid daughter cells are generated at the conclusion of meiosis?',
                        options: [
                            { label: 'A', text: 'Two identical diploid cells' },
                            { label: 'B', text: 'Four genetically diverse haploid cells' },
                            { label: 'C', text: 'One somatic cell' },
                            { label: 'D', text: 'Eight identical spores' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'During which phase of meiosis does genetic crossing over take place?',
                        options: [
                            { label: 'A', text: 'Metaphase II' },
                            { label: 'B', text: 'Anaphase I' },
                            { label: 'C', text: 'Prophase I' },
                            { label: 'D', text: 'Telophase II' }
                        ],
                        correctIndex: 2
                    }
                ]
            },
            {
                title: 'Biology Quiz 3 – Physiology, Transport & Ecology',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'Which heart chamber pumps oxygenated blood into the aorta for systemic distribution?',
                        options: [
                            { label: 'A', text: 'Right atrium' },
                            { label: 'B', text: 'Right ventricle' },
                            { label: 'C', text: 'Left atrium' },
                            { label: 'D', text: 'Left ventricle' }
                        ],
                        correctIndex: 3
                    },
                    {
                        order: 2,
                        prompt: 'Which plant vascular tissue is specialized for the bidirectional translocation of sugars?',
                        options: [
                            { label: 'A', text: 'Xylem' },
                            { label: 'B', text: 'Phloem' },
                            { label: 'C', text: 'Epidermis' },
                            { label: 'D', text: 'Cortex' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'Approximately what percentage of energy is transferred from one trophic level to the next?',
                        options: [
                            { label: 'A', text: '10%' },
                            { label: 'B', text: '50%' },
                            { label: 'C', text: '75%' },
                            { label: 'D', text: '90%' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 4,
                        prompt: 'What structure on plant leaves regulates gas exchange and transpirational water loss?',
                        options: [
                            { label: 'A', text: 'Lenticels' },
                            { label: 'B', text: 'Stomata' },
                            { label: 'C', text: 'Root hairs' },
                            { label: 'D', text: 'Cambium' }
                        ],
                        correctIndex: 1
                    }
                ]
            }
        ]
    },
    // ── 2. MATHEMATICS ──────────────────────────────────────────────────────────
    {
        id: 'seed-course-mathematics',
        title: 'Mathematics Algebra',
        subject: 'Mathematics',
        description: 'Master algebraic equations, quadratic formulas, functions, and progressions.',
        offlinePackageSizeMb: 12,
        lessons: [
            {
                order: 1,
                title: 'Real Numbers & Algebraic Expressions',
                keyPoints: [
                    'Real numbers include rational and irrational numbers.',
                    'Algebraic expressions combine constants, variables, and arithmetic operations.',
                    'The distributive property states: a(b + c) = ab + ac.',
                    'Like terms can be combined by adding or subtracting their numerical coefficients.'
                ],
                contentHtml: `
          <h2>Foundations of Algebraic Expressions</h2>
          <p>Algebra generalizes arithmetic by using variable symbols to denote unknown quantities. Understanding order of operations (PEMDAS/BODMAS) is crucial for simplifying complex expressions.</p>
        `
            },
            {
                order: 2,
                title: 'Solving Linear Equations in One Variable',
                keyPoints: [
                    'A linear equation in one variable has the general form ax + b = c (a ≠ 0).',
                    'Applying equivalent inverse operations maintains equality on both sides.',
                    'Equations can have one solution, no solution, or infinitely many solutions (identities).',
                    'Always verify solutions by substituting the value back into the original equation.'
                ],
                contentHtml: `
          <h2>Linear Equations in One Variable</h2>
          <p>To solve linear equations, isolate the variable term using additive and multiplicative inverses. For example: 3x - 7 = 14 → 3x = 21 → x = 7.</p>
        `
            },
            {
                order: 3,
                title: 'Linear Inequalities & Number Line Graphing',
                keyPoints: [
                    'Inequalities use relation symbols: <, ≤, >, ≥.',
                    'Multiplying or dividing both sides by a negative number reverses the inequality direction.',
                    'Solutions are represented as intervals or shaded regions on a real number line.',
                    'Compound inequalities combine conditions using AND (intersection) or OR (union).'
                ],
                contentHtml: `
          <h2>Solving and Graphing Inequalities</h2>
          <p>Care must be taken when multiplying or dividing by negatives: -2x < 6 becomes x > -3. Open circles denote strict bounds (<, >), while closed dots indicate inclusive bounds (≤, ≥).</p>
        `
            },
            {
                order: 4,
                title: 'Systems of Linear Equations',
                keyPoints: [
                    'A system of equations consists of two or more equations sharing common variables.',
                    'Key solving methods: Substitution, Elimination, and Matrix/Determinant methods.',
                    'Independent systems have one unique intersection point (x, y).',
                    'Inconsistent systems have parallel lines with zero common solutions.'
                ],
                contentHtml: `
          <h2>Systems of Linear Equations</h2>
          <p>When solving systems like 2x + y = 9 and x - y = 3, adding the equations eliminates y directly: 3x = 12 → x = 4, then y = 1.</p>
        `
            },
            {
                order: 5,
                title: 'Polynomial Operations & Degree Rules',
                keyPoints: [
                    'A polynomial is an expression with non-negative integer exponents.',
                    'The degree is the highest exponent of the variable in any term.',
                    'Addition and subtraction require grouping terms with identical variable powers.',
                    'Multiplication uses the FOIL method for binomials and distributive law for polynomials.'
                ],
                contentHtml: `
          <h2>Polynomial Arithmetic</h2>
          <p>Classify polynomials by terms (monomial, binomial, trinomial) and degree (linear, quadratic, cubic). When multiplying (x + 3)(x - 5), expand to x² - 2x - 15.</p>
        `
            },
            {
                order: 6,
                title: 'Factoring Techniques & Special Products',
                keyPoints: [
                    'Factoring writes a polynomial as a product of irreducible factors.',
                    'Difference of squares formula: a² - b² = (a - b)(a + b).',
                    'Perfect square trinomials: a² ± 2ab + b² = (a ± b)².',
                    'Always begin by factoring out the greatest common factor (GCF).'
                ],
                contentHtml: `
          <h2>Factoring Polynomials</h2>
          <p>Factoring is the inverse of polynomial multiplication. Recognizing patterns like difference of squares (e.g. 4x² - 25 = (2x - 5)(2x + 5)) enables rapid algebraic simplification.</p>
        `
            },
            {
                order: 7,
                title: 'Quadratic Equations & The Quadratic Formula',
                keyPoints: [
                    'Standard form of a quadratic equation: ax² + bx + c = 0 (a ≠ 0).',
                    'Quadratic formula: x = (-b ± √(b² - 4ac)) / (2a).',
                    'Discriminant Δ = b² - 4ac reveals the nature of roots (two real, one real, or two complex).',
                    'Quadratic functions graph as parabolas with a distinct vertex and axis of symmetry.'
                ],
                contentHtml: `
          <h2>Quadratic Equations and Roots</h2>
          <p>Quadratic equations model projectile trajectories, profit curves, and area calculations. When Δ > 0, there are two distinct real roots; when Δ = 0, exactly one repeated root exists.</p>
        `
            },
            {
                order: 8,
                title: 'Functions, Domain, Range & Graphs',
                keyPoints: [
                    'A function maps every input in the domain to exactly one output in the range.',
                    'The vertical line test determines whether a geometric curve is a valid function.',
                    'Function notation f(x) represents the dependent output evaluated at input x.',
                    'Linear functions f(x) = mx + b have constant slope m and y-intercept b.'
                ],
                contentHtml: `
          <h2>Understanding Mathematical Functions</h2>
          <p>Functions represent systematic relationships between variables. Determine domain restrictions by avoiding zero division and negative radicals in real domains.</p>
        `
            },
            {
                order: 9,
                title: 'Exponents, Radicals & Logarithms',
                keyPoints: [
                    'Product rule of exponents: xᵃ · xᵇ = xᵃ⁺ᵇ.',
                    'Fractional exponents denote radicals: x^(m/n) = ⁿ√(xᵐ).',
                    'Logarithm is the inverse of exponentiation: log_b(y) = x ⇔ bˣ = y.',
                    'Common logarithm uses base 10; natural logarithm (ln) uses base e ≈ 2.718.'
                ],
                contentHtml: `
          <h2>Exponentials and Logarithmic Operations</h2>
          <p>Logarithms convert multiplicative processes into additive ones: log(xy) = log(x) + log(y). This property underpins decibel scales, Richter scales, and pH calculations.</p>
        `
            },
            {
                order: 10,
                title: 'Sequences: Arithmetic & Geometric Progressions',
                keyPoints: [
                    'Arithmetic progression (AP) has a constant difference d: aₙ = a₁ + (n - 1)d.',
                    'The sum of an AP series is Sₙ = n/2 · (2a₁ + (n - 1)d).',
                    'Geometric progression (GP) has a constant ratio r: aₙ = a₁ · r^(n - 1).',
                    'Infinite geometric series converge to S = a₁ / (1 - r) when |r| < 1.'
                ],
                contentHtml: `
          <h2>Arithmetic and Geometric Sequences</h2>
          <p>Sequences model discrete growth, compound interest, and algorithmic time complexity. Gauss famously summed APs by pairing first and last terms.</p>
        `
            }
        ],
        quizzes: [
            {
                title: 'Mathematics Quiz 1 – Linear Equations & Systems',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'Solve for x in the equation: 4x - 9 = 15',
                        options: [
                            { label: 'A', text: 'x = 4' },
                            { label: 'B', text: 'x = 6' },
                            { label: 'C', text: 'x = 8' },
                            { label: 'D', text: 'x = 3' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'What happens to the inequality sign when both sides of -3x > 12 are divided by -3?',
                        options: [
                            { label: 'A', text: 'The sign remains >' },
                            { label: 'B', text: 'The sign reverses to <' },
                            { label: 'C', text: 'The sign turns into an equal sign' },
                            { label: 'D', text: 'The inequality becomes undefined' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'Find the solution to the system: x + y = 10 and x - y = 4',
                        options: [
                            { label: 'A', text: 'x = 7, y = 3' },
                            { label: 'B', text: 'x = 6, y = 4' },
                            { label: 'C', text: 'x = 8, y = 2' },
                            { label: 'D', text: 'x = 5, y = 5' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 4,
                        prompt: 'What is the slope of the linear equation 2y = 6x + 8?',
                        options: [
                            { label: 'A', text: '6' },
                            { label: 'B', text: '4' },
                            { label: 'C', text: '3' },
                            { label: 'D', text: '8' }
                        ],
                        correctIndex: 2
                    }
                ]
            },
            {
                title: 'Mathematics Quiz 2 – Polynomials & Quadratics',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'What is the factored form of the difference of squares: x² - 49?',
                        options: [
                            { label: 'A', text: '(x - 7)(x - 7)' },
                            { label: 'B', text: '(x + 7)(x + 7)' },
                            { label: 'C', text: '(x - 7)(x + 7)' },
                            { label: 'D', text: 'x(x - 49)' }
                        ],
                        correctIndex: 2
                    },
                    {
                        order: 2,
                        prompt: 'What are the solutions to the quadratic equation x² - 5x + 6 = 0?',
                        options: [
                            { label: 'A', text: 'x = 2 and x = 3' },
                            { label: 'B', text: 'x = -2 and x = -3' },
                            { label: 'C', text: 'x = 1 and x = 6' },
                            { label: 'D', text: 'x = -1 and x = 5' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 3,
                        prompt: 'What does a discriminant Δ = b² - 4ac of zero indicate about a quadratic equation?',
                        options: [
                            { label: 'A', text: 'Two distinct real roots' },
                            { label: 'B', text: 'Exactly one real repeated root' },
                            { label: 'C', text: 'Two complex imaginary roots' },
                            { label: 'D', text: 'No solutions exist' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'Expand the binomial product: (2x + 3)(x - 4)',
                        options: [
                            { label: 'A', text: '2x² - 8x - 12' },
                            { label: 'B', text: '2x² - 5x - 12' },
                            { label: 'C', text: '2x² + 5x - 12' },
                            { label: 'D', text: '2x² - 12' }
                        ],
                        correctIndex: 1
                    }
                ]
            },
            {
                title: 'Mathematics Quiz 3 – Functions, Logarithms & Progressions',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'What is the value of log₂(32)?',
                        options: [
                            { label: 'A', text: '4' },
                            { label: 'B', text: '5' },
                            { label: 'C', text: '6' },
                            { label: 'D', text: '16' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'In an arithmetic progression with first term a₁ = 3 and common difference d = 4, what is the 10th term?',
                        options: [
                            { label: 'A', text: '39' },
                            { label: 'B', text: '40' },
                            { label: 'C', text: '43' },
                            { label: 'D', text: '36' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 3,
                        prompt: 'Evaluate the expression 3⁻²:',
                        options: [
                            { label: 'A', text: '-6' },
                            { label: 'B', text: '-9' },
                            { label: 'C', text: '1/9' },
                            { label: 'D', text: '1/6' }
                        ],
                        correctIndex: 2
                    },
                    {
                        order: 4,
                        prompt: 'What is the common ratio r of the geometric progression: 3, 6, 12, 24, ...?',
                        options: [
                            { label: 'A', text: '3' },
                            { label: 'B', text: '2' },
                            { label: 'C', text: '4' },
                            { label: 'D', text: '6' }
                        ],
                        correctIndex: 1
                    }
                ]
            }
        ]
    },
    // ── 3. PHYSICS ─────────────────────────────────────────────────────────────
    {
        id: 'seed-course-physics',
        title: 'Physics Motion',
        subject: 'Physics',
        description: 'Understand kinematic motion, Newton’s laws, work, energy, gravitation, and momentum.',
        offlinePackageSizeMb: 10,
        lessons: [
            {
                order: 1,
                title: 'Measurement, Units & Scalars vs. Vectors',
                keyPoints: [
                    'SI base units provide international measurement standards (meter, kilogram, second).',
                    'Scalars possess magnitude only (mass, temperature, speed, time).',
                    'Vectors possess both magnitude and direction (displacement, velocity, force).',
                    'Dimensional analysis checks the physical consistency of algebraic equations.'
                ],
                contentHtml: `
          <h2>Physical Quantities and Units</h2>
          <p>Physics explains how matter and energy interact. Distinguishing between vectors and scalars is essential: traveling 50 km/h is a scalar speed, but 50 km/h East is a vector velocity.</p>
        `
            },
            {
                order: 2,
                title: 'Displacement, Velocity & Acceleration',
                keyPoints: [
                    'Displacement (Δx) is the net change in position: x_final - x_initial.',
                    'Average velocity is displacement divided by elapsed time (v = Δx / Δt).',
                    'Acceleration measures the rate of change of velocity (a = Δv / Δt).',
                    'Zero acceleration means velocity is strictly constant.'
                ],
                contentHtml: `
          <h2>Kinematic Variables of Motion</h2>
          <p>Displacement can be zero even after moving hundreds of miles if the object returns to its starting point. Acceleration occurs whenever speed or direction changes.</p>
        `
            },
            {
                order: 3,
                title: 'Graphical Analysis: Position, Velocity & Time',
                keyPoints: [
                    'The slope of a position-time (x-t) graph yields instantaneous velocity.',
                    'The slope of a velocity-time (v-t) graph yields instantaneous acceleration.',
                    'The area under a velocity-time curve represents net displacement.',
                    'The area under an acceleration-time curve represents velocity change.'
                ],
                contentHtml: `
          <h2>Interpreting Motion Graphs</h2>
          <p>Visualizing motion with graphs connects geometry and calculus. Horizontal lines on an x-t graph show an object at rest; diagonal lines represent constant velocity.</p>
        `
            },
            {
                order: 4,
                title: 'Equations of Uniformly Accelerated Motion',
                keyPoints: [
                    'First kinematic equation: v = u + at.',
                    'Second kinematic equation: s = ut + 0.5at².',
                    'Third kinematic equation: v² = u² + 2as.',
                    'Fourth kinematic equation: s = ((u + v) / 2) · t.'
                ],
                contentHtml: `
          <h2>Constant Acceleration Kinematics</h2>
          <p>When acceleration remains constant, these four kinematic formulas predict an object’s trajectory without needing step-by-step numerical summation.</p>
        `
            },
            {
                order: 5,
                title: 'Newton’s First & Second Laws of Motion',
                keyPoints: [
                    'First Law (Inertia): An object remains at rest or uniform motion unless acted upon by a net force.',
                    'Second Law: Net force equals mass times acceleration: ΣF = ma.',
                    'Mass is the quantitative measure of an object’s inertia.',
                    'The SI unit of force is the Newton (1 N = 1 kg·m/s²).'
                ],
                contentHtml: `
          <h2>Newton’s Laws of Motion</h2>
          <p>Isaac Newton’s Principia Mathematica established the laws governing classical mechanics. Balanced forces result in constant velocity; unbalanced net forces create acceleration.</p>
        `
            },
            {
                order: 6,
                title: 'Newton’s Third Law & Momentum Conservation',
                keyPoints: [
                    'Third Law: For every action force, there is an equal and opposite reaction force.',
                    'Action and reaction forces act on different interacting bodies, so they never cancel each other.',
                    'Linear momentum is defined as mass multiplied by velocity (p = mv).',
                    'In an isolated system, total momentum is conserved during all collisions.'
                ],
                contentHtml: `
          <h2>Action-Reaction and Momentum</h2>
          <p>Rockets accelerate forward because high-speed exhaust gases push backward against the rocket combustion chamber. Momentum conservation governs everything from billiards to car crashes.</p>
        `
            },
            {
                order: 7,
                title: 'Work, Kinetic Energy & Potential Energy',
                keyPoints: [
                    'Mechanical work is done when a force moves an object: W = F · d · cos(θ).',
                    'Kinetic energy is energy of motion: KE = 0.5 · m · v².',
                    'Gravitational potential energy near Earth’s surface: PE = m · g · h.',
                    'The work-energy theorem states that net work done equals the change in kinetic energy: W_net = ΔKE.'
                ],
                contentHtml: `
          <h2>Work and Energy Mechanics</h2>
          <p>Energy is the capacity to perform work, measured in Joules (J). Holding a stationary heavy barbell requires muscular exertion but performs zero mechanical work on the barbell.</p>
        `
            },
            {
                order: 8,
                title: 'Conservation of Energy, Power & Efficiency',
                keyPoints: [
                    'The Law of Conservation of Energy: Energy cannot be created or destroyed, only transformed.',
                    'Total mechanical energy is constant in conservative systems: E_total = KE + PE.',
                    'Power is the rate of performing work: P = W / t = F · v.',
                    'Efficiency is the ratio of useful energy output to total energy input.'
                ],
                contentHtml: `
          <h2>Energy Conservation and Power</h2>
          <p>A roller coaster transforms gravitational potential energy at its summit into maximum kinetic energy at the base of the loop, dissipating a small fraction as thermal friction.</p>
        `
            },
            {
                order: 9,
                title: 'Universal Gravitation & Free Fall Motion',
                keyPoints: [
                    'Newton’s Law of Gravitation: F_g = G · (m₁ · m₂) / r².',
                    'Gravitational acceleration on Earth surface: g ≈ 9.8 m/s².',
                    'In a vacuum, all objects fall at the exact same rate regardless of their mass.',
                    'Apparent weightlessness in orbit occurs during continuous orbital free fall.'
                ],
                contentHtml: `
          <h2>Gravity and Free Fall</h2>
          <p>Galileo demonstrated at Pisa that heavy and light spheres strike the ground simultaneously in the absence of air resistance. Satellites remain in orbit because they fall around Earth’s curvature.</p>
        `
            },
            {
                order: 10,
                title: 'Circular Motion, Centripetal Force & Friction',
                keyPoints: [
                    'Uniform circular motion involves constant speed with continuously changing direction.',
                    'Centripetal acceleration points toward the circle’s center: a_c = v² / r.',
                    'Centripetal force is the net inward force required: F_c = m · v² / r.',
                    'Static friction prevents slipping; kinetic friction opposes active sliding motion.'
                ],
                contentHtml: `
          <h2>Circular Dynamics and Friction</h2>
          <p>When a vehicle negotiates a turn, inward static friction between tires and pavement provides the needed centripetal force. Banked roadways allow gravity to supply this force safely at high speeds.</p>
        `
            }
        ],
        quizzes: [
            {
                title: 'Physics Quiz 1 – Kinematics & Graph Analysis',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'Which of the following is a vector quantity?',
                        options: [
                            { label: 'A', text: 'Speed' },
                            { label: 'B', text: 'Distance' },
                            { label: 'C', text: 'Displacement' },
                            { label: 'D', text: 'Mass' }
                        ],
                        correctIndex: 2
                    },
                    {
                        order: 2,
                        prompt: 'What physical quantity does the area under a velocity-time graph represent?',
                        options: [
                            { label: 'A', text: 'Acceleration' },
                            { label: 'B', text: 'Displacement' },
                            { label: 'C', text: 'Force' },
                            { label: 'D', text: 'Power' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'A car accelerates uniformly from rest at 3 m/s² for 4 seconds. What is its final velocity?',
                        options: [
                            { label: 'A', text: '7 m/s' },
                            { label: 'B', text: '12 m/s' },
                            { label: 'C', text: '24 m/s' },
                            { label: 'D', text: '18 m/s' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'What is the slope of a position-time graph?',
                        options: [
                            { label: 'A', text: 'Acceleration' },
                            { label: 'B', text: 'Instantaneous velocity' },
                            { label: 'C', text: 'Total momentum' },
                            { label: 'D', text: 'Kinetic energy' }
                        ],
                        correctIndex: 1
                    }
                ]
            },
            {
                title: 'Physics Quiz 2 – Newton’s Laws & Momentum',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'What net force is required to accelerate a 5 kg mass at 4 m/s²?',
                        options: [
                            { label: 'A', text: '20 N' },
                            { label: 'B', text: '9 N' },
                            { label: 'C', text: '1.25 N' },
                            { label: 'D', text: '40 N' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 2,
                        prompt: 'Why don’t action and reaction forces cancel each other out?',
                        options: [
                            { label: 'A', text: 'They act on different interacting bodies' },
                            { label: 'B', text: 'They occur at different times' },
                            { label: 'C', text: 'One force is always larger than the other' },
                            { label: 'D', text: 'Friction prevents them from interacting' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 3,
                        prompt: 'What is the momentum of a 1000 kg vehicle moving at 20 m/s?',
                        options: [
                            { label: 'A', text: '50 kg·m/s' },
                            { label: 'B', text: '20,000 kg·m/s' },
                            { label: 'C', text: '200,000 kg·m/s' },
                            { label: 'D', text: '10,000 kg·m/s' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'Which law of physics explains the recoil felt when firing a cannon?',
                        options: [
                            { label: 'A', text: 'Newton’s First Law' },
                            { label: 'B', text: 'Newton’s Third Law' },
                            { label: 'C', text: 'Hooke’s Law' },
                            { label: 'D', text: 'Ohm’s Law' }
                        ],
                        correctIndex: 1
                    }
                ]
            },
            {
                title: 'Physics Quiz 3 – Work, Energy & Gravitation',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'How much kinetic energy does a 2 kg object possess when traveling at 6 m/s?',
                        options: [
                            { label: 'A', text: '12 J' },
                            { label: 'B', text: '36 J' },
                            { label: 'C', text: '72 J' },
                            { label: 'D', text: '18 J' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'If you push against a concrete wall with 200 N of force for 5 minutes without it moving, how much mechanical work was done on the wall?',
                        options: [
                            { label: 'A', text: '1000 J' },
                            { label: 'B', text: '0 J' },
                            { label: 'C', text: '60,000 J' },
                            { label: 'D', text: '200 J' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'What happens to the gravitational attraction between two masses if the distance separating them is doubled?',
                        options: [
                            { label: 'A', text: 'It is halved' },
                            { label: 'B', text: 'It reduces to one-fourth (1/4)' },
                            { label: 'C', text: 'It doubles' },
                            { label: 'D', text: 'It remains unchanged' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'What is the centripetal acceleration of a body moving at 10 m/s around a circular track of radius 25 m?',
                        options: [
                            { label: 'A', text: '4 m/s²' },
                            { label: 'B', text: '0.4 m/s²' },
                            { label: 'C', text: '2.5 m/s²' },
                            { label: 'D', text: '250 m/s²' }
                        ],
                        correctIndex: 0
                    }
                ]
            }
        ]
    },
    // ── 4. CHEMISTRY ────────────────────────────────────────────────────────────
    {
        id: 'seed-course-chemistry',
        title: 'Chemistry Basics',
        subject: 'Chemistry',
        description: 'Discover atomic structure, bonding, chemical reactions, stoichiometry, and acids/bases.',
        offlinePackageSizeMb: 14,
        lessons: [
            {
                order: 1,
                title: 'Matter, Atoms & Subatomic Particles',
                keyPoints: [
                    'Matter consists of elements composed of indestructible basic units called atoms.',
                    'Protons (positive charge) and neutrons (neutral) reside in the central nucleus.',
                    'Electrons (negative charge) orbit the nucleus in quantized energy shells.',
                    'Atomic number (Z) equals the number of protons and defines the element.'
                ],
                contentHtml: `
          <h2>Atomic Architecture and Matter</h2>
          <p>Chemistry examines the transformation of matter. Rutherford’s gold foil experiment demonstrated that the mass of an atom is concentrated in a tiny, dense nucleus surrounded mostly by empty space.</p>
        `
            },
            {
                order: 2,
                title: 'Atomic Mass, Isotopes & Electron Configuration',
                keyPoints: [
                    'Mass number (A) equals total protons plus neutrons in the nucleus.',
                    'Isotopes are atoms of the same element with different neutron counts (e.g., C-12, C-14).',
                    'Bohr model and quantum mechanics describe electron orbitals (s, p, d, f).',
                    'Valence electrons in the outermost shell govern chemical bonding behavior.'
                ],
                contentHtml: `
          <h2>Isotopes and Electron Shells</h2>
          <p>The Aufbau principle, Pauli exclusion principle, and Hund’s rule dictate how electrons fill subshells. Valence electrons determine whether an atom donates, accepts, or shares electrons.</p>
        `
            },
            {
                order: 3,
                title: 'The Periodic Table & Periodic Trends',
                keyPoints: [
                    'Mendeleev organized elements by properties; modern tables sort by increasing atomic number.',
                    'Periods correspond to electron energy levels; groups share valence electron configurations.',
                    'Atomic radius decreases across a period and increases down a group.',
                    'Electronegativity and ionization energy increase across a period toward fluorine.'
                ],
                contentHtml: `
          <h2>Periodic Classification and Trends</h2>
          <p>Periodic trends emerge from effective nuclear charge and electron shielding. Noble gases (Group 18) possess stable octets, rendering them chemically unreactive.</p>
        `
            },
            {
                order: 4,
                title: 'Chemical Bonding: Ionic vs. Covalent Bonds',
                keyPoints: [
                    'Ionic bonds form through complete electron transfer between metals and nonmetals.',
                    'Covalent bonds form through shared pairs of electrons between nonmetallic atoms.',
                    'Polar covalent bonds exhibit uneven electron sharing due to electronegativity differences.',
                    'Lewis dot structures represent valence electrons and bonding geometry.'
                ],
                contentHtml: `
          <h2>Mechanisms of Chemical Bonding</h2>
          <p>Atoms form bonds to achieve stable octet configurations. Sodium (Na) donates an electron to chlorine (Cl), yielding Na⁺ and Cl⁻ electrostatic attraction in crystalline salt lattice.</p>
        `
            },
            {
                order: 5,
                title: 'Molecular Geometry & Intermolecular Forces',
                keyPoints: [
                    'VSEPR theory predicts 3D molecular shapes based on electron pair repulsion.',
                    'Common geometries: linear, trigonal planar, tetrahedral, bent, trigonal pyramidal.',
                    'Intermolecular forces include London dispersion, dipole-dipole, and hydrogen bonds.',
                    'Hydrogen bonds give water its anomalously high boiling point and surface tension.'
                ],
                contentHtml: `
          <h2>Shapes of Molecules and Intermolecular Forces</h2>
          <p>Water (H₂O) adopts a bent geometry (~104.5°) due to two lone pairs repelling bonding pairs. Hydrogen bonding between water molecules creates unique properties essential for life.</p>
        `
            },
            {
                order: 6,
                title: 'Writing & Balancing Chemical Equations',
                keyPoints: [
                    'Law of Conservation of Mass: Mass of reactants must equal mass of products.',
                    'Subscripts denote atoms inside a molecule; coefficients scale the entire molecule.',
                    'Never change subscripts when balancing chemical equations.',
                    'State symbols indicate physical form: (s) solid, (l) liquid, (g) gas, (aq) aqueous.'
                ],
                contentHtml: `
          <h2>Balancing Chemical Equations</h2>
          <p>Antoine Lavoisier demonstrated that chemical changes rearrange atoms without creating or destroying mass: 2H₂ + O₂ → 2H₂O balances 4 hydrogen and 2 oxygen atoms on each side.</p>
        `
            },
            {
                order: 7,
                title: 'Types of Chemical Reactions',
                keyPoints: [
                    'Synthesis (combination): A + B → AB.',
                    'Decomposition: AB → A + B.',
                    'Single replacement: A + BC → AC + B.',
                    'Double replacement: AB + CD → AD + CB (often forms precipitates).',
                    'Combustion: Hydrocarbon + O₂ → CO₂ + H₂O + heat.'
                ],
                contentHtml: `
          <h2>Classifying Chemical Reactions</h2>
          <p>Recognizing reaction categories allows chemists to predict product formation. Combustion reactions are exothermic, driving internal combustion engines and power plants.</p>
        `
            },
            {
                order: 8,
                title: 'The Mole Concept & Stoichiometry',
                keyPoints: [
                    'One mole contains Avogadro’s number of particles: 6.022 × 10²³.',
                    'Molar mass (g/mol) equals the atomic mass from the periodic table.',
                    'Stoichiometric coefficients define the exact molar ratios of reacting species.',
                    'The limiting reactant runs out first and caps theoretical product yield.'
                ],
                contentHtml: `
          <h2>Stoichiometric Calculations</h2>
          <p>The mole bridges macroscopic grams to microscopic atoms. Converting grams to moles using molar mass allows precise calculation of product quantities and percent yields.</p>
        `
            },
            {
                order: 9,
                title: 'Acids, Bases & The pH Scale',
                keyPoints: [
                    'Arrhenius acids produce H⁺ in water; bases produce OH⁻.',
                    'Brønsted-Lowry definition: Acids are proton donors; bases are proton acceptors.',
                    'The pH scale measures acidity: pH = -log[H⁺], ranging from 0 (acidic) to 14 (basic).',
                    'Neutralization: Acid + Base → Salt + Water (e.g. HCl + NaOH → NaCl + H₂O).'
                ],
                contentHtml: `
          <h2>Acids, Bases and Neutralization</h2>
          <p>Pure water has a neutral pH of 7.0 at 25°C. Strong acids like hydrochloric acid dissociate completely, while weak acids like acetic acid establish dynamic chemical equilibria.</p>
        `
            },
            {
                order: 10,
                title: 'Chemical Kinetics & Reaction Rates',
                keyPoints: [
                    'Collision theory: Reactions require adequate kinetic energy and correct orientation.',
                    'Activation energy (Ea) is the minimum energy barrier needed to initiate reaction.',
                    'Factors accelerating rates: higher temperature, concentration, surface area, pressure.',
                    'Catalysts speed up reactions by offering an alternate pathway with lower activation energy.'
                ],
                contentHtml: `
          <h2>Chemical Kinetics and Catalysis</h2>
          <p>Catalysts participate in chemical processes without being consumed. Biological enzymes act as specialized catalysts that enable life-sustaining metabolic reactions at body temperature.</p>
        `
            }
        ],
        quizzes: [
            {
                title: 'Chemistry Quiz 1 – Atoms & The Periodic Table',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'What subatomic particle determines the atomic number of an element?',
                        options: [
                            { label: 'A', text: 'Neutron' },
                            { label: 'B', text: 'Proton' },
                            { label: 'C', text: 'Electron' },
                            { label: 'D', text: 'Positron' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'Atoms of the same element that have different numbers of neutrons are known as:',
                        options: [
                            { label: 'A', text: 'Isotopes' },
                            { label: 'B', text: 'Allotropes' },
                            { label: 'C', text: 'Isomers' },
                            { label: 'D', text: 'Isobars' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 3,
                        prompt: 'Which group on the periodic table contains unreactive noble gases with full valence octets?',
                        options: [
                            { label: 'A', text: 'Group 1 (Alkali metals)' },
                            { label: 'B', text: 'Group 17 (Halogens)' },
                            { label: 'C', text: 'Group 18 (Noble gases)' },
                            { label: 'D', text: 'Group 2 (Alkaline earth metals)' }
                        ],
                        correctIndex: 2
                    },
                    {
                        order: 4,
                        prompt: 'Which element is the most electronegative on the periodic table?',
                        options: [
                            { label: 'A', text: 'Oxygen' },
                            { label: 'B', text: 'Chlorine' },
                            { label: 'C', text: 'Fluorine' },
                            { label: 'D', text: 'Sodium' }
                        ],
                        correctIndex: 2
                    }
                ]
            },
            {
                title: 'Chemistry Quiz 2 – Bonding & Chemical Reactions',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'What type of chemical bond forms when electrons are shared between nonmetal atoms?',
                        options: [
                            { label: 'A', text: 'Ionic bond' },
                            { label: 'B', text: 'Covalent bond' },
                            { label: 'C', text: 'Metallic bond' },
                            { label: 'D', text: 'Hydrogen bond' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'Balance the equation: _H₂ + _O₂ → 2H₂O. What is the coefficient for H₂?',
                        options: [
                            { label: 'A', text: '1' },
                            { label: 'B', text: '2' },
                            { label: 'C', text: '3' },
                            { label: 'D', text: '4' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'What kind of reaction is represented by 2Na + Cl₂ → 2NaCl?',
                        options: [
                            { label: 'A', text: 'Decomposition' },
                            { label: 'B', text: 'Synthesis (Combination)' },
                            { label: 'C', text: 'Single replacement' },
                            { label: 'D', text: 'Double replacement' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'What molecular geometry does a methane (CH₄) molecule possess?',
                        options: [
                            { label: 'A', text: 'Linear' },
                            { label: 'B', text: 'Trigonal planar' },
                            { label: 'C', text: 'Tetrahedral' },
                            { label: 'D', text: 'Bent' }
                        ],
                        correctIndex: 2
                    }
                ]
            },
            {
                title: 'Chemistry Quiz 3 – Stoichiometry, Acids & Kinetics',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'What is the numerical value of Avogadro’s number?',
                        options: [
                            { label: 'A', text: '3.00 × 10⁸' },
                            { label: 'B', text: '6.022 × 10²³' },
                            { label: 'C', text: '9.81 × 10³' },
                            { label: 'D', text: '1.602 × 10⁻¹⁹' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'A solution with a pH of 2 is classified as:',
                        options: [
                            { label: 'A', text: 'Strongly acidic' },
                            { label: 'B', text: 'Weakly basic' },
                            { label: 'C', text: 'Neutral' },
                            { label: 'D', text: 'Strongly basic' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 3,
                        prompt: 'What products are formed in an acid-base neutralization reaction between HCl and NaOH?',
                        options: [
                            { label: 'A', text: 'NaCl and H₂O' },
                            { label: 'B', text: 'NaH and Cl₂' },
                            { label: 'C', text: 'NaOH and Cl₂' },
                            { label: 'D', text: 'H₂ and O₂' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 4,
                        prompt: 'How does a catalyst increase the rate of a chemical reaction?',
                        options: [
                            { label: 'A', text: 'By increasing the temperature of reactants' },
                            { label: 'B', text: 'By lowering the activation energy barrier' },
                            { label: 'C', text: 'By increasing the volume of products' },
                            { label: 'D', text: 'By shifting the reaction equilibrium position' }
                        ],
                        correctIndex: 1
                    }
                ]
            }
        ]
    },
    // ── 5. INDIAN HISTORY ───────────────────────────────────────────────────────
    {
        id: 'seed-course-history',
        title: 'Indian History',
        subject: 'History',
        description: 'Journey through ancient civilisations, classical empires, medieval dynasties, and independence.',
        offlinePackageSizeMb: 13,
        lessons: [
            {
                order: 1,
                title: 'Indus Valley Civilisation & Urban Planning',
                keyPoints: [
                    'Harappa and Mohenjo-daro flourished around 2600–1900 BCE along the Indus basin.',
                    'Remarkable urban grid planning with baked brick architecture and advanced drainage.',
                    'The Great Bath of Mohenjo-daro suggests ritual cleansing and civic organization.',
                    'Widespread trade networks connected the Indus civilisation to Mesopotamia.'
                ],
                contentHtml: `
          <h2>The Bronze Age Indus Valley Civilisation</h2>
          <p>Also called the Harappan civilisation, this urban society demonstrated sophisticated standardized weights, pictographic seals, dockyards (Lothal), and peaceful trade networks.</p>
        `
            },
            {
                order: 2,
                title: 'The Vedic Age & Philosophical Upanishads',
                keyPoints: [
                    'The Rigveda is the oldest preserved liturgical text in Indo-European linguistics.',
                    'Transition from early pastoral Rigvedic society to sedentary Later Vedic farming kingdoms.',
                    'Composition of the Upanishads shifted focus toward philosophical introspection and Brahman/Atman.',
                    'Evolution of early Janapadas and the development of early iron metallurgy.'
                ],
                contentHtml: `
          <h2>Vedic Society and Philosophy</h2>
          <p>The Vedic period laid the conceptual foundation for Indian philosophy, music, and grammar. The Upanishads explored profound questions of consciousness, karma, and liberation (moksha).</p>
        `
            },
            {
                order: 3,
                title: 'Rise of Jainism, Buddhism & Mahajanapadas',
                keyPoints: [
                    '16 Mahajanapadas emerged across the fertile Indo-Gangetic plain around the 6th century BCE.',
                    'Vardhamana Mahavira revived Jainism, emphasizing ahimsa (non-violence) and anekantavada.',
                    'Siddhartha Gautama (The Buddha) attained enlightenment, preaching the Four Noble Truths.',
                    'Magadha emerged as the dominant imperial power under Bimbisara and the Nanda dynasty.'
                ],
                contentHtml: `
          <h2>Sramanic Movements and Urbanization</h2>
          <p>The 6th century BCE witnessed profound intellectual churn. Buddhism and Jainism rejected rigid social stratification, advocating ethical conduct, meditation, and compassion.</p>
        `
            },
            {
                order: 4,
                title: 'The Mauryan Empire: Chandragupta & Ashoka',
                keyPoints: [
                    'Chandragupta Maurya founded the empire with the political guidance of Chanakya (Kautilya).',
                    'Chanakya’s Arthashastra outlined statecraft, economics, espionage, and military strategy.',
                    'Emperor Ashoka embraced Buddhism following the devastating Kalinga War (c. 261 BCE).',
                    'Ashoka’s edicts carved on stone pillars propagated moral governance (Dhamma) across Asia.'
                ],
                contentHtml: `
          <h2>The Grand Mauryan Empire</h2>
          <p>The Mauryan state unified almost the entire subcontinent under centralized administration. Ashoka renounced imperial conquest by sword in favor of conquest by moral righteousness (Dhammavijaya).</p>
        `
            },
            {
                order: 5,
                title: 'The Golden Age of the Guptas',
                keyPoints: [
                    'The Gupta Empire (4th–6th century CE) marked a classical zenith in Indian science and arts.',
                    'Aryabhata calculated pi accurately, proposed solar earth rotation, and developed trigonometry.',
                    'Kalidasa composed celebrated classical Sanskrit poetry and drama (Shakuntala).',
                    'Nalanda University grew into a celebrated international center of higher Buddhist learning.'
                ],
                contentHtml: `
          <h2>The Gupta Classical Renaissance</h2>
          <p>Under Chandragupta II (Vikramaditya), peaceful prosperity enabled advances in metallurgy (the Iron Pillar of Delhi), mathematics (the decimal zero system), and magnificent Ajanta cave murals.</p>
        `
            },
            {
                order: 6,
                title: 'The Delhi Sultanate & Administrative Evolution',
                keyPoints: [
                    'Establishment of the Sultanate in 1206 CE beginning with the Mamluk (Slave) dynasty.',
                    'Successive dynasties: Mamluks, Khaljis, Tughlaqs, Sayyids, and Lodis.',
                    'Alauddin Khalji implemented market reforms and fortified defense against Mongol invasions.',
                    'Indo-Islamic architectural synthesis produced monuments like the Qutb Minar.'
                ],
                contentHtml: `
          <h2>The Delhi Sultanate Period</h2>
          <p>Spanning over three centuries, the Sultanate integrated Indian and Persian administrative practices. Sufi and Bhakti saints preached universal devotion and syncretic cultural harmony.</p>
        `
            },
            {
                order: 7,
                title: 'The Mughal Empire: Akbar to Aurangzeb',
                keyPoints: [
                    'Babur founded the Mughal dynasty in 1526 following the First Battle of Panipat.',
                    'Akbar introduced administrative Mansabdari systems and promoted religious tolerance (Sulh-i-Kul).',
                    'Shah Jahan constructed the Taj Mahal, representing the peak of Mughal architectural elegance.',
                    'The empire reached its maximum territorial extent under Aurangzeb in the late 17th century.'
                ],
                contentHtml: `
          <h2>The Mughal Era and Cultural Flourishing</h2>
          <p>Akbar’s revenue minister Todar Mal reformed land taxation (Zabt system). Miniature paintings, classical Hindustani music, and monumental forts flourished under royal patronage.</p>
        `
            },
            {
                order: 8,
                title: 'European Expansion & The East India Company',
                keyPoints: [
                    'Vasco da Gama arrived in Calicut in 1498, initiating Portuguese sea trade.',
                    'The British East India Company gained political supremacy after the Battle of Plassey (1757).',
                    'The Battle of Buxar (1764) granted the Company Diwani (revenue collecting) rights in Bengal.',
                    'Economic policies drained wealth and caused devastating de-industrialization of local textiles.'
                ],
                contentHtml: `
          <h2>Colonial Subjugation and Resistance</h2>
          <p>Through the Doctrine of Lapse and Subsidiary Alliances, the Company systematically annexed princely states, subordinating Indian economic priorities to colonial British manufacturing.</p>
        `
            },
            {
                order: 9,
                title: 'The Revolt of 1857 & Freedom Movement Awakening',
                keyPoints: [
                    'The 1857 uprising began at Meerut, uniting sepoys, dispossessed rulers, and peasantry.',
                    'The rebellion led to the Government of India Act 1858, transferring power to the British Crown.',
                    'Formation of the Indian National Congress in 1885 catalyzed structured political dialogue.',
                    'Early nationalists (Moderates like Dadabhai Naoroji) exposed the colonial economic drain theory.'
                ],
                contentHtml: `
          <h2>The First War of Independence and National Awakening</h2>
          <p>Though militarily quelled, the 1857 rebellion shattered the illusion of benevolent colonial rule. Early 20th-century Swadeshi movements mobilized mass popular boycotts of foreign goods.</p>
        `
            },
            {
                order: 10,
                title: 'Mahatma Gandhi, Partition & Independence 1947',
                keyPoints: [
                    'Mahatma Gandhi pioneered mass non-violent resistance: Non-Cooperation, Salt Satyagraha, Quit India.',
                    'Subhas Chandra Bose organized the Indian National Army (INA) to liberate India militarily.',
                    'India attained independence on August 15, 1947, alongside the painful Partition.',
                    'Dr. B.R. Ambedkar chaired the drafting committee of the Indian Constitution, adopted in 1950.'
                ],
                contentHtml: `
          <h2>The Triumph of Freedom and Democratic Constitution</h2>
          <p>A multi-pronged struggle involving revolutionaries, mass satyagrahis, and naval mutineers forced British withdrawal. Independent India established the world’s largest secular democracy.</p>
        `
            }
        ],
        quizzes: [
            {
                title: 'History Quiz 1 – Ancient Indian Civilisations',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'Which famous archaeological structure was unearthed at Mohenjo-daro, signifying communal ritual bathing?',
                        options: [
                            { label: 'A', text: 'The Great Stupa' },
                            { label: 'B', text: 'The Great Bath' },
                            { label: 'C', text: 'The Iron Pillar' },
                            { label: 'D', text: 'The Sun Temple' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'Who was the chief advisor and strategist behind Chandragupta Maurya’s founding of the Mauryan Empire?',
                        options: [
                            { label: 'A', text: 'Aryabhata' },
                            { label: 'B', text: 'Chanakya (Kautilya)' },
                            { label: 'C', text: 'Banabhatta' },
                            { label: 'D', text: 'Harishena' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'Following which historic conflict did Emperor Ashoka renounce military conquest to embrace Buddhist Dhamma?',
                        options: [
                            { label: 'A', text: 'Battle of Panipat' },
                            { label: 'B', text: 'Kalinga War' },
                            { label: 'C', text: 'Battle of Hydaspes' },
                            { label: 'D', text: 'Battle of Plassey' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'Which ancient Indian text is celebrated as the earliest collection of Vedic hymns?',
                        options: [
                            { label: 'A', text: 'Samaveda' },
                            { label: 'B', text: 'Yajurveda' },
                            { label: 'C', text: 'Rigveda' },
                            { label: 'D', text: 'Atharvaveda' }
                        ],
                        correctIndex: 2
                    }
                ]
            },
            {
                title: 'History Quiz 2 – Classical, Sultanate & Mughal Periods',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'Which ancient seat of international higher learning flourished during the Gupta and Harsha eras in modern-day Bihar?',
                        options: [
                            { label: 'A', text: 'Nalanda University' },
                            { label: 'B', text: 'Taxila Academy' },
                            { label: 'C', text: 'Vikramashila' },
                            { label: 'D', text: 'Vallabhi' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 2,
                        prompt: 'Who founded the Mughal Empire in 1526 following the First Battle of Panipat?',
                        options: [
                            { label: 'A', text: 'Akbar' },
                            { label: 'B', text: 'Babur' },
                            { label: 'C', text: 'Humayun' },
                            { label: 'D', text: 'Shah Jahan' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'Which Mughal emperor initiated the policy of Sulh-i-Kul (universal peace and religious harmony)?',
                        options: [
                            { label: 'A', text: 'Aurangzeb' },
                            { label: 'B', text: 'Jahangir' },
                            { label: 'C', text: 'Akbar' },
                            { label: 'D', text: 'Babur' }
                        ],
                        correctIndex: 2
                    },
                    {
                        order: 4,
                        prompt: 'Who was the prominent Delhi Sultan known for rigorous market and price-control regulations?',
                        options: [
                            { label: 'A', text: 'Qutb ud-Din Aibak' },
                            { label: 'B', text: 'Alauddin Khalji' },
                            { label: 'C', text: 'Muhammad bin Tughluq' },
                            { label: 'D', text: 'Ibrahim Lodi' }
                        ],
                        correctIndex: 1
                    }
                ]
            },
            {
                title: 'History Quiz 3 – Freedom Struggle & Republic',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'In which year did the major Indian uprising against British East India Company rule ignite?',
                        options: [
                            { label: 'A', text: '1757' },
                            { label: 'B', text: '1857' },
                            { label: 'C', text: '1905' },
                            { label: 'D', text: '1942' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'Which famous march did Mahatma Gandhi lead in 1930 to protest the British monopoly on salt?',
                        options: [
                            { label: 'A', text: 'Bardoli March' },
                            { label: 'B', text: 'Dandi March' },
                            { label: 'C', text: 'Champaran Yatra' },
                            { label: 'D', text: 'Delhi Chalo' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'Who chaired the drafting committee that framed the Constitution of Independent India?',
                        options: [
                            { label: 'A', text: 'Jawaharlal Nehru' },
                            { label: 'B', text: 'Dr. B.R. Ambedkar' },
                            { label: 'C', text: 'Sardar Vallabhbhai Patel' },
                            { label: 'D', text: 'Dr. Rajendra Prasad' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'Who formed the Indian National Army (Azad Hind Fauj) to fight British rule with the slogan "Give me blood, and I will give you freedom"?',
                        options: [
                            { label: 'A', text: 'Bhagat Singh' },
                            { label: 'B', text: 'Subhas Chandra Bose' },
                            { label: 'C', text: 'Chandrashekhar Azad' },
                            { label: 'D', text: 'Lala Lajpat Rai' }
                        ],
                        correctIndex: 1
                    }
                ]
            }
        ]
    },
    // ── 6. COMPUTER SCIENCE ─────────────────────────────────────────────────────
    {
        id: 'seed-course-computer-science',
        title: 'Computer Science',
        subject: 'Computer Science',
        description: 'Learn computer architecture, data structures, algorithms, object-oriented design, and networks.',
        offlinePackageSizeMb: 19,
        lessons: [
            {
                order: 1,
                title: 'Computer Architecture & Von Neumann Model',
                keyPoints: [
                    'Von Neumann architecture shares memory for both program instructions and data.',
                    'CPU consists of the Arithmetic Logic Unit (ALU), Control Unit (CU), and Registers.',
                    'The Fetch-Decode-Execute instruction cycle drives computational processing.',
                    'Primary memory (RAM) is volatile; secondary storage (SSD, HDD) provides persistence.'
                ],
                contentHtml: `
          <h2>Fundamentals of Computer Architecture</h2>
          <p>Computers represent all instructions and information using binary digits (0 and 1). The central processing unit coordinates with system buses and memory hierarchies to execute millions of operations per second.</p>
        `
            },
            {
                order: 2,
                title: 'Algorithms, Pseudocode & Flowchart Logic',
                keyPoints: [
                    'An algorithm is a finite, unambiguous sequence of steps solving a specific computational problem.',
                    'Pseudocode communicates logic clearly without language-specific syntax constraints.',
                    'Flowcharts utilize standardized geometric symbols (diamonds for decisions, rectangles for processes).',
                    'Key algorithm qualities: correctness, efficiency, determinism, and finiteness.'
                ],
                contentHtml: `
          <h2>Algorithmic Thinking and Problem Decomposition</h2>
          <p>Before writing code, engineers devise modular algorithms. Breaking complex challenges into smaller subproblems allows clear pseudocode specification and mathematical verification.</p>
        `
            },
            {
                order: 3,
                title: 'Variables, Primitive Types & Memory Allocation',
                keyPoints: [
                    'Variables are named identifiers pointing to memory locations storing data values.',
                    'Primitive data types: Integers (int), Floats (float/double), Characters (char), Booleans (bool).',
                    'Stack memory handles rapid execution and local variables; Heap handles dynamic allocations.',
                    'Type safety prevents erroneous runtime operations between incompatible representations.'
                ],
                contentHtml: `
          <h2>Data Types and System Memory</h2>
          <p>Data types govern memory size and supported operations. An 8-bit byte stores 256 unique states. Static typing verifies correctness at compile-time, while dynamic typing evaluates types during execution.</p>
        `
            },
            {
                order: 4,
                title: 'Control Flow: Conditionals & Iterative Loops',
                keyPoints: [
                    'Conditional statements (if-else, switch) execute branches based on Boolean evaluations.',
                    'Loops (for, while, do-while) repeat instructions until termination criteria are met.',
                    'Infinite loops occur when termination predicates never evaluate to false.',
                    'Loop invariants verify algorithm correctness before, during, and after iterations.'
                ],
                contentHtml: `
          <h2>Branching and Repetition Logic</h2>
          <p>Control flow enables computers to make decisions and process large datasets iteratively. Break and continue statements provide fine-grained loop execution control.</p>
        `
            },
            {
                order: 5,
                title: 'Functions, Modular Scope & Recursion',
                keyPoints: [
                    'Functions encapsulate reusable code blocks with defined parameters and return types.',
                    'Scope rules define variable visibility (local vs. global variables).',
                    'Recursion is a programming technique where a function calls itself directly or indirectly.',
                    'Every recursive function requires a base case to prevent call-stack overflow.'
                ],
                contentHtml: `
          <h2>Modular Functions and Recursive Problem Solving</h2>
          <p>Divide-and-conquer strategies break problems into identical subproblems. Recursive solutions for factorial, Fibonacci, and tree traversals trade call stack memory for algorithmic elegance.</p>
        `
            },
            {
                order: 6,
                title: 'Arrays, Strings & Contiguous Memory Storage',
                keyPoints: [
                    'An array is a contiguous memory collection of elements sharing identical data types.',
                    'Arrays provide instant O(1) constant-time element access via numerical indexing.',
                    'Strings are sequences of characters often encoded using ASCII or UTF-8.',
                    'Array insertions and deletions take O(n) linear time due to necessary element shifts.'
                ],
                contentHtml: `
          <h2>Linear Arrays and String Manipulation</h2>
          <p>Arrays underpin most high-level data structures. Because array elements reside adjacently in physical RAM, CPU hardware cache lines prefetch elements rapidly, boosting performance.</p>
        `
            },
            {
                order: 7,
                title: 'Object-Oriented Programming (OOP) Principles',
                keyPoints: [
                    'Encapsulation bundles data and modifying methods into single cohesive classes.',
                    'Abstraction hides complex internal implementation details behind clean public interfaces.',
                    'Inheritance allows child classes to derive properties and behaviors from parent classes.',
                    'Polymorphism enables uniform treatment of distinct derived types through method overriding.'
                ],
                contentHtml: `
          <h2>The Four Pillars of Object-Oriented Design</h2>
          <p>OOP models software components as interacting real-world entities. Reusable class architectures prevent duplication, enhance security via private access specifiers, and streamline code maintenance.</p>
        `
            },
            {
                order: 8,
                title: 'Linear Data Structures: Stacks, Queues & Linked Lists',
                keyPoints: [
                    'Stacks follow Last-In, First-Out (LIFO) protocol with push() and pop() operations.',
                    'Queues follow First-In, First-Out (FIFO) protocol with enqueue() and dequeue() operations.',
                    'Linked lists store elements across non-contiguous memory connected via pointer references.',
                    'Linked lists allow O(1) insertions at head or tail without requiring memory re-allocation.'
                ],
                contentHtml: `
          <h2>Stacks, Queues, and Linked Structures</h2>
          <p>Stacks manage function call returns and undo history. Queues handle print job spools, breadth-first graph searches, and network packet buffers.</p>
        `
            },
            {
                order: 9,
                title: 'Sorting, Searching & Big-O Time Complexity',
                keyPoints: [
                    'Big-O notation characterizes algorithmic runtime and memory scaling as input size n grows.',
                    'Linear search runs in O(n); Binary search locates sorted items in logarithmic O(log n) time.',
                    'Bubble, insertion, and selection sorts have quadratic O(n²) worst-case complexity.',
                    'Merge sort and Quick sort use divide-and-conquer to achieve efficient O(n log n) sorting.'
                ],
                contentHtml: `
          <h2>Algorithmic Complexity and Sorting</h2>
          <p>Algorithm efficiency is paramount when processing millions of data records. Binary search cuts search space in half with every step, locating records among 1,000,000 items in roughly 20 comparisons.</p>
        `
            },
            {
                order: 10,
                title: 'Computer Networks, The Internet & Cybersecurity',
                keyPoints: [
                    'The OSI model standardizes networking into 7 conceptual layers (Physical to Application).',
                    'TCP provides reliable, ordered stream delivery; UDP prioritizes low-latency speed.',
                    'The IP addressing system (IPv4, IPv6) routes packets globally across the internet.',
                    'Cybersecurity relies on symmetric/asymmetric encryption, firewalls, and least privilege.'
                ],
                contentHtml: `
          <h2>Networks, Protocol Stacks, and Security</h2>
          <p>The global internet connects decentralized networks using the TCP/IP suite. HTTPS combines HTTP with TLS asymmetric cryptography (RSA/ECC) to ensure confidentiality and data integrity.</p>
        `
            }
        ],
        quizzes: [
            {
                title: 'Computer Science Quiz 1 – Fundamentals & Programming',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'Which part of the CPU is responsible for performing mathematical calculations and logical evaluations?',
                        options: [
                            { label: 'A', text: 'Control Unit (CU)' },
                            { label: 'B', text: 'Arithmetic Logic Unit (ALU)' },
                            { label: 'C', text: 'Solid State Drive (SSD)' },
                            { label: 'D', text: 'Read-Only Memory (ROM)' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'What condition is essential in a recursive function to prevent infinite recursion and stack overflow?',
                        options: [
                            { label: 'A', text: 'A while loop' },
                            { label: 'B', text: 'A base case' },
                            { label: 'C', text: 'A global variable' },
                            { label: 'D', text: 'A class constructor' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'What is the time complexity to access any element by index in a standard contiguous array?',
                        options: [
                            { label: 'A', text: 'O(1) – Constant time' },
                            { label: 'B', text: 'O(n) – Linear time' },
                            { label: 'C', text: 'O(log n) – Logarithmic time' },
                            { label: 'D', text: 'O(n²) – Quadratic time' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 4,
                        prompt: 'How many distinct values can be represented by a single 8-bit byte?',
                        options: [
                            { label: 'A', text: '128' },
                            { label: 'B', text: '256' },
                            { label: 'C', text: '512' },
                            { label: 'D', text: '1024' }
                        ],
                        correctIndex: 1
                    }
                ]
            },
            {
                title: 'Computer Science Quiz 2 – OOP & Data Structures',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'Which data structure follows the Last-In, First-Out (LIFO) order of operations?',
                        options: [
                            { label: 'A', text: 'Queue' },
                            { label: 'B', text: 'Stack' },
                            { label: 'C', text: 'Binary Tree' },
                            { label: 'D', text: 'Hash Table' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'Which OOP principle refers to bundling data attributes and methods into a single class while restricting direct access?',
                        options: [
                            { label: 'A', text: 'Encapsulation' },
                            { label: 'B', text: 'Inheritance' },
                            { label: 'C', text: 'Polymorphism' },
                            { label: 'D', text: 'Overloading' }
                        ],
                        correctIndex: 0
                    },
                    {
                        order: 3,
                        prompt: 'In a singly linked list, what does each node store besides its data element?',
                        options: [
                            { label: 'A', text: 'A copy of the entire list' },
                            { label: 'B', text: 'A pointer or reference to the next node' },
                            { label: 'C', text: 'Its absolute array index' },
                            { label: 'D', text: 'A hash of all previous nodes' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 4,
                        prompt: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
                        options: [
                            { label: 'A', text: 'Stack' },
                            { label: 'B', text: 'Queue' },
                            { label: 'C', text: 'Heap' },
                            { label: 'D', text: 'Graph' }
                        ],
                        correctIndex: 1
                    }
                ]
            },
            {
                title: 'Computer Science Quiz 3 – Algorithms, Networks & Security',
                version: 1,
                questions: [
                    {
                        order: 1,
                        prompt: 'What is the worst-case time complexity of Binary Search on a sorted array of size n?',
                        options: [
                            { label: 'A', text: 'O(1)' },
                            { label: 'B', text: 'O(log n)' },
                            { label: 'C', text: 'O(n)' },
                            { label: 'D', text: 'O(n log n)' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 2,
                        prompt: 'Which network transport protocol guarantees reliable, ordered, error-checked packet delivery?',
                        options: [
                            { label: 'A', text: 'UDP' },
                            { label: 'B', text: 'TCP' },
                            { label: 'C', text: 'IP' },
                            { label: 'D', text: 'ICMP' }
                        ],
                        correctIndex: 1
                    },
                    {
                        order: 3,
                        prompt: 'Which sorting algorithm has a guaranteed average and worst-case time complexity of O(n log n)?',
                        options: [
                            { label: 'A', text: 'Bubble Sort' },
                            { label: 'B', text: 'Selection Sort' },
                            { label: 'C', text: 'Merge Sort' },
                            { label: 'D', text: 'Insertion Sort' }
                        ],
                        correctIndex: 2
                    },
                    {
                        order: 4,
                        prompt: 'What cryptographic protocol encrypts web browser communications under HTTPS?',
                        options: [
                            { label: 'A', text: 'TLS / SSL' },
                            { label: 'B', text: 'DNS' },
                            { label: 'C', text: 'FTP' },
                            { label: 'D', text: 'DHCP' }
                        ],
                        correctIndex: 0
                    }
                ]
            }
        ]
    }
];
//# sourceMappingURL=course-data.js.map