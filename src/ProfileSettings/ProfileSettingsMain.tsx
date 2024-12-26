import React, { useState } from 'react';
import { uploadUserPictureFile } from '../Actions/Users'; // Assuming this is already set up

const ProfileSettingsMain = () => {
  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle file selection and upload
  const handleFileChange = async (event:any) => {
    const file = event.target.files[0]; // Get the file from the input
    if (file) {
      setLoading(true);
      setErrorMessage(''); // Reset error message on new upload attempt
      const response = await uploadUserPictureFile(file);
      setLoading(false);

      if (response) {
        setImagePath(response); // Assuming the response is the file path or URL
      } else {
        setErrorMessage('Failed to upload the file. Please try again.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Profile Settings</h2>

      <div>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={loading} 
          style={{ marginBottom: '20px' }}
        />
        {loading && <p>Uploading...</p>}

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      {/* Show the uploaded image if available */}
      {imagePath && (
        <div>
          <h3>Profile Picture</h3>
          <img 
            src={imagePath}  // Assuming this is the correct path or URL
            alt="Profile" 
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              objectFit: 'cover' 
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsMain;
