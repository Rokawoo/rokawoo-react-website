import os
from PIL import Image

def convert_to_webp(input_file, output_file):
    try:
        img = Image.open(input_file)
        img.save(output_file, 'WEBP')
        print(f"Converted {input_file} to {output_file}")
    except Exception as e:
        print(f"Failed to convert {input_file}: {e}")

def convert_folder_to_webp(input_folder):
    for root, _, files in os.walk(input_folder):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                input_file = os.path.join(root, file)
                output_file = os.path.splitext(input_file)[0] + ".webp"
                convert_to_webp(input_file, output_file)

if __name__ == "__main__":
    input_folder = input("Enter the path to the folder containing images: ").strip()

    if not os.path.exists(input_folder):
        print("Input folder does not exist.")
    else:
        convert_folder_to_webp(input_folder)