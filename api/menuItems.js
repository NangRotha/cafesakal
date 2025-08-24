export default async function handler(request, response) {
  const menuItems = [
    {
      "id": "1",
      "name": "អេសប្រេសសូ (Espresso)",
      "description": "កាហ្វេខ្លាំង បម្រើក្នុងពែងតូច ជាមួយរសជាតិសុទ្ធ។",
      "price": "៛12,000",
      "image": "https://plus.unsplash.com/premium_photo-1669687924558-386bff1a0469?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0"
    },
    {
      "id": "2",
      "name": "ឡាតេ (Latte)",
      "description": "អេសប្រេសសូជាមួយទឹកដោះគោក្តៅ និងហ្វូមទន់ភ្លន់។",
      "price": "៛16,000",
      "image": "https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGF0dGV8ZW58MHx8MHx8fDA%3D"
    },
    {
      "id": "3",
      "name": "កូលប៊្រូ (Cold Brew)",
      "description": "កាហ្វេត្រជាក់ ត្រាំយូរ សម្រាប់រសជាតិទន់។",
      "price": "៛18,000",
      "image": "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0"
    },
    {
      "id": "4",
      "name": "ស្មូធីស្វាយ (Mango Smoothie)",
      "description": "ស្មូធីផ្លែស្វាយស្រស់ លាយជាមួយទឹកកក។",
      "price": "៛15,000",
      "image": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0"
    },
    {
      "id": "5",
      "name": "អាវ៉ូកាដូតូស្ត (Avocado Toast)",
      "description": "នំប៉័ងអាំង លាបអាវ៉ូកាដូស្រស់ និងគ្រឿងទេស។",
      "price": "៛14,000",
      "image": "https://images.unsplash.com/photo-1613769049987-b31b641f25b1?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0"
    },
    {
      "id": "6",
      "name": "ផាមភីនស្ពាយឡាតេ (Pumpkin Spice Latte)",
      "description": "ឡាតេក្តៅជាមួយរសជាតិផ្លែល្ពៅ និងគ្រឿងទេស។",
      "price": "៛20,000",
      "image": "https://plus.unsplash.com/premium_photo-1667210180343-3ed8d69d7e07?q=60&w=600&auto=format&fit=crop&ixlib=rb-4.1.0"
    }
  ];

  response.status(200).json(menuItems);
}
