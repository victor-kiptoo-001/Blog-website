from .dbconfig import db


class Content(db.Model):


    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    likes = db.Column(db.Integer, nullable=False, default=0)
    wishlist = db.Column(db.Boolean, nullable=False, default=False)
    image_url = db.Column(db.String, nullable=True)
    # video_url = db.Column(db.String, nullable=True)
    is_approved = db.Column(db.Boolean, nullable=False, default=False)
    author_name=db.Column(db.String(255), nullable=False, server_default='')
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    user = db.relationship('User', back_populates='content')
    category = db.relationship('Category', back_populates='content')
    content_review = db.relationship('ContentReview', back_populates='content')


    def __repr__(self):
        return f'<Content {self.title}>'
    
    