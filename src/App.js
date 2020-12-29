import { useEffect, useRef, useState } from 'react';
import "./App.css";
const App = () => {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [size, setSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = size;
    contextRef.current = context;

  }, [size]);
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }
  const finishDrawing = () => {

    contextRef.current.closePath();
    setIsDrawing(false);
  }
  const draw = ({ nativeEvent }) => {

    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
  const decreaseSize = () => {
    console.log("de");
    if (size > 1)
      setSize(size - 1);

    console.log(size);

  }
  const increaseSize = () => {
    console.log("in");

    setSize(size + 1);
    console.log(size);

  }
  return (
    <div>
      <div className="btn">
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={decreaseSize}>-</button>
        <h1>{size}</h1>

        <button onClick={increaseSize}>+</button>
      </div>

      <canvas

        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>

  );
};

export default App;
