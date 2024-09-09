import { useState, useContext, useEffect } from "react"
import Dashboard from "../pages/Dashboard"
import Expense from "../pages/Expense"
import { NavLink } from "react-router-dom";
import { Image, Col } from 'react-bootstrap';
import { AuthContext } from "./AuthProvider";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function Nav() {

  const { user } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  console.log(file)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const uid = user.uid;
          const userDoc = doc(db, 'users', uid);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No user is signed in');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData()
  }, [])

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);

    if (selectedFile && user) {
      setUploading(true);
      try {
        //Upload file to firebase storage
        //create reference
        const imageRef = ref(storage, `post/${selectedFile.name}`);
        //upload file
        const response = await uploadBytes(imageRef, selectedFile);

        const newFileUrl = await getDownloadURL(response.ref);

        //Create a reference to user's posts subcollection
        const postsRef = collection(db, `users/${user.uid}/posts`);
        const newPostsRef = doc(postsRef);

        //Add the fileUrl to the new document
        await setDoc(newPostsRef, { fileUrl: newFileUrl, timestamp: new Date() });

        //Update the local state to reflect the image URL
        setFileUrl(newFileUrl);

        //Add or update the fileUrl in the user's document
        console.log('New post added', { id: newPostsRef.id, fileUrl: newFileUrl });

      } catch (e) {
        console.error('Error adding document:', e);
      } finally {
        setUploading(false);
      }
    }
  }


  const [activeTab, setActiveTab] = useState('');
  console.log(activeTab);

  const renderContent = () => {
    if (activeTab === 'home') {
      return <Dashboard />
    } else if (activeTab === 'expenses') {
      return <Expense />
    }
  }

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      localStorage.removeItem('user');
      setUserData(null);
      navigate('/login')
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <div class="d-flex align-items-start">

      <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <img
            src={fileUrl || 'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png'} // Use a default image if no profile picture is uploaded
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => fileUrl && window.open(fileUrl, '_blank')}
          />        
          <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="fileInput"
        />
        <label htmlFor="fileInput">
          <i
            className="bi bi-camera"
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              background: 'white',
              borderRadius: '50%',
              padding: '5px',
              cursor: 'pointer',
            }}
          />
        </label>
        {userData ? (
          <div style={{ marginTop: "20px" }}>
            <form>
              <div class="mb-3">
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder={userData.name} disabled />
              </div>
            </form>
          </div>
        ) : (
          <p>No user data available</p>
        )}
        <NavLink to="/" className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')} role="tab">Home</NavLink>
        <NavLink to="/expense" className={`nav-link ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')} role="tab">Expenses</NavLink>
        <NavLink to="/trips" className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} role="tab">Trip</NavLink>
        <NavLink class="nav-link" role="tab">Approvals</NavLink>
        <NavLink class="nav-link" role="tab">Settings</NavLink>
        <NavLink onClick={handleLogout}>Log out</NavLink>
      </div>
      <div class="tab-content" id="v-pills-tabContent">
        {renderContent}
      </div>
    </div>
  )
}