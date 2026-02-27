
from core.gif_builder import GIFBuilder
from core.frame_composer import create_blank_frame, draw_circle
from core.easing import interpolate
from core.validators import validate_gif
from PIL import ImageDraw

def create_bouncing_ball():
    print("Creating bouncing ball GIF...")
    
    # 1. Config
    WIDTH, HEIGHT = 128, 128
    FPS = 15
    DURATION_SEC = 2
    TOTAL_FRAMES = FPS * DURATION_SEC
    
    builder = GIFBuilder(WIDTH, HEIGHT, fps=FPS)
    
    # 2. Generate Frames
    for i in range(TOTAL_FRAMES):
        frame = create_blank_frame(WIDTH, HEIGHT, color=(240, 248, 255))
        draw = ImageDraw.Draw(frame)
        
        # Animation Logic
        t = i / (TOTAL_FRAMES - 1)
        
        # Bounce logic using sine wave absolute value
        # y goes from 100 (bottom) to 30 (top)
        import math
        bounce_height = abs(math.sin(t * math.pi * 2)) 
        y = 100 - (bounce_height * 70)
        
        # Draw shadow (scales with height)
        shadow_size = 20 * (1 - bounce_height * 0.5)
        draw.ellipse(
            [64 - shadow_size/2, 110 - 3, 64 + shadow_size/2, 110 + 3],
            fill=(200, 200, 200)
        )
        
        # Draw Ball
        draw_circle(draw, 64, y, 15, color=(255, 87, 34), outline=(150, 50, 20), width=2)
        
        # Add highlight
        draw_circle(draw, 64 - 5, y - 5, 4, color=(255, 150, 150))
        
        builder.add_frame(frame)
        
    # 3. Save
    output_file = 'bouncing_ball.gif'
    builder.save(output_file, num_colors=64, optimize_for_emoji=True)
    
    # 4. Validate
    passed, info = validate_gif(output_file, is_emoji=True, verbose=True)
    if passed:
        print("Success! GIF is Slack-ready.")
    else:
        print("Warning:", info)

if __name__ == "__main__":
    create_bouncing_ball()
