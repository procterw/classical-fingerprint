from _utils import load_json_file, write_json_file
from _2_scrape_composer_bios import scrape_composer_bios
from _3_scrape_work_summaries import scrape_work_summaries



def write_composer_override_template_file(composers):
  composer_map = {}

  for c in composers:
    composer_map[c["id"]] = {
      "complete_name": c["complete_name"],
      "biography": "",
      "portrait": ""
    }

  write_json_file("composerOverrides_template.json", composer_map)



def write_work_override_template_file(works):
  work_map = {}
  for w in works:
    work_map[w["id"]] = {
      "title": w["title"],
      "composer": w["composer"],
      "summary": "",
      "wiki_url": "",
      "yt_id": "",
      "yt_start": "",
    }

  write_json_file("workOverrides_template.json", work_map)


def compile_composer_data():
  composers = scrape_composer_bios()
  write_json_file("composerData.json", composers)
  write_composer_override_template_file(composers)


def compile_work_data():
  works = scrape_work_summaries()
  write_json_file("workData.json", works)
  write_work_override_template_file(works)


# Combine generate override templates, which may have new composers or works,
# with human overrides
def merge_overrides(template_file, override_file, output_file):
  # composer_template = load_json_file("composerOverrides_template.json")
  # composer_overrides = load_json_file("composerOverrides.json")

  template = load_json_file(template_file)
  overrides = load_json_file(override_file)

  for key, value in template.items():
    if key in overrides:
      value.update(overrides[key])
      template[key] = value

  write_json_file(output_file, template)





# compile_composer_data()
# compile_work_data()

merge_overrides("workOverrides_template.json", "workOverrides.json", 'workOverrides.json')
merge_overrides("composerOverrides_template.json", "composerOverrides.json", 'composerOverrides.json')
