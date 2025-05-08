import React, { useState } from 'react';

function ProfileContent({ ownerData }) { // Receive ownerData as prop
    const [isEditing, setIsEditing] = useState(false);

    // In a real app, manage form state properly (useState for each field or useForm)
    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleSave = (event) => {
        event.preventDefault();
        // TODO: Get updated data, send to backend, update ownerData state/context
        console.log("Saving profile...");
        setIsEditing(false);
        // Update display fields (this would normally come from updated state)
    };

  return (
    // Use .form-container
    <div className="form-container" style={{ maxWidth: '800px' }}> {/* Example override if needed */}
        {/* Use .form-header */}
        <div className="form-header">
            <h2>My Profile</h2>
            <p>View and update your contact information.</p>
        </div>

        {/* Display Mode */}
        {!isEditing && (
            <div id="profile-display-mode">
                 {/* Use .profile-display-group */}
                <div className="profile-display-group">
                    <strong>Full Name:</strong>
                    <span id="display-owner-name">{ownerData?.name || 'N/A'}</span>
                </div>
                <div className="profile-display-group">
                    <strong>Email:</strong>
                    <span id="display-owner-email">{ownerData?.email || 'N/A'}</span>
                </div>
                <div className="profile-display-group">
                    <strong>Phone:</strong>
                    {/* Assuming phone exists in ownerData */}
                    <span id="display-owner-phone">{ownerData?.phone || '+1 123-456-7890'}</span>
                </div>
                {/* Use .form-actions for button positioning */}
                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" id="edit-profile-btn" onClick={handleEdit}>
                        <i className="fas fa-edit"></i> Edit Profile
                    </button>
                </div>
            </div>
        )}

        {/* Edit Mode */}
        {isEditing && (
            <div id="profile-edit-mode">
                <form id="profile-edit-form" onSubmit={handleSave}>
                     {/* Use .form-group */}
                    <div className="form-group">
                        <label htmlFor="edit-owner-name" className="form-required">Full Name</label>
                        <input type="text" id="edit-owner-name" required defaultValue={ownerData?.name || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-owner-email" className="form-required">Email</label>
                        <input type="email" id="edit-owner-email" required defaultValue={ownerData?.email || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-owner-phone" className="form-required">Phone</label>
                        <input type="tel" id="edit-owner-phone" required defaultValue={ownerData?.phone || ''} />
                    </div>
                    {/* Use .form-actions */}
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" id="cancel-profile-edit-btn" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-primary" id="save-profile-btn">
                            <i className="fas fa-save"></i> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        )}
    </div>
  );
}

export default ProfileContent;