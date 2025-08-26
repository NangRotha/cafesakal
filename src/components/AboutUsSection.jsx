import React from 'react';

const AboutUsSection = () => {
  return (
    <section id="about" className="mt-5 py-20 bg-gradient-to-br from-stone-100 to-amber-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] "></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-brown-800 mb-20 font-['Noto_Sans_Khmer'] tracking-wide leading-tight">
          រឿងរ៉ាវរបស់យើង
        </h2>

        <div className="space-y-20">
          {/* Our History Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border border-amber-200">
            <div className="md:order-2">
              <img
                src="./images/slide2.jpg"
                alt="Our History"
                className="rounded-xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-300 ease-in-out border-4 border-amber-300"
              />
            </div>
            <div className="md:order-1 text-center md:text-left">
              <h3 className="text-4xl font-bold text-brown-700 mb-6 font-['Noto_Sans_Khmer']">ប្រវត្តិរបស់យើង</h3>
              <p className="text-gray-700 leading-relaxed font-['Noto_Sans_Khmer'] text-lg">
                CafeSakal ត្រូវបានបង្កើតឡើងក្នុងឆ្នាំ 2020 ដោយមានបេសកកម្មនាំមកនូវបទពិសោធន៍កាហ្វេដ៏ល្អបំផុតដល់សហគមន៍។ យើងបានចាប់ផ្តើមពីហាងតូចមួយដែលមានក្តីស្រមៃធំមួយ គឺចង់ផ្តល់ជូននូវកាហ្វេដែលមានគុណភាពខ្ពស់បំផុត និងបរិយាកាសកក់ក្តៅសម្រាប់មនុស្សគ្រប់គ្នា។ ជាមួយនឹងការខិតខំប្រឹងប្រែង និងការយកចិត្តទុកដាក់ យើងបានរីកចម្រើនក្លាយជាកន្លែងដែលអ្នកចូលចិត្តសម្រាប់កាហ្វេ និងការជួបជុំ។
              </p>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border border-amber-200">
            <div className="text-center md:text-left">
              <h3 className="text-4xl font-bold text-brown-700 mb-6 font-['Noto_Sans_Khmer']">បេសកកម្មរបស់យើង</h3>
              <p className="text-gray-700 leading-relaxed font-['Noto_Sans_Khmer'] text-lg">
                បេសកកម្មរបស់យើងគឺដើម្បីផ្តល់ជូននូវកាហ្វេដែលមានគុណភាពល្អបំផុត ផលិតដោយសីលធម៌ និងបម្រើដោយក្តីស្រឡាញ់។ យើងប្តេជ្ញាបង្កើតបរិយាកាសស្វាគមន៍ដែលអតិថិជនគ្រប់រូបអាចរីករាយជាមួយភេសជ្ជៈដ៏ល្អឥតខ្ចោះ និងមានអារម្មណ៍ដូចជាផ្ទះ។ យើងជឿជាក់លើការគាំទ្រកសិករក្នុងស្រុក និងនិរន្តរភាព ដើម្បីធានាបាននូវអនាគតដ៏ភ្លឺស្វាងសម្រាប់កាហ្វេ។
              </p>
            </div>
            <div>
              <img
                src="./images/slide3.jpg"
                alt="Our Mission"
                className="rounded-xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-300 ease-in-out border-4 border-amber-300"
              />
            </div>
          </div>

          {/* Our Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border border-amber-200">
            <div className="md:order-2">
              <img
                src="./images/slide1.jpg"
                alt="Our Values"
                className="rounded-xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-300 ease-in-out border-4 border-amber-300"
              />
            </div>
            <div className="md:order-1 text-center md:text-left">
              <h3 className="text-4xl font-bold text-brown-700 mb-6 font-['Noto_Sans_Khmer']">តម្លៃរបស់យើង</h3>
              <p className="text-gray-700 leading-relaxed font-['Noto_Sans_Khmer'] text-lg">
                យើងប្រកាន់ខ្ជាប់នូវគុណភាព ភាពស្មោះត្រង់ និងសេវាកម្មអតិថិជនឆ្នើម។ យើងជឿជាក់លើការបង្កើតទំនាក់ទំនងយូរអង្វែងជាមួយអតិថិជន និងអ្នកផ្គត់ផ្គង់របស់យើង។ ភាពថ្លៃថ្នូរ ការគោរព និងការច្នៃប្រឌិតគឺជាស្នូលនៃអ្វីគ្រប់យ៉ាងដែលយើងធ្វើ។ យើងខិតខំដើម្បីភាពល្អឥតខ្ចោះក្នុងគ្រប់ទិដ្ឋភាពនៃអាជីវកម្មរបស់យើង ពីការជ្រើសរើសគ្រាប់កាហ្វេ រហូតដល់ការរៀបចំភេសជ្ជៈចុងក្រោយ។
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
