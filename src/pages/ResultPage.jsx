import { useLocation, Link } from 'react-router-dom'
import { useRef } from 'react'
import './ResultPage.css'
import BREEDS_DB from '../data/breeds.json'

const getBreedInfo = (name) => {
  if (!name) return null
  const idValue = name.toLowerCase().replace(/ /g, '_')
  return BREEDS_DB.find(b => b.id === idValue || b.name.toLowerCase() === name.toLowerCase())
         || BREEDS_DB[0]
}

const BASE_URL = 'http://localhost:5000'

function formatTimestamp() {
  const now = new Date()
  return now.toLocaleString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: 'Asia/Kolkata'
  }) + ' IST'
}

function generateCertId() {
  const now = new Date()
  return `CAI-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${Math.random().toString(36).substr(2,6).toUpperCase()}`
}

export default function ResultPage() {
  const { state } = useLocation()
  const result = state?.result
  const breedDetail = getBreedInfo(result?.breed)
  const timestamp = useRef(formatTimestamp())
  const certId    = useRef(generateCertId())

  const handlePrint = () => window.print()

  if (!result) {
    return (
      <div className="result-page page-wrapper">
        <div className="container center">
          <h2>No results found. Please upload an image first.</h2>
          <Link to="/upload" className="btn btn-primary">Go to Upload</Link>
        </div>
      </div>
    )
  }

  const confidencePct = (result.confidence * 100).toFixed(1)

  return (
    <div className="result-page page-wrapper">
      <div className="container">

        {/* ── Breadcrumb (hidden on print) ── */}
        <nav className="breadcrumb animate-fadeIn no-print">
          <Link to="/">Home</Link><span>›</span>
          <Link to="/upload">Classifier</Link><span>›</span>
          <span>Results</span>
        </nav>

        {/* ══════════════════════════════════════
            CERTIFICATE (visible on screen + print)
        ══════════════════════════════════════ */}
        <div className="cert-wrapper animate-fadeInUp" id="breed-certificate">

          {/* Certificate Header */}
          <div className="cert-header">
            <div className="cert-logo-row">
              <img src="/logo.png" alt="CattleAI" className="cert-logo" />
              <div>
                <div className="cert-app-name">CattleAI Breed Classifier</div>
                <div className="cert-app-sub">AI-Powered Indian Cattle Breed Intelligence System</div>
              </div>
              <div className="cert-badge-official">OFFICIAL REPORT</div>
            </div>
            <h2 className="cert-title">Breed Classification Certificate</h2>
            <div className="cert-meta-row">
              <span className="cert-meta-item">📋 Certificate ID: <strong>{certId.current}</strong></span>
              <span className="cert-meta-item">🕐 Generated: <strong>{timestamp.current}</strong></span>
            </div>
          </div>

          {/* Divider */}
          <div className="cert-divider" />

          {/* Main Result Row */}
          <div className="cert-result-row">

            {/* Left — Detection Image */}
            <div className="cert-img-block">
              <p className="cert-img-label">🔍 Detection Output</p>
              <img
                src={`${BASE_URL}${result.detected_image}`}
                alt="Detection"
                className="cert-img"
              />
              <p className="cert-img-caption">
                {result.animal_detected ? '✅ Cattle bounding box detected' : '🖼️ Full image used for classification'}
              </p>
            </div>

            {/* Center — Grad-CAM */}
            <div className="cert-img-block">
              <p className="cert-img-label">🌡️ Grad-CAM Heatmap</p>
              <img
                src={`${BASE_URL}${result.heatmap}`}
                alt="Grad-CAM"
                className="cert-img"
              />
              <p className="cert-img-caption">Visual attention map (model focus area)</p>
            </div>

            {/* Right — Verdict */}
            <div className="cert-verdict">
              <div className="cert-verdict-label">IDENTIFIED BREED</div>
              <div className="cert-breed-name">{result.breed.replace(/_/g, ' ')}</div>

              <div className="cert-confidence-block">
                <div className="cert-conf-label">Model Confidence</div>
                <div className="cert-conf-value">{confidencePct}%</div>
                <div className="cert-conf-bar">
                  <div className="cert-conf-fill" style={{ width: `${confidencePct}%` }} />
                </div>
              </div>

              <div className="cert-verdict-status">
                {confidencePct >= 85 ? '🟢 High Confidence' : confidencePct >= 70 ? '🟡 Moderate Confidence' : '🟠 Review Recommended'}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="cert-divider" />

          {/* Breed Details Table */}
          {breedDetail && (
            <div className="cert-details">
              <h3 className="cert-section-title">Breed Profile</h3>
              <div className="cert-details-grid">
                <div className="cert-detail-item">
                  <span className="cert-detail-key">Scientific Origin</span>
                  <span className="cert-detail-val">{breedDetail.origin}</span>
                </div>
                <div className="cert-detail-item">
                  <span className="cert-detail-key">Home State</span>
                  <span className="cert-detail-val">{breedDetail.state || 'India'}</span>
                </div>
                <div className="cert-detail-item">
                  <span className="cert-detail-key">Typical Milk Yield</span>
                  <span className="cert-detail-val">{breedDetail.milkYield}</span>
                </div>
                <div className="cert-detail-item">
                  <span className="cert-detail-key">Avg Weight</span>
                  <span className="cert-detail-val">{breedDetail.weight}</span>
                </div>
                <div className="cert-detail-item">
                  <span className="cert-detail-key">Conservation Status</span>
                  <span className="cert-detail-val">{breedDetail.status}</span>
                </div>
                <div className="cert-detail-item">
                  <span className="cert-detail-key">Primary Use</span>
                  <span className="cert-detail-val">{breedDetail.mainType}</span>
                </div>
              </div>
              <div className="cert-desc">{breedDetail.desc}</div>
              <div className="cert-traits">
                {breedDetail.traits?.map(t => (
                  <span key={t} className="cert-trait-tag">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="cert-divider" />

          {/* Certificate Footer */}
          <div className="cert-footer">
            <div className="cert-footer-left">
              <div className="cert-footer-seal">🔬 AI VERIFIED</div>
              <div className="cert-footer-note">
                Classified using ResNet-50 deep learning model<br />
                trained on 8,500+ images across 50 Indian cattle breeds.
              </div>
            </div>
            <div className="cert-footer-center">
              <div className="cert-footer-watermark">CattleAI</div>
            </div>
            <div className="cert-footer-right">
              <div className="cert-footer-disclaimer">
                This certificate is generated automatically by CattleAI.<br />
                For professional use, verify with a livestock expert.
              </div>
              <div className="cert-footer-url">cattleai.app</div>
            </div>
          </div>

        </div>
        {/* end cert-wrapper */}

        {/* ── Action Buttons (hidden on print) ── */}
        <div className="result-actions no-print animate-fadeInUp delay-2">
          <button className="btn btn-primary" id="download-result-btn" onClick={handlePrint}>
            🖨️ Print Certificate
          </button>
          <Link to="/upload" className="btn btn-secondary" id="new-analysis-btn">
            🔄 New Analysis
          </Link>
          <Link to="/breeds" className="btn btn-secondary">
            📚 View Breed Library
          </Link>
        </div>

      </div>
    </div>
  )
}
