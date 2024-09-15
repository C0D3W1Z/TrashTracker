from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from PIL import Image

# Load the trained model
model = load_model('transfer_resnet50_model.keras')

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Define the class indices manually based on your dataset
class_indices = {
    'cardboard': 0,
    'glass': 1,
    'metal': 2,
    'paper': 3,
    'plastic': 4,
    'trash': 5
}

# Reverse the class indices to get a mapping from index to label
index_to_class = {v: k for k, v in class_indices.items()}

app = Flask(__name__)

@app.route("/classification-image-model", methods=['POST'])
def imagemodelclassify():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        # Open the original image
        img = Image.open("uploads/photo.jpg")

        # Get original dimensions
        original_width, original_height = img.size

        # Desired aspect ratio
        desired_aspect_ratio = 512 / 384  # 4:3 = 1.33

        # Calculate the new width based on the original height
        new_width = int(original_height * desired_aspect_ratio)


        # Calculate the crop box to crop the sides (center-crop lengthwise)
        left = (original_width - new_width) // 2
        upper = 0
        right = left + new_width
        lower = original_height

        # Crop the image to the calculated box
        cropped_img = img.crop((left, upper, right, lower))

        # Downscale the cropped image to 512x384
        downscaled_img = cropped_img.resize((512, 384), Image.ANTIALIAS)

        # Save the final image
        downscaled_img.save("uploads/photo.jpg")


        # Function to load and preprocess an image
        def prepare_image(img_path, target_size=(384, 384)):
            # Load the image
            img = image.load_img(img_path, target_size=target_size)
            
            # Convert the image to a numpy array
            img_array = image.img_to_array(img)
            
            # Expand dimensions to fit the model input
            img_array = np.expand_dims(img_array, axis=0)
            
            # Preprocess the image using the same preprocessing function as during training
            img_array = preprocess_input(img_array)
            
            return img_array
        
        # Preprocess the image
        img_array = prepare_image(filepath)
        
        # Predict the class probabilities
        predictions = model.predict(img_array)
        
        # Output the class label with the highest probability
        predicted_class_index = np.argmax(predictions, axis=1)[0]
        
        # Get the class name from the predicted index
        predicted_class_name = index_to_class[predicted_class_index]

        print(f"Predicted class: {predicted_class_name}")

        return jsonify({'message': 'File successfully uploaded and classified', 'predicted_class': predicted_class_name}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')
