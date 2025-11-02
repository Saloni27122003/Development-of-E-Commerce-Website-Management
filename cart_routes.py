from flask import request, jsonify
from flask import Blueprint
import mysql.connector

cart_api = Blueprint("cart_api", __name__)
# Temporary logged-in user (replace later with login)
global i
i=1

LOGGED_USER_ID = f"12400{i}"
db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="ecommerce_demo"
    )
cursor = db.cursor(dictionary=True)


@cart_api.route("/add_to_cart", methods=["POST"])
def add_to_cart():
    data = request.get_json()
    product_id = data.get("product_id")
    qty = data.get("qty", 1)
    user_id=LOGGED_USER_ID
    
    # user_q= "SELECT user_id FROM user_info WHERE user_name=%s"
    # cursor.execute(user_q, (data.get("username"),))
    # user_id = cursor.fetchone()
    # if not user_id:
    #     user_id=LOGGED_USER_ID
    #     ins_q= "INSERT INTO user_info(user_id, user_name) VALUES (%s,%s)"
    #     cursor.execute(ins_q, (user_id, data.get("username")))
    #     db.commit()
    
    
    sql = "INSERT INTO cart(user_id, product_id, quantity) VALUES (%s,%s,%s)"
    cursor.execute(sql, (user_id, product_id, qty))
    db.commit()
    
    i+=1
    return jsonify({"status": "success", "message": "Product added to cart!"})

@cart_api.route("/cart", methods=["GET"])
def view_cart():
    cursor.execute("SELECT * FROM cart WHERE user_id=%s", (LOGGED_USER_ID,))
    return jsonify(cursor.fetchall())

