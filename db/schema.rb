# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150204014538) do

  create_table "academics", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "title"
    t.string   "institution"
    t.string   "country",     limit: 100
    t.string   "from"
    t.string   "until"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "locale"
    t.integer  "position"
  end

  add_index "academics", ["lawyer_id"], name: "index_academics_on_lawyer_id", using: :btree

  create_table "articles", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "file_name"
    t.string   "link"
    t.text     "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "locale"
    t.integer  "position"
  end

  create_table "awards", force: true do |t|
    t.integer  "lawyer_id"
    t.text     "title"
    t.string   "img_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "locale"
    t.integer  "position"
  end

  create_table "awards_lawyers", id: false, force: true do |t|
    t.integer "award_id"
    t.integer "lawyer_id"
    t.string  "subtitle"
  end

  create_table "categories", force: true do |t|
    t.integer  "translation_id"
    t.string   "gallery_id"
    t.string   "lang",           default: "es"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
  end

  create_table "categories_experiences", force: true do |t|
    t.integer "category_id"
    t.integer "experience_id"
  end

  add_index "categories_experiences", ["category_id"], name: "index_categories_experiences_on_category_id", using: :btree
  add_index "categories_experiences", ["experience_id"], name: "index_categories_experiences_on_experience_id", using: :btree

  create_table "categories_lawyers", id: false, force: true do |t|
    t.integer "category_id"
    t.integer "lawyer_id"
  end

  create_table "categories_posts", id: false, force: true do |t|
    t.integer "post_id"
    t.integer "category_id"
  end

  create_table "contacts", force: true do |t|
    t.string   "name"
    t.string   "lastname"
    t.string   "email"
    t.text     "message"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "country"
  end

  create_table "curriculums", force: true do |t|
    t.string   "country"
    t.string   "name"
    t.string   "file_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "education_translations", force: true do |t|
    t.integer  "education_id", null: false
    t.string   "locale",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "title"
  end

  add_index "education_translations", ["education_id"], name: "index_education_translations_on_education_id", using: :btree
  add_index "education_translations", ["locale"], name: "index_education_translations_on_locale", using: :btree

  create_table "educations", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "title"
    t.string   "institution"
    t.string   "country"
    t.string   "year"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "position"
    t.string   "locale"
  end

  add_index "educations", ["lawyer_id"], name: "index_educations_on_lawyer_id", using: :btree

  create_table "experiences", force: true do |t|
    t.string   "lang",           default: "es"
    t.integer  "gallery_id"
    t.integer  "translation_id"
    t.string   "company_name"
    t.string   "company_web"
    t.date     "date"
    t.text     "title"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "country"
    t.string   "img_name"
    t.text     "excerpt"
    t.text     "keywords"
    t.boolean  "published",      default: false
    t.string   "slug"
  end

  add_index "experiences", ["translation_id"], name: "index_experiences_on_translation_id", using: :btree

  create_table "experiences_lawyers", force: true do |t|
    t.integer "experience_id"
    t.integer "lawyer_id"
  end

  add_index "experiences_lawyers", ["experience_id"], name: "index_experiences_lawyers_on_experience_id", using: :btree
  add_index "experiences_lawyers", ["lawyer_id"], name: "index_experiences_lawyers_on_lawyer_id", using: :btree

  create_table "galleries", force: true do |t|
    t.string   "name"
    t.string   "img_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "institutions", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "title"
    t.string   "country"
    t.string   "from",       limit: 10
    t.string   "until",      limit: 10
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "locale"
    t.integer  "position"
  end

  add_index "institutions", ["lawyer_id"], name: "index_institutions_on_lawyer_id", using: :btree

  create_table "jobs", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "company",    limit: 250
    t.text     "title"
    t.string   "country",    limit: 100
    t.string   "from",       limit: 50
    t.string   "until",      limit: 50
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "locale"
    t.integer  "position"
  end

  add_index "jobs", ["lawyer_id"], name: "index_jobs_on_lawyer_id", using: :btree

  create_table "languages", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "locale"
    t.integer  "position"
  end

  create_table "lawyers", force: true do |t|
    t.integer  "translation_id"
    t.string   "lang",                      default: "es"
    t.string   "country",                   default: "Colombia"
    t.string   "name"
    t.string   "lastname"
    t.string   "position"
    t.integer  "level"
    t.string   "phone"
    t.string   "email"
    t.text     "description"
    t.string   "img_name"
    t.text     "keywords"
    t.string   "slug",           limit: 50
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description_en"
  end

  create_table "lawyers_posts", id: false, force: true do |t|
    t.integer "post_id"
    t.integer "lawyer_id"
  end

  create_table "lawyers_trades", id: false, force: true do |t|
    t.integer "lawyer_id"
    t.integer "trade_id"
  end

  create_table "phrases", force: true do |t|
    t.integer  "lawyer_id"
    t.text     "content"
    t.string   "author"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "locale"
    t.integer  "position"
  end

  create_table "posts", force: true do |t|
    t.integer  "gallery_id"
    t.integer  "translation_id"
    t.string   "lang",                       default: "es",       null: false
    t.string   "country",                    default: "Colombia", null: false
    t.date     "date"
    t.string   "title"
    t.string   "author"
    t.text     "content"
    t.text     "excerpt"
    t.string   "img_name",       limit: 250
    t.text     "slug"
    t.text     "keywords"
    t.integer  "featured"
    t.boolean  "published",                  default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts_categories", id: false, force: true do |t|
    t.integer "post_id"
    t.integer "category_id"
  end

  create_table "posts_lawyers", id: false, force: true do |t|
    t.integer "post_id"
    t.integer "lawyer_id"
  end

  create_table "recognitions", force: true do |t|
    t.integer  "lawyer_id"
    t.text     "title"
    t.string   "country"
    t.string   "year"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "locale"
    t.integer  "position"
  end

  add_index "recognitions", ["lawyer_id"], name: "index_recognitions_on_lawyer_id", using: :btree

  create_table "trades", force: true do |t|
    t.string   "lang",         default: "es"
    t.string   "country",      default: "Colombia"
    t.string   "company"
    t.string   "company_link"
    t.string   "title"
    t.date     "date"
    t.text     "description"
    t.string   "img_name"
    t.text     "keywords"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
