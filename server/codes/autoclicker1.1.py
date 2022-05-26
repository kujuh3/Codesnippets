import time
import random
from pynput.mouse import Listener, Controller, Button
import keyboard

mouse = Controller()

i = 0

amount = int(input('Maara : '))

while int(i/2) < amount:
	mouse.click(Button.left, 1)
	time.sleep(random.uniform(1.4, 2.9))
	i+=1
	print(i)