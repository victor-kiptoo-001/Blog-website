from .dbconfig import db

class ContentReview(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    review_text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    content = db.relationship('Content', back_populates='content_review')
    user = db.relationship('User', back_populates='content_review')

    # def __init__(self, content, user,  review_text, created_at):
    #     self.content = content
    #     self.user = user
    #     self.review_text = review_text
    #     self.created_at = created_at