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
    img_name: Faker::Avatar.image("Lawyer", "500x500", "jpg")
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
    img_name: Faker::Avatar.image("Lawyer", "500x500", "jpg")
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
    img_name: Faker::Avatar.image("Lawyer", "500x500", "jpg")
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
    img_name: Faker::Avatar.image("Lawyer", "500x500", "jpg")
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
    img_name: Faker::Avatar.image("Lawyer", "500x500", "jpg")
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
    img_name: Faker::Avatar.image("Lawyer", "500x500", "jpg")
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
    img_name: Faker::Avatar.image("Lawyer", "500x500", "jpg")
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
    img_name: Faker::Avatar.image("Lawyer", "500x500", "jpg")
  }
])

Category.create([
  { lang: 'en', name: "Customs and International Trade" },
  { lang: 'en', name: "environmental" },
  { lang: 'en', name: "Banking and Finance" },
  { lang: 'en', name: "Unfair Competition and Antitrust" }, 
  { lang: 'en', name: "Corporate and Contracts" },
  { name: "Aduanas y Comercio Internacional" },
  { name: "Ambiental" },
  { name: "Bancario y Financiero" },
  { name: "Competencia Desleal y Antimonopolio" }, 
  { name: "Corporativo y Contratos" }
])

Trade.create([
  {country: 'Chile', company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {country: 'Chile', company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {country: 'Chile', company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {lang: 'en', company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {country: 'Chile', lang: 'en', company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {lang: 'en', company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {country: 'Chile', lang: 'en', company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")},
  {lang: 'en', company: Faker::Company.name, company_link: Faker::Internet.url('ppulegal.com'), title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(4), img_name: Faker::Avatar.image("company-logo", "150x150", "jpg")}
])

Post.create([
{date: Faker::Date.between(7.days.ago, Date.today), author: Faker::Name.name, title: Faker::Lorem.sentence, content: Faker::Lorem.sentence(6)},
{country: "Chile",date: Faker::Date.between(7.days.ago, Date.today), author: Faker::Name.name, title: Faker::Lorem.sentence, content: Faker::Lorem.sentence(6)},
{date: Faker::Date.between(7.days.ago, Date.today), author: Faker::Name.name, title: Faker::Lorem.sentence, content: Faker::Lorem.sentence(6)},
{country: "Chile",date: Faker::Date.between(7.days.ago, Date.today), author: Faker::Name.name, title: Faker::Lorem.sentence, content: Faker::Lorem.sentence(6)},
{lang: "en",date: Faker::Date.between(7.days.ago, Date.today), author: Faker::Name.name, title: Faker::Lorem.sentence, content: Faker::Lorem.sentence(6)},
{lang: "en",country: "Chile",date: Faker::Date.between(7.days.ago, Date.today), author: Faker::Name.name, title: Faker::Lorem.sentence, content: Faker::Lorem.sentence(6)},
{lang: "en",date: Faker::Date.between(7.days.ago, Date.today), author: Faker::Name.name, title: Faker::Lorem.sentence, content: Faker::Lorem.sentence(6)},
{lang: "en",country: "Chile",date: Faker::Date.between(7.days.ago, Date.today), author: Faker::Name.name, title: Faker::Lorem.sentence, content: Faker::Lorem.sentence(6)}
])



