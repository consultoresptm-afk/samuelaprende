export const FORMULAS = [
  {
    category: "Razones Trigonométricas Básicas",
    formulas: [
      "Seno (sen) = Cateto Opuesto / Hipotenusa",
      "Coseno (cos) = Cateto Adyacente / Hipotenusa",
      "Tangente (tan) = Cateto Opuesto / Cateto Adyacente"
    ],
    explanation: "Fórmulas fundamentales (SOH CAH TOA) para resolver triángulos rectángulos conociendo un ángulo y un lado."
  },
  {
    category: "Teorema de Pitágoras",
    formulas: [
      "h² = a² + b²",
      "Hipotenusa = √(C.Opuesto² + C.Adyacente²)",
      "Cateto = √(Hipotenusa² - OtroCateto²)"
    ],
    explanation: "Útil para encontrar el tercer lado de un triángulo rectángulo cuando ya se conocen los otros dos."
  },
  {
    category: "Ángulos de Elevación y Depresión",
    formulas: [
      "Ángulo de elevación: Se mide desde la horizontal hacia arriba (ej. mirar la cima de una torre).",
      "Ángulo de depresión: Se mide desde la horizontal hacia abajo (ej. mirar desde un avión al suelo)."
    ],
    explanation: "El ángulo de elevación desde A hasta B es igual al ángulo de depresión desde B hasta A (ángulos alternos internos)."
  }
];

export const FLASHCARDS = [
  { front: "¿A qué es igual Seno(θ)?", back: "Cateto Opuesto / Hipotenusa" },
  { front: "¿A qué es igual Coseno(θ)?", back: "Cateto Adyacente / Hipotenusa" },
  { front: "¿A qué es igual Tangente(θ)?", back: "Cateto Opuesto / Cateto Adyacente" },
  { front: "Regla mnemotécnica para las razones trigonométricas", back: "SOH CAH TOA" },
  { front: "Fórmula del Teorema de Pitágoras", back: "h² = a² + b² (Hipotenusa al cuadrado es la suma de los catetos al cuadrado)" },
  { front: "Razón que relaciona el Cateto Opuesto y el Cateto Adyacente", back: "Tangente" },
  { front: "Razón que relaciona el Cateto Opuesto y la Hipotenusa", back: "Seno" },
  { front: "Razón que relaciona el Cateto Adyacente y la Hipotenusa", back: "Coseno" },
  { front: "¿Qué es el ángulo de elevación?", back: "El ángulo formado por la línea horizontal y la línea de visión hacia arriba." },
  { front: "¿Qué es el ángulo de depresión?", back: "El ángulo formado por la línea horizontal y la línea de visión hacia abajo." }
];

export const EXAM_QUESTIONS = [
  {
    question: "Una escalera de 5 m de longitud está apoyada contra una pared. La escalera forma un ángulo de 60° con el suelo. ¿A qué altura de la pared llega la escalera?",
    options: ["4.33 m", "2.5 m", "8.66 m", "5 m"],
    correctAnswer: "4.33 m",
    resolution: "Se usa el Seno(60°) = Cateto Opuesto / Hipotenusa. Despejando: Altura = 5 * sen(60°) ≈ 5 * 0.866 = 4.33 m."
  },
  {
    question: "Una persona se encuentra a 10 m de la base de un árbol. Si observa la parte superior del árbol con un ángulo de elevación de 35°, ¿cuál es la altura aproximada del árbol?",
    options: ["14.28 m", "7.00 m", "5.73 m", "12.20 m"],
    correctAnswer: "7.00 m",
    resolution: "Se usa Tangente(35°) = Cateto Opuesto / Cateto Adyacente. Altura = 10 * tan(35°) ≈ 10 * 0.7002 = 7.00 m."
  },
  {
    question: "Un niño sostiene una cuerda de 20 m de longitud que forma un ángulo de 40° con el suelo. Suponiendo que la cuerda está completamente tensa, ¿a qué altura se encuentra la cometa?",
    options: ["15.32 m", "12.86 m", "16.78 m", "10.00 m"],
    correctAnswer: "12.86 m",
    resolution: "Se usa Seno(40°) = Cateto Opuesto / Hipotenusa. Altura = 20 * sen(40°) ≈ 20 * 0.6428 = 12.86 m."
  },
  {
    question: "Una rampa para personas con movilidad reducida tiene una longitud de 6 m y forma un ángulo de 12° con el suelo. ¿Qué altura alcanza la rampa?",
    options: ["1.25 m", "5.87 m", "1.50 m", "2.10 m"],
    correctAnswer: "1.25 m",
    resolution: "Se usa Seno(12°) = Cateto Opuesto / Hipotenusa. Altura = 6 * sen(12°) ≈ 6 * 0.2079 = 1.25 m."
  },
  {
    question: "Un avión se encuentra a una altura de 2.500 m. Desde un punto en tierra, el ángulo de elevación hacia el avión es de 30°. ¿Cuál es la distancia aproximada entre el punto de observación (en tierra) y el avión?",
    options: ["5000 m", "4330 m", "2886 m", "1250 m"],
    correctAnswer: "5000 m",
    resolution: "Se usa Seno(30°) = Cateto Opuesto / Hipotenusa. Despejando: Hipotenusa = 2500 / sen(30°) = 2500 / 0.5 = 5000 m."
  },
  {
    question: "Una persona observa la cima de una montaña desde un punto situado a 800 m de su base. El ángulo de elevación es de 28°. Si los ojos de la persona están a 1,60 m sobre el suelo, ¿cuál es la altura aproximada de la montaña?",
    options: ["426.96 m", "425.36 m", "800.00 m", "907.50 m"],
    correctAnswer: "426.96 m",
    resolution: "Cateto Opuesto = 800 * tan(28°) ≈ 425.36 m. Luego se suma la altura del observador: 425.36 m + 1.60 m = 426.96 m."
  },
  {
    question: "Desde un punto A, una persona observa la parte superior de una torre con un ángulo de elevación de 30°. Luego se acerca 20 m hacia la torre hasta el punto B y observa la parte superior con un ángulo de 45°. ¿Cuál es la altura de la torre?",
    options: ["27.32 m", "34.64 m", "20.00 m", "47.32 m"],
    correctAnswer: "27.32 m",
    resolution: "Sistema de ecuaciones: h = x*tan(45°) y h = (x+20)*tan(30°). Como tan(45°)=1, x=h. Resolviendo: h = 20√3 / (3-√3) ≈ 27.32 m."
  },
  {
    question: "Desde la orilla de un río se observa la parte superior de un edificio ubicado en la otra orilla, a 40 m de distancia horizontal, con un ángulo de elevación de 50°. Si la altura de los ojos de la persona es de 1,70 m, ¿cuál es la altura total del edificio?",
    options: ["49.37 m", "47.67 m", "62.23 m", "33.56 m"],
    correctAnswer: "49.37 m",
    resolution: "Cateto Opuesto = 40 * tan(50°) ≈ 47.67 m. Sumando la altura de los ojos: 47.67 m + 1.70 m = 49.37 m."
  }
];
