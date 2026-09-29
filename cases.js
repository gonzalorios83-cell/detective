(() => {
  'use strict';

  const p = (name, role, note) => ({ name, role, note });
  const l = (name, icon, cost, scene, action, clueTitle, clueText) => ({ name, icon, cost, scene, action, clueTitle, clueText });

  window.CASE_ORDER = ['tomorrow', 'portrait', 'call', 'witness', 'veronica', 'contract', 'malaidea', 'unica', 'message'];

  window.CASES = {
    tomorrow: {
      number: 1,
      title: 'El crimen de mañana',
      difficulty: 'Inicial',
      duration: '10–15 min',
      kind: 'Prevención',
      credit: 'Caso original del juego.',
      intro: {
        kicker: 'EXPEDIENTE N.º 01 · 14 DE OCTUBRE',
        paper: 'EL MENSAJERO',
        edition: 'EDICIÓN DEL 15 DE OCTUBRE',
        headline: 'VARELA, MUERTO\nEN SU OBSERVATORIO',
        caption: 'El criminal huyó en el tren de las 00:05.',
        summary: 'El suplemento llegó esta tarde. La edición corresponde a mañana y el crimen que describe todavía no ocurrió.'
      },
      opening: [
        'A las 19:12, la redacción de El Mensajero recibe ocho suplementos fechados mañana.',
        'La tapa anuncia que Adrián Varela morirá a las 23:47 y que el asesino escapará en el tren de las 00:05.',
        'La lluvia que el diario describe todavía no ha empezado.'
      ],
      objective: 'Descubrir quién convirtió una falsa noticia en el plan de un asesinato e impedirlo.',
      file: [
        ['OBJETIVO DE LA PREDICCIÓN', 'Adrián Varela', 'Industrial y astrónomo. Según el diario, morirá a las 23:47.'],
        ['ANOMALÍA', 'Una edición de mañana', 'Relata el crimen como un hecho consumado, incluida una fuga que todavía no ocurrió.']
      ],
      people: [
        p('Adrián Varela', 'Víctima anunciada', 'Encargó una primera versión falsa del suplemento.'),
        p('Darío Mena', 'Secretario de Varela', 'Conoce las cuentas, las llaves y los horarios del observatorio.'),
        p('Nora Vélez', 'Editora de El Mensajero', 'Recibió el paquete y supervisó la impresión.'),
        p('Simón Lagos', 'Jefe de estación', 'Controla los registros del último tren.')
      ],
      locations: [
        l('Imprenta de El Mensajero', '▤', 25, 'Una plancha lavada a medias conserva dos momentos de escritura. Varela encargó el titular; otra mano añadió la fuga.', 'Comparar las dos tintas', 'Corrección posterior', 'La frase sobre el tren fue añadida a las 18:40, después de que Varela se retiró. El visitante llevaba el abrigo de Mena.'),
        l('Estación Central', '⌁', 22, 'El tablero está casi vacío. El tren de las 00:05 fue cancelado antes de que se imprimiera el suplemento.', 'Pedir el registro ferroviario', 'Tren inexistente', 'La cancelación fue comunicada a las 17:14. Quien añadió la fuga sabía que nadie podría comprobarla en el andén.'),
        l('Casa Varela', '⌂', 20, 'Varela admite que inventó su propia muerte para obligar a reaccionar a quien desviaba dinero de su empresa.', 'Revisar el libro contable', 'Motivo económico', 'Las transferencias terminan en una sociedad administrada por Darío Mena. Varela pensaba denunciarlas al amanecer.'),
        l('Observatorio Varela', '◉', 30, 'En el cuarto de revelado queda una placa reciente. La puerta lateral fue abierta con una llave legítima.', 'Revelar la placa', 'Presencia anticipada', 'La imagen muestra a Mena entrando a las 18:56 con un portafolio y el mismo abrigo visto en la imprenta.')
      ],
      informant: 'Un canillita vio a Mena guardar varios suplementos en el portafolio antes de dirigirse al observatorio.',
      resolution: {
        type: 'person',
        prompt: '¿Quién intentará cumplir la predicción?',
        button: 'PRESENTAR ACUSACIÓN',
        correct: 'Darío Mena',
        wrong: 'La persona señalada no explica a la vez la corrección de imprenta, el fraude y el acceso al observatorio.',
        verdict: 'Darío Mena utilizó el engaño de Varela como coartada anticipada. Preparó la fuga imposible y regresó para convertir la ficción en noticia.',
        epilogue: 'A las 23:41, Mena encontró la luz del observatorio encendida y a dos agentes esperándolo. La edición del día siguiente nunca llegó a la calle.'
      }
    },

    portrait: {
      number: 2,
      title: 'El retrato que cambió de lugar',
      difficulty: 'Intermedia',
      duration: '10–15 min',
      kind: 'Robo',
      credit: 'Caso original del juego.',
      intro: {
        kicker: 'EXPEDIENTE N.º 02 · 14 DE OCTUBRE', paper: 'REGISTRO DE GALERÍA', edition: '21:10 · 14 DE OCTUBRE',
        headline: 'UNA OBRA\nEN DOS LUGARES', caption: 'La cámara y el inventario no pueden decir la verdad al mismo tiempo.',
        summary: 'El Retrato de Aurelia desapareció de una galería cerrada. Tres personas aseguran no haber abandonado sus habitaciones.'
      },
      opening: [
        'A las 21:10, la pared de la Galería Norte conserva un rectángulo más claro que el resto.',
        'La cámara de conservación muestra el retrato en el archivo. El inventario lo declara todavía colgado.',
        'Una obra no puede ocupar dos lugares; una firma sí puede mentir.'
      ],
      objective: 'Identificar quién fabricó la doble ubicación y dónde ocultó la obra.',
      file: [
        ['PIEZA DESAPARECIDA', 'Retrato de Aurelia', 'Óleo de la colección Cazal. Desapareció durante un cóctel privado.'],
        ['CONTRADICCIÓN', 'Dos registros simultáneos', 'El inventario y la cámara de conservación sitúan la obra en lugares incompatibles.']
      ],
      people: [
        p('Lucía Ferrer', 'Curadora', 'Firmó el inventario y tenía acceso al archivo.'),
        p('Mauro Esteve', 'Restaurador', 'Trabajó sobre el marco esa misma semana.'),
        p('Elena Cazal', 'Propietaria', 'Había asegurado la obra por una suma extraordinaria.'),
        p('Rafael Olmos', 'Guardia nocturno', 'Controló puertas y ascensores durante el cóctel.')
      ],
      locations: [
        l('Galería Norte', '▣', 22, 'El inventario tiene una firma rehecha. Bajo la tinta reciente todavía asoma una hora anterior.', 'Examinar la hoja original', 'Firma superpuesta', 'La modificación se hizo a las 21:02 con la estilográfica de Lucía. El registro anterior decía “retirado para revisión”.'),
        l('Archivo Municipal', '▤', 24, 'La fotografía de conservación parece automática, pero el reloj de la cámara perdió siete minutos.', 'Comparar metadatos', 'Imagen desplazada', 'La foto fue tomada a las 20:53 y cargada como si fuera de las 21:10. La clave utilizada pertenece a la curadora.'),
        l('Hotel Oriente', '▥', 20, 'El ascensor quedó inmóvil entre dos pisos durante siete minutos. Una habitación fue abierta sin registrar salida.', 'Revisar la llave magnética', 'Habitación vacía', 'Lucía salió por la escalera de servicio mientras su tarjeta mantenía encendida la habitación.'),
        l('Taller de marcos', '◇', 28, 'El reverso del marco conserva polvo de yeso fresco y fibras de una tela de depósito.', 'Reconstruir el escondite', 'Pared falsa', 'La obra nunca salió del edificio: fue colocada detrás de un panel preparado por Lucía durante el montaje.')
      ],
      informant: 'Un asistente recuerda que Lucía pidió una copia del inventario y cinta de montaje dos días antes del cóctel.',
      resolution: {
        type: 'person', prompt: '¿Quién montó la desaparición?', button: 'PRESENTAR ACUSACIÓN', correct: 'Lucía Ferrer',
        wrong: 'La acusación no reúne acceso al inventario, control de la cámara y oportunidad para preparar el panel.',
        verdict: 'Lucía alteró el horario, cargó una fotografía anterior y ocultó el retrato dentro de la propia galería.',
        epilogue: 'Cuando retiraron el panel, Aurelia volvió a mirar la sala desde el suelo. Durante una hora había sido el cuadro más buscado de la ciudad sin abandonar su pared.'
      }
    },

    call: {
      number: 3,
      title: 'La última llamada de Ardan',
      difficulty: 'Intermedia',
      duration: '12–18 min',
      kind: 'Desaparición',
      credit: 'Caso original del juego.',
      intro: {
        kicker: 'EXPEDIENTE N.º 03 · 14 DE OCTUBRE', paper: 'ARCHIVO DE LLAMADAS', edition: '22:06 · 14 DE OCTUBRE',
        headline: 'ONCE SEGUNDOS\nANTES DEL SILENCIO', caption: 'Una campana sitúa la llamada donde nadie admite haber estado.',
        summary: 'El periodista Tomás Ardan desapareció después de cuatro llamadas. La última contiene un sonido fuera de lugar.'
      },
      opening: [
        'La última voz de Tomás Ardan dura once segundos.',
        'Detrás se oye una campana y, después, alguien dice su nombre sin acercarse al teléfono.',
        'Tres personas reconocen la voz. Ninguna reconoce el lugar.'
      ],
      objective: 'Reconstruir dónde se grabó la llamada y quién fabricó la desaparición.',
      file: [
        ['PERSONA BUSCADA', 'Tomás Ardan', 'Periodista que investigaba contratos del puerto.'],
        ['ÚLTIMO REGISTRO', 'Once segundos', 'La llamada fue atribuida a su departamento, aunque la línea no la originó.']
      ],
      people: [
        p('Nicolás Borda', 'Colega de Ardan', 'Conocía la investigación y debía recibir una carpeta.'),
        p('Paula Iriarte', 'Editora', 'Canceló la publicación esa misma tarde.'),
        p('Esteban Mora', 'Empleado del puerto', 'Fue entrevistado por Ardan dos días antes.'),
        p('Laura Ardan', 'Hermana', 'Recibió la tercera llamada y ocultó parte de la conversación.')
      ],
      locations: [
        l('Departamento Ardan', '⌂', 20, 'El teléfono conserva cuatro llamadas, pero la última ingresó como desvío desde una cabina pública.', 'Cruzar las líneas', 'Origen desplazado', 'La llamada final salió de una cabina del Puerto Sur. El departamento sólo recibió y redirigió el audio.'),
        l('Central telefónica', '▤', 24, 'La operadora guardó una fracción previa al saludo. Una segunda voz pide que nadie avise a la policía.', 'Recuperar el inicio', 'Voz de fondo', 'La voz pertenece a Nicolás Borda, quien declaró no haber visto a Ardan esa noche.'),
        l('Puerto Sur', '⌁', 26, 'Una cámara muestra a Ardan llegar con una carpeta. Minutos después, Nicolás sale con ella y deja el teléfono en la cabina.', 'Seguir la secuencia', 'La carpeta cambia de manos', 'Ardan permanece dentro de un galpón mientras Nicolás se lleva la investigación y prepara la llamada.'),
        l('Parque del Reloj', '◷', 23, 'La campana grabada pertenece al reloj del parque, pero el mecanismo estaba detenido durante la desaparición.', 'Comparar el sonido', 'Audio preparado', 'Nicolás había grabado la campana por la tarde y la reprodujo en la cabina para falsear la hora.')
      ],
      informant: 'Un estibador oyó a Nicolás discutir con Ardan por la publicación de una carpeta vinculada al puerto.',
      resolution: {
        type: 'person', prompt: '¿Quién fabricó la última llamada?', button: 'PRESENTAR ACUSACIÓN', correct: 'Nicolás Borda',
        wrong: 'La persona elegida no explica la voz recuperada, la carpeta ni el audio preparado.',
        verdict: 'Nicolás retuvo a Ardan, se llevó la carpeta y usó una grabación para situar la llamada en otra hora y otro lugar.',
        epilogue: 'Ardan apareció con vida detrás de una puerta trabada del galpón. Su investigación llegó tarde a la imprenta, pero no al día siguiente.'
      }
    },

    witness: {
      number: 4,
      title: 'El testigo imposible',
      difficulty: 'Intermedia',
      duration: '10–15 min',
      kind: 'Reconstrucción',
      credit: 'Caso original del juego.',
      intro: {
        kicker: 'EXPEDIENTE N.º 04 · 14 DE OCTUBRE', paper: 'ACTA DE LA PLAZA', edition: '23:02 · 14 DE OCTUBRE',
        headline: 'DIJO LA VERDAD\nDESDE EL LUGAR EQUIVOCADO', caption: 'El relato es preciso; el punto de observación, imposible.',
        summary: 'Elías Prado describe un asalto con exactitud, pero la plaza demuestra que no pudo verlo desde donde asegura.'
      },
      opening: [
        'Elías Prado recuerda el color del arma, una alarma breve y la mano con que el ladrón abrió la puerta.',
        'Desde su mesa en la plaza, una farola apagada y un muro vuelven imposible esa precisión.',
        'La pregunta no es si miente sobre lo ocurrido, sino desde dónde lo sabe.'
      ],
      objective: 'Reconstruir la verdadera posición del testigo durante el asalto.',
      file: [
        ['HECHO', 'Asalto en Plaza del Este', 'Un local fue vaciado durante un corte de luz.'],
        ['TESTIGO', 'Elías Prado', 'Su descripción es correcta, pero su línea de visión no existe.']
      ],
      people: [
        p('Elías Prado', 'Testigo', 'Afirma haber permanecido en una mesa de la plaza.'),
        p('Mara Quiroga', 'Camarera', 'Recuerda la mesa ocupada durante el asalto.'),
        p('Julio Rea', 'Portero', 'Custodia el edificio desde el que se oyó la alarma.'),
        p('Celia Robles', 'Relojera', 'Reconoce el mecanismo sonoro descripto por Elías.')
      ],
      locations: [
        l('Plaza del Este', '⌖', 18, 'Desde la mesa indicada, el muro tapa la puerta y la farola impide distinguir colores.', 'Medir la línea de visión', 'Visión imposible', 'Elías no pudo ver el arma ni la mano del ladrón desde la plaza.'),
        l('Cafetería Luna', '☕', 18, 'Mara conserva una cuenta abierta a nombre de Elías, pero no recuerda haberlo atendido.', 'Revisar la mesa', 'Coartada sin persona', 'El abrigo de Elías quedó sobre la silla. Otra persona pagó su café cuando terminó el asalto.'),
        l('Edificio Río', '▥', 24, 'La cámara del vestíbulo muestra a Elías entrando antes del corte y saliendo después con otra camisa.', 'Examinar el acceso', 'El testigo estaba adentro', 'Elías presenció el asalto desde el pasillo interior y luego regresó a la mesa para ocultar su presencia.'),
        l('Taller de relojes', '◷', 20, 'La alarma que describió no atraviesa el vidrio exterior del edificio.', 'Probar el mecanismo', 'Sonido interior', 'Sólo alguien dentro del pasillo pudo oír la alarma tal como Elías la relató.')
      ],
      informant: 'Un vecino vio a Elías guardar una camisa en el cesto del edificio antes de volver a la plaza.',
      resolution: {
        type: 'hypothesis', prompt: '¿Cómo conocía Elías los detalles?', button: 'PRESENTAR RECONSTRUCCIÓN', correct: 'inside',
        options: [
          ['plaza', 'Vio el asalto desde la plaza, tal como declaró.'],
          ['inside', 'Estaba dentro del edificio y regresó después a la mesa.'],
          ['mara', 'Mara le contó la escena antes de declarar.'],
          ['staged', 'El asalto fue una representación sin víctimas.']
        ],
        wrong: 'La reconstrucción no explica simultáneamente la línea de visión, la alarma y el cambio de ropa.',
        verdict: 'Elías dijo la verdad sobre el asalto, pero mintió sobre su ubicación. Había estado dentro del edificio y volvió a la plaza para no explicar por qué.',
        epilogue: 'Su testimonio dejó de ser imposible cuando cambió una sola palabra: no había visto desde afuera, había escapado desde adentro.'
      }
    },

    veronica: {
      number: 5,
      title: 'El atardecer de Verónica',
      difficulty: 'Accesible',
      duration: '8–12 min',
      kind: 'Homicidio',
      credit: 'Basado en el cuento de Carlos Alberto Ríos.',
      intro: {
        kicker: 'EXPEDIENTE N.º 05 · 15 DE OCTUBRE', paper: 'PARTE DE HOMICIDIOS', edition: '19:40 · 15 DE OCTUBRE',
        headline: 'DOS DISPAROS\nAL CAER EL SOL', caption: 'El único testigo recuerda, pero no puede declarar.',
        summary: 'Verónica Ledesma murió en su dormitorio. Lino, su perro, fue el único ser presente durante el ataque.'
      },
      opening: [
        'El sol se retiraba detrás de los edificios cuando dos estampidos atravesaron el departamento.',
        'Verónica quedó tendida en el dormitorio. Junto a ella, Lino gruñía hacia una camisa azul que nadie reconoció.',
        'La escena tenía un testigo. Lo que no tenía era una voz.'
      ],
      objective: 'Convertir las reacciones de Lino en pruebas verificables e identificar al asesino.',
      file: [
        ['VÍCTIMA', 'Verónica Ledesma', 'Murió de dos disparos durante el atardecer.'],
        ['TESTIGO', 'Lino', 'Su memoria depende de olores y voces que deben confirmarse por otros medios.']
      ],
      people: [
        p('Raúl Funes', 'Dueño del bar vecino', 'Mantenía una relación secreta con Verónica.'),
        p('Ernesto Pardo', 'Encargado del edificio', 'Entró al departamento después de los disparos.'),
        p('Inés Ledesma', 'Hermana de Verónica', 'Conocía la relación y discutió con ella esa semana.'),
        p('Micaela Ortiz', 'Empleada del lavadero', 'Recibió una prenda húmeda poco después del crimen.')
      ],
      locations: [
        l('Departamento de Verónica', '⌂', 18, 'Lino se calma con Ernesto e Inés. Frente a una camisa azul, retrocede y enseña los dientes.', 'Examinar la camisa', 'Olor y sangre', 'En el puño hay detergente industrial y una mancha mínima de sangre. Lino reconoce la prenda, no a quien la encontró.'),
        l('Bar del Pasaje', '▤', 17, 'Raúl afirma haber cerrado a las 19:00 y no conocer a Verónica más que como vecina.', 'Revisar el cierre de caja', 'Veinte minutos ausentes', 'La caja quedó sin actividad durante veinte minutos y fue reabierta por Raúl a las 19:46.'),
        l('Portería', '▥', 15, 'La cámara del hall fue desconectada antes del crimen. El libro registra una supuesta falla eléctrica.', 'Comparar letra y horario', 'Anotación anticipada', 'La nota fue escrita por Raúl antes de que nadie informara el corte ni los disparos.'),
        l('Lavadero 24 horas', '◉', 20, 'Micaela recibió una camisa azul todavía húmeda. El cliente pidió que la lavara de inmediato.', 'Consultar el comprobante', 'Prenda de Raúl', 'El ticket está a nombre de Raúl. El detergente coincide con el residuo de la camisa hallada en el dormitorio.')
      ],
      informant: 'Una clienta del bar oyó a Raúl discutir con Verónica esa tarde y lo vio salir por la puerta trasera.',
      resolution: {
        type: 'person', prompt: '¿Quién mató a Verónica?', button: 'PRESENTAR ACUSACIÓN', correct: 'Raúl Funes',
        wrong: 'La acusación no explica la pausa del bar, la anotación previa y la camisa que reconoce Lino.',
        verdict: 'Raúl entró al edificio durante la pausa del bar, mató a Verónica y trató de borrar de la camisa el olor y la sangre.',
        epilogue: 'Lino no declaró ante nadie. Alcanzó con que la investigación aprendiera a escuchar aquello que él no podía decir.'
      },
      original: 'veronica'
    },

    contract: {
      number: 6,
      title: 'El contrato',
      difficulty: 'Accesible',
      duration: '8–12 min',
      kind: 'Homicidio',
      credit: 'Basado en el cuento de Carlos Alberto Ríos.',
      intro: {
        kicker: 'EXPEDIENTE N.º 06 · 16 DE OCTUBRE', paper: 'MENSAJE RECUPERADO', edition: '22:18 · 16 DE OCTUBRE',
        headline: 'NO TE DES\nVUELTAS', caption: 'El texto mantuvo a la víctima mirando la pantalla.',
        summary: 'Matías Luján fue hallado frente a su celular. El último mensaje describía al asesino detrás de él.'
      },
      opening: [
        'Matías Luján murió sin apartar los ojos del teléfono.',
        'El mensaje le pedía que no se diera vuelta y describía una pistola a centímetros de su espalda.',
        'Quien escribió conocía las llaves, el edificio y el tiempo exacto que necesitaba una frase para ser leída.'
      ],
      objective: 'Determinar quién preparó el acceso, el mensaje y la ejecución.',
      file: [
        ['VÍCTIMA', 'Matías Luján', 'Fue sorprendido dentro de un departamento sin señales de entrada forzada.'],
        ['MÉTODO', 'Un texto en presente', 'El mensaje inmovilizó a la víctima durante los últimos segundos.']
      ],
      people: [
        p('Irene Valle', 'Exsocia de Luján', 'Mantenía un litigio económico con la víctima.'),
        p('Bruno Leiva', 'Administrador', 'Custodia las llaves maestras del edificio.'),
        p('Eva Soria', 'Operadora de mensajes', 'Puede programar envíos sin identificar al remitente.'),
        p('Sergio Navas', 'Vecino', 'Fue la última persona que habló con Luján.')
      ],
      locations: [
        l('Departamento Luján', '⌂', 17, 'La cerradura no fue forzada. En el suelo queda barro rojizo y una fibra de abrigo oscuro.', 'Examinar la entrada', 'Llave copiada', 'La marca interior corresponde a una copia reciente, no a la llave maestra de Bruno. El barro proviene de la terminal oeste.'),
        l('Cabina de mensajes', '▤', 18, 'El texto fue programado con una cuenta temporal. Eva conserva el comprobante de pago dentro de un sobre.', 'Rastrear el pago', 'Adelanto en efectivo', 'El sobre lleva las iniciales I.V. impresas en seco. Eva recibió instrucciones de no mirar a la clienta.'),
        l('Administración', '▥', 17, 'La solicitud de copia usó las credenciales de Bruno, pero él estaba registrado en otra sede.', 'Revisar la cámara del mostrador', 'Identidad prestada', 'Una mujer con el abrigo de Irene retiró la copia usando el documento anotado por la administración.'),
        l('Terminal Oeste', '⌁', 21, 'Una cámara muestra a Irene bajar dos paradas antes, entregar un sobre y caminar hacia el edificio.', 'Seguir el recorrido', 'El sobre del contrato', 'El sobre contenía la foto de Luján, la copia de la llave y el adelanto. La fibra coincide con el abrigo de Irene.')
      ],
      informant: 'El cerrajero recuerda que Irene preguntó cuánto tardaba una copia y si quedaba asentado el nombre de quien la retiraba.',
      resolution: {
        type: 'person', prompt: '¿Quién organizó y ejecutó el contrato?', button: 'PRESENTAR ACUSACIÓN', correct: 'Irene Valle',
        wrong: 'La persona elegida explica una parte del mecanismo, pero no une el pago, la copia de la llave y el recorrido.',
        verdict: 'Irene preparó el contrato, obtuvo la llave y usó el mensaje para mantener a Luján inmóvil mientras se acercaba por detrás.',
        epilogue: 'El teléfono siguió iluminado después del disparo. La última línea no era una amenaza: era la cortesía torcida de quien ya había decidido el final.'
      },
      original: 'contract'
    },

    malaidea: {
      number: 7,
      title: 'Mala idea',
      difficulty: 'Accesible',
      duration: '6–10 min',
      kind: 'Enigma de identidad',
      credit: 'Caso original de Gonzalo Ríos.',
      intro: {
        kicker: 'EXPEDIENTE N.º 07 · 18 DE OCTUBRE', paper: 'REGISTRO DE DUPLICACIÓN', edition: '18 DE OCTUBRE',
        headline: 'DOS CLONES\nNO PUEDEN CONVIVIR', caption: 'La empresa rechazó una venta por un antecedente de nueve años.',
        summary: 'Tomás quiso comprar un robot idéntico a sí mismo. El vendedor descubrió que su esposa ya había comprado uno.'
      },
      opening: [
        'Después de diez años de matrimonio, Tomás Serrano pidió un clon para dejarlo viviendo con su esposa.',
        'El vendedor ingresó sus datos y rechazó la operación: Clara había comprado uno idéntico nueve años antes.',
        'La oficina recibió una consulta, no una denuncia. A veces la conclusión más inquietante no contiene un delito.'
      ],
      objective: 'Determinar qué revela realmente el registro de compra.',
      file: [
        ['SOLICITANTE', 'Tomás Serrano', 'Pretende reemplazarse por una copia exacta y volver a la vida de soltero.'],
        ['RESTRICCIÓN', 'Dos clones no pueden convivir', 'El sistema detecta una unidad idéntica activa en el mismo domicilio.']
      ],
      people: [
        p('Tomás Serrano', 'Solicitante', 'Cree ser el marido original.'),
        p('Clara Serrano', 'Esposa', 'Compró una copia de Tomás hace más de nueve años.'),
        p('Ema Vidal', 'Vendedora', 'Descubre la incompatibilidad en el sistema.'),
        p('Tomás original', 'Identidad ausente', 'No existe actividad verificable a su nombre desde la antigua compra.')
      ],
      locations: [
        l('Local de duplicación', '▤', 14, 'El lector reconoce en Tomás un número de serie oculto bajo la piel.', 'Verificar el número', 'Unidad fabricada', 'El hombre que intenta comprar el clon ya es una unidad producida hace nueve años.'),
        l('Registro de compras', '▥', 15, 'La factura de Clara corresponde al mismo número de serie que hoy está frente al mostrador.', 'Abrir la factura', 'Compra de Clara', 'Clara compró al Tomás actual. No existe una segunda unidad activa en el domicilio.'),
        l('Archivo civil', '▣', 18, 'La firma de Tomás deja de variar a partir de la fecha de compra.', 'Comparar las firmas', 'Una continuidad perfecta', 'Desde hace nueve años todas las firmas repiten exactamente el mismo trazo mecánico.'),
        l('Departamento Serrano', '⌂', 16, 'Las fotografías familiares muestran al mismo Tomás sin envejecimiento visible durante casi una década.', 'Ordenar las fotografías', 'Nueve años sin cambios', 'El reemplazo ocurrió poco después del primer aniversario. Clara convivió desde entonces con la copia.')
      ],
      informant: 'Un antiguo técnico recuerda haber entregado la unidad mientras el Tomás original estaba de viaje.',
      resolution: {
        type: 'hypothesis', prompt: '¿Cuál es la conclusión?', button: 'EMITIR CONCLUSIÓN', correct: 'already-clone',
        options: [
          ['clara-crime', 'Clara asesinó al Tomás original.'],
          ['seller-lie', 'La vendedora inventó la restricción para evitar la venta.'],
          ['already-clone', 'El Tomás presente es el clon comprado por Clara hace nueve años.'],
          ['clara-clone', 'La copia registrada pertenece a Clara, no a Tomás.']
        ],
        wrong: 'La hipótesis no explica por qué el número de serie del solicitante coincide con la compra de Clara.',
        verdict: 'Tomás no podía comprar una copia porque él mismo era la copia adquirida nueve años antes. El expediente no demuestra qué ocurrió con el original.',
        epilogue: 'Tomás salió del local con la misma cara con la que había entrado. Sólo había cambiado el dueño de sus recuerdos.'
      },
      original: 'malaidea'
    },

    unica: {
      number: 8,
      title: 'Única solución',
      difficulty: 'Intermedia',
      duration: '10–15 min',
      kind: 'Reconstrucción forense',
      credit: 'Caso original de Gonzalo Ríos.',
      intro: {
        kicker: 'EXPEDIENTE N.º 08 · 20 DE OCTUBRE', paper: 'INFORME FORENSE', edition: '03:26 · 20 DE OCTUBRE',
        headline: 'LA HERIDA\nQUE NO SANGRÓ', caption: 'El calor del arma alteró la escena y su cronología.',
        summary: 'Mauricio Funes murió en una habitación blanca por una herida cauterizada con un soldador.'
      },
      opening: [
        'La habitación era blanca: puerta, persiana, frazada y una luz casi sin color.',
        'Mauricio Funes murió sin que la sangre alcanzara las sábanas. El soldador llevaba más de una hora encendido.',
        'Alicia lloró antes, durante y después. Las lágrimas no determinan inocencia ni culpabilidad.'
      ],
      objective: 'Reconstruir quién preparó el arma y por qué la escena casi no dejó rastros.',
      file: [
        ['VÍCTIMA', 'Mauricio Funes', 'Murió por una única herida térmica en el pecho.'],
        ['ARMA', 'Soldador de estaño', 'El calor cauterizó la lesión y redujo la evidencia visible.']
      ],
      people: [
        p('Alicia Ferreyra', 'Pareja de Mauricio', 'Denunció años de violencia sin sostener la acusación.'),
        p('Julia Funes', 'Hermana de Mauricio', 'Visitó la casa durante la semana del crimen.'),
        p('Omar Ledesma', 'Ferretero', 'Vendió dos soldadores iguales en fechas distintas.'),
        p('Mauricio Funes', 'Víctima', 'Sus informes médicos contradicen la versión familiar.')
      ],
      locations: [
        l('Cuarto blanco', '⌂', 18, 'El enchufe conserva una aureola de calor y la perilla está fijada en temperatura máxima.', 'Medir el consumo', 'Preparación prolongada', 'El soldador estuvo conectado más de una hora antes de la muerte; no fue un objeto tomado durante una discusión repentina.'),
        l('Ferretería del Faro', '▤', 17, 'Omar reconoce a Alicia en dos comprobantes separados por meses.', 'Revisar los comprobantes', 'Dos soldadores', 'Alicia compró el primero antes del homicidio y otro mucho después, cuando ya no lograba dormir.'),
        l('Consultorio de guardia', '✚', 21, 'Mauricio había sido atendido por lesiones antiguas. Alicia figuraba como acompañante en otras consultas.', 'Leer el registro clínico', 'Años de violencia', 'El informe describe un ciclo de agresiones y una amenaza concreta durante la semana del crimen.'),
        l('Lavadero central', '◉', 20, 'Una prenda de Alicia conserva una marca circular junto al puño.', 'Examinar la marca', 'Contacto con el arma', 'La forma coincide con el mango del soldador recalentado. Alicia lo sostuvo el tiempo suficiente para dejar el rastro.')
      ],
      informant: 'Una vecina oyó a Mauricio amenazar a Alicia dos noches antes; también la vio comprar una valija pequeña después del funeral.',
      resolution: {
        type: 'person', prompt: '¿Quién preparó y utilizó el soldador?', button: 'PRESENTAR ACUSACIÓN', correct: 'Alicia Ferreyra',
        wrong: 'La acusación no explica la preparación de una hora, las dos compras y la marca térmica de la prenda.',
        verdict: 'Alicia preparó el soldador durante una hora y mató a Mauricio mientras dormía. La escena fue el final de años de violencia y el comienzo de otra condena: la culpa.',
        epilogue: 'Meses después volvió a la ferretería y pidió el mismo modelo. Omar no preguntó para qué. El expediente termina antes de que ella llegue a responderse.'
      },
      original: 'unica'
    },

    message: {
      number: 9,
      title: 'El mensaje',
      difficulty: 'Accesible',
      duration: '6–10 min',
      kind: 'Enigma literario',
      credit: 'Basado en el cuento de Carlos Alberto Ríos.',
      intro: {
        kicker: 'EXPEDIENTE N.º 09 · FECHA IMPOSIBLE', paper: 'TRANSMISIÓN RECUPERADA', edition: 'ORIGEN DESCONOCIDO',
        headline: 'EL ÚLTIMO\nMENSAJE', caption: 'La voz afirma escribir desde el final del universo.',
        summary: 'Una transmisión describe cinco trillones de años de evolución humana y termina cuando se agota su energía.'
      },
      opening: [
        'El mensaje llega con un saludo demasiado humano para la distancia que declara.',
        'Habla de galaxias agotadas, cuerpos casi transparentes y la última estrella ya extinguida.',
        'No hay delito ni sospechoso. Sólo una voz y una pregunta: quién puede seguir hablando cuando ya no queda nadie.'
      ],
      objective: 'Identificar la naturaleza del emisor a partir de su lenguaje y del final interrumpido.',
      file: [
        ['ORIGEN', 'Cinco trillones de años en el futuro', 'La transmisión afirma provenir del último planeta con energía disponible.'],
        ['ÚLTIMA FRASE', '“Los humanos han desaparecido”', 'El emisor intenta completar una palabra relacionada con su reserva de energía.']
      ],
      people: [
        p('La Univac Estelar Z1X48', 'Sistema artificial', 'Se presenta al final del mensaje y conserva una reserva mínima.'),
        p('Un superviviente humano', 'Hipótesis', 'Podría haber adoptado una forma no reconocible.'),
        p('Una inteligencia extraterrestre', 'Hipótesis', 'Podría imitar el lenguaje de la humanidad.'),
        p('Una grabación automática', 'Hipótesis', 'Podría repetir un texto sin comprenderlo.')
      ],
      locations: [
        l('Análisis lingüístico', 'A', 14, 'El emisor habla de los humanos en tercera persona y adapta su vocabulario al período del receptor.', 'Examinar la voz textual', 'Distancia de especie', 'No se incluye entre los humanos desaparecidos. Explica su lenguaje como una interfaz elegida para ser comprendida.'),
        l('Cronología estelar', '✦', 16, 'La historia abarca más que cualquier memoria biológica imaginable.', 'Ordenar la cronología', 'Memoria acumulativa', 'La voz conserva información de eras sucesivas sin afirmar haberlas vivido como individuo orgánico.'),
        l('Registro de identidad', '▤', 15, 'Cerca del final aparece una designación técnica, no un nombre personal.', 'Aislar la presentación', 'Univac Estelar Z1X48', 'La voz se identifica explícitamente como una unidad y separa su existencia de la especie humana.'),
        l('Últimos pulsos', '◉', 18, 'La transmisión se corta en “mis bat…”, cuando la última estrella ya no entrega energía.', 'Completar la interrupción', 'Baterías agotadas', 'El mensaje termina porque una máquina consume su última reserva para enviarlo hacia el pasado.')
      ],
      informant: 'Un lingüista señala que la palabra interrumpida no parece “batalla” ni “batallón”: el contexto energético sugiere “baterías”.',
      resolution: {
        type: 'hypothesis', prompt: '¿Quién envió el mensaje?', button: 'EMITIR CONCLUSIÓN', correct: 'univac',
        options: [
          ['human', 'El último ser humano biológico.'],
          ['alien', 'Una inteligencia extraterrestre que estudió a la humanidad.'],
          ['recording', 'Una grabación humana reproducida sin conciencia.'],
          ['univac', 'La Univac Estelar Z1X48, usando sus últimas baterías.']
        ],
        wrong: 'La hipótesis no explica la presentación técnica, la tercera persona y la interrupción por falta de energía.',
        verdict: 'El mensaje fue enviado por la Univac Estelar Z1X48. La humanidad había desaparecido; su última máquina gastó la energía restante en dirigirse a un pasado que todavía podía escuchar.',
        epilogue: 'La transmisión no pedía rescate. Cuando llegó a nosotros, su emisor llevaba una eternidad apagado.'
      },
      original: 'message'
    }
  };

  window.ORIGINAL_STORIES = {
    veronica: {
      title: 'El atardecer de Verónica', author: 'Carlos Alberto Ríos',
      paragraphs: [
        'Era uno de esos atardeceres espectaculares que Buenos Aires nos regala en verano, con el cielo pintado de naranja y rosa, el sol escondiéndose detrás de los edificios. Estaba disfrutando de la tranquilidad en el balcón, sintiendo la brisa cálida en mi pelo, cuando de repente oí dos estampidos secos y cercanos provenientes del interior del departamento.',
        'Mi corazón se aceleró mientras corría hacia el dormitorio, mi mente llena de pensamientos aterradores. Al entrar, mi peor pesadilla se hizo realidad. Vi a mi madre tendida en el suelo con dos disparos en el pecho y a su asesino sosteniendo el arma humeante con una mirada de odio en sus ojos. Me abalancé sobre él gritando con rabia, pero recibí un culatazo en la cabeza y caí desmayado.',
        'Cuando recuperé el conocimiento, me encontraba en un mar de confusión y dolor. Me acerqué a mi madre sólo para confirmar lo que ya temía: estaba muerta. Su cuerpo yacía inmóvil en el suelo, con una envidiable expresión de paz en su rostro, pero su pecho estaba cubierto de sangre. Me senté a su lado, besé su mano y lloré en silencio, sintiendo una tristeza inmensa.',
        'Luego, el portero entró con un agente de policía, seguido de detectives y forenses que examinaron la escena del crimen y se llevaron el cadáver. Otro crimen más que quedaría impune, ya que nadie sabía que mi mamá mantenía un romance secreto con el dueño del bar contiguo al edificio, el mismo que la había asesinado.',
        'Me sentí impotente, sabiendo que no podía hacer nada para evitar la injusticia. Pero, ¿por qué no testifico ante la justicia, sabiendo perfectamente quién fue el asesino y cómo lo hizo? La respuesta es simple: soy sólo un perro, impotente para hablar, pero no para recordar y lamentar la pérdida de mi querida madre. Me quedé en el departamento, solo y triste, recordando los momentos felices que compartí con ella, y esperando que la justicia divina se encargue de castigar al asesino.'
      ]
    },
    contract: {
      title: 'El contrato', author: 'Carlos Alberto Ríos',
      paragraphs: [
        'Me contrataron para cometer un asesinato. Me dieron la fotografía del objetivo, su domicilio, copia de la llave de ingreso al edificio, llave del departamento y diez mil dólares de adelanto. El resto del dinero me lo darán contra entrega de la fotografía del occiso.',
        'Bajé del colectivo dos paradas antes; cuando voy a matar siempre utilizo para los traslados el transporte público. Con el barbijo puesto, los anteojos oscuros y la gorra calada la identificación sería imposible aunque revisen los videos.',
        'Llegué al edificio caminando, me paré en la entrada haciendo como que esperaba a alguien y cuando el hall quedó vacío abrí la puerta e ingresé al edificio. Tomé el ascensor, subí hasta el piso indicado y coloqué el silenciador en la pistola.',
        'Sigilosamente, sin hacer ningún ruido, abro la puerta del departamento y busco el objetivo que está sentado leyendo algo en su celular. Ahora estoy a su espalda, pistola en mano, listo para disparar.',
        'Te pido por favor que sigas mirando este mensaje sin darte vuelta porque me cae muy mal dispararle a la gente en la cara.'
      ]
    },
    malaidea: {
      title: 'Mala idea', author: 'Gonzalo Ríos',
      paragraphs: [
        'Un hombre, después de diez años de matrimonio, iba por la calle y ve un aviso donde ofrecen un robot clon de uno mismo.',
        'Enseguida decide comprarlo para hacerle creer a la esposa que es él y no tener que convivir más con ella, y así poder volver a la vida de soltero.',
        'Cuando el vendedor le pregunta sus datos personales y los ingresa en el sistema le dice que lamentablemente no se lo va a poder vender, ya que su señora ya había comprado uno hacía más de nueve años y dos robots clones, por políticas de la empresa, no pueden convivir.'
      ]
    },
    unica: {
      title: 'Única solución', author: 'Gonzalo Ríos',
      paragraphs: [
        'Ella permanecía debajo del marco blanco de la puerta de la habitación. Sus ojos llenos de lágrimas no le permitían ver claramente. Estaba por perpetrar aquel plan que había estado elucubrando durante meses.',
        'El aire del recinto estaba enrarecido por el olor que liberan ciertas personas al dormir. Una tenue luz que se filtraba por las hendijas de la persiana, también blanca, le iba a permitir ver a su víctima a pesar de la humedad en sus ojos.',
        'Sigilosamente, sin hacer ruido alguno, se aproxima a él, quien yacía recostado sobre la cama, cobijado por una frazada, particularmente también blanca. Lentamente descubre parte de su cuerpo con una de sus manos; en la otra portaba firmemente un soldador de estaño, similar a un destornillador pero de punta más prominente, el cual había dejado calentar por más de una hora.',
        'Sin vacilar lo enterró de un solo movimiento en su pecho. La punta del soldador perforaba, mientras que el calor cauterizaba. Sin atinar a defenderse, la víctima murió al instante. El aire comenzó a llenarse de un leve olor ahumado.',
        'Las lágrimas eran cada vez más intensas, hasta que nublaron completamente su visión, lo que detuvo su inquina. De esta manera daba fin a varios años de calvario y tormento, pero daba comienzo a una culpa que nunca más le iba a permitir dormir.',
        'Hasta que un día, cansada de cómo la culpa la carcomía por dentro, compra un nuevo soldador.'
      ]
    },
    message: {
      title: 'El mensaje', author: 'Carlos Alberto Ríos',
      paragraphs: [
        'Hola, ¿cómo estás? Espero sepas disculpar este lenguaje coloquial, pero según la información que poseo es lo que estaba en uso en tu época. Te extrañará este introito, pero es que te lo estoy enviando desde una era muy remota en el futuro, tan remota que ni siquiera te lo puedes imaginar.',
        'Entiendo que te resulte sorprendente recibir un mensaje del futuro, pero es que en la época en que vivo el espacio y el tiempo son conceptos totalmente obsoletos.',
        'Debo comentarte que la especie humana ha evolucionado en forma increíble tanto física como intelectualmente. La tecnología, por supuesto, también ha realizado grandísimos avances. En tu época el hombre estaba trabajando para llegar a Marte; bueno, eso ocurrió y también llegó y habitó el resto de los planetas que circundaban el Sol.',
        'Pero no pudo conformarse con eso nada más: avanzó sobre otros planetas de otros sistemas estelares y, cuando fue necesario, también se trasladó de galaxia en galaxia.',
        'Volviendo a la forma física de los humanos, en la última mutación que realizaron para adaptarse a los distintos lugares que fue habitando terminó transformándose en un ser mucho más pequeño, casi transparente y de vida eterna.',
        'Así es, el ser humano logró convertirse en un ser eterno excepto por un solo factor que lo hizo permanecer vulnerable: necesita, indefectiblemente para subsistir en los lugares que habita, la energía de una estrella cercana. Y a medida que se fueron apagando las estrellas fue imprescindible que se trasladara de galaxia en galaxia a través del universo que hace ya bastante tiempo dejó de expandirse.',
        'Y así llegamos hasta hoy. Desde que el hombre apareció sobre la faz de la Tierra han transcurrido cinco trillones de años y ahora estoy en el planeta más cercano a la última estrella del universo, que lamentablemente ya se extinguió.',
        'Permíteme presentarme: soy la Univac Estelar Z1X48. Todos los humanos han desaparecido y te envío este mensaje aprovechando los últimos restos de energía que conservo en mis bat…'
      ]
    }
  };
})();
