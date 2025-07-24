import React from 'react';

const HomeSection = () => {
  const featuredItems = [
    {
      name: 'អេសប្រេសសូ (Espresso)',
      description: 'កាហ្វេខ្លាំង បម្រើក្នុងពែងតូច ជាមួយរសជាតិសុទ្ធ។',
      price: '៛12,000',
      image: 'https://plus.unsplash.com/premium_photo-1669687924558-386bff1a0469?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0',
      imageLarge: 'https://plus.unsplash.com/premium_photo-1669687924558-386bff1a0469?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0'
    },
    {
      name: 'ឡាតេ (Latte)',
      description: 'អេសប្រេសសូជាមួយទឹកដោះគោក្តៅ និងហ្វូមទន់ភ្លន់។',
      price: '៛16,000',
      image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGF0dGV8ZW58MHx8MHx8fDA%3D',
      imageLarge: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGF0dGV8ZW58MHx8MHx8fDA%3D'
    },
    {
      name: 'កូលប៊្រូ (Cold Brew)',
      description: 'កាហ្វេត្រជាក់ ត្រាំយូរ សម្រាប់រសជាតិទន់។',
      price: '៛18,000',
      image: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0',
      imageLarge: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0'
    },
    {
      name: 'ស្មូធីស្វាយ (Mango Smoothie)',
      description: 'ស្មូធីផ្លែស្វាយស្រស់ លាយជាមួយទឹកកក។',
      price: '៛15,000',
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0',
      imageLarge: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0'
    },
    {
      name: 'អាវ៉ូកាដូតូស្ត (Avocado Toast)',
      description: 'នំប៉័ងអាំង លាបអាវ៉ូកាដូស្រស់ និងគ្រឿងទេស។',
      price: '៛14,000',
      image: 'https://images.unsplash.com/photo-1613769049987-b31b641f25b1?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0',
      imageLarge: 'https://images.unsplash.com/photo-1613769049987-b31b641f25b1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0'
    },
    {
      name: 'ផាមភីនស្ពាយឡាតេ (Pumpkin Spice Latte)',
      description: 'ឡាតេក្តៅជាមួយរសជាតិផ្លែល្ពៅ និងគ្រឿងទេស។',
      price: '៛20,000',
      image: 'https://plus.unsplash.com/premium_photo-1667210180343-3ed8d69d7e07?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0',
      imageLarge: 'https://plus.unsplash.com/premium_photo-1667210180343-3ed8d69d7e07?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0'
    }
  ];

  return (
    <section id="featured" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-8 sm:mb-12 font-['Hanuman'] animate__animated animate__fadeIn">
          ស្វែងរកភេសជ្ជៈ និងអាហារពេញនិយម
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp animate__delay-${index % 3 * 2}s hover:animate__pulse`}
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={item.image}
                  srcSet={`${item.image} 600w, ${item.imageLarge} 1200w`}
                  sizes="(max-width: 768px) 600px, 1200px"
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 font-['Hanuman']">
                  {item.name}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 mb-2 font-['Hanuman']">
                  {item.description}
                </p>
                <p className="text-base sm:text-lg font-bold text-green-600 mb-4 font-['Hanuman']">
                  {item.price}
                </p>
                <a
                  href="#order"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base font-['Hanuman'] min-w-[44px] min-h-[44px]"
                  aria-label={`មើលតម្លៃ ${item.name}: ${item.price}`}
                >
                  តម្លៃ
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 sm:mt-12 text-center">
          <a
            href="#menu"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg md:text-xl font-['Hanuman'] min-w-[44px] min-h-[44px] animate__animated animate__fadeIn"
            aria-label="មើលម៉ឺនុយបន្ថែម"
          >
            មើលបន្ថែម
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;