from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from datetime import datetime, timezone, timedelta
import jwt
import os

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/Microservices"
app.config["SECRET_KEY"] = "@#uday1212%#@"

mongo = PyMongo(app)

@app.route('/registeruser', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"message": "No data provided"}), 400

        email = data.get('email')
        if not email:
            return jsonify({"message": "Email is required"}), 400

        user = mongo.db.AuthData.find_one({"email": email})
        if user:
            return jsonify({"message": "User already exists"}), 400

        result = mongo.db.AuthData.insert_one(data)
        return jsonify({
            "message": "User registered successfully!",
            "data_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"message": f"Internal server error: {str(e)}"}), 500



@app.route("/loginuser", methods=['POST'])
def Login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.AuthData.find_one({"email": email})
    
    if user and user['password'] == password:
        token = jwt.encode({
            'email': email,
            'userId': str(user['_id']),  # Include user ID in token
            'exp': datetime.now(timezone.utc) + timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({
            "token": token,
            "_id": str(user["_id"]),  # Explicitly return _id
            "email": email
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5500, use_reloader=False)