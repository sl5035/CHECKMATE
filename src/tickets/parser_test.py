import enum
from urllib.request import *
import re
import sys

url = sys.argv[1]
page = urlopen(url)
html = page.read().decode("utf-8")

pattern = '<section class="sc-1md1qs5-5 eLYqFu">.*?</section>'
match_results = re.search(pattern, html, re.IGNORECASE)
info = match_results.group()
info = re.sub("<.*?>", "\n", info) # Remove HTML tags
info = list(filter(None, info.strip().split('\n'))) # parse list

# Invalid forms
for idx, item in enumerate(info):
    if item.strip() == "—": info[idx] = "NO INFO"

ticket_no = info[1]
ticket_title = info[2]
name = info[4]
ticket_type = info[6]
ticket_category = info[8]
open_time = info[10]
last_entry = info[12]

print("{}\n{}\n{}\n{}\n{}\n{}\n{}\n{}".format(ticket_no, ticket_title, name, ticket_type, ticket_category, open_time, last_entry, url))
sys.stdout.flush()