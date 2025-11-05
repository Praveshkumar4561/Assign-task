import React, { useState } from 'react';

const HairstyleGallery = ({ hairstyles, selectedHairstyle, selectHairstyle }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (hairstyleId) => {
    setImageErrors(prev => ({ ...prev, [hairstyleId]: true }));
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">💄 Choose Your Hairstyle</h5>
        <div className="row">
          {hairstyles.map((hairstyle) => (
            <div key={hairstyle.id} className="col-md-4 mb-4">
              <div
                className={`card h-100 ${selectedHairstyle?.id === hairstyle.id ? 'border-primary shadow-lg' : 'gallery-card'}`}
                onClick={() => selectHairstyle(hairstyle)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedHairstyle?.id === hairstyle.id ? 'scale(1.05)' : 'scale(1)',
                  background: selectedHairstyle?.id === hairstyle.id
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                    : 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <div className="position-relative">
                  {!imageErrors[hairstyle.id] ? (
                    <img
                      className="card-img-top"
                      src={hairstyle.image}
                      alt={hairstyle.name}
                      onError={() => handleImageError(hairstyle.id)}
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        filter: selectedHairstyle?.id === hairstyle.id ? 'brightness(1.1)' : 'brightness(1)'
                      }}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center bg-light"
                      style={{ height: '200px' }}
                    >
                      <div className="text-center">
                        <div style={{ fontSize: '3rem', opacity: 0.5 }}>💇‍♀️</div>
                        <small className="text-muted">Image unavailable</small>
                      </div>
                    </div>
                  )}
                  {selectedHairstyle?.id === hairstyle.id && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary rounded-pill">✓ Selected</span>
                    </div>
                  )}
                </div>
                <div className="card-body text-center">
                  <h6 className="card-title mb-2" style={{ fontWeight: '600' }}>{hairstyle.name}</h6>
                  <div className="d-flex justify-content-center gap-1">
                    <small className="badge bg-light text-dark">{hairstyle.length}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hairstyles.length === 0 && (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem', opacity: 0.3 }}>💭</div>
            <p className="text-muted mt-3">No hairstyles available for this length</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HairstyleGallery;
