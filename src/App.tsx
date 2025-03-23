import React, { useState, useCallback } from 'react';
import './App.css';
import DropZone from './components/DropZone';
import ImageResult from './components/ImageResult';
import Loader from './components/Loader';
import { calculateGCD, getCommonName } from './utils/aspectRatio';
import { ERRORS, UI_TEXT } from './constants/messages';
import { ImageInfoType } from './types';

const App: React.FC = () => {
  const [imageInfo, setImageInfo] = useState<ImageInfoType | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const processImage = useCallback((file: File) => {
    if (!file.type.match('image.*')) {
      setError(ERRORS.NOT_IMAGE);
      return;
    }

    setIsLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const gcd = calculateGCD(width, height);
        const aspectRatio = `${width / gcd}:${height / gcd}`;
        const rawRatio = width / height;
        const commonName = getCommonName(rawRatio);

        setImageInfo({
          src: e.target?.result as string,
          width,
          height,
          aspectRatio,
          commonName
        });

        setIsLoading(false);
      };

      img.onerror = () => {
        setError(ERRORS.IMAGE_LOAD_FAILED);
        setIsLoading(false);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setError(ERRORS.FILE_LOAD_FAILED);
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>{UI_TEXT.TITLE}</h1>
      </header>
      
      <main>
        <DropZone 
          onImageSelected={processImage} 
          isDragging={isDragging} 
          setIsDragging={setIsDragging} 
        />

        {error && <div className="error-message">{error}</div>}

        {isLoading && <Loader />}

        {imageInfo && !isLoading && <ImageResult imageInfo={imageInfo} />}
      </main>

      <footer>
        <p>{UI_TEXT.PRIVACY_NOTICE}</p>
      </footer>
    </div>
  );
};

export default App;