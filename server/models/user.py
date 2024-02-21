from .dbconfig import db
from sqlalchemy.orm import validates

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    profile_url = db.Column(
        db.String(120),
        default="https://img.freepik.com/premium-vector/social-media-user-profile-icon-video-call-screen_97886-10046.jpg?size=626&ext=jpg"
    )
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    user_type = db.Column(db.String(10), nullable=False, default="student")

    user_category_selection = db.relationship('UserCategorySelection', back_populates='user')
    content_review = db.relationship('ContentReview', back_populates='user')
    content = db.relationship('Content', back_populates='user')




    @validates('email')
    def validate_email(self,  key, email):
        if "@" not in email:
            raise ValueError("Email should contain @ ")
        return email
