export class Message {
  constructor(
    public id: number,
    public from: string,
    public subject: string,
    public unread: boolean,
    public selected: boolean

  ) {}
}
