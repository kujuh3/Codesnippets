#Open file, read lines and strip from line changes
with open("input.txt") as file:
    lines = file.readlines()
    lines = [int(line.rstrip()) for line in lines]

#Initial values for iteration, counter and preceding values
z = 0
n = 0
i = 0

#Just do it with a function
def window(list, x):
    for i in range(len(lines)-x+1):
        yield lines[i:i+x]

#Looping returned 3 element windows
for s in window(lines, 3):
    #Just to ignore first values, otherwise result will be 1 over real result
    i+=1
    #Ignore first iteration
    if i >= 2:
        if sum(s) > z:
            n+=1
        z = sum(s)

print(f"Total number of increases: {n}")