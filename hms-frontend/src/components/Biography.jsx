/* eslint-disable react/prop-types */
const Biography = ({imageUrl}) => {
  return (
    <div className="container biography">
        <div className="banner">
            <img src={imageUrl} alt="bio"/>
        </div>
        <div className="banner">
            <p>Biography</p>
            <h2>Who we are?</h2>
            <p>MedConnect is a state-of-the-art multi-specialty hospital established with a vision to redefine healthcare delivery through innovation, compassion, and excellence. Founded on the principles of holistic care, MedConnect bridges the gap between advanced medical technology and personalized treatment, ensuring every patient receives world-class care tailored to their needs. Our hospital houses multiple specialties under one roof, including cardiology, dermatology, ent, radiology, orthopedics, neurology, pediatrics, oncology, and more, making it a one-stop destination for comprehensive healthcare.</p>
            <p>Over the years, MedConnect has emerged as a trusted name in healthcare, catering to thousands of patients with a wide range of medical needs. Our commitment to quality and patient satisfaction has earned us recognition as a leader in multi-specialty medical services.</p>
            <p>At the heart of MedConnect is a mission to create healthier communities through education, prevention, and care. We believe in empowering individuals with knowledge about their health while offering compassionate guidance every step of the way.</p>
            <p>MedConnect is more than just a hospital—it’s a symbol of hope and healing for people from all walks of life. Whether it’s routine check-ups, critical surgeries, or life-saving treatments, our expert team is equipped to handle it all with precision and care.</p>
        </div>
    </div>
  )
}

export default Biography;