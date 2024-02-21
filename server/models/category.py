from .dbconfig import db


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    user_category_selection = db.relationship('UserCategorySelection', back_populates='category')

    content = db.relationship('Content', back_populates='category')
