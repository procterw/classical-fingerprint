import json
import wikipediaapi
import nltk.data
nltk.download('punkt')

# https://github.com/martin-majlis/Wikipedia-API

print("scraping....")

composers = list([
  {
    "id": "149",
    "complete_name": "John Adams (composer)",
  },
  {
    "id": "87",
    "complete_name": "Johann Sebastian Bach",
  },
  {
    "id": "125",
    "complete_name": "Béla Bartók",
  },
  {
    "id": "145",
    "complete_name": "Ludwig van Beethoven",
  },
  {
    "id": "210",
    "complete_name": "Alban Berg",
  },
  {
    "id": "175",
    "complete_name": "Hector Berlioz",
  },
  {
    "id": "43",
    "complete_name": "Alexander Borodin",
  },
  {
    "id": "132",
    "complete_name": "Pierre Boulez",
  },
  {
    "id": "80",
    "complete_name": "Johannes Brahms",
  },
  {
    "id": "169",
    "complete_name": "Benjamin Britten",
  },
  {
    "id": "2",
    "complete_name": "Anton Bruckner",
  },
  {
    "id": "152",
    "complete_name": "Frédéric Chopin",
  },
  {
    "id": "170",
    "complete_name": "Aaron Copland",
  },
  {
    "id": "128",
    "complete_name": "François Couperin",
  },
  {
    "id": "105",
    "complete_name": "Claude Debussy",
  },
  {
    "id": "50",
    "complete_name": "Josquin Des Prez",
  },
  {
    "id": "82",
    "complete_name": "Guillaume Dufay",
  },
  {
    "id": "189",
    "complete_name": "Antonín Dvořák",
  },
  {
    "id": "198",
    "complete_name": "Edward Elgar",
  },
  {
    "id": "37",
    "complete_name": "Manuel de Falla",
  },
  {
    "id": "12",
    "complete_name": "César Franck",
  },
  {
    "id": "136",
    "complete_name": "George Gershwin",
  },
  {
    "id": "14",
    "complete_name": "Carlo Gesualdo",
  },
  {
    "id": "32",
    "complete_name": "Alberto Ginastera",
  },
  {
    "id": "95",
    "complete_name": "Philip Glass",
  },
  {
    "id": "92",
    "complete_name": "Christoph Willibald von Gluck",
  },
  {
    "id": "162",
    "complete_name": "Edvard Grieg",
  },
  {
    "id": "67",
    "complete_name": "George Frideric Handel",
  },
  {
    "id": "208",
    "complete_name": "Franz Joseph Haydn",
  },
  {
    "id": "217",
    "complete_name": "Charles Ives",
  },
  {
    "id": "96",
    "complete_name": "Leoš Janáček",
  },
  {
    "id": "88",
    "complete_name": "Orlande de Lassus",
  },
  {
    "id": "26",
    "complete_name": "György Ligeti",
  },
  {
    "id": "197",
    "complete_name": "Franz Liszt",
  },
  {
    "id": "10",
    "complete_name": "Jean-Baptiste Lully",
  },
  {
    "id": "142",
    "complete_name": "Witold Lutoslawski",
  },
  {
    "id": "77",
    "complete_name": "Gustav Mahler",
  },
  {
    "id": "11",
    "complete_name": "Bohuslav Martinů",
  },
  {
    "id": "147",
    "complete_name": "Felix Mendelssohn",
  },
  {
    "id": "150",
    "complete_name": "Olivier Messiaen",
  },
  {
    "id": "121",
    "complete_name": "Darius Milhaud",
  },
  {
    "id": "39",
    "complete_name": "Claudio Monteverdi",
  },
  {
    "id": "196",
    "complete_name": "Wolfgang Amadeus Mozart",
  },
  {
    "id": "181",
    "complete_name": "Modest Mussorgsky",
  },
  {
    "id": "52",
    "complete_name": "Carl Nielsen",
  },
  {
    "id": "214",
    "complete_name": "Giovanni Pierluigi da Palestrina",
  },
  {
    "id": "5",
    "complete_name": "Arvo Pärt",
  },
  {
    "id": "202",
    "complete_name": "Francis Poulenc",
  },
  {
    "id": "185",
    "complete_name": "Sergei Prokofiev",
  },
  {
    "id": "146",
    "complete_name": "Giacomo Puccini",
  },
  {
    "id": "199",
    "complete_name": "Henry Purcell",
  },
  {
    "id": "188",
    "complete_name": "Sergei Rachmaninoff",
  },
  {
    "id": "178",
    "complete_name": "Jean-Philippe Rameau",
  },
  {
    "id": "57",
    "complete_name": "Maurice Ravel",
  },
  {
    "id": "176",
    "complete_name": "Steve Reich",
  },
  {
    "id": "118",
    "complete_name": "Nikolai Rimsky-Korsakov",
  },
  {
    "id": "60",
    "complete_name": "Gioachino Rossini",
  },
  {
    "id": "45",
    "complete_name": "Camille Saint-Saëns",
  },
  {
    "id": "97",
    "complete_name": "Domenico Scarlatti",
  },
  {
    "id": "137",
    "complete_name": "Alfred Schnittke",
  },
  {
    "id": "62",
    "complete_name": "Arnold Schoenberg",
  },
  {
    "id": "183",
    "complete_name": "Franz Schubert",
  },
  {
    "id": "129",
    "complete_name": "Robert Schumann",
  },
  {
    "id": "191",
    "complete_name": "Heinrich Schütz",
  },
  {
    "id": "46",
    "complete_name": "Dmitri Shostakovich",
  },
  {
    "id": "186",
    "complete_name": "Jean Sibelius",
  },
  {
    "id": "211",
    "complete_name": "Bedrich Smetana",
  },
  {
    "id": "190",
    "complete_name": "Igor Stravinsky",
  },
  {
    "id": "79",
    "complete_name": "Pyotr Ilyich Tchaikovsky",
  },
  {
    "id": "35",
    "complete_name": "Giuseppe Verdi",
  },
  {
    "id": "55",
    "complete_name": "Heitor Villa-Lobos",
  },
  {
    "id": "98",
    "complete_name": "Antonio Vivaldi",
  },
  {
    "id": "138",
    "complete_name": "Richard Wagner",
  },
  {
    "id": "6",
    "complete_name": "Anton Webern",
  },
])

wiki_wiki = wikipediaapi.Wikipedia('MyProjectName (merlin@example.com)', 'en')

tokenizer = nltk.data.load('tokenizers/punkt/english.pickle')

data = {}

for c in composers:
  page_py = wiki_wiki.page(c["complete_name"])

  data[c["id"]] = {
    "complete_name": c["complete_name"],
    "bio_preview": " ".join(tokenizer.tokenize(page_py.summary.splitlines()[0])[:3]),
    "biography": page_py.summary.splitlines()[0],
    "wiki_url": page_py.fullurl
  }
  
with open("composer_bios.ts", "w") as outfile: 
  outfile.write("export interface ComposerBios {\n")
  outfile.write("  [key: string]: {\n")
  outfile.write("    complete_name: string,\n")
  outfile.write("    bio_preview: string,\n")
  outfile.write("    biography: string,\n")
  outfile.write("    wiki_url: string,\n")
  outfile.write("  }\n")
  outfile.write("};\n")
  outfile.write("\n")
  outfile.write("export const composerBios: ComposerBios = ")
  json.dump(data, outfile, indent = 2)
  outfile.write(";")

