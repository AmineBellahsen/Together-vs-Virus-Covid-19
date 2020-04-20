import matplotlib.pyplot as plt
from matplotlib import cm
import numpy as np
from celluloid import Camera
from random import triangular
import random
import time
from matplotlib.animation import FuncAnimation
from matplotlib import style
import matplotlib.colors as mcolors
#%matplotlib notebook

class Room():
    def __init__(self,blx,brx,bly,tly,door=False):
        self.blx=blx
        self.brx=brx
        self.bly=bly
        self.tly=tly
        self.door=door
        
    def build(self):
        if not self.door:
            obstacle = {}
            obstacle[1] = np.array([[self.blx]*(self.tly+1-self.bly),range(self.bly,self.tly+1)])
            obstacle[2] = np.array([range(self.blx,self.brx+1),[self.bly]*(self.brx+1-self.blx)])
            obstacle[3] = np.array([[self.brx]*(self.tly+1-self.bly),range(self.bly,self.tly+1)])
            obstacle[4] = np.array([range(self.blx,self.brx+1),[self.tly]*(self.brx+1-self.blx)])
            self.obstacle = obstacle
        elif self.door=="right":
            c = round((self.tly - self.bly)/2)
            door = 7

            obstacle = {}
            obstacle[1] = np.array([[self.blx]*(self.tly+1-self.bly),range(self.bly,self.tly+1)])
            obstacle[2] = np.array([range(self.blx,self.brx+1),[self.bly]*(self.brx+1-self.blx)])
            obstacle[3] = np.array([[self.brx]*(self.tly+1-c-self.bly),range(self.bly,self.tly+1-c)])
            obstacle[4] = np.array([[self.brx]*(self.tly+1-(self.tly+1-c+door)),range(self.tly+1-c+door,self.tly+1)])
            obstacle[5] = np.array([range(self.blx,self.brx+1),[self.tly]*(self.brx+1-self.blx)])
            self.obstacle = obstacle
        elif self.door=="down":
            c = round((self.brx - self.blx)/2)
            door = 7

            obstacle = {}
            obstacle[1] = np.array([[self.blx]*(self.tly+1-self.bly),range(self.bly,self.tly+1)])
            obstacle[2] = np.array([range(self.blx,self.brx+1-c),[self.bly]*(self.brx+1-c-self.blx)])
            obstacle[3] = np.array([range(self.blx+c+door,self.brx+1),[self.bly]*(self.brx+1-(self.blx+c+door))])
            obstacle[4] = np.array([[self.brx]*(self.tly+1-self.bly),range(self.bly,self.tly+1)])
            obstacle[5] = np.array([range(self.blx,self.brx+1),[self.tly]*(self.brx+1-self.blx)])
            self.obstacle = obstacle
        
    def category(self,points):
        self.categ = []
        for j in range(points.shape[1]):
            #print(points_temp[:,j])
            if all(points[:,j] > np.array([self.blx,self.bly])) and all(points[:,j] < np.array([self.brx,self.tly])):
                self.categ.append("in")
            else:
                self.categ.append("out")
                
                
                
class People():
    def __init__(self,number,temperature, mask, history, position=np.array([0,0])):
        self.number = number 
        self.temperature = temperature
        self.mask = mask
        self.position = position
        self.n_person = n_person    
        self.history = history
        self.score_temp = []
        self.score_dis = []
        self.score_mask = []
        
        
        
        
        
def random_walk(rooms,points, coeff):
        
    points_temp = points +  coeff*np.array(random.choices(((0,1),(1,0),(-1,0),(0,-1)),k=n_person)).T #np.random.uniform(low=-1, high=3, size=(2,n_person))
        
    for j in range(points.shape[1]):
        #print(categ[j])
        #print(points_temp[:,j])
        for room in rooms.values():
            if room.categ[j] == "out":
                while (all(points_temp[:,j] > np.array([room.blx,room.bly])-1) and all(points_temp[:,j] < np.array([room.brx,room.tly])+1)) or (any(points_temp[:,j] < np.array([xlim[0],ylim[0]])+3) or any(points_temp[:,j] > np.array([xlim[1],ylim[1]])-3)):
                    #print(points_temp[:,j])
                    points_temp[:,j] = points[:,j] +  coeff*np.array(random.choices(((0,1),(1,0),(-1,0),(0,-1)),k=1))

            else:
                while (any(points_temp[:,j] <= np.array([room.blx,room.bly])+1) or any(points_temp[:,j] >= np.array([room.brx,room.tly])-1)) or (any(points_temp[:,j] < np.array([xlim[0],ylim[0]])+3) or any(points_temp[:,j] > np.array([xlim[1],ylim[1]])-3)):
                    #print(points_temp[:,j])
                    points_temp[:,j] = points[:,j] +  coeff*np.array(random.choices(((0,1),(1,0),(-1,0),(0,-1)),k=1))

        points[:,j] = points_temp[:,j]
        
    return points


def draw_room(room):
    for i in list(room.obstacle.keys()):
        plt.plot(*room.obstacle[i], c='black',linewidth=2)
        

def score(rooms, workers):
    
    for i in range(len(list(workers.keys()))):
        
        #print("\n")
        #temperature
        t = workers[i].temperature - 36.6

        #position
        l = []
        s = 0
        for room in rooms.values():

            if room.categ[workers[i].number] == "in":
                s=1
                l = [p for p in range(n_person) if room.categ[p] == "in"]

                l.remove(workers[i].number)
                
        score_dist = []
        
        if len(l) ==0:
            if s == 0:
                l = [p for p in range(n_person) if room.categ[p] == "out"]
                l.remove(workers[i].number)
                for number_neighbor in l:
            
                    neighbor = workers[number_neighbor]

                    score_dist.append((np.linalg.norm(workers[i].position - neighbor.position)))
            else:
                score_dist.append(float("inf"))
        else:
            for number_neighbor in l:
            
                    neighbor = workers[number_neighbor]
                    
                    
                    score_dist.append((np.linalg.norm(workers[i].position - neighbor.position)))
                    
                              

        s = np.median(score_dist)

        workers[i].score_temp.append(np.abs(round(t/2,2)))
        workers[i].score_dis.append(round(100/(s),2))
        score_mask = 5 if workers[i].mask=="no" else 0
        workers[i].score_mask.append(score_mask)

############################### PARAMETERS ###########################

n_iters = 100
n_person = 60 

xlim = (0,200)
ylim = (0,200)

x = np.array([np.random.randint(1,xlim[1]) for j in range(n_person)]).reshape(1,n_person)
y = np.array([np.random.randint(1,ylim[1]) for j in range(n_person)]).reshape(1,n_person)

points = np.concatenate((np.array(x), np.array(y)))

############################### PARAMETERS ###########################


#Rooms

my_room = Room(blx=50, brx=60, bly=70, tly=90,door="down")
my_room.build()

my_room_2 = Room(blx=0, brx=30, bly=60, tly=100,door="right")
my_room_2.build()

my_room_3 = Room(blx=70, brx=120, bly=10, tly=60,door="right")
my_room_3.build()

my_room_4 = Room(blx=100, brx=xlim[1], bly=100, tly=ylim[1],door="down")
my_room_4.build()

rooms = {1:my_room, 2:my_room_2, 3:my_room_3,4:my_room_4}

#People
workers = {}

for i in range(n_person):
    workers[i] = People(number=i,
                        temperature=np.random.normal(36.6, 1),
                        mask = random.choice(["no","yes"]),
                        history = [list(points[:,i])],
                        position = points[:,i])


#Apply

for i in list(rooms.keys()):
    rooms[i].category(points)

colors = cm.rainbow(np.linspace(0, 1, n_person))

camera = Camera(plt.figure(figsize=(10,6)))


for _ in range(n_iters):
    print(f"For iteration n°{_}:")
    kh = {i:{"Position":[],"Score Temperature":[],"Score Social distance":[],"Score Mask wearing":[]} for i in range(n_person)}
    for j in list(rooms.keys()):
        draw_room(rooms[j])
    
    points = random_walk(rooms,points,1)
    
    score(rooms,workers)
                
    for i in range(points.shape[1]):
        
        a = list(points[:,i])
        workers[i].history.append(a)
        
        kh[i]["Position"] =  workers[i].position
        kh[i]["Score Temperature"] =  workers[i].score_temp[-1]
        kh[i]["Score Social distance"] =  workers[i].score_dis[-1]
        kh[i]["Score Mask wearing"] =  workers[i].score_mask[-1]
        
        
        plt.scatter(points[0][i],points[1][i], c= list(mcolors.CSS4_COLORS)[:n_person][i], s=30) #list(mcolors.CSS4_COLORS)[:n_person]
        plt.text(points[0][i]+.03, points[1][i]+.03, f"n°{i}", fontsize=7)
    
    print(kh)
    print("\n")
    
    
    #plt.axes().get_xaxis().set_visible(False)
    #plt.axes().get_yaxis().set_visible(False)
    plt.xlim(xlim)
    plt.ylim(ylim)
    #plt.grid(which="major")
    #plt.minorticks_on()
    #plt.grid(which="minor")
    
    camera.snap()
anim = camera.animate()
anim.save('workers.gif', writer='imagemagick',savefig_kwargs={
        'pad_inches': 'tight',
        'transparent': True,
    })