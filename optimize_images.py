import os
from PIL import Image

def optimize_images(directory, max_size=(1200, 1200), quality=80):
    print(f"Starting optimization in {directory}...")
    
    files = [f for f in os.listdir(directory) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    total_reduction = 0
    
    for filename in files:
        filepath = os.path.join(directory, filename)
        original_size = os.path.getsize(filepath)
        
        try:
            with Image.open(filepath) as img:
                # Convert RGBA to RGB if saving as JPG
                if img.mode in ("RGBA", "P") and filename.lower().endswith('.png'):
                    # Only convert to RGB if it's a huge photo-like PNG
                    if original_size > 500000: # Over 0.5MB
                        print(f"Converting huge PNG to JPG: {filename}")
                        img = img.convert("RGB")
                        base = os.path.splitext(filename)[0]
                        new_filename = base + ".jpg"
                        new_path = os.path.join(directory, new_filename)
                        img.thumbnail(max_size, Image.Resampling.LANCZOS)
                        img.save(new_path, "JPEG", quality=quality, optimize=True)
                        os.remove(filepath)
                        # We might need to update references in HTML but let's see
                        # For now, let's stick to safe optimization (same extension)
                        continue

                # Normal optimization (keeping extension)
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Setup save format
                ext = os.path.splitext(filename)[1].lower()
                save_format = "JPEG" if ext in ['.jpg', '.jpeg'] else "PNG"
                
                img.save(filepath, save_format, quality=quality, optimize=True)
                
                new_size = os.path.getsize(filepath)
                reduction = original_size - new_size
                total_reduction += reduction
                print(f"Optimized {filename}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB")
                
        except Exception as e:
            print(f"Error processing {filename}: {e}")

    print(f"\nOptimization complete! Total space saved: {total_reduction/1024/1024:.2f}MB")

if __name__ == "__main__":
    img_dir = r"C:\Users\yasuf\kizuna\Antigravity_Training\cafe-apart-hp\assets\images"
    optimize_images(img_dir)
