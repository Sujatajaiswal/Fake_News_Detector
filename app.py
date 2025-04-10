from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

app = Flask(__name__)
CORS(app)

# Load your pre-trained model and vectorizer
model = joblib.load('model.pkl')  # Make sure to create and save your model
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data['text']
    text_vectorized = vectorizer.transform([text])
    prediction = model.predict(text_vectorized)

    # Convert the prediction to a standard Python type
    prediction_result = int(prediction[0])  # Convert to int

    return jsonify({'prediction': prediction_result})

if __name__ == '__main__':
    app.run(debug=True)