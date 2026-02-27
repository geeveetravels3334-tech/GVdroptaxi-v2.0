
from PIL import Image
import os

class GIFBuilder:
    def __init__(self, width=128, height=128, fps=10):
        self.width = width
        self.height = height
        self.fps = fps
        self.frames = []

    def add_frame(self, frame):
        """
        Adds a PIL Image frame to the animation. 
        Resizes the frame if it doesn't match the builder dimensions.
        """
        if frame.size != (self.width, self.height):
            frame = frame.resize((self.width, self.height), Image.BICUBIC)
        
        # Ensure RGB mode for consistency before processing
        if frame.mode != 'RGB' and frame.mode != 'RGBA':
            frame = frame.convert('RGB')
            
        self.frames.append(frame)

    def add_frames(self, frames):
        """Adds a list of PIL Image frames."""
        for f in frames:
            self.add_frame(f)

    def save(self, filename, num_colors=48, optimize_for_emoji=False, remove_duplicates=False):
        """
        Saves the assembled frames as an animated GIF.
        
        Args:
            filename (str): Output path.
            num_colors (int): Number of colors for quantization (lower = smaller file).
            optimize_for_emoji (bool): If True, aggressively optimizes for Slack emoji limits.
            remove_duplicates (bool): (Placeholder) Logic to drop identical sequential frames.
        """
        if not self.frames:
            print("No frames to save.")
            return

        duration = 1000 / self.fps
        
        processed_frames = []
        for i, f in enumerate(self.frames):
            # If standardizing for emoji, ensure 128x128 max
            if optimize_for_emoji and (self.width > 128 or self.height > 128):
                f = f.resize((128, 128), Image.BICUBIC)
            
            # Quantize image to reduce file size
            # method=2 (Fast Octree) or 0 (Median Cut). 
            # dither=1 (Floyd-Steinberg) usually looks better but adds noise/size.
            q_img = f.quantize(colors=num_colors, method=2, kmeans=1, dither=1)
            processed_frames.append(q_img)

        # Basic logic: loop=0 means infinite loop
        processed_frames[0].save(
            filename,
            save_all=True,
            append_images=processed_frames[1:],
            optimize=True,
            duration=duration,
            loop=0,
            transparency=255,
            disposal=2
        )
        print(f"Saved {filename} ({len(processed_frames)} frames, {self.fps} fps)")
