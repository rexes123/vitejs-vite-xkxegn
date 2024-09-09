import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    console.log(email);
    console.log(password);

    const user = localStorage.getItem('user');

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
        navigate('/');
        }
    }, [user, navigate])

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const auth = getAuth();

    const handleLogin = async (e) => {
        console.log('Login')
        e.preventDefault();

        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const user = response.user;
            console.log(user);

            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email
            }));

        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className='container'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={handleEmail} value={email} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handlePassword} value={password} />
                </Form.Group>
            </Form>

            <button onClick={handleLogin}>Login</button>
        </div>
    )
}