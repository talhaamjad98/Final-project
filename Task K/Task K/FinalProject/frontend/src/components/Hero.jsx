import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <h1>Exquisite Coffee Experience</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem' }}>
        Discover the finest artisanal roasts from around the world, crafted with passion and precision.
      </p>
      <button className="btn">View Menu</button>
    </section>
  );
};

export default Hero;
