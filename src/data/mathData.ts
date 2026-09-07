export const FORMULAS = [
  {
    category: "Razones Trigonométricas Básicas",
    formulas: [
      "Seno (sen) = Cateto Opuesto / Hipotenusa",
      "Coseno (cos) = Cateto Adyacente / Hipotenusa",
      "Tangente (tan) = Cateto Opuesto / Cateto Adyacente"
    ],
    explanation: "Fórmulas fundamentales (SOH CAH TOA) para resolver triángulos rectángulos conociendo un ángulo y un lado.",
    applicationMethod: "1. Identifica el ángulo con el que vas a trabajar.\n2. Nombra los lados del triángulo (Hipotenusa, Cateto Opuesto al ángulo, Cateto Adyacente al ángulo).\n3. Determina qué dato tienes y qué dato buscas.\n4. Elige la razón trigonométrica que relacione el dato que tienes con el que buscas.\n5. Despeja la incógnita."
  },
  {
    category: "Teorema de Pitágoras",
    formulas: [
      "h² = a² + b²",
      "Hipotenusa = √(C.Opuesto² + C.Adyacente²)",
      "Cateto = √(Hipotenusa² - OtroCateto²)"
    ],
    explanation: "Útil para encontrar el tercer lado de un triángulo rectángulo cuando ya se conocen los otros dos.",
    applicationMethod: "1. Asegúrate de tener un triángulo rectángulo (un ángulo de 90°).\n2. Identifica la hipotenusa (el lado más largo, frente al ángulo de 90°) y los catetos (los lados que forman el ángulo de 90°).\n3. Sustituye los valores conocidos en la fórmula general (h² = a² + b²).\n4. Resuelve la ecuación: eleva al cuadrado, suma o resta según corresponda, y finalmente saca la raíz cuadrada."
  },
  {
    category: "Ángulos de Elevación y Depresión",
    formulas: [
      "Ángulo de elevación: Se mide desde la horizontal hacia arriba (ej. mirar la cima de una torre).",
      "Ángulo de depresión: Se mide desde la horizontal hacia abajo (ej. mirar desde un avión al suelo)."
    ],
    explanation: "El ángulo de elevación desde A hasta B es igual al ángulo de depresión desde B hasta A (ángulos alternos internos).",
    applicationMethod: "1. Traza una línea horizontal imaginaria desde los ojos del observador.\n2. Traza la línea de visión hacia el objeto.\n3. El ángulo de elevación o depresión es el ángulo formado entre la línea horizontal y la línea de visión.\n4. Frecuentemente se usan con la función Tangente (ya que suelen involucrar altura y distancia horizontal)."
  },
  {
    category: "Casos de Factorización",
    formulas: [
      "Factor Común: ab + ac = a(b + c)",
      "Diferencia de Cuadrados: a² - b² = (a + b)(a - b)",
      "Trinomio Cuadrado Perfecto: a² ± 2ab + b² = (a ± b)²",
      "Trinomio de la forma x² + bx + c: (x + p)(x + q) donde p+q=b y p*q=c"
    ],
    explanation: "Permite simplificar expresiones algebraicas transformando sumas/restas en multiplicaciones.",
    applicationMethod: "1. Revisa siempre si hay un Factor Común primero.\n2. Si es un binomio (dos términos) separados por una resta, revisa si es una Diferencia de Cuadrados.\n3. Si es un trinomio, verifica si los extremos tienen raíz exacta y si el centro es el doble producto de las raíces (Trinomio Cuadrado Perfecto).\n4. Si es de la forma x² + bx + c, busca dos números que multiplicados den 'c' y sumados den 'b'."
  },
  {
    category: "Uso de la Calculadora Científica",
    formulas: [
      "Modo Angular: Revisa si la pantalla dice 'DEG' (grados) o 'RAD' (radianes) antes de usar seno/coseno/tangente.",
      "Botón 'ANS': Guarda el resultado anterior para usarlo directamente en el próximo cálculo y no perder decimales.",
      "Fracciones: Usa el botón 'S<=>D' o 'a b/c' para pasar de fracción a decimal al instante.",
      "Paréntesis: Usa siempre paréntesis al dividir operaciones largas: (a+b)/(c+d)."
    ],
    explanation: "Trucos para no equivocarse por errores de digitación en la calculadora.",
    applicationMethod: "1. Antes de cualquier examen, presiona SHIFT + SETUP o MODE y asegúrate de que esté en 'DEG' (Degree / Grados) para problemas básicos de geometría.\n2. Cuando obtengas un resultado intermedio largo, presiona '=' y luego en la siguiente operación usa la tecla 'ANS' en lugar de volver a escribir los decimales.\n3. Revisa la pantalla antes de dar igual: la calculadora lee las operaciones literalmente, si omites un paréntesis, calculará algo completamente distinto."
  },
  {
    category: "Técnicas Visuales de Multiplicación",
    formulas: [
      "Método Chino/Japonés (Líneas): Dibuja líneas paralelas cruzadas para cada dígito. Cuenta las intersecciones para obtener el resultado.",
      "Truco de los dedos (Tabla del 9): Pon tus 10 dedos frente a ti. Para 9x3, baja el tercer dedo. Quedan 2 dedos a la izquierda y 7 a la derecha = 27.",
      "Tabla del 11: Para multiplicar 11 x 35, separa el 3 y el 5. Suma 3+5=8 y ponlo en el medio = 385."
    ],
    explanation: "Alternativas visuales y táctiles a la memorización tradicional de las tablas.",
    applicationMethod: "1. Para el Método Chino: Si es 21 x 13, dibuja 2 líneas, espacio, 1 línea (verticales). Luego cruza 1 línea, espacio, 3 líneas (horizontales). Cuenta las intersecciones en 3 zonas: izquierda (centenas), medio (decenas), derecha (unidades).\n2. Para la del 9: Funciona del 9x1 al 9x10. El número por el que multiplicas indica qué dedo (contando de izquierda a derecha) debes doblar.\n3. Para la del 11: Si la suma de los dos dígitos da más de 9 (ej. 11 x 48), sumas 4+8=12. Dejas el 2 en el medio y sumas el 1 al primer dígito (4+1=5), resultado = 528."
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
  { front: "¿Qué es el ángulo de depresión?", back: "El ángulo formado por la línea horizontal y la línea de visión hacia abajo." },
  { front: "Factorización: Diferencia de cuadrados (a² - b²)", back: "(a + b)(a - b)" },
  { front: "Factorización: Factor Común de (2x + 4)", back: "2(x + 2)" },
  { front: "Calculadora: ¿Para qué sirve el botón 'ANS'?", back: "Usa la respuesta exacta del cálculo anterior (sin perder decimales)." },
  { front: "Calculadora: Si calculas un Seno y sale un número negativo o raro, ¿qué debes revisar?", back: "El modo angular (asegúrate de que esté en DEG para grados)." },
  { front: "Truco del 9: ¿Qué pasa si bajas el dedo 4 (índice izq)?", back: "Quedan 3 dedos a la izquierda y 6 a la derecha = 9x4 = 36." },
  { front: "Multiplicación China/Japonesa", back: "Trazar líneas cruzadas por cada dígito y contar las intersecciones." }
];

export const EXAM_QUESTIONS = [
  {
    question: "Una escalera de 5 m de longitud está apoyada contra una pared. La escalera forma un ángulo de 60° con el suelo. ¿A qué altura de la pared llega la escalera?",
    options: ["4.33 m", "2.5 m", "8.66 m", "5 m"],
    correctAnswer: "4.33 m",
    resolution: "Se usa el Seno(60°) = Cateto Opuesto / Hipotenusa. Despejando: Altura = 5 * sen(60°) ≈ 5 * 0.866 = 4.33 m.",
    hint: "Recuerda SOH: El seno del ángulo relaciona la altura (cateto opuesto) con la longitud de la escalera (hipotenusa)."
  },
  {
    question: "Una persona se encuentra a 10 m de la base de un árbol. Si observa la parte superior del árbol con un ángulo de elevación de 35°, ¿cuál es la altura aproximada del árbol?",
    options: ["14.28 m", "7.00 m", "5.73 m", "12.20 m"],
    correctAnswer: "7.00 m",
    resolution: "Se usa Tangente(35°) = Cateto Opuesto / Cateto Adyacente. Altura = 10 * tan(35°) ≈ 10 * 0.7002 = 7.00 m.",
    hint: "Tienes la distancia horizontal (adyacente) y buscas la altura (opuesto). Usa TOA (Tangente)."
  },
  {
    question: "Un niño sostiene una cuerda de 20 m de longitud que forma un ángulo de 40° con el suelo. Suponiendo que la cuerda está completamente tensa, ¿a qué altura se encuentra la cometa?",
    options: ["15.32 m", "12.86 m", "16.78 m", "10.00 m"],
    correctAnswer: "12.86 m",
    resolution: "Se usa Seno(40°) = Cateto Opuesto / Hipotenusa. Altura = 20 * sen(40°) ≈ 20 * 0.6428 = 12.86 m.",
    hint: "La cuerda representa la hipotenusa. Estás buscando la altura (cateto opuesto). Usa el Seno."
  },
  {
    question: "Una rampa para personas con movilidad reducida tiene una longitud de 6 m y forma un ángulo de 12° con el suelo. ¿Qué altura alcanza la rampa?",
    options: ["1.25 m", "5.87 m", "1.50 m", "2.10 m"],
    correctAnswer: "1.25 m",
    resolution: "Se usa Seno(12°) = Cateto Opuesto / Hipotenusa. Altura = 6 * sen(12°) ≈ 6 * 0.2079 = 1.25 m.",
    hint: "La rampa es la hipotenusa. Quieres saber la altura a la que llega (opuesto). SOH."
  },
  {
    question: "Un avión se encuentra a una altura de 2.500 m. Desde un punto en tierra, el ángulo de elevación hacia el avión es de 30°. ¿Cuál es la distancia aproximada entre el punto de observación (en tierra) y el avión?",
    options: ["5000 m", "4330 m", "2886 m", "1250 m"],
    correctAnswer: "5000 m",
    resolution: "Se usa Seno(30°) = Cateto Opuesto / Hipotenusa. Despejando: Hipotenusa = 2500 / sen(30°) = 2500 / 0.5 = 5000 m.",
    hint: "Tienes la altura (opuesto) y te piden la distancia visual (hipotenusa). Usa Seno y despeja la hipotenusa."
  },
  {
    question: "Una persona observa la cima de una montaña desde un punto situado a 800 m de su base. El ángulo de elevación es de 28°. Si los ojos de la persona están a 1,60 m sobre el suelo, ¿cuál es la altura aproximada de la montaña?",
    options: ["426.96 m", "425.36 m", "800.00 m", "907.50 m"],
    correctAnswer: "426.96 m",
    resolution: "Cateto Opuesto = 800 * tan(28°) ≈ 425.36 m. Luego se suma la altura del observador: 425.36 m + 1.60 m = 426.96 m.",
    hint: "Usa la Tangente para hallar la altura del triángulo, ¡pero no te olvides de sumarle la altura de la persona al final!"
  },
  {
    question: "Desde un punto A, una persona observa la parte superior de una torre con un ángulo de elevación de 30°. Luego se acerca 20 m hacia la torre hasta el punto B y observa la parte superior con un ángulo de 45°. ¿Cuál es la altura de la torre?",
    options: ["27.32 m", "34.64 m", "20.00 m", "47.32 m"],
    correctAnswer: "27.32 m",
    resolution: "Sistema de ecuaciones: h = x*tan(45°) y h = (x+20)*tan(30°). Como tan(45°)=1, x=h. Resolviendo: h = 20√3 / (3-√3) ≈ 27.32 m.",
    hint: "Se forman dos triángulos rectángulos diferentes. Expresa la altura 'h' usando la tangente en ambos y luego iguala las expresiones."
  },
  {
    question: "Desde la orilla de un río se observa la parte superior de un edificio ubicado en la otra orilla, a 40 m de distancia horizontal, con un ángulo de elevación de 50°. Si la altura de los ojos de la persona es de 1,70 m, ¿cuál es la altura total del edificio?",
    options: ["49.37 m", "47.67 m", "62.23 m", "33.56 m"],
    correctAnswer: "49.37 m",
    resolution: "Cateto Opuesto = 40 * tan(50°) ≈ 47.67 m. Sumando la altura de los ojos: 47.67 m + 1.70 m = 49.37 m.",
    hint: "Similar al ejercicio de la montaña. Calcula el cateto opuesto con la Tangente y suma la altura del observador."
  },
  {
    question: "Factoriza la siguiente diferencia de cuadrados: 16x² - 9",
    options: ["(4x - 3)(4x + 3)", "(4x - 3)²", "(16x - 9)(x + 1)", "(8x - 3)(2x + 3)"],
    correctAnswer: "(4x - 3)(4x + 3)",
    resolution: "La raíz cuadrada de 16x² es 4x y la de 9 es 3. Al ser una diferencia de cuadrados a² - b², se factoriza como (a - b)(a + b).",
    hint: "Saca la raíz cuadrada de ambos términos y agrúpalos sumando y restando."
  },
  {
    question: "Factoriza el siguiente trinomio cuadrado perfecto: x² + 10x + 25",
    options: ["(x + 5)²", "(x - 5)²", "(x + 10)(x + 5)", "x(x + 10) + 25"],
    correctAnswer: "(x + 5)²",
    resolution: "La raíz del primer término es x, la del último es 5. El doble del producto es 2*x*5 = 10x, que coincide con el término del medio. Entonces es (x + 5)².",
    hint: "Revisa el último número (25). ¿Cuál es su raíz cuadrada? Si la multiplicas por 2, ¿da el del medio?"
  },
  {
    question: "Si pones 'tan(90)' en la calculadora científica en modo DEG, ¿qué te mostrará?",
    options: ["Math Error (Error matemático)", "0", "1", "Infinito"],
    correctAnswer: "Math Error (Error matemático)",
    resolution: "La tangente de 90 grados es indefinida (división por cero ya que el coseno de 90° es 0). Las calculadoras muestran Math Error.",
    hint: "Recuerda que Tangente = Seno / Coseno. El coseno de 90° es 0, y dividir entre cero..."
  },
  {
    question: "Usando el truco de las manos para la tabla del 9: Si quiero multiplicar 9x7, bajo el séptimo dedo contando de izquierda a derecha. ¿Qué número formo?",
    options: ["63 (6 a la izquierda, 3 a la derecha)", "54 (5 a la izquierda, 4 a la derecha)", "72 (7 a la izquierda, 2 a la derecha)", "45 (4 a la izquierda, 5 a la derecha)"],
    correctAnswer: "63 (6 a la izquierda, 3 a la derecha)",
    resolution: "Al bajar el dedo 7, te quedan exactamente 6 dedos levantados a su izquierda (las decenas) y 3 dedos levantados a su derecha (las unidades) = 63.",
    hint: "Visualiza tus 10 dedos. Cuenta desde el pulgar izquierdo hasta el dedo 7. ¿Cuántos dedos te quedan a cada lado de ese dedo?"
  }
];
