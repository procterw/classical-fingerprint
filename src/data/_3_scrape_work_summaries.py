import time
import json
import wikipediaapi
import re
from _1_get_open_opus_data import get_oo_works
from _utils import get_wiki_slug

# Use regex to find the first date in a wikipedia summary
# As a guess for work date. These can be manually adjusted later
def find_plausible_work_date(summary):
  match = re.search("(1(3|4|5|6|7|8|9)\d\d|20\d\d)", summary)
  if (match == None):
    return 0
  return int(match.group())


def get_wiki_summary(slug):
  # https://github.com/martin-majlis/Wikipedia-API
  wiki = wikipediaapi.Wikipedia('MyProjectName (merlin@example.com)', 'en')

  print("    Scraping Wikipedia for: " + slug)
  page_py = wiki.page(slug)

  return page_py.summary


def scrape_work_summaries():
  oo_works = get_oo_works()

  works = list()

  print("#######")
  print("Scraping works...")
  
  for w in oo_works:
    [slug, wiki_url] = get_wiki_slug("%s (%s)" % (w["title"], w["composer"]))

    summary = get_wiki_summary(slug)

    w["summary"] = summary
    w["wiki_url"] = wiki_url
    w["date"] = find_plausible_work_date(summary)
    w["yt_id"] = ""
    w["yt_start"] = 0

    works.append(w)

    time.sleep(2)

  return works
