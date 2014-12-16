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

ActiveRecord::Schema.define(version: 20141215160207) do

  create_table "articles", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "file_name"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "awards", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "title"
    t.string   "img_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", force: true do |t|
    t.string   "lang",        default: "es"
    t.string   "name"
    t.string   "img_name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories_lawyers", id: false, force: true do |t|
    t.integer "category_id"
    t.integer "lawyer_id"
  end

  create_table "educations", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "title"
    t.string   "institution"
    t.string   "country"
    t.string   "year"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "educations", ["lawyer_id"], name: "index_educations_on_lawyer_id", using: :btree

  create_table "institutions", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "title"
    t.string   "country"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "institutions", ["lawyer_id"], name: "index_institutions_on_lawyer_id", using: :btree

  create_table "jobs", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "company",    limit: 150
    t.string   "title",      limit: 100
    t.string   "country",    limit: 100
    t.string   "from",       limit: 50
    t.string   "until",      limit: 50
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "jobs", ["lawyer_id"], name: "index_jobs_on_lawyer_id", using: :btree

  create_table "languages", force: true do |t|
    t.integer  "lawyer_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "lawyers", force: true do |t|
    t.string   "lang",        default: "es"
    t.string   "country",     default: "Colombia"
    t.string   "name"
    t.string   "lastname"
    t.string   "position"
    t.integer  "level"
    t.string   "phone"
    t.string   "email"
    t.text     "description"
    t.text     "keywords"
    t.string   "img_name"
    t.datetime "created_at"
    t.datetime "updated_at"
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
  end

  create_table "post_images", force: true do |t|
    t.integer  "post_id"
    t.string   "img_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", force: true do |t|
    t.string   "lang",       default: "es"
    t.string   "country",    default: "Colombia"
    t.datetime "date"
    t.string   "title"
    t.string   "topic"
    t.string   "author"
    t.text     "content"
    t.string   "slug"
    t.text     "keywords"
    t.integer  "featured"
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
    t.string   "title"
    t.string   "country"
    t.string   "year"
    t.datetime "created_at"
    t.datetime "updated_at"
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
