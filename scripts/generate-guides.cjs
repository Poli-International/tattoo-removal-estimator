const fs = require('fs');
const path = require('path');

// Read i18n dictionary
const i18nContent = fs.readFileSync(path.join(__dirname, '../js/i18n.js'), 'utf8');
const dictMatch = i18nContent.match(/var dict = (\{[\s\S]*?\n  \};)/);
let dict;
eval('dict = ' + dictMatch[1]);

function clean(str) {
  return str.replace(/ \u2014 /g, ' - ').replace(/\u2014/g, ' - ');
}

// Data definitions for 7 languages
const guideData = {
  en: {
    title: 'Tattoo Removal Sessions Estimator: user guide',
    intro: 'The Tattoo Removal Sessions Estimator calculates estimated laser session ranges, clinical timelines, and budget requirements based on the published Kirby-Desai scale for tattoo clients, tattoo artists, and laser specialists.',
    what_for_title: 'What it is for',
    what_for_body: 'The Tattoo Removal Sessions Estimator applies the clinical scoring scale published by Dr. William Kirby and Dr. Alpesh Desai (Journal of Clinical and Aesthetic Dermatology, March 2009). It evaluates six physical tattoo characteristics, adjusts for circulation and lifestyle factors, projects healing timelines from clinic intervals, models biological clearance curves, calculates estimated costs, provides laser wavelength guidance, evaluates cover-up pigment feasibility, structures recovery aftercare, and exports clinical records.',
    who_for_title: 'Who it is for',
    who_for_body: 'This tool serves three groups:\n* **Tattoo clients**: Anyone planning laser removal seeking objective session, timeline, and cost estimates.\n* **Tattoo artists**: Artists advising clients on fading requirements and pigment feasibility before cover-up tattooing.\n* **Laser removal practitioners**: Clinicians needing a transparent reference tool to explain clearance speeds and post-treatment care.',
    how_to_use_title: 'How to use it',
    sections: [
      {
        title: '1. Managing multiple tattoo profiles',
        steps: [
          'Locate `{profile_label}` at the very top of the calculator.',
          'Click `{profile_new_btn}` to create an independent assessment profile for a new tattoo (e.g. "Forearm Raven").',
          'Use `{profile_rename_btn}` to update the name of the active tattoo assessment.',
          'Click `{profile_delete_btn}` to remove the current profile. Each profile maintains its own clinical factors, lifestyle settings, aftercare checklists, and photo logs.'
        ]
      },
      {
        title: '2. Selecting the interface language',
        steps: [
          'Open the `{lang_select_label}` menu in the header.',
          'Select English, Español, Deutsch, Français, Italiano, Português, or Nederlands.',
          'All interface labels, units, and guides update instantly.'
        ]
      },
      {
        title: '3. Setting your treatment goal',
        steps: [
          'Review `{goal_title}` at the top of the form.',
          'Select `{goal_clearance_label}` for full clearance (95 percent or higher).',
          'Select `{goal_coverup_label}` for partial lightening (50 to 70 percent fade), requiring roughly 55 to 65 percent of full removal sessions.'
        ]
      },
      {
        title: '4. Scoring the six clinical Kirby-Desai factors',
        steps: [
          'Under the clinical assessment section, enter each characteristic:',
          '* `{factor_skin_title}`: Select your phototype directly (1 to 6 points) or use the sunburn and tanning helper.',
          '* `{factor_location_title}`: Select body region (1 to 5 points), from head and neck to hands and feet.',
          '* `{factor_colour_title}`: Select pigment grouping (1 to 4 points), from monochromatic black to multicoloured ink.',
          '* `{factor_density_title}`: Select saturation (1 to 4 points), from amateur lines to solid tribal saturation.',
          '* `{factor_scarring_title}`: Select dermal texture (0 to 5 points), from normal skin to pronounced hypertrophic scarring.',
          '* `{factor_layering_title}`: Indicate if ink covers older work (0 points for original tattoos, 2 points for cover-ups).'
        ]
      },
      {
        title: '5. Accounting for circulation and lifestyle factors',
        steps: [
          'Under `{lifestyle_title}`, select your physiological parameters:',
          '* `{lifestyle_smoking_label}`: Active smoking causes cutaneous vasoconstriction, adding roughly 30 percent more sessions.',
          '* `{lifestyle_exercise_label}`: Physical activity promotes lymphatic drainage and macrophage transit.',
          '* `{lifestyle_hydration_label}`: Adequate daily water intake assists immune clearance of fragmented pigment particles.'
        ]
      },
      {
        title: '6. Customizing clinic spacing, price, and treatment progress',
        steps: [
          'Enter appointment spacing in `{param_interval_label}` (clinical standard is 6 to 10 weeks).',
          'Enter clinic fee in `{param_cost_label}` and pick your currency symbol.',
          'If treatments have started, check `{param_started_toggle}`.',
          'Enter past visits in `{param_completed_label}` and recorded visual progress in `{param_faded_label}`.'
        ]
      },
      {
        title: '7. Calculating your estimate and reviewing results',
        steps: [
          'Click `{btn_calculate}`.',
          'Review estimated metrics: `{results_score_label}`, `{results_sessions_label}`, `{results_timeline_label}`, `{results_remaining_label}`, `{results_cost_label}`, and `{results_dominant_intro}`.',
          'Inspect the clinical point breakdown table showing exact parameter scores and mathematical formulas.'
        ]
      },
      {
        title: '8. Interpreting the biological clearance trajectory curve',
        steps: [
          'Scroll to `{trajectory_title}`.',
          'Review the logarithmic response curve charting projected pigment clearance across sequential visits.',
          'Compare your current recorded fade progress against the biological reference trajectory.'
        ]
      },
      {
        title: '9. Selecting laser wavelengths by chromophore',
        steps: [
          'Scroll to `{wavelength_title}`.',
          'Inspect optical wavelength recommendations tailored to your ink selection: 1064 nm for black and deep blue, 532 nm for red and warm pigments, 755 nm or 694 nm for green and light blue.',
          'Note the clinical warning regarding white ink and titanium dioxide (TiO2) paradoxical darkening.'
        ]
      },
      {
        title: '10. Evaluating cover-up pigment feasibility',
        steps: [
          'Click `{coverup_toggle_btn}` to display the `{coverup_matrix_title}`.',
          'Review cross-tabulated pigment recommendations showing which new colors can effectively cover residual base ink.',
          'Identify whether your desired new ink requires direct application, 2 to 4 laser fading sessions, or extensive clearance.'
        ]
      },
      {
        title: '11. Generating a projected appointment calendar',
        steps: [
          'Scroll to `{calendar_title}`.',
          'Pick your starting session date in `{calendar_start_date_label}`.',
          'Review projected appointment dates spaced by your recovery interval.',
          'Click `{btn_export_ics}` to export a standard iCalendar file.'
        ]
      },
      {
        title: '12. Following the clinical aftercare stage checklist',
        steps: [
          'Locate `{aftercare_title}`.',
          'Check off recovery actions across `{aftercare_stage1_title}`, `{aftercare_stage2_title}`, and `{aftercare_stage3_title}`.',
          'Monitor your healing progress bar as you complete acute thermal dissipation, epidermal restoration, and sun defense.'
        ]
      },
      {
        title: '13. Logging treatment history with photo comparison',
        steps: [
          'Locate `{fadelog_title}`.',
          'Enter `{fadelog_date_label}`, `{fadelog_rating_label}`, and observations in `{fadelog_note_label}`.',
          'Click `{photo_attach_btn}` to select a local clinical progression photograph.',
          'Click `{fadelog_add_btn}` to commit the log. Click `{photo_view_btn}` on any row to open the side-by-side baseline comparison viewer.',
          'Use `{fadelog_delete}` to remove any obsolete entry.'
        ]
      },
      {
        title: '14. Backing up, restoring, and exporting records',
        steps: [
          'Under `{backup_title}`, click `{backup_export_json_btn}` to save all profiles, aftercare checklists, and photos into a local file.',
          'Click `{backup_import_json_btn}` to restore saved client files.',
          'Click `{backup_export_csv_btn}` to export your treatment history table as a CSV spreadsheet.'
        ]
      },
      {
        title: '15. Preparing consultation questions and printing',
        steps: [
          'Review `{questions_title}` covering patch testing, interval spacing, and cover-up coordination.',
          'Click `{btn_print}` to print or save a complete consultation brief.'
        ]
      },
      {
        title: '16. Resetting the form',
        steps: [
          'Click `{btn_reset}` to clear active inputs and restore initial defaults.'
        ]
      }
    ],
    not_do_title: 'What it does not do',
    not_do_body: '* It does not assess individual keloid or hypertrophic scarring predisposition. To evaluate personal scarring predisposition before skin procedures, consult the [Keloid Scar Risk Evaluator](https://poliinternational.com/keloid-scar-risk/).\n* It does not identify ink chemistry, CAS registry codes, or EU REACH compliance. To look up tattoo pigment colorants, consult the [Ink Ingredient Decoder](https://poliinternational.com/ink-ingredient-decoder/).\n* It does not calibrate laser machinery or adjust energy fluences.\n* It does not transmit health records or book clinical appointments.',
    data_lives_title: 'Where your data lives',
    data_lives_body: 'All inputs, assessments, and images remain on your local device:\n* **Browser memory**: Form inputs and calculated schedules exist in memory during your active session.\n* **Local browser storage**: Tattoo profiles, treatment logs, lifestyle options, and aftercare states are saved in localStorage under `poli_tattoo_profiles_v2`.\n* **IndexedDB photo storage**: Progress photos are compressed locally and stored in your browser IndexedDB database (`PoliTattooPhotosDB`).\n* **No network transmission**: The tool makes zero server requests and transmits no data to Poli International or third parties.\n* **Backup portability**: Complete JSON exports allow transferring records between devices without cloud synchronization.',
    print_export_title: 'Printing and exporting',
    print_export_body: 'The tool provides multiple export formats:\n1. **Print Consultation Sheet**: Formats factor scores, session projections, cost estimates, wavelength notes, clinic questions, and treatment logs into a printable brief.\n2. **Download .ics Calendar Schedule**: Exports projected treatment dates into an RFC 5545 iCalendar file compatible with calendar software.\n3. **Full Backup (JSON)**: Archives complete multi-profile assessments, checklists, and progression photographs.\n4. **Fade Log (CSV)**: Exports session dates, ratings, and clinical notes for spreadsheet analysis.',
    qa_title: 'Questions and answers',
    qas: [
      {
        q: 'How accurate is the Kirby-Desai scale for laser tattoo removal?',
        a: 'The Kirby-Desai scale is a statistical model based on a peer-reviewed 100-patient study published in 2009. In that group, the scale accounted for roughly 80 percent of treatment variance. Because healing, ink chemistry, and lasers vary, actual results may differ from calculated ranges.'
      },
      {
        q: 'Why do tattoo removal sessions need to be spaced weeks apart?',
        a: 'Lasers shatter ink into microscopic fragments rather than vaporizing it. Your immune system requires several weeks to transport these fragments through the lymphatic system. Scheduling sessions too closely causes skin trauma without accelerating pigment clearance.'
      },
      {
        q: 'Why do tattoos on hands and feet take longer to remove?',
        a: 'Ink clearance depends on regional blood circulation and lymphatic drainage. The head, neck, and trunk have dense capillary networks that remove ink quickly. Hands, wrists, ankles, and feet have lower peripheral blood flow, meaning macrophages clear ink at a substantially slower rate.'
      },
      {
        q: 'How many laser sessions are needed to fade a tattoo for a cover-up?',
        a: 'Fading a tattoo for cover-up art requires 50 to 70 percent lightening rather than complete clearance. This generally takes 55 to 65 percent of the sessions required for full removal. You should always have your tattoo artist review the area before your final laser appointment.'
      },
      {
        q: 'Can white or pastel tattoo inks be removed with lasers?',
        a: 'White and pastel tattoo pigments often contain titanium dioxide or iron oxide, which can oxidize under laser light. This reaction, known as paradoxical darkening, turns ink permanently black or slate grey. Practitioners usually perform a small test spot on light pigments before treating larger areas.'
      },
      {
        q: 'Why does smoking increase the number of laser tattoo removal sessions?',
        a: 'Research shows that smoking reduces 10-session clearance rates by roughly 70 percent. Nicotine constricts microvasculature and reduces dermal blood flow, slowing macrophage activity and delaying ink particle clearance.'
      },
      {
        q: 'Which laser wavelength is needed for multi-coloured tattoos?',
        a: 'Monochromatic 1064 nm lasers clear black and dark blue pigments effectively but cannot target green or red. Red ink requires 532 nm KTP lasers, while green and light blue respond best to 755 nm Alexandrite or 694 nm Ruby lasers. Clinics often use multi-wavelength platforms.'
      },
      {
        q: 'How does the non-linear clearance curve model fading?',
        a: 'Ink clearance is non-linear: initial sessions break up dense superficial ink with high visual contrast changes, while deeper ink particles require progressively longer macrophage transit times. The curve illustrates this logarithmic clearance dynamic.'
      }
    ],
    limits_title: 'Limits',
    limits_body: 'The Kirby-Desai algorithm is an educational reference, not a medical diagnosis or treatment guarantee. The tool cannot evaluate individual immune health, macrophage clearing velocity, or metabolic rates. It cannot determine proprietary ink formulas, pigment depths, or operator proficiency. Decisions regarding laser settings, patch testing, interval spacing, and clinical care remain strictly between the client and a licensed medical professional or laser practitioner during an in-person consultation.'
  },

  fr: {
    title: 'Estimateur de séances de détatouage : guide d\'utilisation',
    intro: 'L\'estimateur de séances de détatouage calcule les plages de séances laser, les délais cliniques et les budgets prévisionnels à partir de l\'échelle publiée de Kirby-Desai pour les clients, les tatoueurs et les spécialistes du laser.',
    what_for_title: 'Ce à quoi sert l\'outil',
    what_for_body: 'L\'estimateur de séances de détatouage applique l\'échelle clinique publiée par les docteurs William Kirby et Alpesh Desai (Journal of Clinical and Aesthetic Dermatology, mars 2009). Il évalue six caractéristiques physiques du tatouage, ajuste selon la circulation et le mode de vie, projette les délais selon les intervalles en clinique, modélise la courbe d\'élimination biologique, calcule les coûts prévisionnels, fournit un guide des longueurs d\'onde, analyse la faisabilité d\'un recouvrement, structure les soins post-traitement et exporte les dossiers cliniques.',
    who_for_title: 'À qui s\'adresse cet outil',
    who_for_body: 'Cet outil s\'adresse à trois catégories d\'utilisateurs :\n* **Les clients de détatouage** : Toute personne prévoyant un détatouage laser cherchant une estimation objective du nombre de séances, du calendrier et des coûts.\n* **Les tatoueurs** : Les professionnels conseillant leurs clients sur l\'éclaircissement préalable nécessaire avant un tatouage de recouvrement.\n* **Les praticiens laser** : Les cliniciens recherchant un support transparent pour expliquer la vitesse d\'élimination et les soins post-traitement.',
    how_to_use_title: 'Comment utiliser l\'outil',
    sections: [
      {
        title: '1. Gérer plusieurs profils de tatouages',
        steps: [
          'Repérez `{profile_label}` en haut du calculateur.',
          'Cliquez sur `{profile_new_btn}` pour créer une fiche d\'évaluation dédiée à un nouveau tatouage (ex. "Avant-bras corbeau").',
          'Utilisez `{profile_rename_btn}` pour modifier l\'intitulé du tatouage actif.',
          'Cliquez sur `{profile_delete_btn}` pour supprimer le profil en cours. Chaque profil conserve ses propres scores cliniques, son mode de vie, ses listes de soins et ses photographies.'
        ]
      },
      {
        title: '2. Choisir la langue de l\'interface',
        steps: [
          'Ouvrez le menu `{lang_select_label}` dans l\'en-tête.',
          'Sélectionnez English, Español, Deutsch, Français, Italiano, Português ou Nederlands.',
          'Tous les libellés, unités et explications sont actualisés instantanément.'
        ]
      },
      {
        title: '3. Définir votre objectif de traitement',
        steps: [
          'Consultez `{goal_title}` en tête de formulaire.',
          'Sélectionnez `{goal_clearance_label}` pour une élimination complète (95 pour cent ou plus).',
          'Sélectionnez `{goal_coverup_label}` pour un éclaircissement partiel (50 à 70 pour cent d\'atténuation), nécessitant environ 55 à 65 pour cent des séances d\'un effacement total.'
        ]
      },
      {
        title: '4. Évaluer les six facteurs cliniques de Kirby-Desai',
        steps: [
          'Renseignez chaque caractéristique dans la section d\'évaluation clinique :',
          '* `{factor_skin_title}` : Choisissez votre phototype (1 à 6 points) directement ou à l\'aide des questions sur les coups de soleil et le bronzage.',
          '* `{factor_location_title}` : Choisissez la zone anatomique (1 à 5 points), de la tête et du cou aux mains et aux pieds.',
          '* `{factor_colour_title}` : Choisissez le groupe pigmentaire (1 à 4 points), du noir monochrome aux encres multicolores.',
          '* `{factor_density_title}` : Choisissez la saturation (1 à 4 points), des traits fins amateurs aux aplats tribaux denses.',
          '* `{factor_scarring_title}` : Évaluez le relief cutané (0 à 5 points), de la peau lisse aux cicatrices hypertrophiques prononcées.',
          '* `{factor_layering_title}` : Indiquez s\'il s\'agit d\'un recouvrement antérieur (0 point pour un tatouage d\'origine, 2 points pour un tatouage superposé).'
        ]
      },
      {
        title: '5. Prendre en compte la circulation et le mode de vie',
        steps: [
          'Sous `{lifestyle_title}`, indiquez vos paramètres physiologiques :',
          '* `{lifestyle_smoking_label}` : Le tabagisme actif entraîne une vasoconstriction cutanée qui accroît le nombre de séances d\'environ 30 pour cent.',
          '* `{lifestyle_exercise_label}` : L\'activité physique régulière stimule le drainage lymphatique et la mobilité des macrophages.',
          '* `{lifestyle_hydration_label}` : Une bonne hydratation quotidienne facilite l\'élimination immunitaire des particules d\'encre fragmentées.'
        ]
      },
      {
        title: '6. Personnaliser l\'espacement des séances, le tarif et les progrès',
        steps: [
          'Indiquez le délai entre séances dans `{param_interval_label}` (la norme clinique se situe entre 6 et 10 semaines).',
          'Indiquez le tarif par séance dans `{param_cost_label}` et choisissez votre symbole monétaire.',
          'Si le protocole a déjà débuté, cochez `{param_started_toggle}`.',
          'Renseignez les séances passées dans `{param_completed_label}` et l\'atténuation visuelle constatée dans `{param_faded_label}`.'
        ]
      },
      {
        title: '7. Calculer votre estimation et analyser les résultats',
        steps: [
          'Cliquez sur `{btn_calculate}`.',
          'Examinez les indicateurs clés : `{results_score_label}`, `{results_sessions_label}`, `{results_timeline_label}`, `{results_remaining_label}`, `{results_cost_label}` et `{results_dominant_intro}`.',
          'Consultez le tableau détaillé indiquant les points attribués à chaque critère ainsi que les formules de calcul.'
        ]
      },
      {
        title: '8. Interpréter la courbe d\'élimination biologique',
        steps: [
          'Faites défiler jusqu\'à `{trajectory_title}`.',
          'Consultez la courbe logarithmique illustrant le rythme prévisionnel d\'élimination de l\'encre au fil des séances.',
          'Comparez l\'éclaircissement constaté sur votre tatouage avec la trajectoire biologique de référence.'
        ]
      },
      {
        title: '9. Identifier les longueurs d\'onde adaptées aux pigments',
        steps: [
          'Consultez la section `{wavelength_title}`.',
          'Identifiez les longueurs d\'onde recommandées selon vos encres : 1064 nm pour le noir et le bleu foncé, 532 nm pour le rouge et les tons chauds, 755 nm ou 694 nm pour le vert et le bleu clair.',
          'Prenez connaissance de la mise en garde relative aux encres blanches contenant du dioxyde de titane (TiO2), sujettes au noircissement paradoxal.'
        ]
      },
      {
        title: '10. Évaluer la faisabilité d\'un recouvrement',
        steps: [
          'Cliquez sur `{coverup_toggle_btn}` pour faire apparaître la `{coverup_matrix_title}`.',
          'Consultez le tableau croisé indiquant quelles teintes neuves peuvent recouvrir efficacement l\'encre résiduelle.',
          'Vérifiez si le motif envisagé requiert une pose directe, 2 à 4 séances d\'éclaircissement préalable ou un effacement plus poussé.'
        ]
      },
      {
        title: '11. Établir le calendrier prévisionnel des rendez-vous',
        steps: [
          'Faites défiler jusqu\'à `{calendar_title}`.',
          'Renseignez la date de votre premier ou prochain passage dans `{calendar_start_date_label}`.',
          'Vérifiez les dates projetées selon votre intervalle de cicatrisation.',
          'Cliquez sur `{btn_export_ics}` pour télécharger un calendrier standard au format iCalendar.'
        ]
      },
      {
        title: '12. Suivre le protocole de soins post-traitement',
        steps: [
          'Accédez à `{aftercare_title}`.',
          'Cochez les soins requis pour `{aftercare_stage1_title}`, `{aftercare_stage2_title}` et `{aftercare_stage3_title}`.',
          'Suivez votre jauge de progression au fur et à mesure du refroidissement cutané, de la restauration épidermique et de la protection solaire.'
        ]
      },
      {
        title: '13. Consigner l\'historique et comparer les photographies',
        steps: [
          'Repérez `{fadelog_title}`.',
          'Renseignez `{fadelog_date_label}`, `{fadelog_rating_label}` et vos remarques dans `{fadelog_note_label}`.',
          'Cliquez sur `{photo_attach_btn}` pour sélectionner un cliché de suivi sur votre appareil.',
          'Cliquez sur `{fadelog_add_btn}` pour enregistrer. Cliquez sur `{photo_view_btn}` sur n\'importe quelle ligne pour comparer le cliché à la photo initiale de la séance 1.',
          'Utilisez `{fadelog_delete}` pour retirer une ligne obsolète.'
        ]
      },
      {
        title: '14. Sauvegarder, restaurer et exporter les données',
        steps: [
          'Sous `{backup_title}`, cliquez sur `{backup_export_json_btn}` pour sauvegarder tous vos profils, listes de soins et photos dans un fichier local.',
          'Cliquez sur `{backup_import_json_btn}` pour restaurer un fichier de sauvegarde.',
          'Cliquez sur `{backup_export_csv_btn}` pour exporter votre journal de séances au format tableur CSV.'
        ]
      },
      {
        title: '15. Préparer les questions en consultation et imprimer',
        steps: [
          'Passez en revue `{questions_title}` portant sur les tests cutanés, l\'espacement et la préparation d\'un recouvrement.',
          'Cliquez sur `{btn_print}` pour imprimer ou enregistrer en PDF une synthèse de consultation.'
        ]
      },
      {
        title: '16. Réinitialiser le formulaire',
        steps: [
          'Cliquez sur `{btn_reset}` pour effacer les champs actifs et revenir aux réglages de départ.'
        ]
      }
    ],
    not_do_title: 'Ce que l\'outil ne fait pas',
    not_do_body: '* Il n\'évalue pas la prédisposition individuelle aux cicatrices chéloïdes ou hypertrophiques. Pour évaluer ce risque avant un geste cutané, consultez le [Keloid Scar Risk Evaluator](https://poliinternational.com/keloid-scar-risk/).\n* Il n\'identifie pas la formule chimique exacte des encres, les numéros CAS ni la conformité au règlement européen REACH. Pour étudier les pigments, consultez l\'[Ink Ingredient Decoder](https://poliinternational.com/ink-ingredient-decoder/).\n* Il ne règle pas les appareils laser et ne paramètre pas les fluences énergétiques.\n* Il ne transmet aucun dossier médical et ne prend pas de rendez-vous en cabinet.',
    data_lives_title: 'Où résident vos données',
    data_lives_body: 'Toutes les données et photographies demeurent sur votre appareil local :\n* **Mémoire du navigateur** : Les saisies et plannings calculés restent en mémoire vive durant votre session.\n* **Stockage local du navigateur** : Les profils de tatouage, le journal des séances, le mode de vie et les listes de soins sont enregistrés dans le localStorage sous `poli_tattoo_profiles_v2`.\n* **Stockage photographique IndexedDB** : Les photographies d\'évolution sont compressées localement et conservées dans la base IndexedDB de votre navigateur (`PoliTattooPhotosDB`).\n* **Aucun transfert réseau** : L\'outil n\'émet aucune requête serveur et ne transmet aucune donnée à Poli International ni à aucun tiers.\n* **Sauvegarde autonome** : L\'export JSON permet de transférer l\'intégralité des dossiers d\'un appareil à un autre sans synchronisation cloud.',
    print_export_title: 'Impression et exportations',
    print_export_body: 'L\'outil propose plusieurs formats d\'exportation :\n1. **Imprimer la fiche de consultation** : Met en page les scores, les estimations, les longueurs d\'onde, les questions pour le praticien et le journal dans un document prêt à être imprimé ou sauvegardé en PDF.\n2. **Télécharger l\'échéancier .ics** : Génère un fichier iCalendar (RFC 5545) compatible avec les applications d\'agenda.\n3. **Sauvegarde complète (JSON)** : Archive l\'ensemble des profils, des listes de soins et des photographies de suivi.\n4. **Journal d\'atténuation (CSV)** : Exporte les dates, notes et évaluations pour analyse dans un tableur.',
    qa_title: 'Questions fréquentes',
    qas: [
      {
        q: 'Quelle est la fiabilité de l\'échelle de Kirby-Desai pour le détatouage ?',
        a: 'L\'échelle de Kirby-Desai est un modèle statistique validé par une étude clinique de 100 patients publiée en 2009. Dans cette cohorte, l\'échelle expliquait environ 80 pour cent de la variabilité observée. La réponse immunitaire, la composition des pigments et les lasers variant selon les individus, les résultats réels peuvent s\'écarter de la plage calculée.'
      },
      {
        q: 'Pourquoi faut-il espacer les séances de plusieurs semaines ?',
        a: 'Le laser ne vaporise pas l\'encre : il la fragmente sous l\'effet photoacoustique. Le système immunitaire a besoin de plusieurs semaines pour que les macrophages transportent ces microparticules vers le réseau lymphatique. Rapprocher excessivement les séances traumatise les tissus sans accélérer l\'élimination.'
      },
      {
        q: 'Pourquoi les tatouages sur les mains et les pieds s\'effacent-ils plus lentement ?',
        a: 'L\'évacuation des pigments dépend étroitement de la vascularisation et du drainage lymphatique local. La tête, le cou et le tronc disposent d\'un réseau capillaire dense qui draine l\'encre rapidement. Les mains, poignets, chevilles et pieds présentent une circulation périphérique plus réduite, ce qui ralentit notablement le travail des macrophages.'
      },
      {
        q: 'Combien de séances faut-il pour atténuer un tatouage avant recouvrement ?',
        a: 'Pour préparer un recouvrement, un éclaircissement de 50 à 70 pour cent suffit généralement. Cela demande environ 55 à 65 pour cent des séances nécessaires à une disparition totale. Il est indispensable de faire examiner la zone par votre tatoueur avant d\'interrompre les séances de laser.'
      },
      {
        q: 'Peut-on effacer les encres blanches ou pastel au laser ?',
        a: 'Les encres blanches et claires contiennent souvent du dioxyde de titane ou de l\'oxyde de fer. Sous l\'effet du rayonnement laser, ces oxydes subissent une réduction chimique appelée noircissement paradoxal, virant instantanément au noir ou au gris ardoise indélébile. Les praticiens effectuent couramment une touche d\'essai préalable sur un point discret.'
      },
      {
        q: 'Pourquoi le tabagisme augmente-t-il le nombre de séances de détatouage ?',
        a: 'Les études dermatologiques indiquent que le tabagisme diminue le taux de réussite à 10 séances d\'environ 70 pour cent. La nicotine entraîne une vasoconstriction cutanée qui restreint le débit sanguin dermique, ralentissant la mobilité des macrophages et l\'évacuation des débris pigmentaires.'
      },
      {
        q: 'Quelle longueur d\'onde utiliser pour un tatouage multicolore ?',
        a: 'Le rayonnement à 1064 nm est très efficace sur le noir et le bleu foncé mais n\'agit pas sur le vert ni le rouge. Le rouge exige une longueur d\'onde de 532 nm (laser KTP), tandis que le vert et le bleu ciel répondent aux lasers Alexandrite (755 nm) ou Rubis (694 nm). Les cabinets recourent donc souvent à des plateformes multilongueurs d\'onde.'
      },
      {
        q: 'Comment la courbe non linéaire modélise-t-elle l\'atténuation ?',
        a: 'L\'atténuation d\'un tatouage n\'est pas linéaire : les premières séances fragmentent les couches superficielles très chargées en produisant un contraste visuel marqué, tandis que l\'élimination des pigments plus profonds réclame un délai de clairance macrophage de plus en plus long. La courbe illustre ce profil logarithmique.'
      }
    ],
    limits_title: 'Limites de l\'outil',
    limits_body: 'L\'algorithme de Kirby-Desai constitue une référence pédagogique et non un diagnostic médical ni une garantie de résultat. L\'outil ne peut mesurer l\'activité immunitaire individuelle, la vitesse de transit des macrophages ni le métabolisme du patient. Il ne détermine pas la composition exacte des encres, leur profondeur d\'insertion ni la dextérité du praticien. Les choix de paramétrage laser, d\'essais préalables et de calendrier appartiennent exclusivement au patient et à son praticien qualifié lors d\'une consultation en cabinet.'
  }
};

// Copy structure for it, de, es, nl, pt
guideData.it = {
  title: 'Stimatore delle sedute di rimozione tatuaggi: guida per l\'utente',
  intro: 'Lo stimatore delle sedute di rimozione tatuaggi calcola il numero stimato di sedute laser, i tempi clinici e i costi previsti in base alla scala pubblicata di Kirby-Desai per clienti, tatuatori e specialisti del laser.',
  what_for_title: 'A cosa serve',
  what_for_body: 'Lo stimatore applica la scala di punteggio clinico pubblicata dal Dr. William Kirby e dal Dr. Alpesh Desai (Journal of Clinical and Aesthetic Dermatology, marzo 2009). Valuta sei caratteristiche fisiche del tatuaggio, corregge il calcolo in base a circolazione e stile di vita, proietta le tempistiche in base all\'intervallo tra le sedute, modella la curva di eliminazione biologica, calcola i costi stimati, guida nella scelta della lunghezza d\'onda laser, valuta la fattibilità di una copertura, organizza la cura post-trattamento ed esporta la documentazione clinica.',
  who_for_title: 'A chi si rivolge',
  who_for_body: 'Questo strumento serve a tre categorie di utenti:\n* **Clienti del laser**: Chiunque intenda rimuovere un tatuaggio e cerchi stime obiettive su sedute, tempistiche e costi.\n* **Tatuatori**: Professionisti che consigliano i clienti sul livello di schiaritura preliminare necessario prima di realizzare una copertura.\n* **Operatori laser**: Clinici che necessitano di uno strumento trasparente per spiegare la velocità di eliminazione e i protocolli di cura.',
  how_to_use_title: 'Come si usa',
  sections: [
    {
      title: '1. Gestione di più profili di tatuaggi',
      steps: [
        'Individua `{profile_label}` nella parte superiore del calcolatore.',
        'Fai clic su `{profile_new_btn}` per creare una scheda di valutazione separata per un nuovo tatuaggio (es. "Avambraccio corvo").',
        'Usa `{profile_rename_btn}` per aggiornare il nome della valutazione attiva.',
        'Fai clic su `{profile_delete_btn}` per eliminare il profilo corrente. Ciascun profilo conserva i propri punteggi clinici, lo stile di vita, la lista di controllo per la cura e le fotografie.'
      ]
    },
    {
      title: '2. Selezione della lingua dell\'interfaccia',
      steps: [
        'Apri il menu `{lang_select_label}` nell\'intestazione.',
        'Seleziona English, Español, Deutsch, Français, Italiano, Português o Nederlands.',
        'Tutte le etichette dell\'interfaccia si aggiornano immediatamente.'
      ]
    },
    {
      title: '3. Impostazione dell\'obiettivo del trattamento',
      steps: [
        'Consulta `{goal_title}` in cima al modulo.',
        'Seleziona `{goal_clearance_label}` per l\'eliminazione completa (95 per cento o superiore).',
        'Seleziona `{goal_coverup_label}` per uno schiarimento parziale (dal 50 al 70 per cento di sbiadimento), che richiede circa il 55-65 per cento delle sedute totali.'
      ]
    },
    {
      title: '4. Punteggio dei sei fattori clinici di Kirby-Desai',
      steps: [
        'Nella sezione di valutazione clinica, compila ciascuna caratteristica:',
        '* `{factor_skin_title}`: Seleziona direttamente il fototipo (da 1 a 6 punti) o utilizza le domande guidate su eritema e abbronzatura.',
        '* `{factor_location_title}`: Seleziona la regione corporea (da 1 a 5 punti), dalla testa e collo alle mani e piedi.',
        '* `{factor_colour_title}`: Seleziona il gruppo di pigmenti (da 1 a 4 punti), dal nero monocolore agli inchiostri multicolore.',
        '* `{factor_density_title}`: Seleziona la saturazione (da 1 a 4 punti), da linee amatoriali a riempimenti tribali compatti.',
        '* `{factor_scarring_title}`: Valuta la consistenza cutanea (da 0 a 5 punti), dalla pelle liscia a cicatrici ipertrofiche evidenti.',
        '* `{factor_layering_title}`: Indica se l\'inchiostro copre un lavoro precedente (0 punti per tatuaggi originali, 2 punti per coperture).'
      ]
    },
    {
      title: '5. Considerazione di circolazione e stile di vita',
      steps: [
        'In `{lifestyle_title}`, seleziona i parametri fisiologici:',
        '* `{lifestyle_smoking_label}`: Il fumo attivo provoca vasocostrizione cutanea, richiedendo circa il 30 per cento di sedute in più.',
        '* `{lifestyle_exercise_label}`: L\'attività fisica regolare stimola il flusso linfatico e la mobilità dei macrofagi.',
        '* `{lifestyle_hydration_label}`: Una corretta idratazione giornaliera agevola l\'eliminazione immunitaria delle particelle frammentate.'
      ]
    },
    {
      title: '6. Personalizzazione di intervallo, tariffa e progressi',
      steps: [
        'Inserisci l\'intervallo tra le visite in `{param_interval_label}` (lo standard clinico è tra 6 e 10 settimane).',
        'Inserisci il costo per seduta in `{param_cost_label}` e imposta il simbolo di valuta.',
        'Se il ciclo è già iniziato, seleziona `{param_started_toggle}`.',
        'Indica le visite già sostenute in `{param_completed_label}` e la schiaritura visiva stimata in `{param_faded_label}`.'
      ]
    },
    {
      title: '7. Calcolo della stima ed esame dei risultati',
      steps: [
        'Fai clic su `{btn_calculate}`.',
        'Analizza i parametri previsti: `{results_score_label}`, `{results_sessions_label}`, `{results_timeline_label}`, `{results_remaining_label}`, `{results_cost_label}` e `{results_dominant_intro}`.',
        'Esamina la tabella dettagliata che riporta i punti di ciascun fattore e le formule applicate.'
      ]
    },
    {
      title: '8. Interpretazione della curva biologica di eliminazione',
      steps: [
        'Scorri fino a `{trajectory_title}`.',
        'Osserva la curva logaritmica che illustra il ritmo con cui l\'inchiostro viene smaltito nel susseguirsi delle sedute.',
        'Confronta i progressi effettivi del tuo tatuaggio con la curva biologica di riferimento.'
      ]
    },
    {
      title: '9. Scelta della lunghezza d\'onda laser per cromoforo',
      steps: [
        'Esamina la sezione `{wavelength_title}`.',
        'Verifica le lunghezze d\'onda raccomandate per i tuoi inchiostri: 1064 nm per nero e blu scuro, 532 nm per rosso e toni caldi, 755 nm o 694 nm per verde e azzurro.',
        'Nota l\'avvertenza clinica per gli inchiostri bianchi contenenti biossido di titanio (TiO2), soggetti a scurimento paradosso.'
      ]
    },
    {
      title: '10. Valutazione della fattibilità della copertura',
      steps: [
        'Fai clic su `{coverup_toggle_btn}` per mostrare la `{coverup_matrix_title}`.',
        'Consulta la tabella di corrispondenza per scoprire quali nuove tonalità coprono in modo efficace l\'inchiostro residuo.',
        'Scopri se il nuovo tatuaggio richiede copertura diretta, da 2 a 4 sedute di schiaritura o una rimozione più marcata.'
      ]
    },
    {
      title: '11. Generazione del calendario degli appuntamenti',
      steps: [
        'Scorri fino a `{calendar_title}`.',
        'Imposta la data della prima o prossima seduta in `{calendar_start_date_label}`.',
        'Verifica le date stimate in base all\'intervallo prescelto.',
        'Fai clic su `{btn_export_ics}` per scaricare il file calendario in formato standard iCalendar.'
      ]
    },
    {
      title: '12. Guida alla cura post-trattamento per fasi',
      steps: [
        'Trova la sezione `{aftercare_title}`.',
        'Spunta le azioni completate nelle sezioni `{aftercare_stage1_title}`, `{aftercare_stage2_title}` e `{aftercare_stage3_title}`.',
        'Segui la barra di avanzamento man mano che completi la dissipazione termica, il ripristino cutaneo e la protezione dai raggi solari.'
      ]
    },
    {
      title: '13. Registro delle sedute e confronto fotografico',
      steps: [
        'Trova `{fadelog_title}`.',
        'Inserisci `{fadelog_date_label}`, `{fadelog_rating_label}` e le note in `{fadelog_note_label}`.',
        'Fai clic su `{photo_attach_btn}` per allegare una foto di controllo presente sul dispositivo.',
        'Fai clic su `{fadelog_add_btn}` per salvare. Premi `{photo_view_btn}` su qualsiasi riga per confrontare la foto con quella iniziale della prima seduta.',
        'Usa `{fadelog_delete}` per eliminare qualsiasi voce non più necessaria.'
      ]
    },
    {
      title: '14. Backup, ripristino ed esportazione dei dati',
      steps: [
        'In `{backup_title}`, fai clic su `{backup_export_json_btn}` per salvare tutti i profili, le cure e le fotografie in un file locale.',
        'Fai clic su `{backup_import_json_btn}` per ripristinare un archivio salvato.',
        'Fai clic su `{backup_export_csv_btn}` per esportare il diario delle sedute in formato foglio di calcolo CSV.'
      ]
    },
    {
      title: '15. Domande per la visita e stampa della scheda',
      steps: [
        'Rileggi `{questions_title}` riguardanti test cutanei, intervalli tra sedute e preparazione alla copertura.',
        'Fai clic su `{btn_print}` per stampare o salvare in formato PDF il promemoria di consultazione.'
      ]
    },
    {
      title: '16. Ripristino del modulo',
      steps: [
        'Fai clic su `{btn_reset}` per azzerare i campi compilati e ripristinare i valori iniziali.'
      ]
    }
  ],
  not_do_title: 'Cosa non fa lo strumento',
  not_do_body: '* Non valuta la predisposizione individuale a cicatrici cheloidi o ipertrofiche. Per analizzare questo rischio prima di procedure cutanee, consulta il [Keloid Scar Risk Evaluator](https://poliinternational.com/keloid-scar-risk/).\n* Non determina la composizione chimica esatta degli inchiostri, i numeri CAS o la conformità al regolamento europeo REACH. Per analizzare i pigmenti, consulta l\'[Ink Ingredient Decoder](https://poliinternational.com/ink-ingredient-decoder/).\n* Non calibra le apparecchiature laser né regola le densità di energia erogata.\n* Non trasmette dati clinici né prenota appuntamenti presso gli studi.',
  data_lives_title: 'Dove risiedono i tuoi dati',
  data_lives_body: 'Tutti i dati, le valutazioni e le fotografie rimangono sul tuo dispositivo:\n* **Memoria del browser**: I campi compilati e gli orari stimati restano in memoria solo durante la sessione di utilizzo.\n* **Memoria locale del browser**: I profili dei tatuaggi, il diario delle sedute, lo stile di vita e i controlli post-trattamento sono salvati nel localStorage sotto `poli_tattoo_profiles_v2`.\n* **Archivio fotografico IndexedDB**: Le immagini di monitoraggio vengono compresse in locale e conservate nel database IndexedDB del tuo browser (`PoliTattooPhotosDB`).\n* **Nessun invio di rete**: Lo strumento non effettua chiamate a server esterni e non invia alcun dato a Poli International né a terzi.\n* **Portabilità tramite backup**: Il file JSON consente di spostare l\'intero archivio tra dispositivi diversi senza richiedere sincronizzazioni cloud.',
  print_export_title: 'Stampa ed esportazione',
  print_export_body: 'Lo strumento prevede differenti formati di esportazione:\n1. **Stampa scheda di consultazione**: Raccoglie punteggi, stime, note sulle lunghezze d\'onda, quesiti clinici e diario in un documento pronto per la stampa o il salvataggio in PDF.\n2. **Scarica pianificazione .ics**: Crea un file iCalendar (RFC 5545) compatibile con i programmi di gestione degli appuntamenti.\n3. **Backup completo (JSON)**: Archivia tutti i profili, le schede di cura e le immagini di monitoraggio.\n4. **Diario di sbiadimento (CSV)**: Esporta date, voti e note cliniche per l\'analisi su foglio elettronico.',
  qa_title: 'Domande frequenti',
  qas: [
    {
      q: 'Quanto è accurata la scala di Kirby-Desai nella rimozione dei tatuaggi ?',
      a: 'La scala di Kirby-Desai è un modello statistico derivato da uno studio clinico su 100 pazienti pubblicato nel 2009. Nel gruppo esaminato spiegava circa l\'80 per cento della variabilità clinica. Poiché la risposta immunitaria, la chimica degli inchiostri e le caratteristiche del laser variano caso per caso, i risultati effettivi possono differire dall\'intervallo teorico.'
    },
    {
      q: 'Perché le sedute di rimozione devono essere distanziate di varie settimane ?',
      a: 'Il laser frammenta l\'inchiostro per via fotoacustica senza vaporizzarlo. Il sistema immunitario richiede diverse settimane per permettere ai macrofagi di trasportare queste particelle microscopiche verso la rete linfatica. Ravvicinare eccessivamente le sedute crea traumi cutanei senza accelerare l\'eliminazione del pigmento.'
    },
    {
      q: 'Per quale motivo i tatuaggi su mani e piedi richiedono più tempo per scomparire ?',
      a: 'Lo smaltimento dell\'inchiostro dipende dal microcircolo sanguigno e dal drenaggio linfatico regionale. La testa, il collo e il busto presentano una fitta rete vascolare che agevola l\'eliminazione rapida. Le estremità distali come mani, polsi, caviglie e piedi hanno un flusso periferico ridotto, rallentando l\'attività dei macrofagi.'
    },
    {
      q: 'Quante sedute servono per schiarire un tatuaggio prima di una copertura ?',
      a: 'Per preparare una nuova copertura è generalmente sufficiente una schiaritura compresa tra il 50 e il 70 per cento. Ciò richiede indicativamente il 55-65 per cento delle sedute necessarie per la rimozione completa. È opportuno far valutare l\'area dal proprio tatuatore di fiducia prima dell\'ultima seduta laser.'
    },
    {
      q: 'Gli inchiostri bianchi o pastello possono essere rimossi con il laser ?',
      a: 'Gli inchiostri bianchi e pastello contengono frequentemente biossido di titanio o ossido di ferro. Sotto il fascio laser questi componenti possono ossidarsi rapidamente con una reazione definita scurimento paradosso, trasformando il pigmento in grigio scuro o nero permanente. Gli operatori eseguono di norma uno spot di prova prima di trattare superfici ampie.'
    },
    {
      q: 'In che modo il fumo influisce sul numero di sedute necessarie ?',
      a: 'Studi clinici dimostrano che il fumo riduce l\'efficacia dello schiarimento a 10 sedute di circa il 70 per cento. La nicotina induce vasocostrizione dermica e riduce l\'apporto ematico cutaneo, ostacolando l\'attività dei macrofagi e rallentando il trasporto dei residui di inchiostro.'
    },
    {
      q: 'Quale lunghezza d\'onda serve per tatuaggi con più colori ?',
      a: 'La lunghezza d\'onda a 1064 nm agisce con efficacia su nero e blu scuro ma non interagisce con verde e rosso. Il rosso richiede i 532 nm di un laser KTP, mentre il verde e l\'azzurro rispondono a laser ad Alessandrite (755 nm) o Rubino (694 nm). I centri specializzati utilizzano sistemi laser a più lunghezze d\'onda.'
    },
    {
      q: 'In che modo la curva non lineare rappresenta l\'eliminazione dell\'inchiostro ?',
      a: 'Lo sbiadimento di un tatuaggio non segue un andamento lineare : le prime sedute disperdono l\'inchiostro superficiale denso dando un forte impatto visivo iniziale, mentre la rimozione dei pigmenti situati più in profondità richiede tempi di transito macrofagico progressivamente più lunghi. La curva illustra questo andamento logaritmico.'
    }
  ],
  limits_title: 'Limiti dello strumento',
  limits_body: 'L\'algoritmo Kirby-Desai è una guida informativa e non costituisce diagnosi medica né garanzia di risultato. Lo strumento non misura la risposta immunitaria individuale, la velocità dei macrofagi né il metabolismo del paziente. Non determina l\'esatta formulazione degli inchiostri né l\'esperienza tecnica dell\'operatore. Qualsiasi decisione inerente a parametri del laser, patch test, tempi di riposo e protocolli di cura spetta unicamente al cliente e al medico o operatore abilitato in sede di visita specialistica.'
};

// Now build de, es, nl, pt similarly
guideData.de = {
  title: 'Laser-Tattooentfernung Sitzungsrechner: Benutzerhandbuch',
  intro: 'Der Sitzungsrechner für Tattooentfernung kalkuliert geschätzte Sitzungsspannen, Behandlungszeiträume und Kosten auf Grundlage der veröffentlichten Kirby-Desai-Skala für Tattoo-Kunden, Tätowierer und Laserspezialisten.',
  what_for_title: 'Wofür das Werkzeug dient',
  what_for_body: 'Dieser Rechner wendet die von Dr. William Kirby und Dr. Alpesh Desai veröffentlichte Skala an (Journal of Clinical and Aesthetic Dermatology, März 2009). Er bewertet sechs körperliche Merkmale des Tattoos, berücksichtigt Durchblutung und Lebensgewohnheiten, berechnet Behandlungsdauern anhand von Sitzungsintervallen, stellt biologische Abbaukurven dar, ermittelt voraussichtliche Gesamtkosten, gibt Empfehlungen für Laser-Wellenlängen, analysiert Cover-up-Möglichkeiten, strukturiert die Nachsorge und exportiert Unterlagen.',
  who_for_title: 'Für wen das Werkzeug bestimmt ist',
  who_for_body: 'Dieses Werkzeug richtet sich an drei Zielgruppen:\n* **Tattoo-Kunden**: Personen vor einer Laserbehandlung, die objektive Richtwerte für Sitzungsanzahl, Zeitplan und Budget suchen.\n* **Tätowierer**: Kunstschaffende, die Kunden hinsichtlich der nötigen Voraufhellung vor einem Cover-up beraten.\n* **Laser-Fachkräfte**: Behandelnde, die ein sachliches Informationswerkzeug zur Veranschaulichung von Abbauraten und Pflegehinweisen benötigen.',
  how_to_use_title: 'Bedienungsanleitung',
  sections: [
    {
      title: '1. Mehrere Tattoo-Profile verwalten',
      steps: [
        'Suchen Sie `{profile_label}` ganz oben im Rechner.',
        'Klicken Sie auf `{profile_new_btn}`, um ein eigenes Profil für ein neues Tattoo anzulegen (z. B. "Unterarm Rabe").',
        'Verwenden Sie `{profile_rename_btn}`, um die Bezeichnung des aktiven Tattoos zu bearbeiten.',
        'Klicken Sie auf `{profile_delete_btn}`, um das Profil zu entfernen. Jedes Profil speichert eigene klinische Faktoren, Lebensgewohnheiten, Nachsorge-Listen und Fortschrittsfotos.'
      ]
    },
    {
      title: '2. Auswählen der Sprache',
      steps: [
        'Öffnen Sie das Menü `{lang_select_label}` in der Kopfzeile.',
        'Wählen Sie English, Español, Deutsch, Français, Italiano, Português oder Nederlands.',
        'Alle Beschriftungen und Einheiten werden ohne Verzögerung umgestellt.'
      ]
    },
    {
      title: '3. Behandlungsziel festlegen',
      steps: [
        'Prüfen Sie `{goal_title}` oben im Formular.',
        'Wählen Sie `{goal_clearance_label}` für die vollständige Entfernung (95 Prozent oder mehr).',
        'Wählen Sie `{goal_coverup_label}` für eine Teilaufhellung (50 bis 70 Prozent Verblassung), wofür in der Regel 55 bis 65 Prozent der Gesamtsitzungen genügen.'
      ]
    },
    {
      title: '4. Bewertung der sechs Kirby-Desai-Faktoren',
      steps: [
        'Geben Sie die Eigenschaften im Bewertungsabschnitt an:',
        '* `{factor_skin_title}`: Wählen Sie den Hauttyp (1 bis 6 Punkte) direkt aus oder nutzen Sie die Fragen zu Sonnenbrand und Bräunung.',
        '* `{factor_location_title}`: Wählen Sie die Körperstelle (1 bis 5 Punkte), von Kopf und Hals bis zu Händen und Füßen.',
        '* `{factor_colour_title}`: Wählen Sie die Farbzusammensetzung (1 bis 4 Punkte), von reinem Schwarz bis zu mehrfarbigen Pigmenten.',
        '* `{factor_density_title}`: Wählen Sie die Farbdichte (1 bis 4 Punkte), von feinen Laien-Linien bis zu tiefen Tribals.',
        '* `{factor_scarring_title}`: Beurteilen Sie die Hautbeschaffenheit (0 bis 5 Punkte), von glatter Haut bis zu ausgeprägten Narben.',
        '* `{factor_layering_title}`: Geben Sie an, ob ein älteres Tattoo überstochen wurde (0 Punkte für Originaltattoos, 2 Punkte für Cover-ups).'
      ]
    },
    {
      title: '5. Durchblutung und Lebensgewohnheiten einbeziehen',
      steps: [
        'Wählen Sie unter `{lifestyle_title}` Ihre körperlichen Faktoren:',
        '* `{lifestyle_smoking_label}`: Regelmäßiges Rauchen führt zu Gefäßverengungen in der Haut und erhöht die Sitzungsanzahl um etwa 30 Prozent.',
        '* `{lifestyle_exercise_label}`: Körperliche Bewegung regt das Lymphsystem und den Abtransport durch Fresszellen an.',
        '* `{lifestyle_hydration_label}`: Ausreichende Flüssigkeitszufuhr unterstützt den Abbau zerteilter Farbpigmente.'
      ]
    },
    {
      title: '6. Behandlungsabstände, Preise und bisherige Sitzungen anpassen',
      steps: [
        'Tragen Sie den Wochenabstand in `{param_interval_label}` ein (üblich sind 6 bis 10 Wochen).',
        'Geben Sie den Sitzungspreis in `{param_cost_label}` ein und wählen Sie das Währungszeichen.',
        'Falls die Behandlung bereits läuft, markieren Sie `{param_started_toggle}`.',
        'Tragen Sie absolvierte Sitzungen in `{param_completed_label}` und die beobachtete Aufhellung in `{param_faded_label}` ein.'
      ]
    },
    {
      title: '7. Schätzung berechnen und Ergebnisse prüfen',
      steps: [
        'Klicken Sie auf `{btn_calculate}`.',
        'Prüfen Sie die Kennzahlen: `{results_score_label}`, `{results_sessions_label}`, `{results_timeline_label}`, `{results_remaining_label}`, `{results_cost_label}` und `{results_dominant_intro}`.',
        'Sehen Sie sich die Punktetabelle mit den Werten und Berechnungsformeln an.'
      ]
    },
    {
      title: '8. Biologische Abbaukurve verstehen',
      steps: [
        'Scrollen Sie zu `{trajectory_title}`.',
        'Betrachten Sie die logarithmische Kurve, die den Verlauf der Pigmentausscheidung über die Sitzungen darstellt.',
        'Vergleichen Sie den tatsächlichen Fortschritt Ihres Tattoos mit der biologischen Referenzlinie.'
      ]
    },
    {
      title: '9. Laser-Wellenlängen nach Farbpigmenten auswählen',
      steps: [
        'Prüfen Sie den Abschnitt `{wavelength_title}`.',
        'Sehen Sie nach, welche Wellenlängen zu Ihren Farben passen: 1064 nm für Schwarz und Dunkelblau, 532 nm für Rot und warme Farbtöne, 755 nm oder 694 nm für Grün und Hellblau.',
        'Beachten Sie den Warnhinweis zu weißer Farbe mit Titandioxid (TiO2), die paradox nachdunkeln kann.'
      ]
    },
    {
      title: '10. Machbarkeit für Cover-ups beurteilen',
      steps: [
        'Klicken Sie auf `{coverup_toggle_btn}`, um die `{coverup_matrix_title}` einzublenden.',
        'Überprüfen Sie in der Matrix, welche neuen Farben alte Restpigmente zuverlässig überdecken können.',
        'Erkennen Sie, ob das neue Wunschmotiv sofort gestochen werden kann, 2 bis 4 Lasersitzungen benötigt oder eine weitgehende Entfernung erfordert.'
      ]
    },
    {
      title: '11. Terminplan als Kalender erstellen',
      steps: [
        'Gehen Sie zu `{calendar_title}`.',
        'Geben Sie das Datum der nächsten Sitzung unter `{calendar_start_date_label}` an.',
        'Prüfen Sie die errechneten Termine basierend auf Ihrem Behandlungsintervall.',
        'Klicken Sie auf `{btn_export_ics}`, um die Termine im iCalendar-Format herunterzuladen.'
      ]
    },
    {
      title: '12. Klinische Nachsorge-Checkliste anwenden',
      steps: [
        'Rufen Sie `{aftercare_title}` auf.',
        'Haken Sie die Aufgaben in `{aftercare_stage1_title}`, `{aftercare_stage2_title}` und `{aftercare_stage3_title}` ab.',
        'Beobachten Sie den Fortschrittsbalken bei Kühlen, Hautreparatur und Sonnenschutz.'
      ]
    },
    {
      title: '13. Behandlungsverlauf dokumentieren und Fotos vergleichen',
      steps: [
        'Öffnen Sie `{fadelog_title}`.',
        'Tragen Sie `{fadelog_date_label}`, `{fadelog_rating_label}` sowie Beobachtungen in `{fadelog_note_label}` ein.',
        'Klicken Sie auf `{photo_attach_btn}`, um ein Verlaufsfoto von Ihrem Gerät auszuwählen.',
        'Klicken Sie auf `{fadelog_add_btn}`, um den Eintrag zu speichern. Mit `{photo_view_btn}` in einer Zeile vergleichen Sie das Foto direkt mit der Ausgangsaufnahme vor Sitzung 1.',
        'Über `{fadelog_delete}` können Sie Einträge wieder löschen.'
      ]
    },
    {
      title: '14. Daten sichern, wiederherstellen und exportieren',
      steps: [
        'Klicken Sie unter `{backup_title}` auf `{backup_export_json_btn}`, um alle Profile, Listen und Fotos lokal abzuspeichern.',
        'Nutzen Sie `{backup_import_json_btn}`, um eine gesicherte Datei einzulesen.',
        'Klicken Sie auf `{backup_export_csv_btn}`, um das Sitzungsprotokoll als CSV-Tabelle für Tabellenprogramme zu exportieren.'
      ]
    },
    {
      title: '15. Fragen für das Beratungsgespräch und Ausdruck',
      steps: [
        'Gehen Sie `{questions_title}` zu Probelasern, Behandlungsintervallen und Cover-up-Vorbereitung durch.',
        'Klicken Sie auf `{btn_print}`, um die Zusammenfassung auszudrucken oder als PDF zu speichern.'
      ]
    },
    {
      title: '16. Eingaben zurücksetzen',
      steps: [
        'Klicken Sie auf `{btn_reset}`, um alle Felder zu leeren und auf die Anfangswerte zurückzusetzen.'
      ]
    }
  ],
  not_do_title: 'Was das Werkzeug nicht leisten kann',
  not_do_body: '* Es beurteilt keine Veranlagung zu Wulstnarben oder Keloiden. Nutzen Sie vor Hautbehandlungen bei Bedarf den [Keloid Scar Risk Evaluator](https://poliinternational.com/keloid-scar-risk/).\n* Es analysiert weder exakte chemische Farbrezepturen noch CAS-Nummern oder EU-REACH-Grenzwerte. Zur Prüfung von Tattoofarben nutzen Sie den [Ink Ingredient Decoder](https://poliinternational.com/ink-ingredient-decoder/).\n* Es stellt keine Lasergeräte ein und reguliert keine Energiedichten.\n* Es übermittelt keine medizinischen Daten und bucht keine Praxistermine.',
  data_lives_title: 'Speicherort Ihrer Daten',
  data_lives_body: 'Alle Daten und Fotos verbleiben ausschließlich auf Ihrem eigenen Gerät:\n* **Arbeitsspeicher**: Eingaben und Termine liegen während der Nutzung im Arbeitsspeicher des Browsers.\n* **Lokaler Speicher**: Tattoo-Profile, Verlaufsprotokolle, Lebensgewohnheiten und Nachsorge-Stände werden im localStorage unter `poli_tattoo_profiles_v2` hinterlegt.\n* **IndexedDB-Fotospeicher**: Verlaufsfotos werden lokal komprimiert und in der IndexedDB-Datenbank Ihres Browsers abgelegt (`PoliTattooPhotosDB`).\n* **Keine Netzübertragung**: Das Tool sendet keinerlei Daten über das Netzwerk an Poli International oder sonstige Dritte.\n* **Vollständige Datensicherung**: Der JSON-Export erlaubt den manuellen Transfer zwischen Geräten ohne Cloud-Dienste.',
  print_export_title: 'Drucken und Dateiexport',
  print_export_body: 'Das Programm bietet mehrere Exportwege:\n1. **Beratungsbogen drucken**: Bereitet Punkte, Sitzungsspannen, Wellenlängenhinweise, Fragen an die Praxis und Verlaufseinträge für Ausdruck oder PDF auf.\n2. **Terminplan herunterladen (.ics)**: Erstellt eine Standard-iCalendar-Datei (RFC 5545) für gängige Kalenderprogramme.\n3. **Vollständiges Backup (JSON)**: Sichert alle Profile, Nachsorge-Listen und Fortschrittsbilder.\n4. **Verlaufsprotokoll (CSV)**: Exportiert Termine, Notizen und Bewertungen für Tabellenkalkulationen.',
  qa_title: 'Häufig gestellte Fragen',
  qas: [
    {
      q: 'Wie verlässlich ist die Kirby-Desai-Skala für die Tattooentfernung ?',
      a: 'Die Kirby-Desai-Skala ist ein statistisches Modell, das auf einer 2009 veröffentlichten wissenschaftlichen Untersuchung mit 100 Patienten beruht. In dieser Gruppe erklärte das System rund 80 Prozent der Ergebnisunterschiede. Da Immunsystem, Farbstoffzusammensetzung und Lasertechnik variieren, können reale Behandlungsabläufe von den Rechenwerten abweichen.'
    },
    {
      q: 'Warum müssen zwischen den Lasersitzungen mehrere Wochen Pause liegen ?',
      a: 'Der Laser verdampft Farbpigmente nicht, sondern zerkleinert sie durch Druckwellen. Die körpereigene Abwehr benötigt viele Wochen, damit Fresszellen die Bruchstücke über das Lymphsystem abtransportieren können. Zu kurze Abstände schädigen das Gewebe, ohne den Abbau zu beschleunigen.'
    },
    {
      q: 'Warum lassen sich Tattoos an Händen und Füßen langsamer entfernen ?',
      a: 'Der Abtransport von Farbresten hängt von der regionalen Durchblutung und dem Lymphfluss ab. Kopf, Hals und Rumpf verfügen über ein dichtes Gefäßnetzwerk, das Partikel zügig aufnimmt. Hände, Handgelenke, Knöchel und Füße weisen eine schwächere Durchblutung auf, weshalb Makrophagen dort deutlich langsamer arbeiten.'
    },
    {
      q: 'Wie viele Sitzungen sind nötig, um ein Tattoo für ein Cover-up aufzuhellen ?',
      a: 'Für ein erfolgreiches Überstechen reicht meist eine Aufhellung um 50 bis 70 Prozent. Dafür werden in der Regel etwa 55 bis 65 Prozent der Sitzungen einer Totalentfernung benötigt. Stimmen Sie den Aufhellungsgrad rechtzeitig mit dem tätowierenden Künstler ab.'
    },
    {
      q: 'Können weiße oder pastellfarbene Pigmente mit dem Laser entfernt werden ?',
      a: 'Weiße und helle Tattoofarben enthalten häufig Titandioxid oder Eisenoxide. Diese Verbindungen können unter Laserbeschuss schlagartig oxidieren und dauerhaft grau oder schwarz werden (paradoxe Verdunkelung). Fachkräfte führen an solchen Stellen vorab einen Probelaserschuss durch.'
    },
    {
      q: 'Warum erhöht Rauchen die Anzahl der erforderlichen Sitzungen ?',
      a: 'Dermatologische Studien zeigen, dass Rauchen die Erfolgsquote nach 10 Sitzungen um etwa 70 Prozent senken kann. Nikotin verengt die feinen Hautgefäße, drosselt den Blutfluss und bremst die Fresszellen beim Abtransport der Pigmentreste aus.'
    },
    {
      q: 'Welche Laser-Wellenlänge wird für bunte Tattoos benötigt ?',
      a: 'Die Wellenlänge von 1064 nm wirkt zuverlässig bei Schwarz und Dunkelblau, erreicht Grün oder Rot jedoch nicht. Rot verlangt 532 nm (KTP-Laser), während Grün und Hellblau am besten auf 755 nm (Alexandrit) oder 694 nm (Rubin) ansprechen. Viele Praxen nutzen daher Kombinationssysteme.'
    },
    {
      q: 'Wie stellt die nichtlineare Kurve den Verblassungsvorgang dar ?',
      a: 'Das Verblassen verläuft nicht gleichmäßig: Die ersten Behandlungen zertrümmern dicht gepackte oberflächliche Pigmente mit sichtbarem Anfangserfolg, während tiefere Reste zunehmend längere Transportzeiten erfordern. Die Kurve spiegelt dieses logarithmische Verhalten wider.'
    }
  ],
  limits_title: 'Grenzen des Werkzeugs',
  limits_body: 'Das Kirby-Desai-Verfahren dient zur allgemeinen Orientierung und stellt weder eine medizinische Diagnose noch ein Behandlungsversprechen dar. Das System kann weder die individuelle Immunaktivität noch die Transportgeschwindigkeit der Makrophagen oder den Stoffwechsel erfassen. Es kennt weder die exakte Rezeptur der Farbstoffe noch die Erfahrung der behandelnden Fachkraft. Sämtliche Entscheidungen zu Geräteeinstellungen, Probetests, Pausen und Hautpflege müssen im persönlichen Fachgespräch mit qualifiziertem Fachpersonal getroffen werden.'
};

// es, nl, pt
guideData.es = {
  title: 'Estimador de sesiones de eliminación de tatuajes: guía del usuario',
  intro: 'El estimador de sesiones de eliminación de tatuajes calcula rangos de sesiones de láser, plazos clínicos y costes estimados basados en la escala publicada de Kirby-Desai para usuarios, tatuadores y especialistas en láser.',
  what_for_title: 'Para qué sirve',
  what_for_body: 'El estimador aplica la escala de puntuación clínica publicada por los doctores William Kirby y Alpesh Desai (Journal of Clinical and Aesthetic Dermatology, marzo de 2009). Evalúa seis características físicas del tatuaje, ajusta el resultado según la circulación y el estilo de vida, proyecta los plazos a partir de los intervalos de consulta, modela curvas de aclaramiento biológico, calcula costes aproximados, ofrece pautas de longitudes de onda láser, valora la viabilidad de un cover-up, organiza el cuidado posterior y permite exportar historiales clínicos.',
  who_for_title: 'A quién va dirigido',
  who_for_body: 'Esta herramienta atiende a tres colectivos:\n* **Clientes de láser**: Personas que planean eliminar un tatuaje y buscan estimaciones objetivas sobre sesiones, plazos y presupuesto.\n* **Tatuadores**: Profesionales que asesoran a sus clientes sobre el aclarado previo necesario antes de un tatuaje de cobertura.\n* **Especialistas en láser**: Profesionales que necesitan un soporte riguroso para explicar el ritmo de eliminación y las pautas posteriores.',
  how_to_use_title: 'Cómo utilizarlo',
  sections: [
    {
      title: '1. Gestión de varios perfiles de tatuajes',
      steps: [
        'Localice `{profile_label}` en la parte superior del calculador.',
        'Pulse en `{profile_new_btn}` para crear una ficha individual para un nuevo tatuaje (p. ej. "Antebrazo cuervo").',
        'Utilice `{profile_rename_btn}` para modificar el nombre de la evaluación activa.',
        'Haga clic en `{profile_delete_btn}` para eliminar el perfil actual. Cada perfil guarda sus factores clínicos, estilo de vida, listas de cuidados y fotografías de seguimiento.'
      ]
    },
    {
      title: '2. Selección del idioma de la interfaz',
      steps: [
        'Abra el menú `{lang_select_label}` en el encabezado.',
        'Elija English, Español, Deutsch, Français, Italiano, Português o Nederlands.',
        'Todos los textos, unidades y notas se actualizan en el acto.'
      ]
    },
    {
      title: '3. Selección del objetivo del tratamiento',
      steps: [
        'Consulte `{goal_title}` en la parte superior.',
        'Seleccione `{goal_clearance_label}` para un borrado completo (95 por ciento o superior).',
        'Seleccione `{goal_coverup_label}` para una atenuación parcial (50 a 70 por ciento de aclarado), que suele requerir entre el 55 y el 65 por ciento de las sesiones totales.'
      ]
    },
    {
      title: '4. Puntuación de los seis factores de Kirby-Desai',
      steps: [
        'Introduzca las variables en la sección de evaluación clínica:',
        '* `{factor_skin_title}`: Seleccione el fototipo (1 a 6 puntos) directamente o responda a las preguntas de enrojecimiento y bronceado.',
        '* `{factor_location_title}`: Elija la zona del cuerpo (1 a 5 puntos), desde la cabeza y el cuello hasta manos y pies.',
        '* `{factor_colour_title}`: Seleccione la gama de pigmentos (1 a 4 puntos), desde negro monocromático hasta tintas multicolor.',
        '* `{factor_density_title}`: Indique la densidad (1 a 4 puntos), desde trazos tenues amateur hasta rellenos tribales densos.',
        '* `{factor_scarring_title}`: Valore el relieve dérmico (0 a 5 puntos), desde piel lisa hasta cicatrices hipertróficas visibles.',
        '* `{factor_layering_title}`: Indique si se trata de un tatuaje superpuesto (0 puntos para diseños iniciales, 2 puntos para coberturas previas).'
      ]
    },
    {
      title: '5. Ajuste por circulación y estilo de vida',
      steps: [
        'En `{lifestyle_title}`, indique sus parámetros fisiológicos:',
        '* `{lifestyle_smoking_label}`: Fumar habitualmente produce vasoconstricción cutánea y eleva el número de sesiones alrededor de un 30 por ciento.',
        '* `{lifestyle_exercise_label}`: La actividad física frecuente favorece el drenaje linfático y la acción de los macrófagos.',
        '* `{lifestyle_hydration_label}`: Una ingesta adecuada de agua facilita la eliminación inmunológica de los fragmentos de tinta.'
      ]
    },
    {
      title: '6. Personalización de intervalos, precio y progreso',
      steps: [
        'Indique el intervalo entre sesiones en `{param_interval_label}` (lo habitual en clínica es de 6 a 10 semanas).',
        'Escriba el precio por sesión en `{param_cost_label}` y elija su moneda.',
        'Si ya ha comenzado las sesiones, marque `{param_started_toggle}`.',
        'Indique las visitas efectuadas en `{param_completed_label}` y el aclarado observado en `{param_faded_label}`.'
      ]
    },
    {
      title: '7. Cálculo de la estimación y análisis de resultados',
      steps: [
        'Haga clic en `{btn_calculate}`.',
        'Compruebe los valores obtenidos: `{results_score_label}`, `{results_sessions_label}`, `{results_timeline_label}`, `{results_remaining_label}`, `{results_cost_label}` y `{results_dominant_intro}`.',
        'Examine la tabla detallada de puntos con las puntuaciones de cada factor y las fórmulas empleadas.'
      ]
    },
    {
      title: '8. Comprensión de la curva de aclaramiento biológico',
      steps: [
        'Desplácese hasta `{trajectory_title}`.',
        'Examine la curva logarítmica que representa el ritmo con el que el organismo elimina los restos de tinta a lo largo de las sesiones.',
        'Compare la evolución observada en su tatuaje con la trayectoria biológica de referencia.'
      ]
    },
    {
      title: '9. Selección de longitudes de onda por cromóforo',
      steps: [
        'Consulte la sección `{wavelength_title}`.',
        'Revise las longitudes de onda según sus colores: 1064 nm para negro y azul marino, 532 nm para rojo y tonos cálidos, 755 nm o 694 nm para verde y azul claro.',
        'Tenga en cuenta la advertencia sobre tintas blancas con dióxido de titanio (TiO2), propensas al oscurecimiento paradójico.'
      ]
    },
    {
      title: '10. Viabilidad de pigmentos para cover-up',
      steps: [
        'Haga clic en `{coverup_toggle_btn}` para ver la `{coverup_matrix_title}`.',
        'Consulte la matriz comparativa para ver qué nuevos tonos cubren eficazmente los restos de tinta original.',
        'Compruebe si el nuevo diseño puede tatuarse directamente, si requiere de 2 a 4 sesiones de láser o si precisa un borrado profundo.'
      ]
    },
    {
      title: '11. Generación del calendario de citas',
      steps: [
        'Localice `{calendar_title}`.',
        'Indique la fecha de inicio o de su próxima visita en `{calendar_start_date_label}`.',
        'Revise las fechas previstas según el intervalo de descanso asignado.',
        'Haga clic en `{btn_export_ics}` para descargar las citas en formato estándar iCalendar.'
      ]
    },
    {
      title: '12. Lista clínica de cuidados posteriores por fases',
      steps: [
        'Vaya a `{aftercare_title}`.',
        'Marque las pautas completadas en `{aftercare_stage1_title}`, `{aftercare_stage2_title}` y `{aftercare_stage3_title}`.',
        'Siga la barra de progreso mientras completa la disipación térmica, la regeneración dérmica y la protección frente a la radiación solar.'
      ]
    },
    {
      title: '13. Registro del tratamiento y comparación de fotos',
      steps: [
        'Localice `{fadelog_title}`.',
        'Indique `{fadelog_date_label}`, `{fadelog_rating_label}` y sus comentarios en `{fadelog_note_label}`.',
        'Haga clic en `{photo_attach_btn}` para seleccionar una fotografía de control desde su dispositivo.',
        'Pulse en `{fadelog_add_btn}` para añadir la fila. Use `{photo_view_btn}` en cualquier registro para comparar esa imagen con la foto inicial de la sesión 1.',
        'Utilice `{fadelog_delete}` si necesita borrar alguna entrada.'
      ]
    },
    {
      title: '14. Copia de seguridad, restauración y exportación',
      steps: [
        'En `{backup_title}`, haga clic en `{backup_export_json_btn}` para descargar una copia local con todos los perfiles, cuidados y fotos.',
        'Utilice `{backup_import_json_btn}` para restaurar un archivo guardado con anterioridad.',
        'Haga clic en `{backup_export_csv_btn}` para exportar el diario de sesiones en formato CSV para hojas de cálculo.'
      ]
    },
    {
      title: '15. Preguntas para la consulta e impresión',
      steps: [
        'Repase `{questions_title}` relativas a pruebas puntuales en la piel, intervalos de descanso y preparación del cover-up.',
        'Haga clic en `{btn_print}` para imprimir o generar un PDF con la hoja de consulta.'
      ]
    },
    {
      title: '16. Restablecer el formulario',
      steps: [
        'Haga clic en `{btn_reset}` para vaciar los campos y reiniciar los valores a su estado inicial.'
      ]
    }
  ],
  not_do_title: 'Lo que la herramienta no hace',
  not_do_body: '* No determina la predisposición individual a cicatrices queloides o hipertróficas. Para analizar este riesgo antes de una intervención cutánea, consulte el [Keloid Scar Risk Evaluator](https://poliinternational.com/keloid-scar-risk/).\n* No analiza fórmulas químicas exactas, números CAS ni el cumplimiento del reglamento europeo REACH. Para examinar ingredientes de tintas, utilice el [Ink Ingredient Decoder](https://poliinternational.com/ink-ingredient-decoder/).\n* No calibra dispositivos láser ni ajusta fluencias de disparo.\n* No almacena historias clínicas en servidores ni reserva citas médicas.',
  data_lives_title: 'Dónde se guardan sus datos',
  data_lives_body: 'Todos los datos, fichas e imágenes permanecen en su propio dispositivo:\n* **Memoria de la sesión**: Los datos introducidos y los calendarios calculados se mantienen en la memoria temporal durante su uso.\n* **Almacenamiento local del navegador**: Los perfiles, el registro de sesiones, el estilo de vida y las listas de cuidados se guardan en localStorage bajo `poli_tattoo_profiles_v2`.\n* **Almacén fotográfico IndexedDB**: Las fotografías de progreso se comprimen en local y se guardan en la base de datos IndexedDB de su navegador (`PoliTattooPhotosDB`).\n* **Sin transmisión externa**: La herramienta no realiza peticiones a servidores remotos ni envía información a Poli International ni a terceros.\n* **Portabilidad mediante copias**: La descarga en formato JSON permite traspasar el historial completo de un equipo a otro sin necesidad de servicios en la nube.',
  print_export_title: 'Impresión y exportación',
  print_export_body: 'El sistema permite distintos tipos de exportación:\n1. **Imprimir hoja de consulta**: Prepara los puntos, las sesiones estimadas, las recomendaciones de longitudes de onda, las preguntas para la clínica y el historial en un formato limpio para papel o PDF.\n2. **Descargar calendario (.ics)**: Crea un archivo estándar iCalendar (RFC 5545) compatible con aplicaciones de agenda.\n3. **Copia de seguridad completa (JSON)**: Archiva los perfiles, controles de cuidados y fotos de evolución.\n4. **Historial de aclarado (CSV)**: Exporta las fechas, valoraciones y notas clínicas para programas de hojas de cálculo.',
  qa_title: 'Preguntas habituales',
  qas: [
    {
      q: '¿Qué fiabilidad tiene la escala de Kirby-Desai para el borrado de tatuajes ?',
      a: 'La escala de Kirby-Desai es un modelo estadístico derivado de un ensayo clínico con 100 pacientes publicado en 2009. En esa muestra explicaba alrededor del 80 por ciento de la variabilidad en los resultados. Como la inmunidad de cada persona, la composición de la tinta y los equipos láser difieren, los resultados reales pueden alejarse del intervalo calculado.'
    },
    {
      q: '¿Por qué deben espaciarse varias semanas las sesiones de láser ?',
      a: 'El láser no evapora la tinta, sino que la rompe en partículas microscópicas mediante impacto fotoacústico. El sistema inmunitario requiere semanas para que los macrófagos transporten esos restos a través de los vasos linfáticos. Acortar el descanso lesiona la piel sin acelerar la eliminación.'
    },
    {
      q: '¿Por qué los tatuajes en manos y pies tardan más tiempo en desaparecer ?',
      a: 'La velocidad de eliminación depende del riego sanguíneo y del drenaje linfático de cada región. La cabeza, el cuello y el tronco cuentan con una densa red de capilares que retira la tinta con rapidez. Las zonas distales como muñecas, manos, tobillos y pies tienen menor flujo periférico, por lo que los macrófagos tardan sustancialmente más.'
    },
    {
      q: '¿Cuántas sesiones son necesarias para aclarar un tatuaje antes de un cover-up ?',
      a: 'Para preparar un nuevo tatuaje de cobertura suele bastar con aclarar el diseño original entre un 50 y un 70 por ciento. Esto requiere en torno al 55-65 por ciento de las sesiones de un borrado total. Es indispensable que el tatuador revise la zona antes de dar por concluidas las sesiones de láser.'
    },
    {
      q: '¿Se pueden eliminar con láser las tintas blancas o de tonos pastel ?',
      a: 'Los pigmentos blancos y claros contienen a menudo dióxido de titanio u óxidos de hierro. Bajo el haz del láser pueden sufrir una reacción de reducción química (oscurecimiento paradójico) que los vuelve instantáneamente negros o gris pizarra permanente. Los especialistas realizan antes un disparo de prueba en un punto discreto.'
    },
    {
      q: '¿De qué manera influye el tabaco en la cantidad de sesiones requeridas ?',
      a: 'Los estudios clínicos muestran que el tabaquismo activo reduce la tasa de aclarado tras 10 sesiones en torno al 70 por ciento. La nicotina contrae los microvasos dérmicos y disminuye el flujo sanguíneo en la piel, entorpeciendo la acción de los macrófagos al evacuar los restos de tinta.'
    },
    {
      q: '¿Qué longitud de onda láser se necesita para tatuajes con muchos colores ?',
      a: 'La longitud de onda de 1064 nm resulta muy eficaz para el negro y el azul marino, pero carece de absorción en verde o rojo. El rojo requiere 532 nm (láser KTP), mientras que el verde y el azul claro reaccionan mejor a 755 nm (Alejandrita) o 694 nm (Rubí). Los centros especializados suelen combinar plataformas con varias longitudes de onda.'
    },
    {
      q: '¿Cómo representa la curva no lineal el proceso de aclarado ?',
      a: 'El aclarado no ocurre a velocidad constante : en las primeras sesiones se fragmenta la tinta superficial más densa produciendo un cambio visual muy evidente, mientras que la eliminación de los restos más profundos requiere un tiempo de transporte linfático progresivamente mayor. La curva muestra este comportamiento de tipo logarítmico.'
    }
  ],
  limits_title: 'Límites de la herramienta',
  limits_body: 'El algoritmo de Kirby-Desai es una referencia pedagógica orientativa y no supone un diagnóstico médico ni un compromiso de resultados. El sistema no puede medir la capacidad inmune personal, la velocidad de los macrófagos ni el metabolismo del usuario. No conoce la composición exacta de las tintas ni la pericia técnica del operador. Todas las decisiones sobre parámetros del láser, disparos de prueba, descansos y cuidados cutáneos corresponden al usuario y a su profesional médico o técnico autorizado en consulta presencial.'
};

// nl and pt implementations
guideData.nl = {
  title: 'Schattingstool voor lasersessies tattoo-verwijdering: gebruikershandleiding',
  intro: 'Deze rekentool schat het benodigde aantal lasersessies, het tijdsverloop en de verwachte kosten op basis van de gepubliceerde Kirby-Desai-schaal voor tattoo-klanten, tatoeëerders en laserspecialisten.',
  what_for_title: 'Waarvoor deze tool dient',
  what_for_body: 'De tool past de wetenschappelijke beoordelingsschaal toe van Dr. William Kirby en Dr. Alpesh Desai (Journal of Clinical and Aesthetic Dermatology, maart 2009). Het systeem evalueert zes uiterlijke kenmerken van de tatoeage, verrekent circulatie en leefgewoonten, berekent herstelperioden op basis van de behandelingsintervallen, brengt biologische afbraakcurven in beeld, berekent richtprijzen, geeft inzicht in laser-golflengten, analyseert de haalbaarheid van cover-ups, structureert de nazorg en exporteert verslagen.',
  who_for_title: 'Voor wie de tool bedoeld is',
  who_for_body: 'Deze tool is ontwikkeld voor drie gebruikersgroepen:\n* **Tattoo-klanten**: Personen die een laserbehandeling overwegen en objectieve richtlijnen wensen over sessies, planning en kosten.\n* **Tatoeëerders**: Artiesten die klanten adviseren over de vereiste voorvervaging voorafgaand aan een cover-up.\n* **Laserspecialisten**: Behandelaars die een helder hulpmiddel wensen om de afbraaksnelheid en nazorginstructies uit te leggen.',
  how_to_use_title: 'Gebruiksaanwijzing',
  sections: [
    {
      title: '1. Meerdere tattoo-profielen beheren',
      steps: [
        'Bovenaan de calculator ziet u `{profile_label}`.',
        'Klik op `{profile_new_btn}` om een apart profiel aan te maken voor een nieuwe tatoeage (bijv. "Onderarm raaf").',
        'Gebruik `{profile_rename_btn}` om de naam van het actieve profiel aan te passen.',
        'Klik op `{profile_delete_btn}` om het huidige profiel te verwijderen. Elk profiel bewaart zijn eigen factoren, leefstijlkeuzen, nazorglijsten en voortgangsfoto\'s.'
      ]
    },
    {
      title: '2. De interfacetaal instellen',
      steps: [
        'Open het menu `{lang_select_label}` in de koptekst.',
        'Kies English, Español, Deutsch, Français, Italiano, Português of Nederlands.',
        'Alle veldnamen, meeteenheden en toelichtingen wisselen direct mee.'
      ]
    },
    {
      title: '3. Uw behandeldoel instellen',
      steps: [
        'Controleer `{goal_title}` bovenaan het formulier.',
        'Kies `{goal_clearance_label}` voor algehele verwijdering (95 procent of meer).',
        'Kies `{goal_coverup_label}` voor gedeeltelijke vervaging (50 tot 70 procent opheldering), waarvoor gemiddeld 55 tot 65 procent van het totale aantal sessies nodig is.'
      ]
    },
    {
      title: '4. De zes Kirby-Desai-factoren invullen',
      steps: [
        'Vul de eigenschappen in onder het klinische beoordelingsgedeelte:',
        '* `{factor_skin_title}`: Selecteer uw huidtype (1 tot 6 punten) rechtstreeks of beantwoord de vragen over verbranding en bruining.',
        '* `{factor_location_title}`: Kies de lichaamslocatie (1 tot 5 punten), van hoofd en hals tot handen en voeten.',
        '* `{factor_colour_title}`: Kies de inktkleuren (1 tot 4 punten), van egaal zwart tot meerkleurige tatoeages.',
        '* `{factor_density_title}`: Kies de inktdichtheid (1 tot 4 punten), van amateurlijnen tot dichte zwarte vlakken.',
        '* `{factor_scarring_title}`: Beoordeel de huidstructuur (0 tot 5 punten), van gladde huid tot voelbare littekens.',
        '* `{factor_layering_title}`: Geef aan of er sprake is van een cover-up (0 punten voor originele tatoeages, 2 punten bij een eerdere laag inkt).'
      ]
    },
    {
      title: '5. Rekening houden met circulatie en leefstijl',
      steps: [
        'Stel onder `{lifestyle_title}` uw fysieke factoren in:',
        '* `{lifestyle_smoking_label}`: Roken veroorzaakt vaatvernauwing in de huid en verhoogt het aantal benodigde sessies met circa 30 procent.',
        '* `{lifestyle_exercise_label}`: Regelmatige lichaamsbeweging bevordert de lymfestroom en de werking van macrofagen.',
        '* `{lifestyle_hydration_label}`: Voldoende water drinken helpt het immuunsysteem bij het afvoeren van verbrijzelde inktdeeltjes.'
      ]
    },
    {
      title: '6. Behandelintervallen, tarieven en eerdere sessies invoeren',
      steps: [
        'Vul de hersteltijd tussen behandelingen in bij `{param_interval_label}` (gangbaar is 6 tot 10 weken).',
        'Voer de prijs per behandeling in bij `{param_cost_label}` en kies uw valuta.',
        'Als het traject al is gestart, vinkt u `{param_started_toggle}` aan.',
        'Vul reeds voltooide bezoeken in bij `{param_completed_label}` en de geconstateerde vervaging bij `{param_faded_label}`.'
      ]
    },
    {
      title: '7. Berekening uitvoeren en resultaten beoordelen',
      steps: [
        'Klik op `{btn_calculate}`.',
        'Bekijk de uitkomsten: `{results_score_label}`, `{results_sessions_label}`, `{results_timeline_label}`, `{results_remaining_label}`, `{results_cost_label}` en `{results_dominant_intro}`.',
        'Raadpleeg de puntentabel met de scores per criterium en de bijbehorende rekenformules.'
      ]
    },
    {
      title: '8. De biologische afbraakcurve interpreteren',
      steps: [
        'Scrol naar `{trajectory_title}`.',
        'Bestudeer de logaritmische curve die toont hoe inktdeeltjes door het lichaam worden afgevoerd over de behandelingen heen.',
        'Vergelijk de werkelijke vervaging van uw tatoeage met de biologische referentielijn.'
      ]
    },
    {
      title: '9. Lasergolflengten selecteren op chromofoor',
      steps: [
        'Bekijk het gedeelte `{wavelength_title}`.',
        'Controleer welke golflengte past bij uw inktkleuren: 1064 nm voor zwart en donkerblauw, 532 nm voor rood en warme tinten, 755 nm of 694 nm voor groen en lichtblauw.',
        'Let op de klinische waarschuwing rondom witte inkt met titaandioxide (TiO2), die vatbaar is voor paradoxale verdonkering.'
      ]
    },
    {
      title: '10. De haalbaarheid van een cover-up evalueren',
      steps: [
        'Klik op `{coverup_toggle_btn}` om de `{coverup_matrix_title}` te tonen.',
        'Lees in het overzicht af welke nieuwe kleuren oude inktresten betrouwbaar kunnen camoufleren.',
        'Zie direct of uw gewenste cover-up direct geplaatst kan worden, 2 tot 4 lasersessies vereist of grondige vervaging vraagt.'
      ]
    },
    {
      title: '11. Een behandelkalender genereren',
      steps: [
        'Ga naar `{calendar_title}`.',
        'Stel de datum van uw eerste of volgende sessie in via `{calendar_start_date_label}`.',
        'Bekijk de voorgestelde afspraakdata op basis van het ingestelde behandelinterval.',
        'Klik op `{btn_export_ics}` om een iCalendar-bestand te downloaden voor uw digitale agenda.'
      ]
    },
    {
      title: '12. De klinische nazorgstappen doorlopen',
      steps: [
        'Ga naar `{aftercare_title}`.',
        'Vink de afgeronde stappen af in `{aftercare_stage1_title}`, `{aftercare_stage2_title}` en `{aftercare_stage3_title}`.',
        'Volg de voortgangsbalk bij koeling, huidherstel en bescherming tegen UV-straling.'
      ]
    },
    {
      title: '13. Behandelingen bijhouden en foto\'s vergelijken',
      steps: [
        'Ga naar `{fadelog_title}`.',
        'Voer `{fadelog_date_label}`, `{fadelog_rating_label}` en notities in bij `{fadelog_note_label}`.',
        'Klik op `{photo_attach_btn}` om een controlefoto vanaf uw apparaat te selecteren.',
        'Klik op `{fadelog_add_btn}` om de regel toe te voegen. Klik op `{photo_view_btn}` in een rij om de foto direct naast de beginfoto van sessie 1 te leggen.',
        'Met `{fadelog_delete}` verwijdert u een overbodige registratie.'
      ]
    },
    {
      title: '14. Back-up maken, herstellen en exporteren',
      steps: [
        'Onder `{backup_title}` klikt u op `{backup_export_json_btn}` om alle profielen, lijsten en foto\'s lokaal op te slaan.',
        'Gebruik `{backup_import_json_btn}` om een eerder opgeslagen back-upbestand in te lezen.',
        'Klik op `{backup_export_csv_btn}` om uw logboek te downloaden als CSV-bestand voor spreadsheetsoftware.'
      ]
    },
    {
      title: '15. Vragen voorbereiden voor het consult en printen',
      steps: [
        'Bekijk `{questions_title}` met vragen over proeflaseren, hersteltijden en de voorbereiding van een cover-up.',
        'Klik op `{btn_print}` om een consultatieoverzicht af te drukken of als PDF op te slaan.'
      ]
    },
    {
      title: '16. Het formulier wissen',
      steps: [
        'Klik op `{btn_reset}` om alle invoervelden te legen en terug te keren naar de beginwaarden.'
      ]
    }
  ],
  not_do_title: 'Wat de tool niet doet',
  not_do_body: '* De tool stelt geen aanleg voor keloïden of hypertrofische littekens vast. Raadpleeg voor huidbehandelingen desgewenst de [Keloid Scar Risk Evaluator](https://poliinternational.com/keloid-scar-risk/).\n* Het programma analyseert geen specifieke inktformules, CAS-nummers of EU-REACH-grenzen. Gebruik voor inktstoffen de [Ink Ingredient Decoder](https://poliinternational.com/ink-ingredient-decoder/).\n* Het kalibreert geen laserapparatuur en berekent geen energie-instellingen.\n* Er worden geen medische dossiers verzonden en geen afspraken ingepland.',
  data_lives_title: 'Waar uw gegevens worden bewaard',
  data_lives_body: 'Alle gegevens, dossiers en afbeeldingen blijven op uw eigen toestel:\n* **Werkgeheugen**: Ingevulde velden en berekende datums blijven uitsluitend tijdens uw actieve sessie in het geheugen.\n* **Lokale browseropslag**: Tatoeageprofielen, behandellogboeken, leefstijlkeuzen en nazorgstatussen worden opgeslagen in localStorage onder `poli_tattoo_profiles_v2`.\n* **IndexedDB-foto-opslag**: Voortgangsfoto\'s worden op uw apparaat gecomprimeerd en bewaard in de lokale IndexedDB-database van uw browser (`PoliTattooPhotosDB`).\n* **Geen netwerkverkeer**: De software stuurt geen gegevens naar servers van Poli International of derden.\n* **Gegevensportabiliteit**: Dankzij het JSON-formaat kunt u uw gegevens eenvoudig handmatig kopiëren naar een ander toestel zonder clouddiensten.',
  print_export_title: 'Afdrukken en exporteren',
  print_export_body: 'Het programma biedt diverse uitvoeropties:\n1. **Consultatieoverzicht printen**: Brengt punten, sessieschattingen, golflengte-aanwijzingen, consultatievragen en het logboek samen in een afdrukbare lay-out of PDF.\n2. **Afsprakenschema downloaden (.ics)**: Genereert een iCalendar-bestand (RFC 5545) voor uw agendasoftware.\n3. **Volledige back-up (JSON)**: Bewaart alle profielen, nazorglijsten en controlefoto\'s in één bestand.\n4. **Vervagingslogboek (CSV)**: Exporteert datums, cijfers en notities voor verdere analyse in spreadsheets.',
  qa_title: 'Veelgestelde vragen',
  qas: [
    {
      q: 'Hoe nauwkeurig is de Kirby-Desai-schaal bij tattoo-verwijdering ?',
      a: 'De Kirby-Desai-schaal is een statistisch model dat steunt op een klinische studie uit 2009 onder 100 patiënten. Binnen die onderzoeksgroep verklaarde het systeem ongeveer 80 procent van de verschillen in behandelduur. Omdat wondgenezing, inktsamenstelling en laserapparatuur individueel variëren, kan de praktijk afwijken van de berekende waarden.'
    },
    {
      q: 'Waarom moeten er meerdere weken tussen lasersessies zitten ?',
      a: 'De laser laat inktdeeltjes niet verdampen, maar verbrijzelt ze via fotoakoestische druk. Het immuunsysteem heeft weken de tijd nodig om deze fragmenten via macrofagen naar de lymfevaten af te voeren. Behandelingen te snel herhalen beschadigt de huid zonder het herstel te versnellen.'
    },
    {
      q: 'Waarom verdwijnen tatoeages op handen en voeten langzamer ?',
      a: 'De afvoer van inkt is sterk afhankelijk van de plaatselijke doorbloeding en lymfedrainage. Hoofd, hals en romp beschikken over een dicht vatennetwerk dat inktdeeltjes vlot opneemt. Handen, polsen, enkels en voeten hebben minder perifere circulatie, waardoor macrofagen aanzienlijk trager werken.'
    },
    {
      q: 'Hoeveel sessies zijn er nodig om een tattoo voor te bereiden op een cover-up ?',
      a: 'Voor een cover-up is 50 tot 70 procent vervaging doorgaans voldoende. Dat vraagt ongeveer 55 tot 65 procent van de sessies die voor algehele verwijdering nodig zijn. Laat het behandelde gebied altijd vooraf controleren door uw tatoeëerder.'
    },
    {
      q: 'Kunnen witte of pastelkleurige inktsoorten met de laser worden behandeld ?',
      a: 'Witte en lichte inkten bevatten regelmatig titaandioxide of ijzeroxiden. Onder invloed van laserlicht kunnen deze stoffen plotseling oxideren en blijvend donkergrijs of leisteenzwart verkleuren (paradoxale verdonkering). Specialisten voeren daarom eerst een kleine proefpuls uit op een onopvallende plek.'
    },
    {
      q: 'Waarom zorgt roken voor meer benodigde lasersessies ?',
      a: 'Onderzoek toont aan dat roken de kans op succes na 10 behandelingen met circa 70 procent verlaagt. Nicotine vernauwt de fijne bloedvaatjes in de huid en remt de bloedstroom, waardoor macrofagen inktdeeltjes beduidend langzamer opruimen.'
    },
    {
      q: 'Welke lasergolflengte is nodig bij een meerkleurige tatoeage ?',
      a: 'Een golflengte van 1064 nm werkt uitstekend op zwart en donkerblauw, maar pakt groen of rood niet aan. Rood vereist 532 nm (KTP-laser), terwijl groen en lichtblauw het best reageren op 755 nm (Alexandriet) of 694 nm (Robijn). Gespecialiseerde klinieken combineren daarom meestal meerdere golflengten.'
    },
    {
      q: 'Hoe geeft de niet-lineaire curve het vervagingsproces weer ?',
      a: 'Tatoeages vervagen niet in een rechte lijn: in de eerste behandelingen verdwijnt de compacte oppervlakkige inkt met een opvallend optisch effect, terwijl de diepere inktdeeltjes steeds langere transporttijden vergen. De curve toont dit karakteristieke logaritmische verloop.'
    }
  ],
  limits_title: 'Beperkingen van het hulpmiddel',
  limits_body: 'De Kirby-Desai-formule is een educatieve richtlijn en vormt geen medische diagnose of resultaatsgarantie. De tool kan uw individuele afweerreactie, de transportsnelheid van macrofagen of uw stofwisseling niet bepalen. Ook de exacte inktsamenstelling en de ervaring van de behandelaar vallen buiten het bereik van deze calculator. Keuzen over laserinstellingen, proefbehandelingen, pauzes en huidverzorging dienen te allen tijde in overleg met een bevoegd behandelaar te worden gemaakt.'
};

guideData.pt = {
  title: 'Estimador de sessões de remoção de tatuagens: guia do utilizador',
  intro: 'O estimador de sessões de remoção de tatuagens calcula o número estimado de sessões a laser, os prazos clínicos e os custos previstos com base na escala publicada de Kirby-Desai para clientes, tatuadores e especialistas em laser.',
  what_for_title: 'Para que serve',
  what_for_body: 'O estimador aplica a escala de avaliação clínica publicada pelos doutores William Kirby e Alpesh Desai (Journal of Clinical and Aesthetic Dermatology, março de 2009). Avalia seis características físicas da tatuagem, considera a circulação e o estilo de vida, projeta calendários de recuperação segundo os intervalos entre consultas, modela curvas biológicas de eliminação, calcula estimativas de custo, fornece orientações sobre comprimentos de onda de laser, analisa a viabilidade de coberturas, estrutura os cuidados pós-sessão e exporta relatórios clínicos.',
  who_for_title: 'A quem se destina',
  who_for_body: 'Esta ferramenta serve três grupos:\n* **Clientes de tratamentos a laser**: Pessoas que pretendem remover tatuagens e procuram estimativas objetivas de sessões, prazos e custos.\n* **Tatuadores**: Profissionais que aconselham clientes sobre o nível de clareamento prévio necessário antes de uma nova tatuagem de cobertura.\n* **Profissionais de laser**: Clínicos que procuram uma ferramenta transparente para ilustrar a taxa de eliminação de tinta e os cuidados recomendados.',
  how_to_use_title: 'Como utilizar',
  sections: [
    {
      title: '1. Gerir múltiplos perfis de tatuagens',
      steps: [
        'Localize `{profile_label}` no topo da calculadora.',
        'Clique em `{profile_new_btn}` para criar uma ficha de avaliação separada para uma nova tatuagem (ex. "Antebraço corvo").',
        'Use `{profile_rename_btn}` para atualizar o nome da tatuagem selecionada.',
        'Clique em `{profile_delete_btn}` para apagar o perfil ativo. Cada perfil guarda os seus próprios parâmetros clínicos, hábitos de vida, listas de cuidados e registos fotográficos.'
      ]
    },
    {
      title: '2. Selecionar o idioma da interface',
      steps: [
        'Abra o menu `{lang_select_label}` no cabeçalho.',
        'Escolha English, Español, Deutsch, Français, Italiano, Português ou Nederlands.',
        'Todos os textos, unidades e avisos são atualizados instantaneamente.'
      ]
    },
    {
      title: '3. Definir o objetivo do tratamento',
      steps: [
        'Consulte `{goal_title}` no topo do formulário.',
        'Selecione `{goal_clearance_label}` para a eliminação integral (95 por cento ou mais).',
        'Selecione `{goal_coverup_label}` para um clareamento parcial (50 a 70 por cento de desvanecimento), necessitando de cerca de 55 a 65 por cento das sessões de uma remoção completa.'
      ]
    },
    {
      title: '4. Pontuar os seis fatores da escala Kirby-Desai',
      steps: [
        'Preencha cada critério na secção de avaliação clínica:',
        '* `{factor_skin_title}`: Escolha o fototipo (1 a 6 pontos) diretamente ou responda às perguntas sobre queimaduras solares e bronzeamento.',
        '* `{factor_location_title}`: Escolha a região anatómica (1 a 5 pontos), da cabeça e pescoço até às mãos e pés.',
        '* `{factor_colour_title}`: Escolha o grupo de pigmentos (1 a 4 pontos), do preto monocromático a tintas multicoloridas.',
        '* `{factor_density_title}`: Indique a densidade (1 a 4 pontos), de linhas finas amadoras a preenchimentos tribais compactos.',
        '* `{factor_scarring_title}`: Avalie o relevo cutâneo (0 a 5 pontos), de pele lisa a cicatrizes hipertróficas evidentes.',
        '* `{factor_layering_title}`: Indique se cobre um trabalho anterior (0 pontos para tatuagens originais, 2 pontos para coberturas).'
      ]
    },
    {
      title: '5. Incluir a circulação e o estilo de vida',
      steps: [
        'Em `{lifestyle_title}`, indique as suas condições fisiológicas:',
        '* `{lifestyle_smoking_label}`: O tabagismo ativo provoca vasoconstrição dérmica e aumenta as sessões necessárias em cerca de 30 por cento.',
        '* `{lifestyle_exercise_label}`: O exercício físico regular estimula o fluxo linfático e a mobilidade dos macrófagos.',
        '* `{lifestyle_hydration_label}`: A ingestão regular de água ajuda o sistema imunitário na eliminação das partículas de tinta fragmentadas.'
      ]
    },
    {
      title: '6. Personalizar intervalos, preço e sessões já realizadas',
      steps: [
        'Indique o intervalo entre visitas em `{param_interval_label}` (o intervalo padrão varia entre 6 e 10 semanas).',
        'Introduza o preço por sessão em `{param_cost_label}` e escolha a moeda pretendida.',
        'Caso o tratamento já tenha começado, assinale `{param_started_toggle}`.',
        'Registe as visitas concluídas em `{param_completed_label}` e o clareamento percebido em `{param_faded_label}`.'
      ]
    },
    {
      title: '7. Calcular a estimativa e analisar os resultados',
      steps: [
        'Clique em `{btn_calculate}`.',
        'Verifique os indicadores calculados: `{results_score_label}`, `{results_sessions_label}`, `{results_timeline_label}`, `{results_remaining_label}`, `{results_cost_label}` e `{results_dominant_intro}`.',
        'Consulte a tabela detalhada com os pontos atribuídos a cada critério e as fórmulas aplicadas.'
      ]
    },
    {
      title: '8. Compreender a curva biológica de eliminação',
      steps: [
        'Navegue até `{trajectory_title}`.',
        'Analise a curva logarítmica que traduz o ritmo a que a tinta é drenada ao longo das sessões.',
        'Compare o clareamento real da sua tatuagem com a curva biológica de referência.'
      ]
    },
    {
      title: '9. Escolher o comprimento de onda do laser por cromóforo',
      steps: [
        'Consulte a secção `{wavelength_title}`.',
        'Verifique os comprimentos de onda adequados para as suas cores: 1064 nm para preto e azul-escuro, 532 nm para vermelho e tons quentes, 755 nm ou 694 nm para verde e azul-claro.',
        'Esteja atento ao aviso sobre tintas brancas contendo dióxido de titânio (TiO2), propensas ao escurecimento paradoxal.'
      ]
    },
    {
      title: '10. Avaliar a viabilidade de uma cobertura',
      steps: [
        'Clique em `{coverup_toggle_btn}` para abrir a `{coverup_matrix_title}`.',
        'Consulte a matriz comparativa para ver quais as novas cores que cobrem com eficácia a tinta residual.',
        'Identifique se o novo desenho pode ser aplicado diretamente, se exige 2 a 4 sessões de laser ou se necessita de um clareamento mais extenso.'
      ]
    },
    {
      title: '11. Criar o calendário previsto de sessões',
      steps: [
        'Vá até `{calendar_title}`.',
        'Defina a data da primeira ou da próxima sessão em `{calendar_start_date_label}`.',
        'Verifique as datas estimadas com base no intervalo de cicatrização definido.',
        'Clique em `{btn_export_ics}` para descarregar o ficheiro iCalendar compatível com agendas eletrónicas.'
      ]
    },
    {
      title: '12. Seguir a lista de cuidados pós-tratamento por fases',
      steps: [
        'Aceda a `{aftercare_title}`.',
        'Assinale os cuidados concluídos em `{aftercare_stage1_title}`, `{aftercare_stage2_title}` e `{aftercare_stage3_title}`.',
        'Acompanhe a barra de progresso à medida que cumpre o arrefecimento cutâneo, a regeneração celular e a proteção solar.'
      ]
    },
    {
      title: '13. Registar o histórico e comparar fotografias',
      steps: [
        'Encontre `{fadelog_title}`.',
        'Introduza `{fadelog_date_label}`, `{fadelog_rating_label}` e notas em `{fadelog_note_label}`.',
        'Clique em `{photo_attach_btn}` para anexar uma fotografia de acompanhamento a partir do seu dispositivo.',
        'Prima `{fadelog_add_btn}` para guardar a entrada. Use `{photo_view_btn}` em qualquer linha para comparar essa foto lado a lado com a foto da sessão 1.',
        'Utilize `{fadelog_delete}` para retirar registos desnecessários.'
      ]
    },
    {
      title: '14. Fazer cópias de segurança, restaurar e exportar',
      steps: [
        'Em `{backup_title}`, clique em `{backup_export_json_btn}` para gravar todos os perfis, listas e fotos num ficheiro local.',
        'Use `{backup_import_json_btn}` para repor um ficheiro de cópia de segurança guardado.',
        'Clique em `{backup_export_csv_btn}` para exportar o diário de sessões em formato CSV para folhas de cálculo.'
      ]
    },
    {
      title: '15. Perguntas para a consulta e impressão da folha',
      steps: [
        'Analise `{questions_title}` sobre testes prévios na pele, tempo de repouso e preparação da cobertura.',
        'Clique em `{btn_print}` para imprimir ou guardar em PDF o resumo de consulta.'
      ]
    },
    {
      title: '16. Repor o formulário',
      steps: [
        'Clique em `{btn_reset}` para limpar os campos preenchidos e repor as opções padrão.'
      ]
    }
  ],
  not_do_title: 'O que a ferramenta não faz',
  not_do_body: '* Não diagnostica a predisposição individual para cicatrizes queloides ou hipertróficas. Para analisar este risco antes de intervir na pele, utilize o [Keloid Scar Risk Evaluator](https://poliinternational.com/keloid-scar-risk/).\n* Não analisa fórmulas químicas exatas, números CAS nem a conformidade com o regulamento europeu REACH. Para verificar componentes de tintas, utilize o [Ink Ingredient Decoder](https://poliinternational.com/ink-ingredient-decoder/).\n* Não efetua a calibração de máquinas laser nem define densidades de energia.\n* Não envia registos clínicos para a Internet nem agenda consultas em clínicas.',
  data_lives_title: 'Onde residem os seus dados',
  data_lives_body: 'Todos os registos, avaliações e imagens permanecem no seu próprio equipamento:\n* **Memória da sessão**: As informações preenchidas e os calendários calculados permanecem em memória durante o período de utilização.\n* **Armazenamento local do navegador**: Os perfis de tatuagem, o registo de sessões, os hábitos e as listas de cuidados são gravados no localStorage em `poli_tattoo_profiles_v2`.\n* **Armazenamento fotográfico IndexedDB**: As fotografias de evolução são comprimidas localmente e mantidas na base de dados IndexedDB do seu navegador (`PoliTattooPhotosDB`).\n* **Nenhuma transmissão de rede**: A ferramenta não efetua pedidos a servidores remotos e não envia quaisquer dados para a Poli International ou terceiros.\n* **Portabilidade por ficheiro**: O formato JSON permite transferir a totalidade das fichas entre computadores ou telemóveis sem necessidade de sincronização em nuvem.',
  print_export_title: 'Impressão e exportação',
  print_export_body: 'A ferramenta oferece diversos formatos de exportação:\n1. **Imprimir folha de consulta**: Agrupa pontuações, estimativas de sessões, notas de comprimentos de onda, questões clínicas e o diário num formato limpo para papel ou PDF.\n2. **Descarregar calendário (.ics)**: Produz um ficheiro iCalendar (RFC 5545) compatível com aplicações de agenda.\n3. **Cópia de segurança completa (JSON)**: Reúne todos os perfis, listas de acompanhamento e imagens num único ficheiro.\n4. **Diário de clareamento (CSV)**: Exporta datas, notas e classificações para tratamento em folhas de cálculo.',
  qa_title: 'Perguntas frequentes',
  qas: [
    {
      q: 'Qual é a precisão da escala de Kirby-Desai na remoção de tatuagens ?',
      a: 'A escala de Kirby-Desai é um modelo estatístico comprovado por um estudo clínico publicado em 2009 com 100 pacientes. No grupo analisado explicava cerca de 80 por cento da variação observada. Como as respostas imunitárias, a composição das tintas e as tecnologias laser variam, os resultados práticos podem divergir do intervalo estimado.'
    },
    {
      q: 'Por que motivo as sessões de laser devem ter várias semanas de intervalo ?',
      a: 'O laser não evapora a tinta, mas quebra-a em partículas microscópicas através de impacto fotoacústico. O sistema imunitário necessita de várias semanas para que os macrófagos transportem esses fragmentos para o sistema linfático. Reduzir o tempo de repouso danifica a pele sem acelerar o processo de eliminação.'
    },
    {
      q: 'Por que razão as tatuagens nas mãos e nos pés demoram mais a sair ?',
      a: 'A velocidade de eliminação depende da circulação sanguínea periférica e da drenagem linfática da região. A cabeça, o pescoço e o tronco possuem uma densa rede de capilares que escoa a tinta rapidamente. Mãos, pulsos, tornozelos e pés têm menor fluxo periférico, pelo que os macrófagos trabalham a um ritmo sensivelmente mais lento.'
    },
    {
      q: 'Quantas sessões são precisas para clarear uma tatuagem antes de uma cobertura ?',
      a: 'Para preparar uma nova tatuagem de cobertura costuma ser suficiente um clareamento entre 50 e 70 por cento. Isso consome habitualmente 55 a 65 por cento das sessões exigidas para uma remoção completa. Recomenda-se sempre que o tatuador avalie o local antes de se darem por terminadas as sessões de laser.'
    },
    {
      q: 'É possível remover tintas brancas ou em tons pastel com laser ?',
      a: 'As tintas brancas e de tons claros contêm com frequência dióxido de titânio ou óxidos de ferro. Sob a radiação laser estes compostos podem sofrer oxidação imediata (escurecimento paradoxal), tornando o pigmento irremediavelmente preto ou cinzento-ardósia. Os profissionais fazem habitualmente um disparo de teste prévio numa área reduzida.'
    },
    {
      q: 'De que forma o tabagismo aumenta o número de sessões necessárias ?',
      a: 'Os estudos dermatológicos indicam que o hábito de fumar reduz a taxa de sucesso ao fim de 10 sessões em cerca de 70 por cento. A nicotina causa vasoconstrição nos microvasos da pele e reduz o fluxo sanguíneo, retardando a atividade dos macrófagos na remoção das partículas de tinta.'
    },
    {
      q: 'Que comprimento de onda laser é necessário para tatuagens com muitas cores ?',
      a: 'O comprimento de onda de 1064 nm atua de forma eficaz em preto e azul-escuro, mas não é absorvido por verde ou vermelho. O vermelho necessita de 532 nm (laser KTP), enquanto o verde e o azul-claro reagem melhor a 755 nm (Alexandrite) ou 694 nm (Rubi). Por esse motivo, as clínicas especializadas recorrem a sistemas que combinam múltiplos comprimentos de onda.'
    },
    {
      q: 'Como é que a curva não linear traduz o processo de clareamento ?',
      a: 'O clareamento não decorre a uma velocidade uniforme : as primeiras sessões quebram a tinta superficial mais densa gerando uma mudança visual muito percetível, enquanto a remoção das partículas profundas exige tempos de transporte linfático cada vez mais dilatados. A curva traduz esse comportamento logarítmico.'
    }
  ],
  limits_title: 'Limitações da ferramenta',
  limits_body: 'O algoritmo Kirby-Desai é uma referência de consulta educativa e não constitui diagnóstico clínico nem garantia de sucesso. O sistema não afere a competência imunitária individual, a velocidade dos macrófagos nem o metabolismo de cada pessoa. Não analisa a composição química exata das tintas nem a perícia técnica de quem manuseia o laser. Todas as decisões sobre parametrização do laser, disparos de prova, intervalos de recuperação e cuidados pós-sessão cabem ao utente e ao seu médico ou técnico qualificado em contexto de consulta presencial.'
};

// Function to substitute backtick keys
function replaceTokens(text, lang) {
  const d = dict[lang];
  return text.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, key) => {
    // Map token names to dict keys
    const tokenMap = {
      profile_label: 'profile.label',
      profile_new_btn: 'profile.new_btn',
      profile_rename_btn: 'profile.rename_btn',
      profile_delete_btn: 'profile.delete_btn',
      lang_select_label: 'lang.select_label',
      goal_title: 'goal.title',
      goal_clearance_label: 'goal.clearance_label',
      goal_coverup_label: 'goal.coverup_label',
      factor_skin_title: 'factor.skin.title',
      factor_location_title: 'factor.location.title',
      factor_colour_title: 'factor.colour.title',
      factor_density_title: 'factor.density.title',
      factor_scarring_title: 'factor.scarring.title',
      factor_layering_title: 'factor.layering.title',
      lifestyle_title: 'lifestyle.title',
      lifestyle_smoking_label: 'lifestyle.smoking_label',
      lifestyle_exercise_label: 'lifestyle.exercise_label',
      lifestyle_hydration_label: 'lifestyle.hydration_label',
      param_interval_label: 'param.interval_label',
      param_cost_label: 'param.cost_label',
      param_started_toggle: 'param.started_toggle',
      param_completed_label: 'param.completed_label',
      param_faded_label: 'param.faded_label',
      btn_calculate: 'btn.calculate',
      btn_reset: 'btn.reset',
      btn_print: 'btn.print',
      results_score_label: 'results.score_label',
      results_sessions_label: 'results.sessions_label',
      results_timeline_label: 'results.timeline_label',
      results_remaining_label: 'results.remaining_label',
      results_cost_label: 'results.cost_label',
      results_dominant_intro: 'results.dominant_intro',
      trajectory_title: 'trajectory.title',
      wavelength_title: 'wavelength.title',
      coverup_matrix_title: 'coverup.matrix_title',
      coverup_toggle_btn: 'coverup.toggle_btn',
      calendar_title: 'calendar.title',
      calendar_start_date_label: 'calendar.start_date_label',
      btn_export_ics: 'btn.export_ics',
      aftercare_title: 'aftercare.title',
      aftercare_stage1_title: 'aftercare.stage1_title',
      aftercare_stage2_title: 'aftercare.stage2_title',
      aftercare_stage3_title: 'aftercare.stage3_title',
      fadelog_title: 'fadelog.title',
      fadelog_date_label: 'fadelog.date_label',
      fadelog_rating_label: 'fadelog.rating_label',
      photo_attach_btn: 'photo.attach_btn',
      photo_view_btn: 'photo.view_btn',
      fadelog_note_label: 'fadelog.note_label',
      fadelog_add_btn: 'fadelog.add_btn',
      fadelog_delete: 'fadelog.delete',
      backup_title: 'backup.title',
      backup_export_json_btn: 'backup.export_json_btn',
      backup_import_json_btn: 'backup.import_json_btn',
      backup_export_csv_btn: 'backup.export_csv_btn',
      questions_title: 'questions.title'
    };

    const dictKey = tokenMap[key];
    if (dictKey && d[dictKey]) {
      return clean(d[dictKey]);
    }
    return match;
  });
}

function renderGuide(lang) {
  const g = guideData[lang];
  let md = `# ${clean(g.title)}\n\n`;
  md += `${clean(g.intro)}\n\n`;
  md += `## ${clean(g.what_for_title)}\n\n`;
  md += `${clean(g.what_for_body)}\n\n`;
  md += `## ${clean(g.who_for_title)}\n\n`;
  md += `${clean(g.who_for_body)}\n\n`;
  md += `## ${clean(g.how_to_use_title)}\n\n`;

  g.sections.forEach((sec, idx) => {
    md += `### ${clean(sec.title)}\n\n`;
    sec.steps.forEach(step => {
      const renderedStep = replaceTokens(step, lang);
      md += `${clean(renderedStep)}\n`;
    });
    md += '\n';
  });

  md += `## ${clean(g.not_do_title)}\n\n`;
  md += `${clean(g.not_do_body)}\n\n`;
  md += `## ${clean(g.data_lives_title)}\n\n`;
  md += `${clean(g.data_lives_body)}\n\n`;
  md += `## ${clean(g.print_export_title)}\n\n`;
  md += `${clean(g.print_export_body)}\n\n`;
  md += `## ${clean(g.qa_title)}\n\n`;

  g.qas.forEach(qa => {
    md += `### ${clean(qa.q)}\n`;
    md += `${clean(qa.a)}\n\n`;
  });

  md += `## ${clean(g.limits_title)}\n\n`;
  md += `${clean(g.limits_body)}\n`;

  return md;
}

// Generate all files
const targets = [
  { lang: 'en', file: 'docs/USER-GUIDE.md' },
  { lang: 'fr', file: 'docs/USER-GUIDE-fr.md' },
  { lang: 'it', file: 'docs/USER-GUIDE-it.md' },
  { lang: 'de', file: 'docs/USER-GUIDE-de.md' },
  { lang: 'es', file: 'docs/USER-GUIDE-es.md' },
  { lang: 'nl', file: 'docs/USER-GUIDE-nl.md' },
  { lang: 'pt', file: 'docs/USER-GUIDE-pt.md' }
];

targets.forEach(t => {
  const content = renderGuide(t.lang);
  const outPath = path.join(__dirname, '..', t.file);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`Wrote ${content.length} bytes to ${t.file}`);
});
