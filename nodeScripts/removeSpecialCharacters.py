# Script to replace swedish characters

import os

# Folder path
path = '../img/shopDisplay/'

files = os.listdir(path)
paths = []

# Only add images and not other files in the folder
for i in files:
    if i.endswith('.jpg'):
        paths.append(i)

imgLen = len(paths)

# Replace swedish characters on all files in folder
for i in paths:
    name = i.lower()
    name = name.replace('ä', 'ae')
    name = name.replace('å', 'aa')
    name = name.replace('ö', 'oe')

    # Log what is happening
    print('Replaced', i, 'with', name, str(paths.index(i)) + '/' + str(imgLen))

    # Rename the file
    os.rename(path + i, path + name)