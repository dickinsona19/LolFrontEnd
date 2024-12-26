let API_URL = 'http://localhost:8081/api'


export const loginUser = async (data) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
};


// Function to make a POST request using Fetch API
export const signUpUser = async ( data) => {
    try {
        const response = await fetch(`${API_URL}/addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
};


export const checkAuth = async () => {
    try {
        const response = await fetch('http://localhost:8081/api/checkAuth', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error('User is not authenticated');
        }

        const userData = await response.json();
        console.log('Authenticated user:', userData);
        return userData;
    } catch (error) {
        console.error('Error checking authentication:', error);
        setCurrentUser(null); // Clear user state if authentication fails
    }
};

export const forgotPassword = async (email) =>{
    try {
        const response = await fetch(`http://localhost:8081/api/password/forgot?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.body;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}

export const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/password/logout", {
            method: "POST",
            credentials: "include", // This is important to send cookies
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Logout successful');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export const uploadUserPictureFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      // Send POST request to upload file
      const response = await fetch('http://localhost:8081/api/files/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('File upload failed with status: ' + response.status);
      }
  
      // Assuming the response contains the file path or URL of the uploaded file
      const data = await response.json();
      return data.filePath;  // Replace with actual response data if different
  
    } catch (error) {
      console.error('Error during file upload:', error.message);
      return null;  // Return null in case of error
    }
  };