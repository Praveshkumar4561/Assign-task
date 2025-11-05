import React, { useState } from 'react';

const PhotoUploader = ({ fileInputRef, handleFileUpload, captureFromCamera }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const fakeEvent = { target: { files: [file] } };
        handleFileUpload(fakeEvent);
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">📸 Upload Your Photo</h5>
        <div
          className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragOver ? '#667eea' : '#dee2e6'}`,
            borderRadius: '15px',
            padding: '2rem',
            textAlign: 'center',
            background: dragOver ? 'rgba(102, 126, 234, 0.05)' : 'rgba(255, 255, 255, 0.5)',
            transition: 'all 0.3s ease',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.7 }}>
            {dragOver ? '📂' : '📷'}
          </div>
          <p className="mb-3" style={{ color: '#666', fontSize: '1.1rem' }}>
            Drag & drop your photo here, or click to browse
          </p>
          <small className="text-muted">Supported formats: JPG, PNG, WebP (Max 10MB)</small>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => fileInputRef.current.click()}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <span>📁 Choose File</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </div>
          <div className="col-md-6 mb-3">
            <button
              className="btn btn-secondary w-100"
              onClick={captureFromCamera}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <span>📹 Camera</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <small className="text-muted">
            💡 <strong>Tip:</strong> Use a clear, front-facing photo with good lighting for best results
          </small>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploader;
