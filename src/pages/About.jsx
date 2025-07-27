import React from 'react';

const About = () => {
  const sections = [
    {
      title: 'បេសកកម្មរបស់យើង',
      description: 'នៅការហ្វេសាកល CafeSakal យើងប្តេជ្ញាបម្រើកាហ្វេ និងអាហារដែលមានគុណភាពខ្ពស់ ដោយប្រើគ្រឿងផ្សំស្រស់ និងបច្ចេកទេសប្រកបដោយច្នៃប្រឌិត។',
      icon: './images/mission.png',
      iconLarge: './images/mission.png'
    },
    {
      title: 'ប្រវត្តិរបស់យើង',
      description: 'បង្កើតឡើងនៅឆ្នាំ ២០២០ នៅភ្នំពេញ យើងចាប់ផ្តើមជាមួយចក្ខុវិស័យនាំយកបទពិសោធន៍កាហ្វេបែបអន្តរជាតិមកកម្ពុជា។',
      icon: './images/history.png',
      iconLarge: './images/history.png'
    },
    {
      title: 'តម្លៃរបស់យើង',
      description: 'គុណភាព សហគមន៍ និងនិរន្តរភាពគឺជាសសរស្តម្ភនៃការងារយើង។ យើងគាំទ្រកសិករក្នុងស្រុក និងរក្សាបរិស្ថានឲបានល្អ។',
      icon: './images/price.png',
      iconLarge: './images/price.png'
    }
  ];

  const team = [
    {
      name: 'សុខ សៀក',
      role: 'ស្ថាបនិក និងនាយក',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0'
    },
    {
      name: 'លី សុជាតិ',
      role: 'អ្នកឆុងកាហ្វេជាន់ខ្ពស់',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0'
    },
    {
      name: 'ខេម សុភាព',
      role: 'អ្នកគ្រប់គ្រងហាង',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] max-h-[90vh] w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden mb-8 sm:mb-12 animate__animated animate__fadeIn">
          <img
            src="./images/slide3.jpg"
            srcSet="./images/slide3.jpg"
            sizes="(max-width: 768px) 100vw, 1200px"
            alt="CafeSakal coffee shop ambiance"
            className="w-full h-full max-w-full max-h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-40 sm:opacity-30 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl animate__animated animate__fadeIn">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 md:mb-6 drop-shadow-lg font-['Hanuman']">
                អំពីការហ្វេសាកល CafeSakal
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-light font-['Hanuman']">
                យើងជាហាងកាហ្វេដែលប្តេជ்உាចិត្តផ្តល់នូវបទពិសោធន៍កាហ្វេដ៏អស្ចារ្យ និងបរិយាកាសដ៏កក់ក្តៅសម្រាប់សហគមន៍។
              </p>
            </div>
          </div>
        </div>

        {/* Mission, History, Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp animate__delay-${index * 2}s`}
            >
              <img
                src={section.icon}
                srcSet={`${section.icon} 200w, ${section.iconLarge} 400w`}
                sizes="(max-width: 768px) 200px, 400px"
                alt={`រូបតំណាង ${section.title}`}
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full object-cover"
                loading="lazy"
              />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 font-['Hanuman']">
                {section.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 font-['Hanuman']">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-600 mb-6 sm:mb-8 font-['Hanuman'] animate__animated animate__fadeIn">
            ក្រុមការងាររបស់យើង
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp animate__delay-${(index + 3) * 2}s`}
              >
                <img
                  src={member.image}
                  alt={`ក្រុមការងារ ${member.name}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full object-cover"
                  loading="lazy"
                />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 font-['Hanuman']">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-['Hanuman']">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;