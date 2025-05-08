import React from 'react';

function SettingsContent() {

    const handlePasswordSubmit = (event) => {
        event.preventDefault();
        // TODO: Validate passwords, submit change request
        console.log("Password change submitted");
        // Reset form
        event.target.reset();
    };

  return (
    <div>
         <h2>Settings</h2>
         {/* Use .form-container */}
         <div className="form-container">
             <p>Settings related to notifications, password changes, etc.</p>
             <h4>Notification Preferences</h4>
              {/* Use .amenity-checkbox */}
             <label className="amenity-checkbox">
                 <input type="checkbox" defaultChecked /> <span>Email me about new bookings</span>
             </label>
              <label className="amenity-checkbox">
                 <input type="checkbox" defaultChecked /> <span>Email me about new reviews</span>
             </label>
             <label className="amenity-checkbox">
                 <input type="checkbox" /> <span>Email me about cancellation requests</span>
             </label>

              <h4 style={{marginTop: '2rem', marginBottom: '1.5rem'}}>Change Password</h4>
              <form id="password-change-form" onSubmit={handlePasswordSubmit}>
                   {/* Use .form-group */}
                  <div className="form-group">
                      <label htmlFor="current-password">Current Password</label>
                      <input type="password" id="current-password" required />
                  </div>
                   <div className="form-group">
                      <label htmlFor="new-password">New Password</label>
                      <input type="password" id="new-password" required />
                  </div>
                   <div className="form-group">
                      <label htmlFor="confirm-password">Confirm New Password</label>
                      <input type="password" id="confirm-password" required />
                  </div>
                  {/* Use .form-actions */}
                  <div className="form-actions">
                       <button type="submit" className="btn btn-primary">
                            <i className="fas fa-key"></i> Update Password
                       </button>
                  </div>
              </form>
         </div>
    </div>
  );
}

export default SettingsContent;