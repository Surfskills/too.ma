import React, { useState } from 'react';
import './HomePage.css';

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item" onClick={() => setIsOpen(!isOpen)}>
      <h3>{question}</h3>
      <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>▼</span>
      {isOpen && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

const HomePage = () => {
  const faqData = [
    {
      question: "Why do I need tooma?",
      answer: "Tooma simplifies monetization for creators by providing an all-in-one platform to sell products, accept payments, and grow your audience, all through a single link in your bio."
    },
    {
      question: "Do I need a website to use tooma?",
      answer: "No, you don't need a website. Tooma provides everything you need to start selling and engaging with your audience right away, without the need for a separate website."
    },
    {
      question: "How is tooma different from all those other link in bio sites?",
      answer: "Tooma focuses on monetization, offering built-in e-commerce features, audience growth tools, and analytics, making it a comprehensive solution for creators looking to earn from their online presence."
    },
    {
      question: "How can I make money on tooma?",
      answer: "You can make money on Tooma by selling digital products, offering services, accepting donations, or setting up subscriptions. Our platform handles payments and delivery, making it easy for you to focus on creating."
    },
    {
      question: "How long does it take to get paid?",
      answer: "Payouts are typically processed within 3-5 business days after a sale is made, depending on your chosen payout method and location."
    },
    {
      question: "Is tooma available in my country?",
      answer: "Tooma is available in most countries worldwide. Check our supported countries list on our website or contact our support team for specific information about your location."
    }
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-page">
      <header>
        <div className="content-wrapper">
          <a href="/" className="logo">tooma</a>
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li><button onClick={toggleMenu}>Home</button></li>
              <li><button onClick={toggleMenu}>Pricing</button></li>
              <li><button onClick={toggleMenu}>About</button></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign up</button>
          </div>
          <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="content-wrapper">
            <div className="hero-content">
              <h1>Make money with your link in bio</h1>
              <p>Tooma is the easiest way to make money online. Just add your payment link to your bio and start accepting payments for your products or services.</p>
              <button className="cta-button">Get started</button>
            </div>
            <div className="hero-image">
              <img src="https://via.placeholder.com/500x600" alt="Tooma app interface" />
            </div>
          </div>
        </section>

        <section className="features">
          <div className="content-wrapper">
            <div className="feature-item">
              <h2>Start selling in minutes, no website needed.</h2>
              <p>Set up your Tooma link and start accepting payments in just a few clicks. No coding or website building required.</p>
              <button className="cta-button">Get Started</button>
            </div>
            <div className="feature-image">
              <img src="https://via.placeholder.com/600x400" alt="Tooma features" />
            </div>
          </div>
        </section>

        <section className="creators">
          <div className="content-wrapper">
            <h2>The best creators trust tooma</h2>
            <div className="creator-grid">
              {[1, 2, 3, 4].map((creator) => (
                <div key={creator} className="creator-card">
                  <div className="creator-avatar">
                    <img src={`https://via.placeholder.com/80x80?text=Creator${creator}`} alt={`Creator ${creator}`} />
                  </div>
                  <p className="creator-name">Creator Name</p>
                  <p className="creator-followers">50K+ followers</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grow-audience">
          <div className="content-wrapper">
            <div className="grow-content">
              <h2>Grow your own audience.</h2>
              <p>Build your audience and connect with them directly on Tooma. Create a personalized page for your brand and engage with your followers.</p>
              <button className="cta-button">Get Started</button>
            </div>
            <div className="grow-image">
              <img src="https://via.placeholder.com/500x300" alt="Grow your audience" />
            </div>
          </div>
        </section>

        <section className="sell-products">
          <div className="content-wrapper">
            <div className="sell-image">
              <img src="https://via.placeholder.com/500x300" alt="Sell digital products" />
            </div>
            <div className="sell-content">
              <h2>Sell digital products easily.</h2>
              <p>With Tooma, you can sell any type of digital product - from ebooks to courses to software. Set your price and start selling instantly.</p>
              <button className="cta-button">Get Started</button>
            </div>
          </div>
        </section>

        <section className="faq">
          <div className="content-wrapper">
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {faqData.map((item, index) => (
                <FAQ key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="content-wrapper">
            <h2>Start earning on the internet with tooma</h2>
            <button className="cta-button">Get started</button>
          </div>
        </section>
      </main>

      <footer>
        <div className="content-wrapper">
          <div className="footer-content">
            <div className="footer-logo">tooma</div>
            <p>Tooma is the easiest way to make money online. Just add your payment link to your bio and start accepting payments.</p>
            <div className="social-icons">
              {/* Add your social media icons here */}
            </div>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#contact">Contact us</a></li>
                <li><a href="#privacy">Privacy</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#terms">Terms</a></li>
                <li><a href="#privacy">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; Tooma Technologies Inc 2023</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;