import { Link } from "react-router-dom";
import { FaDiscord, FaEnvelope, FaInstagram, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="Footer">
        <div className="container">
          <div className="AboutUs">
            <h3 style={{ marginLeft: "320px", marginBottom: "25px" }}>About</h3>
            "Our alumni network platform is a dynamic space designed to foster
            connections, knowledge sharing, and professional growth among
            graduates from diverse backgrounds. With a user-friendly interface,
            real-time communication tools, and comprehensive features like job
            listings, event management, and mentorship opportunities, we empower
            alumni to connect, learn, and succeed. Join our community today to
            expand your network, access valuable resources, and stay connected
            with your alma mater and fellow graduates."
          </div>
          <div className="Socials">
            <h3
              style={{
                width: "75px",
                marginBottom: "25px",
                border: "none",
                borderBottom: "5px solid #424874",
              }}
            >
              Socials
            </h3>
            <ul>
              <li><Link>Instagram</Link></li><br />
              <li><Link>LinkedIn</Link></li><br />
              <li><Link>twitter</Link></li><br />
            </ul>
          </div>
          <div className="Contact">
            <h3
              style={{
                width: "75px",
                marginBottom: "25px",
                border: "none",
                borderBottom: "5px solid #424874",
              }}
            >
              Contact
            </h3>
            <ul>
              <li><Link>AlumNexus@gmail.com</Link></li><br />
              <li><Link>Discord</Link></li><br />
              <li><Link>telegram</Link></li><br />
            </ul>
          </div>
        </div>
        <div className="links">
            <div className="Name">AlumNexus</div>
            <div className="link">
                <Link><FaInstagram/></Link>
                <Link><FaLinkedin/></Link>
                <Link><FaTwitter/></Link>
                <Link><FaDiscord/></Link>
                <Link><FaTelegram/></Link>
                <Link><FaEnvelope/></Link>
            </div>
        </div>
        <div className="copyright">
        © Copyrights by AlumNexus . All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
