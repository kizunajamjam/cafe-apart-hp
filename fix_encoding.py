import os

files = ['botanical.html', 'vintage.html', 'ocean.html', 'elegant.html']

replacements = {
    'Drink1_Coffe.jpg': 'latte.jpg',
    'Drink2_Other.jpg': 'menu-drinks-other.jpg',
    'Drink3_Tea.jpg': 'menu-drinks-tea.jpg',
    'Treats.jpg': 'menu-treats.jpg',
    'T2Picture1.jpg': 'tea-set-top-view.jpg',
    'https://share.google/foV2Tv8QCflzJ2Per': 'https://www.google.com/maps/search/?api=1&query=cafe+apart+大阪府茨木市駅前4-6-7',
    '笶､・・': '❤️ ',
    '町 ': '💬 ',
    '縺ｧ髢九￥': 'で開く',
    '町 ': '💬 ',
    '町 ': '💬 '
}

for filename in files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    # Final check for broken icon chars if any
    content = content.replace('笶､・・', '❤️ ')
    content = content.replace('町', '💬')
    content = content.replace('町', '💬')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fix completed.")
