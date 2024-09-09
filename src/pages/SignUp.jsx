import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


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
            const userId = response.user.uid;
            console.log(`User created with UID: ${userId}`);

            console.log(response.user);

        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <div className='container'>
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleConfirmPasword} value={confirmPassword} />
                </Form.Group>
            </Form>
            <button onClick={handleAdd}>Sign Up</button>
        </div>
    )
}