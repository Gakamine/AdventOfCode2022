class Directory:
    def __init__(self, prev=None):
        self.size=0
        self.prev=prev
        self.subdirs=[]
    
    def increase_size(self, size):
        if self.prev!=None:
            self.prev.increase_size(size)
        self.size+=size

    def insert_folder(self, dir):
        self.subdirs.append(dir)

    def get_sum(self,sum):
        for dir in self.subdirs:
            sum=dir.get_sum(sum)
        if self.size<=100000:
            sum+=self.size
        return sum

file = open("input", "r")
root = Directory()
current_path = root
for line in file:
    line=line.rstrip('\n').split(" ")
    if line[0].isnumeric():
        current_path.increase_size(int(line[0]))
    elif line[0]=="$" and line[1]=="cd" and line[2] != ".." and line[2] != "/" :
        new_folder = Directory(current_path)
        current_path.insert_folder(new_folder)
        current_path=new_folder
    elif line[0]=="$" and line[1]=="cd" and line[2] == ".." and line[2] != "/" :
        current_path=current_path.prev

print(root.get_sum(0))
