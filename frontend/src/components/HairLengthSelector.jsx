import React from 'react';

const HairLengthSelector = ({ hairLength, setHairLength }) => {
  const lengths = [
    { value: 'short', label: 'Short', icon: '✂️', description: 'Bob cuts, pixies, shags' },
    { value: 'medium', label: 'Medium', icon: '💇‍♀️', description: 'Shoulder length, lobs, waves' },
    { value: 'long', label: 'Long', icon: '👩‍🦰', description: 'Long straight, wavy, curly' }
  ];

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">🎨 Select Hair Length</h5>
        <div className="row">
          {lengths.map((length) => (
            <div key={length.value} className="col-md-4 mb-3">
              <div
                className={`card h-100 ${hairLength === length.value ? 'border-primary shadow-lg' : 'hover-card'}`}
                onClick={() => setHairLength(length.value)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: hairLength === length.value
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                    : 'rgba(255, 255, 255, 0.8)'
                }}
              >
                <div className="card-body text-center">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{length.icon}</div>
                  <h6 className="card-title mb-2">{length.label}</h6>
                  <p className="card-text small text-muted">{length.description}</p>
                  {hairLength === length.value && (
                    <div className="mt-2">
                      <span className="badge bg-primary">Selected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HairLengthSelector;
