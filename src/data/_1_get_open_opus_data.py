import requests

# Returns a list of *recommended* composers
def get_oo_composers():
  print("Fetching composers from open opus...")

  response = requests.get("https://api.openopus.org/composer/list/rec.json")

  if response:
    composers = response.json()["composers"]
    return composers

  else:
     raise Exception(f"Unable to get composers: {response.status_code}")
  


def filter_popular_works(w):
  return w["popular"] == "1"

# Returns all *recommended* works from all *recommended* composers
def get_oo_works():
  print("Fetching works from open opus...")
  
  composers = get_oo_composers()
  all_works = list()

  for c in composers:
    response = requests.get("https://api.openopus.org/work/list/composer/%s/genre/Recommended.json" % (c["id"]))
    
    if response:
      try:
        works = response.json()["works"]
        
        # For now, we are only including the most popular works
        popular_works = list(filter(filter_popular_works, works))

        for w in popular_works:
          w["composer"] = c["complete_name"]
          w["composer_id"] = c["id"]
          all_works.append(w)

      except:
        print("No works found for " + c["name"])

    else:
      raise Exception(f"Unable to get works: {response.status_code}")
    
  return all_works

