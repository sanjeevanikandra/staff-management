import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#1a202c",
      color: "#ffffff",
      padding: "20px",
      textAlign: "center",
      marginTop: "auto",
    },
    socialIcons: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "10px",
    },
    icon: {
      width: "30px",
      height: "30px",
      cursor: "pointer",
    },
    info: {
      marginTop: "15px",
      fontSize: "14px",
    },
    link: {
      textDecoration: "none",
      color: "#4FD1C5",
    },
  };

  return (
    <footer style={styles.footer}>
      <div>
        <h3>Staff Management System</h3>
        <p>Your one-stop solution for managing staff efficiently.</p>
      </div>

      {/* Social Media Links */}
      <div style={styles.socialIcons}>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/color/48/instagram-new.png"
            alt="Instagram"
            style={styles.icon}
          />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/color/48/facebook.png"
            alt="Facebook"
            style={styles.icon}
          />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/color/48/linkedin.png"
            alt="LinkedIn"
            style={styles.icon}
          />
        </a>
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/color/48/whatsapp.png"
            alt="WhatsApp"
            style={styles.icon}
          />
        </a>
      </div>

      {/* Footer Info */}
      <div style={styles.info}>
        <p>
          © {new Date().getFullYear()} Staff Management System. All rights
          reserved.
        </p>
        <p>
          Need help?{" "}
          <a
            href="mailto:support@staffmanagement.com"
            style={styles.link}
          >
            Contact Support
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
