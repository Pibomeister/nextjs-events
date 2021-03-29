import { useRef } from 'react';
import classes from './newsletter-registration.module.scss';

export default function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>() as any;

  async function registrationHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
