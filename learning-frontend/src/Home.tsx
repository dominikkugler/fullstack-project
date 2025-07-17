import React from 'react';
import UserService from './components/service/UserService';

function Home() {
  const isAuthenticated = UserService.isAuthenticated();
  const getStartedLink = isAuthenticated ? '/profile' : '/auth/register';

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <header className="text-center bg-light p-5 rounded shadow">
        <h1 className="display-4 mb-3">Welcome to My Learning Platform</h1>
        <p className="lead mb-4">
          Whether you're looking to teach or learn, our platform connects you with the right people to achieve your educational goals.
        </p>
        <p className="mb-4">
          <strong>For Tutors:</strong> Share your expertise and help others grow.
        </p>
        <p className="mb-4">
          <strong>For Students:</strong> Find the perfect tutor to guide you through your learning journey.
        </p>
        <p className="mb-4">
          Join a community dedicated to knowledge sharing and personal growth.
        </p>
        <a className="btn btn-primary btn-lg" href={getStartedLink}>
          {isAuthenticated ? 'Go to Your Profile' : 'Get Started'}
        </a>
      </header>

      {/* Features Section */}
      <section className="container my-5">
        <h2 className="text-center mb-5">Platform Features</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <i className="bi bi-person-check display-4 text-primary mb-3"></i>
              <h4>Experienced Tutors</h4>
              <p>Learn from qualified professionals with years of teaching experience.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <i className="bi bi-clock display-4 text-primary mb-3"></i>
              <h4>Flexible Scheduling</h4>
              <p>Choose lesson times that fit your schedule, anytime, anywhere.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <i className="bi bi-shield-lock display-4 text-primary mb-3"></i>
              <h4>Secure Platform</h4>
              <p>Your privacy and data security are our top priorities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center my-5">
        <h2 className="mb-4">Ready to Start Learning?</h2>
        <p className="mb-4">Join thousands of learners and tutors who are making education accessible and enjoyable.</p>
        <a className="btn btn-primary btn-lg" href={getStartedLink}>
          {isAuthenticated ? 'Go to Your Profile' : 'Sign Up Now'}
        </a>
      </section>
    </div>
  );
}

export default Home;
