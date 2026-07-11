import re

html_file = "/Users/jake/.gemini/antigravity/brain/de84528e-344f-4919-94a3-a9472b24aaa1/.system_generated/steps/137/content.md"
with open(html_file, 'r') as f:
    html = f.read()

# Look for <td class="title"> ... <a ...>Title</a>
matches = re.findall(r'<td class="title[^"]*">\s*<a href="[^"]*">([^<]+)</a>', html)
if not matches:
    matches = re.findall(r'<a href="[^"]*/game/[^"]*">([^<]+)</a>', html)

# print unique matches
seen = set()
for m in matches:
    name = m.strip()
    if name not in seen and name:
        print(name)
        seen.add(name)

