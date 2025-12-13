document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('rainCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    const drops = [];
    for (let i = 0; i < 120; i++) {
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            l: 10 + Math.random() * 20,
            s: 3 + Math.random() * 5
        });
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 25, 49, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            const d = drops[i];
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x, d.y + d.l);
            ctx.strokeStyle = '#AEC2E0';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            d.y += d.s;
            if (d.y > canvas.height) {
                d.y = -20;
                d.x = Math.random() * canvas.width;
            }
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
});
