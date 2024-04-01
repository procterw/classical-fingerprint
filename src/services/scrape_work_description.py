import json
import time
import wikipediaapi
import random
from urllib.parse import unquote
from googleapiclient.discovery import build

g_api_key = "___KEY___"
google_search_engine = build("customsearch", "v1", developerKey=g_api_key)
search_engine_id = "___KEY___"

def google_search(search_term, **kwargs):
  res = google_search_engine.cse().list(q=search_term, cx=search_engine_id, **kwargs).execute()
  if (res["searchInformation"]["totalResults"] == '0'):
    return False
  return res['items']

print("scraping....")

works = list([
  {
    "id": "13260",
    "composer": "Claude Debussy",
    "title": "String Quartet in G minor, L.85, op. 10"
  },
  {
    "id": "13251",
    "composer": "Claude Debussy",
    "title": "Children's Corner, L.113"
  },
  {
    "id": "13297",
    "composer": "Claude Debussy",
    "title": "Suite Bergamasque, L.75 "
  },
  {
    "id": "13331",
    "composer": "Claude Debussy",
    "title": "La Mer, L.109"
  },
  {
    "id": "13215",
    "composer": "Claude Debussy",
    "title": "Prélude à l'après-midi d'un faune, L.86"
  },
  {
    "id": "4321",
    "composer": "Josquin Des Prez",
    "title": "Missa Pange lingua "
  },
  {
    "id": "16893",
    "composer": "John Adams",
    "title": "China Gates"
  },
  {
    "id": "16875",
    "composer": "John Adams",
    "title": "Harmonielehre"
  },
  {
    "id": "16896",
    "composer": "John Adams",
    "title": "Short Ride in a Fast Machine"
  },
  {
    "id": "16890",
    "composer": "John Adams",
    "title": "Nixon in China"
  },
  {
    "id": "9231",
    "composer": "Johann Sebastian Bach",
    "title": "Cello Suite no. 1 in G major, BWV.1007"
  },
  {
    "id": "9172",
    "composer": "Johann Sebastian Bach",
    "title": "Passacaglia and Fugue in C minor, BWV.582"
  },
  {
    "id": "28101",
    "composer": "Johann Sebastian Bach",
    "title": "Toccata and fugue in D minor, BWV.565"
  },
  {
    "id": "9664",
    "composer": "Johann Sebastian Bach",
    "title": "Brandenburg Concerto no. 2 in F major, BWV.1047"
  },
  {
    "id": "9688",
    "composer": "Johann Sebastian Bach",
    "title": "Brandenburg Concerto no. 3 in G major, BWV.1048"
  },
  {
    "id": "9796",
    "composer": "Johann Sebastian Bach",
    "title": "Orchestral Suite no. 3 in D major, BWV.1068"
  },
  {
    "id": "9845",
    "composer": "Johann Sebastian Bach",
    "title": "Violin Concerto in A minor, BWV.1041"
  },
  {
    "id": "9334",
    "composer": "Johann Sebastian Bach",
    "title": "Cantata no. 140, \"Wachet auf, ruft uns die Stimme\", BWV.140"
  },
  {
    "id": "9148",
    "composer": "Johann Sebastian Bach",
    "title": "Cantata no. 147: Herz und Mund und Tat und Leben "
  },
  {
    "id": "9848",
    "composer": "Johann Sebastian Bach",
    "title": "Passion According to St. Matthew, BWV.244"
  },
  {
    "id": "14686",
    "composer": "Béla Bartók",
    "title": "Allegro barbaro, BB63, Sz.49"
  },
  {
    "id": "14695",
    "composer": "Béla Bartók",
    "title": "Concerto for Orchestra, BB123, Sz.116"
  },
  {
    "id": "14658",
    "composer": "Béla Bartók",
    "title": "Music for Strings, Percussion and Celesta, BB114, Sz.106"
  },
  {
    "id": "28084",
    "composer": "Béla Bartók",
    "title": "Piano Concerto no. 3 in E major, BB127, Sz.119"
  },
  {
    "id": "16231",
    "composer": "Ludwig van Beethoven",
    "title": "Piano Trio no. 7 in B flat major, op. 97, \"Archduke\""
  },
  {
    "id": "16245",
    "composer": "Ludwig van Beethoven",
    "title": "String Quartet no. 7 in F major, op. 59 no. 1, \"Razumovsky\""
  },
  {
    "id": "16331",
    "composer": "Ludwig van Beethoven",
    "title": "Violin Sonata no. 9 in A major, op. 47, \"Kreutzer\""
  },
  {
    "id": "16222",
    "composer": "Ludwig van Beethoven",
    "title": "Piano Sonata no. 8 in C minor, op. 13, \"Pathétique\""
  },
  {
    "id": "16184",
    "composer": "Ludwig van Beethoven",
    "title": "Piano Sonata no. 21 in C major, op. 53, \"Waldstein\""
  },
  {
    "id": "16419",
    "composer": "Ludwig van Beethoven",
    "title": "Piano Sonata no. 23 in F minor, op. 57, \"Appassionata\""
  },
  {
    "id": "16218",
    "composer": "Ludwig van Beethoven",
    "title": "Piano Concerto no. 5 in E flat major, op. 73, \"Emperor\""
  },
  {
    "id": "16406",
    "composer": "Ludwig van Beethoven",
    "title": "Symphony no. 5 in C minor, op. 67"
  },
  {
    "id": "16238",
    "composer": "Ludwig van Beethoven",
    "title": "Symphony no. 9 in D minor, op. 125, \"Choral\""
  },
  {
    "id": "16458",
    "composer": "Ludwig van Beethoven",
    "title": "Violin Concerto in D major, op. 61"
  },
  {
    "id": "26247",
    "composer": "Alban Berg",
    "title": "Violin Concerto"
  },
  {
    "id": "20029",
    "composer": "Hector Berlioz",
    "title": "Harold en Italie, H.68, op. 16"
  },
  {
    "id": "20003",
    "composer": "Hector Berlioz",
    "title": "Symphonie fantastique: Épisode de la vie d'une artiste, op. 14"
  },
  {
    "id": "3614",
    "composer": "Alexander Borodin",
    "title": "In the Steppes of Central Asia"
  },
  {
    "id": "28113",
    "composer": "Alexander Borodin",
    "title": "Polovtsian Dances"
  },
  {
    "id": "3601",
    "composer": "Alexander Borodin",
    "title": "Symphony no. 2 in B minor"
  },
  {
    "id": "7757",
    "composer": "Johannes Brahms",
    "title": "Clarinet Quintet in B minor, op. 115"
  },
  {
    "id": "7715",
    "composer": "Johannes Brahms",
    "title": "String Sextet no. 1 in B flat major, op. 18"
  },
  {
    "id": "7774",
    "composer": "Johannes Brahms",
    "title": "Piano Concerto no. 2 in B flat major, op. 83"
  },
  {
    "id": "7765",
    "composer": "Johannes Brahms",
    "title": "Symphony no. 3 in F major, op. 90"
  },
  {
    "id": "7706",
    "composer": "Johannes Brahms",
    "title": "Symphony no. 4 in E minor, op. 98"
  },
  {
    "id": "7764",
    "composer": "Johannes Brahms",
    "title": "Violin Concerto in D major, op. 77"
  },
  {
    "id": "7645",
    "composer": "Johannes Brahms",
    "title": "Ein deutsches Requiem, op. 45"
  },
  {
    "id": "19428",
    "composer": "Benjamin Britten",
    "title": "4 Sea Interludes from Peter Grimes, op. 33a"
  },
  {
    "id": "19303",
    "composer": "Benjamin Britten",
    "title": "Young Person's Guide to the Orchestra, op. 34"
  },
  {
    "id": "19378",
    "composer": "Benjamin Britten",
    "title": "Les Illuminations, op. 18 "
  },
  {
    "id": "19458",
    "composer": "Benjamin Britten",
    "title": "Serenade for Tenor, Horn, and Strings, op. 31"
  },
  {
    "id": "27",
    "composer": "Anton Bruckner",
    "title": "Symphony no. 4 in E flat major, WAB 104, \"Romantic\""
  },
  {
    "id": "29",
    "composer": "Anton Bruckner",
    "title": "Symphony no. 7 in E major, WAB 107"
  },
  {
    "id": "76",
    "composer": "Anton Bruckner",
    "title": "Te Deum, WAB 45"
  },
  {
    "id": "17109",
    "composer": "Frédéric Chopin",
    "title": "Nocturnes, op. 9"
  },
  {
    "id": "17119",
    "composer": "Frédéric Chopin",
    "title": "Polonaise no. 6 in A flat major, op. 53, \"Heroic\""
  },
  {
    "id": "17276",
    "composer": "Frédéric Chopin",
    "title": "Preludes, op. 28"
  },
  {
    "id": "17167",
    "composer": "Frédéric Chopin",
    "title": "Sonata no. 2 in B flat minor, op. 35"
  },
  {
    "id": "17236",
    "composer": "Frédéric Chopin",
    "title": "Piano Concerto no. 1 in E minor, op. 11"
  },
  {
    "id": "19565",
    "composer": "Aaron Copland",
    "title": "El Salón México"
  },
  {
    "id": "19597",
    "composer": "Aaron Copland",
    "title": "Fanfare for the Common Man"
  },
  {
    "id": "19537",
    "composer": "Aaron Copland",
    "title": "Appalachian Spring"
  },
  {
    "id": "22331",
    "composer": "Antonín Dvořák",
    "title": "Piano Trio in E minor, op. 90, \"Dumky\""
  },
  {
    "id": "22377",
    "composer": "Antonín Dvořák",
    "title": "String Quartet no. 12 in F, op. 96, \"American\""
  },
  {
    "id": "22310",
    "composer": "Antonín Dvořák",
    "title": "Carnival, op. 92"
  },
  {
    "id": "22248",
    "composer": "Antonín Dvořák",
    "title": "Cello Concerto in B minor, op. 104"
  },
  {
    "id": "22221",
    "composer": "Antonín Dvořák",
    "title": "Serenade for Strings in E major, op. 22"
  },
  {
    "id": "22354",
    "composer": "Antonín Dvořák",
    "title": "Symphony no. 8 in G major, B.163, op. 88"
  },
  {
    "id": "22368",
    "composer": "Antonín Dvořák",
    "title": "Symphony no. 9 in E minor, op. 95, \"From the New World\""
  },
  {
    "id": "24494",
    "composer": "Edward Elgar",
    "title": "Enigma Variations, op. 36"
  },
  {
    "id": "7884",
    "composer": "Guillaume Dufay",
    "title": "Missa L'Homme armé "
  },
  {
    "id": "7932",
    "composer": "Guillaume Dufay",
    "title": "Missa Se la face ay pale "
  },
  {
    "id": "28099",
    "composer": "Manuel de Falla",
    "title": "El amor brujo"
  },
  {
    "id": "1155",
    "composer": "César Franck",
    "title": "Violin Sonata in A major, M.8"
  },
  {
    "id": "1132",
    "composer": "César Franck",
    "title": "Symphony in D minor, M.48"
  },
  {
    "id": "2484",
    "composer": "Alberto Ginastera",
    "title": "Estancia, op. 8a"
  },
  {
    "id": "15544",
    "composer": "George Gershwin",
    "title": "An American in Paris "
  },
  {
    "id": "15562",
    "composer": "George Gershwin",
    "title": "Rhapsody in Blue"
  },
  {
    "id": "10830",
    "composer": "Philip Glass",
    "title": "Glassworks, 6 pieces for chamber ensemble or piano"
  },
  {
    "id": "10825",
    "composer": "Philip Glass",
    "title": "Metamorphosis"
  },
  {
    "id": "10818",
    "composer": "Philip Glass",
    "title": "Violin Concerto"
  },
  {
    "id": "10854",
    "composer": "Philip Glass",
    "title": "Akhnaten"
  },
  {
    "id": "10704",
    "composer": "Christoph Willibald von Gluck",
    "title": "Iphigénie en Tauride,, Wq. 46"
  },
  {
    "id": "28116",
    "composer": "Christoph Willibald von Gluck",
    "title": "Orfeo ed Euridice"
  },
  {
    "id": "18093",
    "composer": "Edvard Grieg",
    "title": "From Holberg’s Time, for string orchestra, \"Holberg Suite\""
  },
  {
    "id": "18116",
    "composer": "Edvard Grieg",
    "title": "Lyric Suite "
  },
  {
    "id": "18105",
    "composer": "Edvard Grieg",
    "title": "Peer Gynt Suite no. 1, op. 46"
  },
  {
    "id": "18023",
    "composer": "Edvard Grieg",
    "title": "Peer Gynt Suite no. 2, op. 55"
  },
  {
    "id": "18148",
    "composer": "Edvard Grieg",
    "title": "Piano Concerto in A minor, op. 16"
  },
  {
    "id": "6233",
    "composer": "George Frideric Handel",
    "title": "Concerto Grosso in A major, op. 6, no. 11, HWV.329"
  },
  {
    "id": "6431",
    "composer": "George Frideric Handel",
    "title": "Music for the Royal Fireworks in D major, HWV.351"
  },
  {
    "id": "6480",
    "composer": "George Frideric Handel",
    "title": "Organ Concerto in B flat major, op. 4, no. 6, HWV.294"
  },
  {
    "id": "6209",
    "composer": "George Frideric Handel",
    "title": "Organ Concerto in F major, HWV.295, \"The Cuckoo and the Nightingale\""
  },
  {
    "id": "6485",
    "composer": "George Frideric Handel",
    "title": "Organ Concerto in G minor, op. 7, no. 5, HWV.310"
  },
  {
    "id": "6216",
    "composer": "George Frideric Handel",
    "title": "Water Music Suite no. 1 in F major, HWV.348"
  },
  {
    "id": "6500",
    "composer": "George Frideric Handel",
    "title": "Water Music Suite no. 2 in D major, HWV.349"
  },
  {
    "id": "6494",
    "composer": "George Frideric Handel",
    "title": "Water Music Suite no. 3 in G major, HWV.350"
  },
  {
    "id": "28083",
    "composer": "George Frideric Handel",
    "title": "Messiah, HWV.56"
  },
  {
    "id": "25786",
    "composer": "Franz Joseph Haydn",
    "title": "Keyboard Concerto in D major, Hob.XVIII:11"
  },
  {
    "id": "25472",
    "composer": "Franz Joseph Haydn",
    "title": "Symphony no. 45 in F sharp minor, Hob.I:45, \"Farewell\""
  },
  {
    "id": "25919",
    "composer": "Franz Joseph Haydn",
    "title": "Symphony no. 94 in G, Hob.I:94, \"Surprise\""
  },
  {
    "id": "25505",
    "composer": "Franz Joseph Haydn",
    "title": "Symphony no. 100 in G, Hob.I:100, \"Military\""
  },
  {
    "id": "25814",
    "composer": "Franz Joseph Haydn",
    "title": "Symphony no. 103 in E flat major, Hob.I:103, \"Drum Roll\""
  },
  {
    "id": "26120",
    "composer": "Franz Joseph Haydn",
    "title": "Symphony no. 104 in D, Hob.I:104, \"London\""
  },
  {
    "id": "27010",
    "composer": "Charles Ives",
    "title": "Piano Sonata no. 2, \"Concord\""
  },
  {
    "id": "27095",
    "composer": "Charles Ives",
    "title": "Central Park in the Dark"
  },
  {
    "id": "27009",
    "composer": "Charles Ives",
    "title": "Symphony no. 2"
  },
  {
    "id": "26971",
    "composer": "Charles Ives",
    "title": "The Unanswered Question, for trumpet, winds, and string orchestra"
  },
  {
    "id": "10935",
    "composer": "Leoš Janáček",
    "title": "String Quartet no. 1, JW VII/8, \"Kreutzer\""
  },
  {
    "id": "10933",
    "composer": "Leoš Janáček",
    "title": "String Quartet no. 2, JW VII/13, \"Listy duverné,' 'Intimate Letters\""
  },
  {
    "id": "10951",
    "composer": "Leoš Janáček",
    "title": "Sinfonietta, JW VI/18"
  },
  {
    "id": "10936",
    "composer": "Leoš Janáček",
    "title": "Taras Bulba  JW VI/15"
  },
  {
    "id": "10971",
    "composer": "Leoš Janáček",
    "title": "Glagolitic Mass, JW III/9"
  },
  {
    "id": "2068",
    "composer": "György Ligeti",
    "title": "Lux aeterna, for a cappella chorus "
  },
  {
    "id": "24319",
    "composer": "Franz Liszt",
    "title": "Les Préludes, S.97"
  },
  {
    "id": "24219",
    "composer": "Franz Liszt",
    "title": "Piano Concerto no. 1 in E flat major, S.124"
  },
  {
    "id": "16642",
    "composer": "Felix Mendelssohn",
    "title": "String Octet in E flat major, op. 20"
  },
  {
    "id": "16741",
    "composer": "Felix Mendelssohn",
    "title": "A Midsummer Night's Dream, op. 61"
  },
  {
    "id": "16674",
    "composer": "Felix Mendelssohn",
    "title": "Symphony no. 3 in A minor, op. 56, \"Scottish\""
  },
  {
    "id": "16718",
    "composer": "Felix Mendelssohn",
    "title": "Symphony no. 4 in A, op. 90, \"Italian\""
  },
  {
    "id": "16609",
    "composer": "Felix Mendelssohn",
    "title": "Violin Concerto in E minor, op. 64"
  },
  {
    "id": "1045",
    "composer": "Bohuslav Martinů",
    "title": "Double Concerto, H.271"
  },
  {
    "id": "970",
    "composer": "Bohuslav Martinů",
    "title": "Piano Concerto no. 4, H.358, \"Incantations\""
  },
  {
    "id": "15964",
    "composer": "Witold Lutoslawski",
    "title": "Jeux venitiens"
  },
  {
    "id": "7278",
    "composer": "Gustav Mahler",
    "title": "Symphony no. 2 in C minor, \"Resurrection\""
  },
  {
    "id": "7277",
    "composer": "Gustav Mahler",
    "title": "Symphony no. 5 in C sharp minor"
  },
  {
    "id": "14419",
    "composer": "Darius Milhaud",
    "title": "Saudades do Brasil, op. 67"
  },
  {
    "id": "14347",
    "composer": "Darius Milhaud",
    "title": "La création du monde, op. 81"
  },
  {
    "id": "14452",
    "composer": "Darius Milhaud",
    "title": "Le boeuf sur le toit, op. 58"
  },
  {
    "id": "16906",
    "composer": "Olivier Messiaen",
    "title": "Quatuor pour la fin du temps, I/22"
  },
  {
    "id": "16907",
    "composer": "Olivier Messiaen",
    "title": "Turangalila-symphonie, for orchestra"
  },
  {
    "id": "3174",
    "composer": "Claudio Monteverdi",
    "title": "Orfeo, SV318"
  },
  {
    "id": "3291",
    "composer": "Claudio Monteverdi",
    "title": "Vespro della beata Vergine, SV206"
  },
  {
    "id": "23155",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Piano Quartet no. 1 in G minor, K.478"
  },
  {
    "id": "23503",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "String Quartet no. 19 in C major, K.465, \"Dissonance\""
  },
  {
    "id": "23752",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Fantasia in D minor, K.397"
  },
  {
    "id": "23512",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Piano Sonata no. 11 in A major, K.331, \"Alla turca\""
  },
  {
    "id": "23200",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Concerto for Flute and Harp in C major, K.299"
  },
  {
    "id": "23310",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Piano Concerto no. 20 in D minor, K.466"
  },
  {
    "id": "23315",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Piano Concerto no. 21 in C major, K.467"
  },
  {
    "id": "23838",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Sinfonia concertante in E flat major, K.364"
  },
  {
    "id": "23637",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Symphony no. 25 in G minor, K.183"
  },
  {
    "id": "23611",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Symphony no. 40 in G minor, K.550"
  },
  {
    "id": "23566",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "The Magic Flute, K.620"
  },
  {
    "id": "23646",
    "composer": "Wolfgang Amadeus Mozart",
    "title": "Requiem in D minor, K.626"
  },
  {
    "id": "20403",
    "composer": "Modest Mussorgsky",
    "title": "Pictures at an Exhibition "
  },
  {
    "id": "20429",
    "composer": "Modest Mussorgsky",
    "title": "Night on Bald Mountain "
  },
  {
    "id": "4459",
    "composer": "Carl Nielsen",
    "title": "Flute Concerto, FS119"
  },
  {
    "id": "4455",
    "composer": "Carl Nielsen",
    "title": "Symphony no. 4, FS76, op. 29, \"The Inextinguishable\""
  },
  {
    "id": "4501",
    "composer": "Carl Nielsen",
    "title": "Symphony no. 5, FS97, op. 50"
  },
  {
    "id": "21566",
    "composer": "Sergei Prokofiev",
    "title": "Peter and the Wolf, op. 67"
  },
  {
    "id": "21510",
    "composer": "Sergei Prokofiev",
    "title": "Piano Concerto no. 3 in C major, op. 26"
  },
  {
    "id": "21558",
    "composer": "Sergei Prokofiev",
    "title": "Romeo and Juliet Suite no. 1, op. 64bis"
  },
  {
    "id": "21525",
    "composer": "Sergei Prokofiev",
    "title": "Romeo and Juliet Suite no. 2, op. 64ter"
  },
  {
    "id": "21536",
    "composer": "Sergei Prokofiev",
    "title": "Symphony no. 1 in D, op. 25, \"Classical\""
  },
  {
    "id": "21531",
    "composer": "Sergei Prokofiev",
    "title": "Lieutenant Kijé, op. 60"
  },
  {
    "id": "26562",
    "composer": "Giovanni Pierluigi da Palestrina",
    "title": "Missa Papae Marcelli "
  },
  {
    "id": "422",
    "composer": "Arvo Pärt",
    "title": "Tabula rasa"
  },
  {
    "id": "25047",
    "composer": "Francis Poulenc",
    "title": "Concert champêtre, for harpsichord and orchestra, FP49"
  },
  {
    "id": "24962",
    "composer": "Francis Poulenc",
    "title": "Concerto in D minor for 2 Pianos and Orchestra, FP61"
  },
  {
    "id": "24976",
    "composer": "Francis Poulenc",
    "title": "Les biches, FP36"
  },
  {
    "id": "22103",
    "composer": "Sergei Rachmaninoff",
    "title": "Piano Concerto no. 2 in C minor, op. 18"
  },
  {
    "id": "22111",
    "composer": "Sergei Rachmaninoff",
    "title": "Rhapsody on a Theme by Paganini, op. 43"
  },
  {
    "id": "16525",
    "composer": "Giacomo Puccini",
    "title": "La bohème"
  },
  {
    "id": "16529",
    "composer": "Giacomo Puccini",
    "title": "Madama Butterfly"
  },
  {
    "id": "16519",
    "composer": "Giacomo Puccini",
    "title": "Tosca"
  },
  {
    "id": "20071",
    "composer": "Steve Reich",
    "title": "Different Trains, for double string quartet and tape"
  },
  {
    "id": "20081",
    "composer": "Steve Reich",
    "title": "Music for Pieces of Wood, for 5 pairs of tuned claves"
  },
  {
    "id": "5112",
    "composer": "Maurice Ravel",
    "title": "La valse "
  },
  {
    "id": "5095",
    "composer": "Maurice Ravel",
    "title": "Piano Concerto in G"
  },
  {
    "id": "5044",
    "composer": "Maurice Ravel",
    "title": "Boléro"
  },
  {
    "id": "14278",
    "composer": "Nikolai Rimsky-Korsakov",
    "title": "Capriccio espagnol, op. 34"
  },
  {
    "id": "14243",
    "composer": "Nikolai Rimsky-Korsakov",
    "title": "Russian Easter Festival Overture, op. 36"
  },
  {
    "id": "14258",
    "composer": "Nikolai Rimsky-Korsakov",
    "title": "Sheherazade, op. 35"
  },
  {
    "id": "3806",
    "composer": "Camille Saint-Saëns",
    "title": "Carnival of the Animals"
  },
  {
    "id": "3787",
    "composer": "Camille Saint-Saëns",
    "title": "Cello Concerto no. 1 in A minor, op. 33"
  },
  {
    "id": "3799",
    "composer": "Camille Saint-Saëns",
    "title": "Piano Concerto no. 2 in G minor, op. 22"
  },
  {
    "id": "3785",
    "composer": "Camille Saint-Saëns",
    "title": "Symphony no. 3 in C minor, op. 78, \"Organ\""
  },
  {
    "id": "5441",
    "composer": "Gioachino Rossini",
    "title": "Guillaume Tell "
  },
  {
    "id": "5371",
    "composer": "Gioachino Rossini",
    "title": "Il barbiere di Siviglia "
  },
  {
    "id": "15655",
    "composer": "Alfred Schnittke",
    "title": "Concerto Grosso no. 1, for 2 violins, harpsichord, prepared piano and 21 strings"
  },
  {
    "id": "15614",
    "composer": "Alfred Schnittke",
    "title": "Concerto Grosso no. 2, for violin, cello, and orchestra"
  },
  {
    "id": "5557",
    "composer": "Arnold Schoenberg",
    "title": "Verklärte Nacht, for string sextet, op. 4"
  },
  {
    "id": "5620",
    "composer": "Arnold Schoenberg",
    "title": "Pierrot lunaire, for voice and chamber ensemble, op. 21"
  },
  {
    "id": "15111",
    "composer": "Robert Schumann",
    "title": "Piano Quintet in E flat major, op. 44"
  },
  {
    "id": "15091",
    "composer": "Robert Schumann",
    "title": "Carnaval, op. 9"
  },
  {
    "id": "15076",
    "composer": "Robert Schumann",
    "title": "Fantasy in C major, op. 17"
  },
  {
    "id": "15144",
    "composer": "Robert Schumann",
    "title": "Piano Concerto in A minor, op. 54"
  },
  {
    "id": "21970",
    "composer": "Jean Sibelius",
    "title": "En Saga, op. 9"
  },
  {
    "id": "21716",
    "composer": "Jean Sibelius",
    "title": "Finlandia, op. 26"
  },
  {
    "id": "21945",
    "composer": "Jean Sibelius",
    "title": "Symphony no. 2 in D major, op. 43"
  },
  {
    "id": "22016",
    "composer": "Jean Sibelius",
    "title": "Symphony no. 5 in E flat major, op. 82"
  },
  {
    "id": "21834",
    "composer": "Jean Sibelius",
    "title": "Violin Concerto in D minor, op. 47"
  },
  {
    "id": "21352",
    "composer": "Franz Schubert",
    "title": "Piano Quintet in A major, D.667, op. posth.114, \"The Trout\""
  },
  {
    "id": "20542",
    "composer": "Franz Schubert",
    "title": "Piano Trio no. 2 in E flat major, D.929, op. 100"
  },
  {
    "id": "20959",
    "composer": "Franz Schubert",
    "title": "String Quartet no. 14 in D minor, D.810, \"Death and the Maiden\""
  },
  {
    "id": "21429",
    "composer": "Franz Schubert",
    "title": "String Quintet in C major, D.956, op. posth.163"
  },
  {
    "id": "21133",
    "composer": "Franz Schubert",
    "title": "Fantasia in F minor, D.940, op. posth.103"
  },
  {
    "id": "20766",
    "composer": "Franz Schubert",
    "title": "Symphony no. 8 in B minor, D.759, \"Unfinished\""
  },
  {
    "id": "20545",
    "composer": "Franz Schubert",
    "title": "Symphony no. 9 in C major, D.944, \"Great\""
  },
  {
    "id": "21086",
    "composer": "Franz Schubert",
    "title": "Erlkönig, D.328, op. 1"
  },
  {
    "id": "21138",
    "composer": "Franz Schubert",
    "title": "Gretchen am Spinnrade, D.118, op. 2"
  },
  {
    "id": "22484",
    "composer": "Igor Stravinsky",
    "title": "Octet for Wind Instruments"
  },
  {
    "id": "22478",
    "composer": "Igor Stravinsky",
    "title": "Ebony Concerto"
  },
  {
    "id": "22430",
    "composer": "Igor Stravinsky",
    "title": "Symphony in Three Movements"
  },
  {
    "id": "22391",
    "composer": "Igor Stravinsky",
    "title": "Petrushka"
  },
  {
    "id": "22427",
    "composer": "Igor Stravinsky",
    "title": "The Firebird"
  },
  {
    "id": "22505",
    "composer": "Igor Stravinsky",
    "title": "The Rite of Spring"
  },
  {
    "id": "22440",
    "composer": "Igor Stravinsky",
    "title": "Symphony of Psalms"
  },
  {
    "id": "26281",
    "composer": "Bedrich Smetana",
    "title": "Má vlast, JB 1:112"
  },
  {
    "id": "26276",
    "composer": "Bedrich Smetana",
    "title": "The Bartered Bride, JB 1:100"
  },
  {
    "id": "4004",
    "composer": "Dmitri Shostakovich",
    "title": "String Quartet no. 8 in C minor, op. 110"
  },
  {
    "id": "3976",
    "composer": "Dmitri Shostakovich",
    "title": "Piano Concerto no. 1 in C minor, for piano, trumpet, and strings, op. 35"
  },
  {
    "id": "3916",
    "composer": "Dmitri Shostakovich",
    "title": "Symphony no. 5 in D minor, op. 47"
  },
  {
    "id": "3909",
    "composer": "Dmitri Shostakovich",
    "title": "Symphony no. 7 in C major, op. 60, \"Leningrad\""
  },
  {
    "id": "4045",
    "composer": "Dmitri Shostakovich",
    "title": "Symphony no. 8 in C minor, op. 65, \"Stalingrad\""
  },
  {
    "id": "7486",
    "composer": "Pyotr Ilyich Tchaikovsky",
    "title": "Nutcracker, op. 71a"
  },
  {
    "id": "7640",
    "composer": "Pyotr Ilyich Tchaikovsky",
    "title": "Piano Concerto no. 1 in B flat minor, op. 23"
  },
  {
    "id": "7545",
    "composer": "Pyotr Ilyich Tchaikovsky",
    "title": "Romeo and Juliet"
  },
  {
    "id": "7484",
    "composer": "Pyotr Ilyich Tchaikovsky",
    "title": "Symphony no. 4 in F minor, op. 36"
  },
  {
    "id": "7638",
    "composer": "Pyotr Ilyich Tchaikovsky",
    "title": "Symphony no. 5 in E minor, op. 64"
  },
  {
    "id": "7525",
    "composer": "Pyotr Ilyich Tchaikovsky",
    "title": "The Swan Lake, op. 20a"
  },
  {
    "id": "7616",
    "composer": "Pyotr Ilyich Tchaikovsky",
    "title": "Violin Concerto in D major, op. 35"
  },
  {
    "id": "2687",
    "composer": "Giuseppe Verdi",
    "title": "Aida"
  },
  {
    "id": "2703",
    "composer": "Giuseppe Verdi",
    "title": "Il trovatore"
  },
  {
    "id": "2678",
    "composer": "Giuseppe Verdi",
    "title": "La traviata"
  },
  {
    "id": "2708",
    "composer": "Giuseppe Verdi",
    "title": "Otello"
  },
  {
    "id": "2660",
    "composer": "Giuseppe Verdi",
    "title": "Rigoletto"
  },
  {
    "id": "2715",
    "composer": "Giuseppe Verdi",
    "title": "Requiem"
  },
  {
    "id": "4873",
    "composer": "Heitor Villa-Lobos",
    "title": "5 Prelúdios, A.419"
  },
  {
    "id": "4766",
    "composer": "Heitor Villa-Lobos",
    "title": "Bachianas Brasileiras no. 1, for 8 cellos, A.246"
  },
  {
    "id": "4889",
    "composer": "Heitor Villa-Lobos",
    "title": "Chôros no. 5, A.207, \"Alma brasiliera\""
  },
  {
    "id": "4862",
    "composer": "Heitor Villa-Lobos",
    "title": "Rudepoêma, A.184"
  },
  {
    "id": "4848",
    "composer": "Heitor Villa-Lobos",
    "title": "Bachianas Brasileiras no. 2, A.247"
  },
  {
    "id": "4869",
    "composer": "Heitor Villa-Lobos",
    "title": "Bachianas Brasileiras no. 5, for voice and 8 cellos, A.389"
  },
  {
    "id": "4805",
    "composer": "Heitor Villa-Lobos",
    "title": "Chôros no. 10, A.209, \"Rasga o Coraçao\""
  },
  {
    "id": "11933",
    "composer": "Antonio Vivaldi",
    "title": "Bassoon Concerto in E minor, RV.484"
  },
  {
    "id": "12027",
    "composer": "Antonio Vivaldi",
    "title": "Concerto for Strings in G major, RV.151, \"alla rustica\""
  },
  {
    "id": "11709",
    "composer": "Antonio Vivaldi",
    "title": "Flute Concerto in G minor, RV.439, \"La Notte\""
  },
  {
    "id": "28102",
    "composer": "Antonio Vivaldi",
    "title": "The Four Seasons"
  },
  {
    "id": "11806",
    "composer": "Antonio Vivaldi",
    "title": "Gloria in D major, RV.589"
  },
  {
    "id": "15743",
    "composer": "Richard Wagner",
    "title": "Siegfried Idyll, WWV 103"
  },
  {
    "id": "15755",
    "composer": "Richard Wagner",
    "title": "Das Rheingold, WWV 86a"
  },
  {
    "id": "15735",
    "composer": "Richard Wagner",
    "title": "Die Walküre, WWV 86b"
  },
  {
    "id": "15772",
    "composer": "Richard Wagner",
    "title": "Götterdämmerung, WWV 86d"
  },
  {
    "id": "15726",
    "composer": "Richard Wagner",
    "title": "Siegfried, WWV 86c"
  },
  {
    "id": "507",
    "composer": "Anton Webern",
    "title": "Passacaglia, op. 1"
  }
])

# Wikipedia instance
wiki = wikipediaapi.Wikipedia('MyProjectName (merlin@example.com)', 'en')

# For a given work, search google for a wikipedia article
# Google gives more accurate articles than the wiki search API
def getWikiSlug(title, composer):
  search_term = "site:wikipedia.org " + title + " (" + composer + ")"

  print("SEARCHING GOOGLE FOR SLUG: " + search_term)

  g_results = google_search(search_term, num=1)

  if (g_results == False):
    return [title, ""]

  # # DEBUG
  print("TOP ARTICLE: " + g_results[0]["title"])
  # print(g_results[0])

  url = g_results[0]["link"]

  # Wikipedia slugs are the string following /wiki
  slug = url.split("org/wiki/")[1]
  return [unquote(slug), url]



# Get relevant information from wikipedia article
def searchWiki(slug, url):
  page_py = wiki.page(slug)

  print("GETTING SUMMARY FOR SLUG: " + slug)

  return {
    "summary": page_py.summary,
    "wiki_url": url,
  }



def write_work_summary_file(works):
  data = {}
  i = 0

  for w in works:  
    [slug, url] = getWikiSlug(w["title"], w["composer"])
    wikiData = searchWiki(slug, url)

    data[w["id"]] = wikiData

    time.sleep(random.randint(1,5) / 3)

    i = i + 1
    print(str(i) + " of " + str(len(works)))
    print("#########")

  return data


# x = google_search('site:wikipedia.org Concerto for Strings in G major, RV.151 (Vivaldi)', num=2)
# print(x[0]["formattedUrl"])
# print(x[0]["title"])

work_data = write_work_summary_file(works)
  
with open("work_summaries.ts", "w") as outfile: 
  outfile.write("export interface WorkSummaries {\n")
  outfile.write("  [key: string]: {\n")
  outfile.write("    summary: string,\n")
  outfile.write("    wiki_url: string,\n")
  outfile.write("  }\n")
  outfile.write("};\n")
  outfile.write("\n")
  outfile.write("export const workSummaries: WorkSummaries = ")
  json.dump(work_data, outfile, indent = 2)
  outfile.write(";")

