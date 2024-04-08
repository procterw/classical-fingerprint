import json
from urllib.parse import unquote
from googleapiclient.discovery import build

# g_api_key = "___KEY___"
g_api_key = "AIzaSyDOlZ490sMaQr7RPDPQrfYUYZDuopQlkxo"
google_search_engine = build("customsearch", "v1", developerKey=g_api_key)
# search_engine_id = "___KEY___"
search_engine_id = "a5f8ac27e2cc7490d"

def search_google(search_term):
  res = google_search_engine.cse().list(q=search_term, cx=search_engine_id, num=1).execute()
  if (res["searchInformation"]["totalResults"] == '0'):
    return False
  return res['items']

# For a given composer or work, search google for a wikipedia article
# Google finds more accurate articles than the wiki search API
def get_wiki_slug(search_term):
  search_term = "site:wikipedia.org " + search_term

  print("    Searching Google for slug: " + search_term)

  g_results = search_google(search_term)

  if (g_results == False):
    return [search_term, ""]

  # # DEBUG
  print("    Found article: " + g_results[0]["title"])

  url = g_results[0]["link"]

  # Wikipedia slugs are the string following /wiki
  slug = url.split("org/wiki/")[1]
  return [unquote(slug), url]

def load_json_file(file):
  f = open(file)
  data = json.load(f)
  f.close()
  return data

def write_json_file(file, data):
  with open(file, "w") as outfile:
    json.dump(data, outfile, indent = 2)