import { useState, useRef, useCallback } from 'react';
import './App.css';

function App() {
  const [imageInfo, setImageInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Calculate GCD for aspect ratio
  const calculateGCD = (a, b) => {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  // Get common name for standard aspect ratios
  const getCommonName = (ratio) => {
    const commonRatios = {
      1.0: "1:1 (Square)",
      1.33: "4:3 (Standard)",
      1.375: "11:8",
      1.5: "3:2",
      1.6: "16:10",
      1.667: "5:3",
      1.778: "16:9 (HD/Widescreen)",
      1.85: "1.85:1 (Cinema)",
      2.0: "2:1",
      2.35: "2.35:1 (Cinemascope)",
      2.39: "2.39:1 (Anamorphic)"
    };
    
    // Find the closest match (within small tolerance)
    for (const [knownRatio, name] of Object.entries(commonRatios)) {
      if (Math.abs(ratio - knownRatio) < 0.05) {
        return name;
      }
    }
    
    return "Custom";
  };

  const processImage = useCallback((file) => {
    if (!file.type.match('image.*')) {
      setError('画像ファイルを選択してください');
      return;
    }

    setIsLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const gcd = calculateGCD(width, height);
        const aspectRatio = `${width / gcd}:${height / gcd}`;
        const rawRatio = width / height;
        const commonName = getCommonName(rawRatio);

        setImageInfo({
          src: e.target.result,
          width,
          height,
          aspectRatio,
          commonName
        });

        setIsLoading(false);
      };

      img.onerror = () => {
        setError('画像の読み込みに失敗しました');
        setIsLoading(false);
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      setError('ファイルの読み込みに失敗しました');
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  return (
    <div className="App">
      <header>
        <h1>画像アスペクト比計算ツール</h1>
      </header>
      
      <main>
        <div className="upload-container">
          <div 
            className={`drop-area ${isDragging ? 'highlight' : ''}`}
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p>ここに画像をドラッグ＆ドロップするか、クリックして選択してください</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              accept="image/*" 
              className="file-input"
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {isLoading && (
          <div className="loading">
            <div className="loader"></div>
            <p>処理中...</p>
          </div>
        )}

        {imageInfo && !isLoading && (
          <div className="result">
            <div className="preview-container">
              <img 
                src={imageInfo.src} 
                alt="アップロードされた画像" 
                className="image-preview" 
              />
            </div>
            
            <table className="result-table">
              <tbody>
                <tr>
                  <th>画像サイズ</th>
                  <td>{imageInfo.width} × {imageInfo.height} ピクセル</td>
                </tr>
                <tr>
                  <th>アスペクト比</th>
                  <td>{imageInfo.aspectRatio}</td>
                </tr>
                <tr>
                  <th>一般的な名称</th>
                  <td>{imageInfo.commonName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer>
        <p>画像はブラウザ内で処理され、サーバーにアップロードされません</p>
      </footer>
    </div>
  );
}

export default App;
