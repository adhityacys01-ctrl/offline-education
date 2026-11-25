import fs from 'fs';
import path from 'path';

const allQuizzes = JSON.parse(fs.readFileSync('C:/Users/Adhitya/.gemini/antigravity/brain/6c2891eb-b113-444f-be9c-902b04ee39cf/scratch/all_quizzes.json', 'utf8'));

// We will construct translations for each quiz prompt and option
// Maps: [quizTitle]: { hi: { title, questions: [ { prompt, options: [ text ] } ] }, mr: { ... } }

const translations = {
  // BIOLOGY 1
  "Biology Quiz 1 – Cell Biology & Energy Foundations": {
    hi: {
      title: "जीव विज्ञान क्विज़ 1 – कोशिका विज्ञान और ऊर्जा आधार",
      questions: [
        {
          prompt: "यूकेरियोटिक कोशिकाओं (eukaryotic cells) में Mitochondria का मुख्य कार्य क्या है?",
          options: [
            "Cellular respiration और ATP generation",
            "Protein synthesis और amino acid sequencing",
            "Lipid storage और glycogen transport",
            "Photosynthesis और carbon fixation"
          ]
        },
        {
          prompt: "कौन सा organelle कोशिका में hydrolytic enzymes का उपयोग करके अपशिष्ट पदार्थों को तोड़ता है?",
          options: [
            "Lysosome",
            "Ribosome",
            "Endoplasmic reticulum",
            "Golgi apparatus"
          ]
        },
        {
          prompt: "Active transport के लिए क्या आवश्यक है जो passive diffusion के लिए नहीं चाहिए?",
          options: [
            "ATP ऊर्जा इनपुट",
            "Concentration gradient का नीचे जाना",
            "Water molecules की अनुपस्थिति",
            "Extracellular matrix का विघटन"
          ]
        },
        {
          prompt: "Aerobic respiration के दौरान प्रति Glucose अणु शुद्ध कितने ATP उत्पादित होते हैं?",
          options: [
            "36 से 38 ATP",
            "2 ATP",
            "8 ATP",
            "100 ATP"
          ]
        }
      ]
    },
    mr: {
      title: "जीवशास्त्र क्विझ 1 – पेशीशास्त्र आणि ऊर्जा पाया",
      questions: [
        {
          prompt: "युकेरियोटिक पेशींमध्ये (eukaryotic cells) Mitochondria चे मुख्य कार्य काय आहे?",
          options: [
            "Cellular respiration आणि ATP generation",
            "Protein synthesis आणि amino acid sequencing",
            "Lipid storage आणि glycogen transport",
            "Photosynthesis आणि carbon fixation"
          ]
        },
        {
          prompt: "पेशीतील कोणता organelle hydrolytic enzymes वापरून टाकाऊ घटक विघटित करतो?",
          options: [
            "Lysosome",
            "Ribosome",
            "Endoplasmic reticulum",
            "Golgi apparatus"
          ]
        },
        {
          prompt: "Active transport साठी काय आवश्यक आहे जे passive diffusion साठी लागत नाही?",
          options: [
            "ATP ऊर्जा इनपुट",
            "Concentration gradient च्या खाली जाणे",
            "Water molecules ची अनुपस्थिती",
            "Extracellular matrix चे विघटन"
          ]
        },
        {
          prompt: "Aerobic respiration दरम्यान प्रति Glucose रेणू निव्वळ किती ATP तयार होतात?",
          options: [
            "36 ते 38 ATP",
            "2 ATP",
            "8 ATP",
            "100 ATP"
          ]
        }
      ]
    }
  },

  // BIOLOGY 2
  "Biology Quiz 2 – Molecular Genetics & Cell Division": {
    hi: {
      title: "जीव विज्ञान क्विज़ 2 – आणविक आनुवंशिकी और कोशिका विभाजन",
      questions: [
        {
          prompt: "DNA double helix में Adenine (A) किस nitrogenous base के साथ bond बनाता है?",
          options: [
            "Thymine (T) 2 hydrogen bonds के साथ",
            "Cytosine (C) 3 hydrogen bonds के साथ",
            "Guanine (G) 2 hydrogen bonds के साथ",
            "Uracil (U) 1 covalent bond के साथ"
          ]
        },
        {
          prompt: "Mitosis की किस अवस्था (phase) में sister chromatids अलग होकर विपरीत ध्रुवों की ओर खिंचते हैं?",
          options: [
            "Anaphase",
            "Prophase",
            "Metaphase",
            "Telophase"
          ]
        },
        {
          prompt: "Transcription की प्रक्रिया कोशिका के किस भाग में होती है?",
          options: [
            "Nucleus",
            "Ribosome",
            "Cytoplasm",
            "Cell membrane"
          ]
        },
        {
          prompt: "यदि दो heterozygous जनक (Bb × Bb) क्रॉस किए जाते हैं, तो recessive phenotype (bb) का अनुपात क्या होगा?",
          options: [
            "25% (1/4)",
            "50% (1/2)",
            "75% (3/4)",
            "100% (4/4)"
          ]
        }
      ]
    },
    mr: {
      title: "जीवशास्त्र क्विझ 2 – आण्विक आनुवंशिकी आणि पेशी विभाजन",
      questions: [
        {
          prompt: "DNA double helix मध्ये Adenine (A) कोणत्या nitrogenous base सोबत bond बनवतो?",
          options: [
            "Thymine (T) 2 hydrogen bonds सह",
            "Cytosine (C) 3 hydrogen bonds सह",
            "Guanine (G) 2 hydrogen bonds सह",
            "Uracil (U) 1 covalent bond सह"
          ]
        },
        {
          prompt: "Mitosis च्या कोणत्या टप्प्यात (phase) sister chromatids वेगळे होऊन विरुद्ध टोकांकडे खेचले जातात?",
          options: [
            "Anaphase",
            "Prophase",
            "Metaphase",
            "Telophase"
          ]
        },
        {
          prompt: "Transcription ची प्रक्रिया पेशीच्या कोणत्या भागात घडते?",
          options: [
            "Nucleus",
            "Ribosome",
            "Cytoplasm",
            "Cell membrane"
          ]
        },
        {
          prompt: "जर दोन heterozygous पालक (Bb × Bb) क्रॉस केले, तर recessive phenotype (bb) चे प्रमाण किती असेल?",
          options: [
            "25% (1/4)",
            "50% (1/2)",
            "75% (3/4)",
            "100% (4/4)"
          ]
        }
      ]
    }
  },

  // BIOLOGY 3
  "Biology Quiz 3 – Physiology, Transport & Ecology": {
    hi: {
      title: "जीव विज्ञान क्विज़ 3 – शरीरक्रिया विज्ञान, परिवहन और पारिस्थितिकी",
      questions: [
        {
          prompt: "पौधों में जड़ों से पत्तियों तक जल और खनिजों के संवहन के लिए कौन सा vascular tissue जिम्मेदार है?",
          options: [
            "Xylem",
            "Phloem",
            "Stomata",
            "Cambium"
          ]
        },
        {
          prompt: "मानव हृदय में ऑक्सीजन युक्त रक्त (oxygenated blood) फेफड़ों से किस chamber में प्रवेश करता है?",
          options: [
            "Left atrium",
            "Right atrium",
            "Right ventricle",
            "Aorta"
          ]
        },
        {
          prompt: "पारिस्थितिकी तंत्र में 10% नियम (Lindeman's rule) के अनुसार अगले trophic level पर कितनी ऊर्जा पहुँचती है?",
          options: [
            "10%",
            "50%",
            "90%",
            "1%"
          ]
        },
        {
          prompt: "Photosynthesis की light-dependent reaction chloroplast के किस भाग में होती है?",
          options: [
            "Thylakoid membrane",
            "Stroma",
            "Outer membrane",
            "Cristae"
          ]
        }
      ]
    },
    mr: {
      title: "जीवशास्त्र क्विझ 3 – शरीरक्रियाशास्त्र, वहन आणि पर्यावरणशास्त्र",
      questions: [
        {
          prompt: "वनस्पतींमध्ये मुळांपासून पानांपर्यंत पाणी आणि क्षारांचे वहन करण्यासाठी कोणती vascular tissue जबाबदार आहे?",
          options: [
            "Xylem",
            "Phloem",
            "Stomata",
            "Cambium"
          ]
        },
        {
          prompt: "मानवी हृदयात ऑक्सिजनयुक्त रक्त (oxygenated blood) फुफ्फुसांतून कोणत्या भागात (chamber) येते?",
          options: [
            "Left atrium",
            "Right atrium",
            "Right ventricle",
            "Aorta"
          ]
        },
        {
          prompt: "पर्यावरण संस्थेत 10% नियमानुसार (Lindeman's rule) पुढील trophic level कडे किती ऊर्जा हस्तांतरित होते?",
          options: [
            "10%",
            "50%",
            "90%",
            "1%"
          ]
        },
        {
          prompt: "Photosynthesis ची प्रकाश-आधारित अभिक्रिया chloroplast च्या कोणत्या भागात होते?",
          options: [
            "Thylakoid membrane",
            "Stroma",
            "Outer membrane",
            "Cristae"
          ]
        }
      ]
    }
  },

  // MATHEMATICS 1
  "Mathematics Quiz 1 – Linear Equations & Systems": {
    hi: {
      title: "गणित क्विज़ 1 – रैखिक समीकरण और प्रणालियाँ",
      questions: [
        {
          prompt: "रैखिक समीकरण 3x - 7 = 14 में x का मान क्या है?",
          options: [
            "x = 7",
            "x = 5",
            "x = 21",
            "x = 6"
          ]
        },
        {
          prompt: "यदि दो रेखाएं समानांतर (parallel) हैं, तो उनके समीकरण युग्म के कितने हल (solutions) होंगे?",
          options: [
            "कोई हल नहीं (Zero solutions)",
            "एक अद्वितीय हल (One unique solution)",
            "अनंत हल (Infinitely many solutions)",
            "दो हल (Exactly two solutions)"
          ]
        },
        {
          prompt: "रेखा y = 4x + 9 का slope (ढाल) क्या है?",
          options: [
            "m = 4",
            "m = 9",
            "m = -4",
            "m = 1/4"
          ]
        },
        {
          prompt: "प्रणाली x + y = 10 तथा x - y = 4 में x और y का मान क्या है?",
          options: [
            "x = 7, y = 3",
            "x = 6, y = 4",
            "x = 8, y = 2",
            "x = 5, y = 5"
          ]
        }
      ]
    },
    mr: {
      title: "गणित क्विझ 1 – रेषीय समीकरणे आणि प्रणाली",
      questions: [
        {
          prompt: "रेषीय समीकरण 3x - 7 = 14 मध्ये x ची किंमत काय आहे?",
          options: [
            "x = 7",
            "x = 5",
            "x = 21",
            "x = 6"
          ]
        },
        {
          prompt: "जर दोन रेषा समांतर (parallel) असतील, तर त्यांच्या समीकरणांच्या जोडीला किती उकली (solutions) असतील?",
          options: [
            "एकही उकल नाही (Zero solutions)",
            "एकमेव उकल (One unique solution)",
            "अनंत उकली (Infinitely many solutions)",
            "दोन उकली (Exactly two solutions)"
          ]
        },
        {
          prompt: "रेषा y = 4x + 9 चा slope (चढ) काय आहे?",
          options: [
            "m = 4",
            "m = 9",
            "m = -4",
            "m = 1/4"
          ]
        },
        {
          prompt: "प्रणाली x + y = 10 आणि x - y = 4 मध्ये x आणि y ची किंमत काय आहे?",
          options: [
            "x = 7, y = 3",
            "x = 6, y = 4",
            "x = 8, y = 2",
            "x = 5, y = 5"
          ]
        }
      ]
    }
  },

  // MATHEMATICS 2
  "Mathematics Quiz 2 – Polynomials & Quadratics": {
    hi: {
      title: "गणित क्विज़ 2 – बहुपद और द्विघात समीकरण",
      questions: [
        {
          prompt: "द्विघात समीकरण ax² + bx + c = 0 में discriminant (विभक्तिकर) का सूत्र क्या है?",
          options: [
            "Δ = b² - 4ac",
            "Δ = b² + 4ac",
            "Δ = 4ac - b²",
            "Δ = 2a - 4bc"
          ]
        },
        {
          prompt: "यदि discriminant Δ > 0 और एक पूर्ण वर्ग (perfect square) है, तो मूल (roots) कैसे होंगे?",
          options: [
            "Real, unequal और rational",
            "Real और equal",
            "Complex और imaginary",
            "Undetermined"
          ]
        },
        {
          prompt: "समीकरण x² - 5x + 6 = 0 के मूल क्या हैं?",
          options: [
            "x = 2 और x = 3",
            "x = -2 और x = -3",
            "x = 1 और x = 6",
            "x = -1 और x = 5"
          ]
        },
        {
          prompt: "द्विघात समीकरण ax² + bx + c = 0 के मूलों का योग (sum of roots) क्या होता है?",
          options: [
            "-b / a",
            "c / a",
            "b / a",
            "-c / a"
          ]
        }
      ]
    },
    mr: {
      title: "गणित क्विझ 2 – बहुपदी आणि वर्गसमीकरणे",
      questions: [
        {
          prompt: "वर्गसमीकरण ax² + bx + c = 0 मध्ये discriminant (विवेचक) चे सूत्र काय आहे?",
          options: [
            "Δ = b² - 4ac",
            "Δ = b² + 4ac",
            "Δ = 4ac - b²",
            "Δ = 2a - 4bc"
          ]
        },
        {
          prompt: "जर discriminant Δ > 0 आणि पूर्ण वर्ग (perfect square) असेल, तर मुळे (roots) कशी असतील?",
          options: [
            "Real, unequal आणि rational",
            "Real आणि equal",
            "Complex आणि imaginary",
            "Undetermined"
          ]
        },
        {
          prompt: "समीकरण x² - 5x + 6 = 0 ची मुळे कोणती आहेत?",
          options: [
            "x = 2 आणि x = 3",
            "x = -2 आणि x = -3",
            "x = 1 आणि x = 6",
            "x = -1 आणि x = 5"
          ]
        },
        {
          prompt: "वर्गसमीकरण ax² + bx + c = 0 च्या मुळांची बेरीज (sum of roots) काय असते?",
          options: [
            "-b / a",
            "c / a",
            "b / a",
            "-c / a"
          ]
        }
      ]
    }
  },

  // MATHEMATICS 3
  "Mathematics Quiz 3 – Functions, Logarithms & Progressions": {
    hi: {
      title: "गणित क्विज़ 3 – फलन, लघुगणक और श्रेणियाँ",
      questions: [
        {
          prompt: "अंकगणितीय श्रेणी (AP) में n-वें पद का सूत्र क्या है?",
          options: [
            "a_n = a + (n - 1)d",
            "a_n = a × r^(n-1)",
            "a_n = a + nd",
            "a_n = (n/2)(2a + d)"
          ]
        },
        {
          prompt: "log₁₀(1000) का मान क्या है?",
          options: [
            "3",
            "10",
            "100",
            "1"
          ]
        },
        {
          prompt: "यदि एक गुणोत्तर श्रेणी (GP) का प्रथम पद a = 3 और r = 2 है, तो चौथा पद क्या होगा?",
          options: [
            "24",
            "18",
            "48",
            "12"
          ]
        },
        {
          prompt: "फलन f(x) = x³ का अवकलज (derivative f'(x)) क्या है?",
          options: [
            "3x²",
            "x²",
            "3x",
            "x⁴ / 4"
          ]
        }
      ]
    },
    mr: {
      title: "गणित क्विझ 3 – कार्ये, लॉगेरिदम आणि श्रेणी",
      questions: [
        {
          prompt: "अंकगणिती श्रेणीमध्ये (AP) n-व्या पदाचे सूत्र काय आहे?",
          options: [
            "a_n = a + (n - 1)d",
            "a_n = a × r^(n-1)",
            "a_n = a + nd",
            "a_n = (n/2)(2a + d)"
          ]
        },
        {
          prompt: "log₁₀(1000) ची किंमत काय आहे?",
          options: [
            "3",
            "10",
            "100",
            "1"
          ]
        },
        {
          prompt: "जर भूमितीय श्रेणीचे (GP) पहिले पद a = 3 आणि r = 2 असेल, तर चौथे पद काय असेल?",
          options: [
            "24",
            "18",
            "48",
            "12"
          ]
        },
        {
          prompt: "कार्य f(x) = x³ चे विकलन (derivative f'(x)) काय आहे?",
          options: [
            "3x²",
            "x²",
            "3x",
            "x⁴ / 4"
          ]
        }
      ]
    }
  },

  // PHYSICS 1
  "Physics Quiz 1 – Kinematics & Graph Analysis": {
    hi: {
      title: "भौतिक विज्ञान क्विज़ 1 – गतिकी और ग्राफ विश्लेषण",
      questions: [
        {
          prompt: "विस्थापन-समय ग्राफ (displacement-time graph) का slope क्या दर्शाता है?",
          options: [
            "Velocity (वेग)",
            "Acceleration (त्वरण)",
            "Force (बल)",
            "Total distance (कुल दूरी)"
          ]
        },
        {
          prompt: "एक वस्तु विराम से शुरू होकर 3 m/s² के त्वरण से 4 सेकंड चलती है। उसका अंतिम वेग क्या होगा?",
          options: [
            "12 m/s",
            "7 m/s",
            "24 m/s",
            "1.33 m/s"
          ]
        },
        {
          prompt: "गति का कौन सा समीकरण विस्थापन, प्रारंभिक वेग, त्वरण और समय को जोड़ता है?",
          options: [
            "s = ut + (1/2)at²",
            "v = u + at",
            "v² = u² + 2as",
            "F = ma"
          ]
        },
        {
          prompt: "एक समान वृत्तीय गति (uniform circular motion) में कौन सी राशि स्थिर रहती है?",
          options: [
            "Speed (चाल)",
            "Velocity (वेग)",
            "Acceleration (त्वरण)",
            "Displacement (विस्थापन)"
          ]
        }
      ]
    },
    mr: {
      title: "भौतिकशास्त्र क्विझ 1 – गतीशास्त्र आणि आलेख विश्लेषण",
      questions: [
        {
          prompt: "विस्थापन-वेळ आलेखाचा (displacement-time graph) slope काय दर्शवतो?",
          options: [
            "Velocity (वेग)",
            "Acceleration (प्रवेग)",
            "Force (बल)",
            "Total distance (एकूण अंतर)"
          ]
        },
        {
          prompt: "एक वस्तू स्थिर स्थितीतून सुरू होऊन 3 m/s² प्रवेगाने 4 सेकंद चालते. तिचा अंतिम वेग किती असेल?",
          options: [
            "12 m/s",
            "7 m/s",
            "24 m/s",
            "1.33 m/s"
          ]
        },
        {
          prompt: "गतीचे कोणते समीकरण विस्थापन, सुरुवातीचा वेग, प्रवेग आणि वेळ यांना जोडते?",
          options: [
            "s = ut + (1/2)at²",
            "v = u + at",
            "v² = u² + 2as",
            "F = ma"
          ]
        },
        {
          prompt: "एकरूप वर्तुळाकार गतीमध्ये (uniform circular motion) कोणती राशी स्थिर राहते?",
          options: [
            "Speed (चाल)",
            "Velocity (वेग)",
            "Acceleration (प्रवेग)",
            "Displacement (विस्थापन)"
          ]
        }
      ]
    }
  },

  // PHYSICS 2
  "Physics Quiz 2 – Newton’s Laws & Momentum": {
    hi: {
      title: "भौतिक विज्ञान क्विज़ 2 – न्यूटन के नियम और संवेग",
      questions: [
        {
          prompt: "किसी वस्तु का द्रव्यमान 5 kg है और उसका त्वरण 4 m/s² है, तो उस पर लगने वाला कुल Force क्या होगा?",
          options: [
            "20 N",
            "9 N",
            "1.25 N",
            "40 N"
          ]
        },
        {
          prompt: "Action और Reaction बल एक दूसरे को रद्द क्यों नहीं करते?",
          options: [
            "वे अलग-अलग अंतःक्रियात्मक पिंडों पर कार्य करते हैं",
            "वे अलग-अलग समय पर होते हैं",
            "एक बल हमेशा दूसरे से बड़ा होता है",
            "घर्षण उन्हें अंतःक्रिया करने से रोकता है"
          ]
        },
        {
          prompt: "20 m/s के वेग से गतिमान 1000 kg के वाहन का संवेग (momentum p = mv) क्या है?",
          options: [
            "50 kg·m/s",
            "20,000 kg·m/s",
            "200,000 kg·m/s",
            "10,000 kg·m/s"
          ]
        },
        {
          prompt: "तोप से गोला दागते समय पीछे की ओर लगने वाले झटके (recoil) की व्याख्या भौतिकी का कौन सा नियम करता है?",
          options: [
            "Newton का प्रथम नियम",
            "Newton का तृतीय नियम (Action = Reaction)",
            "Hooke का नियम",
            "Ohm का नियम"
          ]
        }
      ]
    },
    mr: {
      title: "भौतिकशास्त्र क्विझ 2 – न्यूटनचे नियम आणि संवेग",
      questions: [
        {
          prompt: "एखाद्या वस्तूचे वस्तुमान 5 kg आहे आणि तिचे प्रवेग 4 m/s² आहे, तर तिच्यावर कार्य करणारे एकूण Force किती असेल?",
          options: [
            "20 N",
            "9 N",
            "1.25 N",
            "40 N"
          ]
        },
        {
          prompt: "Action आणि Reaction बल एकमेकांना रद्द का करत नाहीत?",
          options: [
            "ते वेगवेगळ्या परस्परसंवादी वस्तूंवर कार्य करतात",
            "ते वेगवेगळ्या वेळी घडतात",
            "एक बल नेहमी दुसऱ्यापेक्षा मोठे असते",
            "घर्षण त्यांना परस्परसंवाद करण्यापासून रोखते"
          ]
        },
        {
          prompt: "20 m/s वेगाने जाणाऱ्या 1000 kg वाहनाचा संवेग (momentum p = mv) काय आहे?",
          options: [
            "50 kg·m/s",
            "20,000 kg·m/s",
            "200,000 kg·m/s",
            "10,000 kg·m/s"
          ]
        },
        {
          prompt: "तोफेतून गोळा डागताना जाणवणाऱ्या मागे बसणाऱ्या झटक्याची (recoil) स्पष्टीकरण भौतिकशास्त्राचा कोणता नियम देतो?",
          options: [
            "Newton चा पहिला नियम",
            "Newton चा तिसरा नियम (Action = Reaction)",
            "Hooke चा नियम",
            "Ohm चा नियम"
          ]
        }
      ]
    }
  },

  // PHYSICS 3
  "Physics Quiz 3 – Work, Energy & Gravitation": {
    hi: {
      title: "भौतिक विज्ञान क्विज़ 3 – कार्य, ऊर्जा और गुरुत्वाकर्षण",
      questions: [
        {
          prompt: "Work Done का SI मात्रक (unit) क्या है जब 1 N बल 1 m विस्थापन करता है?",
          options: [
            "Joule (J)",
            "Watt (W)",
            "Pascal (Pa)",
            "Newton (N)"
          ]
        },
        {
          prompt: "द्रव्यमान m और वेग v वाली वस्तु की Kinetic Energy का सूत्र क्या है?",
          options: [
            "KE = (1/2)mv²",
            "KE = mgh",
            "KE = mv",
            "KE = ma"
          ]
        },
        {
          prompt: "यदि दो पिंडों के बीच की दूरी दोगुनी कर दी जाए, तो गुरुत्वाकर्षण बल पर क्या प्रभाव पड़ेगा?",
          options: [
            "घटकर 1/4 हो जाएगा",
            "आधा (1/2) हो जाएगा",
            "दोगुना हो जाएगा",
            "चार गुना हो जाएगा"
          ]
        },
        {
          prompt: "पृथ्वी की सतह पर गुरुत्वीय त्वरण g का मानक मान क्या है?",
          options: [
            "9.8 m/s²",
            "10.8 m/s²",
            "8.9 m/s²",
            "6.67 m/s²"
          ]
        }
      ]
    },
    mr: {
      title: "भौतिकशास्त्र क्विझ 3 – कार्य, ऊर्जा आणि गुरुत्वाकर्षण",
      questions: [
        {
          prompt: "जेव्हा 1 N बल 1 m विस्थापन घडवून आणते तेव्हा Work Done चे SI एकक काय आहे?",
          options: [
            "Joule (J)",
            "Watt (W)",
            "Pascal (Pa)",
            "Newton (N)"
          ]
        },
        {
          prompt: "वस्तुमान m आणि वेग v असलेल्या वस्तूच्या गतिज ऊर्जेचे (Kinetic Energy) सूत्र काय आहे?",
          options: [
            "KE = (1/2)mv²",
            "KE = mgh",
            "KE = mv",
            "KE = ma"
          ]
        },
        {
          prompt: "जर दोन वस्तूंमधील अंतर दुप्पट केले, तर गुरुत्वाकर्षण बलावर काय परिणाम होईल?",
          options: [
            "कमी होऊन 1/4 होईल",
            "निम्मे (1/2) होईल",
            "दुप्पट होईल",
            "चार पट होईल"
          ]
        },
        {
          prompt: "पृथ्वीच्या पृष्ठभागावर गुरुत्वीय प्रवेग g चे मानक मूल्य काय आहे?",
          options: [
            "9.8 m/s²",
            "10.8 m/s²",
            "8.9 m/s²",
            "6.67 m/s²"
          ]
        }
      ]
    }
  },

  // CHEMISTRY 1
  "Chemistry Quiz 1 – Atoms & The Periodic Table": {
    hi: {
      title: "रसायन विज्ञान क्विज़ 1 – परमाणु और आवर्त सारणी",
      questions: [
        {
          prompt: "तत्व की Atomic Number (परमाणु क्रमांक Z) नाभिक में किसकी संख्या निर्धारित करती है?",
          options: [
            "Protons",
            "Neutrons",
            "Electrons और Neutrons",
            "Quarks"
          ]
        },
        {
          prompt: "आधुनिक आवर्त सारणी (Periodic Table) के Group 1 के तत्वों को क्या कहा जाता है?",
          options: [
            "Alkali metals",
            "Halogens",
            "Noble gases",
            "Transition metals"
          ]
        },
        {
          prompt: "आइसोटोप (Isotopes) में क्या समान और क्या भिन्न होता है?",
          options: [
            "समान Protons परंतु भिन्न Neutrons",
            "समान Neutrons परंतु भिन्न Protons",
            "समान Electrons परंतु भिन्न Protons",
            "भिन्न Atomic Number"
          ]
        },
        {
          prompt: "Periodic Table में बाएं से दाएं जाने पर Electronegativity पर क्या प्रभाव पड़ता है?",
          options: [
            "बढ़ती है (Increases)",
            "घटती है (Decreases)",
            "समान रहती है",
            "शून्य हो जाती है"
          ]
        }
      ]
    },
    mr: {
      title: "रसायनशास्त्र क्विझ 1 – अणू आणि आवर्तसारणी",
      questions: [
        {
          prompt: "मूलद्रव्याचा Atomic Number (अणुक्रमांक Z) केंद्रकातील कशाची संख्या दर्शवतो?",
          options: [
            "Protons",
            "Neutrons",
            "Electrons आणि Neutrons",
            "Quarks"
          ]
        },
        {
          prompt: "आधुनिक आवर्तसारणीतील (Periodic Table) Group 1 च्या मूलद्रव्यांना काय म्हणतात?",
          options: [
            "Alkali metals",
            "Halogens",
            "Noble gases",
            "Transition metals"
          ]
        },
        {
          prompt: "समस्थानिकांमध्ये (Isotopes) काय समान आणि काय वेगळे असते?",
          options: [
            "समान Protons पण भिन्न Neutrons",
            "समान Neutrons पण भिन्न Protons",
            "समान Electrons पण भिन्न Protons",
            "भिन्न Atomic Number"
          ]
        },
        {
          prompt: "Periodic Table मध्ये डावीकडून उजवीकडे जाताना Electronegativity वर काय परिणाम होतो?",
          options: [
            "वाढते (Increases)",
            "कमी होते (Decreases)",
            "समान राहते",
            "शून्य होते"
          ]
        }
      ]
    }
  },

  // CHEMISTRY 2
  "Chemistry Quiz 2 – Bonding & Chemical Reactions": {
    hi: {
      title: "रसायन विज्ञान क्विज़ 2 – रासायनिक आबंधन और अभिक्रियाएँ",
      questions: [
        {
          prompt: "दो अधातुओं के बीच electrons के साझाकरण (sharing) से बनने वाला बंध क्या कहलाता है?",
          options: [
            "Covalent bond",
            "Ionic bond",
            "Metallic bond",
            "Hydrogen bond"
          ]
        },
        {
          prompt: "संतुलित समीकरण 2H₂ + O₂ → 2H₂O में अभिकारकों और उत्पादों का molar ratio क्या है?",
          options: [
            "2 : 1 : 2",
            "1 : 1 : 1",
            "2 : 2 : 1",
            "4 : 2 : 2"
          ]
        },
        {
          prompt: "Oxidation (ऑक्सीकरण) की परिभाषा electrons के संदर्भ में क्या है?",
          options: [
            "Loss of electrons (इलेक्ट्रॉन त्यागना)",
            "Gain of electrons (इलेक्ट्रॉन ग्रहण करना)",
            "Sharing of protons",
            "Neutron loss"
          ]
        },
        {
          prompt: "Endothermic reaction (ऊष्माशोषी अभिक्रिया) में Enthalpy परिवर्तन (ΔH) का चिन्ह क्या होता है?",
          options: [
            "Positive (ΔH > 0)",
            "Negative (ΔH < 0)",
            "Zero (ΔH = 0)",
            "अनंत"
          ]
        }
      ]
    },
    mr: {
      title: "रसायनशास्त्र क्विझ 2 – रासायनिक बंध आणि अभिक्रिया",
      questions: [
        {
          prompt: "दोन अधातूंमध्ये electrons च्या वाटणीतून (sharing) तयार होणारा बंध कोणता?",
          options: [
            "Covalent bond",
            "Ionic bond",
            "Metallic bond",
            "Hydrogen bond"
          ]
        },
        {
          prompt: "संतुलित समीकरण 2H₂ + O₂ → 2H₂O मध्ये molar ratio काय आहे?",
          options: [
            "2 : 1 : 2",
            "1 : 1 : 1",
            "2 : 2 : 1",
            "4 : 2 : 2"
          ]
        },
        {
          prompt: "Oxidation (ऑक्सिडीकरण) ची व्याख्या electrons च्या संदर्भात काय आहे?",
          options: [
            "Loss of electrons (इलेक्ट्रॉन्स गमावणे)",
            "Gain of electrons (इलेक्ट्रॉन्स मिळवणे)",
            "Sharing of protons",
            "Neutron loss"
          ]
        },
        {
          prompt: "Endothermic reaction (उष्माग्राही अभिक्रिया) मध्ये Enthalpy बदल (ΔH) चे चिन्ह काय असते?",
          options: [
            "Positive (ΔH > 0)",
            "Negative (ΔH < 0)",
            "Zero (ΔH = 0)",
            "अनंत"
          ]
        }
      ]
    }
  },

  // CHEMISTRY 3
  "Chemistry Quiz 3 – Stoichiometry, Acids & Kinetics": {
    hi: {
      title: "रसायन विज्ञान क्विज़ 3 – रससमीकरणमिति, अम्ल और गतिकी",
      questions: [
        {
          prompt: "1 मोल किसी भी पदार्थ में उपस्थित कणों की संख्या (Avogadro’s number) क्या है?",
          options: [
            "6.022 × 10²³",
            "3.00 × 10⁸",
            "1.602 × 10⁻¹⁹",
            "9.8 × 10²"
          ]
        },
        {
          prompt: "25°C पर एक शुद्ध उदासीन (neutral) विलयन का pH मान क्या होता है?",
          options: [
            "7",
            "0",
            "14",
            "1"
          ]
        },
        {
          prompt: "Ideal Gas Law का सही समीकरण कौन सा है?",
          options: [
            "PV = nRT",
            "P / V = nRT",
            "PT = nVR",
            "V / T = nPR"
          ]
        },
        {
          prompt: "रासायनिक अभिक्रिया में उत्प्रेरक (Catalyst) का मुख्य कार्य क्या है?",
          options: [
            "Activation energy को कम करके गति बढ़ाना",
            "साम्यावस्था स्थिरांक (K_eq) को बदलना",
            "उत्पादों की कुल मात्रा बढ़ाना",
            "तापमान को स्थिर रखना"
          ]
        }
      ]
    },
    mr: {
      title: "रसायनशास्त्र क्विझ 3 – स्टॉइकिओमेट्री, आम्ल आणि गतीशास्त्र",
      questions: [
        {
          prompt: "कोणत्याही पदार्थाच्या 1 मोल मधील कणांची संख्या (Avogadro's number) किती असते?",
          options: [
            "6.022 × 10²³",
            "3.00 × 10⁸",
            "1.602 × 10⁻¹⁹",
            "9.8 × 10²"
          ]
        },
        {
          prompt: "25°C वर शुद्ध उदासीन (neutral) द्रावणाचे pH मूल्य किती असते?",
          options: [
            "7",
            "0",
            "14",
            "1"
          ]
        },
        {
          prompt: "Ideal Gas Law चे योग्य समीकरण कोणते आहे?",
          options: [
            "PV = nRT",
            "P / V = nRT",
            "PT = nVR",
            "V / T = nPR"
          ]
        },
        {
          prompt: "रासायनिक अभिक्रियेत उत्प्रेरकाचे (Catalyst) मुख्य कार्य काय असते?",
          options: [
            "Activation energy कमी करून गती वाढवणे",
            "समतोल स्थिरांक (K_eq) बदलणे",
            "उत्पादनांचे एकूण प्रमाण वाढवणे",
            "तापमान स्थिर ठेवणे"
          ]
        }
      ]
    }
  },

  // HISTORY 1
  "History Quiz 1 – Ancient Indian Civilisations": {
    hi: {
      title: "इतिहास क्विज़ 1 – प्राचीन भारतीय सभ्यताएँ",
      questions: [
        {
          prompt: "सिंधु घाटी सभ्यता का कौन सा प्रमुख स्थल अपने विशाल स्नानागार (Great Bath) के लिए प्रसिद्ध है?",
          options: [
            "Mohenjo-daro",
            "Harappa",
            "Lothal",
            "Kalibangan"
          ]
        },
        {
          prompt: "चारों वेदों में सबसे प्राचीन वेद कौन सा है?",
          options: [
            "Rigveda",
            "Samaveda",
            "Yajurveda",
            "Atharvaveda"
          ]
        },
        {
          prompt: "मौर्य साम्राज्य के महान सम्राट अशोक ने कलिंग युद्ध के बाद कौन सा धर्म अपनाया?",
          options: [
            "Buddhism (बौद्ध धर्म)",
            "Jainism (जैन धर्म)",
            "Hinduism (हिंदू धर्म)",
            "Ajivika"
          ]
        },
        {
          prompt: "प्राचीन भारत का सुप्रसिद्ध विश्वविद्यालय 'नालंदा' किस राज्य में स्थित था?",
          options: [
            "बिहार (Bihar)",
            "उत्तर प्रदेश (Uttar Pradesh)",
            "मध्य प्रदेश (Madhya Pradesh)",
            "गुजरात (Gujarat)"
          ]
        }
      ]
    },
    mr: {
      title: "इतिहास क्विझ 1 – प्राचीन भारतीय संस्कृती",
      questions: [
        {
          prompt: "सिंधू संस्कृतीतील कोणते प्रमुख ठिकाण भव्य स्नानगृहासाठी (Great Bath) प्रसिद्ध आहे?",
          options: [
            "Mohenjo-daro",
            "Harappa",
            "Lothal",
            "Kalibangan"
          ]
        },
        {
          prompt: "चार वेदांपैकी सर्वात प्राचीन वेद कोणता आहे?",
          options: [
            "Rigveda",
            "Samaveda",
            "Yajurveda",
            "Atharvaveda"
          ]
        },
        {
          prompt: "मौर्य साम्राज्याचे महान सम्राट अशोकांनी कलिंगच्या युद्धा नंतर कोणता धर्म स्वीकारला?",
          options: [
            "Buddhism (बौद्ध धर्म)",
            "Jainism (जैन धर्म)",
            "Hinduism (हिंदू धर्म)",
            "Ajivika"
          ]
        },
        {
          prompt: "प्राचीन भारतातील प्रसिद्ध विद्यापीठ 'नालंदा' कोणत्या राज्यात स्थित होते?",
          options: [
            "बिहार (Bihar)",
            "उत्तर प्रदेश (Uttar Pradesh)",
            "मध्य प्रदेश (Madhya Pradesh)",
            "गुजरात (Gujarat)"
          ]
        }
      ]
    }
  },

  // HISTORY 2
  "History Quiz 2 – Classical, Sultanate & Mughal Periods": {
    hi: {
      title: "इतिहास क्विज़ 2 – शास्त्रीय, सल्तनत और मुग़ल काल",
      questions: [
        {
          prompt: "भारतीय इतिहास में किस राजवंश के शासनकाल को 'स्वर्ण युग' (Golden Age) माना जाता है?",
          options: [
            "Gupta Empire (गुप्त साम्राज्य)",
            "Chola Dynasty (चोल राजवंश)",
            "Delhi Sultanate",
            "Maratha Empire"
          ]
        },
        {
          prompt: "1526 में पानीपत की पहली लड़ाई में बाबर ने किसे पराजित किया था?",
          options: [
            "Ibrahim Lodi",
            "Rana Sanga",
            "Sher Shah Suri",
            "Hem Chandra Vikramaditya"
          ]
        },
        {
          prompt: "छत्रपति शिवाजी महाराज ने किस वर्ष रायगढ़ में 'स्वराज्य' की स्थापना करते हुए राज्याभिषेक करवाया?",
          options: [
            "1674 CE",
            "1650 CE",
            "1707 CE",
            "1627 CE"
          ]
        },
        {
          prompt: "मुग़ल सम्राट अकबर द्वारा शुरू किए गए धार्मिक समन्वयवादी पंथ का नाम क्या था?",
          options: [
            "Din-i Ilahi",
            "Sufism",
            "Bhakti Movement",
            "Sulh-i Kul"
          ]
        }
      ]
    },
    mr: {
      title: "इतिहास क्विझ 2 – अभिजात, सुलतानशाही आणि मुघल काळ",
      questions: [
        {
          prompt: "भारतीय इतिहासात कोणत्या राजवंशाच्या कालखंडाला 'सुवर्णकाळ' (Golden Age) मानले जाते?",
          options: [
            "Gupta Empire (गुप्त साम्राज्य)",
            "Chola Dynasty (चोळ राजवंश)",
            "Delhi Sultanate",
            "Maratha Empire"
          ]
        },
        {
          prompt: "1526 मध्ये पानिपतच्या पहिल्या लढाईत बाबराने कोणाचा पराभव केला?",
          options: [
            "Ibrahim Lodi",
            "Rana Sanga",
            "Sher Shah Suri",
            "Hem Chandra Vikramaditya"
          ]
        },
        {
          prompt: "छत्रपती शिवाजी महाराजांनी कोणत्या वर्षी रायगडावर 'स्वराज्य' स्थापन करत राज्याभिषेक करवून घेतला?",
          options: [
            "1674 CE",
            "1650 CE",
            "1707 CE",
            "1627 CE"
          ]
        },
        {
          prompt: "मुघल सम्राट अकबराने सुरू केलेल्या धार्मिक समन्वयवादी विचारसरणीचे नाव काय होते?",
          options: [
            "Din-i Ilahi",
            "Sufism",
            "Bhakti Movement",
            "Sulh-i Kul"
          ]
        }
      ]
    }
  },

  // HISTORY 3
  "History Quiz 3 – Freedom Struggle & Republic": {
    hi: {
      title: "इतिहास क्विज़ 3 – स्वतंत्रता संग्राम और गणतंत्र",
      questions: [
        {
          prompt: "1857 के प्रथम स्वतंत्रता संग्राम की शुरुआत किस छावनी में मंगल पांडे द्वारा हुई थी?",
          options: [
            "Barrackpore (बैरकपुर)",
            "Meerut (मेरठ)",
            "Jhansi (झांसी)",
            "Kanpur (कानपुर)"
          ]
        },
        {
          prompt: "महात्मा गांधी ने 1930 में नमक सत्याग्रह (Dandi March) किस स्थान से शुरू किया था?",
          options: [
            "Sabarmati Ashram",
            "Wardha Ashram",
            "Porbandar",
            "Sevagram"
          ]
        },
        {
          prompt: "भारतीय संविधान सभा की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?",
          options: [
            "Dr. B.R. Ambedkar",
            "Dr. Rajendra Prasad",
            "Jawaharlal Nehru",
            "Sardar Vallabhbhai Patel"
          ]
        },
        {
          prompt: "भारत का संविधान किस तिथि को पूर्ण रूप से लागू हुआ?",
          options: [
            "26 जनवरी 1950",
            "15 अगस्त 1947",
            "26 नवंबर 1949",
            "30 जनवरी 1948"
          ]
        }
      ]
    },
    mr: {
      title: "इतिहास क्विझ 3 – स्वातंत्र्य लढा आणि प्रजासत्ताक",
      questions: [
        {
          prompt: "1857 च्या पहिल्या स्वातंत्र्य संग्रामाची ठिणगी कोणत्या छावणीत मंगल पांडे यांनी पाडली?",
          options: [
            "Barrackpore (बराकपूर)",
            "Meerut (मेरठ)",
            "Jhansi (झाशी)",
            "Kanpur (कानपूर)"
          ]
        },
        {
          prompt: "महात्मा गांधींनी 1930 मध्ये मिठाचा सत्याग्रह (Dandi March) कुठून सुरू केला?",
          options: [
            "Sabarmati Ashram",
            "Wardha Ashram",
            "Porbandar",
            "Sevagram"
          ]
        },
        {
          prompt: "भारतीय राज्यघटना मसुदा समितीचे (Drafting Committee) अध्यक्ष कोण होते?",
          options: [
            "Dr. B.R. Ambedkar",
            "Dr. Rajendra Prasad",
            "Jawaharlal Nehru",
            "Sardar Vallabhbhai Patel"
          ]
        },
        {
          prompt: "भारताचे संविधान कोणत्या दिवशी पूर्णपणे लागू झाले?",
          options: [
            "26 जानेवारी 1950",
            "15 ऑगस्ट 1947",
            "26 नोव्हेंबर 1949",
            "30 जानेवारी 1948"
          ]
        }
      ]
    }
  },

  // COMPUTER SCIENCE 1
  "Computer Science Quiz 1 – Fundamentals & Programming": {
    hi: {
      title: "कंप्यूटर विज्ञान क्विज़ 1 – मूल सिद्धांत और प्रोग्रामिंग",
      questions: [
        {
          prompt: "कंप्यूटर विज्ञान में 1 Byte कितने Bits के बराबर होता है?",
          options: [
            "8 bits",
            "4 bits",
            "16 bits",
            "1024 bits"
          ]
        },
        {
          prompt: "Binary संख्या 1010 का Decimal मान क्या है?",
          options: [
            "10",
            "8",
            "12",
            "5"
          ]
        },
        {
          prompt: "कंप्यूटर का कौन सा भाग 'मस्तिष्क' कहलाता है और अंकगणितीय और तार्किक कार्य करता है?",
          options: [
            "CPU (Central Processing Unit)",
            "RAM (Random Access Memory)",
            "Hard Drive",
            "Power Supply Unit"
          ]
        },
        {
          prompt: "Python या JavaScript में कौन सा data type true/false मान संग्रहीत करता है?",
          options: [
            "Boolean",
            "Integer",
            "String",
            "Float"
          ]
        }
      ]
    },
    mr: {
      title: "संगणक शास्त्र क्विझ 1 – मूलभूत तत्त्वे आणि प्रोग्रामिंग",
      questions: [
        {
          prompt: "संगणक शास्त्रात 1 Byte म्हणजे किती Bits?",
          options: [
            "8 bits",
            "4 bits",
            "16 bits",
            "1024 bits"
          ]
        },
        {
          prompt: "Binary संख्या 1010 चे Decimal मूल्य काय आहे?",
          options: [
            "10",
            "8",
            "12",
            "5"
          ]
        },
        {
          prompt: "संगणकाचा कोणता भाग 'मेंदू' मानला जातो जो गणिती आणि तार्किक प्रक्रिया करतो?",
          options: [
            "CPU (Central Processing Unit)",
            "RAM (Random Access Memory)",
            "Hard Drive",
            "Power Supply Unit"
          ]
        },
        {
          prompt: "Python किंवा JavaScript मध्ये कोणता data type true/false मूल्य साठवतो?",
          options: [
            "Boolean",
            "Integer",
            "String",
            "Float"
          ]
        }
      ]
    }
  },

  // COMPUTER SCIENCE 2
  "Computer Science Quiz 2 – OOP & Data Structures": {
    hi: {
      title: "कंप्यूटर विज्ञान क्विज़ 2 – OOP और डेटा संरचनाएँ",
      questions: [
        {
          prompt: "Stack डेटा संरचना किस नियम पर कार्य करती है?",
          options: [
            "LIFO (Last In First Out)",
            "FIFO (First In First Out)",
            "Priority Ordering",
            "Random Access"
          ]
        },
        {
          prompt: "OOP (Object-Oriented Programming) का कौन सा सिद्धांत डेटा और विधियों को एक इकाई में बांधता है?",
          options: [
            "Encapsulation",
            "Inheritance",
            "Polymorphism",
            "Abstraction"
          ]
        },
        {
          prompt: "Binary Search Tree (BST) में किसी node के बाएँ child का मान कैसा होना चाहिए?",
          options: [
            "Parent node के मान से कम",
            "Parent node के मान से अधिक",
            "Parent node के मान के बराबर",
            "अनिश्चित"
          ]
        },
        {
          prompt: "एक Singly Linked List में किसी node के पास क्या संग्रहीत होता है?",
          options: [
            "Data और अगले node का pointer (next)",
            "केवल Data",
            "बाएँ और दाएँ दोनों pointers",
            "Index नंबर"
          ]
        }
      ]
    },
    mr: {
      title: "संगणक शास्त्र क्विझ 2 – OOP आणि डेटा स्ट्रक्चर्स",
      questions: [
        {
          prompt: "Stack डेटा स्ट्रक्चर कोणत्या तत्त्वावर कार्य करते?",
          options: [
            "LIFO (Last In First Out)",
            "FIFO (First In First Out)",
            "Priority Ordering",
            "Random Access"
          ]
        },
        {
          prompt: "OOP (Object-Oriented Programming) चा कोणता गुणधर्म डेटा आणि कार्यप्रणाली एका घटकात बांधतो?",
          options: [
            "Encapsulation",
            "Inheritance",
            "Polymorphism",
            "Abstraction"
          ]
        },
        {
          prompt: "Binary Search Tree (BST) मध्ये डाव्या child चे मूल्य कसे असले पाहिजे?",
          options: [
            "Parent node च्या मूल्यापेक्षा कमी",
            "Parent node च्या मूल्यापेक्षा जास्त",
            "Parent node च्या मूल्याइतकेच",
            "अनिश्चित"
          ]
        },
        {
          prompt: "एका Singly Linked List मधील एका घटकाकडे (node) काय साठवलेले असते?",
          options: [
            "Data आणि पुढील node चा pointer (next)",
            "केवळ Data",
            "दोन्ही बाजूंचे pointers",
            "Index क्रमांक"
          ]
        }
      ]
    }
  },

  // COMPUTER SCIENCE 3
  "Computer Science Quiz 3 – Algorithms, Networks & Security": {
    hi: {
      title: "कंप्यूटर विज्ञान क्विज़ 3 – एल्गोरिदम, नेटवर्क और सुरक्षा",
      questions: [
        {
          prompt: "Binary Search एल्गोरिदम की समय जटिलता (Time Complexity) क्या है?",
          options: [
            "O(log n)",
            "O(n)",
            "O(n²)",
            "O(1)"
          ]
        },
        {
          prompt: "Web Browsing के लिए सुरक्षित एन्क्रिप्टेड संचार (encrypted communication) कौन सा प्रोटोकॉल प्रदान करता है?",
          options: [
            "HTTPS",
            "HTTP",
            "FTP",
            "Telnet"
          ]
        },
        {
          prompt: "कंप्यूटर नेटवर्क में IP Address का क्या कार्य है?",
          options: [
            "नेटवर्क पर डिवाइस की अद्वितीय पहचान करना",
            "डिवाइस की गति बढ़ाना",
            "फाइलों को स्थायी रूप से स्टोर करना",
            "स्क्रीन का रिज़ॉल्यूशन सेट करना"
          ]
        },
        {
          prompt: "असममित एन्क्रिप्शन (Asymmetric Encryption) में कौन सी चाबियों की जोड़ी का उपयोग होता है?",
          options: [
            "Public Key और Private Key",
            "Single Shared Secret Key",
            "Session Key केवल",
            "Hardware Dongle Key"
          ]
        }
      ]
    },
    mr: {
      title: "संगणक शास्त्र क्विझ 3 – अल्गोरिदम, नेटवर्क्स आणि सुरक्षा",
      questions: [
        {
          prompt: "Binary Search अल्गोरिदमची Time Complexity काय आहे?",
          options: [
            "O(log n)",
            "O(n)",
            "O(n²)",
            "O(1)"
          ]
        },
        {
          prompt: "Web Browsing साठी सुरक्षित एन्क्रिप्टेड संप्रेषण (encrypted communication) कोणता प्रोटोकॉल पुरवतो?",
          options: [
            "HTTPS",
            "HTTP",
            "FTP",
            "Telnet"
          ]
        },
        {
          prompt: "संगणक नेटवर्कमध्ये IP Address चे मुख्य काम काय असते?",
          options: [
            "नेटवर्कवरील डिव्हाइसची एकमेव ओळख निश्चित करणे",
            "डिव्हाइसचा वेग वाढवणे",
            "फायली कायमस्वरूपी साठवणे",
            "स्क्रीनचा रिझोल्यूशन ठरवणे"
          ]
        },
        {
          prompt: "असममित एन्क्रिप्शनमध्ये (Asymmetric Encryption) कोणत्या चाव्यांची जोडी वापरली जाते?",
          options: [
            "Public Key आणि Private Key",
            "Single Shared Secret Key",
            "Session Key केवळ",
            "Hardware Dongle Key"
          ]
        }
      ]
    }
  }
};

const output = `// Auto-generated Quiz Multilingual Translations (Hindi & Marathi)
// Preserving all formulas, technical terms, and numbers

export interface TranslatedOption {
  label: string
  text: string
}

export interface TranslatedQuestion {
  prompt: string
  options: string[]
}

export interface QuizTranslationContent {
  title: string
  questions: TranslatedQuestion[]
}

export const QUIZ_TRANSLATIONS: Record<string, { hi: QuizTranslationContent; mr: QuizTranslationContent }> = ${JSON.stringify(translations, null, 2)}

export function getQuizTranslation(quizTitle: string, lang: 'en' | 'hi' | 'mr'): QuizTranslationContent | null {
  if (lang === 'en') return null
  const match = QUIZ_TRANSLATIONS[quizTitle]
  if (!match) return null
  return match[lang] || null
}
`;

fs.writeFileSync('c:/Users/Adhitya/OneDrive/Desktop/Offline Education HackKumbh/apps/web/src/data/quiz-translations.ts', output, 'utf8');
console.log('Successfully wrote quiz translations for all 18 quizzes!');
