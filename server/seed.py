
# # from datetime import datetime
# # from sqlalchemy import func
# # from app import app
# # from models.dbconfig import db
# # from models.user import User
# # from models.category import Category
# # from models.user_category_selection import UserCategorySelection
# # from models.reviews import ContentReview
# # from models.content import Content
# # from faker import Faker
# # from werkzeug.security import generate_password_hash

# # fake = Faker()

# # with app.app_context():

# #     db.drop_all()
# #     db.create_all()
# #     # Create a default admin user
# #     admin_user = User(username='admin', email='admin@example.com', password=generate_password_hash('adminpassword'), user_type='admin')
# #     db.session.add(admin_user)

# #     # Generate random user data
# #     for _ in range(10):
# #         username = fake.user_name()
# #         email = fake.email()
# #         password = generate_password_hash('password123')  # You should change this to a secure password
# #         user_type = 'student'  # Or 'staff' as needed
# #         user = User(username=username, email=email, password=password, user_type=user_type)
# #         db.session.add(user)

# #     # Generate random category data
# #     for _ in range(5):
# #         category_name = fake.word()
# #         category = Category(name=category_name)
# #         db.session.add(category)

# #     # Generate random content data
# #     for _ in range(20):  # Create 20 content items
# #         title = fake.sentence()
# #         description = fake.paragraph()
# #         user = User.query.order_by(func.random()).first()  # Randomly select a user
# #         category = Category.query.order_by(func.random()).first()  # Randomly select a category
# #         content = Content(title=title, description=description, user=user, category=category)
# #         db.session.add(content)

# #     # Generate random content review data
# #     for content in Content.query.all():
# #         user = User.query.order_by(func.random()).first()  # Randomly select a user
# #         review_text = fake.paragraph()
# #         created_at = datetime.utcnow()  # Add the created_at timestamp

# #         content_review = ContentReview(content=content, user=user, review_text=review_text,created_at=created_at )
# #         db.session.add(content_review)

# #     # Generate random user-category selections
# #     for user in User.query.all():
# #         for _ in range(2):  # Each user selects 2 categories
# #             category = Category.query.order_by(func.random()).first()  # Randomly select a category
# #             selection = UserCategorySelection(user=user, category=category)
# #             db.session.add(selection)

# #     db.session.commit()

# # print("Database seeded with random user data, categories, content, content reviews, and user-category selections.")


# from datetime import datetime
# from sqlalchemy import func
# from app import app
# from models.dbconfig import db
# from models.user import User
# from models.category import Category
# from models.user_category_selection import UserCategorySelection
# from models.reviews import ContentReview
# from models.content import Content
# from werkzeug.security import generate_password_hash

# with app.app_context():

#     db.drop_all()
#     db.create_all()
#     # Create a default admin user
#     admin_user = User(username='admin', email='admin@example.com', password=generate_password_hash('adminpassword'), user_type='admin')
#     db.session.add(admin_user)

#     # Generate random user data
#     for _ in range(10):
#         username = f'user{_}'  # Generate unique usernames
#         email = f'user{_}@example.com'  # Generate unique emails
#         password = generate_password_hash('password123')  # You should change this to a secure password
#         user_type = 'student'  # Or 'staff' as needed
#         user = User(username=username, email=email, password=password, user_type=user_type)
#         db.session.add(user)

#     # Generate random category data
#     for _ in range(5):
#         category_name = f'category{_}'  # Generate unique category names
#         category = Category(name=category_name)
#         db.session.add(category)

#     # Generate random content data
#     for _ in range(20):  # Create 20 content items
#         title = f'Content {_}'  # Generate unique content titles
#         description = f'Description for Content {_}'  # Generate unique descriptions
#         user = User.query.order_by(func.random()).first()  # Randomly select a user
#         category = Category.query.order_by(func.random()).first()  # Randomly select a category
#         content = Content(title=title, description=description, user=user, category=category)
#         db.session.add(content)

#     # Generate random content review data
#     for content in Content.query.all():
#         user = User.query.order_by(func.random()).first()  # Randomly select a user
#         review_text = f'Review for Content {content.id}'  # Generate unique review text
#         created_at = datetime.utcnow()  # Add the created_at timestamp

#         content_review = ContentReview(content=content, user=user, review_text=review_text, created_at=created_at)
#         db.session.add(content_review)

#     # Generate random user-category selections
#     for user in User.query.all():
#         for _ in range(2):  # Each user selects 2 categories
#             category = Category.query.order_by(func.random()).first()  # Randomly select a category
#             selection = UserCategorySelection(user=user, category=category)
#             db.session.add(selection)

#     db.session.commit()

# print("Database seeded with random user data, categories, content, content reviews, and user-category selections.")



from datetime import datetime
from sqlalchemy import func
from app import app
from models.dbconfig import db
from models.user import User
from models.reviews import ContentReview
from werkzeug.security import generate_password_hash

with app.app_context():

    db.drop_all()
    db.create_all()
    # Create a default admin user
    admin_user = User(username='admin', email='admin@example.com', password=generate_password_hash('adminpassword'), user_type='admin')
    db.session.add(admin_user)

    db.session.commit()

    # Generate random content review data
    for _ in range(20):  # Create 20 content reviews
        content = ContentReview(content_id=1, user_id=1, review_text=f'Review {_}', created_at=datetime.utcnow())  # Adjust content_id and user_id as needed
        db.session.add(content)

    db.session.commit()

print("Database seeded with admin user and random content reviews.")

