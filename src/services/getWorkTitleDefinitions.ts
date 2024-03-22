
export interface Definition {
  label: string,
  regex: RegExp,
  definition: string,
  category: 'orchestration' | 'counting' | 'key' | 'form',
};

export interface DefinitionMatch {
  label: string,
  definition: string,
  match: string,
  category: 'orchestration' | 'counting' | 'key' | 'form',
};

const definitions: Array<Definition> = [
  {
    "label": "Concerto",
    "regex": /concerto/gi,
    "definition": "a musical composition for a solo instrument or instruments accompanied by an orchestra, especially one conceived on a relatively large scale.",
    "category": "orchestration",
  },
  {
    "label": "Op.",
    "regex": /Op\.\s\d*/gi,
    "definition": "a separate composition or set of compositions by a particular composer, usually ordered by date of publication.",
    "category": "counting",
  },
  {
    "label": "Key signature",
    "regex": /(in\s)([ABDCEFG]\s)(flat\s|sharp\s)?(major|minor)/g,
    "definition": "A key signature is any of several combinations of sharps or flats after the clef at the beginning of each stave, indicating the key of a composition.",
    "category": "key",
  },
  {
    "label": "no. 2 ",
    "regex": /no\. \d*/gi,
    "definition": "This means it's the nth work of this type the composer wrote.",
    "category": "counting",
  },
  {
    "label": "Symphony",
    "regex": /Symphony/gi,
    "definition": "an elaborate musical composition for full orchestra, typically in four movements, at least one of which is traditionally in sonata form.",
    "category": "orchestration",
  },
  {
    "label": "Hob.XVIII:11",
    "regex": /Hob\.\D*:\d*/gi,
    "definition": "is the standard musicological reference to the Hoboken Catalogue of the music of Joseph Haydn",
    "category": "counting",
  },
  {
    "label": "Fugue",
    "regex": /Fugue/gi,
    "definition": "In classical music, a fugue is a contrapuntal, polyphonic compositional technique in two or more voices, built on a subject that is introduced at the beginning in imitation, which recurs frequently throughout the course of the composition.",
    "category": "form",
  },
  {
    "label": "Polonaise",
    "regex": /Polonaise/gi,
    "definition": "The polonaise is a dance of Polish origin, one of the five Polish national dances in time.",
    "category": "form",
  },
  {
    "label": "String Quartet",
    "regex": /String\sQuartet/gi,
    "definition": "The associated musical ensemble consists of two violinists, a violist, and a cellist.",
    "category": "orchestration",
  },
  {
    "label": "String Quintet",
    "regex": /String\sQuintet/gi,
    "definition": "A string quintet is a musical composition for five string players. As an extension to the string quartet (two violins, a viola, and a cello), a string quintet includes a fifth string instrument, usually a second viola (a so-called \"viola quintet\") or a second cello (a \"cello quintet\"), or occasionally a double bass.",
    "category": "orchestration",
  },
  {
    "label": "K.465",
    "regex": /K\.\d*/gi,
    "definition": "Köchel (K) numbers are assigned sequentially according to the date of composition. For example, Mozart's opera The Magic Flute is given the Köchel number 620, and is (approximately) the 620th piece of music Mozart composed.",
    "category": "counting",
  },
  {
    "label": "Piano Sonata",
    "regex": /Piano\sSonata/gi,
    "definition": "A piano sonata is a sonata written for a solo piano. Piano sonatas are usually written in three or four movements, although some piano sonatas have been written with a single movement, others with two movements, some contain five or even more movements. ",
    "category": "form",
  },
  {
    "label": "BWV.1048",
    "regex": /BWV\.\d*/g,
    "definition": "The Bach-Werke-Verzeichnis is a catalogue of compositions by Johann Sebastian Bach. ",
    "category": "counting",
  },
  {
    "label": "Suite",
    "regex": /Suite/gi,
    "definition": "suite, in music, a group of self-contained instrumental movements of varying character, usually in the same key.",
    "category": "form",
  },
  {
    "label": "Piano quartet",
    "regex": /Piano\sQuartet/gi,
    "definition": "A piano quartet is a chamber music composition for piano and three other instruments, or a musical ensemble comprising such instruments. Those other instruments are usually a string trio consisting of a violin, viola and cello.",
    "category": "orchestration",
  },
  {
    "label": "Piano quintet",
    "regex": /Piano\sQuintet/gi,
    "definition": "In classical music, a piano quintet is a work of chamber music written for piano and four other instruments, most commonly (since 1842) a string quartet",
    "category": "orchestration",
  },
  {
    "label": "Clarinet quintet",
    "regex": /Clarinet\sQuintet/gi,
    "definition": "Traditionally a clarinet quintet is a chamber musical ensemble made up of one clarinet, plus the standard string quartet of two violins, one viola, and one cello.",
    "category": "orchestration",
  },
  {
    "label": "Op. Post. 114",
    "regex": /op\.\sposth\.\d*/gi,
    "definition": "A designation used instead of an opus number to show that a work was published after the death of its composer.",
    "category": "counting",
  },
  {
    "label": "D.667",
    "regex": /D\.\d*/gi,
    "definition": "Deutsch. He compiled the catalog of Schubert's works. Few works were published in Schubert's lifetime, so Deutsch compiled one in the forties or there abouts. An attempt was made to do so in chronological order. Compare to Mozart's K for Kuechel, BWV for Bach works catalog in German.",
    "category": "counting",
  },
  {
    "label": "Cantata",
    "regex": /Cantata/gi,
    "definition": "A cantata is a vocal composition with an instrumental accompaniment, typically in several movements, often involving a choir.",
    "category": "form",
  },
  {
    "label": "Rhapsody",
    "regex": /Rhapsody/gi,
    "definition": "A rhapsody in music is a one-movement work that is episodic yet integrated, free-flowing in structure, featuring a range of highly contrasted moods, colour, and tonality.",
    "category": "form",
  },
  {
    "label": "Theme",
    "regex": /Theme/gi,
    "definition": "The theme is the first main melody that you hear. It is the melody that the rest of the music will be based on. Sometimes the theme does not start immediately at the beginning of the piece but is preceded by an introduction.",
    "category": "form",
  },
  {
    "label": "Sinfonia Concertante",
    "regex": /Sinfonia\sConcertante/gi,
    "definition": "Sinfonia concertante (IPA: [siɱfoˈniːa kontʃerˈtante]; also called symphonie concertante) is an orchestral work, normally in several movements, in which one or more solo instruments contrast with the full orchestra.",
    "category": "form",
  },
  {
    "label": "WWV 103",
    "regex": /WWV\s\d*/gi,
    "definition": "The Wagner-Werk-Verzeichnis (Catalogue of Wagner's Works), abbreviated WWV, is an index and musicological guide to the 113 musical compositions and works for the stage by Richard Wagner.",
    "category": "counting",
  },
  {
    "label": "HWV.310",
    "regex": /HWV\.\d*/gi,
    "definition": "The Händel-Werke-Verzeichnis is the Catalogue of Handel's Works. It was published in three volumes by Bernd Baselt between 1978 and 1986, and lists every piece of music known to have been written by George Frideric Handel.",
    "category": "counting",
  },
  {
    "label": "Requiem",
    "regex": /Requiem/gi,
    "definition": "a musical composition setting parts of a requiem Mass (a Mass for the repose of the souls of the dead), or of a similar character.",
    "category": "form",
  },
  {
    "label": "Nocturne",
    "regex": /Nocturne/gi,
    "definition": "nocturne, (French: “Nocturnal”), in music, a composition inspired by, or evocative of, the night, and cultivated in the 19th century primarily as a character piece for piano.",
    "category": "form",
  },
  {
    "label": "Piano Trio",
    "regex": /Piano\sTrio/gi,
    "definition": 'a trio for piano and two stringed instruments, usually violin and cello.',
    "category": "orchestration",
  },
  {
    "label": "Orchestral",
    "regex": /(Orchestral?)/gi,
    "definition": "An orchestra is a large instrumental ensemble typical of classical music, which combines instruments from different families. There are typically four main sections of instruments: String instruments, Woodwinds, Brass instruments, and Percussion instruments.",
    "category": "orchestration",
  },
  {
    "label": "Cello suites",
    "regex": /(Cello\sSuite)/gi,
    "definition": "The six Cello Suites, BWV 1007–1012, are suites for unaccompanied cello by Johann Sebastian Bach. They are some of the most frequently performed solo compositions ever written for cello.",
    "category": "orchestration",
  },
  {
    "label": "Violin Concerto",
    "regex": /(Violin\sConcerto)/gi,
    "definition": "A violin concerto is a concerto for solo violin (occasionally, two or more violins) and instrumental ensemble (customarily orchestra). Such works have been written since the Baroque period, when the solo concerto form was first developed, up through the present day.",
    "category": "orchestration",
  },
  {
    "label": "Cello Concerto",
    "regex": /(Cello\sConcerto)/gi,
    "definition": "A cello concerto (sometimes called a violoncello concerto) is a concerto for solo cello with orchestra or, very occasionally, smaller groups of instruments.",
    "category": "orchestration",
  },
  {
    "label": "Piano Concerto",
    "regex": /(Piano\sConcerto)/gi,
    "definition": "A piano concerto, a type of concerto, is a solo composition in the classical music genre which is composed for piano accompanied by an orchestra or other large ensemble. Piano concertos are typically virtuosic showpieces which require an advanced level of technique.",
    "category": "orchestration",
  },
  {
    "label": "Fantasia",
    "regex": /(Fantasia?)/gi,
    "definition": "a free usually instrumental composition not in strict form",
    "category": "form",
  },
  {
    "label": "L.",
    "regex": /L\.\d*/gi,
    "definition": "compositions by Claude Debussy initially categorized by genre, and sorted within each genre by \"L\" number, according to the 2001 revised catalogue by musicologist François Lesure,[1] which is generally in chronological order of composition date. \"L\" numbers are also given from Lesure's original 1977 catalogue.",
    "category": "counting",
  },
  {
    "label": "S.",
    "regex": /S\.\d*/gi,
    "definition": "numbering as given in Humphrey Searle, The Music of Liszt, 1966",
    "category": "counting",
  },
  {
    "label": "LW.",
    "regex": /LW\.\d*/gi,
    "definition": "numbering by R. Charnin Mueller and M. Eckhardt referenced in Grove Music Online (2010)",
    "category": "counting",
  },
  {
    "label": "B.",
    "regex": /B\.\d*/g,
    "definition": "Antonín Dvořák includes works sortable by Jarmil Burghauser catalogue number (B.)",
    "category": "counting",
  },
  {
    "label": "RV.",
    "regex": /RV\.\d*/gi,
    "definition": "The Ryom-Verzeichnis or Ryom Verzeichnis[1] (both often abbreviated RV) is the standard catalogue of the music of Antonio Vivaldi created by Danish musicologist Peter Ryom.",
    "category": "counting",
  },
  {
    "label": "Prelude",
    "regex": /(Prelude?)/gi,
    "definition": "A prelude is a short piece of music, the form of which may vary from piece to piece. While, during the Baroque era, for example, it may have served as an introduction to succeeding movements of a work that were usually longer and more complex, it may also have been a stand-alone piece of work during the Romantic era.",
    "category": "form",
  },
];

export const getWorkTitleDefinitions = (title: string) : Array<DefinitionMatch> => {
  const definitionMatches: Array<DefinitionMatch> = [];

  definitions.forEach((d: Definition) => {
    const matches = title.match(d.regex);
    if (matches) {
      matches.forEach((m) => {
        definitionMatches.push({
          label: d.label,
          definition: d.definition,
          category: d.category,
          match: m,
        });
      });
    }
  });

  return definitionMatches
    .sort((a, b) => {
      return title.indexOf(a.match) - title.indexOf(b.match)
    });
};
