import React, { useState } from 'react';
import './contact_us.css';

function ContactUs() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        setSubmitted(true);
    };

    return (
        <div className='contact-container'>
            <div className='contact-content'>
                <h1 className='contact-heading animate-heading'>Contact Us</h1>
                <p className='contact-description animate-description'>
                    We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
                </p>
                {submitted ? (
                    <div className='contact-success animate-success'>
                        <p>Thank you for contacting us! We will get back to you soon.</p>
                    </div>
                ) : (
                    <form className='contact-form animate-form' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='name'
                            placeholder='Your Name'
                            value={formState.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='email'
                            name='email'
                            placeholder='Your Email'
                            value={formState.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name='message'
                            placeholder='Your Message'
                            value={formState.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type='submit'>Send Message</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ContactUs;
