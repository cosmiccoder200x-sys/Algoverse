import { useRef, useEffect } from 'react';

interface WireframeGridProps {
  className?: string;
}

export default function WireframeGrid({ className = '' }: WireframeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(time: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(47, 173, 170, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      const offset = (time * 0.02) % gridSize;

      // Vertical lines
      const numVerticalLines = Math.ceil(canvas.width / gridSize);
      for (let i = -1; i <= numVerticalLines; i++) {
        const x = i * gridSize + offset;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      const numHorizontalLines = Math.ceil(canvas.height / gridSize);
      for (let j = -1; j <= numHorizontalLines; j++) {
        const y = j * gridSize + offset;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Sweep effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(47, 173, 170, 0)');
      gradient.addColorStop(0.5, 'rgba(47, 173, 170, 0.04)');
      gradient.addColorStop(1, 'rgba(47, 173, 170, 0)');
      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    let animationId: number;
    function animate(time: number) {
      draw(time);
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
