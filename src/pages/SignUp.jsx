import Form from 'react-bootstrap/Form';

export default function SignUp() {

    const handleAdd = () =>{
        console.log('Add');
    }
    return (
        <div className='container'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
            </Form>
            <button onClick={handleAdd}>Sign Up</button>
        </div>
    )
}