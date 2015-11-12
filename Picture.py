__author__ = 'Pranav'


def insert_photo(db, author, photo, date, lobby_id):
    """Inserts the photo into the Photos database"""
    db.Photos.insert({"author": author, "picture": photo
                      "date": date, "lobby_id": lobby_id})

def get_photos(db, lobby_id):
    """Gets all the photos in the requested lobby"""
    photos = list(db.Photos.find({ "lobby_id": lobby_id}))
    return photos