const fs = require('fs');

const newKeys = {
  en: {
    "photo.col_photo": "Session Photo",
    "trajectory.hover_prompt": "Hover, tap, or use arrow keys on points along the curve to inspect projected clearance milestones and timeline.",
    "trajectory.tooltip_session": "Session {session}",
    "trajectory.tooltip_clearance": "{pct}% Pigment Clearance ({remaining}% Remaining)",
    "trajectory.tooltip_timeline": "Projected: Week {week} (~{months} months elapsed)",
    "trajectory.tooltip_status": "Status: {status}",
    "trajectory.status_baseline": "Baseline (100% Pigment Present)",
    "trajectory.status_initial": "Superficial Ink Fragmentation Phase",
    "trajectory.status_intermediate": "Active Macrophage Phagocytosis & Lymphatic Transport",
    "trajectory.status_coverup": "Cover-Up Feasible Window (50% to 70% Lightened)",
    "trajectory.status_advanced": "Recalcitrant Deep Pigment Clearance",
    "trajectory.status_clearance": "Clinical Clearance Target (95%+ Lightening)",
    "trajectory.actual_observed": "Your Logged Progress: Session {sess} ({pct}% Faded)",
    "trajectory.score_note": "Kirby-Desai Score: {score} pts | Target Range: {min} to {max} sessions",
    "faq.title": "Frequently Asked Clinical Questions",
    "faq.subtitle": "Evidence-based answers regarding laser tattoo removal mechanics, preparation, and plateaus.",
    "faq.expand_all": "Expand All",
    "faq.collapse_all": "Collapse All",
    "faq.q1_title": "What happens if laser tattoo removal stops working or hits a fading plateau?",
    "faq.q1_body": "A fading plateau commonly occurs when easily fragmented superficial ink has been cleared, leaving deeper, larger, or recalcitrant pigment clusters. When fading stalls, practitioners typically re-evaluate laser settings: switching pulse duration (from nanosecond Q-switched to picosecond lasers), adjusting wavelength for residual colors, increasing fluence while optimizing spot size, or extending intervals to 12 to 16 weeks to allow macrophages more time to process shattered pigment without causing skin fatigue.",
    "faq.q2_title": "How should I prepare my skin before a laser tattoo removal session?",
    "faq.q2_body": "Optimal preparation protects your skin from adverse pigment changes. Avoid all sun exposure, tanning beds, and self-tanners for at least 4 to 6 weeks prior to treatment, as excess epidermal melanin competes for laser energy and increases hypopigmentation risks. Shave the treatment area 24 hours prior to prevent singed surface hair. Ensure skin is completely clean and free of cosmetics, moisturizers, deodorants, or self-applied numbing creams unless specifically applied under clinical direction. Stay well hydrated and avoid alcohol or aspirin 24 hours before treatment.",
    "faq.q3_title": "Why do multi-colored inks (green, blue, yellow) require different lasers than black?",
    "faq.q3_body": "Laser tattoo removal operates on selective photothermolysis: a wavelength is only effective if the target pigment absorbs it. Carbon black ink absorbs almost all wavelengths and responds reliably to standard 1064 nm Nd:YAG. However, red pigment strongly absorbs green light (532 nm), while blue, green, and purple pigments require 755 nm Alexandrite or 694 nm Ruby lasers. Yellow is notoriously recalcitrant because it poorly absorbs light within the safe skin transmission window, often requiring specialized picosecond 532 nm handpieces.",
    "faq.q4_title": "Can white ink or cosmetic tattoo pigment turn black when lasered?",
    "faq.q4_body": "Yes. This phenomenon is known clinically as paradoxical darkening. White ink, flesh tones, and many cosmetic pigments contain titanium dioxide (TiO2) or ferric iron oxide (Fe2O3). Upon laser exposure, high-peak energy reduces titanium and iron oxides into lower oxidation states, instantly turning white, pink, or skin-toned pigment into permanent dark grey or black. A qualified practitioner must always perform a discrete test spot on cosmetic or white ink before proceeding.",
    "faq.q5_title": "How much does smoking tobacco affect the number of sessions required?",
    "faq.q5_body": "In published clinical studies (such as Kirby et al. and Bencini et al.), smoking was shown to decrease the 10-session clearance rate by approximately 70%. Nicotine causes chronic cutaneous vasoconstriction, which sharply impairs peripheral microcirculation. Because ink removal depends entirely on immune macrophages transporting shattered ink particles through the bloodstream and lymphatic vessels, reduced blood flow significantly prolongs required clearance times.",
    "faq.q6_title": "When is a tattoo faded enough for a cover-up instead of complete clearance?",
    "faq.q6_body": "A cover-up generally requires only 50% to 70% fading rather than 95%+ complete clearance. This reduces the required sessions by roughly 35% to 45%. You should collaborate with your tattoo artist when you reach the cover-up window: once dark solid outlines have lightened to a soft grey, the artist can place richer, vibrant colors or detailed designs without the old design showing through. Wait 8 to 12 weeks after your last laser session before tattooing to ensure dermal healing is complete.",
    "faq.q7_title": "How does my Fitzpatrick skin type influence laser safety and treatment speed?",
    "faq.q7_body": "Fitzpatrick skin types I to III have lower epidermal melanin, allowing higher laser fluences with minimal risk of dyspigmentation. Skin types IV to VI contain abundant natural melanin, which competes with tattoo pigment for laser absorption. For darker skin types, practitioners use conservative settings, longer wavelengths (1064 nm Nd:YAG), and larger spot sizes to bypass epidermal melanin and target dermal ink safely, preventing post-inflammatory hypopigmentation (loss of skin color) or hyperpigmentation."
  },
  fr: {
    "photo.col_photo": "Photo de séance",
    "trajectory.hover_prompt": "Survolez, touchez ou utilisez les flèches sur les points de la courbe pour examiner les étapes de décoloration et le calendrier prévisionnel.",
    "trajectory.tooltip_session": "Séance {session}",
    "trajectory.tooltip_clearance": "{pct} % d'élimination du pigment ({remaining} % résiduel)",
    "trajectory.tooltip_timeline": "Prévision : Semaine {week} (~{months} mois écoulés)",
    "trajectory.tooltip_status": "Statut : {status}",
    "trajectory.status_baseline": "Point de départ (100 % de pigment présent)",
    "trajectory.status_initial": "Phase de fragmentation superficielle de l'encre",
    "trajectory.status_intermediate": "Phagocytose macrophagique active et transport lymphatique",
    "trajectory.status_coverup": "Fenêtre propice au recouvrement (50 % à 70 % d'éclaircissement)",
    "trajectory.status_advanced": "Élimination des pigments profonds récalcitrants",
    "trajectory.status_clearance": "Objectif d'élimination clinique (95 % et plus d'éclaircissement)",
    "trajectory.actual_observed": "Votre progression enregistrée : Séance {sess} ({pct} % éclairci)",
    "trajectory.score_note": "Score Kirby-Desai : {score} pts | Fourchette cible : {min} à {max} séances",
    "faq.title": "Questions cliniques fréquentes",
    "faq.subtitle": "Réponses fondées sur des preuves cliniques concernant le fonctionnement du détatouage, la préparation et les plateaux.",
    "faq.expand_all": "Tout développer",
    "faq.collapse_all": "Tout réduire",
    "faq.q1_title": "Que se passe-t-il si le détatouage laser semble stagner ou atteint un plateau d'éclaircissement ?",
    "faq.q1_body": "Un plateau d'éclaircissement survient fréquemment lorsque l'encre superficielle facilement fragmentable a été éliminée, ne laissant que des agrégats pigmentaires plus profonds ou plus denses. Face à une stagnation, le praticien réévalue généralement les paramètres : passage d'un laser nanoseconde déclenché à un laser picoseconde, ajustement de la longueur d'onde pour les teintes résiduelles, augmentation de la fluence avec un spot adapté, ou espacement des séances à 12 ou 16 semaines pour laisser aux macrophages le temps de digérer les débris d'encre.",
    "faq.q2_title": "Comment préparer ma peau avant une séance de détatouage laser ?",
    "faq.q2_body": "Une préparation rigoureuse prévient les troubles pigmentaires indésirables. Évitez toute exposition solaire, cabine UV ou autobronzant pendant au moins 4 à 6 semaines avant la séance, car la mélanine épidermique concurrence l'absorption de l'énergie laser et augmente le risque d'hypopigmentation. Rasez la zone 24 heures à l'avance pour éviter de brûler les poils superficiels. La peau doit être propre et exempte de maquillage, crème hydratante ou anesthésiant non prescrit. Hydratez-vous bien et évitez l'alcool ou l'aspirine dans les 24 heures précédant le rendez-vous.",
    "faq.q3_title": "Pourquoi les encres de couleur (vert, bleu, jaune) nécessitent-elles des lasers différents du noir ?",
    "faq.q3_body": "Le détatouage laser repose sur le principe de photothermolyse sélective : une longueur d'onde n'est efficace que si le pigment ciblé l'absorbe. L'encre noire à base de carbone absorbe presque tout le spectre et réagit très bien au laser Nd:YAG 1064 nm. En revanche, le rouge absorbe le rayonnement vert à 532 nm, tandis que le bleu, le vert et le violet nécessitent des lasers Alexandrite 755 nm ou Rubis 694 nm. Le jaune est particulièrement réfractaire et demande souvent des têtes picosecondes spécifiques à 532 nm.",
    "faq.q4_title": "L'encre blanche ou les pigments de maquillage permanent peuvent-ils noircir sous l'effet du laser ?",
    "faq.q4_body": "Oui. Ce phénomène est connu cliniquement sous le nom de noircissement paradoxal. L'encre blanche, les teintes chair et de nombreux pigments de dermopigmentation contiennent du dioxyde de titane (TiO2) ou de l'oxyde de fer (Fe2O3). Sous l'impact du faisceau laser à haute énergie crête, ces oxydes sont réduits en formes chimiques inférieures, virant instantanément du blanc ou du rose au gris ardoise ou au noir profond. Un praticien qualifié doit impérativement réaliser une touche d'essai préalable.",
    "faq.q5_title": "Dans quelle mesure le tabagisme influence-t-il le nombre de séances nécessaires ?",
    "faq.q5_body": "Dans les études cliniques de référence (notamment Kirby et al. et Bencini et al.), le tabagisme a réduit le taux de disparition complète à 10 séances d'environ 70 %. La nicotine provoque une vasoconstriction cutanée chronique qui altère la microcirculation périphérique. Comme l'élimination de l'encre repose sur le travail des macrophages évacuant les fragments via la lymphe et les capillaires sanguins, un flux ralenti prolonge considérablement le temps nécessaire.",
    "faq.q6_title": "À quel stade un tatouage est-il suffisamment estompé pour un recouvrement ?",
    "faq.q6_body": "Un recouvrement ne nécessite en règle générale que 50 % à 70 % d'éclaircissement au lieu des 95 % et plus requis pour une disparition complète. Cela permet d'économiser environ 35 % à 45 % des séances. Il convient de consulter votre tatoueur dès que vous atteignez cette fourchette : lorsque les tracés denses noirs sont devenus gris doux, l'artiste peut appliquer des teintes soutenues sans risque de transparence. Patientez 8 à 12 semaines après le dernier laser avant d'encrer la peau.",
    "faq.q7_title": "Comment mon phototype de Fitzpatrick influence-t-il la sécurité et la durée du détatouage ?",
    "faq.q7_body": "Les phototypes de Fitzpatrick I à III ont moins de mélanine épidermique, ce qui autorise des fluences laser plus élevées avec un faible risque de dyschromie. Les peaux IV à VI possèdent une mélanine naturelle abondante qui entre en compétition avec le pigment du tatouage. Pour ces peaux mates à foncées, les praticiens emploient des paramètres prudents, des longueurs d'onde profondes (1064 nm Nd:YAG) et des spots plus larges pour préserver l'épiderme et éviter hypopigmentations ou hyperpigmentations post-inflammatoires."
  },
  it: {
    "photo.col_photo": "Foto della seduta",
    "trajectory.hover_prompt": "Passa il mouse, tocca o usa i tasti freccia sui punti lungo la curva per esaminare le tappe di schiaritura e la cronologia prevista.",
    "trajectory.tooltip_session": "Seduta {session}",
    "trajectory.tooltip_clearance": "{pct}% di eliminazione del pigmento ({remaining}% residuo)",
    "trajectory.tooltip_timeline": "Previsione: Settimana {week} (~{months} mesi trascorsi)",
    "trajectory.tooltip_status": "Stato: {status}",
    "trajectory.status_baseline": "Livello base (100% di pigmento presente)",
    "trajectory.status_initial": "Fase di frammentazione superficiale dell'inchiostro",
    "trajectory.status_intermediate": "Fagocitosi macrofagica attiva e trasporto linfatico",
    "trajectory.status_coverup": "Finestra idonea per cover-up (schiaritura del 50% - 70%)",
    "trajectory.status_advanced": "Eliminazione del pigmento profondo recalcitrante",
    "trajectory.status_clearance": "Obiettivo di schiaritura clinica (95%+ di eliminazione)",
    "trajectory.actual_observed": "Progresso registrato: Seduta {sess} ({pct}% schiarito)",
    "trajectory.score_note": "Punteggio Kirby-Desai: {score} pt | Intervallo target: da {min} a {max} sedute",
    "faq.title": "Domande cliniche frequenti",
    "faq.subtitle": "Risposte basate su evidenze scientifiche sul funzionamento del laser, la preparazione e le fasi di stallo.",
    "faq.expand_all": "Espandi tutto",
    "faq.collapse_all": "Comprimi tutto",
    "faq.q1_title": "Cosa succede se il trattamento laser smette di dare risultati o raggiunge una fase di stallo?",
    "faq.q1_body": "Una fase di stallo si verifica spesso quando l'inchiostro superficiale facilmente frammentabile è stato eliminato, lasciando depositi di pigmento più profondi o resistenti. In questi casi, il medico solitamente rivaluta i parametri: passaggio dal laser nanosecondi Q-switched a impulsi a picosecondi, variazione della lunghezza d'onda per i colori residui, incremento della fluenza con regolazione dello spot, oppure prolungamento delle pause a 12 o 16 settimane per consentire ai macrofagi di smaltire le microparticelle.",
    "faq.q2_title": "Come devo preparare la pelle prima di una seduta di rimozione laser?",
    "faq.q2_body": "Una preparazione accurata protegge la cute da alterazioni discromiche. Evita l'esposizione al sole, lampade abbronzanti e prodotti autoabbronzanti per almeno 4-6 settimane prima della seduta, poiché la melanina epidermica assorbe l'energia laser aumentando il rischio di ipopigmentazione. Rasa la zona 24 ore prima per evitare la bruciatura dei peli. La pelle deve essere pulita, senza cosmetici, creme o anestetici non prescritti. Mantieni una buona idratazione ed evita alcol o acido acetilsalicilico nelle 24 ore precedenti.",
    "faq.q3_title": "Perché gli inchiostri colorati (verde, blu, giallo) richiedono laser diversi rispetto al nero?",
    "faq.q3_body": "La rimozione laser si basa sulla fototermolisi selettiva: una lunghezza d'onda è efficace solo se assorbita dal pigmento bersaglio. L'inchiostro nero a base di carbone assorbe quasi tutte le lunghezze d'onda e risponde in modo ottimale al laser Nd:YAG 1064 nm. Il rosso assorbe la luce verde a 532 nm, mentre verde, blu e viola richiedono laser ad Alessandrite a 755 nm o a Rubino a 694 nm. Il giallo è particolarmente ostico poiché assorbe debolmente la luce nella finestra terapeutica cutanea, richiedendo manipoli a picosecondi a 532 nm.",
    "faq.q4_title": "L'inchiostro bianco o i pigmenti per trucco permanente possono diventare neri col laser?",
    "faq.q4_body": "Sì. Questo fenomeno è noto clinicamente come scurimento paradosso. L'inchiostro bianco, i toni carne e molti pigmenti da trucco permanente contengono biossido di titanio (TiO2) od ossido ferrico (Fe2O3). A contatto con impulsi ad altissima energia, gli ossidi subiscono una riduzione chimica immediata, trasformando il bianco, il rosa o il beige in grigio scuro o nero permanente. Il professionista deve eseguire sempre uno spot test di prova prima di trattare l'area.",
    "faq.q5_title": "Quanto influisce il fumo di tabacco sul numero di sedute necessarie?",
    "faq.q5_body": "Nelle ricerche cliniche pubblicate (come quelle di Kirby et al. e Bencini et al.), il fumo ha dimostrato di ridurre la probabilità di rimozione completa a 10 sedute di circa il 70%. La nicotina induce una vasocostrizione cutanea cronica che compromette la microcircolazione periferica. Poiché l'eliminazione dell'inchiostro dipende dai macrofagi che convogliano i detriti verso i dotti linfatici, una perfusione ridotta prolunga sensibilmente il percorso terapeutico.",
    "faq.q6_title": "Quando un tatuaggio è sufficientemente schiarito per una cover-up?",
    "faq.q6_body": "Per una cover-up è sufficiente una schiaritura del 50% - 70% anziché l'eliminazione completa del 95%+. Ciò riduce il numero di sedute di circa il 35% - 45%. È consigliabile confrontarsi con il proprio tatuatore quando si entra in questa finestra: una volta che i tratti neri marcati virano a un grigio chiaro, l'artista può inserire nuovi pigmenti senza che il vecchio disegno affiori. Attendi da 8 a 12 settimane dall'ultima seduta laser prima di tatuare nuovamente.",
    "faq.q7_title": "In che modo il fototipo di Fitzpatrick influisce sulla sicurezza e sui tempi del laser?",
    "faq.q7_body": "I fototipi Fitzpatrick da I a III presentano una minore concentrazione di melanina epidermica, consentendo l'uso di fluenze più elevate con un rischio minimo di discromie. I fototipi da IV a VI contengono molta melanina naturale, che compete con l'inchiostro nell'assorbimento del raggio laser. Su pelli scure, i medici adottano parametri conservativi, lunghezze d'onda maggiori (1064 nm Nd:YAG) e spot ampi per oltrepassare la melanina superficiale, prevenendo ipopigmentazioni o iperpigmentazioni post-infiammatorie."
  },
  de: {
    "photo.col_photo": "Sitzungsfoto",
    "trajectory.hover_prompt": "Fahren Sie mit der Maus über Punkte entlang der Kurve, tippen Sie darauf oder nutzen Sie die Pfeiltasten, um Meilensteine und Zeitachsen zu prüfen.",
    "trajectory.tooltip_session": "Sitzung {session}",
    "trajectory.tooltip_clearance": "{pct}% Pigmentaufhellung ({remaining}% verbleibend)",
    "trajectory.tooltip_timeline": "Projektion: Woche {week} (~{months} Monate vergangen)",
    "trajectory.tooltip_status": "Status: {status}",
    "trajectory.status_baseline": "Ausgangszustand (100% Pigment vorhanden)",
    "trajectory.status_initial": "Oberflächliche Tintenfragmentierungsphase",
    "trajectory.status_intermediate": "Aktive Makrophagen-Phagozytose und lymphatischer Transport",
    "trajectory.status_coverup": "Optimales Cover-Up-Fenster (50% bis 70% aufgehellt)",
    "trajectory.status_advanced": "Beseitigung hartnäckiger tiefer Pigmente",
    "trajectory.status_clearance": "Klinisches Beseitigungsziel (95%+ Aufhellung)",
    "trajectory.actual_observed": "Ihr dokumentierter Fortschritt: Sitzung {sess} ({pct}% aufgehellt)",
    "trajectory.score_note": "Kirby-Desai-Score: {score} Pkt. | Zielbereich: {min} bis {max} Sitzungen",
    "faq.title": "Häufig gestellte klinische Fragen",
    "faq.subtitle": "Evidenzbasierte Antworten zu Wirkungsweise, Sitzungsvorbereitung und Aufhellungsplateaus beim Lasern.",
    "faq.expand_all": "Alle aufklappen",
    "faq.collapse_all": "Alle einklappen",
    "faq.q1_title": "Was geschieht, wenn die Tattooentfernung stagniert oder ein Aufhellungsplateau erreicht?",
    "faq.q1_body": "Ein Aufhellungsplateau tritt meist auf, wenn oberflächliche Tintenpartikel bereits abtransportiert sind und tiefere, dichtere Pigmentansammlungen zurückbleiben. Bei Stagnation passen Behandler in der Regel die Parameter an: Wechsel von Nanosekunden- zu Pikosekundenlasern, Anpassung der Wellenlänge für Restfarben, Erhöhung der Fluenz bei optimierter Spotgröße oder Verlängerung der Intervalle auf 12 bis 16 Wochen, damit Makrophagen ausreichend Zeit für den Abtransport erhalten.",
    "faq.q2_title": "Wie sollte ich meine Haut auf eine Laser-Tattooentfernung vorbereiten?",
    "faq.q2_body": "Eine sorgfältige Vorbereitung schützt vor unerwünschten Pigmentveränderungen. Meiden Sie Sonnenbäder, Solarien und Selbstbräuner für mindestens 4 bis 6 Wochen vor dem Eingriff, da epidermales Melanin mit der Tattoo-Tinte um Laserenergie konkurriert und das Risiko für Hypopigmentierungen steigert. Rasieren Sie das Areal 24 Stunden vorher. Die Haut muss sauber und frei von Kosmetika, Lotionen oder unkontrollierten Betäubungscremes sein. Trinken Sie ausreichend Wasser und meiden Sie Alkohol oder Aspirin 24 Stunden vor dem Termin.",
    "faq.q3_title": "Warum erfordern bunte Farben (Grün, Blau, Gelb) andere Laser als Schwarz?",
    "faq.q3_body": "Die Laserentfernung basiert auf selektiver Photothermolyse: Eine Wellenlänge wirkt nur dann, wenn das Zielpigment sie absorbiert. Schwarze Kohlenstofftinte absorbiert nahezu alle Wellenlängen und spricht hervorragend auf Nd:YAG-Laser mit 1064 nm an. Rote Pigmente absorbieren grünes Licht (532 nm), während Grün-, Blau- und Violetttöne 755 nm Alexandrit- oder 694 nm Rubinstrahlen benötigen. Gelb ist extrem widerspenstig, da es Licht im sicheren Hauttransmissionsfenster kaum absorbiert und oft spezielle 532 nm Pikosekunden-Systeme verlangt.",
    "faq.q4_title": "Kann weiße Tinte oder Permanent-Make-up beim Lasern schwarz werden?",
    "faq.q4_body": "Ja. Dieses Phänomen wird in der Dermatologie als paradoxe Abdunklung bezeichnet. Weiße Tinte, Hauttöne und Pigmente für Permanent-Make-up enthalten häufig Titandioxid (TiO2) oder Eisenoxid (Fe2O3). Durch die hochenergetischen Laserimpulse werden diese Oxide chemisch reduziert, wodurch helle, rosafarbene oder beige Nuancen schlagartig in dauerhaftes Dunkelgrau oder Schwarz umschlagen. Vor einer flächigen Behandlung ist ein verdeckter Testschuss zwingend erforderlich.",
    "faq.q5_title": "Wie stark beeinflusst Tabakkonsum die Anzahl der erforderlichen Sitzungen?",
    "faq.q5_body": "In publizierten klinischen Studien (unter anderem von Kirby et al. und Bencini et al.) senkte Rauchen die Erfolgsquote nach 10 Sitzungen um rund 70%. Nikotin führt zu chronischer Vasokonstriktion der Hautgefäße, was die periphere Mikrozirkulation stark drosselt. Da der Abtransport der zerkleinerten Pigmente vollständig über körpereigene Makrophagen und das Lymphsystem erfolgt, verlangsamt eine verminderte Durchblutung den Beseitigungsprozess erheblich.",
    "faq.q6_title": "Wann ist ein Tattoo ausreichend aufgehellt für ein Cover-up statt einer Komplettentfernung?",
    "faq.q6_body": "Für ein Cover-up genügt meist eine Aufhellung von 50% bis 70% anstelle einer 95%+ Komplettentfernung. Dadurch verringert sich die Sitzungsanzahl um etwa 35% bis 45%. Stimmen Sie sich mit Ihrem Tätowierer ab, sobald dieses Zielfenster erreicht ist: Sind dichte schwarze Konturen zu weichem Grau verblasst, können frische Farben und Motive eingearbeitet werden, ohne durchzuschlagen. Warten Sie nach der letzten Lasersitzung mindestens 8 bis 12 Wochen vor dem Tätowieren.",
    "faq.q7_title": "Wie beeinflusst mein Fitzpatrick-Hauttyp die Sicherheit und Behandlungsdauer?",
    "faq.q7_body": "Die Fitzpatrick-Hauttypen I bis III weisen weniger epidermales Melanin auf, was höhere Laserenergien bei geringem Risiko für Pigmentstörungen erlaubt. Die Hauttypen IV bis VI besitzen reichlich natürliches Melanin, das mit den Tintenpartikeln um die Laserstrahlung konkurriert. Bei dunkleren Hauttypen nutzen Behandler daher zurückhaltende Dosierungen, längere Wellenlängen (1064 nm Nd:YAG) und größere Spotdurchmesser, um Melanin zu schonen und Hypo- sowie Hyperpigmentierungen zu vermeiden."
  },
  es: {
    "photo.col_photo": "Foto de la sesión",
    "trajectory.hover_prompt": "Pase el cursor, toque o use las flechas en los puntos de la curva para examinar los hitos de aclarado y el cronograma previsto.",
    "trajectory.tooltip_session": "Sesión {session}",
    "trajectory.tooltip_clearance": "{pct}% de eliminación de pigmento ({remaining}% restante)",
    "trajectory.tooltip_timeline": "Proyección: Semana {week} (~{months} meses transcurridos)",
    "trajectory.tooltip_status": "Estado: {status}",
    "trajectory.status_baseline": "Estado inicial (100% de pigmento presente)",
    "trajectory.status_initial": "Fase de fragmentación superficial de la tinta",
    "trajectory.status_intermediate": "Fagocitosis macrofágica activa y transporte linfático",
    "trajectory.status_coverup": "Ventana óptima para cover-up (50% a 70% aclarado)",
    "trajectory.status_advanced": "Eliminación de pigmento profundo recalcitrante",
    "trajectory.status_clearance": "Objetivo de eliminación clínica (95%+ de aclarado)",
    "trajectory.actual_observed": "Su progreso registrado: Sesión {sess} ({pct}% aclarado)",
    "trajectory.score_note": "Puntuación Kirby-Desai: {score} pts | Rango estimado: {min} a {max} sesiones",
    "faq.title": "Preguntas clínicas frecuentes",
    "faq.subtitle": "Respuestas con respaldo clínico sobre el funcionamiento del láser, la preparación y las fases de estancamiento.",
    "faq.expand_all": "Expandir todo",
    "faq.collapse_all": "Contraer todo",
    "faq.q1_title": "¿Qué sucede si el tratamiento láser deja de mostrar avances o se estanca en una meseta?",
    "faq.q1_body": "Una meseta en el aclarado ocurre cuando la tinta superficial fácil de fragmentar ya fue eliminada, quedando cúmulos más profundos o densos. Ante un estancamiento, el especialista suele reajustar los parámetros: cambiar de láser de nanosegundos a picosegundos, modificar la longitud de onda para colores residuales, elevar la fluencia optimizando el diámetro del haz, o extender los descansos a 12 o 16 semanas para que los macrófagos procesen las partículas sin saturar la dermis.",
    "faq.q2_title": "¿Cómo debo preparar mi piel antes de una sesión de eliminación láser?",
    "faq.q2_body": "Una preparación adecuada previene alteraciones pigmentarias no deseadas. Evite la exposición al sol, camas solares y autobronceadores durante al menos 4 a 6 semanas antes de la sesión, ya que la melanina epidérmica compite por la energía del láser elevando el riesgo de hipopigmentación. Rasure el área 24 horas antes para evitar quemar el vello superficial. La piel debe estar limpia y libre de cosméticos, cremas o anestésicos sin indicación médica. Mantenga una buena hidratación y evite el alcohol o la aspirina 24 horas antes.",
    "faq.q3_title": "¿Por qué las tintas de colores (verde, azul, amarillo) requieren láseres distintos al negro?",
    "faq.q3_body": "La eliminación con láser se fundamenta en la fototermólisis selectiva: una longitud de onda solo actúa si el pigmento objetivo la absorbe. El negro de carbón absorbe prácticamente todo el espectro y responde fielmente al Nd:YAG de 1064 nm. El rojo absorbe la luz verde de 532 nm, mientras que verdes, azules y morados precisan láser de Alejandrita de 755 nm o Rubí de 694 nm. El amarillo es especialmente resistente debido a su escasa absorción en la ventana segura para la piel, requiriendo módulos de picosegundos de 532 nm.",
    "faq.q4_title": "¿Puede la tinta blanca o el maquillaje permanente volverse negro con el láser?",
    "faq.q4_body": "Sí. Este fenómeno se conoce clínicamente como oscurecimiento paradójico. La tinta blanca, los tonos piel y los pigmentos de micropigmentación contienen dióxido de titanio (TiO2) u óxido de hierro (Fe2O3). Al recibir el impacto de pulsos de alta energía, estos compuestos sufren una reducción química, transformando tonos blancos, rosados o beiges en gris oscuro o negro permanente. El profesional debe efectuar siempre un disparo de prueba en una zona oculta.",
    "faq.q5_title": "¿Cuánto influye el consumo de tabaco en la cantidad de sesiones requeridas?",
    "faq.q5_body": "En estudios clínicos de referencia (como los de Kirby et al. y Bencini et al.), el tabaquismo redujo la tasa de aclarado total a 10 sesiones en aproximadamente un 70%. La nicotina genera una vasoconstricción periférica crónica que menoscaba la microcirculación cutánea. Dado que el drenaje de la tinta fragmentada depende por completo de los macrófagos y las vías linfáticas, un flujo sanguíneo deficitario prolonga considerablemente el proceso.",
    "faq.q6_title": "¿Cuándo está un tatuaje lo bastante aclarado para un cover-up en vez de eliminación completa?",
    "faq.q6_body": "Para un cover-up suele bastar con un aclarado del 50% al 70% en vez del 95%+ necesario para una eliminación completa. Esto ahorra cerca de un 35% a 45% de las sesiones. Conviene acudir a su tatuador al alcanzar este intervalo: cuando las líneas negras sólidas pasan a gris tenue, el artista puede aplicar nuevos diseños y gamas cromáticas sin que el motivo previo se trasluzca. Espere entre 8 y 12 semanas tras la última sesión de láser antes de volver a tatuar.",
    "faq.q7_title": "¿Cómo influye mi fototipo de Fitzpatrick en la seguridad y la velocidad del tratamiento?",
    "faq.q7_body": "Los fototipos de Fitzpatrick I a III presentan menor melanina epidérmica, lo que permite fluencias más altas con bajo riesgo de discromías. Los fototipos IV a VI contienen abundante melanina natural que compite con el pigmento del tatuaje. En pieles más oscuras, los especialistas eligen parámetros conservadores, longitudes de onda largas (1064 nm Nd:YAG) y diámetros de haz mayores para salvaguardar la epidermis y prevenir hipopigmentaciones o hiperpigmentaciones postinflamatorias."
  },
  nl: {
    "photo.col_photo": "Sessiefoto",
    "trajectory.hover_prompt": "Beweeg de muis over, tik op of gebruik de pijltjestoetsen op de punten langs de curve om de verwachte mijlpalen en tijdlijn te bekijken.",
    "trajectory.tooltip_session": "Sessie {session}",
    "trajectory.tooltip_clearance": "{pct}% pigmentverwijdering ({remaining}% resterend)",
    "trajectory.tooltip_timeline": "Verwacht: Week {week} (~{months} maanden verstreken)",
    "trajectory.tooltip_status": "Status: {status}",
    "trajectory.status_baseline": "Uitgangspunt (100% pigment aanwezig)",
    "trajectory.status_initial": "Fase van oppervlakkige inktfragmentatie",
    "trajectory.status_intermediate": "Actieve macrofaag-fagocytose en lymfatisch transport",
    "trajectory.status_coverup": "Optimaal cover-up venster (50% tot 70% opgelicht)",
    "trajectory.status_advanced": "Verwijdering van hardnekkig diep pigment",
    "trajectory.status_clearance": "Klinisch verwijderingsdoel (95%+ opheldering)",
    "trajectory.actual_observed": "Uw vastgelegde voortgang: Sessie {sess} ({pct}% vervaagd)",
    "trajectory.score_note": "Kirby-Desai-score: {score} ptn | Richtbereik: {min} tot {max} sessies",
    "faq.title": "Veelgestelde klinische vragen",
    "faq.subtitle": "Onderbouwde antwoorden over de werking van laserontharing van tatoeages, voorbereiding en plateaus.",
    "faq.expand_all": "Alles uitklappen",
    "faq.collapse_all": "Alles inklappen",
    "faq.q1_title": "Wat gebeurt er als de laserbehandeling niet meer lijkt te werken of een plateau bereikt?",
    "faq.q1_body": "Een plateau ontstaat vaak wanneer de gemakkelijk te fragmenteren oppervlakkige inkt al is opgeruimd en diepere, hardnekkige pigmentclusters overblijven. Bij stilstand past de behandelaar doorgaans de instellingen aan: overstappen van nanoseconde- naar picosecondelasers, golflengte afstemmen op restkleuren, de energiefluency verhogen met een passende spotgrootte, of tussenpozen verlengen naar 12 tot 16 weken zodat macrofagen pigmentresten rustig kunnen afvoeren.",
    "faq.q2_title": "Hoe moet ik mijn huid voorbereiden op een laserbehandeling?",
    "faq.q2_body": "Een zorgvuldige voorbereiding voorkomt ongewenste pigmentveranderingen. Vermijd zonblootstelling, zonnebanken en zelfbruiners gedurende minimaal 4 tot 6 weken voorafgaand aan de behandeling, aangezien epidermaal melanine concurreert om de laserenergie en het risico op hypopigmentatie verhoogt. Scheer het te behandelen gebied 24 uur van tevoren. Zorg dat de huid schoon is en vrij van cosmetica, lotions of verdovende crèmes tenzij klinisch voorgeschreven. Drink voldoende water en vermijd alcohol of aspirine 24 uur vooraf.",
    "faq.q3_title": "Waarom vereisen meerkleurige inkten (groen, blauw, geel) andere lasers dan zwart?",
    "faq.q3_body": "Laserontharing berust op selectieve fotothermolyse: een golflengte werkt alleen als het doelpigment deze absorbeert. Zwarte koolstofinkt absorbeert vrijwel alle golflengten en reageert betrouwbaar op de 1064 nm Nd:YAG-laser. Rood pigment absorbeert juist groen licht (532 nm), terwijl blauw, groen en paars een 755 nm Alexandriet- of 694 nm Robijnlaser vereisen. Geel is bijzonder hardnekkig omdat het nauwelijks licht absorbeert binnen het veilige venster en vergt vaak gespecialiseerde 532 nm picoseconde-handstukken.",
    "faq.q4_title": "Kan witte inkt of cosmetisch tatoeagepigment zwart worden door laserstraling?",
    "faq.q4_body": "Ja. Dit verschijnsel staat klinisch bekend als paradoxale verdonkering. Witte inkt, huidskleuren en permanente make-up bevatten vaak titaandioxide (TiO2) of ijzeroxide (Fe2O3). Door de intense laserpuls reduceren deze oxiden onmiddellijk naar een donkerdere toestand, waardoor wit, roze of beige plotseling verandert in permanent donkergrijs of zwart. Een deskundige behandelaar zal daarom altijd eerst een discrete proefpuls uitvoeren.",
    "faq.q5_title": "Hoeveel invloed heeft roken op het aantal benodigde behandelingen?",
    "faq.q5_body": "In gepubliceerde klinische onderzoeken (waaronder Kirby et al. en Bencini et al.) bleek roken de kans op volledige verwijdering na 10 behandelingen met circa 70% te verlagen. Nicotine veroorzaakt chronische vaatvernauwing in de huid, wat de microcirculatie belemmert. Omdat inktverwijdering afhangt van macrofagen die inktdeeltjes via bloed- en lymfevaten afvoeren, zorgt een verminderde doorbloeding voor een aanzienlijk langere behandelduur.",
    "faq.q6_title": "Wanneer is een tatoeage voldoende vervaagd voor een cover-up in plaats van volledige verwijdering?",
    "faq.q6_body": "Voor een cover-up is doorgaans slechts 50% tot 70% vervaging nodig in plaats van 95%+ volledige verwijdering. Dit scheelt ongeveer 35% tot 45% aan behandelsessies. Overleg met uw tatoeëerder zodra u dit stadium bereikt: als donkere lijnen zijn afgezwakt tot zachtgrijs, kan de artiest nieuwe kleuren en patronen aanbrengen zonder dat de oude tatoeage erdoorheen schijnt. Wacht na de laatste lasersessie minimaal 8 tot 12 weken voor de nieuwe tatoeage.",
    "faq.q7_title": "Hoe beïnvloedt mijn Fitzpatrick-huidtype de veiligheid en de behandelduur?",
    "faq.q7_body": "Fitzpatrick-huidtypen I tot III bevatten minder epidermaal melanine, waardoor hogere laserenergie mogelijk is met een minimaal risico op pigmentstoornissen. Huidtypen IV tot VI hebben juist veel natuurlijk melanine, dat met de inkt concurreert om de laserabsorptie. Bij een donkere huid kiezen behandelaars voor voorzichtige instellingen, langere golflengten (1064 nm Nd:YAG) en grotere spotgroottes om de opperhuid te ontzien en post-inflammatoire hypo- of hyperpigmentatie te voorkomen."
  },
  pt: {
    "photo.col_photo": "Foto da sessão",
    "trajectory.hover_prompt": "Passe o cursor, toque ou utilize as teclas de seta nos pontos ao longo da curva para inspecionar os marcos de clareamento e o cronograma projetado.",
    "trajectory.tooltip_session": "Sessão {session}",
    "trajectory.tooltip_clearance": "{pct}% de eliminação de pigmento ({remaining}% restante)",
    "trajectory.tooltip_timeline": "Projeção: Semana {week} (~{months} meses decorridos)",
    "trajectory.tooltip_status": "Status: {status}",
    "trajectory.status_baseline": "Ponto de partida (100% de pigmento presente)",
    "trajectory.status_initial": "Fase de fragmentação superficial da tinta",
    "trajectory.status_intermediate": "Fagocitose macrofágica ativa e transporte linfático",
    "trajectory.status_coverup": "Janela favorável para cobertura (50% a 70% clareado)",
    "trajectory.status_advanced": "Eliminação de pigmento profundo recalcitrante",
    "trajectory.status_clearance": "Meta de eliminação clínica (95%+ de clareamento)",
    "trajectory.actual_observed": "Seu progresso registrado: Sessão {sess} ({pct}% clareado)",
    "trajectory.score_note": "Pontuação Kirby-Desai: {score} pts | Intervalo estimado: {min} a {max} sessões",
    "faq.title": "Perguntas clínicas frequentes",
    "faq.subtitle": "Respostas baseadas em evidências clínicas sobre os mecanismos do laser, preparação e estagnação no clareamento.",
    "faq.expand_all": "Expandir tudo",
    "faq.collapse_all": "Recolher tudo",
    "faq.q1_title": "O que acontece se a remoção a laser parar de funcionar ou atingir um platô de clareamento?",
    "faq.q1_body": "Um platô no clareamento ocorre frequentemente quando a tinta superficial mais fácil de fragmentar já foi eliminada, restando aglomerados mais profundos e densos. Diante da estagnação, o profissional geralmente reavalia os parâmetros: transição de lasers de nanossegundos para picossegundos, ajuste do comprimento de onda para cores residuais, aumento da fluência com diâmetro de foco otimizado, ou ampliação do intervalo para 12 a 16 semanas para permitir que os macrófagos processem o pigmento.",
    "faq.q2_title": "Como devo preparar minha pele antes de uma sessão de remoção a laser?",
    "faq.q2_body": "Uma preparação criteriosa protege a pele contra alterações indesejadas de pigmentação. Evite exposição solar, câmaras de bronzeamento e autobronzeadores por pelo menos 4 a 6 semanas antes da sessão, pois a melanina epidérmica compete pela absorção da energia do laser e eleva o risco de hipopigmentação. Depile a área 24 horas antes com lâmina para evitar queimaduras nos pelos. A pele deve estar limpa e sem cosméticos, hidratantes ou pomadas anestésicas sem prescrição. Beba bastante água e evite álcool ou aspirina 24 horas antes.",
    "faq.q3_title": "Por que tintas coloridas (verde, azul, amarelo) exigem lasers diferentes do preto?",
    "faq.q3_body": "A remoção a laser fundamenta-se na fototermólise seletiva: um comprimento de onda só é eficaz se o pigmento alvo o absorver. O preto de carbono absorve quase todas as frequências e responde de forma consistente ao laser Nd:YAG de 1064 nm. O vermelho absorve fortemente a luz verde em 532 nm, enquanto verde, azul e violeta requerem lasers de Alexandrita em 755 nm ou Rubi em 694 nm. O amarelo é notavelmente resistente por absorver mal a luz na faixa segura da pele, exigindo ponteiras de picossegundos em 532 nm.",
    "faq.q4_title": "A tinta branca ou pigmentos de maquiagem definitiva podem escurecer com o laser?",
    "faq.q4_body": "Sim. Esse fenômeno é conhecido clinicamente como escurecimento paradoxal. Tintas brancas, tons de pele e pigmentos de micropigmentação contêm dióxido de titânio (TiO2) ou óxido de ferro (Fe2O3). Sob pulsos de alta potência, esses óxidos sofrem redução química instantânea, convertendo tons claros ou rosados em cinza escuro ou preto permanente. Um profissional qualificado deve sempre realizar um disparo de teste prévio em área discreta.",
    "faq.q5_title": "O quanto o tabagismo influencia na quantidade de sessões necessárias?",
    "faq.q5_body": "Em estudos clínicos consagrados (como Kirby et al. e Bencini et al.), o tabagismo reduziu a taxa de eliminação completa em 10 sessões em aproximadamente 70%. A nicotina causa vasoconstrição cutânea crônica, comprometendo a microcirculação periférica. Como a drenagem da tinta fragmentada depende integralmente dos macrófagos e do sistema linfático, a circulação sanguínea diminuída prolonga significativamente o tratamento.",
    "faq.q6_title": "Quando uma tatuagem está clara o suficiente para uma cobertura em vez de remoção total?",
    "faq.q6_body": "Para uma cobertura, costuma ser suficiente um clareamento de 50% a 70% em vez dos 95%+ de eliminação total. Isso diminui as sessões necessárias em cerca de 35% a 45%. É recomendável consultar seu tatuador ao atingir essa janela: quando os traços pretos densos clareiam para um cinza suave, o tatuador ganha liberdade para aplicar novas cores sem que o desenho antigo apareça. Aguarde de 8 a 12 semanas após o último laser antes de tatuar a pele.",
    "faq.q7_title": "Como meu fototipo de Fitzpatrick influencia a segurança e o tempo do tratamento?",
    "faq.q7_body": "Os fototipos de Fitzpatrick I a III contêm menor concentração de melanina epidérmica, permitindo fluências maiores com risco reduzido de discromias. Já os fototipos IV a VI possuem abundante melanina natural, que compete com a tinta pela absorção do laser. Em peles mais escuras, os profissionais utilizam parâmetros conservadores, comprimentos de onda maiores (1064 nm Nd:YAG) e feixes mais amplos para contornar a melanina e evitar hipopigmentação ou hiperpigmentação pós-inflamatória."
  }
};

const i18nPath = 'js/i18n.js';
const i18nContent = fs.readFileSync(i18nPath, 'utf8');

const vm = require('vm');
const ctx = { globalThis: {} };
ctx.window = ctx.globalThis;
vm.runInNewContext(i18nContent, ctx);
const existingDict = ctx.window.i18n.dict;

const langs = ['en', 'fr', 'it', 'de', 'es', 'nl', 'pt'];
langs.forEach(lang => {
  if (!existingDict[lang]) existingDict[lang] = {};
  const addObj = newKeys[lang];
  for (const k of Object.keys(addObj)) {
    existingDict[lang][k] = addObj[k];
  }
  console.log(`Language ${lang} now has ${Object.keys(existingDict[lang]).length} keys.`);
});

// Find start and end of `var dict = {` in js/i18n.js
const startMarker = '  var dict = {';
const startIndex = i18nContent.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Could not find startMarker in js/i18n.js');
  process.exit(1);
}

// Find where `var dict = {` ends before `function t(key, params)`
const endMarker = '  function t(key, params) {';
const endIndex = i18nContent.indexOf(endMarker);
if (endIndex === -1) {
  console.error('Could not find endMarker in js/i18n.js');
  process.exit(1);
}

const newDictStr = '  var dict = ' + JSON.stringify(existingDict, null, 2) + ';\n\n';
const updatedI18n = i18nContent.substring(0, startIndex) + newDictStr + i18nContent.substring(endIndex);

fs.writeFileSync(i18nPath, updatedI18n, 'utf8');
console.log('Successfully updated js/i18n.js');
