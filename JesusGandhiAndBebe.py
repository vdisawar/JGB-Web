from flask import *
from pymongo import MongoClient
from Picture import insert_photo, get_photos


client = MongoClient()
client = MongoClient('localhost', 27017)

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def hello_world():
    """Homepage"""
    db = client.Photos


    if request.method == 'POST':
        insert_photo()

    if request.method == 'GET':
        #need to build route

    return render_template('index.html')


@app.route('/lobby/<lobby_name>')
def lobby(lobby_name): pass



if __name__ == '__main__':
    app.run()
