Lawyer.create([
  {
    lang: "es",
    country: "Colombia",
    name: Faker::Name.first_name, 
    lastname: Faker::Name.last_name, 
    position: "Socio", 
    email: Faker::Internet.email,
    phone: Faker::Number.number(10), 
    description: Faker::Lorem.paragraph(4),
    img_path: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  },
  {
    lang: "en",
    country: "Colombia",
    name: Faker::Name.first_name, 
    lastname: Faker::Name.last_name, 
    position: "Socio", 
    email: Faker::Internet.email,
    phone: Faker::Number.number(10), 
    description: Faker::Lorem.paragraph(4),
    img_path: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  },
  {
    lang: "es",
    country: "Chile",
    name: Faker::Name.first_name, 
    lastname: Faker::Name.last_name, 
    position: "Asociado", 
    email: Faker::Internet.email,
    phone: Faker::Number.number(10), 
    description: Faker::Lorem.paragraph(4),
    img_path: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  },
  {
    lang: "en",
    country: "Chile",
    name: Faker::Name.first_name, 
    lastname: Faker::Name.last_name, 
    position: "Asociado", 
    email: Faker::Internet.email,
    phone: Faker::Number.number(10), 
    description: Faker::Lorem.paragraph(4),
    img_path: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  },
  {
    lang: "es",
    country: "Colombia",
    name: Faker::Name.first_name, 
    lastname: Faker::Name.last_name, 
    position: "Especialista", 
    email: Faker::Internet.email,
    phone: Faker::Number.number(10), 
    description: Faker::Lorem.paragraph(4),
    img_path: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  },
  {
    lang: "en",
    country: "Colombia",
    name: Faker::Name.first_name, 
    lastname: Faker::Name.last_name, 
    position: "Especialista", 
    email: Faker::Internet.email,
    phone: Faker::Number.number(10), 
    description: Faker::Lorem.paragraph(4),
    img_path: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  },
  {
    lang: "es",
    country: "Chile",
    name: Faker::Name.first_name, 
    lastname: Faker::Name.last_name, 
    position: "Senior Counsel", 
    email: Faker::Internet.email,
    phone: Faker::Number.number(10), 
    description: Faker::Lorem.paragraph(4),
    img_path: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  },
  {
    lang: "en",
    country: "Chile",
    name: Faker::Name.first_name, 
    lastname: Faker::Name.last_name, 
    position: "Senior Counsel", 
    email: Faker::Internet.email,
    phone: Faker::Number.number(10), 
    description: Faker::Lorem.paragraph(4),
    img_path: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  }
])


Category.create([
  { name: "Aduanas y Comercio Internacional" },
  { name: "Ambiental" },
  { name: "Bancario y Financiero" },
  { name: "Competencia Desleal y Antimonopolio" }, 
  { name: "Corporativo y Contratos" }
])



