#idを末尾に追加するコード
f = open('fgo_text_new.txt', 'r')
ff = open('fgo_text_new2.txt', 'w')

count = 0
s_count = 1

for line in f:
    count = count + 1
    n_line = line[:-1];
    n_line = n_line + ',' + str(count)
    ff.write(n_line+'\n')
