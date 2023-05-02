export class Subscriber {
  constructor(
    public _id: string,
    public primary_email: string,
    public phone_number: string,
    public first_name: string,
    public last_name: string,

    public created_at: Date,
    public updated_at: Date,
    public is_user: boolean,
  ) {
    this._id = _id;
    this.primary_email = primary_email;
    this.phone_number = phone_number;
    this.first_name = first_name;
    this.last_name = last_name;

    this.created_at = created_at;
    this.updated_at = updated_at;
    this.is_user = is_user;
  }
}
