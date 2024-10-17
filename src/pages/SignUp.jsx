import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    const handleName = (e) =>{
        console.log(e.target.value)
        setName(e.target.value);
    }


    const handleEmail = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleAdd = async (e) => {
        console.log('Add');
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password do not match');
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            //Get user uid
            const uid = response.user.uid;
            console.log(`User created with UID: ${uid}`);

            await setDoc(doc(db, 'users', uid),{
                name: name,
                email: email,
            })

            console.log(response.user);

        } catch (error) {
            console.error(error.message);
        }
    }

    const navToLogin = ()=>{
        navigate('/login')
    }


    return (
        <div className='container'>
            <h3>Sign Up</h3>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={handleName} value={name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={handleEmail} value={email} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handlePassword} value={password} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={handleConfirmPasword} value={confirmPassword} />
                </Form.Group>
            </Form>
            <button onClick={handleAdd} class="btn btn-primary" style={{marginRight: "10px"}}>Sign Up</button>
            <button onClick={navToLogin} class="btn btn-secondary">Log in</button>
        </div>
    )
}