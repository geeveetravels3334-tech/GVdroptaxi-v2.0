
import os
from PIL import Image

def validate_gif(filename, is_emoji=True, verbose=False):
    """
    Validates a GIF file against Slack's constraints.
    
    Args:
        filename (str): Path to GIF.
        is_emoji (bool): If True, checks against emoji constraints (128x128).
        verbose (bool): Print details.
        
    Returns:
        tuple: (bool passed, str info)
    """
    if not os.path.exists(filename):
        return False, "File not found."

    img = Image.open(filename)
    width, height = img.size
    file_size = os.path.getsize(filename)
    
    info = []
    passed = True

    # Check Dimensions
    if is_emoji:
        if width > 128 or height > 128:
            passed = False
            info.append(f"Dimensions {width}x{height} exceed recommended 128x128 for emojis.")
        else:
            info.append(f"Dimensions {width}x{height} are good.")
    else:
        # Message GIF limits are looser, usually 480px width is safe
        info.append(f"Dimensions {width}x{height}.")

    # Check File Size (Slack strict limit for custom emoji is 64KB, but sometimes allows up to 128KB)
    limit_kb = 128 if is_emoji else 5000
    size_kb = file_size / 1024
    
    if size_kb > limit_kb:
        passed = False
        info.append(f"File size {size_kb:.2f}KB exceeds limit of {limit_kb}KB.")
    else:
        info.append(f"File size {size_kb:.2f}KB is within limits.")

    # Check Frame Count (duration)
    try:
        num_frames = img.n_frames
        duration = img.info.get('duration', 100)
        total_time = (num_frames * duration) / 1000
        
        if is_emoji and total_time > 3.0:
            info.append(f"Duration {total_time:.2f}s is long for an emoji (aim for < 3s).")
        else:
            info.append(f"Duration {total_time:.2f}s.")
            
    except Exception as e:
        info.append(f"Could not determine animation details: {e}")

    result_text = " | ".join(info)
    if verbose:
        print(result_text)
        
    return passed, result_text

def is_slack_ready(filename):
    passed, _ = validate_gif(filename, is_emoji=True, verbose=False)
    return passed
