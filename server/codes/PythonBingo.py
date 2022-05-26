#Non object-oriented approach, no numpy, just figuring out
from itertools import cycle, islice, chain

#Open file and read only first row to numbers
with open("input.txt") as file:
    numbers_str = file.readline()
    numbers = [int(x) for x in numbers_str.split(',')]

#loop through each object in list, separate values to new objects and once again filter weird empty strings. Result will be a list of lists containing each rows numbers.
with open("input.txt") as file:
    lines = file.readlines()[1:]
    boards = [line.strip('\n') for line in lines]
    boards = [line for line in boards if line]
    for i, y in enumerate(boards):
        boards[i] = y.split(' ')
        boards[i] = [int(x) for x in boards[i] if x != '']

def calculateamount(number, amount):
    return number*amount

#Counter for nulls
def nullcounter(board):
    nullLength = 0
    for o in board:
        if len(o) == 1:
            nullLength+=1
    return nullLength

#Overall logic is to keep emptying lists until you have one left
#So for every bingo, we remove that board from the list and when last remaining board wins, we'll return
def bingocheck(numbers1, boards):
    #Copy board for modification
    updatedboards = boards[:]

    #For each number in call list we go through every list in list and each element in each list
    for index, i in enumerate(numbers1):

        #Inner and outer ranges for list slices and row coordinates as a list
        for outerindex, x in enumerate(boards):
            inner = 0
            outer = 5
            col = [0,5,10,15,20]
            counter = 0

            #For each iterated list we'll go through the 5x5 board row by row, column by column
            while counter < 5:
                checkrow = x[inner:outer]
                checkcolumn = x[col[0]],x[col[1]],x[col[2]],x[col[3]],x[col[4]]

                #If checks for column and row, get answer by calling function and return that value
                if all(l=="X" for l in checkcolumn):
                    updatedboards[outerindex] = ['']
                if all(l=="X" for l in checkrow):
                    updatedboards[outerindex] = ['']

                #Update counter and coordinates for row and column checks
                inner+=5
                outer+=5
                col = [x+1 for x in col]
                counter+=1

            #Get current amount of boards that have won
            nullLength = nullcounter(updatedboards)
            #If last board is still remaining, keep updating it
            if nullLength < 100:
                loserboards = [x for x in updatedboards if len(x) > 1]
            #Then when all boards have won, we simply return the score from last board
            elif nullLength > 99:
                amount = 0
                for entry in loserboards:
                    for number in entry:
                        if number != "X":
                            amount+=number
                    return calculateamount(numbers1[index-1], amount)

            #Simply go through each element and if match, change value to X
            for innerindex, y in enumerate(x):
                if y == "X":
                    pass
                elif y == i:
                    boards[outerindex][innerindex] = "X"
        

#Longest list comprehension I've usen so far
#Use chain and islice to divide numbers of each board to a list of their own
boards = [list(chain.from_iterable(islice(boards,i,i+5))) for i in range(0,len(boards),5)]

Lastwinner = bingocheck(numbers, boards)

print(f'Last winning board: {Lastwinner}')
