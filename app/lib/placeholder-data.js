const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'Admin',
      email: 'admin@nextmail.com',
      password: '12345678',
    },
];


const foods = [
    // Hausa Foods
    {
      title: "Tuwo Shinkafa and Miyan Kuka",
      likes: 150,
      description: "A traditional meal made from rice flour and baobab leaves soup.",
      user: "Amina Suleiman",
      time: "45",
      image: "https://example.com/images/tuwo_shinkafa_miyan_kuka.jpg",
      ingredients: ["Rice flour", "Baobab leaves", "Spices"],
      walkthrough: "Boil rice flour in water until thickened. Prepare Miyan Kuka by cooking baobab leaves with spices.",
      category: "Hausa"
    },
    {
      title: "Masa",
      likes: 200,
      description: "A type of rice cake commonly eaten for breakfast.",
      user: "Abdullahi Usman",
      time: "20",
      image: "https://example.com/images/masa.jpg",
      ingredients: ["Rice", "Yeast", "Sugar"],
      walkthrough: "Ferment rice batter with yeast and sugar, then fry in small pans.",
      category: "Hausa"
    },
    {
      title: "Suya",
      likes: 350,
      description: "Spicy meat skewer, a popular street food.",
      user: "Bala Ibrahim",
      time: "15",
      image: "https://example.com/images/suya.jpg",
      ingredients: ["Beef", "Spices", "Peanut powder"],
      walkthrough: "Marinate beef in a mixture of spices and peanut powder, then grill on skewers.",
      category: "Hausa"
    },
    {
      title: "Waina",
      likes: 180,
      description: "A pancake-like snack made from rice and millet.",
      user: "Hauwa Bello",
      time: "25",
      image: "https://example.com/images/waina.jpg",
      ingredients: ["Rice", "Millet", "Yeast"],
      walkthrough: "Mix rice and millet batter, ferment, and fry in special pans.",
      category: "Hausa"
    },
    {
      title: "Dambu Nama",
      likes: 210,
      description: "A type of dried and shredded meat, often spicy.",
      user: "Umar Farouk",
      time: "50",
      image: "https://example.com/images/dambu_nama.jpg",
      ingredients: ["Beef", "Spices", "Onions"],
      walkthrough: "Cook and shred beef, mix with spices and onions, and dry.",
      category: "Hausa"
    },
    // Yoruba Foods
    {
      title: "Amala and Ewedu",
      likes: 236,
      description: "A classic Yoruba dish made from yam flour and jute leaves soup.",
      user: "Rasheed Abdulrahman",
      time: "30",
      image: "https://example.com/images/amala_ewedu.jpg",
      ingredients: ["Yam flour", "Jute leaves", "Spices"],
      walkthrough: "Cook yam flour in water to make Amala. Prepare Ewedu by boiling and blending jute leaves with spices.",
      category: "Yoruba"
    },
    {
      title: "Ofada Rice and Ayamase",
      likes: 300,
      description: "Local rice served with a spicy pepper sauce.",
      user: "Tola Adebayo",
      time: "40",
      image: "https://example.com/images/ofada_rice_ayamase.jpg",
      ingredients: ["Ofada rice", "Green bell peppers", "Palm oil", "Assorted meats"],
      walkthrough: "Cook Ofada rice. Blend and fry green peppers with palm oil and assorted meats to make Ayamase.",
      category: "Yoruba"
    },
    {
      title: "Efo Riro",
      likes: 280,
      description: "A rich vegetable soup made with spinach and assorted meats.",
      user: "Funmi Oladipo",
      time: "35",
      image: "https://example.com/images/efo_riro.jpg",
      ingredients: ["Spinach", "Assorted meats", "Palm oil", "Tomatoes", "Peppers"],
      walkthrough: "Cook spinach with palm oil, tomatoes, peppers, and assorted meats.",
      category: "Yoruba"
    },
    {
      title: "Gbegiri and Ewedu",
      likes: 250,
      description: "Bean soup mixed with jute leaves soup, often served with amala.",
      user: "Segun Ajayi",
      time: "45",
      image: "https://example.com/images/gbegiri_ewedu.jpg",
      ingredients: ["Beans", "Jute leaves", "Yam flour"],
      walkthrough: "Cook beans to make Gbegiri. Prepare Ewedu by boiling and blending jute leaves. Serve with Amala.",
      category: "Yoruba"
    },
    {
      title: "Ikokore",
      likes: 220,
      description: "A water yam porridge popular in the Ijebu region.",
      user: "Yemi Oshin",
      time: "50",
      image: "https://example.com/images/ikokore.jpg",
      ingredients: ["Water yam", "Palm oil", "Fish", "Crayfish", "Pepper"],
      walkthrough: "Grate water yam and cook with palm oil, fish, crayfish, and pepper.",
      category: "Yoruba"
    },
    // Igbo Foods
    {
      title: "Fufu and Oha Soup",
      likes: 320,
      description: "A starchy staple made from cassava, served with a hearty soup made from oha leaves.",
      user: "Nkechi Okonkwo",
      time: "60",
      image: "https://example.com/images/fufu_oha_soup.jpg",
      ingredients: ["Cassava", "Oha leaves", "Assorted meats", "Palm oil"],
      walkthrough: "Prepare fufu from cassava. Cook Oha soup with oha leaves, assorted meats, and palm oil.",
      category: "Igbo"
    },
    {
      title: "Jollof Rice",
      likes: 410,
      description: "A popular West African rice dish cooked in a rich tomato sauce.",
      user: "Chidi Nwosu",
      time: "50",
      image: "https://example.com/images/jollof_rice.jpg",
      ingredients: ["Rice", "Tomatoes", "Peppers", "Onions", "Spices"],
      walkthrough: "Cook rice with a blend of tomatoes, peppers, onions, and spices.",
      category: "Igbo"
    },
    {
      title: "Ukwa",
      likes: 150,
      description: "African breadfruit dish, often cooked with spices and palm oil.",
      user: "Chinwe Eze",
      time: "90",
      image: "https://example.com/images/ukwa.jpg",
      ingredients: ["African breadfruit", "Palm oil", "Spices"],
      walkthrough: "Cook African breadfruit with palm oil and spices until tender.",
      category: "Igbo"
    },
    {
      title: "Abacha and Ugba",
      likes: 275,
      description: "African salad made from shredded cassava and oil bean seeds.",
      user: "Emeka Obi",
      time: "40",
      image: "https://example.com/images/abacha_ugba.jpg",
      ingredients: ["Cassava", "Oil bean seeds", "Palm oil", "Peppers"],
      walkthrough: "Shred and soak cassava, mix with oil bean seeds, palm oil, and peppers.",
      category: "Igbo"
    },
    {
      title: "Nkwobi",
      likes: 300,
      description: "Spicy cow foot delicacy.",
      user: "Ifeanyi Chukwu",
      time: "55",
      image: "https://example.com/images/nkwobi.jpg",
      ingredients: ["Cow foot", "Palm oil", "Spices", "Ugba"],
      walkthrough: "Cook cow foot with palm oil, spices, and ugba until tender.",
      category: "Igbo"
    }
  ];
  

  module.exports = {
    users,
    foods,
  };