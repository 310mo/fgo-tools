#再臨素材が増えた時にそれに応じて配列を伸ばすコード
f = open('fgo_text.txt', 'r')
ff = open('fgo_text_new.txt', 'w')

count = 0
s_count = 1

for line in f:
    count = count + 1
    n_line = line[:-1];
    n_line = n_line + ',' + str(count) + ',0,0,0,0'
    ff.write(n_line+'\n')
