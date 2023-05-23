import {useState} from 'react'
import axios from 'axios'

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT

const ContactForm = () => {
  // state for form submission
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // state for input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // handle our form submission - contains axios call (POST)
  const handleSubmit = (event) => {
    event.preventDefault();
    // object that appends our form data to it - we will send the object up to the contact from via axios
    const testForm = new FormData();
    testForm.append('your-name', name)
    testForm.append('your-email', email)
    testForm.append('your-message', message)

    // Post our form using axios
    // first arguement is the endpoint, second is the data
    axios.post(formEndpoint, testForm, {
      //define headers - tell the server what to expect
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(function (response) {
      console.log(response);
      setSubmitted(true);
    })
    .catch(function (error) {
      console.log(error);
      setError(true);
    })
  }
  // Conditionals for what to render based on submitted or error
  if (submitted) {
    return (
      <>
        <h3>Thank you for your message</h3>
        <p>We will be in touch soon &#128513;</p>
      </>
    )
  }
  if (error) {
    return (
      <>
        <h3>Error</h3>
        <p>Sorry, we were unable to send your message</p>
      </>
    )
  }

  // Form to be returned
  return (
    <>
      <form
            onSubmit={handleSubmit}
            method="POST"
        >
            <div>
                <label htmlFor="name">Your name</label>
                <input
                    type="text"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Your email</label>
                <input
                    type="email"
                    name="email"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                    required
                />
            </div>
            <div>
                <label htmlFor="message">Your message</label>
                <textarea
                    name="message"
                    onChange={event => setMessage(event.target.value)}
                    value={message}
                    required
                />
            </div>
            <div>
                <button
                    className="regular-button"
                    type="submit"
                >
                    SUBMIT
                </button>
            </div>
      </form>
    </>
  )
}

const Contact = () => {
  return (
    <>
      <div id="contact-container" className="container">
        <div>
          <h2>Please feel free to contact us</h2>
          <ContactForm/>
        </div>
      </div>
    </>
  )
}

export default Contact
