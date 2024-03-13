import { Work, WorkPreview } from './getMusicData';

export const getWorkPreview = (w: Work): Work => {
  const preview = workPreviews[w.id];

  if (!preview) {
    return {
      ...w,
      preview: {
        title: '',
        video_id: '',
        preview_start_s: 0,
      },
    }
  }

  return { ...w, preview };
}

const workPreviews: { [key: string]: WorkPreview } = {
  "23155": {
    "title": "Piano Quartet no. 1 in G minor, K.478",
    "video_id": "FpK1tjbeeA0",
    "preview_start_s": 953
  },
  "23503": {
    "title": "String Quartet no. 19 in C major, K.465, \"Dissonance\"",
    "video_id": "f3oK4XVMARs",
    "preview_start_s": 601
  },
  "23752": {
    "title": "Fantasia in D minor, K.397",
    "video_id": "1V0rGf9PjzI",
    "preview_start_s": 2
  },
  "23512": {
    "title": "Piano Sonata no. 11 in A major, K.331, \"Alla turca\"",
    "video_id": "vp_h649sZ9A",
    "preview_start_s": 624
  },
  "23200": {
    "title": "Concerto for Flute and Harp in C major, K.299",
    "video_id": "nheif2BuFz0",
    "preview_start_s": 687
  },
  "23310": {
    "title": "Piano Concerto no. 20 in D minor, K.466",
    "video_id": "Q-VGFxm2zT4",
    "preview_start_s": 125
  },
  "23315": {
    "title": "Piano Concerto no. 21 in C major, K.467",
    "video_id": "tlemxI7QciA",
    "preview_start_s": 709
  },
  "23838": {
    "title": "Sinfonia concertante in E flat major, K.364",
    "video_id": "m7zBm_Tnf9M",
    "preview_start_s": 1642
  },
  "23637": {
    "title": "Symphony no. 25 in G minor, K.183",
    "video_id": "707oHEGF6l8",
    "preview_start_s": 108
  },
  "23611": {
    "title": "Symphony no. 40 in G minor, K.550",
    "video_id": "N1cexwLOvtY",
    "preview_start_s": 334
  },
  "23566": {
    "title": "The Magic Flute, K.620",
    "video_id": "D1-CbocY21E",
    "preview_start_s": 32
  },
  "23646": {
    "title": "Requiem in D minor, K.626",
    "video_id": "KcnBPqOddSM",
    "preview_start_s": 11
  },
  "9231": {
    "title": "Cello Suite no. 1 in G major, BWV.1007",
    "video_id": "1prweT95Mo0",
    "preview_start_s": 38
  },
  "9172": {
    "title": "Passacaglia and Fugue in C minor, BWV.582",
    "video_id": "zzBXZ__LN_M",
    "preview_start_s": 332
  },
  "28101": {
    "title": "Toccata and fugue in D minor, BWV.565",
    "video_id": "Nnuq9PXbywA",
    "preview_start_s": 222
  },
  "9664": {
    "title": "Brandenburg Concerto no. 2 in F major, BWV.1047",
    "video_id": "NwCh4spYRwg",
    "preview_start_s": 73
  },
  "9688": {
    "title": "Brandenburg Concerto no. 3 in G major, BWV.1048",
    "video_id": "qr0f6t2UbOo",
    "preview_start_s": 371
  },
  "9796": {
    "title": "Orchestral Suite no. 3 in D major, BWV.1068",
    "video_id": "oqU4rF_ysQo",
    "preview_start_s": 397
  },
  "9845": {
    "title": "Violin Concerto in A minor, BWV.1041",
    "video_id": "VSwLeKWKtis",
    "preview_start_s": 596
  },
  "9334": {
    "title": "Cantata no. 140, \"Wachet auf, ruft uns die Stimme\", BWV.140",
    "video_id": "VSwLeKWKtis",
    "preview_start_s": 602
  },
  "9148": {
    "title": "Cantata no. 147: Herz und Mund und Tat und Leben ",
    "video_id": "h97JE4--p84",
    "preview_start_s": 978
  },
  "9848": {
    "title": "Passion According to St. Matthew, BWV.244",
    "video_id": "ZwVW1ttVhuQ",
    "preview_start_s": 3617
  },
  "11933": {
    "title": "Bassoon Concerto in E minor, RV.484",
    "video_id": "xidC7TZRxkA",
    "preview_start_s": 43
  },
  "12027": {
    "title": "Concerto for Strings in G major, RV.151, \"alla rustica\"",
    "video_id": "bwe8ycrMX2w",
    "preview_start_s": 18
  },
  "11709": {
    "title": "Flute Concerto in G minor, RV.439, \"La Notte\"",
    "video_id": "9FaE32klkhc",
    "preview_start_s": 23
  },
  "28102": {
    "title": "The Four Seasons",
    "video_id": "4rgSzQwe5DQ",
    "preview_start_s": 2032
  },
  "11806": {
    "title": "Gloria in D major, RV.589",
    "video_id": "2eWjQOdYzMQ",
    "preview_start_s": 366
  },
  "6233": {
    "title": "Concerto Grosso in A major, op. 6, no. 11, HWV.329",
    "video_id": "1G2RKU7iJ-4",
    "preview_start_s": 671
  },
  "6431": {
    "title": "Music for the Royal Fireworks in D major, HWV.351",
    "video_id": "fNqJ8mED1VE",
    "preview_start_s": 671
  },
  "6480": {
    "title": "Organ Concerto in B flat major, op. 4, no. 6, HWV.294",
    "video_id": "Mo6ekt2kTVg",
    "preview_start_s": 608
  },
  "6209": {
    "title": "Organ Concerto in F major, HWV.295, \"The Cuckoo and the Nightingale\"",
    "video_id": "DJ-3cakmglM",
    "preview_start_s": 300
  },
  "6485": {
    "title": "Organ Concerto in G minor, op. 7, no. 5, HWV.310",
    "video_id": "MiupqRjrDoE",
    "preview_start_s": 433
  },
  "6216": {
    "title": "Water Music Suite no. 1 in F major, HWV.348",
    "video_id": "jJyTfttQvdA",
    "preview_start_s": 297
  },
  "6500": {
    "title": "Water Music Suite no. 2 in D major, HWV.349",
    "video_id": "664QhBOhBgc",
    "preview_start_s": 125
  },
  "6494": {
    "title": "Water Music Suite no. 3 in G major, HWV.350",
    "video_id": "wQ9IymF3SzI",
    "preview_start_s": 484
  },
  "28083": {
    "title": "Messiah, HWV.56",
    "video_id": "https://www.youtube.com/live/bR0cEOTpYSk",
    "preview_start_s": 2075
  },
  "13260": {
    "title": "String Quartet in G minor, L.85, op. 10",
    "video_id": "5VMQuHMq8QQ",
    "preview_start_s": 66
  },
  "13251": {
    "title": "Children's Corner, L.113",
    "video_id": "VdaYiXepn7Q",
    "preview_start_s": 5
  },
  "13297": {
    "title": "Suite Bergamasque, L.75 ",
    "video_id": "fZrm9h3JRGs",
    "preview_start_s": 158
  },
  "13331": {
    "title": "La Mer, L.109",
    "video_id": "ATT6ft_qd6k",
    "preview_start_s": 123
  },
  "13215": {
    "title": "Prélude à l'après-midi d'un faune, L.86",
    "video_id": "Y9iDOt2WbjY",
    "preview_start_s": 380
  },
  "25786": {
    "title": "Keyboard Concerto in D major, Hob.XVIII:11",
    "video_id": "VFw-D-sF8Ds",
    "preview_start_s": 953
  },
  "25472": {
    "title": "Symphony no. 45 in F sharp minor, Hob.I:45, \"Farewell\"",
    "video_id": "OpD9ofCm6Ak",
    "preview_start_s": 1120
  },
  "25919": {
    "title": "Symphony no. 94 in G, Hob.I:94, \"Surprise\"",
    "video_id": "VOLy6JxEDLw",
    "preview_start_s": 301
  },
  "25505": {
    "title": "Symphony no. 100 in G, Hob.I:100, \"Military\"",
    "video_id": "QSeFoFdURWk",
    "preview_start_s": 1067
  },
  "25814": {
    "title": "Symphony no. 103 in E flat major, Hob.I:103, \"Drum Roll\"",
    "video_id": "6GXAmM_gau0",
    "preview_start_s": 328
  },
  "26120": {
    "title": "Symphony no. 104 in D, Hob.I:104, \"London\"",
    "video_id": "OitPLIowJ70",
    "preview_start_s": 1320
  },
  "7486": {
    "title": "Nutcracker, op. 71a",
    "video_id": "GiEIe0ClGIM",
    "preview_start_s": 312
  },
  "7640": {
    "title": "Piano Concerto no. 1 in B flat minor, op. 23",
    "video_id": "hNfpMRSCFPE",
    "preview_start_s": 350
  },
  "7545": {
    "title": "Romeo and Juliet",
    "video_id": "f6qZUCi7ToQ",
    "preview_start_s": 791
  },
  "7484": {
    "title": "Symphony no. 4 in F minor, op. 36",
    "video_id": "Y7G5ithbFys",
    "preview_start_s": 523
  },
  "7638": {
    "title": "Symphony no. 5 in E minor, op. 64",
    "video_id": "dYTUtDjK2Kc",
    "preview_start_s": 2242
  },
  "7525": {
    "title": "The Swan Lake, op. 20a",
    "video_id": "WQjIKkZEK7I",
    "preview_start_s": 51
  },
  "7616": {
    "title": "Violin Concerto in D major, op. 35",
    "video_id": "ovFPKu00cCc",
    "preview_start_s": 360
  },
  "15743": {
    "title": "Siegfried Idyll, WWV 103",
    "video_id": "wolO4fJr70Y",
    "preview_start_s": 662
  },
  "15755": {
    "title": "Das Rheingold, WWV 86a",
    "video_id": "vewupKFIEAE",
    "preview_start_s": 118
  },
  "15735": {
    "title": "Die Walküre, WWV 86b",
    "video_id": "s2RiOhYpRFc",
    "preview_start_s": 113
  },
  "15772": {
    "title": "Götterdämmerung, WWV 86d",
    "video_id": "AIVHw3_7X-E",
    "preview_start_s": 101
  },
  "15726": {
    "title": "Siegfried, WWV 86c",
    "video_id": "824d07fAw2Y",
    "preview_start_s": 296
  },
  "15544": {
    "title": "An American in Paris ",
    "video_id": "9HI62_udgEI",
    "preview_start_s": 949
  },
  "15562": {
    "title": "Rhapsody in Blue",
    "video_id": "cH2PH0auTUU",
    "preview_start_s": 318
  },
  "22103": {
    "title": "Piano Concerto no. 2 in C minor, op. 18",
    "video_id": "rEGOihjqO9w",
    "preview_start_s": 641
  },
  "22111": {
    "title": "Rhapsody on a Theme by Paganini, op. 43",
    "video_id": "ppJ5uITLECE",
    "preview_start_s": 1012
  },
  "18093": {
    "title": "From Holberg’s Time, for string orchestra, \"Holberg Suite\"",
    "video_id": "j1wQ8ZMZq60",
    "preview_start_s": 463
  },
  "18116": {
    "title": "Lyric Suite ",
    "video_id": "Wxs9-QDaDd0",
    "preview_start_s": 671
  },
  "18105": {
    "title": "Peer Gynt Suite no. 1, op. 46",
    "video_id": "Vj7vHmejrPA",
    "preview_start_s": 806
  },
  "18023": {
    "title": "Peer Gynt Suite no. 2, op. 55",
    "video_id": "3O2CT65NH9A",
    "preview_start_s": 815
  },
  "18148": {
    "title": "Piano Concerto in A minor, op. 16",
    "video_id": "pfNvWmjtryQ",
    "preview_start_s": 1069
  },
  "16231": {
    "title": "Piano Trio no. 7 in B flat major, op. 97, \"Archduke\"",
    "video_id": "ezRNLXBbB8Q",
    "preview_start_s": 1238
  },
  "16245": {
    "title": "String Quartet no. 7 in F major, op. 59 no. 1, \"Razumovsky\"",
    "video_id": "aG89Fdc1jk0",
    "preview_start_s": 1671
  },
  "16331": {
    "title": "Violin Sonata no. 9 in A major, op. 47, \"Kreutzer\"",
    "video_id": "Zbo1U3e555w",
    "preview_start_s": 1875
  },
  "16222": {
    "title": "Piano Sonata no. 8 in C minor, op. 13, \"Pathétique\"",
    "video_id": "iEyy7EfQfUQ",
    "preview_start_s": 111
  },
  "16184": {
    "title": "Piano Sonata no. 21 in C major, op. 53, \"Waldstein\"",
    "video_id": "AU2G13qnKl8",
    "preview_start_s": 807
  },
  "16419": {
    "title": "Piano Sonata no. 23 in F minor, op. 57, \"Appassionata\"",
    "video_id": "E5JObP74jcw",
    "preview_start_s": 933
  },
  "16218": {
    "title": "Piano Concerto no. 5 in E flat major, op. 73, \"Emperor\"",
    "video_id": "hDXWK3W477w",
    "preview_start_s": 97
  },
  "16406": {
    "title": "Symphony no. 5 in C minor, op. 67",
    "video_id": "-VVXqNt4qU0",
    "preview_start_s": 153
  },
  "16238": {
    "title": "Symphony no. 9 in D minor, op. 125, \"Choral\"",
    "video_id": "yf2rbcrZzDQ",
    "preview_start_s": 197
  },
  "16458": {
    "title": "Violin Concerto in D major, op. 61",
    "video_id": "cokCgWPRZPg",
    "preview_start_s": 2085
  },
  "7278": {
    "title": "Symphony no. 2 in C minor, \"Resurrection\"",
    "video_id": "wgtSa6XYWdE",
    "preview_start_s": 5282
  },
  "7277": {
    "title": "Symphony no. 5 in C sharp minor",
    "video_id": "bDg1VPUeQyI",
    "preview_start_s": 367
  },
  "16525": {
    "title": "La bohème",
    "video_id": "OkHGUaB1Bs8",
    "preview_start_s": 208
  },
  "16529": {
    "title": "Madama Butterfly",
    "video_id": "IYrbdiee9SU",
    "preview_start_s": 945
  },
  "16519": {
    "title": "Tosca",
    "video_id": "5-AF1T4OehM",
    "preview_start_s": 99
  },
  "24319": {
    "title": "Les Préludes, S.97",
    "video_id": "OildwFpdfiY",
    "preview_start_s": 278
  },
  "24219": {
    "title": "Piano Concerto no. 1 in E flat major, S.124",
    "video_id": "B0TOvZ5U7nM",
    "preview_start_s": 1098
  },
  "7757": {
    "title": "Clarinet Quintet in B minor, op. 115",
    "video_id": "1Gw8JU53SWY",
    "preview_start_s": 1537
  },
  "7715": {
    "title": "String Sextet no. 1 in B flat major, op. 18",
    "video_id": "c5D9FbG71eE",
    "preview_start_s": 1703
  },
  "7774": {
    "title": "Piano Concerto no. 2 in B flat major, op. 83",
    "video_id": "BszBccYHuAk",
    "preview_start_s": 878
  },
  "7765": {
    "title": "Symphony no. 3 in F major, op. 90",
    "video_id": "u68ETRjNQME",
    "preview_start_s": 1341
  },
  "7706": {
    "title": "Symphony no. 4 in E minor, op. 98",
    "video_id": "7QLuYj2jxoc",
    "preview_start_s": 1836
  },
  "7764": {
    "title": "Violin Concerto in D major, op. 77",
    "video_id": "tV7APwv68tY",
    "preview_start_s": 633
  },
  "7645": {
    "title": "Ein deutsches Requiem, op. 45",
    "video_id": "ZXU9vqVdudM",
    "preview_start_s": 920
  },
  "17109": {
    "title": "Nocturnes, op. 9",
    "video_id": "QR10Od1cLaM",
    "preview_start_s": 151
  },
  "17119": {
    "title": "Polonaise no. 6 in A flat major, op. 53, \"Heroic\"",
    "video_id": "aZYYoDDmg8M",
    "preview_start_s": 371
  },
  "17276": {
    "title": "Preludes, op. 28",
    "video_id": "QWFR9joxbpc",
    "preview_start_s": 1560
  },
  "17167": {
    "title": "Sonata no. 2 in B flat minor, op. 35",
    "video_id": "zc9n2SOdksE",
    "preview_start_s": 182
  },
  "17236": {
    "title": "Piano Concerto no. 1 in E minor, op. 11",
    "video_id": "614oSsDS734",
    "preview_start_s": 306
  },
  "22331": {
    "title": "Piano Trio in E minor, op. 90, \"Dumky\"",
    "video_id": "b8EjHqBWgD0",
    "preview_start_s": 703
  },
  "22377": {
    "title": "String Quartet no. 12 in F, op. 96, \"American\"",
    "video_id": "xcU18AIz8V8",
    "preview_start_s": 248
  },
  "22310": {
    "title": "Carnival, op. 92",
    "video_id": "a1jNQgTVYrY",
    "preview_start_s": 444
  },
  "22248": {
    "title": "Cello Concerto in B minor, op. 104",
    "video_id": "tgWDoUNnLRM",
    "preview_start_s": 272
  },
  "22221": {
    "title": "Serenade for Strings in E major, op. 22",
    "video_id": "CRcbDMg56yg",
    "preview_start_s": 285
  },
  "22354": {
    "title": "Symphony no. 8 in G major, B.163, op. 88",
    "video_id": "RhbK_5cWbpU",
    "preview_start_s": 1814
  },
  "22368": {
    "title": "Symphony no. 9 in E minor, op. 95, \"From the New World\"",
    "video_id": "xyCYvoOEBbw",
    "preview_start_s": 39
  },
  "21352": {
    "title": "Piano Quintet in A major, D.667, op. posth.114, \"The Trout\"",
    "video_id": "0YNcI_SzADg",
    "preview_start_s": 1487
  },
  "20542": {
    "title": "Piano Trio no. 2 in E flat major, D.929, op. 100",
    "video_id": "nioKJNp8ADE",
    "preview_start_s": 51
  },
  "20959": {
    "title": "String Quartet no. 14 in D minor, D.810, \"Death and the Maiden\"",
    "video_id": "dwIr4kICW1E",
    "preview_start_s": 2036
  },
  "21429": {
    "title": "String Quintet in C major, D.956, op. posth.163",
    "video_id": "T0GOv95iDf0",
    "preview_start_s": 1197
  },
  "21133": {
    "title": "Fantasia in F minor, D.940, op. posth.103",
    "video_id": "UyjzqPPXDcw",
    "preview_start_s": 54
  },
  "20766": {
    "title": "Symphony no. 8 in B minor, D.759, \"Unfinished\"",
    "video_id": "3tisvEpblig",
    "preview_start_s": 157
  },
  "20545": {
    "title": "Symphony no. 9 in C major, D.944, \"Great\"",
    "video_id": "bA6pzRx6gBE",
    "preview_start_s": 1091
  },
  "21086": {
    "title": "Erlkönig, D.328, op. 1",
    "video_id": "sfQeLgFmNEI",
    "preview_start_s": 190
  },
  "21138": {
    "title": "Gretchen am Spinnrade, D.118, op. 2",
    "video_id": "vrgnGgOWJ2w",
    "preview_start_s": 78
  }
}