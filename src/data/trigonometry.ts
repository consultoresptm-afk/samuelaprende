export const FORMULAS = [
  {
    category: "Identidades Pitagóricas",
    formulas: [
      "sin²(θ) + cos²(θ) = 1",
      "1 + tan²(θ) = sec²(θ)",
      "1 + cot²(θ) = csc²(θ)"
    ],
    explanation: "Estas identidades provienen del Teorema de Pitágoras aplicado al círculo unitario."
  },
  {
    category: "Identidades Recíprocas",
    formulas: [
      "csc(θ) = 1 / sin(θ)",
      "sec(θ) = 1 / cos(θ)",
      "cot(θ) = 1 / tan(θ)"
    ],
    explanation: "Definen las funciones trigonométricas secundarias en términos de las primarias."
  },
  {
    category: "Identidades de Cociente",
    formulas: [
      "tan(θ) = sin(θ) / cos(θ)",
      "cot(θ) = cos(θ) / sin(θ)"
    ],
    explanation: "Relacionan tangente y cotangente directamente con seno y coseno."
  },
  {
    category: "Ángulo Doble",
    formulas: [
      "sin(2θ) = 2sin(θ)cos(θ)",
      "cos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ)",
      "tan(2θ) = (2tan(θ)) / (1 - tan²(θ))"
    ],
    explanation: "Útiles para simplificar expresiones donde el ángulo está multiplicado por dos."
  }
];

export const FLASHCARDS = [
  { front: "sin²(θ) + cos²(θ)", back: "1" },
  { front: "1 / cos(θ)", back: "sec(θ)" },
  { front: "sin(θ) / cos(θ)", back: "tan(θ)" },
  { front: "cos²(θ) - sin²(θ)", back: "cos(2θ)" },
  { front: "1 + tan²(θ)", back: "sec²(θ)" },
  { front: "2sin(θ)cos(θ)", back: "sin(2θ)" },
  { front: "1 / sin(θ)", back: "csc(θ)" },
  { front: "cos(θ) / sin(θ)", back: "cot(θ)" },
  { front: "1 + cot²(θ)", back: "csc²(θ)" },
  { front: "1 / tan(θ)", back: "cot(θ)" }
];

export const EXAM_QUESTIONS = [
  {
    question: "Simplifica la expresión: sin(x) * cot(x)",
    options: ["sin(x)", "cos(x)", "tan(x)", "sec(x)"],
    correctAnswer: "cos(x)",
    resolution: "Sabiendo que cot(x) = cos(x)/sin(x), multiplicamos: sin(x) * (cos(x)/sin(x)). Los senos se cancelan, quedando cos(x)."
  },
  {
    question: "¿A qué es igual 1 - sin²(x)?",
    options: ["cos²(x)", "tan²(x)", "sec²(x)", "csc²(x)"],
    correctAnswer: "cos²(x)",
    resolution: "A partir de la identidad pitagórica sin²(x) + cos²(x) = 1, si despejamos cos²(x) obtenemos 1 - sin²(x)."
  },
  {
    question: "Evalúa: (1 + tan²(x)) * cos²(x)",
    options: ["sin²(x)", "cos²(x)", "1", "tan²(x)"],
    correctAnswer: "1",
    resolution: "Sabemos que 1 + tan²(x) = sec²(x). Además, sec(x) = 1/cos(x), entonces sec²(x) = 1/cos²(x). Al multiplicar por cos²(x), obtenemos 1."
  },
  {
    question: "Simplifica: sin(2x) / (2cos(x))",
    options: ["sin(x)", "cos(x)", "tan(x)", "1"],
    correctAnswer: "sin(x)",
    resolution: "Usando la identidad de ángulo doble, sin(2x) = 2sin(x)cos(x). Al dividir por 2cos(x), obtenemos sin(x)."
  },
  {
    question: "Si tan(x) = 3/4 y x es agudo, ¿cuánto vale sin(x)?",
    options: ["3/5", "4/5", "3/4", "4/3"],
    correctAnswer: "3/5",
    resolution: "En un triángulo rectángulo, opuesto=3, adyacente=4. La hipotenusa es √(3² + 4²) = 5. Así que sin(x) = opuesto/hipotenusa = 3/5."
  }
];
