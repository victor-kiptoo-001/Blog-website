from .dbconfig import db


class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    fullname = db.Column(db.String(255))
    about = db.Column(db.Text)
