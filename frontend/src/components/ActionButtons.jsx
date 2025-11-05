import React, { useState } from 'react';

const ActionButtons = ({ previewHairstyle, savePreview, reset, userImage, selectedHairstyle, previewImage }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePreview = async () => {
    setIsGenerating(true);
    try {
      await previewHairstyle();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await savePreview();
    } finally {
      setIsSaving(false);
    }
  };

  const canPreview = userImage && selectedHairstyle && !isGenerating;
  const canSave = previewImage && !isSaving;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">🎯 Actions</h5>
        <div className="row justify-content-center g-3">
          <div className="col-md-4">
            <button
              className="btn btn-success w-100 position-relative"
              onClick={handlePreview}
              disabled={!canPreview}
              style={{
                minHeight: '50px',
                transition: 'all 0.3s ease'
              }}
            >
              {isGenerating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Generating...
                </>
              ) : (
                <>
                  ✨ Preview Hairstyle
                </>
              )}
            </button>
            {!userImage && (
              <small className="text-muted d-block mt-1 text-center">Upload a photo first</small>
            )}
            {userImage && !selectedHairstyle && (
              <small className="text-muted d-block mt-1 text-center">Choose a hairstyle</small>
            )}
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-info w-100 position-relative"
              onClick={handleSave}
              disabled={!canSave}
              style={{
                minHeight: '50px',
                transition: 'all 0.3s ease'
              }}
            >
              {isSaving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Saving...
                </>
              ) : (
                <>
                  💾 Save Preview
                </>
              )}
            </button>
            {!previewImage && (
              <small className="text-muted d-block mt-1 text-center">Generate preview first</small>
            )}
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-danger w-100"
              onClick={reset}
              style={{
                minHeight: '50px',
                transition: 'all 0.3s ease'
              }}
            >
              🔄 Start Over
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <div className="row">
            <div className="col-md-4">
              <div className="text-center">
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {userImage ? '✅' : '⏳'}
                </div>
                <small className="text-muted">Photo Uploaded</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {selectedHairstyle ? '✅' : '⏳'}
                </div>
                <small className="text-muted">Hairstyle Selected</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {previewImage ? '✅' : '⏳'}
                </div>
                <small className="text-muted">Preview Generated</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
