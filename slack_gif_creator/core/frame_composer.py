
from PIL import Image, ImageDraw, ImageFont
import math

def create_blank_frame(width, height, color=(255, 255, 255)):
    return Image.new('RGB', (width, height), color)

def create_gradient_background(width, height, top_color, bottom_color):
    base = Image.new('RGB', (width, height), top_color)
    top = Image.new('RGB', (width, height), top_color)
    bottom = Image.new('RGB', (width, height), bottom_color)
    
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            mask_data.append(int(255 * (y / height)))
    mask.putdata(mask_data)
    
    base.paste(bottom, (0, 0), mask)
    return base

def draw_circle(draw, x, y, radius, color, outline=None, width=0):
    draw.ellipse(
        [x - radius, y - radius, x + radius, y + radius],
        fill=color,
        outline=outline,
        width=width
    )

def draw_star(draw, cx, cy, radius, color, outline=None, width=0, points=5):
    """Draws a star shape."""
    angle_step = math.pi * 2 / points
    coords = []
    rotation = -math.pi / 2 # Point up
    
    inner_radius = radius * 0.4
    
    for i in range(points * 2):
        r = radius if i % 2 == 0 else inner_radius
        curr_angle = i * (angle_step / 2) + rotation
        x = cx + math.cos(curr_angle) * r
        y = cy + math.sin(curr_angle) * r
        coords.append((x, y))
        
    draw.polygon(coords, fill=color, outline=outline)
    # If outline width > 1, draw line loop manually for better corners (optional)
    if outline and width > 1:
        draw.line(coords + [coords[0]], fill=outline, width=width)

def draw_text(draw, x, y, text, color=(0,0,0), size=20):
    # Note: Requires default font or path to ttf
    try:
        # Try to load a generic font, or fallback to default
        font = ImageFont.truetype("arial.ttf", size)
    except IOError:
        font = ImageFont.load_default()
        
    draw.text((x, y), text, fill=color, font=font, anchor="mm")
