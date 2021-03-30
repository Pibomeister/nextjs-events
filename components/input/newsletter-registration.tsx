import { useContext, useRef } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.scss';

export default function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>() as any;
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: 'Signin up',
      message: 'Registering for newsletter',
      status: 'pending',
    });
    try {
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
      if(!response.ok) {
        throw new Error(data.message ?? 'Something went wrong');
      }
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter',
        status: 'success',
      });
      console.log(data);
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error',
        message: error.message ?? 'Something went wrong',
        status: 'error',
      });
    }
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
