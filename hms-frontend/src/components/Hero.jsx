/* eslint-disable react/prop-types */
const Hero = ({title, imageUrl}) => {
  return (
    <div className="hero container">
        <div className="banner">
            <h1>{title}</h1>
            <p>Welcome to MedConnect, your trusted multi-specialty hospital dedicated to providing comprehensive healthcare services under one roof.
               At MedConnect, we bring together advanced medical technology, highly skilled professionals, and a patient-centered approach to ensure the best possible outcomes for you and your loved ones.
               At MedConnect, we’re more than just a hospital; we’re your partners in health. Visit us to experience world-class healthcare with a human touch.
            </p>
        </div>
        <div className="banner">
            <img src={imageUrl} alt="hero" className="animated-image"/>
            <span>
                <img src="/Vector.png" alt="vector"/>
            </span>
        </div>
    </div>
  )
}

export default Hero;