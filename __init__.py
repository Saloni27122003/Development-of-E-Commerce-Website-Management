from flask import Flask
from flask_cors import CORS
import mysql.connector
from api.routes.cart_routes import cart_api


db = None
cursor = None

def create_app():
    global db, cursor
    app = Flask(__name__)
    CORS(app)

    # MySQL Connection
    
    
    app.register_blueprint(cart_api, url_prefix="/cart")

    return app
