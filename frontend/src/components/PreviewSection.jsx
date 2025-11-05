import React, { useState } from "react";

const PreviewSection = ({
  userImage,
  previewImage,
  transform,
  setTransform,
}) => {
  const [activeTab, setActiveTab] = useState("preview");

  const controls = [
    {
      key: "x",
      label: "↔️ Horizontal",
      min: -200,
      max: 200,
      step: 5,
      description: "Move left/right",
    },
    {
      key: "y",
      label: "↕️ Vertical",
      min: -200,
      max: 200,
      step: 5,
      description: "Move up/down",
    },
    {
      key: "scale",
      label: "🔍 Scale",
      min: 0.1,
      max: 3,
      step: 0.1,
      description: "Make bigger/smaller",
    },
    {
      key: "rotation",
      label: "🔄 Rotation",
      min: -180,
      max: 180,
      step: 5,
      description: "Rotate hairstyle",
    },
  ];

  const resetTransform = () => {
    setTransform({ x: 0, y: 0, scale: 1, rotation: 0 });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">✨ Your Virtual Hairstyle Preview</h5>

        <ul className="nav nav-tabs mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === "preview" ? "active" : ""}`}
              onClick={() => setActiveTab("preview")}
            >
              👀 Preview
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === "adjust" ? "active" : ""}`}
              onClick={() => setActiveTab("adjust")}
            >
              ⚙️ Adjust
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === "preview" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center mb-3">
                    <h6 className="text-muted">📷 Your Photo</h6>
                    <img
                      src={userImage}
                      alt="Your photo"
                      className="img-fluid rounded shadow"
                      style={{ maxHeight: "300px" }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-center mb-3">
                    <h6 className="text-muted">💇‍♀️ Preview</h6>
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Hairstyle preview"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "300px" }}
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center bg-light rounded"
                        style={{
                          height: "300px",
                          border: "2px dashed #dee2e6",
                        }}
                      >
                        <div className="text-center">
                          <div style={{ fontSize: "3rem", opacity: 0.5 }}>
                            💭
                          </div>
                          <p className="text-muted mb-2">No preview yet</p>
                          <small className="text-muted">
                            Click "Preview" to see your new hairstyle!
                          </small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "adjust" && (
            <div className="tab-pane active">
              <div className="row">
                {controls.map((control) => (
                  <div key={control.key} className="col-md-6 mb-4">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <label className="form-label fw-bold">
                          {control.label}
                        </label>
                        <p className="text-muted small mb-2">
                          {control.description}
                        </p>
                        <input
                          type="range"
                          className="form-range"
                          min={control.min}
                          max={control.max}
                          step={control.step}
                          value={transform[control.key]}
                          onChange={(e) =>
                            setTransform({
                              ...transform,
                              [control.key]:
                                control.key === "scale"
                                  ? parseFloat(e.target.value)
                                  : parseInt(e.target.value),
                            })
                          }
                          style={{
                            accentColor: "#667eea",
                          }}
                        />
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">{control.min}</small>
                          <span className="badge bg-primary">
                            {transform[control.key]}
                            {control.key === "scale"
                              ? "x"
                              : control.key === "rotation"
                              ? "°"
                              : "px"}
                          </span>
                          <small className="text-muted">{control.max}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={resetTransform}
                >
                  🔄 Reset Adjustments
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
