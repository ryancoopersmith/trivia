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

ActiveRecord::Schema.define(version: 20170320192509) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "interests", force: :cascade do |t|
    t.string  "interest", default: ""
    t.integer "user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.text    "description",      null: false
    t.string  "answer",           null: false
    t.integer "quiz_question_id", null: false
    t.string  "category",         null: false
  end

  create_table "quiz_questions", force: :cascade do |t|
    t.integer "quiz_id",     null: false
    t.integer "question_id", null: false
  end

  create_table "quizzes", force: :cascade do |t|
    t.string  "difficulty",       null: false
    t.integer "user_id"
    t.integer "quiz_question_id", null: false
    t.integer "questions_count",  null: false
    t.string  "category",         null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "username",                               null: false
    t.integer  "win_percentage",         default: 0
    t.string   "favorite_category",      default: ""
    t.string   "best_category",          default: ""
    t.string   "worst_category",         default: ""
    t.boolean  "admin",                  default: false
    t.string   "profile_photo"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
