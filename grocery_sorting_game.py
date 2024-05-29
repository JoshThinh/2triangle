import tkinter as tk
from tkinter import messagebox
import random
import time
from PIL import Image, ImageTk
food_items = {
    'Apple': 'images/apple.png',
    'Banana': 'images/banana.png',
    'Carrot': 'images/carrot.png',
    'Tomato': 'images/tomato.png',
    'Bread': 'images/bread.png',
    'Milk': 'images/milk.png',
    'Cheese': 'images/cheese.png',
    'Egg': 'images/egg.png',
    'Fish': 'images/fish.png',
    'Chicken': 'images/chicken.png'
}

sections = {
    'Fruits': ['Apple', 'Banana'],
    'Vegetables': ['Carrot', 'Tomato'],
    'Dairy': ['Milk', 'Cheese'],
    'Protein': ['Egg', 'Fish', 'Chicken'],
    'Bakery': ['Bread']
}
def initialize_pantry():
    pantry = [['' for _ in range(COLUMNS)] for _ in range(ROWS)]
    for i in range(ROWS):
        for j in range(COLUMNS):
            item = random.choice(list(food_items.keys()))
            pantry[i][j] = item
    return pantry

pantry = initialize_pantry()

def load_image(item):
    image = Image.open(food_items[item])
    image = image.resize((50, 50), Image.ANTIALIAS)
    return ImageTk.PhotoImage(image)
class GrocerySortingGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Grocery Sorting Game")
        
        self.pantry = initialize_pantry()
        self.images = {item: load_image(item) for item in food_items}
        
        self.score = 0
        self.time_left = 60  # 60 seconds for the game

        self.create_widgets()
        self.update_timer()

    def create_widgets(self):
        # Create the pantry grid display
        self.pantry_frame = tk.Frame(self.root)
        self.pantry_frame.pack()
        
        for i in range(ROWS):
            for j in range(COLUMNS):
                label = tk.Label(self.pantry_frame, image=self.images[self.pantry[i][j]], borderwidth=1, relief="solid", width=60, height=60)
                label.grid(row=i, column=j, padx=2, pady=2)
                label.bind("<Button-1>", self.on_drag_start)
                label.bind("<B1-Motion>", self.on_drag_motion)
                label.bind("<ButtonRelease-1>", self.on_drop)
                label.item = self.pantry[i][j]

        # Create section buttons
        self.sections_frame = tk.Frame(self.root)
        self.sections_frame.pack(pady=20)
        
        for section in sections.keys():
            button = tk.Button(self.sections_frame, text=section, command=lambda s=section: self.sort_items(s))
            button.pack(side=tk.LEFT, padx=5)

        # Create score display
        self.score_label = tk.Label(self.root, text=f"Score: {self.score}")
        self.score_label.pack()

        # Create timer display
        self.timer_label = tk.Label(self.root, text=f"Time left: {self.time_left} seconds")
        self.timer_label.pack()

    def on_drag_start(self, event):
        widget = event.widget
        widget.startX = event.x
        widget.startY = event.y

    def on_drag_motion(self, event):
        widget = event.widget
        x = widget.winfo_x() - widget.startX + event.x
        y = widget.winfo_y() - widget.startY + event.y
        widget.place(x=x, y=y)

    def on_drop(self, event):
        widget = event.widget
        x, y = widget.winfo_x(), widget.winfo_y()
        widget.place_forget()
        widget.grid(row=x//60, column=y//60)  # Snap back to grid

        # Check if item is in correct section and update score
        row, col = x // 60, y // 60
        item = self.pantry[row][col]
        for section, items in sections.items():
            if item in items and section in self.sections_frame.grid_slaves(row=row, column=col):
                self.score += 1
                self.score_label.config(text=f"Score: {self.score}")

    def update_timer(self):
        if self.time_left > 0:
            self.time_left -= 1
            self.timer_label.config(text=f"Time left: {self.time_left} seconds")
            self.root.after(1000, self.update_timer)
        else:
            messagebox.showinfo("Time's up!", f"Game over! Your score is: {self.score}")

    def sort_items(self, section):
        # Display a message for the selected section
        print(f"Sorting items into section: {section}")

# Run the application
if __name__ == "__main__":
    root = tk.Tk()
    game = GrocerySortingGame(root)
    root.mainloop()
