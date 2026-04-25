import os
import re

css_files = ['style.css', 'style_botanical.css', 'style_elegant.css', 'style_ocean.css', 'style_vintage.css']

new_block = """
/* Intelligent Fallback Logo */
.menu-item {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.menu-info {
    flex-shrink: 0;
}

/* Appear ONLY when .show-logo class is added via JS */
.menu-item.show-logo::after {
    content: '';
    flex-grow: 1;
    background-image: url('assets/images/logo-minimalist.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 70%;
    opacity: 0.5;
    margin: 10px 40px 30px 40px;
}

.menu-item.show-logo:hover::after {
    opacity: 0.8;
}"""

new_block = """
/* Intelligent Fallback Logo */
.menu-item {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.menu-info {
    flex-shrink: 0;
    margin-top: auto; /* Always push text to the bottom */
}

.menu-item.show-logo::before {
    content: '';
    flex-grow: 1;
    background-image: url('assets/images/logo-minimalist.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 70%;
    opacity: 0.4;
    margin: 30px 40px 10px 40px;
    transition: opacity 0.3s ease;
}

.menu-item.show-logo:hover::before {
    opacity: 0.7;
}"""

new_block = """
/* Intelligent Fallback Logo */
.menu-item {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.menu-info {
    flex-shrink: 0;
    margin-top: auto; /* Always push text to the bottom */
}

/* Position logo at the TOP (same as photos) */
.menu-item.show-logo::before {
    content: '';
    flex-grow: 1;
    background-image: url('assets/images/logo-minimalist.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 70%;
    opacity: 0.4;
    margin: 30px 40px 10px 40px;
    transition: opacity 0.3s ease;
}

.menu-item.show-logo:hover::before {
    opacity: 0.7;
}"""

for filename in css_files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove previous Intelligent Fallback blocks
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?.img-wrapper {.*?}', '', content, flags=re.DOTALL)
    # Remove previous ::after versions
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?::after \{.*?\}', '', content, flags=re.DOTALL)
    # Remove older ::before versions
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?::before \{.*?\}', '', content, flags=re.DOTALL)

for filename in css_files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove previous Intelligent Fallback blocks
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?.img-wrapper {.*?}', '', content, flags=re.DOTALL)
    # Remove older ::after versions
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?::after \{.*?\}', '', content, flags=re.DOTALL)

for filename in css_files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove any previous Fallback Logo blocks (old versions)
    content = re.sub(r'/\* Fallback Logo \*/\n\.fallback-logo.*?\.menu-item:hover \.fallback-img {.*?}', '', content, flags=re.DOTALL)
    
    # Remove previous Intelligent Fallback blocks
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?::after \{.*?\}', '', content, flags=re.DOTALL)
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?.img-wrapper {.*?}', '', content, flags=re.DOTALL)
    
    # Append the fresh block
    content += new_block
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replacement complete.")
