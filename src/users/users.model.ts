export class User {
    constructor(
        public _id: string,
        public primary_email: string,
        public phone_number: string,
        public first_name: string,
        public last_name: string,
        public profile_picture_url: string,
        public position: string,
        public created_at: Date,
        public updated_at: Date,
        public purchased_items: string[]
    ) {
        this._id = _id;
        this.primary_email = primary_email;
        this.phone_number = phone_number;
        this.first_name = first_name;
        this.last_name = last_name;
        this.profile_picture_url = profile_picture_url;
        this.position = position;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.purchased_items = purchased_items;
    }
};