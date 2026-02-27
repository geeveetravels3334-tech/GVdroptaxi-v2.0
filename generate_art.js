
const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Constants
const WIDTH = 1200;
const HEIGHT = 1600;
const CANVAS_PATH = 'crystalline-motion.png';

// Initialize Canvas
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Colors
const COLORS = {
    bgStart: '#020617', // Slate 950
    bgEnd: '#0f172a',   // Slate 900
    accent: '#F37021',  // GeeVee Orange
    gold: '#F59E0B',    // Amber 500
    glass: 'rgba(255, 255, 255, 0.03)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassHighlight: 'rgba(255, 255, 255, 0.15)',
    text: '#94a3b8',    // Slate 400
    textLight: '#f8fafc' // Slate 50
};

// Helper: Draw Noise Texture
function addNoise(opacity = 0.05) {
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = data[i] + (val - data[i]) * opacity;     // r
        data[i+1] = data[i+1] + (val - data[i+1]) * opacity; // g
        data[i+2] = data[i+2] + (val - data[i+2]) * opacity; // b
    }
    ctx.putImageData(imageData, 0, 0);
}

// Helper: Draw Grid
function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const step = 40;
    
    for (let x = 0; x <= WIDTH; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
    }
    for (let y = 0; y <= HEIGHT; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
    }
}

// Helper: Draw Glass Card
function drawGlassCard(x, y, w, h, blur = false) {
    ctx.save();
    
    // Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 20;

    // Background
    ctx.fillStyle = COLORS.glass;
    // Create gradient for glass surface
    const grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
    ctx.fillStyle = grad;
    
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 24);
    ctx.fill();

    // Border stroke
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 1.5;
    const borderGrad = ctx.createLinearGradient(x, y, x, y + h);
    borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    borderGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
    ctx.strokeStyle = borderGrad;
    ctx.stroke();

    // Inner highlight
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, w - 2, h - 2, 23);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.stroke();

    ctx.restore();
}

// Helper: Abstract Kolam/Circuit Lines
function drawCircuit(x, y, width, height) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();

    ctx.strokeStyle = COLORS.accent;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.6;

    const nodes = [];
    // Generate nodes in a grid pattern (Kolam style)
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 8; j++) {
            if (Math.random() > 0.4) {
                nodes.push({
                    x: x + 50 + i * 80 + Math.random() * 20,
                    y: y + 50 + j * 80 + Math.random() * 20
                });
            }
        }
    }

    // Connect nodes
    nodes.forEach((node, i) => {
        // Draw Dot
        ctx.fillStyle = COLORS.gold;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect to nearest neighbors
        nodes.forEach((other, j) => {
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < 120 && dist > 0 && Math.random() > 0.7) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                // Curve line
                const cx = (node.x + other.x) / 2 + (Math.random() - 0.5) * 20;
                const cy = (node.y + other.y) / 2 + (Math.random() - 0.5) * 20;
                ctx.quadraticCurveTo(cx, cy, other.x, other.y);
                ctx.stroke();
            }
        });
    });

    ctx.restore();
}

// Main Draw Function
function draw() {
    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    bgGrad.addColorStop(0, COLORS.bgStart);
    bgGrad.addColorStop(1, COLORS.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    drawGrid();

    // 2. Abstract Background Shapes (Blurred Orange Glows)
    ctx.save();
    ctx.filter = 'blur(80px)';
    ctx.fillStyle = COLORS.accent;
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.arc(WIDTH * 0.8, HEIGHT * 0.2, 300, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#3b82f6'; // Blue glow
    ctx.beginPath();
    ctx.arc(WIDTH * 0.2, HEIGHT * 0.8, 350, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Layer 1: Large Glass Pane (Map/Route Layer)
    const card1W = 800;
    const card1H = 1000;
    const card1X = (WIDTH - card1W) / 2;
    const card1Y = (HEIGHT - card1H) / 2;
    
    drawGlassCard(card1X, card1Y, card1W, card1H);
    
    // Abstract Pattern inside Card 1
    drawCircuit(card1X, card1Y, card1W, card1H);

    // 4. Layer 2: Floating Header Card
    const card2W = 900;
    const card2H = 180;
    const card2X = (WIDTH - card2W) / 2;
    const card2Y = card1Y - 60;
    
    drawGlassCard(card2X, card2Y, card2W, card2H);

    // Text on Card 2
    ctx.textAlign = 'left';
    ctx.fillStyle = COLORS.textLight;
    ctx.font = 'bold 80px sans-serif'; // Fallback font
    ctx.fillText('GEE VEE', card2X + 50, card2Y + 110);
    
    ctx.font = '300 80px sans-serif';
    ctx.fillStyle = COLORS.text;
    ctx.fillText('TRAVELS', card2X + 420, card2Y + 110);

    // Small detail text
    ctx.font = '14px monospace';
    ctx.fillStyle = COLORS.accent;
    ctx.fillText('EST. 2014 // TN-01', card2X + 50, card2Y + 40);

    // 5. Layer 3: Detail/Stats Card (Bottom Right overlap)
    const card3W = 400;
    const card3H = 300;
    const card3X = card1X + card1W - card3W + 40;
    const card3Y = card1Y + card1H - 100;

    drawGlassCard(card3X, card3Y, card3W, card3H);

    // Text inside Card 3
    ctx.fillStyle = COLORS.textLight;
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('FLEET STATUS', card3X + 40, card3Y + 60);
    
    ctx.fillStyle = COLORS.text;
    ctx.font = '20px monospace';
    ctx.fillText('ACTIVE UNITS: 240', card3X + 40, card3Y + 110);
    ctx.fillText('ROUTE: OPTIMIZED', card3X + 40, card3Y + 150);
    ctx.fillText('TEMP: 24°C', card3X + 40, card3Y + 190);

    // Indicator Dot
    ctx.beginPath();
    ctx.arc(card3X + 350, card3Y + 50, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#22c55e'; // Green
    ctx.fill();
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 6. Decorative Graphic Elements
    ctx.strokeStyle = COLORS.text;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    
    // Crosshairs
    const chSize = 20;
    const drawCrosshair = (cx, cy) => {
        ctx.beginPath();
        ctx.moveTo(cx - chSize, cy);
        ctx.lineTo(cx + chSize, cy);
        ctx.moveTo(cx, cy - chSize);
        ctx.lineTo(cx, cy + chSize);
        ctx.stroke();
    };

    drawCrosshair(100, 100);
    drawCrosshair(WIDTH - 100, HEIGHT - 100);
    drawCrosshair(WIDTH - 100, 100);
    drawCrosshair(100, HEIGHT - 100);

    // Vertical Scale Line
    ctx.beginPath();
    ctx.moveTo(60, HEIGHT / 2 - 200);
    ctx.lineTo(60, HEIGHT / 2 + 200);
    ctx.stroke();
    
    for(let i = 0; i <= 20; i++) {
        const y = HEIGHT / 2 - 200 + (i * 20);
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(i % 5 === 0 ? 80 : 70, y);
        ctx.stroke();
    }

    // 7. Final Noise Overlay
    addNoise(0.08);

    // 8. Signature
    ctx.fillStyle = COLORS.text;
    ctx.globalAlpha = 0.4;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DESIGN PHILOSOPHY: CRYSTALLINE MOTION', WIDTH / 2, HEIGHT - 40);
}

// Execute
draw();

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(CANVAS_PATH, buffer);
console.log(`Canvas created: ${CANVAS_PATH}`);
