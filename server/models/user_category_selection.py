from .dbconfig import db


class UserCategorySelection(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

    user = db.relationship('User', back_populates='user_category_selection')
    category = db.relationship('Category', back_populates='user_category_selection')

    # def __init__(self, user, category):
    #     self.user = user
    #     self.category = category


    # def subscribe(self):
    #     self.subscribed = True

    # def unsubscribe(self):
    #     self.subscribed = False

