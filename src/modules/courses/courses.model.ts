export class Course {
  constructor(
    public _id: string,
    public title: string,
    public desc: string,
    public modules: string[],
  ) {
    this._id = _id;
    this.title = title;
    this.desc = desc;
    this.modules = modules;
  }
}
