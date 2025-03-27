import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('https://ejemplo.com');
  const [url, setUrl] = useState('https://ejemplo.com');
  const svgRef = useRef(null);

  const handleGenerate = () => {
    if (!inputValue) return;
    const formatted = inputValue.startsWith('http')
      ? inputValue
      : `https://${inputValue}`;
    setUrl(formatted);
  };

  const downloadQRCode = () => {
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const urlBlob = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const padding = 10;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, padding, padding);
      URL.revokeObjectURL(urlBlob);

      const pngUrl = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'codigo-qr.jpg';
      link.click();
    };

    img.src = urlBlob;
  };

  return (
    <div className='app-container'>
      <h1>Generador de Código QR</h1>

      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Ingresa una URL'
      />

      <button onClick={handleGenerate}>Generar QR</button>

      {url && (
        <>
          <div
            ref={svgRef}
            style={{ background: 'white', padding: '16px', margin: '1rem' }}
          >
            <QRCode value={url} size={256} />
          </div>

          <button onClick={downloadQRCode}>Descargar QR como imagen</button>

          <p>
            Este código QR redirige a: <br />
            <a href={url} target='_blank' rel='noopener noreferrer'>
              {url}
            </a>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
