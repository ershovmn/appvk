# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_28_143514) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "cart_items", force: :cascade do |t|
    t.bigint "cart_id", null: false
    t.bigint "menu_item_id", null: false
    t.integer "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["cart_id"], name: "index_cart_items_on_cart_id"
    t.index ["menu_item_id"], name: "index_cart_items_on_menu_item_id"
  end

  create_table "carts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_carts_on_user_id"
  end

  create_table "cuisines", force: :cascade do |t|
    t.string "name"
    t.boolean "is_junk"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "foodcourt_restaraunts", force: :cascade do |t|
    t.bigint "foodcourt_id", null: false
    t.bigint "restaraunt_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["foodcourt_id"], name: "index_foodcourt_restaraunts_on_foodcourt_id"
    t.index ["restaraunt_id"], name: "index_foodcourt_restaraunts_on_restaraunt_id"
  end

  create_table "foodcourts", force: :cascade do |t|
    t.string "address"
    t.float "latitude"
    t.float "longitude"
    t.string "name"
    t.text "description"
    t.integer "price_rating"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_foodcourts_on_user_id"
  end

  create_table "matcher_profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "looking_for"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_matcher_profiles_on_user_id"
  end

  create_table "matcher_selections", force: :cascade do |t|
    t.bigint "matcher_profile_id", null: false
    t.bigint "matchee_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_liked"
    t.index ["matchee_id"], name: "index_matcher_selections_on_matchee_id"
    t.index ["matcher_profile_id"], name: "index_matcher_selections_on_matcher_profile_id"
  end

  create_table "menu_categories", force: :cascade do |t|
    t.string "name"
    t.bigint "restaraunt_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["restaraunt_id"], name: "index_menu_categories_on_restaraunt_id"
    t.index ["user_id"], name: "index_menu_categories_on_user_id"
  end

  create_table "menu_items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "restaraunt_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "menu_category_id"
    t.integer "price"
    t.index ["menu_category_id"], name: "index_menu_items_on_menu_category_id"
    t.index ["restaraunt_id"], name: "index_menu_items_on_restaraunt_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "menu_item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["menu_item_id"], name: "index_order_items_on_menu_item_id"
    t.index ["order_id"], name: "index_order_items_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.boolean "is_paid"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "tracking"
    t.bigint "restaraunt_id", null: false
    t.index ["restaraunt_id"], name: "index_orders_on_restaraunt_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "restaraunts", force: :cascade do |t|
    t.string "address"
    t.float "latitude"
    t.float "longitude"
    t.bigint "cuisine_id", null: false
    t.string "name"
    t.text "description"
    t.integer "price_rating"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_in_foodcourt"
    t.index ["cuisine_id"], name: "index_restaraunts_on_cuisine_id"
    t.index ["user_id"], name: "index_restaraunts_on_user_id"
  end

  create_table "user_tokens", force: :cascade do |t|
    t.string "token"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_tokens_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "login"
    t.integer "role"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "vk_id"
    t.text "photo_url"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "cart_items", "carts"
  add_foreign_key "cart_items", "menu_items"
  add_foreign_key "carts", "users"
  add_foreign_key "foodcourt_restaraunts", "foodcourts"
  add_foreign_key "foodcourt_restaraunts", "restaraunts"
  add_foreign_key "foodcourts", "users"
  add_foreign_key "matcher_profiles", "users"
  add_foreign_key "matcher_selections", "matcher_profiles"
  add_foreign_key "matcher_selections", "matcher_profiles", column: "matchee_id"
  add_foreign_key "menu_categories", "restaraunts"
  add_foreign_key "menu_categories", "users"
  add_foreign_key "menu_items", "menu_categories"
  add_foreign_key "menu_items", "restaraunts"
  add_foreign_key "order_items", "menu_items"
  add_foreign_key "order_items", "orders"
  add_foreign_key "orders", "restaraunts"
  add_foreign_key "orders", "users"
  add_foreign_key "restaraunts", "cuisines"
  add_foreign_key "restaraunts", "users"
  add_foreign_key "user_tokens", "users"
end
