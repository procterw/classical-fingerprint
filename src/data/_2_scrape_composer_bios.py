import time
import wikipediaapi
from _1_get_open_opus_data import get_oo_composers
from _utils import get_wiki_slug

def scrape_composer_bios():
  composers = get_oo_composers()

  print("#######")
  print("Scraping composer bios...")

  # https://github.com/martin-majlis/Wikipedia-API
  wiki = wikipediaapi.Wikipedia('MyProjectName (merlin@example.com)', 'en')

  data = list()

  for c in composers:
    [slug, wiki_url] = get_wiki_slug(c["complete_name"] + " (composer)")

    print("    Scraping Wikipedia for: " + c["name"])
    page_py = wiki.page(slug)

    c["biography"] = page_py.summary.splitlines()[0]
    c["wiki_url"] = wiki_url

    data.append(c)

    time.sleep(2)

  return data
