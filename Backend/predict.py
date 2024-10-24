from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.preprocessing import image
import numpy as np

# Load the trained model
model = load_model('transfer_resnet50_model.keras')

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

# Path to the image you want to predict
img_path = 'TrashType_Image_Dataset/plastic/plastic_001.jpg'

# Preprocess the image
img_array = prepare_image(img_path)

# Predict the class probabilities
predictions = model.predict(img_array)

# Output the class label with the highest probability
predicted_class_index = np.argmax(predictions, axis=1)[0]

# Get the class name from the predicted index
predicted_class_name = index_to_class[predicted_class_index]

print(f"Predicted class: {predicted_class_name}")

