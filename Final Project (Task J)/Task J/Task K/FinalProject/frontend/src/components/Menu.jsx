import React from 'react';

const Menu = () => {
  const specials = [
    {
      title: 'Velvet Espresso',
      description: 'A smooth, full-bodied shot with notes of dark chocolate and caramel.'
    },
    {
      title: 'Golden Latte',
      description: 'Creamy micro-foam blended with our signature blonde roast and honey.'
    },
    {
      title: 'Kyoto Cold Brew',
      description: '12-hour slow-dripped coffee for a crisp and refreshing finish.'
    }
  ];

  return (
    <section className="menu-section">
      <h2 className="section-title">Our Specials</h2>
      <div className="menu-grid">
        {specials.map((item, index) => (
          <div key={index} className="menu-item">
            <h3>{item.title}</h3>
            <p style={{ color: '#ccc' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
