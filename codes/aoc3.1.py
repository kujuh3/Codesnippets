import numpy as np

#Open file, read lines and strip from line changes
with open("input.txt") as file:
    lines = file.readlines()
    lines = [line.rstrip() for line in lines]

# #Makes absolutely zero sense why this wont work
# def filter():
#     list = lines
#     i = 0
#     #Why the fuck wont this work?
#     #For each character in string, while loop
#     while i < 12:
#         #Reset current iterations most common value
#         c = 0
#         #For each line, count binary occurrences based on index
#         for e in list:
#             if int(e[i]) == 1:
#                 c += 1
#             elif int(e[i]) == 0:
#                 c -= 1
#         #Positive = 1, negative = 0

#         if c >= 0:
#             c = 1
#         elif c < 0:
#             c = 0

#         #Loop through lines again and if corresponding character at index isn't equal to most common value, remove it.
#         for e in list:
#             if int(e[i]) != c:
#                 list.remove(e)  
#         i += 1

#     return list

#Technically same approach, just far less effecient
def oxy():
    #Copy input list
    oxylist = lines.copy()

    #Do same shit with while loop but based on list length
    i = 0
    while len(oxylist) > 1:
        zero = 0
        one = 0
        #Count zeroes and ones
        for x in oxylist:
            if x[i] == '0':
                zero += 1
            else:
                one += 1
        #list comprehension bullshit but this time works for some reason
        if zero > one:
            oxylist = [x for x in oxylist if x[i] == '0']
        else:
            oxylist = [x for x in oxylist if x[i] == '1']

        i += 1
    #Then just return the remaining list object
    return int(oxylist[0], 2)

#Same shit but flipped
def co():
    colist = lines.copy()

    i = 0
    while len(colist) > 1:
        zero = 0
        one = 0

        for x in colist:
            if x[i] == '0':
                zero += 1
            else:
                one += 1
        #list comprehension bullshit
        if zero > one:
            colist = [x for x in colist if x[i] == '1']
        else:
            colist = [x for x in colist if x[i] == '0']

        i += 1
    return int(colist[0], 2)

oxygen = oxy()
co2 = co()
print(f"Final rating: {oxygen*co2}")
