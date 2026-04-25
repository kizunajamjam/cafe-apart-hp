import os
import re

image_dir = r"C:\Users\yasuf\kizuna\Antigravity_Training\cafe-apart-hp\assets\images"
code_dir = r"C:\Users\yasuf\kizuna\Antigravity_Training\cafe-apart-hp"

options_dirs = [code_dir]
csv_file = os.path.join(code_dir, "temp_menu.csv")

images = [f for f in os.listdir(image_dir) if os.path.isfile(os.path.join(image_dir, f))]
code_files = []
for root, dirs, files in os.walk(code_dir):
    if "assets" in root or ".git" in root:
        continue
    for f in files:
        if f.endswith((".html", ".css", ".js")):
            code_files.append(os.path.join(root, f))
if os.path.exists(csv_file):
    code_files.append(csv_file)

# Also check for images referenced in the CSV (Google Sheets data)
# In script.js, SPREADSHEET_CSV_URL is used. 
# We should also check the script.js mappings.

unused_images = []

for image in images:
    found = False
    for code_file in code_files:
        try:
            with open(code_file, "r", encoding="utf-8") as f:
                content = f.read()
                if image in content:
                    found = True
                    break
        except:
            continue
    
    if not found:
        unused_images.append(image)

print("--- Unused Images ---")
for img in unused_images:
    print(img)
