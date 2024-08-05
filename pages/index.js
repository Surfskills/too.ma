// pages/index.js
import Image from 'next/image';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTelegram,
  FaWhatsapp,
  FaDribbble,
  FaMedium,
} from 'react-icons/fa';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const username = 'fred'; // Replace with the actual username
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/auth/creator_profile/retrieve/${username}/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    if (!data.file_uploads) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        storeFrontData: data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}

export default function Home({ storeFrontData }) {
  if (!storeFrontData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <Image
          src={storeFrontData.profile_image}
          alt={storeFrontData.display_name}
          width={120}
          height={120}
          className={styles.profileImage}
        />
        <h1 className={styles.username}>@{storeFrontData.username}</h1>
      </div>

      {/* Products Section */}
      <div className={styles.productsSection}>
        {storeFrontData.file_uploads.map((product) => (
          <div key={product.unique_id} className={styles.productBox}>
            <Image
              src={product.banner}
              alt={product.title}
              width={500}
              height={250}
              className={styles.productBanner}
            />
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productMessage}>{product.message}</p>
            <p className={styles.productPrice}>${product.payment_amount}</p>
            <div className={styles.buttonsContainer}>
              <a
                href={product.metadata_link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewMoreButton}
              >
                View More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className={styles.socialIcons}>
        {storeFrontData.instagram && (
          <a
            href={storeFrontData.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} />
          </a>
        )}
        {storeFrontData.linkedin && (
          <a
            href={storeFrontData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
        )}
        {storeFrontData.facebook && (
          <a
            href={storeFrontData.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={24} />
          </a>
        )}
        {storeFrontData.twitter && (
          <a
            href={storeFrontData.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </a>
        )}
        {storeFrontData.youtube && (
          <a
            href={storeFrontData.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={24} />
          </a>
        )}
        {storeFrontData.telegram && (
          <a
            href={storeFrontData.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram size={24} />
          </a>
        )}
        {storeFrontData.whatsapp && (
          <a
            href={storeFrontData.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={24} />
          </a>
        )}
        {storeFrontData.dribbble && (
          <a
            href={storeFrontData.dribbble}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDribbble size={24} />
          </a>
        )}
        {storeFrontData.medium && (
          <a
            href={storeFrontData.medium}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMedium size={24} />
          </a>
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Tooma. All rights reserved.</p>
        <a href="https://www.tooma.com" target="_blank" rel="noopener noreferrer">
          Tooma
        </a>
      </footer>
    </div>
  );
}
