import React from 'react';

const AboutUsSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 font-['Noto_Sans_Khmer']">
          រឿងរ៉ាវរបស់យើង
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="md:order-2">
            <img
              src="./images/history.png"
              alt="Our History"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:order-1 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-['Noto_Sans_Khmer']">ប្រវត្តិរបស់យើង</h3>
            <p className="text-gray-600 leading-relaxed font-['Noto_Sans_Khmer']">
              CafeSakal ត្រូវបានបង្កើតឡើងក្នុងឆ្នាំ 2020 ដោយមានបេសកកម្មនាំមកនូវបទពិសោធន៍កាហ្វេដ៏ល្អបំផុតដល់សហគមន៍។ យើងបានចាប់ផ្តើមពីហាងតូចមួយដែលមានក្តីស្រមៃធំមួយ គឺចង់ផ្តល់ជូននូវកាហ្វេដែលមានគុណភាពខ្ពស់បំផុត និងបរិយាកាសកក់ក្តៅសម្រាប់មនុស្សគ្រប់គ្នា។ ជាមួយនឹងការខិតខំប្រឹងប្រែង និងការយកចិត្តទុកដាក់ យើងបានរីកចម្រើនក្លាយជាកន្លែងដែលអ្នកចូលចិត្តសម្រាប់កាហ្វេ និងការជួបជុំ។
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center md:text-left">
            <img
              src="./images/mission.png"
              alt="Our Mission"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-['Noto_Sans_Khmer']">បេសកកម្មរបស់យើង</h3>
            <p className="text-gray-600 leading-relaxed font-['Noto_Sans_Khmer']">
              បេសកកម្មរបស់យើងគឺដើម្បីផ្តល់ជូននូវកាហ្វេដែលមានគុណភាពល្អបំផុត ផលិតដោយសីលធម៌ និងបម្រើដោយក្តីស្រឡាញ់។ យើងប្តេជ្ញាបង្កើតបរិយាកាសស្វាគមន៍ដែលអតិថិជនគ្រប់រូបអាចរីករាយជាមួយភេសជ្ជៈដ៏ល្អឥតខ្ចោះ និងមានអារម្មណ៍ដូចជាផ្ទះ។ យើងជឿជាក់លើការគាំទ្រកសិករក្នុងស្រុក និងនិរន្តរភាព ដើម្បីធានាបាននូវអនាគតដ៏ភ្លឺស្វាងសម្រាប់កាហ្វេ។
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <img
              src="./images/price.png"
              alt="Our Values"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:order-1 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-['Noto_Sans_Khmer']">តម្លៃរបស់យើង</h3>
            <p className="text-gray-600 leading-relaxed font-['Noto_Sans_Khmer']">
              យើងប្រកាន់ខ្ជាប់នូវគុណភាព ភាពស្មោះត្រង់ និងសេវាកម្មអតិថិជនឆ្នើម។ យើងជឿជាក់លើការបង្កើតទំនាក់ទំនងយូរអង្វែងជាមួយអតិថិជន និងអ្នកផ្គត់ផ្គង់របស់យើង។ ភាពថ្លៃថ្នូរ ការគោរព និងការច្នៃប្រឌិតគឺជាស្នូលនៃអ្វីគ្រប់យ៉ាងដែលយើងធ្វើ។ យើងខិតខំដើម្បីភាពល្អឥតខ្ចោះក្នុងគ្រប់ទិដ្ឋភាពនៃអាជីវកម្មរបស់យើង ពីការជ្រើសរើសគ្រាប់កាហ្វេ រហូតដល់ការរៀបចំភេសជ្ជៈចុងក្រោយ។
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
