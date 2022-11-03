cp_file = input("Input file : ")
output_file = r"L:\Programming\P5\CP_Viewer\data.js"

f = open(cp_file,"r")
cp_data = f.read()
f.close()

cp_data = cp_data.split("\n")
print(cp_data)

count = 0
result = {}
for  data in cp_data:
    if data == '':
        continue
    fold_type, x0, y0, x1, y1 = data.split(" ")
    result[str(count)] = {"type":int(fold_type), "x0":float(x0), "y0":float(y0), "x1":float(x1),"y1":float(y1)}
    count += 1

print(result)


import json

x = json.dumps(result)
print(x)

f = open(output_file,"w")
f.write("let parsed_data = ")
f.write(x)
f.close()
