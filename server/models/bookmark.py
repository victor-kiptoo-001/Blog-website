from .dbconfig import db

class Bookmark(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)

    user = db.relationship('User', backref='bookmarks')
    content = db.relationship('Content', backref='bookmarks')
