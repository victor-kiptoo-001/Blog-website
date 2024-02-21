
import json
from flask_restful import Resource
from flask import jsonify,session,request
from config import app,db,api, jwt, cloudconfig
from models.user import User
from models.category import Category
from models.user_category_selection import UserCategorySelection
from models.reviews import ContentReview
from models.content import Content
from models.bookmark import Bookmark
from models.userprofile import UserProfile
# from models.uploadimage import UploadImage
# from models.uploadvideo import UploadVideo
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
# from subscriptions import subscriptions_blueprint
import cloudinary
import cloudinary.uploader
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image
from datetime import datetime, timedelta
blacklisted_tokens = set()

class SignUp(Resource):
    def post(self):
        data=request.get_json()
        username=data['username']
        email=data['email']
        password=data['password']
        if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
            return {"Error":"Username Already Exists"},401
        else:
            new_user=User(username=username,email=email,password=generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
            return {"Message": "Sign-Up Successful!!"},201
        
class Login(Resource):
    def post(self):
        data=request.get_json()
        email=data['email']
        password=data['password']
        # find out if ths admin
        # admin = True
        


        user=User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password,password):
            #TODO Findout if the user is admin
            claims = {"isAdmin":False}
            if email =='admin@example.com':
                claims['isAdmin'] = True
            token = create_access_token(identity=user.id,expires_delta=timedelta(days = 2),additional_claims=claims)
            blacklisted_tokens.clear()
            return {"Message":"Login Successful!!","token":token},200
        else:
            return {"Error":"Invalid Username or Password!!"},401
        
class Logout(Resource):
    @jwt_required()
    def delete(self):
        current_user = get_jwt_identity()
        blacklisted_tokens.add(current_user)
        return {"Message":"Logout Successful!"}
    


@app.route('/upload-profile-picture/<int:user_id>', methods=['POST'])
@jwt_required()
def upload_profile_picture(user_id):
    user_id = get_jwt_identity()

    
    data= json.loads(request.data)
    print(data)
    
    # existing_picture=User.query.filter_by(id=user_id)
    # if existing_picture:
    #     return jsonify({'message':'Photo already  exists, please edit the photo'}),403

    # Upload the image to Cloudinary
    try:
        result = cloudinary.uploader.upload(data['profile_url'])
        image_url = result['secure_url']

        # Retrieve the user
        user = User.query.filter_by(id=user_id).first()

        # Update the user's profile picture URL
        user.profile_url = image_url

        db.session.commit()

        return jsonify({'message': 'Profile picture uploaded and updated successfully', 'url': image_url}), 200
    except Exception as e:
        return jsonify({'message': f'Error uploading image: {str(e)}'}), 500
 


class Users(Resource):
    @jwt_required()
    def get(self):
        
        user_id=get_jwt_identity()
        user=User.query.filter_by(id=user_id).first()

        if not(user.user_type == "admin"):
            return {"error":"Unauthorized"},400
        elif user_id in blacklisted_tokens:
            return{"error": "Unauthorized"},400
        
        users=[
            {
            "id":user.id,
            "username":user.username,
            "is_active":user.is_active,
            "email":user.email,
            "user_type":user.user_type,
            "profile_url":user.profile_url
            }
            for user in User.query.all()
        ]
        return users,200
    
class UsersById(Resource):
    @jwt_required()
    def get(self,id):
        user_id=get_jwt_identity()
        
        ad_user=User.query.filter_by(id=user_id).first()
        if not(ad_user.user_type == "admin"):
            return {"error":"Unauthorized"},400
        query_user=User.query.filter_by(id=id).first()
        
        if not query_user:
            return {"Error":"User does not exist!!"},401
        
        user_details=[
                {
                    
                    "id":query_user.id,
                    "username":query_user.username,
                    "email":query_user.email,
                    "user_type":query_user.user_type,
                    "content":[
                        {
                             'id': content.id,
                            'title': content.title,
                            'description': content.description,
                            'user_id': content.user_id,
                            'category_id': content.category_id,
                            'likes': content.likes,
                            
                            'is_approved': content.is_approved,
                            'created_at': content.created_at.strftime("%Y-%m-%d %H:%M:%S")
                        }
                        for content in query_user.content
                    ]  
                }
            ]
        return user_details,200
        
    @jwt_required()
    def put(self,id):
        user_id=get_jwt_identity()
        ad_user=User.query.filter_by(id=user_id).first()
        if not(ad_user.user_type == "admin"):
            return {"error":"Unauthorized"},400
        query_user=User.query.filter_by(id=id).first()
        if not query_user:
            return {"Error":"User does not exist!!"},401
        
        try:
            data=request.get_json()
            user_type=data["user_type"]
            query_user.user_type=user_type
            db.session.commit()
            return{
                "username":query_user.username,
                "email":query_user.email,
                "user_type":query_user.user_type
            },200
        except Exception as e:
            return {"Error":str(e)},400
    
    @jwt_required()
    def post(self,id):
        user_id=get_jwt_identity()
        ad_user=User.query.filter_by(id=user_id).first()
        if not(ad_user.user_type == "admin"):
            return {"error":"Unauthorized"},400
        query_user=User.query.filter_by(id=id).first()
        if not query_user:
            return {"Error":"User does not exist!!"},401  
        if query_user:
            query_user.is_active = False  # Deactivate the user
            db.session.commit()
            return jsonify({'message': 'User deactivated successfully'})
        else:
            return jsonify({'message': 'User not found'}, 404)





# class ContentList(Resource):
#     def get(self):
#         content =[
#             {
#                 'id': content.id,
#                 'title': content.title,
#                 'description': content.description,
#                 'user_id': content.user_id,
#                 'category_id': content.category_id,
#                 'likes': content.likes,
#                 'wishlist': content.wishlist,
#                 'is_approved': content.is_approved,
#                 'image_url': content.image_url,
#                 'created_at': content.created_at.strftime("%Y-%m-%d %H:%M:%S"),
#                 'username': content.user.username,
#                 'profile_url':content.user.profile_url,
#                 'name': content.category.name
#             }
#             for content in Content.query.all()
#         ]
#         return content, 200

class ContentList(Resource):
    def get(self):
        # Get the categoryId from the query parameters
        category_id = request.args.get('categoryId')

        # Query contents based on the category_id
        if category_id:
            contents = Content.query.filter_by(category_id=category_id).all()
        else:
            contents = Content.query.all()

        # Transform contents to a list of dictionaries
        content_list = [
            {
                'id': content.id,
                'title': content.title,
                'description': content.description,
                'user_id': content.user_id,
                'category_id': content.category_id,
                'likes': content.likes,
                'wishlist': content.wishlist,
                'is_approved': content.is_approved,
                'image_url': content.image_url,
                'created_at': content.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                'username': content.user.username,
                'profile_url': content.user.profile_url,
                'name': content.category.name
            }
            for content in contents
        ]

        return content_list, 200
    
    

    @jwt_required()
    def post(self):
        # user_id = get_jwt_identity()
      
        # data= json.loads(request.data)
        # print(data)
        
     
        # try:
            
        #     result = cloudinary.uploader.upload(data['image_url'])
        #     file_url = result['secure_url']

        #     content = Content(
        #                 title=data['title'],
        #                 description=data['description'],
        #                 user_id=user_id,
        #                 author_name=data['author_name'],
        #                 image_url=file_url,
        #                 category_id=data['category_id'],
        #             )
        #     db.session.add(content)    
        #         # file_info_list.append({
        #         #     'image_url': file_url,
        #         # })
        #     db.session.commit()
        #     return {'message': 'Content created successfully',
        #     # 'file_info_list': file_info_list
        #     }, 201
        
        # except Exception as e:
        #     return {'message': f'Error uploading files: {str(e)}'}, 500
        user_id = get_jwt_identity()
  
        data = json.loads(request.data)
        print(data)

        try:
            # Check if category_name is present in the data
            category_name = data.get('category_name')
            if category_name is None:
                return {'message': 'Category name is required'}, 400

            # Check if the category exists or create a new one if it doesn't
            
            category = Category.query.filter_by(name=category_name).first()

            if not category:
                # Create a new category if it doesn't exist
                category = Category(name=category_name)
                db.session.add(category)
                db.session.commit()

            # Upload image to Cloudinary
            result = cloudinary.uploader.upload(data['image_url'])
            file_url = result['secure_url']

            # Create Content instance
            content = Content(
                title=data['title'],
                description=data['description'],
                user_id=user_id,
                author_name=data['author_name'],
                image_url=file_url,
                category=category,  # Use the category instance directly
            )

            db.session.add(content)
            db.session.commit()

            return {'message': 'Content created successfully'}, 201

        except Exception as e:
            return {'message': f'Error uploading files: {str(e)}'}, 500
       
  


    
class ContentResource(Resource):
    def get(self, content_id):
        content = Content.query.get(content_id)
        # category=Category.query.filter_by(id=content.category_id).first()
        # if not category:
        #     return({'message': "no cat name"}), 500

        if content:
            category_name = content.category.name
  
            
            content_dict = {
                'id': content.id,
                'title': content.title,
                'description': content.description,
                'user_id': content.user_id,
                'category_id': content.category_id,
                'likes': content.likes,
                'wishlist': content.wishlist,
                'author_name': content.author_name,
                'image_url': content.image_url,
                'profile_url':content.user.profile_url,
                'is_approved': content.is_approved,
                'created_at': content.created_at,
                'category_name': category_name,
               # 'name': category.name,
                "review":[{
                    "id":review.id,
                    "username":review.user.username,
                    "review_text":review.review_text,
                    "cretaed_at":review.created_at.strftime("%Y-%m-%d %H:%M:%S")
                } for review in content.content_review
                 ]
                 
            }
            return jsonify(content_dict)
        else:
            return jsonify({'message': 'Content not found'}), 404
        

    @jwt_required()
    def patch(self, content_id):
        
        content = Content.query.get(content_id)
        if not content:
            return jsonify({'message': 'Content not found'}), 404

        data = request.json
        
        content.title = data.get('title', content.title)
        content.description = data.get('description', content.description)
        content.user_id = data.get('user_id', content.user_id)
        content.category_id = data.get('category_id', content.category_id)
        content.author_name = data.get('author_name', content.author_name)
        content.likes = data.get('likes', content.likes)
        # content.wishlist = data.get('wishlist', content.wishlist)
        approved = False
        if data['approvalStatus']=='approved':
            approved = True
        content.is_approved = data.get('is_approved', approved)
        
        db.session.commit()
        return jsonify({'message': 'Content updated successfully'})
    

    
    @jwt_required()
    def delete(self, content_id):
        content = Content.query.filter_by(id=content_id).first()
        if not content:
            return {"Error":"Content not Found"}, 404
        db.session.delete(content)
        db.session.commit()
        return {'message': 'Content deleted successfully'}, 200
    


   



@app.route('/content_reviews', methods=['GET'])
def get_reviews():

    review =[ 
            {
                "id": review.id,
                "user_id": review.user_id,
                "review_text": review.review_text, 
                "content_id": review.content_id,
                'created_at': review.created_at.strftime("%Y-%m-%d %H:%M:%S")
            }
            for review in ContentReview.query.all()
        ]
    return review, 200


@app.route('/content_reviews/<int:content_id>', methods=['GET'])

def get_content_reviews(content_id):
    try:
        # Query the database to retrieve all content reviews for the specified content_id
        reviews = ContentReview.query.filter_by(content_id=content_id).all()
         
        if not reviews:
            return jsonify({"message": "No reviews found for this content."}), 404

        reviews_data = [{"id": review.id, "user_id": review.user_id, "review_text": review.review_text, "created_at": review.created_at, "content_id": review.content_id} for review in reviews]
        
        return jsonify(reviews_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/content_reviews/<int:content_id>", methods=["POST"])
@jwt_required()
def create_content_review(content_id):
    try:
        user_id = get_jwt_identity()
    
        data = request.get_json()

        content = Content.query.filter_by(id=content_id).first()
        user = User.query.filter_by(id=user_id).first()
        existing_review=ContentReview.query.filter_by(user_id=user_id, content_id=content.id).first()
        if existing_review:
            return jsonify({'message':'Already reviewed'}),403


        if not content:
            return jsonify({"message": "Content not found"}), 404

        if not user:
            return jsonify({"message": "User not found"}), 404

        content_review = ContentReview(
            content=content,
            user=user,
            review_text=data["review_text"]
            
        )
        db.session.add(content_review)
        db.session.commit()

        return jsonify({"message": "Content review created successfully"}), 201
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500




# Define a route to delete a content review by its ID
@app.route('/content_reviews/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_content_review(review_id):
    try:
         
        content_review = ContentReview.query.get(review_id)
        # Check if the review exists
        if content_review is None:
            return jsonify({"message": "Content review not found"}), 404

        db.session.delete(content_review)
        db.session.commit()

        return jsonify({"message": "Content review deleted successfully"})

    except Exception as e:
        return jsonify({"message": "An error occurred while deleting the content review"}), 500






# Define the PATCH route for updating a content review by its ID
@app.route('/content_reviews/<int:review_id>', methods=['PATCH'])
@jwt_required()
def update_content_review(review_id):
    # Find the content review by its ID
    
    content_review = ContentReview.query.get(review_id)

    if content_review is None:
        return jsonify({"message": "Content review not found"}), 404

    # Get data from the request's JSON body
    data = request.get_json()

    
    if 'review_text' in data:
        content_review.review_text = data['review_text']

     
    db.session.commit()

    return jsonify({"message": "Content review updated successfully"})


# route to POST categories
@app.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    ad_user = User.query.filter_by(id=user_id).first()
    name=data['name']
    if not ad_user.user_type == "admin":
        return jsonify({'error': 'Unauthorized'}), 401
    
    existing_category= Category.query.filter_by(name=name).first()
    if existing_category:
        return jsonify({'message':'Category already exists'}),403

    if data is not None:
        try:
            new_category = Category(name=data.get('name'))

            db.session.add(new_category)
            db.session.commit()

            return jsonify({'message': 'Category created successfully'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'error': 'Invalid data format'}), 400  



    

# route to GET categories
@app.route('/categories', methods=['GET'])
def get_categories():
    if request.method == 'GET':
        categories = Category.query.all()
        category_list = []
        for category in categories:
            category_list.append({'id': category.id, 'name': category.name})
        return jsonify(category_list)
    

class UserCategorySelectionResource(Resource):

    @jwt_required()
    def get(self, id):
        user_id = get_jwt_identity()
        ad_user=User.query.filter_by(id=user_id).first()
        if not ad_user:
            return {"error":"Unauthorized"},401
        
        query_user=User.query.filter_by(id=id).first()
        if not query_user:
            return {"Error":"User does not exist!!"},401
        
        user_category_selections= [
            {
                'id': user_category_selection.id,
                'user_id':user_category_selection.user_id,
                'category_id': user_category_selection.category_id
            }
            for user_category_selection in query_user.user_category_selection
        ]
        return user_category_selections, 200

class DeleteUserCategorySelectionResource(Resource):
    @jwt_required()
    def delete(self):
        user_id = get_jwt_identity()
        ad_user=User.query.filter_by(id=user_id).first()
        if not ad_user:
            return {"error":"Unauthorized"},401
        data=request.get_json()
        category_id=data["category_id"]        
        
        category_selection = UserCategorySelection.query.filter_by(user_id=user_id,category_id=category_id).first()
    
        if not category_selection:
            return {"error": "Category selection not found"}, 404

    # Remove the category selection from the user
        db.session.delete(category_selection)
        db.session.commit()



@app.route('/bookmark', methods=['POST'])
@jwt_required()
def bookmark_content():
    data = request.get_json()
    user_id = get_jwt_identity()  # Obtain the user_id from the JWT token
    content_id = data['content_id']
    existing_bookmark=Bookmark.query.filter_by(user_id=user_id, content_id =content_id).first()
    # Save the user_id and content_id to the database (your Bookmark model)
    if existing_bookmark:
        return jsonify({'message':'Already bookmarked'}),403
    bookmark = Bookmark(user_id=user_id, content_id=content_id)
    db.session.add(bookmark)
    db.session.commit()

    return jsonify({'message': 'Content bookmarked'}), 201

@app.route('/remove_bookmark/<int:content_id>', methods=['DELETE'])
@jwt_required()
def remove_bookmark(content_id):
    user_id = get_jwt_identity()  # Obtain the user_id from the JWT token

    # Remove the user's bookmark from the database
    bookmark = Bookmark.query.filter_by(user_id=user_id, content_id=content_id).first()
    if bookmark:
        db.session.delete(bookmark)
        db.session.commit()

    return jsonify({'message': 'Bookmark removed'})




@app.route('/bookmarks', methods=['GET'])
@jwt_required()
def get_user_bookmarks():
    user_id = get_jwt_identity()  # Obtain the user_id from the JWT token

    # Retrieve the user's bookmarks from the database
    bookmarks = Bookmark.query.filter_by(user_id=user_id).all()

    # Create a list to store bookmarked content
    bookmark_content = {
        'content': []
    }

    for bookmark in bookmarks:
        bookmark_content['content'].append({
            'id': bookmark.id,
            'content_id': bookmark.content.id,
            'title': bookmark.content.title,
            'image_url': bookmark.content.image_url,
            'author_name': bookmark.content.author_name,
            'profile_url': bookmark.content.user.profile_url,
            'created_at': bookmark.content.created_at
        })

    return jsonify(bookmark_content)



@app.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user_profile = UserProfile.query.filter_by(user_id=user_id).first()


    if user_profile:
        return jsonify({
            'user_id': user_profile.user_id,
            'fullname': user_profile.fullname,
            'about': user_profile.about,
            'email': User.query.filter_by(id=user_profile.user_id).first().email,
            'username': User.query.filter_by(id=user_profile.user_id).first().username,
            'profile_url': User.query.filter_by(id=user_profile.user_id).first().profile_url

        })
    else:
        return jsonify({'message': 'User profile not found'}),404
    


@app.route('/profile', methods=['POST'])
@jwt_required()
def create_user_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    existing_profile=UserProfile.query.filter_by(user_id=user_id).first()
    if existing_profile:
        return jsonify({'message':'Profile already  exists'}),403

    new_user_profile = UserProfile(
        user_id=user_id,
        fullname=data['fullname'],
        about=data['about']
    )

    db.session.add(new_user_profile)
    db.session.commit()
    

    return jsonify({'message': 'User profile created successfully'}),201


@app.route('/profile', methods=['PATCH'])
@jwt_required()
def update_user_profile():
    user_id = get_jwt_identity()
    data = request.get_json()

    user_profile = UserProfile.query.filter_by(user_id=user_id).first()

    if user_profile:
        user_profile.fullname = data.get('fullname', user_profile.fullname)
        user_profile.about = data.get('about', user_profile.about)

        db.session.commit()
        return jsonify({'message': 'User profile updated successfully'}), 200
    else:
        return jsonify({'message': 'User profile not found'})

@app.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_user_profile():
    user_id = get_jwt_identity()

    user_profile = UserProfile.query.filter_by(user_id=user_id).first()

    if user_profile:
        db.session.delete(user_profile)
        db.session.commit()
        return jsonify({'message': 'User profile deleted successfully'}), 200
    else:
        return jsonify({'message': 'User profile not found'}), 404

    
# class UploadImageFiles(Resource):
#     @jwt_required()
#     def post(self, content_id):
#         user_id = get_jwt_identity()
        
#         uploaded_files = request.files.getlist('file')
#         print()
#         j = json.loads(request.data)
#         imgs = j
#         print (j)
#         if  not imgs:
#             return {'message': 'No files uploaded'}, 400

#         try:
#             file_info_list = []
#             for file in imgs:
#                 if file == None:
#                   continue
                
#                 #img_data = base64.b64decode(file)
#                 #i#mg = Image.open(BytesIO(img_data))
#                 result = cloudinary.uploader.upload(file)
#                 file_url = result['secure_url']

#                 new_file = UploadImage(
#                     content_id=content_id,
#                     user_id=user_id,  # Associate the file with the logged-in user
#                     image_url=file_url,
#                 )

#                 db.session.add(new_file)
#                 file_info_list.append({
#                     'image_url': file_url,
#                 })

#             db.session.commit()

#             return {
#                 'message': 'Files uploaded and updated successfully',
#                 'file_info_list': file_info_list
#             }, 200
#         except Exception as e:
#             return {'message': f'Error uploading files: {str(e)}'}, 500



# api.add_resource(UploadImageFiles, '/upload-content-image/<int:content_id>')


# class UploadVideoFiles(Resource):
#     @jwt_required()
#     def post(self, content_id):
#         user_id = get_jwt_identity()
        
#         uploaded_files = request.files.getlist('file')
        
#         if not uploaded_files:
#             return {'message': 'No files uploaded'}, 400

#         try:
#             file_info_list = []
#             for file in uploaded_files:
#                 if file.filename == '':
#                     continue

#                 result = cloudinary.uploader.upload(file, resource_type="video")
#                 file_url = result['secure_url']

#                 new_file = UploadVideo(
#                     content_id=content_id,
#                     user_id=user_id,  # Associate the file with the logged-in user
#                     video_url=file_url,
#                 )

#                 db.session.add(new_file)
#                 file_info_list.append({
#                     'video_url': file_url,
#                 })

#             db.session.commit()

#             return {
#                 'message': 'Files uploaded and updated successfully',
#                 'file_info_list': file_info_list
#             }, 200
#         except Exception as e:
#             return {'message': f'Error uploading files: {str(e)}'}, 500



# api.add_resource(UploadVideoFiles, '/upload-content-video/<int:content_id>')



       
        


api.add_resource(Users, '/users', endpoint='/users')
api.add_resource(UsersById, '/users/<int:id>', endpoint='/users/<int:id>')
api.add_resource(UserCategorySelectionResource,'/selections', endpoint='/selections') 
api.add_resource(UserCategorySelectionResource,'/selections/<int:id>', endpoint='/selections/<int:id>')  
api.add_resource(DeleteUserCategorySelectionResource,'/users/<int:id>/category/<int:category_id>', endpoint='/users/<int:id>/category/<int:category_id>')  
api.add_resource(SignUp,'/sign_up',endpoint='/sign_up')
api.add_resource(Login,'/login',endpoint='/login')
api.add_resource(Logout,'/logout',endpoint='/logout')
api.add_resource(ContentList, '/contents')
api.add_resource(ContentResource, '/content/<int:content_id>')

if __name__ == "__main__":
  app.run(port=5555, debug=True)



  