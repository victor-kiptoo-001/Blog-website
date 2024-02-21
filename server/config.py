from flask_migrate import Migrate
from flask_restful import Api
from flask import Flask
from models.dbconfig import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import cloudinary
import os
import cloudinary.uploader


app = Flask(__name__)
app.config["SECRET_KEY"]="196dfc4f839b2e7f4295ab4d"
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///blog.db'
app.config["JWT_SECRET_KEY"] = "b1a0f6ebc282f129f633de76"
app.config['SQLALCHEMT_TRACK_MODIFICATIONS']= False
cloudconfig = cloudinary.config(
  cloud_name =('ddq5xxnzg'), 
  api_key=('945177871738557'), 
  api_secret=('93fy4hsiRLV-PaK9HIzRTg40zXA')


)


migrate=Migrate(app,db)
db.init_app(app)
cors = CORS(app)
api=Api(app)
jwt = JWTManager(app)
jwt.init_app(app)


# from flask import Flask, request 
# from flask_restful import Resource, Api
# from werkzeug.datastructures import FileStorage 
# app = Flask(__name__) 
# api = Api(app)

# class UploadFile(Resource): 
#     def post(self): 
#       file = request.files['file'] 
#       file.save('/uploads/' + file.filename) 
#       return 'File uploaded successfully!' 
    
# api.add_resource(UploadFile, '/upload')