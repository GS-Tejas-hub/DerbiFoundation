from PIL import Image

def remove_background(input_path, output_path, tolerance=50):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        # Get background color from the top-left corner
        bg_color = datas[0]
        
        newData = []
        for item in datas:
            # Check if pixel is similar to the background color within a tolerance
            if (abs(item[0] - bg_color[0]) < tolerance and 
                abs(item[1] - bg_color[1]) < tolerance and 
                abs(item[2] - bg_color[2]) < tolerance):
                newData.append((255, 255, 255, 0)) # Fully transparent
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    remove_background(
        "public/images/Logo.jpeg", 
        "public/images/Logo-transparent.png",
        tolerance=60 # A slightly higher tolerance for JPEG compression artifacts around white
    )
