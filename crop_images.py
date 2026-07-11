from PIL import Image

input_path = "/Users/jake/.gemini/antigravity/brain/de84528e-344f-4919-94a3-a9472b24aaa1/media__1783807747933.jpg"
out_logo = "/Users/jake/.gemini/antigravity/brain/de84528e-344f-4919-94a3-a9472b24aaa1/final_x_logo.jpg"
out_banner = "/Users/jake/.gemini/antigravity/brain/de84528e-344f-4919-94a3-a9472b24aaa1/final_x_banner.jpg"

try:
    img = Image.open(input_path)
    w, h = img.size
    
    # Crop Logo (1:1 center)
    min_dim = min(w, h)
    left = (w - min_dim)/2
    top = (h - min_dim)/2
    right = (w + min_dim)/2
    bottom = (h + min_dim)/2
    logo = img.crop((left, top, right, bottom))
    logo.save(out_logo, quality=95)
    
    # Crop Banner (3:1 horizontal center)
    target_ratio = 3 / 1
    if w / h > target_ratio:
        # Too wide
        new_w = h * target_ratio
        new_h = h
    else:
        # Too tall
        new_w = w
        new_h = w / target_ratio
        
    left = (w - new_w)/2
    top = (h - new_h)/2
    right = (w + new_w)/2
    bottom = (h + new_h)/2
    
    banner = img.crop((left, top, right, bottom))
    banner = banner.resize((1500, 500), Image.Resampling.LANCZOS)
    banner.save(out_banner, quality=95)
    
    print("Success")
except Exception as e:
    print(f"Error: {e}")
