
import math

def interpolate(start, end, t, easing='linear'):
    """
    Interpolates between start and end based on t (0.0 to 1.0) using the specified easing function.
    """
    if t <= 0: return start
    if t >= 1: return end
    
    val = t
    
    if easing == 'linear':
        val = t
    elif easing == 'ease_in':
        val = t * t
    elif easing == 'ease_out':
        val = 1 - (1 - t) * (1 - t)
    elif easing == 'ease_in_out':
        val = 2 * t * t if t < 0.5 else 1 - math.pow(-2 * t + 2, 2) / 2
    elif easing == 'bounce_out':
        n1 = 7.5625
        d1 = 2.75
        if t < 1 / d1:
            val = n1 * t * t
        elif t < 2 / d1:
            t -= 1.5 / d1
            val = n1 * t * t + 0.75
        elif t < 2.5 / d1:
            t -= 2.25 / d1
            val = n1 * t * t + 0.9375
        else:
            t -= 2.625 / d1
            val = n1 * t * t + 0.984375
    elif easing == 'back_out':
        c1 = 1.70158
        c3 = c1 + 1
        val = 1 + c3 * math.pow(t - 1, 3) + c1 * math.pow(t - 1, 2)
        
    return start + (end - start) * val
