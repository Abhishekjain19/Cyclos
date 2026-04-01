import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbArrowLeft, TbPhoto, TbSend } from 'react-icons/tb';
import './ComplaintPage.css';

export default function ComplaintPage() {
  const navigate = useNavigate();
  const [complaintText, setComplaintText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaintText.trim()) return;
    
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => navigate(-1), 2000);
    }, 800);
  };

  return (
    <div className="complaint-page">
      {/* Header */}
      <div className="complaint-header">
        <button className="complaint-header__btn" onClick={() => navigate(-1)}>
          <TbArrowLeft size={20} />
        </button>
        <div className="complaint-header__title">Report Issue</div>
        <div className="complaint-header__spacer" />
      </div>

      {/* Body */}
      <div className="complaint-body">
        {submitted ? (
          <motion.div 
            className="complaint-success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="complaint-success__icon">🌊</div>
            <h3>Report Submitted</h3>
            <p>Our rapid response team has been notified. Thank you for protecting our oceans.</p>
          </motion.div>
        ) : (
          <motion.form 
            className="complaint-form"
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <p className="complaint-subtitle">Have you spotted illegal dumping, ghost nets, or overflowing bins? Let us know.</p>
            
            <div className="form-group">
              <label>Description</label>
              <textarea 
                placeholder="Describe the issue and exact location..." 
                value={complaintText}
                onChange={e => setComplaintText(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label>Attach Evidence</label>
              <button type="button" className="upload-btn">
                <TbPhoto size={20} /> Upload Photo
              </button>
            </div>

            <button type="submit" className="submit-btn" disabled={!complaintText.trim()}>
              <TbSend size={18} /> Submit Report
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
