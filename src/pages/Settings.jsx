import Nav from "../components/Nav"
import { useState, useContext, useEffect } from "react"
import Dashboard from "../pages/Dashboard"
import Expense from "../pages/Expense"
import { NavLink } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { Timestamp, doc, getDoc, setDoc, collection, orderBy, query, limit, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Settings() {

        const { user } = useContext(AuthContext);
        console.log(user);
      
        const navigate = useNavigate();
      
        const [userData, setUserData] = useState(null);
        const [fileUrl, setFileUrl] = useState('');
        const [file, setFile] = useState(null);
        const [uploading, setUploading] = useState(false);
        console.log(file)
        const [loading, setLoading] = useState(true);
      
        const [loadingImage, setLoadingImage] = useState(true);
      
        useEffect(() => {
          const fetchUserData = async () => {
            if (user) {
              try {
                const uid = user.uid;
                const userDoc = doc(db, 'users', uid);
                const docSnap = await getDoc(userDoc);
      
                if (docSnap.exists()) {
                  setUserData(docSnap.data());
                } else {
                  console.log('No such document!');
                }
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
              }
            } else {
              console.log('No user is signed in');
              setLoading(false); //Set loading to false if no user is signed in
            }
          };
          fetchUserData()
        }, [user])
      
        const handleFileChange = async (e) => {
          const selectedFile = e.target.files[0];
          if (!selectedFile) return;
      
          console.log(selectedFile);
          setFile(selectedFile);
          setUploading(true);
      
          try {
            if (selectedFile && user) {
              //Create a reference to the storage location
              const imageRef = ref(storage, `post/${selectedFile.name}`);
      
              //Upload the file
              const uploadResult = await uploadBytes(imageRef, selectedFile);
      
              //Get the file URL
              const newFileUrl = await getDownloadURL(uploadResult.ref);
      
              // Create a reference to the user's posts subcollection
              const postsRef = collection(db, `users/${user.uid}/posts`);
              const newPostRef = doc(postsRef);
      
              //Add the file URL to the new document
              await setDoc(newPostRef, { fileUrl: newFileUrl, timestamp: Timestamp.now() });
      
              //Update the local state to reflect the image URL
              setFileUrl(newFileUrl);
      
              //Create a reference to the user's posts subcollection
              // const postsRef = collection(db, `users/${user.uid}/posts`);
              // const newPostsRef = doc(postsRef);
            } else {
              console.log('No user is signed in');
            }
          } catch (e) {
            console.error('Error uploading file:', e);
          } finally {
            setUploading(false);
          }
        }
      
         useEffect(()=>{
        const fetchProfileImage = async () => {
          if (user) {
            // Start loading when fetching
            setLoadingImage(true);
            try {
              //Reference to user's posts subcollection
              const postRef = collection(db, `users/${user.uid}/posts`);
      
              //Query to get latest post
              const q = query(postRef, orderBy("timestamp", "desc"), limit(1));
              const querySnapShot = await getDocs(q);
      
              if (!querySnapShot.empty) {
                const latestPostDoc = querySnapShot.docs[0];
                const latestPostData = latestPostDoc.data();
                setFileUrl(latestPostData.fileUrl || '');
              }
            } catch (e) {
              console.error('Error fetching document:', e)
            } finally{
              setLoadingImage(false);
            }
          };
        }
      
        fetchProfileImage()
         }, [user])
      
      
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
          <div class="d-flex align-items-start" id="navBar">
      
            <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              {loadingImage ? (
                <div>
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <img
                  src={fileUrl || 'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png'} // Use a default image if no profile picture is uploaded
                  alt="Profile"
                  style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }}
                  onClick={() => fileUrl && window.open(fileUrl, '_blank')}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="fileInput"
              />
            </div>
            <div class="tab-content" id="v-pills-tabContent">
              {renderContent}
            </div>
          </div>
        )
}